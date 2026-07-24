/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz351 from '@/features/pub/ispl/isplBsnsSupt/components/popups/Ltpz351';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/isplBsnsSupt/components/popups/Ltpz351',
  component: Ltpz351,
  argTypes: {
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

export const Default = () => {
  return (
    <LayoutDoc>
      <Ltpz351 noticeType="B" />
    </LayoutDoc>
  );
};
Default.storyName = '기본';

export const Sangryeong = () => (
  <LayoutDoc>
    <Ltpz351 noticeType="A" />
  </LayoutDoc>
);
Sangryeong.storyName = '상령일/동의종료일';

export const Bigwase = () => (
  <LayoutDoc>
    <Ltpz351 noticeType="B" />
  </LayoutDoc>
);
Bigwase.storyName = '보험차익비과세';

export const Silson = () => (
  <LayoutDoc>
    <Ltpz351 noticeType="C" />
  </LayoutDoc>
);
Silson.storyName = '실손 전부(비례) 보상';

export const Jangae = () => (
  <LayoutDoc>
    <Ltpz351 noticeType="D" />
  </LayoutDoc>
);
Jangae.storyName = '장애보험 전환';

export const Suikja = () => (
  <LayoutDoc>
    <Ltpz351 noticeType="E" />
  </LayoutDoc>
);
Suikja.storyName = '수익자 지정, 변경 추가약정';

export const Jijeong = () => (
  <LayoutDoc>
    <Ltpz351 noticeType="F" />
  </LayoutDoc>
);
Jijeong.storyName = '지정대리 청구인';

export const Dangwol = () => (
  <LayoutDoc>
    <Ltpz351 noticeType="G" />
  </LayoutDoc>
);
Dangwol.storyName = '당월 해지 자동이체 신청 서비스';

export const Haeji = () => (
  <LayoutDoc>
    <Ltpz351 noticeType="H" />
  </LayoutDoc>
);
Haeji.storyName = '해지방지 휴대폰결제';

export const Nabmyeon = () => (
  <LayoutDoc>
    <Ltpz351 noticeType="I" />
  </LayoutDoc>
);
Nabmyeon.storyName = '보험료 납입면제 안내';


