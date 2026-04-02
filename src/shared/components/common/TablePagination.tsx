'use client';

import { Grow } from '@atoms';
import { Button } from '@uiux/Button';
import { PageArrowIcon, PageArrowDoubleIcon } from '@icons';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  itemsPerPage?: number | null;
}

interface TableMoreProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (pageNumber: number) => void;
  itemsPerPage?: number | null;

  loadedCount?: number;
  totalCount?: number;
  pageSize?: number;
  onLoadedCountChange?: (loadedCount: number) => void;

  onLoadAll?: () => void;
  onLoadNext?: () => void;
}

export function TablePagination({ currentPage, totalPages, onPageChange, itemsPerPage }: TablePaginationProps) {
  // itemsPerPage가 null이면 pagination 미표시
  if (!itemsPerPage || totalPages <= 1) {
    return null;
  }

  return (
    <Grow placement={'bwc'} className="w-full py-1 px-4">
      <Grow className='w-auto h-5!'>
        <Grow gap={0}>
          <Button
            variant={'none'}
            only={'icon'}
            disabled={currentPage === 1}
            onClick={() => {
              onPageChange(1);
            }}
            className={currentPage === 1 ? 'hidden!' : ''}
          >
            <PageArrowDoubleIcon />
          </Button>
          <Button
            variant={'none'}
            only={'icon'}
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage === 1) return;
              onPageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? 'hidden!' : ''}
          >
            <PageArrowIcon />
          </Button>
        </Grow>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Button
            key={pageNum}
            variant={'none'}
            className={
              'px-2 py-1 text-[1.3rem] border rounded-[0.4rem] w-5! h-5! leading-1!' +
              (pageNum === currentPage
                ? 'text-[#000] font-bold bg-[var(--color-blue-gray-15)]'
                : 'bg-white hover:bg-[var(--color-blue-gray-15)]')
            }
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Button>
        ))}
        <Grow gap={0}>
          <Button
            variant={'none'}
            only={'icon'}
            disabled={currentPage === totalPages}
            onClick={() => {
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
             className={currentPage === totalPages ? 'hidden!' : ''}
          >
            <PageArrowIcon className='rotate-180' />
          </Button>
          <Button
            variant={'none'}
            only={'icon'}
            disabled={currentPage === totalPages}
            onClick={() => {
              onPageChange(totalPages);
            }}
            className={currentPage === totalPages ? 'hidden!' : ''}
          >
            <PageArrowDoubleIcon className='rotate-180' />
          </Button>
        </Grow>
      </Grow>

      <Grow className='text-[1.3rem]'>
        View 1-{totalPages} of {currentPage}
      </Grow>
    </Grow>
  );
}

export function TableMore({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  loadedCount,
  totalCount,
  pageSize,
  onLoadedCountChange,
  onLoadAll,
  onLoadNext,
}: TableMoreProps) {
  const hasCountMode =
    typeof loadedCount === 'number' &&
    typeof totalCount === 'number' &&
    typeof pageSize === 'number' &&
    pageSize > 0;

  const resolvedCurrentPage = hasCountMode
    ? Math.max(1, Math.ceil(loadedCount / pageSize))
    : (currentPage ?? 1);

  const resolvedTotalPages = hasCountMode
    ? Math.max(1, Math.ceil(totalCount / pageSize))
    : (totalPages ?? 1);

  const resolvedItemsPerPage = itemsPerPage ?? (hasCountMode ? pageSize : null);

  // itemsPerPage가 null이면 pagination 미표시
  if (!resolvedItemsPerPage || resolvedTotalPages <= 1) {
    return null;
  }

  const isLastPage = resolvedCurrentPage >= resolvedTotalPages;

  const handleLoadAll = () => {
    if (onLoadAll) {
      onLoadAll();
      return;
    }

    if (hasCountMode && onLoadedCountChange) {
      onLoadedCountChange(totalCount);
      return;
    }

    // 기본 동작: 마지막 페이지로 이동(=전체 조회)
    onPageChange?.(resolvedTotalPages);
  };

  const handleLoadNext = () => {
    if (isLastPage) return;

    if (onLoadNext) {
      onLoadNext();
      return;
    }

    if (hasCountMode && onLoadedCountChange) {
      const nextCount = Math.min(totalCount, loadedCount + pageSize);
      onLoadedCountChange(nextCount);
      return;
    }

    // 기본 동작: 다음 페이지 1회 로드
    onPageChange?.(resolvedCurrentPage + 1);
  };

  return (
    <Grow placement={'bwc'} className="w-full py-1 px-4">
      <Grow className='text-[1.3rem]' placement='sc'>
        <b>{loadedCount}</b> / 전체 {totalCount}
      </Grow>

      <Grow>
        <Button variant={'contained'} size={'md'} color={'coolgray'} onClick={handleLoadAll} disabled={isLastPage}>
          전체조회
        </Button>
        <Button variant={'outlined'} size={'md'} color={'gray'} onClick={handleLoadNext} disabled={isLastPage}>
          다음
        </Button>
      </Grow>
    </Grow>
  );
}
