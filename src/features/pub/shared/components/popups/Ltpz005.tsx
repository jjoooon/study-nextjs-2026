'use client';

import '@/shared/lib/agGridPub';
import { Divider, Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { AiIcon, CircleCheckIcon, InfoToastIcon } from '@icons';
import { Button } from '@uiux/Button';
import * as React from 'react';

import Ltpz00501 from './Ltpz00501';
import Ltpz00502 from './Ltpz00502';
import Ltpz00503 from './Ltpz00503';
import Ltpz00504 from './Ltpz00504';
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
import { Input } from '@/shared/components/uiux/Input';
import { useTabs } from '@/shared/hooks/useTabs';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

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
  { name: '공통', value: 'common', label: '공통', state: 'yellow' },
  { name: '누적', value: 'accum', label: '누적', state: 'red' },
  { name: '직업', value: 'job', label: '직업', state: 'green' },
  { name: '예상 UW', value: 'expected-uw', label: '예상UW', state: 'green' },
];

const Ltpz005 = ({ initialActiveTab = 'common' }: Ltpz005Props) => {
  const { tabs, active, setActive } = useTabs(CHECK_TABS);

  React.useEffect(() => {
    setActive(initialActiveTab);
  }, [initialActiveTab, setActive]);

  const getStateIcon = (state: CheckTab['state']) => {
    if (state === 'green') return <CircleCheckIcon size={26} />;
    if (state === 'red') return <InfoToastIcon size={26} color={'#E43939'} />;
    return <InfoToastIcon size={26} color={'#FFB800'} />;
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
        <DialogSection className="grid grid-rows-[auto_1fr] overflow-hidden">
          <Gcol className="w-full" gap={4}>
            <Grow variant={'box-info-line'} className="w-full" placement="bwc">
              <Gcol placement="ss">
                <Grow>
                  <Typo tag="strong" variant={'body-lg'}>
                    한화 시그니처 여성간편건강보험4.0 2604
                  </Typo>
                  <Divider variant={'dot'} className="w-[0.3rem] h-[0.3rem] bg-[#6B7280] rounded-full" />
                  <Typo tag="span" variant={'body-lg'} color={'gray'}>
                    납입면제 미운영형, 납입 후 50%해약환급금지급형, 3N5간편고지형
                  </Typo>
                </Grow>
                <Grow>
                  <Divider variant={'dot'} className="w-[0.3rem] h-[0.3rem] bg-[#6B7280] rounded-full" />
                  <Typo tag="span" variant={'body-lg'} color={'gray'}>
                    9형(3.10.5간편고지형(고혈압및당뇨추가고지))(올케어플랜)(6~9형)(15-80세)
                  </Typo>
                  <Divider variant={'dot'} className="w-[0.3rem] h-[0.3rem] bg-[#6B7280] rounded-full" />
                  <Typo tag="span" variant={'body-lg'} color={'gray'}>
                    고지유형
                  </Typo>
                </Grow>
              </Gcol>
              <Grow>
                <Typo tag="strong" className="w-[6rem]" variant={'body-lg'} color={'blueGray'}>
                  설계번호
                </Typo>
                <Input aria-label="" width={'15rem'} value={'LA260209313558'} />
                -
                <Input aria-label="" width={'3rem'} value={'1'} />
              </Grow>
            </Grow>
          </Gcol>

          <Grid className="w-full grid-cols-[auto_1fr] h-full" gap={0}>
            <Gcol className="w-[6.4rem] place-self-start" gap={0}>
              {tabs.map((tab) => {
                const isActive = active === tab.value;
                return (
                  <Button
                    key={tab.value}
                    variant="outlined"
                    color="gray-light"
                    className={`w-full! -mr-[0.06rem] z-[99] h-[10.8rem]! rounded-[1rem] rounded-tr-[0] rounded-br-[0] border-r border-r-[transparent] ${
                      isActive
                        ? 'w-full! shadow-[inset_0.8rem_0_0_0_#FF5C2E,0_0.2rem_0_0_#00000010] border-l-0 pl-[1rem] pl-[1.6rem]'
                        : 'w-[5.4rem]! h-[10.8rem] ml-[1rem]! bg-[#F4F4F4] '
                    }`}
                    onClick={() => setActive(tab.value)}
                  >
                    <Gcol>
                      {getStateIcon(tab.state)}
                      <Typo tag="strong" variant={'body-lg'} weight="bold" className="text-gray-500">
                        {tab.label}
                      </Typo>
                    </Gcol>
                  </Button>
                );
              })}
            </Gcol>
            <div className="relative [&>div]:absolute [&>div]:p-3 [&>div]:top-0 [&>div]:left-0 w-full h-full overflow-x-hidden overflow-y-auto rounded-tr-[1rem] rounded-br-[1rem] rounded-bl-[1rem] border-[0.1rem]! border-solid border-[#ccc]">
              {active === 'common' ? (
                <Ltpz00501 />
              ) : active === 'accum' ? (
                <Ltpz00502 />
              ) : active === 'job' ? (
                <Ltpz00503 />
              ) : (
                <Ltpz00504 />
              )}
            </div>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              {active === 'common' ? (
                <>
                  <Button variant={'contained'} color={'gray'} size={'xl'}>
                    재조회
                  </Button>
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
