/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Divider, Gcol, Grid, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { CircleCheckIcon, InfoToastIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';
import { Input } from '@uiux/Input';

import Ltpz00501 from './Ltpz00501';
import Ltpz00502 from './Ltpz00502';
import Ltpz00503 from './Ltpz00503';
import Ltpz00504 from './Ltpz00504';

/** 체크 항목별 탭 정보 타입 */

type CheckTab = {
  name: string;
  value: string;
  label: string;
  state: 'green' | 'yellow' | 'red';
};

/** 탭 값 리터럴 타입 */
export type Ltpz005TabValue = 'common' | 'accum' | 'job' | 'expected-uw';

/** 팝업 컴포넌트 Props */
type Ltpz005Props = PopupBaseProps & {
  initialActiveTab?: Ltpz005TabValue;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/** 탭 메뉴 구성 데이터: 상태(state)에 따라 아이콘 색상이 결정됨 */
const CHECK_TABS: CheckTab[] = [
  { name: '공통', value: 'common', label: '공통', state: 'yellow' },
  { name: '누적', value: 'accum', label: '누적', state: 'red' },
  { name: '직업', value: 'job', label: '직업', state: 'green' },
  { name: '예상 UW', value: 'expected-uw', label: '예상UW', state: 'green' },
];

/** Ltpz005: 설계 과정에서 필수 체크 항목(공통, 누적, 직업 등)을 안내하는 '꼭 해야할 일' 팝업 */
const Ltpz005 = ({ open = false, onOpenChange, initialActiveTab = 'common' }: Ltpz005Props) => {
  const { tabs, active, setActive } = useTabs(CHECK_TABS);

  /** 초기 활성 탭 설정 */
  React.useEffect(() => {
    setActive(initialActiveTab);
  }, [initialActiveTab, setActive]);

  const getStateIcon = (state: CheckTab['state']) => {
    if (state === 'green') return <CircleCheckIcon size={26} />;
    if (state === 'red') return <InfoToastIcon size={26} color={'#E43939'} />;
    return <InfoToastIcon size={26} color={'#FFB800'} />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl" className="h-full max-h-[97rem]!">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              꼭 해야할 일
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ005)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid grid-rows-[auto_1fr] overflow-hidden">
          <Gcol className="w-full" gap={4}>
            {/* 상단: 선택된 설계 상품 정보 요약 */}
            <Grow variant={'box-info-line'} className="w-full" placement="bwc">
              <Gcol placement="ss">
                <Grow>
                  <Typo tag="strong" variant={'body-lg'}>
                    한화 더 경증 간편건강보험Ⅱ(세만기형) 2604
                  </Typo>
                  <Divider variant={'dot'} className="w-[0.3rem] h-[0.3rem] bg-[#6B7280] rounded-full" />
                  <Typo tag="span" variant={'body-lg'} color={'gray'}>
                    납입 후 50%해약환급금지급형
                  </Typo>
                  <Divider variant={'dot'} className="w-[0.3rem] h-[0.3rem] bg-[#6B7280] rounded-full" />
                  <Typo tag="span" variant={'body-lg'} color={'gray'}>
                    간편고지형
                  </Typo>
                </Grow>
                <Grow>
                  <Typo tag="span" variant={'body-lg'} color={'gray'}>
                    9형(365간편고지형)(올인원플랜)(5~12형)(15-80세)
                  </Typo>
                </Grow>
              </Gcol>
              <Grow>
                <Typo tag="strong" className="w-[6rem]" variant={'body-lg'} color={'blueGray'}>
                  설계번호
                </Typo>
                <Input width={'quoteNo'} value={'LA123456789012'} readOnly />
                -
                <Input width={26} value={'1'} readOnly />
              </Grow>
            </Grow>
          </Gcol>

          <Grid className="w-full grid-cols-[auto_1fr] h-full" gap={0}>
            {/* 왼쪽: 세로형 탭 메뉴 영역 */}
            <Grid
              className="w-[6.4rem] grid-rows-[1fr_1fr_1fr_1fr] pb-[0.8rem] h-full max-h-[44rem] mr-[-0.1rem] place-self-start"
              gap={0}
            >
              {tabs.map((tab, index) => {
                const isActive = active === tab.value;
                return (
                  <div key={tab.value} className={`${index > 0 ? 'mt-[-0.1rem]' : ''}`}>
                    <Button
                      variant="outlined"
                      color="gray-light"
                      className={`w-full h-full p-0 -mr-[0.06rem] z-[99] rounded-[1rem] rounded-tr-[0] rounded-br-[0] border-r border-r-[transparent] ${
                        isActive
                          ? 'w-full! shadow-[inset_0.8rem_0_0_0_#FF5C2E,0_0.2rem_0_0_#00000010] border-l-0 pl-[1rem] pl-[1.6rem]'
                          : 'w-[5.4rem]! ml-[1rem]! bg-[#F4F4F4] '
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
                  </div>
                );
              })}
            </Grid>

            {/* 오른쪽: 탭별 상세 내용 (탭 값에 따라 해당 컴포넌트 렌더링) */}
            {active === 'common' ? (
              <Ltpz00501 onClose={() => onOpenChange?.(false)} />
            ) : active === 'accum' ? (
              <Ltpz00502 onClose={() => onOpenChange?.(false)} />
            ) : active === 'job' ? (
              <Ltpz00503 onClose={() => onOpenChange?.(false)} />
            ) : (
              <Ltpz00504 onClose={() => onOpenChange?.(false)} />
            )}
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz005;
