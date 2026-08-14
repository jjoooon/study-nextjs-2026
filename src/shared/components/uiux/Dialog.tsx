/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import dialogSizesData from '@/shared/popups/dialogSizes.json';
import {
  registerDialog,
  unregisterDialog,
  getOpenCount,
  getTopOpenDialogId,
  getDialogLayerIndex,
  subscribeOverlay,
} from '@/shared/utils/popup/dialogOverlayRegistry';
import { changeTitle, resizeWindow } from '@/shared/utils/screenUtils';
import { Grid } from '@atoms';
import { CloseIcon } from '@icons';
import { Button } from '@uiux/Button';

type DialogSizeValue = number | string;

type DialogSizePreset = 'xs' | 'sm' | 'md' | 'ml' | 'lg' | 'xl' | '2xl' | 'full';

type DialogSizeConfig = {
  width?: DialogSizeValue;
  height?: DialogSizeValue;
  minWidth?: DialogSizeValue;
  minHeight?: DialogSizeValue;
  maxWidth?: DialogSizeValue;
  maxHeight?: DialogSizeValue;
};

/** 다이얼로그 가로/세로 크기 타입 */
type DialogSize = DialogSizePreset | DialogSizeConfig;

const DEFAULT_DIALOG_CONTENT_Z_INDEX = 51;
const DIALOG_Z_INDEX_STEP = 2;
const DIALOG_VIEWPORT_GAP = '2.4rem';
const DIALOG_DEFAULT_MAX_HEIGHT = `calc(100vh - ${DIALOG_VIEWPORT_GAP})`;
const DIALOG_FULL_WIDTH = `calc(100vw - 2rem)`;
const DIALOG_FULL_HEIGHT = `calc(100vh - 2rem)`;
const DIALOG_PRESET_WIDTH: Record<Exclude<DialogSizePreset, 'full'>, string> = {
  xs: '32rem',
  sm: '48rem',
  md: '56rem',
  ml: '62rem',
  lg: '76rem',
  xl: '96rem',
  '2xl': '118rem',
};

const DIALOG_PRESET_HEIGHT: Partial<Record<DialogSizePreset, string>> = {
  xs: '40rem',
  sm: '50rem',
  md: '56rem',
  ml: '60rem',
  lg: '65rem',
  xl: '75rem',
  '2xl': '80rem',
};

const toCssSize = (value?: DialogSizeValue): string | undefined => {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string' && value.trim().toLowerCase() === 'auto') return 'auto';
  return value;
};

const isDialogSizeConfig = (size?: DialogSize): size is DialogSizeConfig => {
  return typeof size === 'object' && size !== null;
};

const getRootFontSize = (): number => {
  if (typeof window === 'undefined') return 10;
  try {
    const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    return isNaN(rootFontSize) || rootFontSize <= 0 ? 10 : rootFontSize;
  } catch {
    return 10;
  }
};

const parseCssSizeToPx = (value?: DialogSizeValue): number | undefined => {
  if (typeof value === 'number') return value;
  if (!value || typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (trimmed.toLowerCase() === 'auto') return undefined;
  if (trimmed.endsWith('rem')) {
    const num = parseFloat(trimmed);
    return isNaN(num) ? undefined : num * getRootFontSize();
  }
  if (trimmed.endsWith('px')) {
    const num = parseFloat(trimmed);
    return isNaN(num) ? undefined : num;
  }
  return undefined;
};

const parseWidthFromClassName = (className?: string): number | undefined => {
  if (!className) return undefined;
  const match = className.match(/\b(?:w|max-w)-\[(.*?)\]/);
  if (match && match[1]) {
    return parseCssSizeToPx(match[1]);
  }
  return undefined;
};

const parseHeightFromClassName = (className?: string): number | undefined => {
  if (!className) return undefined;
  const match = className.match(/\b(?:h|max-h|min-h)-\[(.*?)\]/);
  if (match && match[1]) {
    return parseCssSizeToPx(match[1]);
  }
  return undefined;
};

const parseWidthStrFromClassName = (className?: string): string | undefined => {
  if (!className) return undefined;
  const match = className.match(/\b(?:w|max-w)-\[(.*?)\]/);
  if (match && match[1]) {
    return match[1];
  }
  return undefined;
};

const getTargetWidthPx = (size?: DialogSize, className?: string): number | undefined => {
  if (size === 'full') return undefined;
  if (typeof size === 'string' && size in DIALOG_PRESET_WIDTH) {
    return parseCssSizeToPx(DIALOG_PRESET_WIDTH[size as Exclude<DialogSizePreset, 'full'>]);
  }
  if (isDialogSizeConfig(size)) {
    return parseCssSizeToPx(size.width) ?? parseCssSizeToPx(size.maxWidth);
  }
  const classWidth = parseWidthFromClassName(className);
  if (classWidth !== undefined) {
    return classWidth;
  }
  // size 및 className 미지정 시 기본 2xl (118rem = 1180px) 사용
  return parseCssSizeToPx(DIALOG_PRESET_WIDTH['2xl']);
};

const getTargetHeightPx = (size?: DialogSize, className?: string): number | undefined => {
  if (size === 'full') return undefined;
  if (typeof size === 'string' && size in DIALOG_PRESET_HEIGHT) {
    return parseCssSizeToPx(DIALOG_PRESET_HEIGHT[size as DialogSizePreset]);
  }
  if (isDialogSizeConfig(size)) {
    return parseCssSizeToPx(size.height) ?? parseCssSizeToPx(size.maxHeight);
  }
  const classHeight = parseHeightFromClassName(className);
  if (classHeight !== undefined) {
    return classHeight;
  }
  return undefined;
};

const resolveSizeValue = (value?: DialogSizeValue, presetMap?: Record<string, string>): string | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.toLowerCase() === 'auto') {
      return 'auto';
    }
    if (presetMap && trimmed in presetMap) {
      return presetMap[trimmed];
    }
    if (trimmed.endsWith('rem') || trimmed.endsWith('px') || trimmed.endsWith('%') || trimmed.startsWith('calc')) {
      return trimmed;
    }
    const num = Number(trimmed);
    if (!isNaN(num)) return `${num}px`;
    return trimmed;
  }
  return undefined;
};

