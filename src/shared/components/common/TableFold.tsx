
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@uiux/Accordion";
import { Grow, Gcol, Typo } from '@atoms';

import React, { createContext, useContext } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';


type TableFoldVariant = 'default' | 'accordion';
type TableFoldProps = {
  variant?: TableFoldVariant;
  children?: React.ReactNode;
};

interface TableFoldContextValue {
  variant: TableFoldVariant;
}

const TableFoldContext = createContext<TableFoldContextValue | undefined>(undefined);
const useTableFoldContext = () => useContext(TableFoldContext);


interface TableFoldHeadProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: TableFoldVariant;
}


export const TableFold = ({ children, variant = 'default' }: TableFoldProps) => {
  return (
    <TableFoldContext.Provider value={{ variant }}>
      {variant === 'default' ? (
        <Gcol gap={1.5} className="w-full">
          {children}
        </Gcol>
      ) : (
        <Accordion
          type="single"
          collapsible
          defaultValue="shipping"
          className="w-full"
          variant={"tableHead"}
        >
          <AccordionItem value="shipping" className="flex flex-col w-full gap-1.5">
            {children}
          </AccordionItem>
        </Accordion>
      )}
    </TableFoldContext.Provider>
  );
};


export const TableFoldHead = ({ children, title, className, variant }: TableFoldHeadProps) => {
  const context = useTableFoldContext();
  const v = variant ?? context?.variant ?? 'accordion';
  if (v === 'default') {
    return (
      <Grow placement={'bwc'} className={cn('w-full', className)}>
        <Typo tag={'h3'} variant={'heading-md'}>
          {title}
        </Typo>
        <Grow>
          {children}
        </Grow>
      </Grow>
    );
  }
  return (
    <AccordionTrigger title={title} className={cn('justify-between w-full pt-0!', className)}>
      {children}
    </AccordionTrigger>
  );
};


export const TableFoldBody = ({ children, variant }: TableFoldHeadProps) => {
  const context = useTableFoldContext();
  const v = variant ?? context?.variant ?? 'accordion';
  if (v === 'default') {
    return <div className="w-full">{children}</div>;
  }
  return (
    <AccordionContent className={cn('justify-between w-full pb-0!')}>
      {children}
    </AccordionContent>
  );
};