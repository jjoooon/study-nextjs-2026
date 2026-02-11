import { Grow } from '@/shared/components/common';
import { ArrowNext } from '@/shared/components/icons';
import { LayoutControls } from '@/shared/components/layout/Cabinet';

export default function InsPlanBasicBottom() {
  return (
    <LayoutControls>
      <div className="flex flex-col w-full relative z-10">
        <div className="flex justify-between items-center flex-1 bg-[#F6F0ED] min-h-[7.8rem] px-8">
          <div className="flex-1 text-right justify-end flex items-center gap-4 text-[1.6rem] font-bold text-[#000000B3]">
            <div>납입 보험료</div>
            <Grow className="gap-[.2rem]">
              <strong className="text-[#FF5C2E] text-[3rem] font-bold translate-y-[-.2rem]">200,000</strong>
              <span>원</span>
            </Grow>
          </div>
        </div>
        <div className="flex justify-end min-h-[5.8rem] bg-[#312B27] items-stretch">
          <div className="flex justify-between items-center flex-1 px-8"></div>
          <button
            type="submit"
            form="page2-MainForm"
            className="flex items-center justify-center text-white max-w-[26rem] shrink-0 w-full h-[5.8rem] fw-bold text-[2rem] font-bold bg-(--color-primary-50) gap-[1rem] tracking-tighter"
          >
            다음
            <ArrowNext />
          </button>
        </div>
      </div>
    </LayoutControls>
  );
}
