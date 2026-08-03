/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import Ltpz039, { Ltpz039Props } from '@/features/pub/ispl/cvrPl/components/popups/Ltpz039';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/popup/LTPZ039',
  component: Ltpz039,
  args: {
    isFetus: 'refundGeneral',
    noticeType: 'default',
  },
  argTypes: {
    isFetus: {
      name: '태아 보험 및 환급금 유형',
      control: {
        type: 'radio',
        labels: {
          refundGeneral: '예상환급금 - 일반형',
          refundSeparated: '예상환급금 - 분리형',
          fetusGeneral: '태아 일반형 (3종 세트)',
          fetusSeparated: '태아 분리형 (3종 세트)',
        },
      },
      options: ['refundGeneral', 'refundSeparated', 'fetusGeneral', 'fetusSeparated'],
      description: '태아 보험 및 환급금 유형 선택 (4종 목록)',
    },
    noticeType: {
      name: '안내사항 유형',
      control: {
        type: 'radio',
        labels: {
          default: '기본 안내사항',
          standardRate: '적용이율이 표준이율인 경우',
          fetusSilson: '태아실손상품인 경우',
        },
      },
      options: ['default', 'standardRate', 'fetusSilson'],
      description: '하단 참고 안내사항 케이스 선택 (3종 목록)',
    },
  },
};

// ==========================================
// 1. 유형별 스토리 (4종)
// ==========================================

export const Default = (args: Ltpz039Props) => {
  return (
    <LayoutDoc>
      <Ltpz039 {...args} />
    </LayoutDoc>
  );
};
Default.storyName = '1. 예상환급금 - 일반형';
Default.args = {
  isFetus: 'refundGeneral',
  noticeType: 'default',
};

export const RefundSeparated = (args: Ltpz039Props) => {
  return (
    <LayoutDoc>
      <Ltpz039 {...args} />
    </LayoutDoc>
  );
};
RefundSeparated.storyName = '2. 예상환급금 - 분리형';
RefundSeparated.args = {
  isFetus: 'refundSeparated',
  noticeType: 'default',
};

export const FetusGeneral = (args: Ltpz039Props) => {
  return (
    <LayoutDoc>
      <Ltpz039 {...args} />
    </LayoutDoc>
  );
};
FetusGeneral.storyName = '3. 태아 일반형 (3종 세트)';
FetusGeneral.args = {
  isFetus: 'fetusGeneral',
  noticeType: 'default',
};

export const FetusSeparated = (args: Ltpz039Props) => {
  return (
    <LayoutDoc>
      <Ltpz039 {...args} />
    </LayoutDoc>
  );
};
FetusSeparated.storyName = '4. 태아 분리형 (3종 세트)';
FetusSeparated.args = {
  isFetus: 'fetusSeparated',
  noticeType: 'default',
};

// ==========================================
// 2. 안내사항 케이스 스토리 (Notice Cases)
// ==========================================

export const NoticeDefault = (args: Ltpz039Props) => {
  return (
    <LayoutDoc>
      <Ltpz039 {...args} />
    </LayoutDoc>
  );
};
NoticeDefault.storyName = '안내사항: 기본';
NoticeDefault.args = {
  isFetus: 'refundGeneral',
  noticeType: 'default',
};

export const NoticeStandardRate = (args: Ltpz039Props) => {
  return (
    <LayoutDoc>
      <Ltpz039 {...args} />
    </LayoutDoc>
  );
};
NoticeStandardRate.storyName = '안내사항: 적용이율이 표준이율인 경우';
NoticeStandardRate.args = {
  isFetus: 'refundGeneral',
  noticeType: 'standardRate',
};

export const NoticeFetusSilson = (args: Ltpz039Props) => {
  return (
    <LayoutDoc>
      <Ltpz039 {...args} />
    </LayoutDoc>
  );
};
NoticeFetusSilson.storyName = '안내사항: 태아실손상품인 경우';
NoticeFetusSilson.args = {
  isFetus: 'fetusGeneral',
  noticeType: 'fetusSilson',
};
