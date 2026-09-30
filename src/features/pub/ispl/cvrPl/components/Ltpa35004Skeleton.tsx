/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import { Grow, Gcol, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { LayoutFoot, LayoutHead } from '@layout/BaseLayout';
import { LayoutMain, LayoutScrollWrap, LayoutMainFoot, LayoutMainBody, LayoutScrollItem } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350 } from '@layout/LayoutTemplate';
import { Skeleton } from '@uiux/Skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

export function Ltpa35004Skeleton() {
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
                    {/* 상단 폼 테이블 (동시설계, 심사구분, 심사처리자, 심사상태) */}
                    <Gcol variant={'box-round-b'} placement={'ss'} className="w-full">
                      <FormTable caption="취급자 정보" variant={'head'}>
                        <FormRow className="w-full [&>div]:w-full">
                          <FormCell
                            title={<Skeleton className="h-[1.8rem] w-[5rem]" type="text" color="dark" />}
                            className="min-w-[6.4rem]"
                            tdStyle={{ width: '100%' }}
                            tdClassName="justify-between w-full"
                          >
                            <Grow className="gap-2 items-center">
                              <Skeleton className="h-[2.8rem] w-[13rem]" color="dark" />
                              <Skeleton className="h-[2.8rem] w-[13rem]" color="dark" />
                            </Grow>

                            <Grow className="flex items-center gap-1">
                              <Skeleton className="h-[2.8rem] w-[6.5rem]" color="dark" />
                              <Skeleton className="h-[2.8rem] w-[6.5rem]" color="dark" />
                              <Skeleton className="h-[2.8rem] w-[6.5rem]" color="dark" />
                              <Skeleton className="h-[2.8rem] w-[8.5rem]" color="dark" />
                              <Skeleton className="h-[2.8rem] w-[7.5rem]" color="dark" />
                              <Skeleton className="h-[2.8rem] w-[8.5rem]" color="dark" />
                            </Grow>
                          </FormCell>
                        </FormRow>

                        <FormRow>
                          <FormCell
                            title={<Skeleton className="h-[1.8rem] w-[5rem]" type="text" color="dark" />}
                            className="min-w-[6.4rem]"
                            tdStyle={{ width: '100%' }}
                            tdClassName="w-full"
                          >
                            <Grid className="w-full grid-cols-[11.3rem_15rem_23.7rem_minmax(19.4rem,1fr)_9.8rem] gap-1 items-center">
                              <Skeleton className="h-[2.8rem] w-full" color="dark" />
                              <Skeleton className="h-[2.8rem] w-full" color="dark" />
                              <Skeleton className="h-[2.8rem] w-full" color="dark" />
                              <Skeleton className="h-[2.8rem] w-full" color="dark" />
                              <Grow className="gap-1 items-center">
                                <Skeleton className="h-[1.8rem] w-[1.8rem]" />
                                <Skeleton className="h-[1.8rem] w-[7rem]" />
                              </Grow>
                            </Grid>
                          </FormCell>
                        </FormRow>

                        <FormRow>
                          <FormCell
                            title={<Skeleton className="h-[1.8rem] w-[5.5rem]" type="text" color="dark" />}
                            className="min-w-[6.4rem]"
                            tdStyle={{ flex: 1 }}
                            tdClassName="w-full"
                          >
                            <Grid className="w-full grid-cols-[15rem_15rem_15rem_auto] gap-1 items-center">
                              <Skeleton className="h-[2.8rem] w-full" color="dark" />
                              <Skeleton className="h-[2.8rem] w-full" color="dark" />
                              <Skeleton className="h-[2.8rem] w-full" color="dark" />
                            </Grid>
                          </FormCell>
                          <FormCell
                            title={<Skeleton className="h-[1.8rem] w-[5rem]" />}
                            className="w-full"
                            tdStyle={{ flex: 1 }}
                            tdClassName="w-full"
                          >
                            <Grid className="w-full grid-cols-[minmax(15.4rem,1fr)_9.8rem] gap-1 items-center">
                              <Skeleton className="h-[2.8rem] w-full" />
                              <Grow className="gap-1 items-center">
                                <Skeleton className="h-[1.8rem] w-[1.8rem]" />
                                <Skeleton className="h-[1.8rem] w-[6rem]" />
                              </Grow>
                            </Grid>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol>

                    {/* 본문 콘텐츠 (좌측: 지침세부내용 + 조건부 특약 가입, 우측: 심사결과안내) */}
                    <Grid className="w-full grid-cols-[1fr_30.7rem] gap-3">
                      {/* 좌측 영역 */}
                      <Gcol className="w-full gap-4">
                        {/* 1. 지침세부내용 */}
                        <TableFold variant={'default'} className="w-full [&>div]:!w-full">
                          <TableFoldHead
                            title={
                              <Grow placement="bwc" className="w-full justify-between">
                                <Skeleton className="h-[2.2rem] w-[9rem]" type="text" color="dark" />
                                <Skeleton className="h-[2.8rem] w-[6.5rem]" />
                              </Grow>
                            }
                          />
                          <TableFoldBody className="gap-1 !border-t-[var(--color-gray-10)]">
                            <Table variant="default" className="!border-t-[var(--color-gray-10)]">
                              <colgroup>
                                <col style={{ width: '6rem' }} />
                                <col style={{ width: '10rem' }} />
                                <col style={{ width: 'auto' }} />
                              </colgroup>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[6rem] text-center">
                                    <Skeleton className="w-[3rem] mx-auto" type="text" color="dark" />
                                  </TableHead>
                                  <TableHead className="text-center">
                                    <Skeleton className="w-[5rem] mx-auto" type="text" color="dark" />
                                  </TableHead>
                                  <TableHead>
                                    <Skeleton className="w-[6rem]" type="text" color="dark" />
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {[
                                  { noW: 'w-[1.5rem]', typeW: 'w-[5rem]', descW: 'w-[22rem]' },
                                  { noW: 'w-[1.5rem]', typeW: 'w-[5rem]', descW: 'w-[32rem]' },
                                  { noW: 'w-[1.5rem]', typeW: 'w-[5rem]', descW: 'w-[26rem]' },
                                  { noW: 'w-[1.5rem]', typeW: 'w-[5rem]', descW: 'w-[4rem]' },
                                  { noW: 'w-[1.5rem]', typeW: 'w-[5rem]', descW: 'w-[85%]' },
                                  { noW: 'w-[1.5rem]', typeW: 'w-[5rem]', descW: 'w-[4rem]' },
                                  { noW: 'w-[1.5rem]', typeW: 'w-[5rem]', descW: 'w-[22rem]' },
                                  { noW: 'w-[1.5rem]', typeW: 'w-[5rem]', descW: 'w-[32rem]' },
                                ].map((row, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell className="text-center">
                                      <Skeleton className={`h-[1.6rem] ${row.noW} mx-auto`} />
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Skeleton className={`h-[1.6rem] ${row.typeW} mx-auto`} type="text" />
                                    </TableCell>
                                    <TableCell>
                                      <Skeleton className={`h-[1.6rem] ${row.descW}`} type="text" />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableFoldBody>
                        </TableFold>

                        {/* 2. 조건부 특약 가입 */}
                        <Gcol className="w-full gap-2">
                          <Grow placement="bwc" className="w-full">
                            <Skeleton className="h-[2.2rem] w-[11rem]" color="dark" type="text" />
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[2.8rem] w-[4.5rem]" />
                              <Skeleton className="h-[2.8rem] w-[7rem]" />
                            </Grow>
                          </Grow>

                          {/* 2행 테이블 */}
                          <div className="w-full border border-[var(--color-gray-10)] rounded-[0.8rem] overflow-hidden divide-y divide-[var(--color-gray-10)] ">
                            <Grow className="w-full p-2.5 gap-2 items-center justify-start">
                              <Skeleton className="h-[1.8rem] w-[1.8rem] shrink-0" />
                              <Skeleton className="h-[1.8rem] w-[26rem]" type="text" />
                            </Grow>
                            <Grow className="w-full p-2.5 gap-2 items-center bg-[var(--color-gray-10)] justify-start">
                              <Skeleton className="h-[1.8rem] w-[1.8rem] shrink-0" />
                              <Skeleton className="h-[1.8rem] w-[22rem]" type="text" />
                            </Grow>
                          </div>
                        </Gcol>
                      </Gcol>

                      {/* 우측 영역: 심사결과안내 */}
                      <div className="w-full border border-[var(--color-gray-10)] rounded-[0.8rem] overflow-hidden bg-white flex flex-col justify-between">
                        {/* 상단 헤더 바 */}
                        <Grow placement="bwc" className="w-full h-[3.8rem] px-3 bg-[var(--color-gray-10)] text-white">
                          <Skeleton className="h-[2rem] w-[8.5rem]" type="text" />
                          <Skeleton className="h-[2.4rem] w-[6rem]" />
                        </Grow>

                        {/* 바디 메시지 목록 */}
                        <Gcol className="w-full p-3 gap-3">
                          {/* 피보험자 / GA지점 메시지 */}
                          <Gcol className="w-full gap-1 items-end">
                            <Skeleton className="h-[1.5rem] w-[16rem]" type="text" />
                            <Gcol className="w-[20rem] bg-[var(--color-gray-5)] rounded-[0.8rem] p-3 gap-2 items-start">
                              <Skeleton className="h-[1.8rem] w-[6rem]" color="dark" type="text" />
                              <Skeleton className="h-[1.5rem] w-[95%]" color="dark" type="text" />
                              <Skeleton className="h-[1.4rem] w-[10rem]" color="dark" type="text" />
                            </Gcol>
                          </Gcol>

                          {/* UW심사팀 메시지 */}
                          <Gcol className="w-full gap-1 items-start">
                            <Skeleton className="h-[1.5rem] w-[15rem]" type="text" />
                            <Gcol className="w-full border-[var(--color-gray-10)] border rounded-[0.8rem] p-3 gap-2">
                              <Grow placement="bwc" className="w-full">
                                <Skeleton className="h-[1.8rem] w-[17rem]" color="dark" type="text" />
                                <Skeleton className="h-[2.2rem] w-[5.5rem]" />
                              </Grow>
                              <Gcol className="w-full gap-1 items-start">
                                <Skeleton className="h-[1.5rem] w-[14rem]" type="text" />
                                <Skeleton className="h-[1.5rem] w-[8rem]" type="text" />
                                <Skeleton className="h-[1.5rem] w-[22rem]" type="text" />
                                <Skeleton className="h-[1.5rem] w-[10rem]" type="text" />
                                <Skeleton className="h-[1.5rem] w-[95%]" type="text" />
                              </Gcol>
                              <Grow className="gap-1 justify-start pt-1 w-full">
                                <Skeleton className="h-[1.8rem] w-[3.5rem]" />
                                <Skeleton className="h-[1.8rem] w-[3.5rem]" />
                              </Grow>
                              <Grow placement="bwc" className="w-full pt-1">
                                <Skeleton className="h-[1.4rem] w-[10rem]" type="text" />
                                <Skeleton className="h-[1.8rem] w-[3.6rem]" />
                              </Grow>
                            </Gcol>
                          </Gcol>
                        </Gcol>

                        {/* 하단 요청자 의견 */}
                        <Gcol className="w-full p-3 border-t border-[var(--color-gray-10)] bg-white gap-2">
                          <Grow placement="bwc" className="w-full">
                            <Skeleton className="h-[1.8rem] w-[7rem]" color="dark" />
                            <Skeleton className="h-[2.6rem] w-[6rem]" />
                          </Grow>
                          <Gcol className="w-full gap-1">
                            <Skeleton className="h-[5rem] w-full" />
                          </Gcol>
                        </Gcol>
                      </div>
                    </Grid>
                  </Gcol>
                </LayoutScrollItem>
              </LayoutScrollWrap>
            </LayoutMainBody>
            <LayoutMainFoot>
              <MainBottom variant="box">
                <MainBottomItem className="bg-[var(--color-gray-5)]">
                  <Grow placement="ec" className="gap-1.5 items-center">
                    <Skeleton className="h-[3.6rem] w-[7.5rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[7.5rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[7.5rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[10rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[3.6rem]" color="dark" />
                  </Grow>
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
            {/* FP질병제공동의 스켈레톤 (타이틀 + 박스) */}
            <Gcol placement="ss" className="w-full gap-1">
              <Grow placement="bwc" className="w-full">
                <Skeleton className="w-[10rem]" type="text" />
                <Skeleton className="h-[1.8rem] w-[1.8rem]" />
              </Grow>
              <Skeleton className="h-[7.5rem] w-full" />
            </Gcol>

            {/* 알릴사항 요약 스켈레톤 (타이틀 + 박스) */}
            <Gcol placement="ss" className="w-full gap-1">
              <Gcol placement="ss" className="w-full">
                <Skeleton className="w-[13rem]" type="text" />
              </Gcol>
              <Skeleton className="h-[6rem] w-full" />
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

export default Ltpa35004Skeleton;
