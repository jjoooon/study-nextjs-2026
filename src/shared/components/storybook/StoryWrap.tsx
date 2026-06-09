/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Grow } from '@atoms';
import { LayoutDoc } from '@layout/BaseLayout';
import { cn } from '@/shared/lib/shadcn/utils';

export function StoryWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 w-full h-full items-center justify-center bg-[var(--color-gray-5)] p-6 rounded-[1rem]',
        className
      )}
    >
      {children}
    </div>
  );
}

export function StoryBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Grow
      placement="sc"
      className={cn(
        'gap-3 rounded-[1rem] border border-[var(--color-gray-10)] border-dashed flex-wrap bg-[var(--color-gray-0)] p-6 w-full',
        className
      )}
    >
      {children}
    </Grow>
  );
}

export function StorySite({ children }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="grid grid-rows-[auto_1fr]">
      <div className="w-full">
        <div className="bg-[#312B27] flex justify-between relative h-[48px] w-full">
          <img src="./images/sample/sp_1.png" className="h-full" alt="" />
          <img src="./images/sample/sp_2.png" alt="" className="h-full absolute right-0 top-0 z-[1]" />
        </div>
        <div className="bg-[#100f0e] flex justify-between relative h-[28px] w-full">
          <img src="./images/sample/sp_3.png" className="h-full" alt="" />
          <img src="./images/sample/sp_4.png" className="h-full absolute right-0 top-0 z-[1]" alt="" />
        </div>
      </div>
      <div className="flex justify-between relative w-full" style={{ height: 'calc(100vh - 76px)' }}>
        <div className="w-[55px] overflow-hidden border-r border-[#ececec]">
          <img src="./images/sample/sp_5.png" className="w-[56px]" alt="" />
        </div>
        <div className="grid grid-rows-[1fr_auto] flex-1">
          <div>
            <LayoutDoc className="h-full">{children}</LayoutDoc>
          </div>
        </div>
      </div>
    </div>
  );
}
