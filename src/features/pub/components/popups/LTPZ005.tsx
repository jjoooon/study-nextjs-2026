'use client';
// 권오택
import { Divider, Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { CommonIcon, CircleCheckIcon, JobIcon, CumulativeIcon, UwIcon, InfoToastIcon } from '@icons';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';
import * as React from 'react';
import type { PopupBaseProps } from './types';
import { useTabs } from '@/shared/hooks/useTabs';

type CheckTab = {
  name: string;
  value: string;
  label: string;
  state: 'green' | 'yellow' | 'red';
};

const CHECK_TABS: CheckTab[] = [
  { name: '공통', value: 'common', label: '공통', state: 'green' },
  { name: '누적', value: 'accum', label: '누적', state: 'red' },
  { name: '직업', value: 'job', label: '직업', state: 'yellow' },
  { name: '예상 UW', value: 'expected-uw', label: '예상 UW', state: 'yellow' },
];

type TabContent = {
  notices: string[];
  guidelines: string[];
};

const TAB_CONTENTS: Record<CheckTab['value'], TabContent> = {
  common: {
    notices: ['공통 확인사항 1', '공통 확인사항 2', '공통 확인사항 3'],
    guidelines: ['공통 필수지침 1', '공통 필수지침 2', '공통 필수지침 3'],
  },
  accum: {
    notices: ['누적 확인사항 1', '누적 확인사항 2', '누적 확인사항 3'],
    guidelines: ['누적 필수지침 1', '누적 필수지침 2', '누적 필수지침 3'],
  },
  job: {
    notices: ['직업 확인사항 1', '직업 확인사항 2', '직업 확인사항 3'],
    guidelines: ['직업 필수지침 1', '직업 필수지침 2', '직업 필수지침 3'],
  },
  'expected-uw': {
    notices: ['예상 UW 확인사항 1', '예상 UW 확인사항 2', '예상 UW 확인사항 3'],
    guidelines: ['예상 UW 필수지침 1', '예상 UW 필수지침 2', '예상 UW 필수지침 3'],
  },
};

export const LTPZ005 = ({ open, onOpenChange }: PopupBaseProps) => {
  const { tabs, active, setActive } = useTabs(CHECK_TABS);
  const activeContent = TAB_CONTENTS[active as CheckTab['value']] || TAB_CONTENTS.common;

  const getTabIcon = (value: CheckTab['value']) => {
    if (value === 'common') return <CommonIcon />;
    if (value === 'accum') return <CumulativeIcon />;
    if (value === 'job') return <JobIcon />;
    return <UwIcon />;
  };

  const getStateIcon = (state: CheckTab['state']) => {
    if (state === 'green') return <CircleCheckIcon size={20} />;
    if (state === 'red') return <InfoToastIcon size={20} color={'#E43939'} />;
    return <InfoToastIcon size={20} color={'#FFB800'} />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              꼭 확인해야 할 일
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTRZ005)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="w-full h-full" gap={4}>
            <Grow variant={'box-info-line'} className="w-full" placement="se">
              <Typo tag="strong" variant={'body-lg'}>
                한화시그니처여성 건강 보험 3.0 무배당
              </Typo>
              <Divider variant={'dot'} />
              <Typo tag="span" variant={'body-lg'}>
                납입면제 강화형
              </Typo>
              <Divider variant={'dot'} />
              <Typo tag="span" variant={'body-lg'}>
                기본형
              </Typo>
            </Grow>

            {/* 디자인 */}
            <div className="grid w-full grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const isActive = active === tab.value;
                return (
                  <Button
                    key={tab.value}
                    variant="outlined"
                    color="gray-light"
                    className="w-full! h-[5.2rem]! rounded-[1rem]! px-[1.2rem]!"
                    onClick={() => setActive(tab.value)}
                    style={isActive ? { border: '2px solid var(--color-border-primary, #FF5C2E)' } : { boxShadow: '' }}
                  >
                    <Grow placement="bwc" className="w-full">
                      <Grow>
                        {getTabIcon(tab.value)}
                        <Typo tag="strong" variant={'body-lg'} weight="bold" className="text-gray-500">
                          {tab.label}
                        </Typo>
                      </Grow>
                      {getStateIcon(tab.state)}
                    </Grow>
                  </Button>
                );
              })}
            </div>

            <Gcol className="w-full" gap={4}>
              <Gcol className="w-full" gap={2}>
                <Typo tag={'strong'} variant={'heading-md'}>
                  확인사항
                </Typo>
                <Gcol className="w-full gap-2">
                  {activeContent.notices.map((notice) => (
                    <Grow key={notice} className="p-3 bg-[#FFF4F0] rounded-[0.6rem] border border-[#FFE0D6]">
                      <Typo variant={'body-md'}>{notice}</Typo>
                    </Grow>
                  ))}
                </Gcol>
              </Gcol>

              <Gcol className="w-full" gap={2}>
                <Typo tag={'strong'} variant={'heading-md'}>
                  필수지침
                </Typo>
                <Gcol className="w-full gap-2">
                  {activeContent.guidelines.map((guideline) => (
                    <Grow key={guideline} className="p-3 bg-[#FFF9F0] rounded-[0.6rem] border border-[#FFE8D6]">
                      <Typo variant={'body-md'}>{guideline}</Typo>
                    </Grow>
                  ))}
                </Gcol>
              </Gcol>
            </Gcol>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                버튼
              </Button>
              <Button variant={'contained'} size={'xl'}>
                저장
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
