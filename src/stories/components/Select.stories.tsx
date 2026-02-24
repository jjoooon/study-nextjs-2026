import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow } from '@/shared/components/common';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/shared/components/uiux/Select';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';


// extend the args with extra props used only in stories
interface SelectStoryArgs extends React.ComponentProps<typeof Select> {
    placeholder?: string;
    selectSize?: 'default' | 'small';
}

const meta: Meta<SelectStoryArgs> = {
    title: 'Components/UIUX/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    argTypes: {
        selectSize: {
            control: 'select',
            options: ['default', 'small'],
            description: '입력 높이',
        },
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
        onValueChange: { action: 'value changed' },
    },
    args: {
        selectSize: 'default',
        placeholder: '선택하세요',
    },
};
export default meta;
type Story = StoryObj<SelectStoryArgs>;

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
];

const renderDefault: Story['render'] = (args) => {
    const [value, setValue] = React.useState<string>('');
    const { placeholder, selectSize, ...rest } = args;

    return (
        <StoryWrap>
            <StoryBox>
                <Grow>
                    <Select
                        {...rest}
                        value={value}
                        onValueChange={(v) => {
                            setValue(v);
                            args.onValueChange?.(v);
                        }}
                    >
                        <SelectTrigger selectSize={selectSize}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
                                    {o.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Grow>
            </StoryBox>
        </StoryWrap>
    );
};

export const Default: Story = {
    render: renderDefault,
};

export const Disabled: Story = {
    args: { disabled: true, value: 'banana' } as SelectStoryArgs,
    render: renderDefault,
};

export const WithPlaceholder: Story = {
    args: { placeholder: '과일을 선택하세요' } as SelectStoryArgs,
    render: renderDefault,
};

export const Sizes: Story = {
    render: (args) => {
        const { placeholder, ...rest } = args;
        return (
            <StoryWrap className="flex gap-4">
                {(['default', 'small'] as const).map((sz) => (
                    <Select key={sz} {...rest} value="apple">
                        <SelectTrigger selectSize={sz}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
                                    {o.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ))}
            </StoryWrap>
        );
    },
};