const getInitialSectionWidth = (size?: DialogSize, className?: string, predefinedWidth?: string): string => {
  if (predefinedWidth) {
    return `calc(${predefinedWidth} - 4.8rem)`;
  }
  if (size === 'full') {
    return 'calc(100vw - 6.8rem)';
  }
  if (typeof size === 'string' && size in DIALOG_PRESET_WIDTH) {
    const presetW = DIALOG_PRESET_WIDTH[size as Exclude<DialogSizePreset, 'full'>];
    return `calc(${presetW} - 4.8rem)`;
  }
  if (isDialogSizeConfig(size) && size.width !== undefined) {
    const cssW = toCssSize(size.width);
    return `calc(${cssW} - 4.8rem)`;
  }
  const classW = parseWidthStrFromClassName(className);
  if (classW) {
    return `calc(${classW} - 4.8rem)`;
  }
  return `calc(${DIALOG_PRESET_WIDTH['2xl']} - 4.8rem)`;
};

const resolveDialogSize = (
  size?: DialogSize,
  viewportWidth?: number | null,
  className?: string,
  predefinedSize?: { width?: DialogSizeValue; height?: DialogSizeValue }
) => {
  if (size === 'full') {
    return {
      width: DIALOG_FULL_WIDTH,
      height: DIALOG_FULL_HEIGHT,
      maxHeight: DIALOG_FULL_HEIGHT,
      maxWidth: DIALOG_FULL_WIDTH,
      isFullSize: true,
      isFullWidth: true,
    };
  }

  // dialogSizesData 에 정의된 값이 있는 경우 해당 값을 우선 적용
  const predefinedWidthCss = resolveSizeValue(predefinedSize?.width, DIALOG_PRESET_WIDTH);
  const predefinedHeightCss = resolveSizeValue(predefinedSize?.height, DIALOG_PRESET_HEIGHT);

  const targetWidth =
    predefinedWidthCss !== undefined ? parseCssSizeToPx(predefinedWidthCss) : getTargetWidthPx(size, className);

  // 모달 목표 가로 크기가 브라우저 뷰포트 크기 - 20px 이상이면 가로만 풀사이즈(width: DIALOG_FULL_WIDTH)로 반환 (세로는 제외)
  if (viewportWidth && targetWidth !== undefined && targetWidth >= viewportWidth - 20) {
    return {
      width: DIALOG_FULL_WIDTH,
      height: predefinedHeightCss,
      maxWidth: DIALOG_FULL_WIDTH,
      maxHeight: (isDialogSizeConfig(size) ? toCssSize(size.maxHeight) : undefined) ?? DIALOG_DEFAULT_MAX_HEIGHT,
      isFullSize: false,
      isFullWidth: true,
    };
  }

  if (predefinedWidthCss !== undefined || predefinedHeightCss !== undefined) {
    const isConfig = isDialogSizeConfig(size);
    const hasConfigHeight = isConfig && size.height !== undefined;
    const defaultMaxH =
      hasConfigHeight && (!isConfig || size.maxHeight === undefined) ? undefined : DIALOG_DEFAULT_MAX_HEIGHT;

    return {
      width:
        predefinedWidthCss ??
        (typeof size === 'string' && size in DIALOG_PRESET_WIDTH
          ? DIALOG_PRESET_WIDTH[size as Exclude<DialogSizePreset, 'full'>]
          : isDialogSizeConfig(size)
            ? toCssSize(size.width)
            : undefined),
      height:
        predefinedHeightCss ??
        (typeof size === 'string' && size in DIALOG_PRESET_HEIGHT
          ? DIALOG_PRESET_HEIGHT[size as DialogSizePreset]
          : isDialogSizeConfig(size)
            ? toCssSize(size.height)
            : undefined),
      minWidth: isDialogSizeConfig(size) ? toCssSize(size.minWidth) : undefined,
      minHeight: isDialogSizeConfig(size) ? toCssSize(size.minHeight) : undefined,
      maxWidth: (isDialogSizeConfig(size) ? toCssSize(size.maxWidth) : undefined) ?? DIALOG_FULL_WIDTH,
      maxHeight: (isDialogSizeConfig(size) ? toCssSize(size.maxHeight) : undefined) ?? defaultMaxH,
      isFullSize: false,
      isFullWidth: false,
    };
  }

  if (
    size === 'xs' ||
    size === 'sm' ||
    size === 'md' ||
    size === 'ml' ||
    size === 'lg' ||
    size === 'xl' ||
    size === '2xl'
  ) {
    return {
      width: DIALOG_PRESET_WIDTH[size],
      maxWidth: DIALOG_FULL_WIDTH,
      maxHeight: DIALOG_DEFAULT_MAX_HEIGHT,
      isFullSize: false,
      isFullWidth: false,
    };
  }

  if (isDialogSizeConfig(size)) {
    const hasHeight = size.height !== undefined;
    return {
      width: toCssSize(size.width),
      height: toCssSize(size.height),
      minWidth: toCssSize(size.minWidth),
      minHeight: toCssSize(size.minHeight),
      maxWidth: toCssSize(size.maxWidth) ?? DIALOG_FULL_WIDTH,
      maxHeight: toCssSize(size.maxHeight) ?? (hasHeight ? undefined : DIALOG_DEFAULT_MAX_HEIGHT),
      isFullSize: false,
    };
  }

  return {
    maxWidth: DIALOG_FULL_WIDTH,
    maxHeight: DIALOG_DEFAULT_MAX_HEIGHT,
    isFullSize: false,
  };
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

type DialogPredefinedSizeItem = {
  id: string;
  title?: string;
  width?: DialogSizeValue;
  height?: DialogSizeValue;
  isIframe?: boolean;
};

const dialogSizesList: DialogPredefinedSizeItem[] = dialogSizesData as DialogPredefinedSizeItem[];

/**
 * dialogSizes.json에서 ID(대소문자 무관)에 매칭되는 크기 및 제목 정보를 반환합니다.
 */
export const getDialogPredefinedSize = (
  id?: string
):
  | { id?: string; title?: string; width?: DialogSizeValue; height?: DialogSizeValue; isIframe?: boolean }
  | undefined => {
  if (!id) return undefined;
  const cleanId = id.trim().toLowerCase();
  const found = dialogSizesList.find((item) => item.id?.trim().toLowerCase() === cleanId);
  if (found) {
    return { id: found.id, title: found.title, width: found.width, height: found.height, isIframe: found.isIframe };
  }
  return undefined;
};

/**
 * 현재 브라우저 URL 또는 Storybook 쿼리로부터 팝업 ID를 자동 추출합니다.
 */
export const getCurrentPopupIdFromUrl = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  try {
    const params = new URLSearchParams(window.location.search);
    const storyId = params.get('id') || params.get('story') || params.get('popupId');
    if (storyId) {
      // 1) '--' 뒤의 스토리 명칭 제거 (예: app-popup-ltpz998--default -> app-popup-ltpz998)
      const baseStoryId = storyId.split('--')[0];
      // 2) 앞의 접두사 제거 (app-popup-, app-page-, popup-, page- 등)
      const cleanId = baseStoryId.replace(/^(?:app-)?(?:popup|page)-/i, '');
      if (cleanId) {
        return cleanId;
      }
    }
    // 3) pathname 에서 추출 (/popup/system/ltpz999, /popups/ltpz998 등)
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      return lastSegment.replace(/^(?:app-)?(?:popup|page)-/i, '');
    }
  } catch {
    return undefined;
  }
  return undefined;
};

