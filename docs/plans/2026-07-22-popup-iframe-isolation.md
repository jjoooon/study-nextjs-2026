# 팝업 iframe 격리 (Ltpz999 레퍼런스) 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**목표:** 팝업 하나(시스템 오류/알림 다이얼로그인 `Ltpz999`)를 `<iframe>` 안에서 전용 Next.js 라우트로 로드되도록 만들어서, 그 팝업의 실제 비즈니스 콘텐츠가 자기만의 `window`/Redux store에서 실행되게 한다. 동시에 기존 `popup.open()` 호출부와 `popupSlice.ts`의 리듀서 로직은 전혀 건드리지 않는다. 이 계획은 팝업 하나를 레퍼런스 구현으로 끝까지 검증하는 데까지만 다루고, `src/features/pub/shared/components/popups/` 아래 나머지 40여 개 팝업 마이그레이션은 이 패턴이 검증된 뒤 기계적으로 반복하면 되는 후속 작업이라 이번 범위에서 제외한다.

**아키텍처:**
- 부모(호스트) 앱은 기존 `Dialog`/`DialogContent` chrome(드래그, 리사이즈, 최소화, 오버레이, `dialogOverlayRegistry.ts`를 통한 z-index 스택 관리)을 그대로 유지한다. "routed"로 등록된 팝업 타입에 대해서는 새로운 `IframeDialogRenderer`가 팝업 컴포넌트를 직접 마운트하는 대신 `<DialogContent><iframe src="/popup/{type}?id={id}" /></DialogContent>`를 렌더링한다.
- iframe은 실제 문서 간 이동(cross-document navigation)이기 때문에 자동으로 자기만의 `window`를 갖고, 모듈 스코프 싱글턴(Redux `store`, `dialogOverlayRegistry`의 Map 등)도 전부 독립된 인스턴스로 생긴다 — 이 격리를 위해 `src/app/layout.tsx`나 root layout 구조를 바꿀 필요는 전혀 없다.
- 얇은 `postMessage` 브릿지(`popupBridge.ts`)가 iframe 경계를 넘을 수 없는 딱 한 부분(props를 iframe 안으로 전달하는 것, resolve/reject 결과를 밖으로 돌려주는 것)만 대체한다. `popupSlice.ts`의 나머지(`popupCallbacksMap`, `addPopup`/`removePopup`/`rejectPopup` 리듀서)는 그대로 재사용한다 — 브릿지는 그저 지금도 존재하는 `dispatch(removePopup(...))` 호출을 그대로 트리거할 뿐이다.
- `Ltpz999.tsx`는 `Ltpz999Content.tsx`(순수 콘텐츠, `Dialog`/`DialogContent` 래퍼 없음, Radix `DialogClose` 컨텍스트 대신 `resolve()`를 직접 호출)와, 기존 인라인/Storybook 사용 방식을 그대로 유지하는 얇은 `Ltpz999.tsx` 래퍼로 분리된다.
- `confirm`/`alert`(`dialogRegistry`에 등록된 두 항목, `ConfirmDialog.tsx` 기반)는 **영구적인 예외**다 — 이번 계획의 범위 때문이 아니라 설계상 계속 기존 인라인 경로(`DialogRenderer`, iframe 없음)를 사용한다. 어디서나 즉시 열려야 하고 window 격리로 얻을 이득이 없는 상태이므로, 지금은 물론 나머지 40여 개 팝업을 마이그레이션할 때도 `routedDialogRegistry`에 절대 추가하지 않는다.

**기술 스택:** Next.js 16 App Router(기존 `src/app` 구조 그대로, 재구성 없음), Redux Toolkit, Radix Dialog(부모 chrome 전용), `postMessage` Web API.

**테스트 관련 참고:** 이 저장소에는 구성된 단위 테스트 러너가 없다(`package.json`에 `vitest`/`jest` 없음, `test` 스크립트 없음). 아래 검증 단계는 자동화 테스트 대신 `tsc --noEmit`, `next build`, `npm run dev`를 통한 수동 브라우저 확인을 사용한다. 없는 걸 있는 척하지 말고 이 사실을 그대로 밝힌다.

---

