import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo, FormTable, FormCell, FormItem} from '@/shared/components/common';
import { TableRow } from '@/shared/components/uiux';
import { Checkbox } from '@/shared/components/uiux/Checkbox';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/UIUX/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Checkbox는 사용자가 여러 옵션 중에서 하나 이상의 값을 선택할 때 사용하는 컴포넌트이다.
설정 변경, 동의/비동의, 목록 필터링 등 다양한 상황에서 활용된다.

- **기본 체크박스** 방식과 **버튼 체크박스** 두가지로 크게 나누어진다.
- 스타일로는 **default**, **favorite**, **noneText**, **button**이 있다.

- - -

<br>
#### **기본 체크박스: Usage**
\`\`\`tsx
import { Checkbox } from '@/shared/components/uiux/Checkbox';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

<Checkbox
  variant={"default | favorite | noneText"}
  size={"lg | sm"}
  color={"primary | information | secondary"}
  checked={checked}
  onCheckedChange={setChecked}
  disabled={true | false}
>
  Label
</Checkbox>
\`\`\`

<br>
#### **버튼 체크박스: Usage**
\`\`\`tsx
import { Checkbox } from '@/shared/components/uiux/Checkbox';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

<Checkbox
  variant="button"
  size={"lg | sm"}
  color={"primary | information | secondary"}
  checked={checked}
  onCheckedChange={setChecked}
  disabled={true | false}
>
  Button Label
</Checkbox>
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
            options: ['default', 'favorite', 'noneText', 'button', 'text'],
            description: '체크박스 스타일 유형',
            table: { 
                category: 'Appearance',
                type: { summary: 'default | favorite | noneText | button | text' },
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
    }, [args.checked, args.variant]);

    const handleCheckedChange = (isChecked: boolean | 'indeterminate') => {
        setChecked(isChecked);
        args.onCheckedChange?.(isChecked);
    };

    const children = args.variant === 'button' ? 'Button Variant' : args.children;
    
    const { checked: _checked, onCheckedChange: _onCheckedChange, ...restArgs } = args;

    return (
        <StoryWrap>
            <StoryBox>
                <Grow>
                    <Checkbox {...restArgs} checked={checked} variant={args.variant} onCheckedChange={handleCheckedChange}>
                        {children}
                    </Checkbox>
                </Grow>
            </StoryBox>
        </StoryWrap>
    );
};

export const Default: Story = { 
    render: (args) => {
        // 이전에는 컴포넌트 내부에서 상태를 관리했기 때문에
        // 외부에서 제어하기 위해 추가 로직이 필요했으나
        // 이제 props.checked / onCheckedChange로 완전히 제어 가능합니다.
        const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(args.checked ?? false);

        React.useEffect(() => {
            setChecked(args.checked ?? false);
        }, [args.checked, args.variant]);

        const handleCheckedChange = (isChecked: boolean | 'indeterminate') => {
            setChecked(isChecked);
            args.onCheckedChange?.(isChecked);
        };

        const children = args.variant === 'button' ? 'Button Variant' : args.children;

        const { checked: _checked, onCheckedChange: _onCheckedChange, ...restArgs } = args;

        return (
            <StoryWrap className='flex-row'>
                <StoryBox>
                    <Checkbox {...restArgs} checked={checked} variant={args.variant} onCheckedChange={handleCheckedChange}>
                        {children}
                    </Checkbox>
                </StoryBox>
                <StoryBox>
                    <Grow placement="cc" className="gap-2">
                        <Gcol placement="ss" className="gap-[0.4rem]">
                            <Checkbox variant="text">Label</Checkbox>
                        </Gcol>
                        <Gcol placement="ss" className="gap-[0.4rem]">
                            <Checkbox checked>Label</Checkbox>
                        </Gcol>
                        <Gcol placement="ss" className="gap-[0.4rem]">
                            <Checkbox checked="indeterminate">Label</Checkbox>
                        </Gcol>
                        <Gcol placement="ss" className="gap-[0.4rem]">
                            <Checkbox disabled>Label</Checkbox>
                        </Gcol>
                        <Gcol placement="ss" className="flex items-[normal] gap-[0.2rem] w-[20px] h-auto">
                            <Checkbox variant="favorite" className='h-auto'/>
                        </Gcol>
                        <Gcol placement="ss" className="gap-[0.4rem]">
                            <Checkbox variant="button">Button Variant</Checkbox>
                        </Gcol>
                        <Gcol placement="ss" className="gap-[0.4rem]">
                            <Checkbox variant="noneText">noneText Variant</Checkbox>
                        </Gcol>
                    </Grow>
                </StoryBox>
            </StoryWrap>
        )
    }
};

export const NoneText: Story = {
    args: {
        variant: 'noneText',
        children: '',
    },
};


export const Text: Story = {
    args: {
        variant: 'text',
        children: 'Text ONLY Checkbox',
    },
};



export const Favorite: Story = {
    args: {
        variant: 'favorite',
    },
    render: (args) => {
        const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(args.checked ?? false);
        const { children, ...restArgs } = args;

        return (
            <div className='pd-0'>
                <Checkbox className='w-auto h-auto' {...restArgs} checked={checked} onCheckedChange={setChecked} />
            </div>
        );
    },
};

export const Button: Story = {
     args: {
        variant: 'button',
        children: '버튼 체크박스'
    },
    render: (args) => {
        const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(args.checked ?? false);

        return (
            <Checkbox variant="button" checked={checked} onCheckedChange={setChecked}>
                {args.children}
            </Checkbox>
        );
    },
};

export const Indeterminate: Story = {
    args: {
        checked: 'indeterminate',
        children: '부분 선택 상태',
    },
    render: (args) => {
        const [checked, setChecked] = React.useState<boolean | 'indeterminate'>('indeterminate');
        return (
            <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
        );
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: '비활성화 상태',
    },
    render: (args) => {        
        const [checked, setChecked] = React.useState<boolean | 'indeterminate'>('indeterminate');
        return (
            <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
        );
    }
};

export const DisabledChecked: Story = {
    args: {
        disabled: true,
        checked: true,
        children: '비활성화된 선택 상태',
    },
    render: (args) => {
        const [checked, setChecked] = React.useState<boolean | 'indeterminate'>('indeterminate');
        return (
            <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
        );
    }
};

export const Form: Story = {
    render: () => {
        const [checked, setChecked] = React.useState(false);
        return (
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
        );
    },
};


export const list: Story = {
    render: () => {
        const [checkedList, setCheckedList] = useState([true, false, false]);
        const handleCheckedChange = (idx: number) => (checked: boolean | 'indeterminate') => {
            setCheckedList(
                list => list.map((v, i) => (i === idx ? !!checked : v))
            );
        }
        return (
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row gap-2'>
                    <Checkbox checked={checkedList[0]} onCheckedChange={handleCheckedChange(0)}>전체</Checkbox>
                    <Checkbox checked={checkedList[1]} onCheckedChange={handleCheckedChange(1)}>선택</Checkbox>
                    <Checkbox checked={checkedList[2]} onCheckedChange={handleCheckedChange(2)}>미선택</Checkbox>
                </div>
            </div>
        );
    },
};

export const Map: Story = {
    render: () => {
        const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({ all: true, selected: false, unselected: false });

        const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
            setCheckedMap(map => ({ ...map, [key]: !!checked }));
        };

        return (
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row gap-2'>
                    <Checkbox checked={checkedMap.all} onCheckedChange={handleCheckedChange('all')}>전체</Checkbox>
                    <Checkbox checked={checkedMap.selected} onCheckedChange={handleCheckedChange('selected')}>선택</Checkbox>
                    <Checkbox checked={checkedMap.unselected} onCheckedChange={handleCheckedChange('unselected')}>미선택</Checkbox>
                </div>
            </div>
        );
    },
};

