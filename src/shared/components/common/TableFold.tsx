
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@uiux/Accordion";
import { Grow, Gcol, Typo, Grid } from '@atoms';

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


export const TableFold = ({ children, variant = 'accordion' }: TableFoldProps) => {
  return (
    <TableFoldContext.Provider value={{ variant }}>
      {variant === 'default' ? (
        <Grid data-table-fold="wrap" gap={1.5} className="w-full grid-rows-[auto_1fr] " placement={'bwc'}>
          {children}
        </Grid>
      ) : ( 
        <Accordion
          type="single"
          collapsible
          defaultValue="shipping"
          className="w-full grid"
          variant={"tableHead"}
        >
          <AccordionItem data-table-fold="wrap" value="shipping" className="grid grid-rows-[auto_1fr] w-full gap-[0.6rem] relative">
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
      <Grow data-table-fold="head" placement={'bwc'} className={cn('w-full', className)}>
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
    <AccordionTrigger data-table-fold="head" title={title} className={cn('justify-between w-full pt-0!', className)}>
      {children}
    </AccordionTrigger>
  );
};


export const TableFoldBody = ({ children, variant }: TableFoldHeadProps) => {
  const context = useTableFoldContext();
  const v = variant ?? context?.variant ?? 'accordion';
  if (v === 'default') {
    return <>{children}</>;
  }
  return (
    <AccordionContent data-table-fold="body" className={cn('w-full pb-0! relative ')}>
      {children}
    </AccordionContent>
  );
};