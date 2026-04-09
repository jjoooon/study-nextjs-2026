'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { AiIcon, CheckBoldIcon, ListIcon } from '@icons';
import { Button } from '../uiux/Button';

export interface RecommendCardLegacyProps {
  title: string;
  plan: string;
  term: string;
  detail: string;
  mode?: 'ai-reason';
  actionLabel?: string;
  onActionClick?: () => void;
}

export interface RecommendCardCoverageProps {
  title: string;
  plan: string;
  term: string;
  detail: string;
  mode: 'coverage-check';
  premium?: string;
  checked?: boolean;
  actionLabel?: string;
  onActionClick?: () => void;
  onCheckedChange?: (checked: boolean) => void;
}

export type RecommendCardProps = RecommendCardLegacyProps | RecommendCardCoverageProps;

const DEFAULT_TITLE = '한화 시그니처 여성 간편건강보험4.0';
const DEFAULT_PLAN = '납입면제형 · 기본형 · 3N5간편고지형';
const DEFAULT_TERM = '20년납/100세만기';
const DEFAULT_PREMIUM = '120,000원';
const DEFAULT_DETAIL = '9형(355간편고지형(고혈압및당뇨추가고지))(올인원플랜)(1.7.8.9형)(15~89세)';
const DEFAULT_AI_ACTION_LABEL = 'AI 추천이유';
const DEFAULT_COVERAGE_ACTION_LABEL = '보장내용 확인';

const isCoverageProps = (props: RecommendCardProps): props is RecommendCardCoverageProps => {
  return props.mode === 'coverage-check';
};

export function RecommendCard(props: RecommendCardProps) {
  const { title, plan, term, detail, actionLabel, onActionClick } = props;
  const isCoverageMode = isCoverageProps(props);
  const premium = isCoverageMode ? props.premium : undefined;
  const checked = isCoverageMode ? (props.checked ?? false) : false;
  const onCheckedChange = isCoverageMode ? props.onCheckedChange : undefined;

  const displayTitle = title || DEFAULT_TITLE;
  const displayPlan = plan || DEFAULT_PLAN;
  const displayTerm = term || DEFAULT_TERM;
  const displayPremium = premium || DEFAULT_PREMIUM;
  const displayDetail = detail || DEFAULT_DETAIL;
  const displayActionLabel = actionLabel || (isCoverageMode ? DEFAULT_COVERAGE_ACTION_LABEL : DEFAULT_AI_ACTION_LABEL);

  return (
    <Gcol
      className={`w-full max-w-[28.2rem] overflow-hidden rounded-[1rem] border border-[#E5E5E5] pb-[0.5rem] shadow-[0_0.2rem_0.2rem_0_rgba(0,0,0,0.10)] ${isCoverageMode ? 'bg-[#817772]' : 'bg-[#61554F]'}`}
    >
      <Gcol
        className="relative mb-[-0.5rem] w-full gap-[1rem] rounded-[1rem] border border-[#F4F4F4] bg-white px-[1.6rem] pb-[1.2rem] pt-[2rem] shadow-[0_0.2rem_0.6rem_0_rgba(0,0,0,0.20)]"
        placement="ss"
      >
        {isCoverageMode ? (
          <button
            aria-label="카드 선택"
            className="absolute right-[0.9rem] top-[0.7rem] flex size-[2.4rem] items-center justify-center rounded-[0.48rem] border-2 border-[#D8D8D8] bg-white"
            onClick={() => onCheckedChange?.(!checked)}
            type="button"
          >
            {checked ? <CheckBoldIcon color="#FF5C2E" size={12} /> : null}
          </button>
        ) : null}

        <Gcol className="w-full" gap={1} placement={'ss'}>
          <Typo className="w-full truncate" tag={'strong'} variant={'body-xl'}>
            {displayTitle}
          </Typo>
          <Typo className="truncate text-[#414141]" tag={'p'} variant={'body-xs'}>
            {displayPlan}
          </Typo>
          <Grow className="w-full" placement="ec">
            <Typo className="truncate text-[#414141]" tag={'p'} variant={'body-xs'}>
              {displayTerm}
            </Typo>
            {isCoverageMode ? (
              <Grow className="shrink-0" gap={1} placement="ec">
                <span className="inline-flex size-[1.4rem] items-center justify-center rounded-[0.3rem] border border-[#FFB9A6] bg-[#FFF3EE] text-[0.9rem] text-[#FF5C2E]">
                  ₩
                </span>
                <Typo className="text-[#FF5C2E]" tag={'strong'} variant={'body-xl'}>
                  {displayPremium}
                </Typo>
              </Grow>
            ) : null}
          </Grow>
        </Gcol>

        <Grow className="w-full rounded-[0.8rem] bg-[#F4F4F4] px-[1rem] py-[1rem]" placement="sc">
          <div className="w-full overflow-hidden">
            <BulletList>
              <BulletListItem size={'sm'} type="dotBig">
                {displayDetail}
              </BulletListItem>
            </BulletList>
          </div>
        </Grow>
      </Gcol>

      <Grow className="h-[4.2rem] w-full" placement="cc">
        <Button className="text-white" color="primary" onClick={onActionClick} only="default" size="lg" variant="none">
          {isCoverageMode ? <ListIcon color="#FFFFFF" size={15} /> : <AiIcon color="#FFFFFF" color2="#FFFFFF" />}
          {displayActionLabel}
        </Button>
      </Grow>
    </Gcol>
  );
}
