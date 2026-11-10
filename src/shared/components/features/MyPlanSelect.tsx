/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import { Gcol, Typo } from '@atoms';
import { SelectDrop, type SelectDropAlign } from '@common/SelectDrop';
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
  pnlWidth?: number;
  renderContent?: (content: TItem['content'][number], item: TItem, index: number) => string;
  /** 드롭다운 레이어(패널) 가로 정렬 위치 ('left' | 'center' | 'right' | 'start' | 'end') */
  align?: SelectDropAlign;
}

export const MyPlanSelect = <TItem extends ItemBase>({
  items,
  readOnly = false,
  defaultValue,
  placeholder = '나만의 설계선택',
  pnlWidth = 200,
  renderContent,
  align = 'end',
}: MyPlanSelectProps<TItem>) => {
  // defaultValue 미지정 시, 처음 3개 항목을 기본 펼침 상태로 사용
  const fallbackDefaultValue = items.slice(0, 3).map((item) => item.value);

  return (
    // SelectDrop + Accordion 조합으로 "드롭다운 내부 다중 펼침 목록" UI 구성
    <SelectDrop
      typeMode="custom"
      size="md"
      width={120}
      pnlWidth={pnlWidth ? pnlWidth : 'full'}
      placeholder={placeholder}
      readOnly={readOnly}
      align={align}
    >
      <Gcol className="p-[0.2rem] w-full">
        {/* 상단 고정 액션 버튼 */}
        <Button variant="outlined" size="md" className="w-full">
          <SaveIcon /> 나만의 설계
        </Button>

        {/* 다중 펼침 허용(type=multiple), 기본 펼침값은 props 우선 */}
        <Accordion type="multiple" className="w-full" defaultValue={defaultValue ?? fallbackDefaultValue}>
          {items.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Trigger className="w-full group flex justify-between items-center text-[1.3rem] font-bold min-h-[2.5rem]">
                <Typo inherit className="min-w-0 flex-1 text-left truncate">
                  {item.trigger}
                </Typo>
              </Accordion.Trigger>
              <Accordion.Content className="px-2">
                {item.content.map((text, index) => {
                  const contentText = renderContent ? renderContent(text, item, index) : String(text);
                  return (
                    <Button
                      variant={'none'}
                      key={`${item.value}-${index}`}
                      className="w-full justify-start px-0 min-w-0 overflow-hidden hover:underline"
                    >
                      <Typo inherit className="w-full text-left truncate">
                        {contentText}
                      </Typo>
                    </Button>
                  );
                })}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </Gcol>
    </SelectDrop>
  );
};
