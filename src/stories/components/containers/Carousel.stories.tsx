import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Gcol, Grow } from '@atoms';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@uiux/Carousel';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';

const slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5', 'Slide 6', 'Slide 7', 'Slide 8', 'Slide 9', 'Slide 10', 'Slide 11', 'Slide 12', 'Slide 13', 'Slide 14', 'Slide 15', 'Slide 16', 'Slide 17', 'Slide 18', 'Slide 19', 'Slide 20'];

function CarouselPreview({ orientation = 'horizontal', className = 'w-lg' }: { orientation?: 'horizontal' | 'vertical'; className?: string }) {
  const hasHeightClass = /(^|\s)h-/.test(className);
  const resolvedClassName = orientation === 'vertical' && !hasHeightClass ? `${className} h-104` : className;

  return (
    <div className={orientation === 'vertical' ? 'py-12' : 'px-12'}>
      <Carousel opts={{slidesToScroll: 5,}} orientation={orientation} className={resolvedClassName}>
        <CarouselContent>
          {slides.map((text) => (
            <CarouselItem key={text} className='basis-1/5'>
              <div
                className={`${orientation === 'vertical' ? 'h-10' : 'h-32'} rounded-md border flex items-center justify-center text-[1.3rem]`}
              >{text}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

const meta: Meta<typeof Carousel> = {
  title: 'Components/Containers/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                Carousel 컴포넌트는 여러 콘텐츠를 슬라이드 형태로 탐색하기 위한 UI 요소입니다.<br />
                orientation과 Embla 옵션을 통해 수평/수직 레이아웃을 유연하게 구성할 수 있습니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>Carousel 컴포넌트는 다음과 같은 구조로 사용할 수 있습니다.</p>
            <ul>
              <li>Carousel 루트 컨테이너</li>
              <li>CarouselContent 슬라이드 트랙</li>
              <li>CarouselItem 개별 슬라이드</li>
              <li>CarouselPrevious / CarouselNext 탐색 버튼</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@uiux/Carousel';

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
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>Carousel 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>prop</th>
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>orientation</td><td>'horizontal' | 'vertical'</td><td>슬라이드 방향</td></tr>
                <tr><td>className</td><td>string</td><td>루트 컨테이너 클래스</td></tr>
                <tr><td>opts</td><td>EmblaOptionsType</td><td>Embla 캐러셀 옵션</td></tr>
                <tr><td>plugins</td><td>EmblaPluginType[]</td><td>Embla 플러그인</td></tr>
                <tr><td>setApi</td><td>(api) =&gt; void</td><td>Carousel API 콜백</td></tr>
              </tbody>
            </table>

            <h2>Orientation</h2>
            <p>Carousel 컴포넌트에서 사용할 수 있는 방향 옵션은 다음과 같습니다.</p>
            <Unstyled>
              <Gcol gap={4}>
                <Grow gap={4} className="flex-wrap flex-col align-items-center">
                  <CarouselPreview orientation="horizontal" className="w-lg" />
                  <CarouselPreview orientation="vertical" className="h-104 w-60" />
                </Grow>
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      table: { category: '스타일 props' },
    },
    className: {
      control: { type: 'text' },
      table: { category: '스타일 props' },
    },
    opts: {
      control: { type: 'object' },
      table: { category: '설정 props' },
    },
    plugins: {
      table: { category: '설정 props', disable: true },
    },
    setApi: {
      table: { category: '이벤트 props' },
    },
    children: {
      table: { disable: true },
    },
  },
  args: {
    orientation: 'horizontal',
    className: 'w-lg',
    opts: {},
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: (args) => {
    return <CarouselPreview orientation={args.orientation} className={args.className} />;
  },
};
