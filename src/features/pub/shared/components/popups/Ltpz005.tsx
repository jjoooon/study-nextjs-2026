'use client';

import '@/shared/lib/agGridPub';
import * as React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@/shared/components/uiux/Dialog';
import { useTabs } from '@/shared/hooks/useTabs';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Divider, Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { AiIcon, CircleCheckIcon, CommonIcon, CumulativeIcon, InfoToastIcon, JobIcon, UwIcon } from '@icons';
import { Button } from '@uiux/Button';

import Ltpz00501 from './Ltpz00501';
import Ltpz00502 from './Ltpz00502';
import Ltpz00503 from './Ltpz00503';
import Ltpz00504 from './Ltpz00504';

type CheckTab = {
  name: string;
  value: string;
  label: string;
  state: 'green' | 'yellow' | 'red';
};

export type Ltpz005TabValue = 'common' | 'accum' | 'job' | 'expected-uw';

type Ltpz005Props = PopupBaseProps & {
  initialActiveTab?: Ltpz005TabValue;
};

const CHECK_TABS: CheckTab[] = [
  { name: '공통', value: 'common', label: '공통', state: 'green' },
  { name: '누적', value: 'accum', label: '누적', state: 'red' },
  { name: '직업', value: 'job', label: '직업', state: 'yellow' },
  { name: '예상 UW', value: 'expected-uw', label: '예상 UW', state: 'yellow' },
];

const Ltpz005 = ({ initialActiveTab = 'common' }: Ltpz005Props) => {
  const { tabs, active, setActive } = useTabs(CHECK_TABS);

  React.useEffect(() => {
    if (!open) return;
    setActive(initialActiveTab);
  }, [initialActiveTab, open, setActive]);

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
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl" className="max-h-[calc(100vh-4rem)] h-full">
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
        <DialogSection className="grid-rows-[auto_minmax(0,1fr)] min-h-0">
          <Gcol className="w-full" gap={4}>
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
            <Grow className="grid w-full grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const isActive = active === tab.value;
                return (
                  <Button
                    key={tab.value}
                    variant="outlined"
                    color="gray-light"
                    className={`w-full! h-[5.2rem]! rounded-[1rem]! px-[1.2rem]! ${
                      isActive
                        ? 'border-[0.2rem] border-[#FF5C2E] shadow-[0_0.2rem_2rem_rgba(255,92,46,0.20)]'
                        : 'shadow-[0_0.2rem_0.4rem_rgba(0,0,0,0.10)]'
                    }`}
                    onClick={() => setActive(tab.value)}
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
            </Grow>
          </Gcol>
          <Gcol className="w-full min-h-0 overflow-y-auto" placement="ss">
            {active === 'common' ? (
              <Ltpz00501 />
            ) : active === 'accum' ? (
              <Ltpz00502 />
            ) : active === 'job' ? (
              <Ltpz00503 />
            ) : (
              <Ltpz00504 />
            )}
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              {active === 'common' ? (
                <>
                  <Button variant={'contained'} size={'xl'}>
                    저장
                  </Button>
                  <DialogClose asChild>
                    <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                      닫기
                    </Button>
                  </DialogClose>
                </>
              ) : active === 'accum' ? (
                <>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    <AiIcon color={'#545454'} color2={'#545454'} />
                    AI인수한도해소
                  </Button>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    타사정액담보해약확인서 등록
                  </Button>
                  <Button variant={'contained'} size={'xl'}>
                    보험료지침(지침)
                  </Button>
                  <DialogClose asChild>
                    <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                      닫기
                    </Button>
                  </DialogClose>
                </>
              ) : active === 'job' ? (
                <>
                  <Button variant={'contained'} size={'xl'}>
                    재조회
                  </Button>
                  <DialogClose asChild>
                    <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                      닫기
                    </Button>
                  </DialogClose>
                </>
              ) : (
                <>
                  <Button variant={'contained'} size={'xl'}>
                    설계생성
                  </Button>
                  <DialogClose asChild>
                    <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                      닫기
                    </Button>
                  </DialogClose>
                </>
              )}
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz005;
