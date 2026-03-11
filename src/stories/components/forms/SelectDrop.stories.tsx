import * as React from 'react';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { Gcol, Grow } from '@atoms';
import SelectDrop from '@common/SelectDrop';

import type { SelectDropProps } from '@common/SelectDrop';

type DemoValue =
  | '사망장해'
  | '진단비'
  | '입원/통원'
  | '수술/치료'
  | '골절/화상'
  | '검사/지원'
  | '운전/비용'
  | '재물/배상'
  | '기타';

type PriceValue = '5만원이하' | '6-9만원' | '10~14만원' | '15만원 이상';

type SelectDropStoryProps = SelectDropProps<string>;

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
    controls: { expanded: false },
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
                SelectDrop 컴포넌트는 Popover 기반의 선택 UI입니다.
                <br />
                체크박스 다중 선택, 라디오 단일 선택, 직접입력, 필수/읽기 전용/에러 상태와 에러 메시지 위치 제어를 지원합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>SelectDrop 컴포넌트는 아래와 같은 시나리오에 사용할 수 있습니다.</p>
            <ul>
              <li>체크박스 기반 다중 선택</li>
              <li>라디오 기반 단일 선택</li>
              <li>직접입력 포함 단일 선택</li>
              <li>필수/읽기 전용/비활성화 상태 표시</li>
              <li>에러 메시지와 메시지 위치 제어</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import SelectDrop from '@common/SelectDrop';

<SelectDrop
  selectionMode={'checkbox' | 'radio'}
  options={[
    { label: '사망장해', value: '사망장해' },
    { label: '진단비', value: '진단비' },
  ]}
  width={'full' | 'auto' | 'max' | 'min' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '??rem'}
  size={'md' | 'sm'}
  placeholder={'선택'}
  required={false | true}
  readOnly={false | true}
  error={false | true}
  errorMsg={'선택은 필수입니다.'}
  errorPs={'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'}
