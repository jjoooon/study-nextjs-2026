import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow } from '@/shared/components/common';
import { Checkbox } from '@/shared/components/uiux/Checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/UIUX/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        onCheckedChange: { action: 'checked changed' },
        variant: {  
            control: 'radio', 
            options: ['default', 'favorite', 'noneText', 'button'],
            description: '체크박스 스타일 유형',
            table: { category: 'Appearance' },
        },
        size: { 
            control: 'radio', 
            options: ['lg', 'sm'],
            description: '체크박스 크기',
            table: { category: 'Appearance' },
        },
        color: { 
            control: 'radio', 
            options: ['primary', 'information', 'secondary'],
            description: '체크박스 색상',
            table: { category: 'Appearance' },
        },
        checked: {
            control: 'select',
            options: [true, false, 'indeterminate'],
            description: '체크박스 선택 상태',
            table: { category: 'State' },
        },
        disabled: {
            control: 'boolean',
            description: '비활성화 여부',
            table: { category: 'State' },
        },
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

        return (
            <Grow placement="sc" className="gap-3 flex-wrap bg-[var(--color-gray-5)] p-6">
                <Checkbox {...args} checked={checked} onCheckedChange={handleCheckedChange}>
                    {args.children}
                </Checkbox>
            </Grow>
        )
    }
};

export const Favorite: Story = {
    ...Default,
    args: {
        variant: 'favorite',
    },
};

export const Button: Story = {
    ...Default,
    args: {
        variant: 'button',
        children: '버튼 체크박스',
    },
};

export const Indeterminate: Story = {
    ...Default,
    args: {
        checked: 'indeterminate',
        children: '부분 선택 상태',
    },
};

export const Disabled: Story = {
    ...Default,
    args: {
        disabled: true,
        children: '비활성화 상태',
    },
};

export const DisabledChecked: Story = {
    ...Default,
    args: {
        disabled: true,
        checked: true,
        children: '비활성화된 선택 상태',
    },
};