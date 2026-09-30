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

export function Ltpa35002bSkeleton() {
  return (
    <Grid className="grid-rows-[auto_1fr_auto] h-[100vh]">
      <LayoutHead>
        <Grow placement={'bwc'} className="w-full py-[0.4rem] gap-[0.4rem] relative">
          <Skeleton className="w-[10rem]" type="text" />
          <Skeleton className="h-[2.2rem] w-[12rem]" />
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
                          <Skeleton className="w-[10rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                          <Skeleton className="w-[10rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" color="dark" />
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
                        <Skeleton className="h-[2.8rem] w-[8.4rem]" color="dark" />

                        <Grow className="gap-[0.2rem] flex-wrap">
                          {[
                            'w-[6rem]',
                            'w-[5rem]',
                            'w-[6.5rem]',
                            'w-[6.5rem]',
                            'w-[6.5rem]',
                            'w-[6.5rem]',
                            'w-[6.5rem]',
                            'w-[6.5rem]',
                            'w-[5rem]',
                            'w-[4.5rem]',
                          ].map((widthClass, idx) => (
                            <Skeleton key={idx} className={`h-[2.8rem] ${widthClass}`} color="dark" />
                          ))}
                        </Grow>

                        <Grow className="gap-[0.2rem] flex-nowrap shrink-0">
                          <Skeleton className="h-[2.8rem] w-[4rem]" color="dark" />
                          <Skeleton className="h-[2.8rem] w-[4.8rem]" color="dark" />
                        </Grow>
                      </Grow>
                      <Grow placement={'ec'}>
                        <Skeleton className="h-[2.8rem] w-[2.8rem]" color="dark" />
                      </Grow>
                    </Grow>
                  </Gcol>
                  <Grow placement={'bwc'} className="gap-2.5 w-full pb-1 mt-3 flex-wrap ">
                    <Skeleton className="h-[2.8rem] w-[28rem]" color="dark" />
                    <Grow className="gap-2.5" placement="sc">
                      <Skeleton className="h-[2.2rem] w-[7rem]" color="dark" />
                      <Grow className="gap-1" placement="sc">
                        <Skeleton className="h-[2.6rem] w-[12rem]" color="dark" />
                        <Skeleton className="h-[2.6rem] w-[11rem]" color="dark" />
                        <Skeleton className="h-[2.6rem] w-[2.6rem]" color="dark" />
                        <Skeleton className="h-[2.6rem] w-[2.6rem]" color="dark" />
                      </Grow>
                    </Grow>
                  </Grow>
                  <Gcol className="w-full gap-2 mt-2">
                    {/* 그리드 툴바 / 검색 바 스켈레톤 */}
                    <Grow
                      placement="bwc"
                      className="w-full py-1 px-1 border-b border-[var(--color-blue-gray-10)] bg-[var(--color-blue-gray-10)]"
                    >
                      <Grow placement="ss" className="gap-2 items-center flex-1 min-w-0">
                        <Grow className="w-[2.4rem] flex justify-center shrink-0">
                          <Skeleton className="h-[1.8rem] w-[1.8rem]" color="dark" />
                        </Grow>
                        <Grow className="w-full gap-2 items-center">
                          <div className="w-[8rem] shrink-0">
                            <Skeleton className="h-[2rem] w-full" color="dark" />
                          </div>
                          <div className="w-[18rem] shrink-0">
                            <Skeleton className="h-[2.4rem] w-full" color="dark" />
                          </div>
                          <Skeleton className="h-[2.4rem] w-[2.4rem] shrink-0" />
                          <Skeleton className="h-[2.4rem] w-[10rem] shrink-0" />
                        </Grow>
                      </Grow>
                      {/* 2단 다단 헤더 스켈레톤 (9개 컬럼) */}
                      <Grid className="grid-cols-[3.5rem_6.5rem_4.5rem_4.5rem_4.5rem_4.5rem_4.5rem_5.5rem_3rem] grid-rows-2 gap-x-2 gap-y-1 items-center text-center shrink-0">
                        {/* 1행 헤더 */}
                        <Skeleton className="h-[4rem] w-full row-span-2" color="dark" />
                        <Skeleton className="h-[4rem] w-full row-span-2" color="dark" />
                        <Skeleton className="h-[1.8rem] w-full col-span-2" color="dark" />
                        <Skeleton className="h-[1.8rem] w-full col-span-2" color="dark" />
                        <Skeleton className="h-[1.8rem] w-full" color="dark" />
                        <Skeleton className="h-[4rem] w-full row-span-2" color="dark" />
                        <Skeleton className="h-[4rem] w-full row-span-2" color="dark" />

                        {/* 2행 서브 헤더 */}
                        <Skeleton className="h-[1.8rem] w-full" color="dark" />
                        <Skeleton className="h-[1.8rem] w-full" color="dark" />
                        <Skeleton className="h-[1.8rem] w-full" color="dark" />
                        <Skeleton className="h-[1.8rem] w-full" color="dark" />
                        <Skeleton className="h-[1.8rem] w-full" color="dark" />
                      </Grid>
                    </Grow>

                    {/* 그리드 행(Row) 스켈레톤 목록 */}
                    <Gcol className="w-full gap-1 pt-1 ">
                      {[
                        {
                          titleW: 'w-[16rem]',
                          badges: ['w-[3rem]', 'w-[2.5rem]', 'w-[2.5rem]', 'w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[14rem]',
                          badges: ['w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[12rem]',
                          badges: ['w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[18rem]',
                          badges: ['w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[15rem]',
                          badges: ['w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[13rem]',
                          badges: ['w-[3rem]', 'w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[17rem]',
                          badges: ['w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[16rem]',
                          badges: ['w-[2.5rem]', 'w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[20rem]',
                          badges: ['w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[14rem]',
                          badges: ['w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[15rem]',
                          badges: ['w-[2.5rem]', 'w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[18rem]',
                          badges: ['w-[2.5rem]'],
                        },
                        {
                          titleW: 'w-[16rem]',
                          badges: ['w-[2.5rem]'],
                        },
                      ].map((row, idx) => (
                        <Grow
                          key={idx}
                          className="w-full h-[3.2rem] px-2 items-center justify-between border-b border-[var(--color-gray-10)]"
                        >
                          <Grow className="gap-2 items-center flex-1 min-w-0">
                            {/* 1. 체크박스 열 */}
                            <div className="w-[2.4rem] flex justify-center shrink-0">
                              <Skeleton className="h-[1.8rem] w-[1.8rem]" />
                            </div>
                            {/* 2. 번호 열 */}
                            <div className="w-[2.5rem] flex justify-center shrink-0">
                              <Skeleton className="h-[1.8rem] w-[2rem]" />
                            </div>
                            {/* 3. 담보명 및 뱃지/검색 아이콘 열 */}
                            <Grow className="gap-1.5 justify-between flex-1 overflow-hidden min-w-0">
                              <Skeleton className={`h-[1.8rem] ${row.titleW} shrink-0`} />
                              <Grow>
                                {row.badges.map((bWidth, bIdx) => (
                                  <Skeleton key={bIdx} className={`h-[1.8rem] ${bWidth} shrink-0`} />
                                ))}
                              </Grow>
                            </Grow>
                          </Grow>
                          <Grid className="grid-cols-[3.5rem_6.5rem_4.5rem_4.5rem_4.5rem_4.5rem_4.5rem_5.5rem_3rem] gap-2 items-center shrink-0">
                            {/* 속성 */}
                            <div className="flex justify-center">
                              {idx % 3 === 0 && <Skeleton className="h-[1.8rem] w-[1.8rem]" />}
                            </div>
                            {/* 가입금액(만원) */}
                            <div className="flex justify-end">
                              <Skeleton className="h-[1.8rem] w-[4rem]" />
                            </div>
                            {/* 보험료(만원) - 출생전 */}
                            <div className="flex justify-end">
                              <Skeleton className="h-[1.8rem] w-[3.5rem]" />
                            </div>
                            {/* 보험료(만원) - 출생후 */}
                            <div className="flex justify-end">
                              <Skeleton className="h-[1.8rem] w-[3.5rem]" />
                            </div>
                            {/* 만기 - 출생전 */}
                            <div className="flex justify-start">
                              <Skeleton className="h-[1.8rem] w-[3.5rem]" />
                            </div>
                            {/* 만기 - 출생후 */}
                            <div className="flex justify-start">
                              <Skeleton className="h-[1.8rem] w-[3.5rem]" />
                            </div>
                            {/* 납기 - 출생후 */}
                            <div className="flex justify-start">
                              <Skeleton className="h-[1.8rem] w-[3.5rem]" />
                            </div>
                            {/* 예상UW */}
                            <div className="flex justify-center gap-1">
                              <Skeleton className="h-[1.6rem] w-[3.2rem]" />
                            </div>
                            {/* 중복 */}
                            <div className="flex justify-center">
                              <Skeleton className="h-[1.8rem] w-[1.8rem]" />
                            </div>
                          </Grid>
                        </Grow>
                      ))}
                    </Gcol>
                  </Gcol>
                </LayoutScrollItem>
              </LayoutScrollWrap>
            </LayoutMainBody>
            <LayoutMainFoot>
              <MainBottom variant="box">
                <MainBottomItem className="pt-1! pb-1! gap-1">
                  <Grid className="grid-cols-[1.2fr_1fr_1fr_1fr] w-full gap-1 items-center">
                    {/* 1. 만기금(환급률) */}
                    <Grow className="gap-2 items-center">
                      <Skeleton className="h-[2rem] w-[9rem]" />
                      <Skeleton className="h-[2.2rem] w-[3.5rem]" />
                      <Skeleton className="h-[2.8rem] flex-1" />
                      <Skeleton className="h-[2.8rem] w-[3.5rem]" />
                    </Grow>
                    {/* 2. 보장보험료 */}
                    <Grow className="gap-2 items-center">
                      <Skeleton className="h-[2rem] w-[6rem]" />
                      <Skeleton className="h-[2.8rem] flex-1" />
                    </Grow>
                    {/* 3. 적립보험료 */}
                    <Grow className="gap-2 items-center">
                      <Skeleton className="h-[2rem] w-[6rem]" />
                      <Skeleton className="h-[2.8rem] flex-1" />
                    </Grow>
                    {/* 4. 합계보험료 */}
                    <Grow className="gap-2 items-center">
                      <Skeleton className="h-[2rem] w-[6rem]" />
                      <Skeleton className="h-[2.8rem] flex-1" color="dark" />
                    </Grow>
                  </Grid>
                  <Grid className="grid-cols-[1.2fr_1fr_1fr_1fr] w-full items-center">
                    {/* 1. 만기금(환급률) */}
                    <Grow className="gap-2 items-center">
                      <Skeleton className="h-[2rem] w-[9rem]" />
                      <Skeleton className="h-[2.2rem] w-[3.5rem]" />
                      <Skeleton className="h-[2.8rem] flex-1" />
                      <Skeleton className="h-[2.8rem] w-[3.5rem]" />
                    </Grow>
                    {/* 2. 보장보험료 */}
                    <Grow className="gap-2 items-center">
                      <Skeleton className="h-[2rem] w-[6rem]" />
                      <Skeleton className="h-[2.8rem] flex-1" />
                    </Grow>
                    {/* 3. 적립보험료 */}
                    <Grow className="gap-2 items-center">
                      <Skeleton className="h-[2rem] w-[6rem]" />
                      <Skeleton className="h-[2.8rem] flex-1" />
                    </Grow>
                    {/* 4. 합계보험료 */}
                    <Grow className="gap-2 items-center">
                      <Skeleton className="h-[2rem] w-[6rem]" />
                      <Skeleton className="h-[2.8rem] flex-1" color="dark" />
                    </Grow>
                  </Grid>
                </MainBottomItem>

                <MainBottomItem className="bg-[var(--color-gray-5)]">
                  <Grow placement="ec" className="gap-1.5 items-center">
                    <Skeleton className="h-[3.6rem] w-[7.5rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[9.5rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[9.5rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[12rem]" color="dark" />
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
            <Gcol className="w-full rounded-[0.8rem] p-2 bg-[var(--color-gray-5)] gap-1.5 overflow-hidden">
              {/* 보험시기 선택 바 */}
              <Skeleton className="h-[2.8rem] w-full" color="dark" />

              {/* 계약자 / 피보험자 */}
              <Gcol gap={1} className="w-full pt-0.5" placement="ss">
                <Grow className="gap-1.5 items-center">
                  <Skeleton className="h-[1.8rem] w-[1.8rem]" color="dark" />
                  <Skeleton className="h-[1.8rem] w-[5.5rem]" color="dark" />
                </Grow>
                <Grow className="gap-1.5 items-center">
                  <Skeleton className="h-[1.8rem] w-[1.8rem]" color="dark" />
                  <Skeleton className="h-[1.8rem] w-[11.5rem]" color="dark" />
                </Grow>
              </Gcol>

              {/* 기간 및 유효 정보 */}
              <Gcol gap={1} className="w-full" placement="ss">
                <Grow placement="bwc" className="w-full">
                  <Grow className="gap-1 items-center">
                    <Skeleton className="h-[1.5rem] w-[6rem]" color="dark" />
                    <Skeleton className="h-[1.5rem] w-[6.5rem]" color="dark" />
                  </Grow>
                  <Skeleton className="h-[1.6rem] w-[2.8rem]" color="dark" />
                </Grow>
                <Grow placement="bwc" className="w-full">
                  <Grow className="gap-1 items-center">
                    <Skeleton className="h-[1.5rem] w-[4.5rem]" color="dark" />
                    <Skeleton className="h-[1.5rem] w-[6.5rem]" color="dark" />
                  </Grow>
                  <Skeleton className="h-[1.6rem] w-[2.8rem]" color="dark" />
                </Grow>
                <Grow placement="bwc" className="w-full">
                  <Grow className="gap-1 items-center">
                    <Skeleton className="h-[1.5rem] w-[5.5rem]" color="dark" />
                    <Skeleton className="h-[1.5rem] w-[6.5rem]" color="dark" />
                  </Grow>
                  <Skeleton className="h-[1.6rem] w-[2.8rem]" color="dark" />
                </Grow>
                <Skeleton className="h-[1.5rem] w-[8rem]" color="dark" />
              </Gcol>

              {/* 서류 출력/스캔 상태 및 안내 */}
              <Gcol gap={1} className="w-full">
                <Grow placement="ss" className="w-full">
                  <Skeleton className="h-[1.5rem] w-[7rem]" color="dark" />
                  <Skeleton className="h-[1.5rem] w-[1.5rem]" color="dark" />
                </Grow>
                <Grow placement="ss" className="w-full">
                  <Skeleton className="h-[1.5rem] w-[7rem]" color="dark" />
                  <Skeleton className="h-[1.5rem] w-[1.5rem] " color="dark" />
                </Grow>
                <Grow placement="ss" className="w-full">
                  <Skeleton className="h-[1.5rem] w-[9rem]" color="dark" />
                  <Skeleton className="h-[1.5rem] w-[1.5rem]" color="dark" />
                </Grow>
                <Gcol placement="ss" gap={0.5} className="w-full pt-0.5">
                  <Skeleton className="h-[1.5rem] w-[12rem]" color="dark" />
                  <Skeleton className="h-[1.5rem] w-[9rem]" color="dark" />
                </Gcol>
                <Gcol className="w-full gap-0.5 items-end pt-0.5">
                  <Skeleton className="h-[1.5rem] w-full" color="dark" />
                  <Skeleton className="h-[1.8rem] w-[6rem]" color="dark" />
                </Gcol>
              </Gcol>
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

export default Ltpa35002bSkeleton;
