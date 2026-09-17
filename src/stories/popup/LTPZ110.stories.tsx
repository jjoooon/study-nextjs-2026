/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';
import { Gcol, Typo } from '@atoms';
import { LayoutDoc } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';

export default {
  title: 'app/popup/LTPZ110',
};

export const Default = () => {
  const handleGoToLtpz034 = () => {
    if (typeof window !== 'undefined') {
      try {
        if (window.parent && window.parent !== window) {
          window.parent.location.search = '?path=/story/app-popup-ltpz034--default';
        } else {
          window.location.search = '?path=/story/app-popup-ltpz034--default';
        }
      } catch {
        window.location.search = '?path=/story/app-popup-ltpz034--default';
      }
    }
  };

  return (
    <LayoutDoc>
      <div className="w-full min-h-[40rem] flex flex-col items-center justify-center gap-4 p-8">
        <Gcol placement="cc" className="text-center gap-2">
          <Typo tag="strong" variant="heading-lg">
            LTPZ110 (고지유형 정보변경)
          </Typo>
          <Typo variant="body-md" className="text-[var(--color-gray-60)]">
            LTPZ110은 LTPZ034 팝업 내부의 [정보 변경] 버튼 클릭 시 작동하는 팝오버입니다.
          </Typo>
        </Gcol>

        <a
          href="?path=/story/app-popup-ltpz034--default"
          target="_parent"
          onClick={(e) => {
            e.preventDefault();
            handleGoToLtpz034();
          }}
          className="inline-block"
        >
          <Button variant="contained" size="xl" color="primary">
            LTPZ034 스토리 페이지로 이동
          </Button>
        </a>
      </div>
    </LayoutDoc>
  );
};



