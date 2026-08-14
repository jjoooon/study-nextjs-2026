/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { cva, type VariantProps } from 'class-variance-authority';
import React, { ReactNode, useRef, useState, useEffect, createContext, useContext } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Typo, Grow } from '@atoms';
import { Table, TableBody, TableCaption, TableCell, TableHead } from '@uiux/Table';
import { Tooltip, TooltipTrigger, TooltipContent } from '@uiux/Tooltip';

/**
 * FormCell 제목(th) 스타일 variant 토큰.
 *
 * 목적:
 * - 입력형 테이블의 헤더/라벨 셀을 용도별(기본/무테/헤더영역 등)로 통일
 * - 호출부에서 클래스 하드코딩 없이 의미 기반으로 선택
 */
const FormCellVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-[#F4F4F4] border-r border-b border-[#E5E5E5] font-bold [td+&]:border-l px-[1rem] py-[0.8rem]',
      primary: 'bg-blue-100 text-blue-900',
      secondary: 'bg-slate-100 text-slate-900',
      light: 'bg-gray-50',
      none: 'bg-transparent border-0! p-0 [&+td]:border-0! [&+td]:border-none!',
      head: 'bg-transparent border-0! p-0 [&+td]:border-0!',
      bottom: 'bg-transparent border-0! p-0 [&+td]:border-0!',
      vertical: false,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * FormCell(제목+값 셀) props.
 */
interface FormCellProps extends VariantProps<typeof FormCellVariants> {
  /** 셀의 제목(Label) 영역에 표시할 컨텐츠 */
  title?: ReactNode;
  /** 제목 영역의 스타일 테마 변형 ('default' | 'primary' | 'section' | 'blueGray') */
  titleVariant?: 'default' | 'primary' | 'section' | 'blueGray';
  /** 셀의 값(Value) 영역에 표시할 컨텐츠 */
  children?: ReactNode;
  /** 제목 셀(th)에 적용할 추가 CSS 클래스명 */
  className?: string;
  /** 내용 셀(td)의 열 병합(colSpan) 수 */
  colSpan?: number;
  /** 내용 셀(td)의 행 병합(rowSpan) 수 */
  rowSpan?: number;
  /** 제목 셀(th)의 열 병합(colSpan) 수 */
  titleColSpan?: number;
  /** 제목 셀(th)의 행 병합(rowSpan) 수 */
  titleRowSpan?: number;
  /** 상단 구분선 표시 여부 */
  lineTop?: boolean;
  /** 세로형(헤더/값 2행) 레이아웃 적용 여부 */
  vertical?: boolean;
  /** 내용 셀(td)에 적용할 추가 CSS 클래스명 */
  tdClassName?: string;
  /** true일 경우 내용 셀(td)을 렌더링하지 않음 (제목 셀만 렌더링할 때 사용) */
  tdNone?: boolean;
  /** 제목 셀(th)에 적용할 인라인 스타일 */
  style?: React.CSSProperties;
  /** 내용 셀(td)에 적용할 인라인 스타일 */
  tdStyle?: React.CSSProperties;
}

/**
 * FormTable 루트 props.
 */
interface FormTableProps {
  /** 테이블의 캡션 텍스트 (웹 접근성용, 화면에는 보이지 않음) */
  caption?: string;
  /** 테이블 스타일 테마 프리셋 ('default' | 'primary' | 'favorite' | 'setting' | 'boxIn' | 'none' | 'head' | 'bottom') */
  variant?: string;
  /** 열 너비를 설정하기 위한 colgroup 내 <col> 태그의 CSS 클래스 배열 (예: ['w-[20%]', 'w-[30%]']) */
  cols?: string[];
  /** 테이블 내부 행(FormRow 등) 컨텐츠 */
  children?: ReactNode;
  /** 테이블 태그에 적용할 추가 CSS 클래스명 */
  className?: string;
  /** 테이블 상단 구분선 표시 여부 (기본값: true) */
  lineTop?: boolean;
  /** 세로형(헤더/값 2행) 레이아웃 모드 활성화 여부 */
  vertical?: boolean;
  /** 테이블 하단에 렌더링할 추가 영역(요약, 버튼 등) */
  after?: React.ReactNode;
}

/**
 * FormHead/FormRow 공통 props.
 */
interface FormTrProps {
  /** 행 내부 셀(FormCell 등) 컨텐츠 */
  children?: ReactNode;
  /** 세로형(헤더/값 2행) 레이아웃 모드 활성화 여부 */
  vertical?: boolean;
  /** 열 너비 설정 클래스 배열 (colgroup 설정이 필요할 경우 사용) */
  cols?: string[];
  /** 행 태그에 적용할 추가 CSS 클래스명 */
  className?: string;
  /** 행 태그에 적용할 인라인 스타일 */
  style?: React.CSSProperties;
}

/**
 * 행 렌더링 시 vertical 모드 여부를 하위 셀에 전달하는 컨텍스트.
 */
const VerticalContext = createContext<boolean | undefined>(undefined);

/**
 * FormTable에서 기본 variant를 하위 FormCell/FormRow로 전달하기 위한 컨텍스트.
 */
type FormVariant = VariantProps<typeof FormCellVariants>['variant'];
const VariantContext = createContext<FormVariant | undefined>(undefined);

/**
 * 텍스트 overflow 시에만 Tooltip을 노출하는 래퍼.
 *
 * 동작:
 * - 실제 렌더 너비(`scrollWidth > clientWidth`)를 기준으로 판정
 * - 문자열 텍스트만 툴팁 원문으로 사용
 * - ResizeObserver + window resize로 반응형 재판정
 */
function TooltipIfOverflow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflow(el.scrollWidth > el.clientWidth);
    };
    checkOverflow();

    // ResizeObserver로 크기 변화 감지
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);

    // window resize도 감지
    window.addEventListener('resize', checkOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [children]);
  let text: string | undefined = undefined;
  if (typeof children === 'string') {
    text = children;
  } else if (
    React.isValidElement<{ children?: React.ReactNode }>(children) &&
    typeof children.props.children === 'string'
  ) {
    text = children.props.children;
  }
  const triggerChild =
    typeof children === 'string' ? (
      <span tabIndex={0} role="presentation">
        {children}
      </span>
    ) : (
      children
    );
  return (
    <div ref={ref} className="w-full">
      {isOverflow && text ? (
        <Tooltip>
          <TooltipTrigger asChild className="flex w-full">
            {triggerChild}
          </TooltipTrigger>
          <TooltipContent>{text}</TooltipContent>
        </Tooltip>
      ) : (
        <div className="w-full text-center">{children}</div>
      )}
    </div>
  );
}

