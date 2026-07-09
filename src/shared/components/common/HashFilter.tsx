/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Gcol, Grow, Grid } from '@atoms';
import { ResetIcon, HashIcon } from '@icons';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@uiux/Popover';

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
 * - 내부에 Popover를 포함하여 해쉬태그들의 토글 버튼과 초기화 버튼을 그리드 형태로 렌더링합니다.
 */
export const HashFilter = React.memo(function HashFilter({
  selectedHashtags,
  onHashtagToggle,
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
    '수술',
    '입원',
    '실손',
    '종합',
    '상해',
    '질병',
    '운전자',
    '치아',
    '간병',
    '치료비',
    '진단비',
  ],
  className,
}: HashFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleValueChange = React.useCallback(
    (nextValues: string[]) => {
      const added = nextValues.find((v) => !selectedHashtags.includes(v));
      const removed = selectedHashtags.find((v) => !nextValues.includes(v));
      const changed = added || removed;
      if (changed) {
        onHashtagToggle(changed);
      }
    },
    [selectedHashtags, onHashtagToggle]
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-label="해쉬 필터"
          variant={'outlined'}
          color={selectedHashtags.length > 0 ? 'primary' : 'gray-light'}
          only={'icon'}
          size={'md'}
          className={cn(
            selectedHashtags.length > 0 && 'border-[var(--color-primary-50)] bg-[var(--color-primary-5)]',
            className
          )}
        >
          <HashIcon color={'var(--color-primary-50)'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="center"
        className="w-[19rem] p-[0.6rem] bg-white border border-[var(--color-gray-10)] rounded-[0.8rem] shadow-lg"
      >
        <Gcol gap={2}>
          <Button variant="outlined" size={'md'} className="w-full">
            <HashIcon color={'var(--color-primary-50)'} /> 검색어 편집
          </Button>
          <Grow className="flex-wrap gap-x-3 gap-y-1.5 max-h-[9.8rem] overflow-y-auto">
            <CheckboxGroup value={selectedHashtags} onValueChange={handleValueChange}>
              {hashtags.map((tag) => {
                return (
                  <CheckboxGroupItem variant="text" value={tag} key={tag} className="no-underline">
                    #{tag}
                  </CheckboxGroupItem>
                );
              })}
            </CheckboxGroup>
          </Grow>
          <Grid className="w-full grid-cols-2">
            <Button variant="outlined" size={'md'} color={'gray'} onClick={onReset}>
              <ResetIcon size={14} color="var(--color-gray-50)" />
              초기화
            </Button>
            <Button variant="outlined" size={'md'} color={'gray-light'} onClick={() => setIsOpen(false)}>
              닫기
            </Button>
          </Grid>
        </Gcol>
      </PopoverContent>
    </Popover>
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

      if (externalSelected === undefined) {
        setLocalSelected(nextHashtags);
      }
      if (onChangeExternal) {
        onChangeExternal(nextHashtags);
      }
    },
    [selectedHashtags, externalSelected, onChangeExternal]
  );

  const resetHashtags = React.useCallback(() => {
    if (externalSelected === undefined) {
      setLocalSelected([]);
    }
    if (onChangeExternal) {
      onChangeExternal([]);
    }
  }, [externalSelected, onChangeExternal]);

  return {
    selectedHashtags,
    toggleHashtag,
    resetHashtags,
  };
}