### Task 1: 브릿지 메시지 타입

**Files:**
- Create: `src/shared/utils/popup/popupBridge.ts`

**Step 1: 파일 작성**

```ts
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

export const POPUP_BRIDGE_CHANNEL = 'hgi-popup-bridge';

export type PopupBridgeMessage =
  | { channel: typeof POPUP_BRIDGE_CHANNEL; type: 'ready'; id: string }
  | { channel: typeof POPUP_BRIDGE_CHANNEL; type: 'init'; id: string; props: Record<string, unknown> }
  | { channel: typeof POPUP_BRIDGE_CHANNEL; type: 'resolve'; id: string; result?: unknown }
  | { channel: typeof POPUP_BRIDGE_CHANNEL; type: 'reject'; id: string; message: string };

export function isPopupBridgeMessage(data: unknown): data is PopupBridgeMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as Record<string, unknown>).channel === POPUP_BRIDGE_CHANNEL &&
    typeof (data as Record<string, unknown>).type === 'string' &&
    typeof (data as Record<string, unknown>).id === 'string'
  );
}
```

**Step 2: 검증**

실행: `npx tsc --noEmit -p tsconfig.json`
기대 결과: 이 파일로 인한 새 에러 없음.

**Step 3: 커밋**

```bash
git add src/shared/utils/popup/popupBridge.ts
git commit -m "feat: add postMessage bridge types for routed popups"
```

---

### Task 2: `DialogSize` export 추가 및 routed 다이얼로그 레지스트리 추가

**Files:**
- Modify: `src/shared/components/uiux/Dialog.tsx` (export 목록만, ~931-945줄)
- Modify: `src/shared/utils/popup/popupRegistry.ts`

**Step 1: Dialog.tsx에서 DialogSize export**

파일 끝의 기존 `export { ... }` 블록 아래에 추가:

```ts
export type { DialogSize };
```

**Step 2: popupRegistry.ts에 routed 레지스트리 추가**

기존 import 근처 상단에 추가:

```ts
import type { DialogSize } from '@uiux/Dialog';
```

기존 `dialogRegistry` 객체와 `registerDialog`/`getDialogLoader` 함수들 뒤에 추가:

```ts
// ============================================================================
// ROUTED REGISTRY (iframe-hosted popups)
// ============================================================================

/**
 * iframe으로 렌더링되는 팝업의 등록 정보
 *
 * @description
 * loader가 반환하는 컴포넌트는 Dialog/DialogContent를 포함하지 않는
 * "content-only" 컴포넌트여야 합니다. Dialog chrome(드래그/리사이즈/오버레이)은
 * 부모(IframeDialogRenderer)가 담당합니다.
 *
 * @important
 * confirm/alert(ConfirmDialog.tsx)는 절대 여기에 등록하지 않는다 — 즉시 열려야 하고
 * window 격리가 필요 없는 공통 팝업이라 항상 dialogRegistry(inline) 경로만 사용한다.
 */
export interface RoutedDialogEntry {
  loader: DialogLoader;
  size?: DialogSize;
  resizable?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const routedDialogRegistry: Record<string, RoutedDialogEntry> = {
  'system/ltpz999-demo': {
    loader: () =>
      import('@features/pub/shared/components/popups/Ltpz999Content') as unknown as Promise<{
        default: ComponentType<Record<string, unknown>>;
      }>,
    size: 'sm',
    resizable: true,
    showCloseButton: false,
    className: 'grid-rows-[1fr_auto] !max-h-[42.2rem]',
  },
};

export function registerRoutedDialog(popupType: string, entry: RoutedDialogEntry) {
  if (routedDialogRegistry[popupType]) {
    logger.warn(`[RoutedDialogRegistry] Overriding routed dialog: ${popupType}`);
  }
  routedDialogRegistry[popupType] = entry;
}

export function getRoutedDialogEntry(popupType: string): RoutedDialogEntry | undefined {
  return routedDialogRegistry[popupType];
}

export function isRoutedDialog(popupType: string): boolean {
  return popupType in routedDialogRegistry;
}
```

**Step 3: 검증**