export const FormCell = ({
  title = '',
  titleVariant = 'default',
  children = null,
  variant,
  className,
  colSpan,
  lineTop: _lineTop,
  rowSpan,
  titleColSpan,
  titleRowSpan,
  tdClassName,
  tdStyle,
  tdNone = false,
}: FormCellProps) => {
  /** 상위 Row의 vertical 여부 */
  const contextVertical = useContext(VerticalContext);
  /** 상위 Table 기본 variant */
  const contextVariant = useContext(VariantContext);
  /** 셀 자체 variant가 있으면 우선, 없으면 상위 variant 상속 */
  const usedVariant = variant ?? contextVariant ?? 'default';

  /**
   * 제목 텍스트 색상 정책.
   * - section 제목은 primary 고정
   * - head/none/bottom 등 특수 variant는 별도 색상 정책 적용
   */
  const titleTypoColor =
    titleVariant === 'section'
      ? 'primary'
      : contextVariant === 'none' || contextVariant === 'head'
        ? 'blueGray'
        : contextVariant === 'bottom'
          ? 'default'
          : 'default';

  if (contextVariant === 'head' || usedVariant === 'head') {
    return (
      <div className="flex items-center gap-2 items-center">
        {title !== null && (
          <dt className={cn('font-bold', className)}>
            <Typo
              variant={'body-md'}
              weight="bold"
              color={titleTypoColor}
              className={`${titleVariant === 'section' ? '!text-[1.5rem]' : ''}`}
            >
              {title}
            </Typo>
          </dt>
        )}
        {!tdNone && (
          <dd className={cn('text-[#000] flex items-center gap-1', tdClassName)} style={tdStyle}>
            {children}
          </dd>
        )}
      </div>
    );
  }

  return (
    <>
      {title !== null && (
        <TableHead
          data-variant={usedVariant}
          className={cn(FormCellVariants({ variant: usedVariant }), 'text-left py-[0.4rem]', className)}
          {...(titleColSpan && { colSpan: titleColSpan })}
          {...(titleRowSpan && { rowSpan: titleRowSpan })}
        >
          <Typo
            tag="div"
            variant={'body-md'}
            weight="bold"
            color={titleTypoColor}
            className={`${titleVariant === 'section' ? '!text-[1.5rem]' : ''} leading-[1.2]`}
          >
            {title}
          </Typo>
        </TableHead>
      )}
      {!tdNone && (
        <TableCell
          className="border-b border-[#E5E5E5] px-[1rem] pt-[0.4rem] pb-[0.5rem] h-[3.8rem]"
          {...(colSpan && { colSpan })}
          {...(rowSpan && { rowSpan })}
          style={tdStyle}
        >
          {/* vertical 모드에서는 overflow 시 툴팁, 일반 모드에서는 Grow 정렬 컨테이너 사용 */}
          {contextVertical ? (
            <TooltipIfOverflow>{children}</TooltipIfOverflow>
          ) : (
            <Grow className={cn('justify-start items-center', tdClassName)}>{children}</Grow>
          )}
        </TableCell>
      )}
    </>
  );
};

