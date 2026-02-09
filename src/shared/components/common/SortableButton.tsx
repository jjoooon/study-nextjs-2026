'use client';

import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/shared/components/uiux';

interface SortableButtonProps {
  label: string;
  columnKey: string;
  currentSortColumn: string | null;
  currentSortOrder: 'asc' | 'desc' | 'none';
  onSort: (columnKey: string) => void;
}

export function SortableButton({ label, columnKey, currentSortColumn, currentSortOrder, onSort }: SortableButtonProps) {
  const isActive = currentSortColumn === columnKey;

  return (
    <Button onClick={() => onSort(columnKey)} variant="ghost">
      <div className="flex items-center gap-1">
        {label}
        {isActive && currentSortOrder === 'asc' && <ChevronUp className="w-4 h-4" />}
        {isActive && currentSortOrder === 'desc' && <ChevronDown className="w-4 h-4" />}
        {(isActive && currentSortOrder === 'none') || !isActive ? <ArrowUpDown className="w-4 h-4 opacity-50" /> : null}
      </div>
    </Button>
  );
}