실행: `npx tsc --noEmit -p tsconfig.json`
기대 결과: 아직 `Ltpz999Content`가 없어서(Task 3에서 생성) 그 모듈을 찾지 못한다는 에러만 발생 — 정확히 그 에러인지, 다른 에러는 없는지 확인.

**Step 4: 커밋**

(Task 3와 함께 커밋 — 이 레지스트리 항목이 아직 존재하지 않는 파일을 참조하기 때문.)

---

### Task 3: `Ltpz999Content` 추출 및 `resolve` 연결

**Files:**
- Create: `src/features/pub/shared/components/popups/Ltpz999Content.tsx`
- Modify: `src/features/pub/shared/components/popups/Ltpz999.tsx`

**Step 1: 콘텐츠 전용 컴포넌트 생성**

```tsx
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { ArrowIcon, ErrorIcon, QueryIcon, NotiIcon } from '@icons';
import { Button } from '@uiux/Button';
import { DialogSection, DialogFooter, DialogFooterArea } from '@uiux/Dialog';

type Ltpz999ContentProps = {
  errorType: string;
  resolve?: (result?: unknown) => void;
};

/**
 * Ltpz999Content: Ltpz999의 실제 콘텐츠 (Dialog/DialogContent 없음)
 *
 * @description
 * iframe 라우트(/popup/system/ltpz999-demo)에서 렌더링되는 버전.
 * 닫기 동작은 Radix DialogClose 컨텍스트 대신 resolve() 직접 호출로 처리한다 —
 * 이 컴포넌트는 부모 Dialog 컨텍스트 밖(별도 window)에서 실행되기 때문.
 */
const Ltpz999Content: React.FC<Ltpz999ContentProps> = ({ errorType = '오류', resolve }) => {
  const [solutionOpen, setSolutionOpen] = React.useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const solutionButtonWrapRef = React.useRef<HTMLDivElement | null>(null);

  const scrollSolutionButtonToTop = React.useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    const solutionButtonWrap = solutionButtonWrapRef.current;

    if (!scrollContainer || !solutionButtonWrap) {
      return;
    }

    const containerRect = scrollContainer.getBoundingClientRect();
    const buttonRect = solutionButtonWrap.getBoundingClientRect();
    const nextScrollTop = scrollContainer.scrollTop + (buttonRect.top - containerRect.top - 5);

    scrollContainer.scrollTo({ top: nextScrollTop, behavior: 'smooth' });
  }, []);

  React.useEffect(() => {
    if (!solutionOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      scrollSolutionButtonToTop();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [scrollSolutionButtonToTop, solutionOpen]);

  return (
    <>
      <VisuallyHidden.Root>
        <h2>시스템 오류 안내</h2>
      </VisuallyHidden.Root>

      <DialogSection className="pt-5 gap-5 grid-rows-[auto_auto_1fr]">
        <Grow placement="ec" className="text-[var(--color-gray-70)]">
          코드 LTRE006(trandZomH110)
        </Grow>

        <Gcol gap={2}>
          <Grow className="w-[4.4rem] h-[4.4rem] bg-[var(--color-gray-5)] rounded-3xl">
            {errorType === '오류' && <ErrorIcon />}
            {errorType === '질의' && <QueryIcon />}
            {errorType === '알림' && <NotiIcon />}
          </Grow>
          <Typo variant={'body-lg'} className="font-bold">
            {errorType}
          </Typo>
        </Gcol>

        <div ref={scrollContainerRef} className="overflow-y-auto [&_div]:!text-[1.4rem]">
          <Gcol placement="cc">
            <BulletItem type="dot">시스템 오류가 발생했습니다.</BulletItem>

            <Gcol
              className="rounded-[0.6rem] bg-[var(--color-gray-5)] px-2 py-[0.25rem] gap-2 border border-[var(--color-gray-15)] max-w-[36rem]"
              placement="ss"
            >
              <div ref={solutionButtonWrapRef} className={'w-full'}>
                <Button
                  variant={'none'}
                  className="!justify-between w-full font-bold px-0"
                  onClick={() => setSolutionOpen(!solutionOpen)}
                >
                  처리방안
                  <ArrowIcon className={`${solutionOpen ? 'rotate-[90deg]' : 'rotate-[-90deg]'}`} size={16} />
                </Button>
              </div>

              {solutionOpen && (
                <div className="">
                  오류가 났을 경우 해소는 이렇게 해주세요.
                  <br />
                  [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                </div>
              )}
            </Gcol>
          </Gcol>
        </div>
      </DialogSection>

      <DialogFooter>
        <DialogFooterArea>
          <Grow>
            <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
              메시지 개선요청
            </Button>
            <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
              알림상세설명
            </Button>
          </Grow>
          <Grow>
            <Button variant={'contained'} size={'xl'}>
              연계버튼
            </Button>
            <Button variant={'outlined'} size={'xl'} color={'gray-light'} onClick={() => resolve?.()}>
              닫기
            </Button>
          </Grow>
        </DialogFooterArea>
        <DialogBottomInfo />
      </DialogFooter>
    </>
  );
};

export default Ltpz999Content;
```

