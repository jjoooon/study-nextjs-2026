'use client';

import { Gcol } from '@/shared/components/common';
import { useState } from 'react';

export default function PageProcess() {
  return(
    <Gcol placement="bws">
      <ol className="">
        <li>
          <b>1</b>
          <span>계약사항</span>
        </li>
        <li>
          <b>2</b>
          <span>담보설계</span>
        </li>
        <li>
          <b>3</b>
          <span>알릴사항</span>
        </li>
        <li>
          <b>4</b>
          <span>심사요청</span>
        </li>
        <li>
          <b>5</b>
          <span>추가사항</span>
        </li>
        <li>
          <b>6</b>
          <span>수납</span>
        </li>
      </ol>
    </Gcol>
  )
}