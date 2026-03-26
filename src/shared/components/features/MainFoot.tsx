'use client';

import { useState } from 'react';
import { Gcol, Grow, Grid } from '@atoms';
import { FormRow, FormTable, FormCell } from '@common/FormTable';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { ArrowNext, ResetIcon } from '@icons';


export function DesignStart() {
  return (
    <Grow placement={'ec'} className="w-full px-2.5 pt-2 pb-2.5 min-w-[93.2rem]">
      <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => console.log('초기화')}>
        <ResetIcon />
        초기화
      </Button>
      <Button
        type="submit"
        form={'page2-MainForm'}
        variant={'contained'}
        color={'primary'}
        size={'xl'}
        onClick={() => console.log('저장')}
      >
        설계시작
        <ArrowNext />
      </Button>
    </Grow>
  );
}
export function DesignGeneration() {
  return (
    <Grow placement={'bwc'} className="w-full px-2.5 pt-2 pb-2.5 min-w-[93.2rem]">
      <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => console.log('추천내용 비교')}>
        추천내용 비교
      </Button>
      <Grow>
        <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => console.log('초기화')}>
          <ResetIcon />
          초기화
        </Button>
         <Button
          type="submit"
          form={'page2-MainForm'}
          variant={'contained'}
          color={'primary'}
          size={'xl'}
          onClick={() => console.log('설계생성')}
        >
          설계생성
          <ArrowNext />
        </Button>
      </Grow>
     
    </Grow>
  );
}

export function LTPA350Step2({ onCalcGuidelineClick }: { onCalcGuidelineClick?: () => void }) {
  const [amount, setAmount] = useState('0');
  const [refundRate, setRefundRate] = useState('39.4');
  const [testError, setTestError] = useState(false);

  return (
    <Gcol className="w-full rounded-tl-[1rem] rounded-tr-[1rem] bg-gray-0 p-0 bg-[var(--color-gray-0)] border border-[var(--color-gray-15)] border-b-0 shadow-[0_-0.1rem_1rem_0_rgba(0,0,0,0.07)] [&>div+div]:bg-[var(--color-gray-5)] min-w-[93.2rem]">
      <form
        id="page2-MainForm"
        className="w-full"
        onSubmit={(event) => {
          event.preventDefault();
          setTestError(!testError);
        }}
        noValidate
      >
        <Grid className="grid-cols-[1fr_auto] gap-3 px-3 pb-2 pt-2.5 w-full">
          <FormTable lineTop={false} variant={'none'} cols={['w-[9rem]', '', 'w-[8rem]', '', 'w-[8rem]', '']} className="w-auto" >
            <FormRow>
              <FormCell title="만기금(환급률)">
                <Button variant={'outlined'} color={'gray'} size={'sm'}>
                  예상
                </Button>
                <Input
                  type="tel"
                  commaAmount={true}
                  value="100,000"
                  readOnly={true}
                  className="text-right"
                  after={<span>원</span>}
                />
                <Input
                  type="text"
                  value={refundRate}
                  onChange={(e) => setRefundRate(e.target.value)}
                  width="6rem"
                  className="text-right"
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
          <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => console.log('고지유형별보험료비교')}>
            고지유형별보험료비교
          </Button>
          <Grow className="gap-1">
            <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => console.log('조건별비교설계')}>
              조건별비교설계
            </Button>
            <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => console.log('다른상품설계')}>
              다른상품설계
            </Button>
            <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => console.log('동일상품복사')}>
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

export function LTPA350Step1() {
  return (
    <Gcol className="w-full rounded-tl-[1rem] overflow-hidden rounded-tr-[1rem] bg-gray-0 p-0 bg-[var(--color-gray-0)] border border-[var(--color-gray-15)] border-b-0 shadow-[0_-0.1rem_1rem_0_rgba(0,0,0,0.07)] [&>div+div]:bg-[var(--color-gray-5)] min-w-[93.2rem]">
      <Grow placement={'bwc'} className="px-3 pt-2 pb-2.5 bg-[var(--color-gray-5)]">
        <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => console.log('동영상매뉴얼')}>
          동영상매뉴얼
        </Button>
        <Grow gap={1}>
          <Button
            type="submit"
            form={'page2-MainForm'}
            variant={'contained'}
            color={'primary'}
            size={'xl'}
            onClick={() => console.log('저장')}
          >
            저장
          </Button>
        </Grow>
      </Grow>
    </Gcol>
  );
}

export function MainBottom({ children }: { children: React.ReactNode }) {
  return (
    <Gcol gap={0} className="w-full rounded-tl-[1rem] rounded-tr-[1rem] bg-gray-0 p-0 bg-[var(--color-gray-0)] border border-[var(--color-gray-15)] border-b-0 shadow-[0_-0.1rem_1rem_0_rgba(0,0,0,0.07)] [&>div+div]:bg-[var(--color-gray-5)] min-w-[93.2rem]">
      {children}
    </Gcol>
  );
}

export function MainBottomItem({ children }: { children: React.ReactNode }) {
  return (
    <Grow placement={'bwc'} className="px-3 pt-2 pb-2.5 gap-3">
      {children}
    </Grow>
  );
}