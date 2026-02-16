import { cva, type VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { Typo, Grow } from '@/shared/components/common';
import { Table, TableBody, TableCaption, TableCell, TableHead } from '@/shared/components/uiux';
import { cn } from '@/shared/lib/shadcn/utils';

const FormCellVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-[#F4F4F4] border-r border-b border-[#E5E5E5] font-bold [td+&]:border-l px-[1rem] py-[0.8rem]',
      primary: 'bg-blue-100 text-blue-900',
      secondary: 'bg-slate-100 text-slate-900',
      light: 'bg-gray-50',
      none: 'bg-transparent border-0! p-0 [&+td]:border-0!',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface FormCellProps extends VariantProps<typeof FormCellVariants> {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  titleColSpan?: number;
  titleRowSpan?: number;
}

interface FormTableProps {
  caption?: string;
  variant?: string;
  cols?: string[]; // ["col-s", "", "col-l", ""]
  children?: ReactNode;
  className?: string;
}

export const FormCell = ({
  title,
  children,
  variant,
  className,
  colSpan,
  rowSpan,
  titleColSpan,
  titleRowSpan,
}: FormCellProps) => {
  return (
    <>
      <TableHead
        className={cn(FormCellVariants({ variant }), 'pr-0!', className)}
        {...(titleColSpan && { colSpan: titleColSpan })}
        {...(titleRowSpan && { rowSpan: titleRowSpan })}
      >
        <Typo variant="body-md" weight="bold">
          {title}
        </Typo>
      </TableHead>
      <TableCell
        className="border-b border-[#E5E5E5] px-[1rem] py-[0.8rem]"
        {...(colSpan && { colSpan })}
        {...(rowSpan && { rowSpan })}
      >
        <Grow className="gap-1" placement="sc">
          {children}
        </Grow>
      </TableCell>
    </>
  );
};

export const FormTable = ({ cols, caption, children, className, variant = 'default' }: FormTableProps) => {
  const variantStyles = {
    default: '[&_th]:pr-0',
    primary: 'data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500',
    favorite: 'data-[state=checked]:bg-transparent border-0 w-[2rem] h-[2rem] shadow-none',
    setting:
      'w-full border-t-[0.6rem] border-b-[0.6rem] border-[#F4F4F4] border-collapse bg-[#F4F4F4] [&_th]:bg-[transparent] [&_th]:text-[#333] [&_th]:font-bold [&_th]:px-[2rem] [&_td]:py-[0.6rem] [&_th]:border-none! [&_td]:border-none!',
    boxIn:
      'w-full border-none [&_th]:h-auto! bg-[transparent] [&_th]:bg-[transparent] [&_th]:text-[#333] [&_th]:font-bold [&_th]:px-0 [&_th]:py-0! [&_th]:border-none! [&_td]:border-none! [&_tr]:border-none! [&_td]:p-0!',
    none: 'border-0! bg-transparent [&_th]:bg-transparent [&_th]:border-0! [&_th]:py-0! [&_th]:pl-0! [&_th]:pr-[1rem]! [&_td]:border-0! [&_tr]:border-0! [&_td]:p-0! [&_td+th]:pl-[1rem]! [&_th]:w-max',
  };

  return (
    <Table
      className={cn('overflow-visible', variantStyles[variant as keyof typeof variantStyles], className)}
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
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export const FormRow = ({ children }: { children: ReactNode }) => {
  return <tr>{children}</tr>;
};

export const FormTableLine = ({ children }: { children: ReactNode }) => {
  return <div className="w-full border-t border-t-[.2rem] border-t-[#61554F]">{children}</div>;
};
