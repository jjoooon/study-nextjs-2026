/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow } from '@atoms';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

interface NativeSelectStoryArgs extends React.ComponentProps<typeof NativeSelect> {}

const meta: Meta<NativeSelectStoryArgs> = {
	title: 'Components/Forms/NativeSelect',
	component: NativeSelect,
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
						<h2>History</h2>
            <ul>
              <li>2026.03.29</li>
            </ul>
						
						<h2>Overview</h2>
						<div>
							<p>
								NativeSelect 컴포넌트는 브라우저의 기본 {'<select>'} 요소를 디자인 시스템에 맞게 스타일링한 폼 선택 UI입니다.
								<br />
								일관된 크기/너비/상태 표현과 에러 메시지 위치 제어를 지원합니다.
							</p>
						</div>

						<Primary />
						<Controls />

						<h2>Usage</h2>
						<p>NativeSelect 컴포넌트는 아래와 같은 시나리오에 사용할 수 있습니다.</p>
						<ul>
							<li>기본 드롭다운 선택</li>
							<li>사전 정의된 스타일(variant, size, width)</li>
							<li>필수/읽기 전용/비활성화 상태 표시</li>
							<li>에러 메시지와 메시지 위치 제어</li>
						</ul>
						<Markdown>
							{`
\`\`\`tsx
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

<NativeSelect
  variant={'default'}
  size={'lg' | 'md'}
  width={'full' | 'auto' | 'max' | 'min' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '??rem'}

  required={false | true}
  readOnly={false | true}
  disabled={false | true}

  error={false | true}
  errorMsg={'선택은 필수입니다.'}
  errorPs={'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br'}
>
  <NativeSelectOption value="">선택하세요</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
</NativeSelect>
\`\`\`
							`}
						</Markdown>

						<h2>API Reference</h2>
						<p>NativeSelect 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
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
									<td>'default'</td>
									<td>셀렉트 스타일</td>
								</tr>
								<tr>
									<td>size</td>
									<td>'lg', 'md'</td>
									<td>셀렉트 높이</td>
								</tr>
								<tr>
									<td>width</td>
									<td>'full', 'auto', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', number, '??rem'</td>
									<td>셀렉트 너비</td>
								</tr>
								<tr>
									<td>required</td>
									<td>boolean</td>
									<td>필수 선택 여부</td>
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
									<td>'tl' | 'tr' | 'bl' | 'br'</td>
									<td>에러 메시지 위치</td>
								</tr>
							</tbody>
						</table>

						<h2>Variant</h2>
						<p>현재 제공되는 variant는 default 1종입니다.</p>
						<Unstyled>
							<Gcol gap={4} variant="box-line" className="p-16">
								<NativeSelect width="md" variant="default" value="apple" onChange={() => undefined}>
									<NativeSelectOption value="apple">default</NativeSelectOption>
									<NativeSelectOption value="banana">banana</NativeSelectOption>
								</NativeSelect>
							</Gcol>
						</Unstyled>

						<h2>Size</h2>
						<p>NativeSelect 컴포넌트에서 사용할 수 있는 size 옵션은 다음과 같습니다.</p>
						<Unstyled>
							<Gcol gap={4} variant="box-line" className="p-16">
								<Grow gap={8}>
									<NativeSelect width="md" size="md" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">md: 28</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="md" size="sm" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">sm: 25</NativeSelectOption>
									</NativeSelect>
								</Grow>
							</Gcol>
						</Unstyled>

						<h2>Width</h2>
						<p>NativeSelect 컴포넌트에서 사용할 수 있는 width 옵션은 다음과 같습니다.</p>
						<Unstyled>
							<Gcol gap={4} variant="box-line" className="p-8">
								<Gcol gap={2} className="w-[60rem] p-2">
									<NativeSelect width="full" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">full</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="auto" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">auto</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="max" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">max</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="min" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">min</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="2xs" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">2xs</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="xs" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">xs</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="sm" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">sm</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="md" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">md</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="lg" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">lg</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="xl" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">xl</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="2xl" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">2xl</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="24rem" value="apple" onChange={() => undefined}>
										<NativeSelectOption value="apple">24rem</NativeSelectOption>
									</NativeSelect>
								</Gcol>
							</Gcol>
						</Unstyled>

						<h2>Required</h2>
						<p>required 옵션이 활성화되면 강조 스타일로 표시됩니다.</p>
						<Unstyled>
							<Gcol gap={4} variant="box-line" className="p-16">
								<NativeSelect width="md" required value="apple" onChange={() => undefined}>
									<NativeSelectOption value="apple">필수 선택</NativeSelectOption>
									<NativeSelectOption value="banana">banana</NativeSelectOption>
								</NativeSelect>
							</Gcol>
						</Unstyled>

						<h2>ReadOnly</h2>
						<p>readOnly 옵션이 활성화되면 사용자 입력이 차단됩니다.</p>
						<Unstyled>
							<Gcol gap={4} variant="box-line" className="p-16">
								<NativeSelect width="md" readOnly value="apple" onChange={() => undefined}>
									<NativeSelectOption value="apple">readOnly</NativeSelectOption>
									<NativeSelectOption value="banana">banana</NativeSelectOption>
								</NativeSelect>
							</Gcol>
						</Unstyled>

						<h2>Disabled</h2>
						<p>disabled 옵션이 활성화되면 비활성화 스타일이 적용됩니다.</p>
						<Unstyled>
							<Gcol gap={4} variant="box-line" className="p-16">
								<NativeSelect width="md" disabled value="apple" onChange={() => undefined}>
									<NativeSelectOption value="apple">disabled</NativeSelectOption>
									<NativeSelectOption value="banana">banana</NativeSelectOption>
								</NativeSelect>
							</Gcol>
						</Unstyled>

						<h2>Error</h2>
						<p>error 옵션이 활성화되면 에러 스타일과 메시지가 함께 표시됩니다.</p>
						<Unstyled>
							<Gcol gap={4} variant="box-line" className="p-16">
								<Grow gap={8}>
									<NativeSelect width="lg" value="" error errorPs="tl" errorMsg="top left" onChange={() => undefined}>
										<NativeSelectOption value="">error</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="lg" value="" error errorPs="tr" errorMsg="top right" onChange={() => undefined}>
										<NativeSelectOption value="">error</NativeSelectOption>
									</NativeSelect>
								</Grow>
								<Grow gap={8}>
									<NativeSelect width="lg" value="" error errorPs="bl" errorMsg="bottom left" onChange={() => undefined}>
										<NativeSelectOption value="">error</NativeSelectOption>
									</NativeSelect>
									<NativeSelect width="lg" value="" error errorPs="br" errorMsg="bottom right" onChange={() => undefined}>
										<NativeSelectOption value="">error</NativeSelectOption>
									</NativeSelect>
								</Grow>
							</Gcol>
						</Unstyled>
					</>
				);
			},
		},
		controls: { expanded: false },
	},
	argTypes: {
		variant: {
			control: { type: 'inline-radio' },
			options: ['default'],
			table: { category: '스타일 props' },
		},
		size: {
			control: { type: 'inline-radio' },
			options: ['lg', 'md'],
			table: { category: '스타일 props' },
		},
		width: {
			control: { type: 'inline-radio' },
			options: ['full', 'auto', 'max', 'min', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
			table: { category: '스타일 props' },
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
			control: { type: 'inline-radio' },
			options: ['tl', 'tc', 'tr', 'bl', 'bc', 'br'],
			table: { category: '에러 props' },
		},
		errorMsg: {
			control: { type: 'text' },
			table: { category: '에러 props' },
		},

		disabled: {
			table: { disable: true },
		},
		className: {
			table: { disable: true },
		},
		children: {
			table: { disable: true },
		},
		value: {
			table: { disable: true },
		},
		onChange: {
			table: { disable: true },
		},
	},
	args: {
		variant: 'default',
		size: 'lg',
		width: 'full',
		disabled: false,
		required: false,
		readOnly: false,
		error: false,
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
			<NativeSelect {...restArgs} value={value} onChange={handleChange}>
				<NativeSelectOption value="">선택하세요</NativeSelectOption>
				{options.map((o) => (
					<NativeSelectOption key={o.value} value={o.value}>
						{o.label}
					</NativeSelectOption>
				))}
			</NativeSelect>
		);
	},
};