/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Typo, Grow } from '@atoms';
import { Table, TableBody, TableCaption, TableCell, TableHead } from '@uiux/Table';
import { Tooltip, TooltipTrigger, TooltipContent } from '@uiux/Tooltip';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { ReactNode, useRef, useState, useEffect, createContext, useContext } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

const FormCellVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-[#F4F4F4] border-r border-b border-[#E5E5E5] font-bold [td+&]:border-l px-[1rem] py-[0.8rem]',
      primary: 'bg-blue-100 text-blue-900',
      secondary: 'bg-slate-100 text-slate-900',
      light: 'bg-gray-50',
      none: 'bg-transparent border-0! p-0 [&+td]:border-0!',
      head: 'bg-transparent border-0! p-0 [&+td]:border-0!',
      bottom: 'bg-transparent border-0! p-0 [&+td]:border-0!',
      vertical: false,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface FormCellProps extends VariantProps<typeof FormCellVariants> {
  title?: ReactNode;
  titleVariant?: 'default' | 'primary' | 'section' | 'blueGray';
  children?: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  titleColSpan?: number;
  titleRowSpan?: number;
  lineTop?: boolean;
  vertical?: boolean;
  tdClassName?: string;
  tdNone?: boolean;
  style?: React.CSSProperties;
  tdStyle?: React.CSSProperties;
}

interface FormTableProps {
  caption?: string;
  variant?: string;
  cols?: string[]; // ["col-s", "", "col-l", ""]
  children?: ReactNode;
  className?: string;
  lineTop?: boolean;
  vertical?: boolean;
  after?: React.ReactNode;
}

interface FormTrProps {
  children?: ReactNode;
  vertical?: boolean;
  cols?: string[]; // ["col-s", "", "col-l", ""]
  className?: string;
  style?: React.CSSProperties;
}

// vertical context 생성
const VerticalContext = createContext<boolean | undefined>(undefined);

// variant context: allow FormTable to provide a default variant for FormCell
type FormVariant = VariantProps<typeof FormCellVariants>['variant'];
const VariantContext = createContext<FormVariant | undefined>(undefined);

// Grow(혹은 그 내부 텍스트)가 잘릴 때 Tooltip을 보여주는 HOC
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
  const contextVertical = useContext(VerticalContext);
  const contextVariant = useContext(VariantContext);
  const usedVariant = variant ?? contextVariant ?? 'default';
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
          className={cn(FormCellVariants({ variant: usedVariant }), 'text-left py-[0.4rem]', className)}
          {...(titleColSpan && { colSpan: titleColSpan })}
          {...(titleRowSpan && { rowSpan: titleRowSpan })}
        >
          <Typo
            variant={'body-md'}
            weight="bold"
            color={titleTypoColor}
            className={`${titleVariant === 'section' ? '!text-[1.5rem]' : ''}`}
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
}: FormTableProps) => {
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
    [&>table>tbody>tr>td]:p-0 
    [&>table>tbody>tr>td]:pt-[1rem] 
    [&>table>tbody>tr>td]:pb-[0.8rem] 
    [&>table>tbody>tr>td]:h-auto   
    [&>table>tbody>tr]:!border-0 
    [&>table>tbody>tr>td+th]:pl-[2.4rem]`,
  };

  // variant가 'none'이면 lineTop을 무시
  const showLineTop = lineTop && variant !== 'none';

  if (variant === 'head') {
    return (
      <div className={cn('formtable-head-root w-full', className)} data-variant={variant}>
        {caption && <div className="a11y-hidden">{caption}</div>}
        <VariantContext.Provider value={variant as FormVariant}>
          <div className="formtable-head-body">{children}</div>
        </VariantContext.Provider>
        {after}
      </div>
    );
  }

  return (
    <>
      <Table
        className={cn(
          'overflow-visible',
          variantStyles[variant as keyof typeof variantStyles],
          showLineTop ? 'border-t border-t-[.2rem] border-t-[#000]' : 'border-t-0',
          className
        )}
        data-variant={variant}
      >
        {caption && <TableCaption className="a11y-hidden">{caption}</TableCaption>}
        {cols && cols.length > 0 && (
          <colgroup>
            {cols.map((colClass, index) => (
              <col key={index} className={colClass || undefined} />
            ))}
          </colgroup>
        )}
        <VariantContext.Provider value={variant as FormVariant}>
          <TableBody>{children}</TableBody>
        </VariantContext.Provider>
      </Table>
      {after}
    </>
  );
};
export const FormHead = ({ children, vertical, cols: _cols }: FormTrProps) => {
  return (
    <VerticalContext.Provider value={vertical}>
      <thead>
        <tr>{children}</tr>
      </thead>
    </VerticalContext.Provider>
  );
};

export const FormRow = ({ children, vertical, cols: _cols, className, style }: FormTrProps) => {
  const contextVariant = useContext(VariantContext);
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
