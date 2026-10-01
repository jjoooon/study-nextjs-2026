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

export function Ltpa35003Skeleton() {
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
              <Skeleton className="h-[2.8rem] w-[6rem] rounded-[0.8rem]" />
              <Skeleton className="w-[27rem]" type="text" />
              <Skeleton className="h-[2.8rem] w-[20rem] rounded-[0.8rem]" />
            </Grow>

            <Grow className="gap-2.5 shrink-0" placement="ec">
              <Skeleton className="h-[2.8rem] w-[48rem] rounded-[0.8rem]" />
            </Grow>
          </Grow>
        }
        pageProcess={
          <Gcol placement="bwe" className="w-[3.8rem] pb-[1rem] border-r-[1px] border-r-[var(--color-gray-10)]">
            <Gcol className="h-full max-h-[54rem] gap-[0.2rem]" placement="se">
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[9rem] w-[3.3rem] rounded-[0.8rem_0_0_0.8rem]" color="dark" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
            </Gcol>
          </Gcol>
        }
        mainBody={
          <LayoutMain className="grid grid-rows-[1fr] gap-[1rem] h-full w-full">
            <LayoutMainBody>
              <LayoutScrollWrap className="grid-cols-[1fr_auto] gap-3 h-full">
                <LayoutScrollItem className="overflow-hidden">
                  <Gcol placement={'ss'} className="w-full overflow-hidden " gap={3}>
                    <Gcol gap={0}>
                      <Grow placement="bwc" className="w-full">
                        <Grow>
                          <Skeleton className="w-[10rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" color="dark" />
                          <Skeleton className="w-[10rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                          <Skeleton className="w-[13rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                          <Skeleton className="w-[10rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                          <Skeleton className="w-[10rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                        </Grow>
                        <Grow>
                          <Skeleton className="w-[10rem] h-[2.5rem] rounded-[0.8rem]" />
                        </Grow>
                      </Grow>
                    </Gcol>
                  </Gcol>
                  {/* 알릴사항 (고지사항) 질문 목록 스켈레톤 */}
                  <Gcol placement="ss" className="w-full gap-3 mt-3">
                    {/* 상단 알림 및 컨트롤 영역 */}
                    <Gcol className="w-full gap-2">
                      <Gcol placement="ss" className="bg-[var(--color-gray-5)] p-2">
                        <Skeleton className="h-[1.8rem] w-[36rem] rounded-[1rem]" color="dark" />
                        <Grow placement="bwc" className="w-full">
                          <Skeleton className="h-[2.2rem] w-[26rem] rounded-[1rem]" color="dark" />
                          <Grow className="gap-2">
                            <Skeleton className="h-[2.6rem] w-[20rem] rounded-[0.8rem]" color="dark" />
                          </Grow>
                        </Grow>
                      </Gcol>
                      <Grow className="w-full p-2.5 rounded-[0.8rem] bg-[var(--color-gray-5)] gap-1">
                        <Skeleton className="h-[1.6rem] w-full rounded-[1rem]" color="dark" />
                      </Grow>
                    </Gcol>

                    {/* 질문 카드리스트 */}
                    <Gcol className="w-full gap-2.5">
                      {/* 질문 1 카드 */}
                      <Gcol className="w-full p-3 border rounded-[0.8rem] border-[var(--color-gray-10)] bg-white gap-2.5 ">
                        <Grow className="w-full">
                          <Grow className="gap-2 items-center flex-1 justify-start">
                            <Skeleton className="h-[2rem] w-full rounded-[1rem]" color="dark" />
                          </Grow>
                          <Grow placement="ec" className="gap-3 shrink-0">
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[1.8rem] w-[10rem] rounded-full" />
                            </Grow>
                          </Grow>
                        </Grow>

                        {/* 세부 항목 체크박스 목록 */}
                        <Grid className="grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] w-full gap-2 py-1">
                          {['w-[7rem]', 'w-[7rem]', 'w-[7rem]', 'w-[7rem]', 'w-[10rem]', 'w-[5rem]'].map(
                            (wClass, idx) => (
                              <Grow key={idx} className="gap-1.5 items-center justify-start">
                                <Skeleton className={`h-[1.8rem] ${wClass} rounded-[1rem]`} />
                              </Grow>
                            )
                          )}
                        </Grid>

                        {/* 하단 주석 안내 문구 */}
                        <Gcol className="w-full gap-1 pt-1 items-start">
                          <Skeleton className="h-[1.5rem] w-[46rem] rounded-[1rem]" />
                          <Skeleton className="h-[1.5rem] w-[42rem] rounded-[1rem]" />
                        </Gcol>
                      </Gcol>

                      {/* 질문 2 카드 */}
                      <Gcol className="w-full p-3 border rounded-[0.8rem] border-[var(--color-gray-10)] bg-white gap-2.5">
                        <Grow className="w-full">
                          <Grow className="gap-2 items-center flex-1 justify-start">
                            <Skeleton className="h-[2rem] w-[85%] rounded-[1rem]" color="dark" />
                          </Grow>
                          <Grow placement="ec" className="gap-3 shrink-0">
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[1.8rem] w-[10rem] rounded-full" />
                            </Grow>
                          </Grow>
                        </Grow>

                        {/* 하단 주석 안내 문구 */}
                        <Gcol className="w-full gap-1 pt-1 items-start">
                          <Skeleton className="h-[1.5rem] w-[52rem] rounded-[1rem]" />
                        </Gcol>
                      </Gcol>

                      {/* 질문 3 카드 */}
                      <Gcol className="w-full p-3 border rounded-[0.8rem] border-[var(--color-gray-10)] bg-white gap-2.5">
                        <Grow className="w-full">
                          <Grow className="gap-2 items-center flex-1 justify-start">
                            <Skeleton className="h-[2rem] w-[85%] rounded-[1rem]" color="dark" />
                          </Grow>
                          <Grow placement="ec" className="gap-3 shrink-0">
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[1.8rem] w-[10rem] rounded-full" />
                            </Grow>
                          </Grow>
                        </Grow>

                        {/* 하단 주석 안내 문구 */}
                        <Gcol className="w-full gap-1 pt-1 items-start">
                          <Skeleton className="h-[1.5rem] w-[68rem] rounded-[1rem]" />
                        </Gcol>
                      </Gcol>

                      {/* 질문 4 카드 */}
                      <Gcol className="w-full p-3 border rounded-[0.8rem] border-[var(--color-gray-10)] bg-white gap-2.5">
                        <Grow className="w-full">
                          <Grow className="gap-2 items-center flex-1 justify-start">
                            <Skeleton className="h-[2rem] w-[78%] rounded-[1rem]" color="dark" />
                          </Grow>
                          <Grow placement="ec" className="gap-3 shrink-0">
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[1.8rem] w-[10rem] rounded-full" />
                            </Grow>
                          </Grow>
                        </Grow>

                        {/* 세부 항목 체크박스 목록 */}
                        <Grid className="grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] w-full gap-2 py-1">
                          {['w-[10rem]', 'w-[12rem]', 'w-[13rem]', 'w-[14rem]'].map((wClass, idx) => (
                            <Grow key={idx} className="gap-1.5 items-center justify-start">
                              <Skeleton className={`h-[1.8rem] ${wClass} rounded-[1rem]`} />
                            </Grow>
                          ))}
                        </Grid>

                        {/* 하단 주석 안내 문구 */}
                        <Gcol className="w-full gap-1 pt-1 items-start">
                          <Skeleton className="h-[1.5rem] w-[40rem] rounded-[1rem]" />
                        </Gcol>
                      </Gcol>

                      {/* 질문 5 카드 */}
                      <Gcol className="w-full p-3 border rounded-[0.8rem] border-[var(--color-gray-10)] bg-white gap-2.5">
                        <Grow className="w-full">
                          <Grow className="gap-2 items-center flex-1 justify-start">
                            <Skeleton className="h-[2rem] w-[82%] rounded-[1rem]" color="dark" />
                          </Grow>
                          <Grow placement="ec" className="gap-3 shrink-0">
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[1.8rem] w-[10rem] rounded-full" />
                            </Grow>
                          </Grow>
                        </Grow>

                        {/* 세부 항목 체크박스 목록 */}
                        <Grid className="grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] w-full gap-2 py-1">
                          {[
                            'w-[5rem]',
                            'w-[6rem]',
                            'w-[6rem]',
                            'w-[6rem]',
                            'w-[7rem]',
                            'w-[7rem]',
                            'w-[7rem]',
                            'w-[14rem]',
                            'w-[6rem]',
                            'w-[14rem]',
                          ].map((wClass, idx) => (
                            <Grow key={idx} className="gap-1.5 items-center justify-start">
                              <Skeleton className={`h-[1.8rem] ${wClass} rounded-[1rem]`} />
                            </Grow>
                          ))}
                        </Grid>

                        {/* 하단 주석 안내 문구 */}
                        <Gcol className="w-full gap-1 pt-1 items-start">
                          <Skeleton className="h-[1.5rem] w-[30rem] rounded-[1rem]" />
                        </Gcol>
                      </Gcol>
                    </Gcol>
                  </Gcol>
                </LayoutScrollItem>
                {/* 답변내용 및 지급정보 스켈레톤 영역 */}
                <LayoutScrollItem className="w-full gap-1 flex flex-col shrink-0">
                  {/* 답변내용 스켈레톤 (타이틀과 박스) */}
                  <Gcol
                    className="w-[5.6rem] border-[0.1rem] border-solid rounded-[0.6rem] bg-white  border-[var(--color-gray-10)]"
                    gap={2}
                  >
                    <Gcol className="bg-[#F4F4F4] rounded-t-[0.6rem] p-1 gap-1 items-center">
                      <Skeleton className="h-[1.5rem] w-[3.5rem] rounded-[0.4rem]" color="dark" />
                    </Gcol>
                    <Gcol className="w-full mb-2 px-1 items-center" gap={1}>
                      <Grow className="w-full justify-center" gap={1}>
                        <Skeleton className="h-[36rem] w-[3.6rem] rounded-[0.4rem]" />
                      </Grow>
                    </Gcol>
                  </Gcol>

                  {/* 참고용 지급정보 스켈레톤 (타이틀과 박스) */}
                  <Gcol
                    className="w-[5.6rem] border-[0.1rem] border-solid  border-[var(--color-gray-10)] rounded-[0.6rem] bg-white text-center"
                    gap={2}
                  >
                    <Gcol className="bg-[#F4F4F4] rounded-t-[0.6rem] py-1 gap-1 items-center">
                      <Gcol gap={0} className="items-center gap-1">
                        <Skeleton className="h-[5.5rem] w-[3.5rem] rounded-[0.4rem]" color="dark" />
                      </Gcol>
                    </Gcol>
                    <Gcol className="w-full mb-2 px-1 items-center" gap={1}>
                      <Grow className="w-full justify-center" gap={1}>
                        <Skeleton className="h-[6.5rem] w-[3.6rem] rounded-[0.4rem]" />
                      </Grow>
                    </Gcol>
                  </Gcol>
                </LayoutScrollItem>
              </LayoutScrollWrap>
            </LayoutMainBody>
            <LayoutMainFoot>
              <MainBottom variant="box">
                <MainBottomItem className="bg-[var(--color-gray-5)]">
                  <Grow className="gap-1.5 items-center">
                    <Skeleton className="h-[3.6rem] w-[10rem] rounded-[0.8rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[7rem] rounded-[0.8rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[11rem] rounded-[0.8rem]" color="dark" />
                  </Grow>
                  <Grow placement="ec" className="gap-1.5 items-center">
                    <Skeleton className="h-[3.6rem] w-[9rem] rounded-[0.8rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[11rem] rounded-[0.8rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[6rem] rounded-[0.8rem]" color="dark" />
                  </Grow>
                </MainBottomItem>
              </MainBottom>
            </LayoutMainFoot>
          </LayoutMain>
        }
        asideHead={<Skeleton className="min-h-[7.8rem] w-full rounded-[0.8rem]" />}
        asideInfo={
          <Gcol gap={1.5} className="overflow-hidden">
            {/* FP질병제공동의 스켈레톤 (타이틀 + 박스) */}
            <Gcol placement="ss" className="w-full gap-1">
              <Grow placement="bwc" className="w-full">
                <Skeleton className="w-[10rem]" type="text" />
                <Skeleton className="h-[1.8rem] w-[1.8rem] rounded-[0.4rem]" />
              </Grow>
              <Skeleton className="h-[7.5rem] w-full rounded-[0.8rem]" />
            </Gcol>

            {/* 알릴사항 요약 스켈레톤 (타이틀 + 박스) */}
            <Gcol placement="ss" className="w-full gap-1">
              <Gcol placement="ss" className="w-full">
                <Skeleton className="w-[13rem]" type="text" />
              </Gcol>
              <Skeleton className="h-[18rem] w-full rounded-[0.8rem]" />
            </Gcol>
          </Gcol>
        }
        asideLinks={
          <Gcol className="w-full gap-1">
            <Grow className="gap-2 px-1 w-full" placement="bwc">
              <Skeleton className="w-[6rem]" type="text" />
              <Skeleton className="h-[2.5rem] w-[3.5rem] rounded-[0.8rem]" />
            </Grow>
            <Grid
              className="grid-cols-[1fr_1fr] w-full gap-1 border rounded-[0.8rem] p-2 border-[var(--color-gray-10)]"
              placement="ss"
            >
              <Skeleton className="h-[2.2rem] rounded-[0.8rem]" />
              <Skeleton className="h-[2.2rem] rounded-[0.8rem]" />
              <Skeleton className="h-[2.2rem] rounded-[0.8rem]" />
              <Skeleton className="h-[2.2rem] rounded-[0.8rem]" />
              <Skeleton className="h-[2.2rem] rounded-[0.8rem]" />
            </Grid>
          </Gcol>
        }
        // asideFoot: 단계별 보험료/포인트 요약
        // - dataTotal: `activeStep`에 맞는 데이터 선택 전달
        // - viewKey: 퍼블 분기키(aside 내부 표시 분기에 활용)
        asideFoot={
          <Gcol className="w-full pb-1.5 relative">
            <Skeleton className="h-[5.6rem] w-full rounded-[0.8rem]" />
            <Grow className="asidefootbuttongroup [&>button]:flex-1 [&>button]:w-full" placement={'bwc'}>
              <Skeleton className="h-[2.8rem] flex-1 rounded-[0.8rem]" />
              <Skeleton className="h-[2.8rem] flex-1 rounded-[0.8rem]" />

              <Skeleton className="h-[2.8rem] w-[2.8rem] rounded-[0.8rem]" color="dark" />
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

export default Ltpa35003Skeleton;
