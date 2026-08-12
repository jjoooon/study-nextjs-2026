/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz351, { Ltpz351Props } from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz351';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ351',
  component: Ltpz351,
  args: {
    noticeType: 'B',
    isPayExempt: true,
  },
  argTypes: {
    isPayExempt: {
      control: 'boolean',
      description: '납입면제 여부 (true: Input + 검색버튼, false: 일반 텍스트)',
    },
    noticeType: {
      control: {
        type: 'select',
        labels: {
          A: '상령일/동의종료일',
          B: '보험차익비과세',
          C: '실손 전부(비례) 보상',
          D: '장애보험 전환',
          E: '수익자 지정, 변경 추가약정',
          F: '지정대리 청구인',
          G: '당월 해지 자동이체 신청 서비스',
          H: '해지방지 휴대폰결제',
          I: '보험료 납입면제 안내',
        },
      },
      options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
      description: '알림톡 안내문구 케이스',
    },
  },
};

export const Default = (args: Ltpz351Props) => {
  return (
    <LayoutDoc>
      <Ltpz351 {...args} />
    </LayoutDoc>
  );
};
Default.storyName = '기본';
Default.args = {
  noticeType: 'B',
  isPayExempt: true,
};

export const PayExemptFalse = (args: Ltpz351Props) => {
  return (
    <LayoutDoc>
      <Ltpz351 {...args} />
    </LayoutDoc>
  );
};
PayExemptFalse.storyName = '납입면제 False';
PayExemptFalse.args = {
  noticeType: 'B',
  isPayExempt: false,
};

export const Sangryeong = (args: Ltpz351Props) => (
  <LayoutDoc>
    <Ltpz351 {...args} noticeType="A" />
  </LayoutDoc>
);
Sangryeong.storyName = '상령일/동의종료일';

export const Bigwase = (args: Ltpz351Props) => (
  <LayoutDoc>
    <Ltpz351 {...args} noticeType="B" />
  </LayoutDoc>
);
Bigwase.storyName = '보험차익비과세';

export const Silson = (args: Ltpz351Props) => (
  <LayoutDoc>
    <Ltpz351 {...args} noticeType="C" />
  </LayoutDoc>
);
Silson.storyName = '실손 전부(비례) 보상';

export const Jangae = (args: Ltpz351Props) => (
  <LayoutDoc>
    <Ltpz351 {...args} noticeType="D" />
  </LayoutDoc>
);
Jangae.storyName = '장애보험 전환';

export const Suikja = (args: Ltpz351Props) => (
  <LayoutDoc>
    <Ltpz351 {...args} noticeType="E" />
  </LayoutDoc>
);
Suikja.storyName = '수익자 지정, 변경 추가약정';

export const Jijeong = (args: Ltpz351Props) => (
  <LayoutDoc>
    <Ltpz351 {...args} noticeType="F" />
  </LayoutDoc>
);
Jijeong.storyName = '지정대리 청구인';

export const Dangwol = (args: Ltpz351Props) => (
  <LayoutDoc>
    <Ltpz351 {...args} noticeType="G" />
  </LayoutDoc>
);
Dangwol.storyName = '당월 해지 자동이체 신청 서비스';

export const Haeji = (args: Ltpz351Props) => (
  <LayoutDoc>
    <Ltpz351 {...args} noticeType="H" />
  </LayoutDoc>
);
Haeji.storyName = '해지방지 휴대폰결제';

export const Nabmyeon = (args: Ltpz351Props) => (
  <LayoutDoc>
    <Ltpz351 {...args} noticeType="I" />
  </LayoutDoc>
);
Nabmyeon.storyName = '보험료 납입면제 안내';
