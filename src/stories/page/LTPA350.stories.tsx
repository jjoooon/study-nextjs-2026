/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */import LTPA350 from '@/app/pub/ispl/pages/LTPA350';
import { LayoutDoc } from '@layout/BaseLayout';

export default {
  title: 'app/ispl/LTPA350',
  component: LTPA350,
};


export const Default = () => (
  // <div className="grid grid-rows-[auto_1fr]">
  //   <div className="w-full">
  //     <div className="bg-[#312B27] flex justify-between relative h-12 w-full">
  //       <img src="./images/sample/sp_1.png" className="h-full" alt="" />
  //       <img src="./images/sample/sp_2.png" alt="" className="h-full absolute right-0 top-0 z-[1]" />
  //     </div>
  //     <div className="bg-[#100f0e] flex justify-between relative h-7 w-full">
  //       <img src="./images/sample/sp_3.png" className="h-full" alt="" />
  //       <img src="./images/sample/sp_4.png" className="h-full absolute right-0 top-0 z-[1]" alt="" />
  //     </div>
  //   </div>
  //   <div className="flex justify-between relative w-full" style={{ height: 'calc(100vh - 76px)' }}>
  //     <div className="w-[55px] overflow-hidden border-r border-[#ececec]">
  //       <img src="./images/sample/sp_5.png" className="w-[56px]" alt="" />
  //     </div>
  //     <div className="grid grid-rows-[1fr_auto] flex-1">
  //       <div>
          <LayoutDoc>
            <LTPA350 />
          </LayoutDoc>
//        </div>
//      </div>
//    </div>
//  </div>
);
