'use client';

import { useEffect } from 'react';
import { Grow, Gcol } from '@atoms';
import { KeyValueList } from '@common/KeyValueList';
import { ArrowNext } from '@icons';
import { LayoutControls } from '@layout/Cabinet';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { popup } from '@/shared/utils/popup/popupApi';
import { registerDialog } from '@/shared/utils/popup/popupRegistry';

const KeyValueData = [
  { key: '만기금(환급률)', value: '47,908원' },
  { key: '보장보험료', value: '47,908원' },
  { key: '적립보험료', value: '47,908원' },
  { key: '합계보험료', value: '47,908원' },
];

export default function InsPlanCovBottom() {
  // 컴포넌트 마운트 시 팝업 등록
  useEffect(() => {
    registerDialog('underwriting', () => import('@/shared/components/popups/UnderwritingDialog'));
  }, []);

  /**
   * 보험료계산(지침) 팝업 열기 핸들러
   */
  const handleOpenUnderwritingDialog = async () => {
    try {
      await popup.open('underwriting', {
        title: '보험료계산(지침)',
      });
    } catch (error) {
      console.error('팝업 오류:', error);
    }
  };

  return (
    <LayoutControls>
      <Gcol className="w-full relative z-10">
        <Grow placement="bwc" className="flex-1 bg-[#F6F0ED] min-h-[7.8rem]">
          <Grow className="flex justify-between items-center flex-1 px-8" placement="bws">
            <KeyValueList data={KeyValueData} className="flex-1" />
            <Grow placement="sc" className="shrink-0 gap-2">
              <div className="text-[1.4rem] font-bold">
                청약 <b className="text-[1.8rem] font-bold">(-100.45)</b>
              </div>
              <div>|</div>
              <div>
                <Checkbox size="md">청약 지원</Checkbox>
              </div>
            </Grow>
          </Grow>
          <Grow placement="ec" className="shrink-0 text-right gap-4 text-[1.6rem] font-bold text-[#000000B3]">
            <div>납입 보험료</div>
            <Grow className="gap-[.2rem]">
              <strong className="text-[#FF5C2E] text-[3rem] font-bold translate-y-[-.2rem]">200,000</strong>
              <span>원</span>
            </Grow>
          </Grow>
        </Grow>
        <Grow placement="bwc" className="min-h-[5.8rem] bg-[#312B27]">
          <Grow className="flex justify-between items-center flex-1 px-8" placement="bwc">
            <Grow className="gap-1">
              <Button variant="outlined" color="gray" size="lg">
                고지유형별보험료비교
              </Button>
              <Button variant="outlined" color="gray" size="lg">
                조건별 비교 설계
              </Button>
            </Grow>
            <Grow className="gap-1">
              <Button variant="outlined" color="gray" size="lg">
                출력 +
              </Button>
              <Button variant="outlined" color="gray" size="lg">
                설계복사
              </Button>
              <Button variant="outlined" color="gray" size="lg" onClick={handleOpenUnderwritingDialog}>
                보험료계산(지침)
              </Button>
            </Grow>
          </Grow>
          <button
            type="submit"
            form="page2-MainForm"
            className="flex items-center justify-center text-white max-w-[26rem] shrink-0 w-full h-[5.8rem] fw-bold text-[2rem] font-bold bg-[var(--color-primary-50)] gap-[1rem] tracking-tighter"
          >
            청약
            <ArrowNext />
          </button>
        </Grow>
      </Gcol>
    </LayoutControls>
  );
}