/**
 * 컴포넌트 내부 DOM 요소(타이틀 등)에서 팝업 ID 텍스트(예: LTPZ998, LTPA060)를 추출합니다.
 */
export const getPopupIdFromElement = (element?: HTMLElement | null): string | undefined => {
  if (!element) return undefined;
  try {
    const text = element.textContent || '';
    const match = text.match(/\b(LTP[A-Z0-9_-]+|LTR[A-Z0-9_-]+)\b/i);
    if (match && match[1]) {
      return match[1];
    }
  } catch {
    return undefined;
  }
  return undefined;
};

/**
 * dialogSizes.json의 isIframe 설정 또는 URL 기반으로 현재 창의 iframe 모드 여부를 검사합니다.
 * - 단, 부모 iframe ID가 'storybook-preview-iframe'인 경우 Storybook 환경이므로 false를 반환합니다.
 */
export const isExternalOrCustomIframe = (popupId?: string): boolean => {
  if (typeof window === 'undefined') return false;

  // 1. Storybook 프리뷰 iframe(storybook-preview-iframe)인 경우 항상 false
  try {
    if (
      window.name === 'storybook-preview-iframe' ||
      window.frameElement?.id === 'storybook-preview-iframe' ||
      Boolean(window.parent?.document?.getElementById('storybook-preview-iframe'))
    ) {
      return false;
    }
  } catch {
    // Cross-origin 등으로 접근 불가 시 무시하고 다음 단계 진행
  }

  // 2. dialogSizes.json에서 현재 팝업의 isIframe 설정값 조회
  const currentId = popupId || getCurrentPopupIdFromUrl();
  const predefined = getDialogPredefinedSize(currentId);
  if (predefined?.isIframe !== undefined) {
    return predefined.isIframe;
  }

  // 3. 사전 정의되지 않은 경우 최상위 창 여부로 기본 판별
  return window.self !== window.top;
};

type DialogContextValue = {
  depth: number;
  dialogId: string | null;
  isMinimized: boolean;
  setMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setModalOverride?: (override: boolean | null) => void;
  open: boolean;
  isIframe?: boolean;
};

const DialogDepthContext = React.createContext<DialogContextValue>({
  depth: 0,
  dialogId: null,
  isMinimized: false,
  setMinimized: () => {},
  modal: true,
  open: false,
  isIframe: false,
});

type DialogSizeContextValue = {
  size?: DialogSize;
  initialSectionWidth?: string;
  isFullSize?: boolean;
  isAutoFullSize?: boolean;
  isAutoFullWidth?: boolean;
};

const DialogSizeContext = React.createContext<DialogSizeContextValue>({
  size: undefined,
  initialSectionWidth: undefined,
  isFullSize: false,
  isAutoFullSize: false,
  isAutoFullWidth: false,
});

interface DialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  /**
   * 다이얼로그의 열림 상태 (Controlled)
   */
  open?: boolean;
  /**
   * 다이얼로그의 기본 초기 열림 상태 (Uncontrolled)
   */
  defaultOpen?: boolean;
  /**
   * 다이얼로그 열림 상태가 바뀔 때 호출되는 콜백 함수
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * 모달 형태로 작동할지 여부 (배경 클릭 차단 등)
   * @default true
   */
  modal?: boolean;
  /**
   * 다이얼로그의 접힘 상태 (Controlled)
   */
  minimized?: boolean;
  /**
   * 다이얼로그의 기본 초기 접힘 상태 (Uncontrolled)
   */
  defaultMinimized?: boolean;
  /**
   * 다이얼로그 접힘 상태가 바뀔 때 호출되는 콜백 함수
   */
  onMinimizeChange?: (minimized: boolean) => void;
}

/**
 * 다이얼로그 루트 컴포넌트 (Dialog)
 * - 팝업/모달의 라이프사이클과 중첩(Depth) 깊이에 따른 레이어 포커스를 관리합니다.
 */