export const FormTable = ({
  cols,
  caption,
  children,
  className,
  variant = 'default',
  lineTop = true,
  after,
  vertical,
}: FormTableProps) => {
  /**
   * 테이블 외형 프리셋.
   * - `default`: 표준 입력형 테이블
   * - `setting`/`boxIn`: 설정/내부박스 특화
   * - `none`/`bottom`: 무테/하단영역 특화
   * - `head`: table 태그 대신 head 전용 레이아웃 분기
   */
  const variantStyles = {
    default: `table-fixed w-full border-collapse ` + className,
    primary: 'table-fixed data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500',
    favorite: 'table-fixed data-[state=checked]:bg-transparent border-0 w-[2rem] h-[2rem] shadow-none',
    setting: `table-fixed w-full border-t-[0.6rem] border-b-[0.6rem] border-[#F4F4F4] border-collapse bg-[#F4F4F4] 
      [&_th]:bg-[transparent]
      [&_th]:text-[#333] 
      [&_th]:font-bold 
      [&_th]:px-[2rem] 
      // [&_th]:text-[1.4rem] 
      [&_td]:py-[0.6rem] 
      [&_th]:border-none 
      [&_td]:border-none! 
      [&_tr]:border-0`,
    boxIn: `table-fixed w-full border-none 
      [&_th]:h-auto bg-[transparent] 
      [&_th]:bg-[transparent] 
      [&_th]:text-[#333] 
      [&_th]:font-bold 
      [&_th]:px-0 
      [&_th]:py-0 
      // [&_th]:text-[1.4rem] 
      [&_th]:border-none 
      [&_td]:border-none 
      [&_tr]:border-none 
      [&_td]:p-0`,
    head: '', // head는 별도 분기
    none: `table-fixed border-0 bg-transparent 
    [&>table>tbody>tr>th]:bg-transparent 
    [&>table>tbody>tr>th]:border-0 
    [&>table>tbody>tr>th]:py-0 
    [&>table>tbody>tr>th]:pl-0 
    [&>table>tbody>tr>th]:pr-[0.8rem] 
    [&>table>tbody>tr>th]:h-auto 
    [&>table>tbody>tr>th]:break-keep   
    [&>table>tbody>tr>td]:border-0 
    [&>table>tbody>tr>td]:p-0 
    [&>table>tbody>tr>td]:h-auto  
    [&>table>tbody>tr]:border-0! 
    [&>table>tbody>tr>td+th]:pl-[2.4rem] 
    [&>table>tbody>tr~tr>*]:pt-[0.6rem]`,
    bottom: `table-fixed border-0 bg-transparent 
    [&>table>tbody>tr>th]:bg-transparent 
    [&>table>tbody>tr>th]:border-0 
    [&>table>tbody>tr>th]:py-0 
    [&>table>tbody>tr>th]:pl-0 
    [&>table>tbody>tr>th]:pr-[0.8rem] 
    [&>table>tbody>tr>th]:h-auto 
    [&>table>tbody>tr>th]:break-keep   
    [&>table>tbody>tr>td]:border-0 
    [&>table>tbody>tr>td]:pl-0 
    [&>table>tbody>tr>td]:pr-0 
    [&>table>tbody>tr>td]:pt-[1rem] 
    [&>table>tbody>tr>td]:pb-[0.8rem] 
    [&>table>tbody>tr>td]:h-auto   
    [&>table>tbody>tr]:!border-0 
    [&>table>tbody>tr>td+th]:pl-[2.4rem]`,
  };

  /** variant가 'none'이면 상단 구분선 비활성 */
  const showLineTop = lineTop && variant !== 'none';

  /**
   * `head` variant는 semantic table 대신
   * dl/dt/dd 기반 헤드 요약 레이아웃을 사용한다.
   */
  if (variant === 'head') {
    return (
      <div className={cn('formtable-head-root w-full', className)} data-variant={variant}>
        {caption && <div className="a11y-hidden">{caption}</div>}
        <VariantContext.Provider value={variant as FormVariant}>
          <div className="formtable-head-body">{children}</div>
        </VariantContext.Provider>
        {/* 테이블 하단 확장 슬롯 */}
        {after}
      </div>
    );
  }

  return (
    <>
      <Table
        className={cn(
          'cp-formtable overflow-visible',
          variantStyles[variant as keyof typeof variantStyles],
          showLineTop ? '!border-t !border-t-[.2rem] !border-t-[#000]' : '!border-t-0',
          className
        )}
        data-variant={variant}
        data-vertical={vertical}
      >
        {caption && <TableCaption className="a11y-hidden">{caption}</TableCaption>}
        {cols && cols.length > 0 && (
          /** 열 너비 제어를 위한 colgroup */
          <colgroup>
            {cols.map((colClass, index) => (
              <col key={index} className={colClass || undefined} />
            ))}
          </colgroup>
        )}
        <VariantContext.Provider value={variant as FormVariant}>
          <VerticalContext.Provider value={vertical}>
            <TableBody>{children}</TableBody>
          </VerticalContext.Provider>
        </VariantContext.Provider>
      </Table>
      {/* 테이블 하단 확장 슬롯 */}
      {after}
    </>
  );
};