**Step 2: Ltpz999.tsx를 얇은 래퍼로 축소**

전체 파일을 아래로 교체:

```tsx
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import * as React from 'react';
import { Dialog, DialogContent } from '@uiux/Dialog';
import Ltpz999Content from './Ltpz999Content';

type Ltpz999Props = {
  errorType: string; // 오류, 질의, 알림 중 하나의 상태를 받음
};

/**
 * Ltpz999: 인라인(비 iframe) 사용 및 Storybook 호환용 래퍼.
 * 실제 콘텐츠는 Ltpz999Content 참고.
 */
const Ltpz999: React.FC<Ltpz999Props> = ({ errorType = '오류' }) => {
  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        resizable={true}
        size={'sm'}
        className="grid-rows-[1fr_auto] !max-h-[42.2rem]"
      >
        <Ltpz999Content errorType={errorType} />
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz999;
```

**Step 3: Storybook에서 변화 없이 렌더링되는지 확인**

실행: `npm run storybook` (또는 `package.json`에 있는 실제 스크립트) 후 `LTPZ999` 스토리를 연다.
기대 결과: 이번 변경 전과 시각적으로 동일함 (같은 chrome, 같은 콘텐츠, `Ltpz999.tsx`가 여전히 `Dialog`/`DialogContent`로 자체 래핑하므로 드래그/리사이즈/접기도 그대로 동작).

**Step 4: 타입 검증**

실행: `npx tsc --noEmit -p tsconfig.json`
기대 결과: 에러 없음 (Task 2에서 나던 "모듈 없음" 에러가 여기서 해소됨).

**Step 5: 커밋**

```bash
git add src/features/pub/shared/components/popups/Ltpz999.tsx \
        src/features/pub/shared/components/popups/Ltpz999Content.tsx \
        src/shared/components/uiux/Dialog.tsx \
        src/shared/utils/popup/popupRegistry.ts
git commit -m "refactor: split Ltpz999 into chrome wrapper and routable content"
```

---

### Task 4: 부모 측 `IframeDialogRenderer`

**Files:**
- Create: `src/shared/components/popups/IframeDialogRenderer.tsx`

**Step 1: 컴포넌트 작성**

```tsx
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent } from '@uiux/Dialog';
import type { PopupInstance } from '@/shared/store/popupSlice';
import { removePopup, rejectPopup } from '@/shared/store/popupSlice';
import { isPopupBridgeMessage, POPUP_BRIDGE_CHANNEL } from '@/shared/utils/popup/popupBridge';
import { getRoutedDialogEntry } from '@/shared/utils/popup/popupRegistry';

type IframeDialogRendererProps = Omit<PopupInstance, 'zIndex'>;

/**
 * IframeDialogRenderer: routed 팝업을 iframe으로 렌더링
 *
 * @description
 * Dialog chrome(드래그/리사이즈/오버레이/z-index)은 그대로 부모 쪽에서 담당하고,
 * 실제 콘텐츠만 /popup/{type} 라우트를 통해 별도 window에서 로드한다.
 */
export function IframeDialogRenderer({ id, popupType, props }: IframeDialogRendererProps) {
  const dispatch = useDispatch();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const entry = getRoutedDialogEntry(popupType);
  const src = useMemo(() => `/popup/${popupType}?id=${encodeURIComponent(id)}`, [popupType, id]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;

      const data = event.data;
      if (!isPopupBridgeMessage(data) || data.id !== id) return;

      if (data.type === 'ready') {
        iframeRef.current?.contentWindow?.postMessage(
          { channel: POPUP_BRIDGE_CHANNEL, type: 'init', id, props },
          window.location.origin
        );
        return;
      }

      if (data.type === 'resolve') {
        dispatch(removePopup({ popupId: id, result: data.result }));
        return;
      }

      if (data.type === 'reject') {
        dispatch(rejectPopup({ popupId: id, error: new Error(data.message) }));
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [id, props, dispatch]);

  if (!entry) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={entry.showCloseButton ?? true}
        resizable={entry.resizable ?? false}
        size={entry.size}
        className={entry.className}
      >
        <iframe ref={iframeRef} src={src} title={popupType} className="w-full h-full border-0" />
      </DialogContent>
    </Dialog>
  );
}
```

