import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow} from '@/shared/components/common';
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';

interface NativeSelectStoryArgs extends React.ComponentProps<typeof NativeSelect> {}

const meta: Meta<NativeSelectStoryArgs> = {
	title: 'Components/UIUX/NativeSelect',
	component: NativeSelect,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
NativeSelect는 <select> 태그를 기반으로 요소를 스타일링한 컴포넌트입니다.
폼에서 간단한 드롭다운 선택이 필요할 때 사용하세요.

- **기본 구조**: \`NativeSelect\`와 \`NativeSelectOption\` 조합으로 사용합니다.
- **에러 표시**: \`error\` 속성을 \`true\`로 설정했을 때만 \`errorMsg\`가 표시됩니다.
- **상태 지원**: \`required\`, \`readOnly\`, \`disabled\` 등 다양한 입력 상태를 지원합니다.

---

<br>
#### **기본 사용법: Usage**
\`\`\`tsx
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux';
import { useState } from 'react';

<NativeSelect
  variant="default"
  size={"lg | sm"}
  width={"full | max | 2xs | xs | sm | md | lg | xl | 2xl"}
  value={value}
  disabled={true | false}
  readOnly={true | false}
  required={true | false}
  error={true | false}
  errorMsg="선택은 필수입니다"
  errorPs={"tl | tr | bl | br"}
>
  <NativeSelectOption value="">선택하세요</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
</NativeSelect>
\`\`\`
				`,
			},
			argTypes: { expanded: false },
		},
		controls: { expanded: false },
	},
	argTypes: {
        variant: {
            control: 'select',
            options: ['default'],
            description: '스타일 유형',
            table: { category: 'Appearance' },
        },
		size: {
			control: 'select',
			options: ['lg', 'sm'],
			description: '높이 (lg | sm)',
			table: { category: 'Appearance' },
		},
		width: {
			control: 'select',
			options: ['full', 'max', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
			table: { category: 'Appearance' },
		},
		disabled: { control: 'boolean', table: { category: 'State' } },
		required: { control: 'boolean', table: { category: 'State' } },
		readOnly: { control: 'boolean', table: { category: 'State' } },
		error: { control: 'boolean', table: { category: 'Error' } },
		errorMsg: { control: 'text', table: { category: 'Error' } },
		errorPs: { control: 'select', options: ['tl', 'tr', 'bl', 'br'], table: { category: 'Error' } },
		className: { table: { disable: true } },
	},
	args: {
        variant: 'default',
		size: 'lg',
		width: 'md',
		required: false,
		readOnly: false,
		error: false,
		disabled: false,
		errorMsg: '선택은 필수입니다.',
		errorPs: 'bl',
	},
};

export default meta;
type Story = StoryObj<NativeSelectStoryArgs>;

const options = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'cherry', label: 'Cherry' },
];

export const Default: Story = {
	render: (args) => {
		const [value, setValue] = React.useState((args as any).value ?? '');
		const { value: _v, onChange, ...restArgs } = args as any;

		React.useEffect(() => {
			setValue((args as any).value ?? '');
		}, [(args as any).value]);

		const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
			setValue(e.target.value);
			args.onChange?.(e);
		};

		return (
			<StoryWrap className="flex-row">
				<StoryBox>
					<NativeSelect {...restArgs} value={value} onChange={handleChange}>
						<NativeSelectOption value="">{(args as any).placeholder ?? '선택하세요'}</NativeSelectOption>
						{options.map((o) => (
							<NativeSelectOption key={o.value} value={o.value}>
								{o.label}
							</NativeSelectOption>
						))}
					</NativeSelect>
				</StoryBox>

				<StoryBox>
					<Grow placement="cc" className="gap-2">
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="sm" value="" readOnly>
								<NativeSelectOption value="">읽기전용</NativeSelectOption>
							</NativeSelect>
						</Gcol>
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="sm" value="apple" required>
								<NativeSelectOption value="apple">필수선택</NativeSelectOption>
							</NativeSelect>
						</Gcol>
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="sm" value="banana" error errorMsg="선택해주세요">
								<NativeSelectOption value="banana">에러</NativeSelectOption>
							</NativeSelect>
						</Gcol>
					</Grow>
				</StoryBox>
			</StoryWrap>
		);
	},
};

