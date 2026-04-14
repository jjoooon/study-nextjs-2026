'use client';

import { useId, useState, type ReactNode } from 'react';

import { cn } from '@/shared/lib/shadcn/utils';
import { Badge } from '@uiux/Badge';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

type QuestionRadioCardProps = {
  badgeLabel: string;
  question: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  radioClassName?: string;
  isRadio?: boolean;
  isValue?: string;
  onValueChange?: (value: string) => void;
  radioErrorMsg?: string;
  radioErrorPs?: 'bl' | 'br' | 'tl' | 'tr';
};

export const QuestionRadioCard = ({
  badgeLabel,
  question,
  children,
  className,
  contentClassName,
  radioClassName,
  isRadio = true,
  isValue,
  onValueChange,
  radioErrorMsg = '하나를 선택해주세요.',
  radioErrorPs = 'bl',
}: QuestionRadioCardProps) => {
  const radioId = useId();
  const [internalValue, setInternalValue] = useState<string | undefined>(isValue);
  const radioValue = onValueChange ? isValue : internalValue;

  const handleRadioChange = (nextValue: string) => {
    if (onValueChange) {
      onValueChange(nextValue);
      return;
    }

    setInternalValue(nextValue);
  };

  return (
    <Gcol
      className={cn(
        'w-full overflow-hidden rounded-[1.2rem] border border-solid border-[#D8D8D8]',
        className
      )}
      placement="ss"
    >
      <Grow className="w-full bg-[#F4F4F4] p-[1rem]" placement="bwc"gap="[1rem]">
        <Typo tag={'h3'} variant={'body-lg'} className="flex items-baseline gap-[0.6rem]" weight={'bold'}>
          <Badge color="secondary" variant="contained" className="h-[1.8rem] w-[1.8rem]">
            {badgeLabel}
          </Badge>
          {question}
        </Typo>
        {isRadio ? (
          <RadioGroup
            className={cn('gap-[1.2rem] w-[11rem]', radioClassName)}
            errorMsg={radioErrorMsg}
            errorPs={radioErrorPs}
            onValueChange={handleRadioChange}
            value={radioValue}
            width="auto"
          >
            <RadioGroupItem color="primary" id={`${radioId}-yes`} size="lg" value="Y" variant="default">
              예
            </RadioGroupItem>
            <RadioGroupItem color="primary" id={`${radioId}-no`} size="lg" value="N" variant="default">
              아니요
            </RadioGroupItem>
          </RadioGroup>
        ) : null}
      </Grow>
      <Grid className={cn('w-full p-[1rem]', contentClassName)}>{children}</Grid>
    </Gcol>
  );
};