**Step 2: 검증**

실행: `npx tsc --noEmit -p tsconfig.json`
기대 결과: 에러 없음.

**Step 3: 커밋**

```bash
git add src/shared/components/popups/IframeDialogRenderer.tsx
git commit -m "feat: add IframeDialogRenderer for routed popups"
```

---

### Task 5: `DialogRoot`에서 routed/inline 분기 처리

**Files:**
- Modify: `src/shared/components/popups/DialogRoot.tsx`

**Step 1: 렌더 루프 수정**

```tsx
import { createPortal } from 'react-dom';
import { useAppSelector } from '@/redux';
import { selectAllPopups } from '@/shared/store/popupSelectors';
import { isRoutedDialog } from '@/shared/utils/popup/popupRegistry';
import { DialogRenderer } from './DialogRenderer';
import { IframeDialogRenderer } from './IframeDialogRenderer';

export function DialogRoot() {
  const popups = useAppSelector(selectAllPopups);

  if (popups.length === 0) return null;
  if (typeof window === 'undefined') return null;

  return createPortal(
    <>
      {popups.map((popup) =>
        isRoutedDialog(popup.popupType) ? (
          <IframeDialogRenderer key={popup.id} {...popup} />
        ) : (
          <DialogRenderer key={popup.id} {...popup} />
        )
      )}
    </>,
    document.body
  );
}
```

**Step 2: 검증**

실행: `npx tsc --noEmit -p tsconfig.json`
기대 결과: 에러 없음.

**Step 3: 커밋**

```bash
git add src/shared/components/popups/DialogRoot.tsx
git commit -m "feat: route popups registered as routed through IframeDialogRenderer"
```

---

### Task 6: iframe 쪽 라우트와 브릿지 클라이언트

**Files:**
- Create: `src/shared/components/popups/PopupFrameClient.tsx`
- Create: `src/app/popup/[...type]/page.tsx`

**Step 1: 클라이언트 브릿지 컴포넌트 작성**

```tsx
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { isPopupBridgeMessage, POPUP_BRIDGE_CHANNEL } from '@/shared/utils/popup/popupBridge';
import { getRoutedDialogEntry } from '@/shared/utils/popup/popupRegistry';

type PopupFrameClientProps = {
  popupType: string;
  id: string;
};

/**
 * PopupFrameClient: /popup/[...type] 라우트 안에서 실행되는 브릿지
 *
 * @description
 * 부모에게 ready를 보내고 init(props)을 기다린 뒤 실제 팝업 콘텐츠를 로드한다.
 * 콘텐츠가 resolve()를 호출하면 postMessage로 부모에 전달한다 —
 * 부모의 popupSlice.ts(dispatch(removePopup))는 전혀 변경하지 않는다.
 */
export function PopupFrameClient({ popupType, id }: PopupFrameClientProps) {
  const [Component, setComponent] = useState<ComponentType<Record<string, unknown>> | null>(null);
  const [props, setProps] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const entry = getRoutedDialogEntry(popupType);
    if (!entry) return;

    let isMounted = true;
    entry.loader().then((module) => {
      if (!isMounted) return;
      const mod = module as { default: ComponentType<Record<string, unknown>> };
      setComponent(() => mod.default);
    });

    return () => {
      isMounted = false;
    };
  }, [popupType]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;

      const data = event.data;
      if (!isPopupBridgeMessage(data) || data.id !== id) return;

      if (data.type === 'init') {
        setProps(data.props);
      }
    }

    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ channel: POPUP_BRIDGE_CHANNEL, type: 'ready', id }, window.location.origin);

    return () => window.removeEventListener('message', handleMessage);
  }, [id]);

  const resolve = (result?: unknown) => {
    window.parent.postMessage({ channel: POPUP_BRIDGE_CHANNEL, type: 'resolve', id, result }, window.location.origin);
  };

  if (!Component || !props) {
    return null;
  }

  return <Component {...props} resolve={resolve} />;
}
```

