/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Gcol } from '@atoms';
import { SelectDrop } from '@common/SelectDrop';
import { SaveIcon, ChevronDownIcon } from '@icons';
import { Accordion } from '@uiux/Accordion';
import { Button } from '@uiux/Button';

export type ItemBase<TValue extends string = string, TContent = string> = {
  value: TValue;
  trigger: string;
  content: TContent[];
};

interface MyPlanSelectProps<TItem extends ItemBase> {
  items: TItem[];
  defaultValue?: TItem['value'][];
  placeholder?: string;
  renderContent?: (content: TItem['content'][number], item: TItem, index: number) => string;
}

export const MyPlanSelect = <TItem extends ItemBase>({
  items,
  defaultValue,
  placeholder = '나만의 설계선택',
  renderContent,
}: MyPlanSelectProps<TItem>) => {
  const fallbackDefaultValue = items.slice(0, 3).map((item) => item.value);

  return (
    <SelectDrop typeMode="custom" size="md" width={160} placeholder={placeholder}>
      <Gcol className="w-full p-[0.2rem]">
        <Button variant="outlined" size="md" className="w-full">
          <SaveIcon /> 나만의 설계
        </Button>

        <Accordion type="multiple" className="w-full" defaultValue={defaultValue ?? fallbackDefaultValue}>
          {items.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Trigger className="w-full group flex justify-between items-center text-[1.3rem] font-bold min-h-[2.5rem]">
                {item.trigger}
              </Accordion.Trigger>
              <Accordion.Content className="px-2">
                {item.content.map((text, index) => (
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
