import type { Meta, StoryObj } from '@storybook/react';
import { ZoomControl } from '@/shared/components/common/ZoomControl';
import { Grow, Gcol } from '@/shared/components/common';
import { StoryWrap, StoryBox } from '@/shared/components/storybook/StoryWrap';

const meta: Meta<typeof ZoomControl> = {
  title: 'Components/Common/ZoomControl',
  component: ZoomControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ZoomControl은 화면 확대/축소와 초기화를 제어하는 컴포넌트이다.
사용자의 가독성을 위해 루트 폰트 크기와 scale 값을 함께 조정한다.

- **Zoom Out**: 글자 크기/스케일 축소
- **Zoom In**: 글자 크기/스케일 확대
- **초기화**: 기본 배율(100%)로 복원

<br>
#### **기본 ZoomControl: Usage**
\`\`\`tsx
import { ZoomControl } from '@/shared/components/common/ZoomControl';

<ZoomControl />
\`\`\`
        `,
      },
      argTypes: { expanded: false },
    },
    controls: { expanded: false },
  },
  argTypes: {
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ZoomControl>;

export const Default: Story = {
  render: () => {
    return (
      <StoryWrap className="flex-row">
        <StoryBox>
          <ZoomControl />
        </StoryBox>

        <StoryBox>
          <Grow placement="cc" className="gap-2">
            <Gcol placement="ss" className="gap-[0.4rem]">
              <div className="text-sm">확대/축소 버튼으로 비율을 조정해 보세요.</div>
            </Gcol>
          </Grow>
        </StoryBox>
      </StoryWrap>
    );
  },
};
