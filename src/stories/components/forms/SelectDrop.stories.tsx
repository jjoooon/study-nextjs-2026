import * as React from 'react';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';
import SelectDrop from '@common/SelectDrop';
import type { SelectDropProps } from '@common/SelectDrop';

type SelectDropStoryProps = SelectDropProps<string>;
type DemoValue = '사망장해' | '진단비' | '입원/통원' | '수술/치료' | '골절/화상' | '검사/지원' | '운전/비용' | '재물/배상' | '기타';
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
  title: 'Components/Forms/SelectDrop',
  component: SelectDrop<string>,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <br />

            <h2>Overview</h2>
            <div>
              <p>
                SelectDrop 컴포넌트는 체크박스/라디오 기반으로 옵션을 선택할 수 있는 드롭다운 UI입니다.
                <br />
                단일 선택/다중 선택, 커스텀 입력, 위치 제어(side/align/offset) 등을 지원합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>SelectDrop 컴포넌트는 다음과 같은 구조로 사용할 수 있습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import SelectDrop from '@common/SelectDrop';

<SelectDrop
  selectionMode={'checkbox' | 'radio'}
  width={'md'}
  options={[{ label: '옵션명', value: '옵션값' }]}
  defaultValue={['옵션값']}
  placeholder={'선택'}
  side={'bottom'}
  align={'start'}
  sideOffset={0}
  disabled={false}
/>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>SelectDrop 컴포넌트에서 자주 사용하는 주요 props는 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>selectionMode</td><td>'checkbox' | 'radio'</td><td>선택 모드</td></tr>
                <tr><td>width</td><td>'full' | 'auto' | 'max' | 'min' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string</td><td>트리거 너비</td></tr>
                <tr><td>options</td><td>Array&lt;{`{ label, value }`}&gt;</td><td>표시할 옵션 목록</td></tr>
                <tr><td>defaultValue</td><td>string[]</td><td>초기 선택값</td></tr>
                <tr><td>placeholder</td><td>string</td><td>선택 전 안내 문구</td></tr>
                <tr><td>side / align / sideOffset</td><td>position props</td><td>드롭다운 위치 제어</td></tr>
                <tr><td>disabled</td><td>boolean</td><td>비활성화 여부</td></tr>
              </tbody>
            </table>

            <h2>Selection Mode</h2>
            <p>selectionMode 값에 따라 옵션/기본값/커스텀 입력 여부가 달라집니다.</p>
            <Unstyled>
              <div className="w-[34rem] p-8 border rounded-md">
                <SelectDrop
                  selectionMode="checkbox"
                  width="md"
                  options={demoOptions}
                  defaultValue={['수술/치료', '재물/배상']}
                  placeholder="선택"
                  side="bottom"
                  align="start"
                  sideOffset={0}
                  disabled={false}
                />
              </div>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    // 사용자 요청 순서
    selectionMode: {
      control: { type: 'inline-radio' },
      options: ['checkbox', 'radio'],
      table: { category: '타입 props' },
    },
    width: {
      control: { type: 'select' },
      options: ['full', 'auto', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '15rem', '200px'],
      table: { category: '스타일 props' },
    },
    options: {
      table: { disable: true },
    },
    defaultValue: {
      table: { disable: true },
    },
    placeholder: {
      control: { type: 'text' },
      table: { category: '내용 props' },
    },
    side: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
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
    disabled: {
      control: { type: 'boolean' },
      table: { category: '상태 props' },
    },

    // 나머지 props 숨김 처리
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    allowCustomInput: { table: { disable: true } },
    customInputLabel: { table: { disable: true } },
    customInputValue: { table: { disable: true } },
    defaultCustomInputValue: { table: { disable: true } },
    onCustomInputValueChange: { table: { disable: true } },
    triggerClassName: { table: { disable: true } },
    listClassName: { table: { disable: true } },
    resetLabel: { table: { disable: true } },
    confirmLabel: { table: { disable: true } },
    closeOnConfirm: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    selectionMode: 'checkbox',
    width: 'md',
    options: demoOptions,
    defaultValue: ['수술/치료', '재물/배상'],
    placeholder: '선택',
    side: 'bottom',
    align: 'start',
    sideOffset: 0,
    disabled: false,
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