function Dialog({
  open: openProp,
  defaultOpen,
  onOpenChange,
  minimized: minimizedProp,
  defaultMinimized,
  onMinimizeChange,
  modal = true,
  ...props
}: DialogProps) {
  const parentDialogContext = React.useContext(DialogDepthContext);
  const newDepth = parentDialogContext.depth + 1;
  const dialogId = React.useId();
  const [modalOverride, setModalOverride] = React.useState<boolean | null>(null);

  // controlled / uncontrolled minimized 상태 모두 추적
  const [minimizedState, setMinimizedState] = React.useState(defaultMinimized ?? false);
  const isMinimizedControlled = minimizedProp !== undefined;
  const isMinimized = isMinimizedControlled ? minimizedProp : minimizedState;

  const handleMinimizeChange = React.useCallback(
    (val: React.SetStateAction<boolean>) => {
      const nextVal = typeof val === 'function' ? (val as (prev: boolean) => boolean)(isMinimized) : val;
      if (!isMinimizedControlled) setMinimizedState(nextVal);
      onMinimizeChange?.(nextVal);
    },
    [isMinimizedControlled, onMinimizeChange, isMinimized]
  );

  // controlled / uncontrolled open 상태 모두 추적
  const [openState, setOpenState] = React.useState(defaultOpen ?? false);
  const isControlled = openProp !== undefined;
  const isOpen = isControlled ? openProp : openState;

  const [prevOpen, setPrevOpen] = React.useState(isOpen);

  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (!isOpen && !isMinimizedControlled) {
      setMinimizedState(defaultMinimized ?? false);
    }
  }

  const handleOpenChange = React.useCallback(
    (val: boolean) => {
      if (!isControlled) setOpenState(val);
      onOpenChange?.(val);
    },
    [isControlled, onOpenChange]
  );

  // open 상태일 때만 _openDialogs 에 등록 및 최소화 상태 반영
  React.useEffect(() => {
    if (!isOpen) return;
    registerDialog(dialogId, newDepth, isMinimized);
    return () => unregisterDialog(dialogId);
  }, [isOpen, dialogId, newDepth, isMinimized]);

  const effectiveModal = isMinimized || modalOverride === false ? false : (modalOverride ?? modal);

  const isIframeEnv = React.useMemo(() => isExternalOrCustomIframe(), []);

  return (
    <DialogDepthContext.Provider
      value={{
        depth: newDepth,
        dialogId,
        isMinimized,
        setMinimized: handleMinimizeChange,
        modal,
        setModalOverride,
        open: isOpen,
        isIframe: isIframeEnv,
      }}
    >
      <DialogPrimitive.Root
        data-slot="dialog"
        open={isOpen}
        defaultOpen={defaultOpen}
        onOpenChange={handleOpenChange}
        modal={effectiveModal}
        {...props}
      />
    </DialogDepthContext.Provider>
  );
}

/**
 * 다이얼로그 트리거 컴포넌트 (DialogTrigger)
 * - 클릭 시 다이얼로그를 오픈하는 버튼 역할을 담당합니다.
 */
function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * 다이얼로그 닫기 컴포넌트 (DialogClose)
 * - 클릭 시 다이얼로그를 닫습니다.
 */
function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

type DialogMinimizeProps = Omit<React.ComponentProps<typeof DialogPrimitive.Close>, 'color'>;

/**
 * 다이얼로그 접기 컴포넌트 (DialogMinimize)
 * - 클릭 시 다이얼로그를 접습니다.
 */
function DialogMinimize({ className, ...props }: DialogMinimizeProps) {
  const { isMinimized, setMinimized } = React.useContext(DialogDepthContext);
  return (
    <Button
      variant={'none'}
      color="transparent"
      onClick={() => setMinimized(!isMinimized)}
      className={cn('flex items-center justify-center p-0', className)}
      {...props}
    >
      {isMinimized ? (
        <span className="w-[1rem] h-[1rem] border border-[var(--color-gray-70)] border-[0.15rem] rounded-[0.2rem]"></span>
      ) : (
        <span className="w-[1.3rem] h-[0.2rem] bg-[var(--color-gray-70)] rounded-[0.2rem]"></span>
      )}
    </Button>
  );
}

interface DialogOverlayProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
  /**
   * 오픈/클로즈 트랜지션 애니메이션 비활성화 여부
   * @default false
   */
  disableMotion?: boolean;
  /**
   * 오버레이 배경의 딤 타입 (어두운 배경 / 투명 배경)
   * @default 'dark'
   */
  dim?: 'dark' | 'transparent';
}

/**
 * 다이얼로그 백드롭 오버레이 (DialogOverlay)
 * - 다이얼로그 배경을 차단하는 어두운 막 레이어입니다.
 */