**Step 2: 라우트 페이지 작성**

```tsx
/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { PopupFrameClient } from '@/shared/components/popups/PopupFrameClient';

export default async function PopupFramePage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string[] }>;
  searchParams: Promise<{ id?: string }>;
}) {
  const { type } = await params;
  const { id } = await searchParams;

  if (!id) {
    return null;
  }

  return <PopupFrameClient popupType={type.join('/')} id={id} />;
}
```

**Step 3: 검증**

실행: `npx tsc --noEmit -p tsconfig.json`
기대 결과: 에러 없음.

**Step 4: 커밋**

```bash
git add src/shared/components/popups/PopupFrameClient.tsx src/app/popup/[...type]/page.tsx
git commit -m "feat: add /popup/[...type] route to host routed popup content in its own window"
```

---

### Task 7: 수동 End-to-End 검증

**Files:**
- Modify: `src/features/sample/popuptest/sections/PopupTestSection.tsx` (임시 트리거 버튼 — 검증 후 유지할지 되돌릴지는 판단해서 결정)

**Step 1: 임시 트리거 추가**

컴포넌트 상단 근처에 추가:

```tsx
import { popup } from '@/shared/utils/popup';
```

아래 버튼 추가:

```tsx
<button onClick={() => popup.open('system/ltpz999-demo', { errorType: '오류' })}>
  routed popup 열기
</button>
```

**Step 2: dev 서버 실행 후 네트워크/DOM 확인**

실행: `npm run dev`

브라우저에서 `/sample/popuptest`:
1. 버튼 클릭. 기존 `DialogContent` chrome(부모의 드래그 핸들, 리사이즈 핸들이 그대로 동작해야 함) 안에 `<iframe src="/popup/system/ltpz999-demo?id=popup-...">`가 나타나는지 확인.
2. DevTools → Elements에서 iframe이 자기만의 `#document`를 갖는지 확인. DevTools의 frame 선택기로 iframe 콘솔 컨텍스트를 열어 `window === window.top`을 실행 — `false`가 나와야 별도 window임이 확인됨.
3. iframe 콘솔에서 `store`가 부모의 것과 다른 객체인지 확인 — 예를 들어 부모 탭의 Redux에서 무언가를 dispatch한 뒤, iframe 쪽 Redux DevTools(프레임별로 붙어 있다면)에 반영되지 않는지 확인.
4. iframe 콘텐츠 안의 "닫기" 클릭. 팝업 전체(iframe + 부모 chrome)가 언마운트되고, 트리거에서 만든 `await popup.open(...)` Promise가 실제로 resolve되는지 확인(콘솔에서 보려면 임시로 `.then(console.log)` 추가).
5. `AuthGuard`가 iframe을 `/login`으로 리다이렉트하지 않는지 확인 — `redux-persist`가 `sessionStorage`(`whitelist: ['auth', 'ui']`, `src/redux/config.ts:40,43`)를 쓰기 때문에, 같은 origin의 `sessionStorage`는 부모 탭에서 이미 채워져 있어 iframe 안에서도 정상적으로 rehydrate 되어야 함. 만약 리다이렉트된다면 이건 넘어가지 말고 실제로 고쳐야 할 발견 사항임.

**Step 3: 트리거 되돌리기 또는 유지**