/>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>SelectDrop 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>variant</td>
                  <td>'checkbox' | 'radio'</td>
                  <td>선택 방식</td>
                </tr>
                <tr>
                  <td>size</td>
                  <td>'md' | 'sm'</td>
                  <td>트리거 높이</td>
                </tr>
                <tr>
                  <td>width</td>
                  <td>'full', 'auto', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', number, '??rem'</td>
                  <td>트리거/레이어 너비</td>
                </tr>
                <tr>
                  <td>required</td>
                  <td>boolean</td>
                  <td>필수 입력 강조 여부</td>
                </tr>
                <tr>
                  <td>readOnly</td>
                  <td>boolean</td>
                  <td>읽기 전용 상태</td>
                </tr>
                <tr>
                  <td>error</td>
                  <td>boolean</td>
                  <td>에러 상태</td>
                </tr>
                <tr>
                  <td>errorMsg</td>
                  <td>ReactNode</td>
                  <td>에러 메시지</td>
                </tr>
                <tr>
                  <td>errorPs</td>
                  <td>'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'</td>
                  <td>에러 메시지 위치</td>
                </tr>
                <tr>
                  <td>allowCustomInput</td>
                  <td>boolean</td>
                  <td>라디오 모드에서 직접입력 사용 여부</td>
                </tr>
              </tbody>
            </table>

            <h2>Selection Mode</h2>
            <p>checkbox, radio 두 가지 선택 모드를 제공합니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <SelectDrop
                    variant="checkbox"
                    width="md"
                    options={demoOptions}
                    defaultValue={['수술/치료', '재물/배상']}
                  />
                  <SelectDrop
                    variant="radio"
                    width="md"
                    options={priceOptions}
                    defaultValue={['6-9만원']}
                    allowCustomInput={true}
                    customInputLabel="직접입력"
                  />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Size</h2>
            <p>SelectDrop 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <SelectDrop variant="checkbox" width="md" size="md" options={demoOptions} placeholder="md: 28" />
                  <SelectDrop variant="checkbox" width="md" size="sm" options={demoOptions} placeholder="sm: 25" />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>Width</h2>
            <p>SelectDrop 컴포넌트에서 사용할 수 있는 width 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-8">
                <Gcol gap={2} className="p-2" style={{ width: '60rem' }}>
                  <SelectDrop width="full" options={demoOptions} placeholder="full" />
                  <SelectDrop width="auto" options={demoOptions} placeholder="auto" />
                  <SelectDrop width="max" options={demoOptions} placeholder="max" />
                  <SelectDrop width="min" options={demoOptions} placeholder="min" />
                  <SelectDrop width="2xs" options={demoOptions} placeholder="2xs" />
                  <SelectDrop width="xs" options={demoOptions} placeholder="xs" />
                  <SelectDrop width="sm" options={demoOptions} placeholder="sm" />
                  <SelectDrop width="md" options={demoOptions} placeholder="md" />
                  <SelectDrop width="lg" options={demoOptions} placeholder="lg" />
                  <SelectDrop width="xl" options={demoOptions} placeholder="xl" />
                  <SelectDrop width="2xl" options={demoOptions} placeholder="2xl" />
                  <SelectDrop width="24rem" options={demoOptions} placeholder="24rem" />
                </Gcol>
              </Gcol>
            </Unstyled>

            <h2>Required</h2>
            <p>required 옵션이 활성화되면 강조 스타일로 표시됩니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <SelectDrop width="md" required options={demoOptions} defaultValue={['진단비']} />
              </Gcol>
            </Unstyled>

            <h2>ReadOnly</h2>
            <p>readOnly 옵션이 활성화되면 사용자 입력이 차단됩니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <SelectDrop width="md" readOnly options={demoOptions} defaultValue={['진단비']} />
              </Gcol>
            </Unstyled>

            <h2>Error</h2>
            <p>error 옵션이 활성화되면 에러 스타일과 메시지가 함께 표시됩니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={8}>
                  <SelectDrop width="lg" options={demoOptions} error errorPs="tl" errorMsg="top left" />
                  <SelectDrop width="lg" options={demoOptions} error errorPs="tr" errorMsg="top right" />
                </Grow>
                <Grow gap={8}>
                  <SelectDrop width="lg" options={demoOptions} error errorPs="bl" errorMsg="bottom left" />
                  <SelectDrop width="lg" options={demoOptions} error errorPs="br" errorMsg="bottom right" />
                </Grow>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['checkbox', 'radio'],
      table: { category: '스타일 props' },
    },
    size: {
      control: { type: 'select' },
      options: ['md', 'sm'],
      table: { category: '스타일 props' },
    },
    width: {
      control: { type: 'select' },
      options: ['full', 'auto', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      table: { category: '스타일 props' },
    },
    placeholder: {
      control: { type: 'text' },
      table: { category: '내용 props' },
    },
    required: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    readOnly: {
      control: { type: 'boolean' },
      table: { category: '설정 props' },
    },
    error: {
      control: { type: 'boolean' },
      table: { category: '에러 props' },
    },
    errorPs: {
      control: { type: 'select' },
      options: ['tl', 'tc', 'tr', 'bl', 'bc', 'br'],
      table: { category: '에러 props' },
    },
    errorMsg: {
      control: { type: 'text' },
      table: { category: '에러 props' },
    },
    side: {
      table: { disable: true },
    },
    align: {
      table: { disable: true },
    },
    sideOffset: {
      table: { disable: true },
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
    allowCustomInput: {
      table: { disable: true },
    },
    customInputLabel: {
      table: { disable: true },
    },
    customInputValue: {
      table: { disable: true },
    },
    defaultCustomInputValue: {
      table: { disable: true },
    },
    onCustomInputValueChange: {
      table: { disable: true },
    },
    triggerClassName: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    variant: 'checkbox',
    size: 'md',
    width: 'md',
    placeholder: '선택',
    required: false,
    readOnly: false,
    error: false,
    errorMsg: '선택은 필수입니다.',
    errorPs: 'bl',
    side: 'bottom',
    align: 'start',
    sideOffset: 4,
  },
};

export default meta;

type Story = StoryObj<SelectDropStoryProps>;

export const Default: Story = {
  render: (args) => {
    const isRadioMode = args.variant === 'radio';

    const mappedArgs: SelectDropStoryProps = isRadioMode
      ? {
          ...args,
          variant: 'radio',
          options: priceOptions,
          allowCustomInput: true,
          customInputLabel: '직접입력',
          defaultValue: ['6-9만원'],
        }
      : {
          ...args,
          variant: 'checkbox',
          options: demoOptions,
          defaultValue: ['수술/치료', '재물/배상'],
        };

    return <SelectDrop key={`${args.variant}-${String(args.readOnly)}-${String(args.error)}`} {...mappedArgs} />;
  },
};

export const SingleWithCustomInput: Story = {
  args: {
    variant: 'radio',
    width: 'md',
    placeholder: '선택',
    allowCustomInput: true,
    customInputLabel: '직접입력',
    options: priceOptions,
    defaultValue: ['6-9만원'],
  },
  render: (args) => <SelectDrop key={`radio-custom-input-${String(args.readOnly)}-${String(args.error)}`} {...args} />,
};
