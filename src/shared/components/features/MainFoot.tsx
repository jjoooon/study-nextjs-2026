/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';
import { Gcol, Grow, Grid } from '@atoms';
import { ArrowNext, ResetIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { FormRow, FormTable, FormCell } from '@common/FormTable';

// 화면 하단 기본 액션(초기화/설계시작)
// - 설계시작 버튼은 page2-MainForm 제출을 트리거한다.
export function DesignStart() {
  return (
    <Grow placement={'ec'} className="w-full px-2.5 pt-2 pb-2.5">
      <Button variant={'outlined'} color={'gray'} size={'xl'}>
        <ResetIcon />
        초기화
      </Button>
      <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
        설계시작
        <ArrowNext />
      </Button>
    </Grow>
  );
}

// 설계 생성 단계의 하단 액션 영역
// - 좌측: 비교 버튼
// - 우측: 초기화/설계생성 버튼 그룹
export function DesignGeneration() {
  return (
    <Grow placement={'bwc'} className="w-full px-2.5 pt-2 pb-2.5">
      <Button variant={'outlined'} color={'gray'} size={'xl'}>
        추천내용 비교
      </Button>
      <Grow>
        <Button variant={'outlined'} color={'gray'} size={'xl'}>
          <ResetIcon />
          초기화
        </Button>
        <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
          설계생성
          <ArrowNext />
        </Button>
      </Grow>
    </Grow>
  );
}

// LTPA350 2단계 하단 패널
// - 보험료 요약값 표시
// - 합계보험료 입력 검증
// - 하단 액션 버튼(보험료계산 포함)
export function LTPA350Step2({ onCalcGuidelineClick }: { onCalcGuidelineClick?: () => void }) {
  // 합계보험료 입력값
  const [amount, setAmount] = useState('0');
  // 환급률 입력값
  const [refundRate, setRefundRate] = useState('39.4');
  // 합계보험료 필수값 검증 에러 표시 여부
  const [testError, setTestError] = useState(false);

  return (
    <Gcol className="w-full rounded-tl-[1rem] rounded-tr-[1rem] bg-gray-0 p-0 bg-[var(--color-gray-0)] border border-[var(--color-gray-15)] border-b-0 shadow-[0_-0.1rem_1rem_0_rgba(0,0,0,0.07)] [&>div+div]:bg-[var(--color-gray-5)]">
      <form
        id="page2-MainForm"
        className="w-full"
        onSubmit={(event) => {
          // 데모용 submit 처리: 기본 제출 막고 에러 표시 상태를 토글
          event.preventDefault();
          setTestError(!testError);
        }}
        noValidate
      >
        <Grid className="grid-cols-[1fr_auto] gap-3 px-3 pb-2 pt-2.5 w-full">
          <FormTable
            lineTop={false}
            variant={'none'}
            cols={['w-[9rem]', '', 'w-[8rem]', '', 'w-[8rem]', '']}
            className="w-auto"
          >
            <FormRow>
              <FormCell title="만기금(환급률)">
                <Button variant={'outlined'} color={'gray'} size={'sm'}>
                  예상
                </Button>
                <Input type="tel" commaAmount={true} value="100,000" readOnly={true} after={<span>원</span>} />
                <Input
                  type="text"
                  value={refundRate}
                  onChange={(e) => setRefundRate(e.target.value)}
                  width="6rem"
                  after={<span>%</span>}
                />
              </FormCell>
              <FormCell title="보장보험료">
                <Input
                  type="tel"
                  commaAmount={true}
                  value="100,000"
                  readOnly={true}
                  className="text-right"
                  after={<span>원</span>}
                />
              </FormCell>
              <FormCell title="적립보험료">
                <Input
                  type="tel"
                  commaAmount={true}
                  value="100,000"
                  readOnly={true}
                  className="text-right"
                  after={<span>원</span>}
                />
              </FormCell>
            </FormRow>
          </FormTable>
          <FormTable lineTop={false} className="w-auto" variant={'none'} cols={['w-[7rem]', '']}>
            <FormRow>
              <FormCell title="합계보험료">
                <Input
                  type="tel"
                  commaAmount={true}
                  value={amount}
                  clear={true}
                  width={'lg'}
                  onChange={(e) => {
                    // 값이 비면 에러 표시, 값이 있으면 에러 해제
                    setAmount(e.target.value);
                    setTestError(!e.target.value);
                  }}
                  required={true}
                  error={testError}
                  errorMsg={'계약자 입력은 필수입니다.'}
                  errorPs={'tr'}
                  className="text-right font-bold"
                  after={<span className="font-bold">원</span>}
                />
              </FormCell>
            </FormRow>
          </FormTable>
        </Grid>
        <Grow placement={'bwc'} className="px-3 pt-2 pb-2.5 bg-[var(--color-gray-5)]">
          <Button variant={'outlined'} color={'gray'} size={'xl'}>
            고지유형별보험료비교
          </Button>
          <Grow className="gap-1">
            <Button variant={'outlined'} color={'gray'} size={'xl'}>
              조건별비교설계
            </Button>
            <Button variant={'outlined'} color={'gray'} size={'xl'}>
              다른상품설계
            </Button>
            <Button variant={'outlined'} color={'gray'} size={'xl'}>
              동일상품복사
            </Button>
            <Button
              type="submit"
              form={'page2-MainForm'}
              variant={'contained'}
              color={'primary'}
              size={'xl'}
              onClick={onCalcGuidelineClick}
            >
              보험료계산(지침)
            </Button>
          </Grow>
        </Grow>
      </form>
    </Gcol>
  );
}

// LTPA350 1단계 하단 패널(저장 중심)
export function LTPA350Step1() {
  return (
    <Gcol className="w-full rounded-tl-[1rem] overflow-hidden rounded-tr-[1rem] bg-gray-0 p-0 bg-[var(--color-gray-0)] border border-[var(--color-gray-15)] border-b-0 shadow-[0_-0.1rem_1rem_0_rgba(0,0,0,0.07)] [&>div+div]:bg-[var(--color-gray-5)]">
      <Grow placement={'bwc'} className="px-3 pt-2 pb-2.5 bg-[var(--color-gray-5)]">
        <Button variant={'outlined'} color={'gray'} size={'xl'}>
          동영상매뉴얼
        </Button>
        <Grow gap={1}>
          <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
            저장
          </Button>
        </Grow>
      </Grow>
    </Gcol>
  );
}

// 공통 하단 래퍼
// - variant='box': 박스형(배경/보더/쉐도우)
// - variant='default': 최소 스타일
export function MainBottom({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'box';
}) {
  const classStyle =
    variant === 'box'
      ? 'rounded-tl-[1rem] rounded-tr-[1rem] bg-gray-0 p-0 bg-[var(--color-gray-0)] border border-[var(--color-gray-15)] border-b-0 shadow-[0_-0.1rem_1rem_0_rgba(0,0,0,0.07)] [&>div+div]:bg-[var(--color-gray-5)] [&>div+div]:!rounded-[0]'
      : 'border-0 !shadow-none [&_div]:!px-0 ';
  return (
    <Gcol gap={0} className={cn('w-full', classStyle, className)}>
      {children}
    </Gcol>
  );
}

// 공통 하단 아이템 1줄 레이아웃
// - 좌/우 버튼 그룹 배치에 맞춘 기본 간격/정렬을 제공한다.
export function MainBottomItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Grow
      placement={'bwc'}
      className={cn(
        'px-3 pt-2 pb-2.5 gap-3 rounded-t-[1rem] [&>*]:last:w-full [&>*+*]:last:w-auto [&>*]:last:justify-end ',
        className
      )}
    >
      {children}
    </Grow>
  );
}