function DialogOverlay({ className, style, disableMotion = false, dim = 'dark', ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      style={style}
      className={cn(
        'cp-dialog-overlay fixed inset-0 pointer-events-none',
        dim === 'dark' ? 'bg-black/60' : 'bg-transparent',
        disableMotion
          ? 'transition-none'
          : 'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...props}
    />
  );
}

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /**
   * 우측 상단에 기본 닫기(X) 버튼을 노출할지 여부
   * @default true
   */
  showCloseButton?: boolean;
  minimizeButtonClassName?: string;
  /**
   * 닫기(X) 버튼에 적용할 추가적인 CSS 클래스명
   */
  closeButtonClassName?: string;
  /**
   * 백드롭 오버레이를 렌더링할지 여부.
   * 값을 전달하지 않으면 여러 팝업이 겹쳐 열렸을 때 최상위 팝업에만 오버레이를 자동으로 띄워 가독성을 높입니다.
   */
  showOverlay?: boolean;
  /**
   * 백드롭 오버레이에 적용할 추가적인 CSS 클래스명
   */
  overlayClassName?: string;
  /**
   * 마우스 드래그를 통해 다이얼로그 너비/높이를 조절(Resize)할 수 있는지 여부
   * @default false
   */
  resizable?: boolean;
  /**
   * 다이얼로그의 z-index 우선순위 수동 지정.
   * 값을 지정하지 않을 경우, 열린 다이얼로그의 레이어 순서에 맞춰 51, 53, 55 순으로 자동 부여됩니다.
   */
  zIndex?: number;
  /**
   * 다이얼로그 크기 규격 설정 (너비/높이 사이즈)
   * - 프리셋: 'xs' | 'sm' | 'md' | 'ml' | 'lg' | 'xl' | '2xl' | 'full'
   * - 커스텀: `{ width, height, minWidth, minHeight, maxWidth, maxHeight }`
   */
  size?: DialogSize;
  /**
   * 다이얼로그의 초기 출력 기준 오프셋 좌표 (x, y)
   */
  defaultPosition?: {
    x: number;
    y: number;
  };
  minimized?: boolean;
  /**
   * 백드롭 딤(Dim) 오버레이 모드 설정
   * - 'dark': 어두운 반투명 백드롭 오버레이 표시 (기본값)
   * - 'transparent': 클릭 차단용 투명 오버레이 표시
   * - 'none': 백드롭 오버레이를 전혀 렌더링하지 않음
   * @default 'dark'
   */
  dim?: 'dark' | 'transparent' | 'none';
  /**
   * iframe 환경일 때 부모 창에 전달할 커스텀 높이 값 (px 또는 rem/string)
   */
  iframeHeight?: number | string;
  /**
   * 팝업 고유 ID (생략 시 URL/DOM에서 자동 감지하여 dialogSizes.json의 사전 정의 크기를 가져옵니다)
   */
  popupId?: string;
}

/**
 * 다이얼로그 콘텐츠 본체 (DialogContent)
 * - 실제 다이얼로그 팝업 창 영역입니다. 드래그 이동 및 크기 조절(Resizable) 기능을 내장하고 있습니다.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  closeButtonClassName,
  minimizeButtonClassName,
  showOverlay,
  overlayClassName,
  resizable = false,
  zIndex,
  size,
  defaultPosition,
  onPointerDownOutside,
  onInteractOutside,
  minimized,
  dim = 'dark',
  iframeHeight,
  popupId,
  ...props
}: DialogContentProps) {
  const { dialogId, isMinimized, setMinimized, open, setModalOverride } = React.useContext(DialogDepthContext);

  // dim === 'none' 일 때는 Radix 비모달(modal=false) 전환 및 바닥 클릭 가능 처리
  useIsomorphicLayoutEffect(() => {
    if (dim === 'none') {
      setModalOverride?.(false);
      if (typeof document !== 'undefined') {
        const originalPointerEvents = document.body.style.pointerEvents;
        document.body.style.pointerEvents = 'auto';
        return () => {
          setModalOverride?.(null);
          document.body.style.pointerEvents = originalPointerEvents;
        };
      }
      return () => {
        setModalOverride?.(null);
      };
    } else {
      setModalOverride?.(null);
    }
  }, [dim, setModalOverride]);

  // iframe 환경 검사: dialogSizes.json 의 isIframe 설정 기반으로 판별
  const [isIframeState, setIsIframeState] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return isExternalOrCustomIframe(popupId);
  });

  useIsomorphicLayoutEffect(() => {
    const currentId = popupId || getCurrentPopupIdFromUrl() || getPopupIdFromElement(contentRef.current);
    const inIframe = isExternalOrCustomIframe(currentId);
    setIsIframeState(inIframe);

    if (inIframe && typeof document !== 'undefined') {
      document.body.classList.add('is-iframe');
      return () => {
        document.body.classList.remove('is-iframe');
      };
    } else if (typeof document !== 'undefined') {
      document.body.classList.remove('is-iframe');
    }
  }, [popupId]);

  // iframe 환경일 때 부모 창으로 다이얼로그의 지정된 크기 및 화면 정보 전송 (dialogSizes.json 기반 단일화)
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      // dialogSizes.json 에서 현재 팝업의 사전 정의 정보 조회
      const currentId = popupId || getCurrentPopupIdFromUrl() || getPopupIdFromElement(contentRef.current);
      const predefined = getDialogPredefinedSize(currentId);

      // isIframe이 명시적으로 false이거나, iframe 환경이 아닌 경우 부모 창에 정보 전달 안 함
      const inIframe = predefined?.isIframe !== undefined ? predefined.isIframe : isIframeState;
      if (!inIframe) return;

      // 가로 너비 결정
      const predefinedWidthCss = resolveSizeValue(predefined?.width, DIALOG_PRESET_WIDTH);
      const targetWidthPx =
        predefinedWidthCss !== undefined ? parseCssSizeToPx(predefinedWidthCss) : getTargetWidthPx(size, className);

      if (!targetWidthPx) return;

      // 세로 높이 결정
      const rawHeight = iframeHeight ?? predefined?.height;
      const parsedIframeHeight =
        typeof rawHeight === 'number'
          ? rawHeight
          : rawHeight !== undefined
            ? parseCssSizeToPx(resolveSizeValue(rawHeight, DIALOG_PRESET_HEIGHT))
            : undefined;

      const contentHeight = parsedIframeHeight ?? getTargetHeightPx(size, className) ?? 650;

      const popupTitle = predefined?.title || '';

      try {
        window.parent.postMessage(
          {
            type: 'DIALOG_DEFAULT_SIZE',
            popupId: currentId,
            title: popupTitle,
            width: Math.round(targetWidthPx) + 2,
            height: Math.round(contentHeight),
            sizePreset: typeof size === 'string' ? size : undefined,
          },
          '*'
        );

        if (popupTitle) {
          changeTitle(popupTitle);
        }
        resizeWindow({ width: Math.round(targetWidthPx) + 2, height: Math.round(contentHeight) });
      } catch {
        // cross-origin 무시
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isIframeState, size, className, iframeHeight, popupId]);

  const resolvedShowCloseButton = showCloseButton;
  const resolvedResizable = resizable;
  const resolvedMinimized = minimized;

  // 오버레이 상태 구독만 (등록은 Dialog 에서 처리)
  const [topOpenDialogId, setTopOpenDialogId] = React.useState(getTopOpenDialogId);
  const [openCount, setOpenCount] = React.useState(getOpenCount);
  const [dialogLayerIndex, setDialogLayerIndex] = React.useState(() => getDialogLayerIndex(dialogId));

  React.useEffect(
    () =>
      subscribeOverlay(() => {
        setTopOpenDialogId(getTopOpenDialogId());
        setOpenCount(getOpenCount());
        setDialogLayerIndex(getDialogLayerIndex(dialogId));
      }),
    [dialogId]
  );

  // 레이어 기반 z-index: 열린 순서대로 51, 53, 55 ...
  const autoContentZIndex = DEFAULT_DIALOG_CONTENT_Z_INDEX + (Math.max(dialogLayerIndex, 1) - 1) * DIALOG_Z_INDEX_STEP;

  // 각 다이얼로그는 자신의 레이어 순서만으로 z-index를 결정
  const parallelZIndex = zIndex !== undefined ? zIndex : autoContentZIndex;

  const overlayZIndex = parallelZIndex - 1;

  // 단일 팝업 → 항상 암막 표시 / 복수 팝업 → 최상위 다이얼로그만 암막 표시 (현재 팝업이 최소화되었거나 iframe 환경인 경우에는 암막 숨김)
  const resolvedShowOverlay =
    !isMinimized &&
    !isIframeState &&
    (showOverlay ?? (openCount <= 1 || (dialogId !== null && dialogId === topOpenDialogId)));
  const disableOverlayMotion = openCount > 1;

  const [viewportWidth, setViewportWidth] = React.useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return null;
  });

  const [isContentOverflowing, setIsContentOverflowing] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const checkOverflow = () => {
      setViewportWidth(window.innerWidth);
      if (contentRef.current) {
        const rectWidth = contentRef.current.getBoundingClientRect().width;
        const scrollWidth = contentRef.current.scrollWidth;
        if (rectWidth >= window.innerWidth - 20 || scrollWidth >= window.innerWidth - 20) {
          setIsContentOverflowing(true);
        } else {
          setIsContentOverflowing(false);
        }
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  // dialogSizes.json 에서 현재 팝업의 사전 정의 크기 조회 (ID가 있으면 기존 크기 프로세스를 오버라이드)
  const currentPopupId = popupId || getCurrentPopupIdFromUrl();
  const predefinedSize = getDialogPredefinedSize(currentPopupId);
  const predefinedWidthCss = resolveSizeValue(predefinedSize?.width, DIALOG_PRESET_WIDTH);

  const resolvedSize = React.useMemo(
    () => resolveDialogSize(size, viewportWidth, className, predefinedSize),
    [size, viewportWidth, className, predefinedSize]
  );
  const isFullSize = size === 'full' || resolvedSize.isFullSize;
  const isFullWidth = isFullSize || resolvedSize.isFullWidth || isContentOverflowing;
  const isAutoFullWidth = isFullWidth && size !== 'full';
  const initialSectionWidth = React.useMemo(
    () => getInitialSectionWidth(size, className, predefinedWidthCss),
    [size, className, predefinedWidthCss]
  );
  const [position, setPosition] = React.useState(defaultPosition ?? { x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [resizedSize, setResizedSize] = React.useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState<string | null>(null);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const prevMinimizedRef = React.useRef(isMinimized);
  const prevPositionBeforeMinimizeRef = React.useRef<{ x: number; y: number } | null>(null);
  const prevIsInitializedBeforeMinimizeRef = React.useRef<boolean>(false);

  // 최소화/확대 상태 변화에 따른 위치 제어 (useIsomorphicLayoutEffect 사용하여 껌벅임 방지)
  useIsomorphicLayoutEffect(() => {
    if (prevMinimizedRef.current !== isMinimized) {
      prevMinimizedRef.current = isMinimized;

      if (isMinimized) {
        // 1) 최소화 시: 현재의 위치와 좌표 모드(isInitialized)를 기억
        prevPositionBeforeMinimizeRef.current = position;
        prevIsInitializedBeforeMinimizeRef.current = isInitialized;

        if (contentRef.current) {
          const rect = contentRef.current.getBoundingClientRect();
          const minimizedWidth = rect.width;
          const minimizedHeight = rect.height;

          if (isInitialized) {
            const x = (window.innerWidth - minimizedWidth) / 2;
            const y = window.innerHeight - minimizedHeight - 8;
            setPosition({ x, y });
          } else {
            const x = -minimizedWidth / 2;
            const y = window.innerHeight / 2 - minimizedHeight - 8;
            setPosition({ x, y });
          }
        }
      } else {
        // 2) 확대(복원) 시: 최소화 직전에 백업해 두었던 위치와 모드로 복원
        const restoredPos = prevPositionBeforeMinimizeRef.current ?? defaultPosition ?? { x: 0, y: 0 };
        const restoredIsInitialized = prevIsInitializedBeforeMinimizeRef.current;

        setIsInitialized(restoredIsInitialized);
        setPosition(restoredPos);
      }
    }
  }, [isMinimized, defaultPosition, isInitialized, position]);

  const [prevOpen, setPrevOpen] = React.useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) {
      setPosition(defaultPosition ?? { x: 0, y: 0 });
      setIsInitialized(false);
      setResizedSize({ width: 0, height: 0 });
      prevPositionBeforeMinimizeRef.current = null;
      prevIsInitializedBeforeMinimizeRef.current = false;
    }
  }

  const [prevDefaultPosition, setPrevDefaultPosition] = React.useState<typeof defaultPosition>(defaultPosition);

  // defaultPosition 변경 시 최신 상태로 동기화 (렌더 단계에서 동기화, x/y 좌표값 비교로 무한루프 방지)
  if (defaultPosition?.x !== prevDefaultPosition?.x || defaultPosition?.y !== prevDefaultPosition?.y) {
    setPrevDefaultPosition(defaultPosition);
    if (defaultPosition) {
      setPosition(defaultPosition);
      setIsInitialized(false);
    }
  }

  const contentStyle = React.useMemo<React.CSSProperties>(() => {
    let transformValue = `translate(-50%, -50%)`;
    if (isInitialized || isMinimized) {
      transformValue = `translate(${position.x}px, ${position.y}px)`;
    } else if (defaultPosition) {
      transformValue = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;
    }

    return {
      ...(props.style ?? {}),
      left: isFullSize ? '50%' : isInitialized ? '0px' : '50%',
      top: isFullSize ? '50%' : isInitialized ? '0px' : '50%',
      transform: isFullSize ? `translate(-50%, -50%)` : transformValue,
      cursor: isDragging ? 'grabbing' : isResizing ? 'auto' : undefined,
      width: isFullWidth ? DIALOG_FULL_WIDTH : resizedSize.width > 0 ? `${resizedSize.width}px` : resolvedSize.width,
      height: isFullSize
        ? DIALOG_FULL_HEIGHT
        : resizedSize.height > 0
          ? `${resizedSize.height}px`
          : resolvedSize.height,
      minWidth: resolvedSize.minWidth,
      minHeight: resolvedSize.minHeight,
      maxWidth: DIALOG_FULL_WIDTH,
      maxHeight: isFullSize ? DIALOG_FULL_HEIGHT : resolvedSize.maxHeight,
      zIndex: parallelZIndex,
    };
  }, [
    props.style,
    position.x,
    position.y,
    isDragging,
    isResizing,
    resizedSize,
    resolvedSize,
    parallelZIndex,
    isInitialized,
    isMinimized,
    defaultPosition,
    isFullSize,
    isFullWidth,
  ]);

  // 1. 상태 변수에 초기값을 저장할 변수 추가 (isResizing과 함께 관리)
  const [initialCapture, setInitialCapture] = React.useState<{
    width: number;
    height: number;
    x: number;
    y: number;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (isFullSize || isIframeState) return;
      e.stopPropagation();
      const target = e.target as HTMLElement;
      const resizeHandle = target.closest('[data-slot="resize-handle"]');
      const dialogHeader = target.closest('[data-slot="dialog-header"]');
      const dialogClose = target.closest('[data-slot="dialog-close"]');
      const interactiveElement = target.closest('button, a, input, textarea, select, [role="button"]');

      if (dialogClose || interactiveElement) {
        return;
      }

      const shouldAction =
        resizeHandle || dialogHeader || !contentRef.current?.querySelector('[data-slot="dialog-header"]');

      if (!shouldAction) {
        return;
      }

      // 실제 드래그/리사이즈 동작이 개시될 때만 위치를 px 단위로 고정시킵니다.
      let currentPos = position;
      if (!isInitialized && contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        currentPos = { x: rect.left, y: rect.top };
        setPosition(currentPos);
        setIsInitialized(true);
      }

      if (resizeHandle) {
        e.preventDefault();
        const rect = contentRef.current!.getBoundingClientRect();
        setIsResizing(resizeHandle.getAttribute('data-direction'));
        // 리사이즈 시작 시점의 모든 상태를 스냅샷으로 저장
        setInitialCapture({
          width: rect.width,
          height: rect.height,
          x: currentPos.x,
          y: currentPos.y,
          mouseX: e.clientX,
          mouseY: e.clientY,
        });
        return;
      }

      setIsDragging(true);
      setDragStart({ x: e.clientX - currentPos.x, y: e.clientY - currentPos.y });
    },
    [position, isInitialized, isFullSize, isIframeState]
  );

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isResizing) {
        setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
      }

      if (isResizing && initialCapture) {
        // 시작점으로부터 마우스가 움직인 총 거리
        const deltaX = e.clientX - initialCapture.mouseX;
        const deltaY = e.clientY - initialCapture.mouseY;

        let newWidth = initialCapture.width;
        let newHeight = initialCapture.height;
        let newX = initialCapture.x;
        let newY = initialCapture.y;

        // --- X축 계산 ---
        if (isResizing.includes('e')) {
          // 오른쪽 확장: 좌측(left)이 고정되고 우측으로 너비 확대
          newWidth = Math.max(100, initialCapture.width + deltaX);
          newX = initialCapture.x;
        } else if (isResizing.includes('w')) {
          // 왼쪽 확장: 우측(right)이 고정되고 좌측으로 너비 확대
          newWidth = Math.max(100, initialCapture.width - deltaX);
          const actualWidthChange = newWidth - initialCapture.width;
          newX = initialCapture.x - actualWidthChange;
        }

        // --- Y축 계산 ---
        if (isResizing.includes('s')) {
          // 아래쪽 확장: 위쪽(top)이 고정되고 아래쪽으로 높이 확대
          newHeight = Math.max(100, initialCapture.height + deltaY);
          newY = initialCapture.y;
        } else if (isResizing.includes('n')) {
          // 위쪽 확장: 아래쪽(bottom)이 고정되고 위쪽으로 높이 확대
          newHeight = Math.max(100, initialCapture.height - deltaY);
          const actualHeightChange = newHeight - initialCapture.height;
          newY = initialCapture.y - actualHeightChange;
        }

        setResizedSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
      setInitialCapture(null); // 캡처 데이터 초기화
      document.body.style.userSelect = 'auto';
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizedSize, initialCapture]);

  return (
    <DialogSizeContext.Provider value={{ size, initialSectionWidth, isFullSize, isAutoFullWidth }}>
      <DialogPortal data-slot="dialog-portal">
        {resolvedShowOverlay && dim !== 'none' && !isIframeState && (
          <DialogOverlay
            dim={dim === 'transparent' ? 'transparent' : 'dark'}
            style={{ zIndex: overlayZIndex }}
            className={cn(isIframeState && 'is-iframe', overlayClassName)}
            disableMotion={disableOverlayMotion}
          />
        )}
        <DialogPrimitive.Content
          ref={contentRef}
          data-slot="dialog-content"
          style={contentStyle}
          data-isminimize={isMinimized ? 'true' : 'false'}
          data-is-iframe={isIframeState ? 'true' : undefined}
          className={cn(
            'fixed w-full grid grid-rows-[auto_1fr_auto] gap-5 !pointer-events-auto bg-white rounded-lg border border-[var(--color-gray-20)] px-0 py-0 shadow-lg outline-none',
            isDragging || !!isResizing ? 'transition-none' : 'dialog-bounce-transition',
            isIframeState && 'is-iframe',
            className
          )}
          onMouseDown={handleMouseDown}
          onDoubleClick={() => {
            if (isMinimized) {
              setMinimized?.(false);
            }
          }}
          onPointerDownOutside={(event) => {
            event.preventDefault();
            onPointerDownOutside?.(event);
          }}
          onInteractOutside={(event) => {
            event.preventDefault();
            onInteractOutside?.(event);
          }}
          {...props}
        >
          {children}
          {(isDragging || !!isResizing) && !isFullSize && !isIframeState && (
            <div
              aria-hidden="true"
              className="absolute inset-0 z-51 bg-transparent"
              style={{
                cursor: isDragging ? 'grabbing' : undefined,
              }}
            />
          )}
          {resolvedMinimized && (
            <DialogMinimize
              className={cn(
                'flex items-center justify-center w-[2.4rem] h-[2.4rem] absolute top-[2.2rem] rounded-xs transition-opacity disabled:pointer-events-none p-0',
                resolvedShowCloseButton ? 'right-[5.6rem]' : 'right-[2.4rem]',
                minimizeButtonClassName
              )}
            />
          )}
          {resolvedShowCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              className={cn(
                'flex items-center justify-center w-[2.4rem] h-[2.4rem] ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-[2.2rem] right-[2.4rem] rounded-xs transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none',
                closeButtonClassName
              )}
            >
              <CloseIcon color="#2C2724" />
            </DialogPrimitive.Close>
          )}

          {/* Resize Handles - Only shown when resizable is true and not full size */}
          {resolvedResizable && !isFullSize && (
            <>
              <div
                data-slot="resize-handle"
                data-direction="e"
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500/20 transition-colors"
              />
              <div
                data-slot="resize-handle"
                data-direction="w"
                className="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-blue-500/20 transition-colors"
              />
              <div
                data-slot="resize-handle"
                data-direction="s"
                className="absolute bottom-0 left-0 h-1 w-full cursor-row-resize hover:bg-blue-500/20 transition-colors"
              />
              <div
                data-slot="resize-handle"
                data-direction="n"
                className="absolute top-0 left-0 h-1 w-full cursor-row-resize hover:bg-blue-500/20 transition-colors"
              />
              {/* Corner resize handles */}
              <div
                data-slot="resize-handle"
                data-direction="se"
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-blue-500/30 transition-colors rounded-bl-lg"
              />
              <div
                data-slot="resize-handle"
                data-direction="sw"
                className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize hover:bg-blue-500/30 transition-colors rounded-br-lg"
              />
              <div
                data-slot="resize-handle"
                data-direction="ne"
                className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize hover:bg-blue-500/30 transition-colors rounded-tl-lg"
              />
              <div
                data-slot="resize-handle"
                data-direction="nw"
                className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize hover:bg-blue-500/30 transition-colors rounded-tr-lg"
              />
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogSizeContext.Provider>
  );
}

