'use client';

import { Gcol, Grow, Grid, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { AdderIcon, AdderIcon2, AiIcon, PaperIcon } from '@icons';
import { Checkbox } from '@uiux/Checkbox';
import { useState, type ReactNode } from 'react';
import { Button } from '../uiux/Button';

export type RecommendCardDataItem = {
  id: number;
  title: string;
  plan: string;
  term: string;
  detail: string;
};

type RecommendCardNormalProps = {
  /** 카드 배리언트: 기본형/체크박스형 */
  variant?: 'normal' | 'checkbox';
  /** 최상위 래퍼 클래스 */
  className?: string;
  /** 배열 데이터를 받아 기본형 카드를 반복 렌더링 */
  recommendData?: RecommendCardDataItem[];
  /** 카드 제목 (상품명 등) */
  title?: string;
  /** 플랜 정보 */
  plan?: string;
  /** 기간 정보 */
  term?: string;
  /** 상세 내용 (BulletListItem에 표시) */
  detail?: string;
  /** 체크 상태(옵션) */
  checked?: boolean;
  /** 체크 변경 이벤트(옵션) */
  onCheckedChange?: (checked: boolean) => void;
  /** AI 추천이유 버튼 클릭 콜백(외부 Dialog 제어 시 사용) */
  onAiReasonClick?: () => void;
  children?: never;
  footer?: never;
};

type RecommendCardFreeProps = {
  /** 카드 배리언트: 자유형 — 흰 영역에 children, 버튼 영역에 footer 삽입 */
  variant: 'free';
  /** 최상위 래퍼 클래스 */
  className?: string;
  /** 흰 카드 영역에 자유롭게 삽입할 컨텐츠 */
  children?: ReactNode;
  /** 하단 버튼 영역에 자유롭게 삽입할 컨텐츠 */
  footer?: ReactNode;
  title?: never;
  plan?: never;
  term?: never;
  detail?: never;
  checked?: never;
  onCheckedChange?: never;
  onAiReasonClick?: never;
};

export type RecommendCardProps = RecommendCardNormalProps | RecommendCardFreeProps;

type NormalRecommendCardItemProps = {
  variant: 'normal' | 'checkbox';
  className?: string;
  title?: string;
  plan?: string;
  term?: string;
  detail?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onAiReasonClick?: () => void;
};

function NormalRecommendCardItem({
  variant,
  className,
  title = '',
  plan = '',
  term = '',
  detail = '',
  checked,
  onCheckedChange,
  onAiReasonClick,
}: NormalRecommendCardItemProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = checked ?? internalChecked;
  const isCheckboxSelected = variant === 'checkbox' && isChecked;

  return (
    <Gcol
      className={`relative p-px w-full rounded-[0.8rem] bg-linear-to-b from-[#E5E5E5] from-[47.33%] to-[#61554F] to-100%${className ? ` ${className}` : ''}`}
    >
      <Grid
        className={
          'rounded-[0.8rem] grid-rows-[1fr_auto] w-full shadow-[0.4rem_4rem_6rem_0_rgba(0,0,0,0.10)]  bg-[#817772]'
        }
      >
        <Gcol
          className="relative overflow-visible bg-white rounded-[0.8rem] w-full py-[2rem] px-[1.6rem] shadow-[-3px_4px_6px_0_rgba(0,0,0,0.20)] [&>div]:[position:initial]"
          style={
            isCheckboxSelected
              ? {
                  backgroundImage: `url('/images/Ltpa020/cand_on_bg.png'), linear-gradient(328deg, #FF5C2E 9.4%, #FF8D02 97.24%)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right top, left top',
                }
              : undefined
          }
          placement="ss"
          gap={2}
        >
          {variant === 'checkbox' ? (
            <Checkbox
              checked={isChecked}
              className={`absolute right-[0.8rem] top-[0.rem] size-[2.4rem] ${
                isCheckboxSelected
                  ? 'border-[#61554F] bg-[#61554F] text-white data-[state=checked]:border-[#61554F] data-[state=checked]:bg-[#61554F]'
                  : ''
              }`}
              color="primary"
              onCheckedChange={(nextChecked) => {
                const nextValue = nextChecked === true;
                if (checked === undefined) {
                  setInternalChecked(nextValue);
                }
                onCheckedChange?.(nextValue);
              }}
              size="lg"
              variant="noneText"
            >
              단일
            </Checkbox>
          ) : null}

          <Gcol className="w-full" gap={0.5} placement={'ss'}>
            <Typo tag={'strong'} variant={'body-xl'} className={isCheckboxSelected ? 'text-[#FFF]' : 'text-[#000]'}>
              {title}
            </Typo>
            <Grow className="w-full" placement="sc">
              <Typo tag={'p'} variant={'body-xs'} className={isCheckboxSelected ? 'text-[#FFF]' : 'text-[#414141]'}>
                {plan}
              </Typo>
              <Typo tag={'p'} variant={'body-xs'} className={isCheckboxSelected ? 'text-[#FFF]' : 'text-[#414141]'}>
                {detail}
              </Typo>
            </Grow>
            <Grow className="w-full" placement="bwe">
              <Typo tag={'p'} variant={'body-xs'} className={isCheckboxSelected ? 'text-[#FFF]' : 'text-[#414141]'}>
                {term}
              </Typo>
              {variant === 'checkbox' ? (
                <Typo
                  tag={'p'}
                  variant={'body-xl'}
                  weight={'bold'}
                  className={`flex items-center gap-1 ${isCheckboxSelected ? 'text-white' : 'text-primary'}`}
                >
                  {isCheckboxSelected ? <AdderIcon2 size={14} /> : <AdderIcon size={14} />}
                  120,000원
                </Typo>
              ) : null}
            </Grow>
          </Gcol>
          {variant === 'normal' ? (
            <Grow className="w-full rounded-[0.8rem] bg-[#F4F4F4] px-[1rem] py-[1rem]" placement="sc">
              <BulletList>
                <BulletListItem size={'sm'} type={'dotBig'} className="text-[#000]!">
                  {detail}
                </BulletListItem>
              </BulletList>
            </Grow>
          ) : null}
          {variant === 'checkbox' ? (
            <Grow
              className="w-full rounded-[0.8rem] bg-[#F4F4F4] px-[1rem] py-[1rem] min-h-[5.4rem] items-start"
              placement="sc"
            >
              <BulletList>
                <BulletListItem size={'sm'} type={'dotBig'} className="text-[#000]!">
                  {detail}
                </BulletListItem>
              </BulletList>
            </Grow>
          ) : null}
        </Gcol>
        <Grow className="w-full h-[3.7rem]" placement="cc">
          {variant === 'normal' ? (
            <Button
              color="primary"
              className="text-white font-bold"
              onClick={() => onAiReasonClick?.()}
              only="default"
              size="lg"
              variant="none"
            >
              <AiIcon color={'#FFFFFF'} color2={'#FFFFFF'} />
              AI 추천이유
            </Button>
          ) : null}
          {variant === 'checkbox' ? (
            <Button color="primary" className="text-white font-bold" only="default" size="lg" variant="none">
              <PaperIcon color={'#FFFFFF'} color2={'#FFFFFF'} />
              보장내용 확인
            </Button>
          ) : null}
        </Grow>
      </Grid>
    </Gcol>
  );
}

export function RecommendCard(props: RecommendCardProps) {
  if (props.variant === 'free') {
    const { children, footer, className } = props;
    return (
      <Gcol
        className={`relative p-px w-full rounded-[0.8rem] bg-linear-to-b from-[#E5E5E5] from-[47.33%] to-[#61554F] to-100%${className ? ` ${className}` : ''}`}
      >
        <Grid className="bg-[#817772] rounded-[0.8rem] grid-rows-[1fr_auto] w-full">
          <Gcol
            className="relative bg-white rounded-[0.8rem] w-full min-h-[16.3rem] py-[2rem] px-[1.6rem] shadow-[-3px_4px_6px_0_rgba(0,0,0,0.20)]"
            placement="ss"
            gap={2}
          >
            {children}
          </Gcol>
          <Grow className="w-full min-h-[3.7rem]" placement="cc">
            {footer}
          </Grow>
        </Grid>
      </Gcol>
    );
  }

  const {
    className,
    recommendData,
    variant = 'normal',
    title = '',
    plan = '',
    term = '',
    detail = '',
    checked,
    onCheckedChange,
    onAiReasonClick,
  } = props;

  if (recommendData && recommendData.length > 0) {
    return (
      <Gcol className="w-full" gap={2}>
        {recommendData.map((item) => (
          <NormalRecommendCardItem
            key={item.id}
            variant={variant}
            className={className}
            title={item.title}
            plan={item.plan}
            term={item.term}
            detail={item.detail}
            onAiReasonClick={onAiReasonClick}
          />
        ))}
      </Gcol>
    );
  }

  return (
    <NormalRecommendCardItem
      variant={variant}
      className={className}
      title={title}
      plan={plan}
      term={term}
      detail={detail}
      checked={checked}
      onCheckedChange={onCheckedChange}
      onAiReasonClick={onAiReasonClick}
    />
  );
}
