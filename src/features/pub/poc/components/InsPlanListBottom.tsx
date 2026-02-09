import { ArrowNext } from '@/shared/components/icons';
import { LayoutControls } from '@/shared/components/layout/Cabinet';

export default function FooterPage1() {
  return (
    <LayoutControls>
      <div className="flex flex-col w-full relative z-10">
        <div className="flex justify-end min-h-[5.8rem] bg-[#312B27] items-stretch">
          <div className="flex justify-between items-center flex-1 px-8"></div>
          <button
            type="button"
            className="flex items-center justify-center text-white max-w-[26rem] shrink-0 w-full h-[5.8rem] fw-bold text-[2rem] font-bold bg-(--color-primary-50) gap-[1rem] tracking-tighter"
          >
            설계시작
            <ArrowNext />
          </button>
        </div>
      </div>
    </LayoutControls>
  );
}