/**
 * 입력형 테이블의 head 래퍼.
 * - 필요 시 vertical 컨텍스트를 함께 전달.
 */
export const FormHead = ({ children, vertical, cols: _cols }: FormTrProps) => {
  const contextVertical = useContext(VerticalContext);
  const usedVertical = vertical ?? contextVertical;
  return (
    <VerticalContext.Provider value={usedVertical}>
      <thead>
        <tr>{children}</tr>
      </thead>
    </VerticalContext.Provider>
  );
};

/**
 * 입력형 테이블 행 컴포넌트.
 *
 * 분기:
 * - `head` variant: dl/dt/dd 기반 헤드 레이아웃
 * - 그 외: tr 기반 일반 테이블 행
 *   - vertical=true면 2행 grid 형태로 셀 재배치
 */
export const FormRow = ({ children, vertical: propVertical, cols: _cols, className, style }: FormTrProps) => {
  const contextVariant = useContext(VariantContext);
  const contextVertical = useContext(VerticalContext);
  const vertical = propVertical ?? contextVertical;

  if (contextVariant === 'head') {
    return (
      <VerticalContext.Provider value={vertical}>
        <dl className={cn('flex flex-wrap gap-x-6 gap-y-1 [&+dl]:mt-2', className)} style={style}>
          {children}
        </dl>
      </VerticalContext.Provider>
    );
  }
  return (
    <VerticalContext.Provider value={vertical}>
      <tr
        data-vertical={vertical ? 'true' : undefined}
        className={cn(
          vertical
            ? `grid grid-rows-2 grid-flow-col overflow-x-auto border-b-0! 
            [&>*]:flex [&>*]:items-center [&>*]:justify-center [&>*]:py-1 
            [&>th+td]:border-t-0! [&>td~*]:border-l-0! [&>th>span]:leading-[1.1] 
            [&>td]:min-h-[3.8rem]! [&>td]:leading-[1.1] [&>td>div]:text-left [&>td]:whitespace-nowrap [&>td]:overflow-hidden [&>td]:h-[3.8rem]! [&>td]:px-1 [&>td]:text-center [&>td]:first-of-type:border-l-0! [&>td]:last-of-type:border-r-0! 
            [&>th]:text-center [&>th]:py-[0.4rem]! [&>th]:first-of-type:border-l-0! [&>th]:last-of-type:border-r-0! `
            : '[&>th]:first:border-l-0! [&>td]:last:border-r-0!',
          className
        )}
        {...(style && { style })}
      >
        {children}
      </tr>
    </VerticalContext.Provider>
  );
};
