
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
      <Grid data-table-fold="wrap" gap={1.5} className="w-full grid-rows-[auto_1fr] " placement={'bwc'}>
        {children}
      </Grid>
    </TableFoldContext.Provider>
  );
};


export const TableFoldHead = ({ children, title, className, variant }: TableFoldHeadProps) => {
  const context = useTableFoldContext();
  const v = variant ?? context?.variant ?? 'accordion';
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
};


export const TableFoldBody = ({ children, variant }: TableFoldHeadProps) => {
  const context = useTableFoldContext();
  const v = variant ?? context?.variant ?? 'accordion';
  return <>{children}</>;
};