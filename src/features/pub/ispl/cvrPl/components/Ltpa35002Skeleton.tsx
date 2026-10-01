/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import { Grow, Gcol, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
// import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { LayoutFoot, LayoutHead } from '@layout/BaseLayout';
import { LayoutMain, LayoutScrollWrap, LayoutMainFoot, LayoutMainBody, LayoutScrollItem } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350 } from '@layout/LayoutTemplate';
import { Skeleton } from '@uiux/Skeleton';

export function Ltpa35002Skeleton() {
  return (
    <Grid className="grid-rows-[auto_1fr_auto] h-[100vh]">
      <LayoutHead>
        <Grow placement={'bwc'} className="w-full py-[0.4rem] gap-[0.4rem] relative">
          <Skeleton className="w-[10rem]" type="text" />
          <Skeleton className="h-[2.2rem] w-[12rem] rounded-[1rem]" />
        </Grow>
      </LayoutHead>

      <LayoutTemplateLTPA350
        pageTitle={
          <Grow placement="bwc" className="w-full py-1 gap-1.5 flex-wrap">
            <Grow className="gap-2 flex-1" placement="sc">
              <Skeleton className="h-[2.8rem] w-[6rem]" />
              <Skeleton className="w-[27rem]" type="text" />
              <Skeleton className="h-[2.8rem] w-[20rem]" />
            </Grow>

            <Grow className="gap-2.5 shrink-0" placement="ec">
              <Skeleton className="h-[2.8rem] w-[48rem]" />
            </Grow>
          </Grow>
        }
        pageProcess={
          <Gcol placement="bwe" className="w-[3.8rem] pb-[1rem] border-r-[1px] border-r-[var(--color-gray-10)]">
            <Gcol className="h-full max-h-[54rem] gap-[0.2rem]" placement="se">
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[9rem] w-[3.3rem] rounded-[0.8rem_0_0_0.8rem]" color="dark" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
            </Gcol>
          </Gcol>
        }
        mainBody={
          <LayoutMain className="grid grid-rows-[1fr] gap-[1rem] h-full w-full">
            <LayoutMainBody>
              <LayoutScrollWrap>
                <LayoutScrollItem className="overflow-hidden">
                  <Gcol placement={'ss'} className="w-full overflow-hidden" gap={3}>
                    <Gcol gap={0}>
                      <Grow placement="bwc" className="w-full">
                        <Grow>
                          <Skeleton className="w-[10rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" color="dark" />
                          <Skeleton className="w-[10rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                          <Skeleton className="w-[10rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                        </Grow>
                        <Grow>
                          <Skeleton className="w-[10rem] h-[2.5rem]" />
                        </Grow>
                      </Grow>
                    </Gcol>
                  </Gcol>
                  <Gcol variant={'box-round-b'} placement={'ss'} className="w-full">
                    <Grow className="gap-[0.2rem]" placement={'bwc'}>
                      <Grow className="gap-[0.6rem]" placement={'sc'}>
                        <Skeleton className="h-[2.8rem] w-[50.4rem]" color="dark" />
                      </Grow>
                      <Grow placement={'ec'}>
                        <Skeleton className="h-[2.8rem] w-[2.8rem]" color="dark" />
                      </Grow>
                    </Grow>
                  </Gcol>
                  <Grow placement={'bwc'} className="gap-2.5 w-full pb-1 mt-3 flex-wrap ">
                    <Skeleton className="h-[2.8rem] w-[28rem]" color="dark" />
                    <Grow className="gap-2.5" placement="sc">
                      <Skeleton className="h-[2.2rem] w-[40rem]" color="dark" />
                    </Grow>
                  </Grow>
                  <Gcol className="w-full mt-2">
                    {/* 그리드 툴바 / 검색 바 스켈레톤 */}
                    <Grow
                      placement="bwc"
                      className="w-full h-[3rem] px-1 border-b border-[var(--color-blue-gray-10)] bg-[var(--color-blue-gray-10)]"
                    >
                      <Grow placement="ss" className="gap-2 items-center flex-1 min-w-0">
                        <Grow className="w-[2.4rem] flex justify-center shrink-0">
                          <Skeleton className="h-[1.8rem] w-[1.8rem]" color="dark" />
                        </Grow>
                        <Grow className="w-full">
                          <div className="w-[36rem] shrink-0">
                            <Skeleton className="h-[2rem] w-full" color="dark" type="text" />
                          </div>
                        </Grow>
                      </Grow>
                      <Grid className="w-[36rem] items-center text-center shrink-0">
                        <Skeleton className="h-[2rem] w-full" color="dark" type="text" />
                      </Grid>
                    </Grow>

                    <Gcol className="w-full gap-1">
                      {Array.from({ length: 15 }).map((_, idx) => {
                        const widths = [
                          'w-[30rem]',
                          'w-[54rem]',
                          'w-[28rem]',
                          'w-[38rem]',
                          'w-[24rem]',
                          'w-[16rem]',
                          'w-[32rem]',
                          'w-[26rem]',
                          'w-[35rem]',
                          'w-[67rem]',
                          'w-[25rem]',
                          'w-[17rem]',
                          'w-[23rem]',
                          'w-[19rem]',
                          'w-[21rem]',
                        ];
                        const skeletonWidth = widths[idx % widths.length];

                        return (
                          <Grow
                            key={idx}
                            className="w-full h-[3.2rem] px-2 items-center border-b border-[var(--color-gray-10)]"
                          >
                            <Grow className="gap-2 justify-between items-center flex-1 min-w-0 w-full">
                              <div className="w-[7rem] flex shrink-0">
                                <Skeleton className="h-[1.8rem] w-full" type="text" />
                              </div>
                              <div className="w-full flex ">
                                <Skeleton className={`h-[1.8rem] ${skeletonWidth}`} type="text" />
                              </div>
                              <div className="w-[30rem] flex shrink-0">
                                <Skeleton className="h-[1.8rem] w-full" type="text" />
                              </div>
                              <div className="w-[7rem] flex shrink-0 gap-1 items-center">
                                <Skeleton className="h-[1.6rem] w-[1.6rem]" type="text" />
                                <Skeleton className="h-[1.8rem] w-[5rem]" type="text" />
                              </div>
                            </Grow>
                          </Grow>
                        );
                      })}
                    </Gcol>
                  </Gcol>
                </LayoutScrollItem>
              </LayoutScrollWrap>
            </LayoutMainBody>
            <LayoutMainFoot>
              <MainBottom variant="box">
                <MainBottomItem className="pt-0! pb-0!">
                  <Grow className="w-full gap-4 py-2">
                    <Skeleton className="h-[2rem] w-full" type="text" />
                  </Grow>
                </MainBottomItem>
                <MainBottomItem className="bg-[var(--color-gray-5)]">
                  <Skeleton className="h-[3.6rem] w-[13rem]" color="dark" />
                  <Grow placement="ec" className="gap-1.5 items-center">
                    <Skeleton className="h-[3.6rem] w-[30rem]" color="dark" />
                  </Grow>
                </MainBottomItem>
              </MainBottom>
            </LayoutMainFoot>
          </LayoutMain>
        }
        asideHead={<Skeleton className="min-h-[7.8rem] w-full" />}
        asideInfo={
          <Gcol gap={1.5} className="overflow-hidden">
            <Gcol placement="ss" className="w-full px-1">
              <Grow className="w-full" placement={'bwc'}>
                <Skeleton className="w-[8rem]" type="text" />
                <Skeleton className="h-[2.2rem] w-[2.2rem]" />
              </Grow>
              <Grow className="w-full" placement={'bwc'}>
                <Skeleton className="w-[12rem]" type="text" />
              </Grow>
            </Gcol>
            {/* 계약정보 카드 상세 스켈레톤 */}
            <Grow className="gap-2 px-1 w-full mt-[1.2rem]" placement="bwc">
              <Skeleton className="w-[6rem]" type="text" />
              <Skeleton className="h-[2.5rem] w-[3.5rem]" />
            </Grow>
            <Gcol className="w-full rounded-[0.8rem] gap-1.5 overflow-hidden">
              {/* 계약자 / 피보험자 */}
              <Skeleton className="h-[12rem] w-full" />
            </Gcol>
          </Gcol>
        }
        asideLinks={
          <Gcol className="w-full gap-1">
            <Grow className="gap-2 px-1 w-full" placement="bwc">
              <Skeleton className="w-[6rem]" type="text" />
              <Skeleton className="h-[2.5rem] w-[3.5rem]" />
            </Grow>
            <Grid
              className="grid-cols-[1fr_1fr] w-full gap-1 border rounded-[0.8rem] p-2 border-[var(--color-gray-10)]"
              placement="ss"
            >
              <Skeleton className="h-[2.2rem]" />
              <Skeleton className="h-[2.2rem]" />
              <Skeleton className="h-[2.2rem]" />
              <Skeleton className="h-[2.2rem]" />
              <Skeleton className="h-[2.2rem]" />
            </Grid>
          </Gcol>
        }
        // asideFoot: 단계별 보험료/포인트 요약
        // - dataTotal: `activeStep`에 맞는 데이터 선택 전달
        // - viewKey: 퍼블 분기키(aside 내부 표시 분기에 활용)
        asideFoot={
          <Gcol className="w-full pb-1.5 relative">
            <Skeleton className="h-[5.6rem] w-full" />
            <Grow className="asidefootbuttongroup [&>button]:flex-1 [&>button]:w-full" placement={'bwc'}>
              <Skeleton className="h-[2.8rem] flex-1" />
              <Skeleton className="h-[2.8rem] flex-1" />

              <Skeleton className="h-[2.8rem] w-[2.8rem]" color="dark" />
            </Grow>
          </Gcol>
        }
      />

      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </Grid>
  );
}

export default Ltpa35002Skeleton;
