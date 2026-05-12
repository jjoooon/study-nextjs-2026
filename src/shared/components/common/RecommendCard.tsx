/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Grid, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { AiIcon, CircleCheckIcon } from '@icons';
import { Checkbox } from '@uiux/Checkbox';
import { useState, type ReactNode } from 'react';
import { Badge } from '../uiux/Badge';
import { Button } from '../uiux/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../uiux/Tooltip';

export type RecommendCardDataItem = {
  id: number;
  type: string;
  title: string;
  plan: string[];
  list?: string[];
};

type RecommendCardNormalProps = {
  variant?: 'normal' | 'checkbox';
  className?: string;
  recommendData?: RecommendCardDataItem[];
  title?: string;
  type?: string;
  plan?: string[];
  list?: string[];
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onAiReasonClick?: () => void;
  children?: never;
  footer?: never;
};

type RecommendCardFreeProps = {
  variant: 'free';
  className?: string;
  children?: ReactNode;
  footer?: ReactNode;
  title?: never;
  type?: never;
  plan?: never;
  list?: never;
  checked?: never;
  onCheckedChange?: never;
  onAiReasonClick?: never;
};

export type RecommendCardProps = RecommendCardNormalProps | RecommendCardFreeProps;

type NormalRecommendCardItemProps = {
  variant: 'normal' | 'checkbox';
  className?: string;
  title?: string;
  type?: string;
  plan?: string[];
  list?: string[];
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onAiReasonClick?: () => void;
};

function NormalRecommendCardItem({
  variant,
  className,
  title = '',
  type = '',
  plan = [],
  list = [],
  checked,
  onCheckedChange,
  onAiReasonClick,
}: NormalRecommendCardItemProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = checked ?? internalChecked;

  return (
    <Grid
      className={`relative p-px w-full rounded-[0.8rem] bg-linear-to-b from-[#E5E5E5] from-[47.33%] to-[#61554F] to-100%${className ? ` ${className}` : ''}`}
    >
      <Grid className={'rounded-[0.8rem] grid-rows-[1fr_auto] w-full bg-[#817772]'}>
        <Gcol
          className="relative overflow-visible bg-white rounded-[0.8rem] w-full py-[2rem] px-[1.6rem] shadow-[-3px_4px_6px_0_rgba(0,0,0,0.20)] [&>div]:[position:initial]"
          placement="ss"
          gap={2}
        >
          <Grow className="w-full" placement="bwc">
            <Badge size="md" variant="rounded" className="text-[#006FF2] bg-[#E0EFFF] h-[2.2rem] px-[0.6rem]">
              <CircleCheckIcon color="#006FF2" />
              {type}
            </Badge>
            {variant === 'checkbox' ? (
              <Checkbox
                checked={isChecked}
                className={`absolute right-0 size-[2.4rem]`}
                color="primary"
                onCheckedChange={(nextChecked) => {
                  const nextValue = nextChecked === true;
                  if (checked === undefined) {
                    setInternalChecked(nextValue);
                  }
                  onCheckedChange?.(nextValue);
                }}
                variant="noneText"
              >
                단일
              </Checkbox>
            ) : null}
          </Grow>
          <Gcol className="w-full" gap={0.5} placement={'ss'}>
            <Gcol className="w-full" gap={2}>
              <Typo tag={'strong'} variant={'body-xl'} className="w-full h-[2rem] text-[#000] overflow-hidden">
                <Tooltip>
                  <TooltipTrigger>{title}</TooltipTrigger>
                  <TooltipContent align="center" side="top" sideOffset={0} variant="default">
                    {title}
                  </TooltipContent>
                </Tooltip>
              </Typo>
              <Grow className="w-full flex flex-col" placement="ss">
                {plan && plan.length > 0
                  ? plan.map((item, index) => (
                      <Typo key={index} tag={'p'} variant={'body-xs'} className="text-[#414141]">
                        {item}
                      </Typo>
                    ))
                  : null}
              </Grow>
            </Gcol>
          </Gcol>
          {variant === 'normal' ? (
            <Grow className="w-full rounded-[0.8rem] bg-[#F4F4F4] px-[1rem] py-[1rem]" placement="sc">
              <BulletList>
                {list && list.length > 0
                  ? list.map((item, index) => (
                      <BulletListItem key={index} size={'sm'} type={'dotBig'} className="text-[#000]!">
                        {item}
                      </BulletListItem>
                    ))
                  : null}
              </BulletList>
            </Grow>
          ) : null}
          {variant === 'checkbox' ? (
            <Grow
              className="w-full rounded-[0.8rem] bg-[#F4F4F4] px-[1rem] py-[1rem] min-h-[5.4rem] items-start"
              placement="sc"
            >
              <BulletList>
                {list && list.length > 0
                  ? list.map((item, index) => (
                      <BulletListItem key={index} size={'sm'} type={'dotBig'} className="text-[#000]!">
                        {item}
                      </BulletListItem>
                    ))
                  : null}
              </BulletList>
            </Grow>
          ) : null}
        </Gcol>
        <Grow className="w-full h-[3.7rem]" placement="cc">
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
        </Grow>
      </Grid>
    </Grid>
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
    type = '',
    plan = [],
    list = [],
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
            type={item.type}
            plan={item.plan}
            list={item.list}
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
      type={type}
      plan={plan}
      list={list}
      checked={checked}
      onCheckedChange={onCheckedChange}
      onAiReasonClick={onAiReasonClick}
    />
  );
}
