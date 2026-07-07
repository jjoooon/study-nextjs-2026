/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { ResetIcon, HashIcon } from '@icons';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';

/**
 * HashFilter 컴포넌트의 Props 정의
 */
export interface HashFilterProps {
  /** 현재 선택된 해쉬태그 목록 */
  selectedHashtags: string[];
  /** 특정 해쉬태그 토글 시 호출되는 핸들러 */
  onHashtagToggle: (tag: string) => void;
  /** 초기화 버튼 클릭 시 호출되는 핸들러 */
  onReset: () => void;
  /** 전체 해쉬태그 후보 목록 (기본값: ['독립', '갱신', '배타', '미래']) */
  hashtags?: string[];
  /** 커스텀 클래스명 */
  className?: string;
}

/**
 * 해쉬 필터 선택 영역 UI 컴포넌트 (HashFilter)
 * - 팝오버 내부 등에서 해쉬태그들의 토글 버튼과 초기화 버튼을 그리드 형태로 렌더링합니다.
 */
export const HashFilter = React.memo(function HashFilter({
  onReset,
  hashtags = [
    '독립',
    '갱신',
    '배타',
    '미래',
    '암',
    '뇌',
    '화상',
    '치매',
    '치료',
    '골절',
    '표적',
    '독립',
    '갱신',
    '배타',
    '미래',
    '암',
    '뇌',
    '화상',
    '치매',
    '치료',
    '골절',
    '표적',
  ],
  className,
}: HashFilterProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Button variant="outlined" size={'md'}>
        <HashIcon color={'var(--color-primary-50)'} /> 검색어 편집
      </Button>
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 max-h-[9.8rem] overflow-y-auto">
        <CheckboxGroup minSelected={3}>
          {hashtags.map((tag) => {
            return (
              <CheckboxGroupItem variant="text" value={tag} key={tag}>
                #{tag}
              </CheckboxGroupItem>
            );
          })}
        </CheckboxGroup>
      </div>
      <div className="border-t border-[var(--color-gray-10)] mt-2 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full flex items-center justify-center gap-1.5 py-1 text-[1.2rem] text-[var(--color-gray-50)] hover:text-[var(--color-gray-80)] font-medium rounded hover:bg-[var(--color-gray-5)] transition-colors"
        >
          <ResetIcon size={12} color="var(--color-gray-500)" />
          초기화
        </button>
      </div>
    </div>
  );
});

/**
 * 해쉬 필터 로직을 관리하는 커스텀 훅 (useHashFilter)
 * - 외부 주입 상태가 없는 경우 내부 로컬 상태로 원활하게 동작하도록 로직을 캡슐화합니다.
 */
export function useHashFilter(externalSelected?: string[], onChangeExternal?: (hashtags: string[]) => void) {
  const [localSelected, setLocalSelected] = React.useState<string[]>([]);

  const selectedHashtags = externalSelected !== undefined ? externalSelected : localSelected;

  const toggleHashtag = React.useCallback(
    (tag: string) => {
      const isSelected = selectedHashtags.includes(tag);
      const nextHashtags = isSelected ? selectedHashtags.filter((t) => t !== tag) : [...selectedHashtags, tag];

      if (onChangeExternal) {
        onChangeExternal(nextHashtags);
      } else {
        setLocalSelected(nextHashtags);
      }
    },
    [selectedHashtags, onChangeExternal]
  );

  const resetHashtags = React.useCallback(() => {
    if (onChangeExternal) {
      onChangeExternal([]);
    } else {
      setLocalSelected([]);
    }
  }, [onChangeExternal]);

  return {
    selectedHashtags,
    toggleHashtag,
    resetHashtags,
  };
}
