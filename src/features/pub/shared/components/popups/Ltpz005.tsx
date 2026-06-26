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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
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
};

/** 탭 메뉴 구성 데이터: 상태(state)에 따라 아이콘 색상이 결정됨 */
const CHECK_TABS: CheckTab[] = [
  { name: '공통', value: 'common', label: '공통', state: 'yellow' },
  { name: '누적', value: 'accum', label: '누적', state: 'red' },
  { name: '직업', value: 'job', label: '직업', state: 'green' },
  { name: '예상 UW', value: 'expected-uw', label: '예상UW', state: 'green' },
];

/** Ltpz005: 설계 과정에서 필수 체크 항목(공통, 누적, 직업 등)을 안내하는 '꼭 해야할 일' 팝업 */
const Ltpz005 = ({ initialActiveTab = 'common' }: Ltpz005Props) => {
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
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl" className="max-h-[calc(100vh-4rem)] h-full">
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
                    한화 시그니처 여성간편건강보험4.0 2604
                  </Typo>
                  <Divider variant={'dot'} className="w-[0.3rem] h-[0.3rem] bg-[#6B7280] rounded-full" />
                  <Typo tag="span" variant={'body-lg'} color={'gray'}>
                    납입면제 미운영형
                  </Typo>
                  <Divider variant={'dot'} className="w-[0.3rem] h-[0.3rem] bg-[#6B7280] rounded-full" />
                  <Typo tag="span" variant={'body-lg'} color={'gray'}>
                    납입 후 50%해약환급금지급형
                  </Typo>
                  <Divider variant={'dot'} className="w-[0.3rem] h-[0.3rem] bg-[#6B7280] rounded-full" />
                  <Typo tag="span" variant={'body-lg'} color={'gray'}>
                    3N5간편고지형
                  </Typo>
                </Grow>
                <Grow>
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
                <Input width={'quoteNo'} value={'LA123456789012'} readOnly />
                -
                <Input width={26} value={'1'} readOnly />
              </Grow>
            </Grow>
          </Gcol>

          <Grid className="w-full grid-cols-[auto_1fr] h-full" gap={0}>
            {/* 왼쪽: 세로형 탭 메뉴 영역 */}
            <Grid
              className="-ml-[1rem] w-[6.4rem] grid-rows-[1fr_1fr_1fr_1fr] pb-[0.8rem] h-full max-h-[44rem] mr-[-0.1rem] place-self-start"
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
            <div
              className="relative [&>div]:absolute [&>div]:p-3 [&>div]:top-0 [&>div]:left-0 w-[calc[+
            100%+1rem]] h-full rounded-tr-[1rem] overflow-hidden rounded-br-[1rem] rounded-bl-[1rem] border-[0.1rem]! border-solid border-[#ccc]"
            >
              <div className="overflow-x-hidden overflow-y-auto w-full h-full">
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
            </div>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              {/* 하단 버튼: 현재 활성화된 탭에 따라 서로 다른 버튼 구성 노출 */}
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
                    타사정액담보해약확인서 등록
                  </Button>
                  <Button variant={'contained'} size={'xl'}>
                    보험료계산(지침)
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
                    설계생성(1)
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
