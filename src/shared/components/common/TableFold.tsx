/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import React, { createContext, useContext } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow, Typo, Grid } from '@atoms';

type TableFoldVariant = 'default' | 'accordion';
type TableFoldProps = {
  /** 테이블 접기 방식 스타일 변형 ('default' | 'accordion')
   * - 'default': 접기 기능 비활성화 (헤더와 본문 고정 노출)
   * - 'accordion': 접기 기능 활성화 (헤더 클릭 시 본문 토글)
   */
  variant?: TableFoldVariant;
  /** TableFold 내부에 렌더링할 자식 컴포넌트들 (TableFoldHead, TableFoldBody 등) */
  children?: React.ReactNode;
  /** 최외각 컨테이너 Grid에 적용할 추가 CSS 클래스명 */
  className?: string;
  /** 초기 렌더링 시 아코디언이 열려 있을지 여부 (기본값: true) */
  defaultOpen?: boolean;
};

interface TableFoldContextValue {
  variant: TableFoldVariant;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TableFoldContext = createContext<TableFoldContextValue | undefined>(undefined);
const useTableFoldContext = () => useContext(TableFoldContext);

interface TableFoldHeadProps {
  /** 헤더 영역 왼쪽에 표시할 제목 텍스트 */
  title?: string;
  /** 헤더 컨테이너에 적용할 추가 CSS 클래스명 */
  className?: string;
  /** 헤더 우측 영역에 렌더링할 추가 컨텐츠 (버튼, 아이콘 등) */
  children?: React.ReactNode;
  /** 헤더에 개별 적용할 아코디언 변형 스타일 (생략 시 상위 TableFold 설정 상속) */
  variant?: TableFoldVariant;
}

export const TableFold = ({ children, variant = 'accordion', className, defaultOpen = true }: TableFoldProps) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <TableFoldContext.Provider value={{ variant, open, setOpen }}>
      <Grid data-table-fold="wrap" className={cn('w-full grid-rows-[auto_1fr]', className)} placement={'bwc'}>
        {children}
      </Grid>
    </TableFoldContext.Provider>
  );
};

export const TableFoldHead = ({ children, title, className, variant }: TableFoldHeadProps) => {
  const context = useTableFoldContext();
  const v = variant ?? context?.variant ?? 'accordion';
  const handleClick = () => {
    if (v === 'accordion' && context?.setOpen) context.setOpen(!context.open);
  };
  return (
    <Grow data-table-fold="head" placement={'bwc'} className={cn('w-full min-h-[2.5rem]', className)}>
      <div
        role={v === 'accordion' ? 'button' : undefined}
        tabIndex={v === 'accordion' ? 0 : -1}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (v === 'accordion' && (e.key === 'Enter' || e.key === ' ')) {
            handleClick();
          }
        }}
        style={v === 'accordion' ? { cursor: 'pointer', outline: 'none' } : {}}
      >
        <Typo tag={'h3'} variant={'heading-md'}>
          {title}
        </Typo>
      </div>
      {context?.open && <Grow>{children}</Grow>}
    </Grow>
  );
};

export const TableFoldBody = ({ children, variant, className }: TableFoldHeadProps) => {
  const context = useTableFoldContext();
  const v = variant ?? context?.variant ?? 'accordion';
  const isHidden = v === 'accordion' && !context?.open;
  return (
    <div
      className={cn('grid w-full cp-tablecontext', className)}
      style={isHidden ? { height: 0, overflow: 'hidden' } : undefined}
    >
      {children}
    </div>
  );
};
