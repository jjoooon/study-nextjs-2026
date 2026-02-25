import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow, FormTable, FormCell, FormItem } from '@/shared/components/common';
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';

interface NativeSelectStoryArgs extends React.ComponentProps<typeof NativeSelect> {
	placeholder?: string;
}

const meta: Meta<NativeSelectStoryArgs> = {
	title: 'Components/UIUX/NativeSelect',
	component: NativeSelect,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
NativeSelect는 네이티브 <select> 요소를 스타일링한 컴포넌트입니다.
폼에서 간단한 드롭다운 선택이 필요할 때 사용하세요.

- - -

<br>
#### **기본 입력: Usage**
\`\`\`tsx
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux';

<NativeSelect value={value} onChange={(e) => setValue(e.target.value)}>
	<NativeSelectOption value="">선택하세요</NativeSelectOption>
	<NativeSelectOption value="apple">Apple</NativeSelectOption>
</NativeSelect>
\`\`\`
				`,
			},
			argTypes: { expanded: false },
		},
		controls: { expanded: false },
	},
	argTypes: {
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
		onChange: { action: 'changed', table: { category: 'Events' } },
		className: { table: { disable: true } },
	},
	args: {
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
							<NativeSelect width="sm" value="banana">
								<NativeSelectOption value="banana">에러</NativeSelectOption>
							</NativeSelect>
						</Gcol>
					</Grow>
				</StoryBox>
			</StoryWrap>
		);
	},
};

export const Error: Story = {
	args: { error: true, errorMsg: '선택하세요', errorPs: 'tl' },
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
					<NativeSelect {...restArgs} value={value} onChange={handleChange} />
				</StoryBox>
				<StoryBox>
					<Grow placement="cc" className="gap-2">
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="lg" value="" error errorPs="tl" errorMsg="top left">
								<NativeSelectOption value="">선택</NativeSelectOption>
							</NativeSelect>
						</Gcol>
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="lg" value="" error errorPs="tr" errorMsg="top right">
								<NativeSelectOption value="">선택</NativeSelectOption>
							</NativeSelect>
						</Gcol>
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="lg" value="" error errorPs="bl" errorMsg="bottom left">
								<NativeSelectOption value="">선택</NativeSelectOption>
							</NativeSelect>
						</Gcol>
						<Gcol placement="ss" className="gap-[0.2rem]">
							<NativeSelect width="lg" value="" error errorPs="br" errorMsg="bottom right">
								<NativeSelectOption value="">선택</NativeSelectOption>
							</NativeSelect>
						</Gcol>
					</Grow>
				</StoryBox>
			</StoryWrap>
		);
	},
};

export const WithPlaceholder: Story = {
	args: { placeholder: '과일을 선택하세요' },
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
			<NativeSelect {...restArgs} value={value} onChange={handleChange}>
				<NativeSelectOption value="">{(args as any).placeholder}</NativeSelectOption>
				<NativeSelectOption value="apple">Apple</NativeSelectOption>
				<NativeSelectOption value="banana">Banana</NativeSelectOption>
			</NativeSelect>
		);
	},
};

export const Sizes: Story = {
	render: (args) => {
		const { ...rest } = args as any;
		return (
			<div className="flex gap-4">
				{( ['lg', 'sm'] as const ).map((sz) => (
					<NativeSelect key={sz} {...rest} value="apple" size={sz}>
						<NativeSelectOption value="apple">Apple</NativeSelectOption>
						<NativeSelectOption value="banana">Banana</NativeSelectOption>
						<NativeSelectOption value="cherry">Cherry</NativeSelectOption>
					</NativeSelect>
				))}
			</div>
		);
	},
};

export const Form: Story = {
	args: { required: true },
	render: () => (
		<StoryWrap>
			<FormTable variant="boxIn" caption="플랜 선택" cols={[ 'w-[10rem] min-w-[10rem]', '' ]}>
				<FormCell title="플랜">
					<FormItem>
						<NativeSelect aria-label="플랜 선택" width="md">
							<NativeSelectOption value="">플랜 선택</NativeSelectOption>
							<NativeSelectOption value="option1">옵션 1</NativeSelectOption>
						</NativeSelect>
					</FormItem>
				</FormCell>
			</FormTable>
		</StoryWrap>
	),
};

