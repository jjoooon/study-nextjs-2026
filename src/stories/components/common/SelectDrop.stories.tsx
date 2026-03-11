import type { Meta, StoryObj } from '@storybook/react';
import SelectDrop from '@common/SelectDrop';
import type { SelectDropProps } from '@common/SelectDrop';

type DemoValue = '사망장해' | '진단비' | '입원/통원' | '수술/치료' | '골절/화상' | '검사/지원' | '운전/비용' | '재물/배상' | '기타';

type SelectDropStoryProps = SelectDropProps<string>;

type PriceValue = '5만원이하' | '6-9만원' | '10~14만원' | '15만원 이상';

const demoOptions: ReadonlyArray<{ label: string; value: DemoValue }> = [
  { label: '사망장해', value: '사망장해' },
  { label: '진단비', value: '진단비' },
  { label: '입원/통원', value: '입원/통원' },
  { label: '수술/치료', value: '수술/치료' },
  { label: '골절/화상', value: '골절/화상' },
  { label: '검사/지원', value: '검사/지원' },
  { label: '운전/비용', value: '운전/비용' },
  { label: '재물/배상', value: '재물/배상' },
  { label: '기타', value: '기타' },
] as const;

const priceOptions: ReadonlyArray<{ label: string; value: PriceValue }> = [
  { label: '5만원이하', value: '5만원이하' },
  { label: '6-9만원', value: '6-9만원' },
  { label: '10~14만원', value: '10~14만원' },
  { label: '15만원 이상', value: '15만원 이상' },
] as const;

const meta: Meta<SelectDropStoryProps> = {
  title: 'Components/Common/SelectDrop',
  component: SelectDrop<string>,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectionMode: {
      control: { type: 'inline-radio' },
      options: ['checkbox', 'radio'],
      table: { category: '선택 모드' },
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      table: { category: '위치 props' },
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      table: { category: '위치 props' },
    },
    sideOffset: {
      control: { type: 'number' },
      table: { category: '위치 props' },
    },
    className: {
      control: { type: 'text' },
      table: { category: '스타일 props' },
    },
    options: {
      table: { disable: true },
    },
    defaultValue: {
      table: { disable: true },
    },
    value: {
      table: { disable: true },
    },
    onValueChange: {
      table: { disable: true },
    },
  },
  args: {
    selectionMode: 'checkbox',
    options: demoOptions,
    defaultValue: ['수술/치료', '재물/배상'],
    placeholder: '선택',
    side: 'bottom',
    align: 'start',
    sideOffset: 6,
    contentClassName: 'w-[14rem]',
  },
};

export default meta;
type Story = StoryObj<SelectDropStoryProps>;

export const Default: Story = {
  render: (args) => {
    const isRadioMode = args.selectionMode === 'radio';
    const mappedArgs: SelectDropStoryProps = isRadioMode
      ? {
          ...args,
          selectionMode: 'radio',
          options: priceOptions,
          allowCustomInput: true,
          customInputLabel: '직접입력',
          defaultValue: ['6-9만원'],
        }
      : {
          ...args,
          selectionMode: 'checkbox',
          options: demoOptions,
          defaultValue: ['수술/치료', '재물/배상'],
        };

    return <SelectDrop {...mappedArgs} />;
  },
};

export const SingleWithCustomInput: StoryObj<SelectDropStoryProps> = {
  args: {
    selectionMode: 'radio',
    options: priceOptions,
    placeholder: '선택',
    allowCustomInput: true,
    customInputLabel: '직접입력',
    defaultValue: ['6-9만원'],
    contentClassName: 'w-[14rem]',
  },
  render: (args) => <SelectDrop {...args} />,
};
