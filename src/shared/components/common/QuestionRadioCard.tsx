'use client';

import { useId, useState, type ReactNode } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { Badge } from '@uiux/Badge';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';


export const QuestionRadioCardHeader = ({ bg, children, className }: { bg?: string; children: ReactNode; className?: string }) => {
  return (
    <Grow
      className={cn('w-full p-[1rem] aa', !bg ? 'bg-[#F4F4F4]' : undefined, className)}
      style={bg ? { background: bg } : undefined}
      placement="bwc"
      gap="[1rem]"
    >
      {children}
    </Grow>
  );
}

export const QuestionRadioCardHeaderTitle = ({ 
  badgeLabel,
  icon,
  children,
  className,
}: { badgeLabel?: string; icon?: ReactNode; children: ReactNode; className?: string }) => {
  return (
  <Typo tag={'h3'} variant={'body-lg'} className={cn('flex items-baseline gap-[0.6rem]', className)} weight={'bold'}>
    {icon
      ? <span className="h-[1.8rem] w-[1.8rem] flex items-center justify-center">{icon}</span>
      : badgeLabel
        ? <Badge color="secondary" variant="contained" className="h-[1.8rem] w-[1.8rem]">{badgeLabel}</Badge>
        : null}
    {children}
  </Typo>
  );
}

export const QuestionRadioCardContents = ({ children, className }: { bg?: string; children: ReactNode; className?: string  }) => {
  return (
    <Grid className={cn('w-full p-2.5 gap-2', className)}>{children}</Grid>
  );
}
  

type QuestionRadioCardProps = {
  badgeLabel?: string;
  question?: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  radioClassName?: string;
  isRadio?: boolean;
  icon?: ReactNode;
  isValue?: string;
  onValueChange?: (value: string) => void;
  radioErrorMsg?: string;
  radioErrorPs?: 'bl' | 'br' | 'tl' | 'tr';
  disabled?: boolean;
  bg?: string;
};

export const QuestionRadioCard = ({
  badgeLabel,
  question,
  children,
  className,
  contentClassName,
  radioClassName,
  isRadio = true,
  icon,
  isValue,
  onValueChange,
  radioErrorMsg = '하나를 선택해주세요.',
  radioErrorPs = 'bl',
  disabled = false,
  bg,
}: QuestionRadioCardProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(isValue);


  return (
    <Gcol
      className={cn('w-full overflow-hidden rounded-[1.2rem] gap-0 border border-solid border-[#D8D8D8] p-0', className)}
      placement="ss"
    >
      {children}
    </Gcol>
  );
};
