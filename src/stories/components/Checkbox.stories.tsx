import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo, FormTable, FormCell, FormItem, Separator, FormRow } from '@/shared/components/common';
import { TableRow } from '@/shared/components/uiux';
import { Checkbox } from '@/shared/components/uiux/Checkbox';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/UIUX/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `**Checkbox** 컴포넌트는 사용자가 여러 옵션 중에서 하나 이상의 값을 선택할 때 사용합니다.
설정 변경, 동의/비동의, 목록 필터링 등 다양한 상황에서 활용됩니다.

- **다양한 상태**: \`default\`, \`checked\`, \`indeterminate\`, \`disabled\` 등 명확한 시각적 피드백을 제공합니다.
- **유연한 스타일링**: \`size\`, \`variant\`, \`color\` prop을 통해 다양한 디자인 요구사항을 충족합니다.


\`\`\`tsx
import { Checkbox } from '@/shared/components/uiux/Checkbox';

// 기본 사용
<Checkbox>Label</Checkbox>

// 상태 (States)
<Checkbox checked>Checked</Checkbox>
<Checkbox checked="indeterminate">Indeterminate</Checkbox>
<Checkbox disabled>Disabled</Checkbox>

// 크기 (Size)
<Checkbox size="lg">Large</Checkbox>
<Checkbox size="sm">Small</Checkbox>

// 변형 (Variant)
<Checkbox variant="favorite" />
<Checkbox variant="button">Button Variant</Checkbox>
\`\`\`
        `,
            },
            argTypes: { expanded: false },
        },
        controls: { expanded: false },
    },
    argTypes: {
        // 1. Appearance
        variant: {  
            control: 'select', 
            options: ['default', 'favorite', 'noneText', 'button'],
            description: '체크박스 스타일 유형',
            table: { 
                category: 'Appearance',
                type: { summary: 'default | favorite | noneText | button' },
            },
        },
        size: { 
            control: 'select', 
            options: ['lg', 'sm'],
            description: '체크박스 크기',
            table: { 
                category: 'Appearance',
                type: { summary: 'lg | sm' },
            },
        },
        color: { 
            control: 'select', 
            options: ['primary', 'information', 'secondary'],
            description: '체크박스 색상',
            table: { 
                category: 'Appearance',
                type: { summary: 'primary | information | secondary' },
            },
        },

        // 2. State
        checked: {
            control: 'select',
            options: [true, false, 'indeterminate'],
            description: '체크박스 선택 상태',
            table: { 
                category: 'State',
                type: { summary: 'true | false | indeterminate' },
            },
        },
        disabled: {
            control: 'boolean',
            description: '비활성화 여부',
            table: { category: 'State' },
        },

        // 3. Content
        children: {
            control: 'text',
            description: '체크박스 라벨',
            table: { category: 'Content' },
        },

        // 4. Events
        onCheckedChange: { 
            action: 'checked changed', 
            description: '체크 상태 변경 시 발생하는 이벤트',
            table: { category: 'Events' } 
        },

        className: { table: { disable: true } },
    },
    args: {
        variant: 'default',
        size: 'lg',
        color: 'primary',
        disabled: false,
        children: 'Checkbox Label',
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const renderInteractive: Story['render'] = (args) => {
    const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(args.checked ?? false);

    React.useEffect(() => {
        setChecked(args.checked ?? false);
    }, [args.checked]);

    const handleCheckedChange = (isChecked: boolean | 'indeterminate') => {
        setChecked(isChecked);
        args.onCheckedChange?.(isChecked);
    };

    const children = args.variant === 'button' ? 'Button Variant' : args.children;

    return (
        <StoryWrap>
            <StoryBox>
                <Grow>
                    <Checkbox {...args} checked={checked} onCheckedChange={handleCheckedChange}>
                        {children}
                    </Checkbox>
                </Grow>
            </StoryBox>
        </StoryWrap>
    );
};

export const Default: Story = { 
    render: (args) => {
        // Checkbox 컴포넌트가 내부 상태를 가지고 있어 외부에서 제어하기 어렵습니다.
        // 이 render 함수는 Storybook에서 상태를 제어하는 방법을 보여줍니다.
        const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(args.checked ?? false);

        React.useEffect(() => {
            setChecked(args.checked ?? false);
        }, [args.checked]);

        const handleCheckedChange = (isChecked: boolean | 'indeterminate') => {
            setChecked(isChecked);
            args.onCheckedChange?.(isChecked);
        };

        const children = args.variant === 'button' ? 'Button Variant' : args.children;

        return (
            <StoryWrap>
                <StoryBox>
                    <Grow>
                        <Checkbox {...args} checked={checked} onCheckedChange={handleCheckedChange}>
                            {children}
                        </Checkbox>
                    </Grow>
                </StoryBox>
                <StoryBox>
                    <Grow placement="cc" className="gap-2">
                        <Gcol placement="ss" className="gap-[0.2rem]">
                            <Typo variant="body-sm">Checked</Typo>
                            <Checkbox checked>Label</Checkbox>
                        </Gcol>
                        <Gcol placement="ss" className="gap-[0.2rem]">
                            <Typo variant="body-sm">Indeterminate</Typo>
                            <Checkbox checked="indeterminate">Label</Checkbox>
                        </Gcol>
                        <Gcol placement="ss" className="gap-[0.2rem]">
                            <Typo variant="body-sm">Disabled</Typo>
                            <Checkbox disabled>Label</Checkbox>
                        </Gcol>
                        <Gcol placement="ss" className="gap-[0.2rem]">
                            <Typo variant="body-sm">Favorite</Typo>
                            <Checkbox variant="favorite" />
                        </Gcol>
                        <Gcol placement="ss" className="gap-[0.2rem]">
                            <Typo variant="body-sm">Button</Typo>
                            <Checkbox variant="button">Button Variant</Checkbox>
                        </Gcol>
                    </Grow>
                </StoryBox>
            </StoryWrap>
        )
    }
};

export const All: Story = {
    render: () => (
        <Grow placement="sc" className="gap-6 flex-wrap bg-[var(--color-gray-5)] p-6 flex-col items-start w-full">
            <section className="w-full space-y-3">
                <h3 className="text-lg font-bold">Sizes</h3>
                <div className="flex gap-4 items-center">
                    <Checkbox size="lg">Size lg (Default)</Checkbox>
                    <Checkbox size="sm">Size sm</Checkbox>
                </div>
            </section>

            <section className="w-full space-y-3">
                <h3 className="text-lg font-bold">Variants</h3>
                <div className="flex gap-4 items-center flex-wrap">
                    <Checkbox variant="default">Default</Checkbox>
                    <Checkbox variant="favorite" />
                    <Checkbox variant="button">Button Variant</Checkbox>
                    <Checkbox variant="noneText">None Text</Checkbox>
                </div>
            </section>

            <section className="w-full space-y-3">
                <h3 className="text-lg font-bold">Colors (Checked State)</h3>
                <div className="flex gap-4 items-center">
                    <Checkbox color="primary" checked>Primary</Checkbox>
                    <Checkbox color="information" checked>Information</Checkbox>
                    <Checkbox color="secondary" checked>Secondary</Checkbox>
                </div>
            </section>

            <section className="w-full space-y-3">
                <h3 className="text-lg font-bold">States</h3>
                <div className="flex gap-4 items-center flex-wrap">
                    <Checkbox>Unchecked</Checkbox>
                    <Checkbox checked>Checked</Checkbox>
                    <Checkbox checked="indeterminate">Indeterminate</Checkbox>
                    <Checkbox disabled>Disabled</Checkbox>
                    <Checkbox disabled checked>Disabled Checked</Checkbox>
                </div>
            </section>
        </Grow>
    ),
};

export const Favorite: Story = {
    args: {
        variant: 'favorite',
        children: ''
    },
    render: renderInteractive,
};

export const Button: Story = {
    render: () => {
        const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(false);

        return (
            <StoryWrap>
                <StoryBox>
                    <Grow>
                        <Checkbox variant="button" checked={checked} onCheckedChange={setChecked}>
                            버튼 체크박스
                        </Checkbox>
                    </Grow>
                </StoryBox>
            </StoryWrap>
        );
    },
};

export const Indeterminate: Story = {
    args: {
        checked: 'indeterminate',
        children: '부분 선택 상태',
    },
    render: renderInteractive,
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: '비활성화 상태',
    },
    render: renderInteractive,
};

export const DisabledChecked: Story = {
    args: {
        disabled: true,
        checked: true,
        children: '비활성화된 선택 상태',
    },
    render: renderInteractive,
};

export const Form: Story = {
    render: () => {
        const [checked, setChecked] = React.useState(false);
        return (
            <StoryWrap>
                <FormTable variant="boxIn" caption="약관 동의" cols={['w-[10rem] min-w-[10rem]', '']}>
                    <TableRow>
                        <FormCell title="서비스 이용약관">
                            <FormItem>
                                <Checkbox checked={checked} onCheckedChange={(c) => setChecked(c === true)}>
                                    (필수) 서비스 이용약관에 동의합니다.
                                </Checkbox>
                            </FormItem>
                        </FormCell>
                    </TableRow>
                </FormTable>
            </StoryWrap>
        );
    },
};