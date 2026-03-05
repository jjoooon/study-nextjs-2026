import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/uiux/Carousel';
import { StoryBox, StoryWrap } from '@/shared/components/storybook/StoryWrap';

const meta: Meta<typeof Carousel> = {
  title: 'Components/UIUX/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Carousel는 여러 콘텐츠를 슬라이드 형태로 좌/우(또는 상/하) 탐색할 수 있는 컴포넌트이다.
Embla Carousel 기반으로 동작하며, orientation과 옵션을 통해 다양한 레이아웃을 구성할 수 있다.

- **Carousel**: 루트 컨테이너
- **CarouselContent**: 슬라이드 트랙
- **CarouselItem**: 개별 슬라이드
- **CarouselPrevious / CarouselNext**: 탐색 버튼

---

<br>
#### **기본 Carousel: Usage**
\`\`\`tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/uiux/Carousel';

<Carousel orientation="horizontal" className="w-lg">
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
    <CarouselItem>Slide 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '슬라이드 방향',
      table: {
        category: 'Appearance',
        type: { summary: 'horizontal | vertical' },
      },
    },
    className: {
      control: 'text',
      description: '루트 컨테이너 클래스',
      table: { category: 'Appearance' },
    },
    opts: {
      control: false,
      description: 'Embla 옵션',
      table: { category: 'Behavior' },
    },
    plugins: {
      control: false,
      description: 'Embla 플러그인',
      table: { category: 'Behavior' },
    },
    setApi: {
      control: false,
      description: 'Carousel API setter',
      table: { category: 'Events' },
    },
    children: { table: { disable: true } },
  },
  args: {
    orientation: 'horizontal',
    className: 'w-lg',
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'];

export const Default: Story = {
  render: (args) => {
    const isVertical = args.orientation === 'vertical';
    const hasHeightClass = !!args.className && /(^|\s)h-/.test(args.className);
    const resolvedClassName = isVertical && !hasHeightClass ? `${args.className ?? ''} h-[26rem]` : args.className;

    return (
      <StoryWrap>
        <StoryBox>
          <div className={isVertical ? 'py-12' : 'px-12'}>
            <Carousel {...args} className={resolvedClassName}>
            <CarouselContent>
              {slides.map((text) => (
                <CarouselItem key={text}>
                  <div className="h-32 rounded-md border flex items-center justify-center text-[1.3rem]">{text}</div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
          </div>
        </StoryBox>
      </StoryWrap>
    );
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    className: 'h-[26rem] w-[24rem]',
  },
  render: (args) => (
    <StoryWrap>
      <StoryBox>
        <div className="py-12">
          <Carousel {...args}>
            <CarouselContent>
              {slides.map((text) => (
                <CarouselItem key={text}>
                  <div className="h-24 rounded-md border flex items-center justify-center text-[1.3rem]">{text}</div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </StoryBox>
    </StoryWrap>
  ),
};