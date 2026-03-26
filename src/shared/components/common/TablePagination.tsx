'use client';

import { Grow } from '@atoms';
import { Pagination, PaginationContent } from '@uiux/Pagination';
import { Button } from '@uiux/Button';
import { PageArrowIcon, PageArrowDoubleIcon } from '@icons';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  itemsPerPage?: number | null;
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
            className="w-5! h-5! p-0"
            disabled={currentPage === 1}
            onClick={() => {
              onPageChange(1);
            }}
          >
            <PageArrowDoubleIcon />
          </Button>
          <Button
            variant={'none'}
            only={'icon'}
            className="w-5! h-5! p-0"
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage === 1) return;
              onPageChange(currentPage - 1);
            }}
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
          >
            <PageArrowDoubleIcon className='rotate-180' />
          </Button>
        </Grow>
      </Grow>

      <Grow>
        View 1-{totalPages} of {currentPage}
      </Grow>
    </Grow>
  );
}