/**
 * 다이얼로그 헤더 영역 (DialogHeader)
 * - 팝업 최상단 타이틀 영역이며, 잡아서 드래그하여 다이얼로그를 이동할 수 있는 트리거 영역입니다.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        'flex flex-row content-start cursor-grab w-full active:cursor-grabbing min-h-[5.6rem] justify-center shrink-0 px-6 pt-5 shrink-0',
        className
      )}
      {...props}
    />
  );
}

/**
 * 다이얼로그 하단 푸터 (DialogFooter)
 * - 다이얼로그의 하단 버튼 배치 영역입니다.
 */
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col gap-0 p-0 overflow-hidden rounded-bl-[.8rem] rounded-br-[.8rem]', className)}
      {...props}
    />
  );
}

function DialogFooterArea({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer-area"
      className={cn(
        'flex gap-2 pb-5 px-6 justify-between [&>div]:w-full [&>div]:first:justify-start [&>div]:last:justify-end',
        className
      )}
      {...props}
    />
  );
}

/**
 * 다이얼로그 타이틀 (DialogTitle)
 * - 팝업 상단 굵은 텍스트 제목 영역입니다.
 */
function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        'flex items-end gap-0.5 leading-none text-[1.6rem] tracking-tighter text-left border-b border-b-[0.1rem] border-[var(--color-gray-20)] pb-3 w-full pr-6 [&_.body-xl]:!text-[1.4rem] [&_.body-xl]:!text-[var(--color-gray-70)]',
        className
      )}
      {...props}
    />
  );
}

/**
 * 다이얼로그 세부 설명 (DialogDescription)
 */
function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

/**
 * 다이얼로그 스크롤 가능 세션 콘텐츠 영역 (DialogSection)
 */
function DialogSection({ children, className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  const { size, initialSectionWidth, isAutoFullWidth } = React.useContext(DialogSizeContext);
  const minWidthValue = isAutoFullWidth
    ? (initialSectionWidth ?? (size ? getInitialSectionWidth(size) : `calc(${DIALOG_PRESET_WIDTH['2xl']} - 4.8rem)`))
    : '100%';

  return (
    <Grid data-slot="dialog-section" className="px-6 w-full h-full overflow-auto grid-rows-[minmax(0,1fr)]" {...props}>
      <Grid
        gap={3}
        style={{ minWidth: minWidthValue }}
        className={cn('w-full h-full text-[1.4rem] grid-rows-[minmax(0,1fr)]', className)}
      >
        {children}
      </Grid>
    </Grid>
  );
}

export {
  DialogSection,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogFooterArea,
  DialogMinimize,
};
