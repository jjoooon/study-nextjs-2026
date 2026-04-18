import { useCallback } from 'react';
import { Grow, Divider } from '@atoms';
import { SearchIcon, ResetIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';

interface CoverageNameHeaderProps {
  checkedMap: { selected: boolean; unselected: boolean };
  onCheckedChange: (key: 'selected' | 'unselected') => (checked: boolean | 'indeterminate') => void;
  coverageName: string;
  setCoverageName: (value: string) => void;
  showTooltip: boolean;
  setShowTooltip: (checked: boolean) => void;
  setGridKey?: (updater: (key: number) => number) => void;
}

export function CoverageNameHeader({
  checkedMap,
  onCheckedChange,
  coverageName,
  setCoverageName,
  showTooltip,
  setShowTooltip,
  setGridKey,
}: CoverageNameHeaderProps) {
  const handleTooltipCheck = useCallback(
    (checked: boolean | 'indeterminate') => {
      setShowTooltip(!!checked);
      if (!checked && setGridKey) setGridKey((key) => key + 1);
    },
    [setShowTooltip, setGridKey]
  );

  return (
    <Grow className="w-full px-[0.6rem]" placement="cc" gap={4}>
      <Grow gap={1.5} placement="sc">
        <Checkbox variant="text" checked={checkedMap.selected} onCheckedChange={onCheckedChange('selected')}>
          선택 24건
        </Checkbox>
        <Divider />
        <Checkbox variant="text" checked={checkedMap.unselected} onCheckedChange={onCheckedChange('unselected')}>
          미선택
        </Checkbox>
      </Grow>
      <Grow>
        <Input
          aria-label="담보명"
          placeholder="담보명 입력"
          width="full"
          size="sm"
          value={coverageName}
          onChange={(e) => setCoverageName(e.target.value)}
        />
        <Button aria-label="담보명 검색" variant="outlined" color="gray-light" only="icon" size="md">
          <SearchIcon color="var(--color-primary-50)" />
        </Button>
        <Button
          aria-label="담보명 초기화"
          variant="outlined"
          color="gray-light"
          only="icon"
          size="md"
          onClick={() => setCoverageName('')}
        >
          <ResetIcon color="var(--color-primary-50)" />
        </Button>
      </Grow>
      <Grow placement="sc">
        <Checkbox size="md" checked={showTooltip} onCheckedChange={handleTooltipCheck}>
          담보명 말풍선
        </Checkbox>
      </Grow>
    </Grow>
  );
}
