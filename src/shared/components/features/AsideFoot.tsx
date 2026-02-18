'use client';

import { useState } from 'react';
import { FormRow, FormTable, FormCell, Gcol, Grow, ButtonGroup, Typo } from '@/shared/components/common';
import { Button, Checkbox, Input } from '@/shared/components/uiux';

export default function AsideFoot() {
  const [amount, setAmount] = useState('0');
  const [refundRate, setRefundRate] = useState('39.4');
  const [testError, setTestError] = useState(false);

  return (
    <Gcol className="w-full gap-1 pb-1.5">
      <Grow placement="bwc" className="rounded-[0.8rem] border border-[var(--color-gray-15)] px-[1rem] py-2 shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.01)]">
        <Checkbox variant="button">4세대</Checkbox>
        <Grow className="gap-[0.2rem]">
          <Typo variant="amount-md" color="primary">3,450</Typo>
          <Typo variant="heading-md">원</Typo>
        </Grow>
      </Grow>
      <Gcol className="w-full rounded-[0.8rem] border border-[var(--color-gray-15)] px-[1rem] py-2 shadow-[0_0.1rem_0.2rem_0_rgba(0,0,0,0.01)] gap-1">
        <Grow placement="bwc">
          <Typo variant="heading-md">납입보험료</Typo>
          <Grow className="gap-[0.2rem]">
            <Typo variant="amount-md" color="primary">3,450</Typo>
            <Typo variant="heading-md">원</Typo>
          </Grow>
        </Grow>
        <Grow placement="bwc">
          <Typo variant="heading-xs" color="gray-light">청약포인트</Typo>
          <Grow className="gap-[0.2rem]">
            <Typo variant="amount-xs" color="information">64.00</Typo>
            <Typo variant="heading-xs">P</Typo>
          </Grow>
        </Grow>
      </Gcol>
      <ButtonGroup className="[&>button]:flex-1 [&>button]:w-full" placement="bwc">
        <Button variant="outlined" color="gray" size="lg" disabled>변경조건</Button>
        <Button variant="outlined" color="gray" size="lg">출력</Button>
      </ButtonGroup>
    </Gcol>
  );
}