이번 검증용으로만 넣은 거라면 확인 후 `PopupTestSection.tsx`를 원래대로 되돌린다. 계속 남겨둘 거라면 정식 샘플로 커밋한다.

**Step 4: 커밋 (트리거를 유지하는 경우)**

```bash
git add src/features/sample/popuptest/sections/PopupTestSection.tsx
git commit -m "test: add manual trigger for routed popup verification"
```

---

## 알려진 제약 (의도적으로 보류)

- **iframe 안에서 열리는 하위 팝업은 그 iframe 박스 크기로 클리핑된다.** `Ltpz999Content`(또는 향후 다른 routed 팝업 콘텐츠) 안에서 `popup.open()`/`popup.confirm()`/`popup.alert()`를 호출하면 — 대상이 routed든 inline(`confirm`/`alert`)이든 상관없이 — 그 하위 팝업은 호출한 쪽의 iframe(`DialogContent`의 `size` 프리셋만큼만 크기, 예: 'sm' ≈ 48rem)의 로컬 `DialogRoot`가 렌더링한다. iframe은 자기 박스 바깥으로 그려질 수 없으므로, 화면 전체를 덮는 딤 처리나 화면 중앙 정렬을 기대하는 하위 팝업은 작은 박스 안에 눌려 담긴 모양이 된다.
- **근본 해결 방향(적용 보류):** `popup.open()`이 `isIframe()`으로 자신이 최상위 window인지 확인해서, 최상위가 아니면 로컬 store에 dispatch하는 대신 `postMessage`로 요청을 부모(`window.parent`)에 릴레이한다. 중첩이 몇 겹이든(page → popup2 → popup3 → ...) 각 단계가 이 릴레이를 반복해 결국 진짜 최상위 페이지의 store 하나에만 등록되도록 하면, 모든 팝업이 하나의 `dialogOverlayRegistry`/`DialogRoot`로 관리되어 클리핑 문제가 사라진다. 닫힐 때는 최상위의 `removePopup`이 그대로 동작하고 결과만 postMessage로 역방향 릴레이하면 된다.
- 사용자 판단으로 이번 계획(Ltpz999 레퍼런스 구현) 범위에서는 **보류**하기로 함 — `popupApi.ts`(`open()`)와 항상 마운트된 relay 리스너를 새로 만들어야 하는 규모 있는 변경이라, 실제로 iframe 안에서 하위 팝업을 여는 케이스가 나올 때 별도로 다룬다. 나머지 팝업을 마이그레이션하기 전에, 마이그레이션 대상 팝업들이 자기 내부에서 `popup.open()`/`confirm()`/`alert()`를 호출하는지부터 확인해서 이 제약에 걸리는지 점검할 것.

## 이 계획에서 명시적으로 제외하는 것

- `confirm`/`alert`(`ConfirmDialog.tsx`)을 iframe/routed 방식으로 마이그레이션하는 것 — 이건 나중으로 미룬 게 아니라 **영구적으로** 범위 밖. 지금처럼 계속 `DialogRenderer`를 그대로 사용한다.
- `src/features/pub/shared/components/popups/` 아래 나머지 40여 개 팝업 마이그레이션 — 이 패턴이 검증되고 나면 Task 3의 분리 작업을 기계적으로 반복하면 됨. 이 후속 작업에서도 `confirm`/`alert`은 제외.
- `src/app/layout.tsx` 변경이나 route group 재구성 — 불필요함이 확인됨. iframe 경계 자체가 window/Redux 격리를 제공함.
- `globals.css:1001-1013`의 주석 처리된 `.is-iframe` CSS를 되살리는 것 — 그 규칙은 다른 시나리오(이 앱 전체가 남의 iframe 안에 임베드되는 경우)를 위해 작성된 것이라 이번 설계(chrome이 iframe 밖에 남아 있음)에는 해당 없음.
- iframe 라우트 안에 로컬 Redux store를 두는 것 — `Ltpz999Content`는 오늘 시점에 그게 필요 없음. 나중에 어떤 routed 팝업이 로컬 상태 관리가 필요해지면, 그때 가서 `(popup-frame)`에 준하는 provider 스코프로 새 `configureStore()`를 추가하면 되고, 지금 미리 만들어둘 필요는 없음.
