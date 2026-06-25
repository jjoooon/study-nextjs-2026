/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import { Gcol } from '@atoms';
import { SelectDrop } from '@common/SelectDrop';
import { SaveIcon } from '@icons';
import { Accordion } from '@uiux/Accordion';
import { Button } from '@uiux/Button';

// 드롭다운 항목의 공통 기본 타입
// - value: Accordion 제어용 고유값
// - trigger: 아코디언 헤더에 노출되는 제목
// - content: 하위 버튼 목록 데이터
export type ItemBase<TValue extends string = string, TContent = string> = {
  value: TValue;
  trigger: string;
  content: TContent[];
};

// MyPlanSelect 입력값
// - renderContent를 주면 content 렌더링 문자열을 외부에서 커스터마이징할 수 있다.
interface MyPlanSelectProps<TItem extends ItemBase> {
  items: TItem[];
  readOnly?: boolean;
  defaultValue?: TItem['value'][];
  placeholder?: string;
  renderContent?: (content: TItem['content'][number], item: TItem, index: number) => string;
}

export const MyPlanSelect = <TItem extends ItemBase>({
  items,
  readOnly = false,
  defaultValue,
  placeholder = '나만의 설계선택',
  renderContent,
}: MyPlanSelectProps<TItem>) => {
  // defaultValue 미지정 시, 처음 3개 항목을 기본 펼침 상태로 사용
  const fallbackDefaultValue = items.slice(0, 3).map((item) => item.value);

  return (
    // SelectDrop + Accordion 조합으로 "드롭다운 내부 다중 펼침 목록" UI 구성
    <SelectDrop typeMode="custom" size="md" width={120} placeholder={placeholder} readOnly={readOnly}>
      <Gcol className="w-full p-[0.2rem]">
        {/* 상단 고정 액션 버튼 */}
        <Button variant="outlined" size="md" className="w-full">
          <SaveIcon /> 나만의 설계
        </Button>

        {/* 다중 펼침 허용(type=multiple), 기본 펼침값은 props 우선 */}
        <Accordion type="multiple" className="w-full" defaultValue={defaultValue ?? fallbackDefaultValue}>
          {items.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Trigger className="w-full group flex justify-between items-center text-[1.3rem] font-bold min-h-[2.5rem]">
                {item.trigger}
              </Accordion.Trigger>
              <Accordion.Content className="px-2">
                {item.content.map((text, index) => (
                  // renderContent가 있으면 외부 포맷 함수를 사용, 없으면 문자열로 기본 출력
                  <Button
                    variant={'none'}
                    key={`${item.value}-${index}`}
                    className="overflow-hidden text-ellipsis whitespace-nowrap w-full justify-start px-0"
                  >
                    {renderContent ? renderContent(text, item, index) : String(text)}
                  </Button>
                ))}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </Gcol>
    </SelectDrop>
  );
};
