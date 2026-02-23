'use client';

import { useState } from 'react';
import { FormRow, FormTable, FormCell, Gcol, Grow } from '@/shared/components/common';
import { Button, Input } from '@/shared/components/uiux';

export default function MainFoot() {
  const [amount, setAmount] = useState('0');
  const [refundRate, setRefundRate] = useState('39.4');
  const [testError, setTestError] = useState(false);

  return (
    <Gcol className="w-full rounded-tl-[1rem] rounded-tr-[1rem] bg-gray-0 p-0 bg-[var(--color-gray-0)] border border-[var(--color-gray-15)] shadow-[0_-0.1rem_1rem_0_rgba(0,0,0,0.07)] [&>div+div]:bg-[var(--color-gray-5)]">
      <Grow placement="bwc" className="px-3 pb-2 pt-2.5">
        <form
          id="page2-MainForm"
          className="w-full"
          onSubmit={(event) => {
            event.preventDefault();
            setTestError(!testError);
          }}
          noValidate
        >
          <FormTable variant="none" cols={['w-[9rem]', '', 'w-[8rem]', '', 'w-[8rem]', '', 'w-[8rem]', '']}>
            <FormRow>
              <FormCell title="만기금(환급률)">
                <Button variant="outlined" color="gray" size="sm">
                  예상
                </Button>
                <Input
                  type="tel"
                  formatType="amount"
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
                  formatType="amount"
                  value="100,000"
                  readOnly={true}
                  className="text-right"
                  after={<span>원</span>}
                />
              </FormCell>
              <FormCell title="적립보험료">
                <Input
                  type="tel"
                  formatType="amount"
                  value="100,000"
                  readOnly={true}
                  className="text-right"
                  after={<span>원</span>}
                />
              </FormCell>
              <FormCell title="합계보험료">
                <Input
                  type="tel"
                  formatType="amount"
                  value={amount}
                  clear={true}
                  width="lg"
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setTestError(!e.target.value);
                  }}
                  required={true}
                  error={testError}
                  errorMsg="계약자 입력은 필수입니다."
                  errorPs="tr"
                  className="text-right font-bold"
                  after={<span className="font-bold">원</span>}
                />
              </FormCell>
            </FormRow>
          </FormTable>
        </form>
      </Grow>
      <Grow placement="bwc" className="px-3 pt-2 pb-2.5">
        <Button variant="outlined" color="gray" size="xl" onClick={() => console.log('고지유형별보험료비교')}>
          고지유형별보험료비교
        </Button>
        <Grow className="gap-1">
          <Button variant="outlined" color="gray" size="xl" onClick={() => console.log('조건별비교설계')}>
            조건별비교설계
          </Button>
          <Button variant="outlined" color="gray" size="xl" onClick={() => console.log('다른상품설계')}>
            다른상품설계
          </Button>
          <Button variant="outlined" color="gray" size="xl" onClick={() => console.log('동일상품복사')}>
            동일상품복사
          </Button>
          <Button
            type="submit"
            form="page2-MainForm"
            variant="contained"
            color="primary"
            size="xl"
            onClick={() => console.log('보험료계산(지침)')}
          >
            보험료계산(지침)
          </Button>
        </Grow>
      </Grow>
    </Gcol>
  );
}
