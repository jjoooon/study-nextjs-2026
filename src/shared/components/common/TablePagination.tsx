'use client';

import { Grow } from '@atoms';
import { Pagination, PaginationContent } from '@uiux/Pagination';
import { Button } from '@uiux/Button';

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
    <Grow>
      <Pagination>
        <PaginationContent>
          <Button
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => {
              if (currentPage === 1) return;
              onPageChange(currentPage - 1);
            }}
          >
            이전
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              variant="outlined"
              className={
                'px-2 py-1 text-xs border rounded ' +
                (pageNum === currentPage
                  ? 'border-[#ff5c2e] text-[#ff5c2e] bg-[#fff7f4]'
                  : 'border-[#d9d9d9] bg-white hover:bg-[#f4f4f4]')
              }
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </Button>
          ))}

          <Button
            variant="outlined"
            disabled={currentPage === totalPages}
            onClick={() => {
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            다음
          </Button>
        </PaginationContent>
      </Pagination>
    </Grow>
  );
}