export const Sizes: Story = {
	render: () => {
		const [valueLg, setValueLg] = React.useState('apple');
		const [valueSm, setValueSm] = React.useState('apple');

		return (
			<div className="flex gap-[0.2rem]" >
				<NativeSelect value={valueLg} size="lg" onChange={(e) => setValueLg(e.target.value)}>
					<NativeSelectOption value="apple">Sizes1</NativeSelectOption>
					<NativeSelectOption value="banana">Sizes2</NativeSelectOption>
					<NativeSelectOption value="cherry">Sizes3</NativeSelectOption>
				</NativeSelect>
				<NativeSelect value={valueSm} size="sm" onChange={(e) => setValueSm(e.target.value)}>
					<NativeSelectOption value="apple">Sizes1</NativeSelectOption>
					<NativeSelectOption value="banana">Sizes2</NativeSelectOption>
					<NativeSelectOption value="cherry">Sizes3</NativeSelectOption>
				</NativeSelect>
			</div>
		);
	},
};    


export const required: Story = {
    render: () => {
        return (
            <NativeSelect aria-label="플랜 선택" width="md" required>
                <NativeSelectOption value="">required1</NativeSelectOption>
                <NativeSelectOption value="basic">required2</NativeSelectOption>
                <NativeSelectOption value="premium">required3</NativeSelectOption>
            </NativeSelect>
        );
    },
};

export const readOnly: Story = {
    render: () => {
        return (
            <NativeSelect aria-label="플랜 선택" width="md" readOnly>
                <NativeSelectOption value="">readOnly1</NativeSelectOption>
                <NativeSelectOption value="basic">readOnly2</NativeSelectOption>
                <NativeSelectOption value="premium">readOnly3</NativeSelectOption>
            </NativeSelect>
        );
    },
};

export const Error: Story = {
	args: { error: true, errorMsg: '선택해주세요', errorPs: 'tl' },
	render: (args) => {
		const [value, setValue] = React.useState(args.value ?? '');
		const { value: _, onChange, ...restArgs } = args;

		React.useEffect(() => {
			setValue(args.value ?? '');
		}, [args.value]);

		const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
			setValue(e.target.value);
			args.onChange?.(e);
		};

		return (
			<StoryWrap className="flex-row">
				<StoryBox>
					<NativeSelect {...restArgs} value={value} onChange={handleChange}>
						<NativeSelectOption value="">선택하세요</NativeSelectOption>
						{options.map((o) => (
							<NativeSelectOption key={o.value} value={o.value}>
								{o.label}
							</NativeSelectOption>
						))}
					</NativeSelect>
				</StoryBox>
				<StoryBox>
					<Grow placement="cc" className="gap-2">
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="lg" value="" error errorPs="tl" errorMsg="top left">
								<NativeSelectOption value="">error</NativeSelectOption>
							</NativeSelect>
						</Gcol>
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="lg" value="" error errorPs="tr" errorMsg="top right">
								<NativeSelectOption value="">error</NativeSelectOption>
							</NativeSelect>
						</Gcol>
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="lg" value="" error errorPs="bl" errorMsg="bottom left">
								<NativeSelectOption value="">error</NativeSelectOption>
							</NativeSelect>
						</Gcol>
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="lg" value="" error errorPs="br" errorMsg="bottom right">
								<NativeSelectOption value="">error</NativeSelectOption>
							</NativeSelect>
						</Gcol>
					</Grow>
				</StoryBox>
			</StoryWrap>
		);
	},
};    



