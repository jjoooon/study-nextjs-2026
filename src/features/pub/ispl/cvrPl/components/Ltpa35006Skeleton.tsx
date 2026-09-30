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

export function Ltpa35006Skeleton() {
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
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
              <Skeleton className="h-[9rem] w-[3.3rem] rounded-[0.8rem_0_0_0.8rem]" color="dark" />
            </Gcol>
          </Gcol>
        }
        mainBody={
          <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem] h-full w-full [&_th]:break-keep">
            <LayoutMainBody>
              <LayoutScrollWrap>
                <LayoutScrollItem className="overflow-hidden">
                  <Gcol placement={'ss'} className="w-full overflow-x-hidden" gap={3}>
                    {/* 1. 영수관리번호 조회 영역 */}
                    <Grow className="w-full" variant="box-round" placement={'bwe'}>
                      <FormTable variant={'head'} lineTop={false} cols={['flex-auto', 'flex-1']} skeleton="true">
                        <FormRow>
                          <FormCell title={<Skeleton className="w-[8rem]" type="text" color="dark" />}>
                            <Skeleton className="h-[2.8rem] w-[14rem]" color="dark" />
                          </FormCell>
                        </FormRow>
                      </FormTable>

                      <Grow className="gap-1 items-center">
                        <Skeleton className="h-[3.2rem] w-[5.5rem]" color="dark" />
                        <Skeleton className="h-[3.2rem] w-[3.2rem]" color="dark" />
                      </Grow>
                    </Grow>

                    {/* 2. 청약사항 상세 정보 */}
                    <Gcol placement={'ss'} className="w-full gap-1.5">
                      <Skeleton className="h-[2.2rem] w-[8rem]" type="text" color="dark" />
                      <FormTable
                        cols={['min-w-[8rem]', 'w-[30%]', 'min-w-[8rem]', 'w-[30%]', 'min-w-[8rem]', 'w-[30%]']}
                        skeleton="true"
                      >
                        <FormRow>
                          <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                            <Skeleton className="h-[2.8rem] w-full max-w-[24rem]" />
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[2.8rem] w-[20rem]" />
                              <Skeleton className="h-[2.8rem] w-[2.8rem]" />
                            </Grow>
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                            <Skeleton className="h-[2.8rem] w-full max-w-[16rem]" />
                          </FormCell>
                        </FormRow>

                        <FormRow>
                          <FormCell title={<Skeleton className="w-[5rem]" type="text" color="dark" />}>
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[2.8rem] w-[10rem]" />
                              <Skeleton className="h-[2.8rem] w-[13rem]" />
                            </Grow>
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[5rem]" type="text" color="dark" />}>
                            <Skeleton className="h-[2.8rem] w-full max-w-[16rem]" />
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                            <Skeleton className="h-[2.8rem] w-full max-w-[12rem]" />
                          </FormCell>
                        </FormRow>

                        <FormRow>
                          <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />}>
                            <Grow className="gap-1 items-center justify-end">
                              <Skeleton className="h-[2.8rem] w-[24rem]" />
                            </Grow>
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                            <Grow className="gap-1 items-center justify-end">
                              <Skeleton className="h-[2.8rem] w-[24rem]" />
                            </Grow>
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                            <Skeleton className="h-[2.8rem] w-full max-w-[12rem]" />
                          </FormCell>
                        </FormRow>

                        <FormRow>
                          <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[2.8rem] w-[10rem]" />
                              <Skeleton className="h-[2.8rem] w-[13rem]" />
                            </Grow>
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />} colSpan={3}>
                            <Grow className="gap-3 items-center">
                              <Skeleton className="h-[2rem] w-[5.5rem]" />
                              <Skeleton className="h-[2rem] w-[6.5rem]" />
                            </Grow>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol>

                    {/* 3. 즉시집금 설정 영역 스켈레톤 */}
                    <TableFold variant={'default'}>
                      <TableFoldHead title={<Skeleton className="w-[6rem]" type="text" color="dark" />} />
                      <TableFoldBody className="gap-1">
                        <Table variant="default" className="!border-t-[var(--color-gray-10)]">
                          <colgroup>
                            <col style={{ width: '5rem' }} />
                            <col style={{ width: '10rem' }} />
                            <col style={{ width: '14rem' }} />
                            <col style={{ width: '18rem' }} />
                            <col style={{ width: 'auto' }} />
                            <col style={{ width: '10rem' }} />
                            <col style={{ width: '5rem' }} />
                          </colgroup>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[4.5rem] min-w-[4.5rem]">
                                <Skeleton className="w-[2.4rem] mx-auto" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[3rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[6.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[3rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[6.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[4.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[2.4rem] mx-auto" type="text" color="dark" />
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[1, 2].map((idx) => (
                              <TableRow key={idx}>
                                <TableCell className="text-center">
                                  <Skeleton className="w-[2.4rem] mx-auto" type="text" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-[2.8rem] w-full" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-[2.8rem] w-full" />
                                </TableCell>
                                <TableCell>
                                  <Grow className="gap-1 items-center">
                                    <Skeleton className="h-[2.8rem] flex-1" />
                                  </Grow>
                                </TableCell>
                                <TableCell>
                                  <Grow className="gap-1 items-center">
                                    <Skeleton className="h-[2.8rem] w-[12rem]" />
                                    <Skeleton className="h-[2.8rem] w-[7rem]" />
                                    <Skeleton className="h-[2.8rem] w-[12rem]" />
                                    <Skeleton className="h-[2.8rem] w-[6rem]" />
                                  </Grow>
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-[2.8rem] w-full" />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Skeleton className="h-[2.8rem] w-[4.5rem] mx-auto" />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Skeleton className="w-[36rem]" type="text" />
                      </TableFoldBody>
                    </TableFold>

                    {/* 4. 카드 결제 정보 영역 스켈레톤 */}
                    <TableFold variant={'default'}>
                      <TableFoldHead title={<Skeleton className="w-[4rem]" type="text" color="dark" />} />
                      <TableFoldBody>
                        <Table variant="default" className="!border-t-[var(--color-gray-10)]">
                          <colgroup>
                            <col style={{ width: '4.5rem' }} />
                            <col style={{ width: '10rem' }} />
                            <col style={{ width: 'auto' }} />
                            <col style={{ width: '12rem' }} />
                            <col style={{ width: '8rem' }} />
                            <col style={{ width: '10rem' }} />
                            <col style={{ width: '5.5rem' }} />
                            <col style={{ width: '10rem' }} />
                            <col style={{ width: '10rem' }} />
                            <col style={{ width: '5rem' }} />
                          </colgroup>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[4.5rem] min-w-[4.5rem]">
                                <Skeleton className="w-[2.4rem] mx-auto" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[3.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[4.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[4.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[2.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[2.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead className="w-[5.5rem] min-w-[5.5rem] text-center">
                                <Skeleton className="w-[3.2rem] mx-auto" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[4.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[4.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[2.4rem] mx-auto" type="text" color="dark" />
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[1, 2].map((idx) => (
                              <TableRow key={idx}>
                                <TableCell className="w-[4.5rem] min-w-[4.5rem] text-center">
                                  <Skeleton className="w-[1rem] mx-auto" type="text" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-[2.8rem] w-full" />
                                </TableCell>
                                <TableCell>
                                  <Grow className="gap-1 items-center">
                                    <Skeleton className="h-[2.8rem] flex-1" />
                                    <Skeleton className="h-[2.8rem] flex-1" />
                                    <Skeleton className="h-[2.8rem] flex-1" />
                                    <Skeleton className="h-[2.8rem] flex-1" />
                                  </Grow>
                                </TableCell>
                                <TableCell>
                                  <Grow className="gap-1 items-center">
                                    <Skeleton className="h-[2.8rem] flex-1" />
                                    <Skeleton className="h-[2.8rem] flex-1" />
                                  </Grow>
                                </TableCell>
                                <TableCell>
                                  <Grow className="gap-1 items-center">
                                    <Skeleton className="h-[2.8rem] flex-1" />
                                  </Grow>
                                </TableCell>
                                <TableCell>
                                  <Grow className="gap-1 items-center">
                                    <Skeleton className="h-[2.8rem] flex-1" />
                                  </Grow>
                                </TableCell>
                                <TableCell className="w-[5.5rem] min-w-[5.5rem] text-center">
                                  <Grow placement="cc">
                                    <Skeleton className="h-[1.8rem] w-[1.8rem]" />
                                  </Grow>
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-[2.8rem] w-full" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-[2.8rem] w-full" />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Skeleton className="h-[2.8rem] w-[4.5rem] mx-auto" />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableFoldBody>
                    </TableFold>

                    {/* 5. 입금사항 정보 그리드 영역 스켈레톤 */}
                    <TableFold variant={'default'}>
                      <TableFoldHead title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                        <Grow>
                          <Skeleton className="h-[2.8rem] w-[6.5rem]" />
                        </Grow>
                      </TableFoldHead>
                      <TableFoldBody>
                        <Table variant="default" className="!border-t-[var(--color-gray-10)]">
                          <colgroup>
                            <col style={{ width: '2.5rem' }} />
                            <col style={{ width: '4rem' }} />
                            <col style={{ width: '10rem' }} />
                            <col style={{ width: '5rem' }} />
                            <col style={{ width: '10rem' }} />
                            <col style={{ width: 'auto' }} />
                          </colgroup>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[4.5rem] min-w-[4.5rem]">
                                <Grow placement="cc">
                                  <Skeleton className="h-[2.4rem] w-[2.4rem]" />
                                </Grow>
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[4.5rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[3rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[3rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[3rem]" type="text" color="dark" />
                              </TableHead>
                              <TableHead>
                                <Skeleton className="w-[3rem]" type="text" color="dark" />
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-center">
                                <Grow placement="cc">
                                  <Skeleton className="h-[2.4rem] w-[2.4rem]" />
                                </Grow>
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-[2.4rem] w-[4rem]" type="text" />
                              </TableCell>
                              <TableCell className="text-center">
                                <Skeleton className="h-[2.4rem] w-[8rem]" type="text" />
                              </TableCell>
                              <TableCell className="text-right">
                                <Skeleton className="h-[2.4rem] w-[8rem] ml-auto" type="text" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-[2.4rem] w-[12rem]" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-[2.4rem] w-full" />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableFoldBody>
                    </TableFold>
                  </Gcol>
                </LayoutScrollItem>
              </LayoutScrollWrap>
            </LayoutMainBody>
            <LayoutMainFoot>
              <MainBottom variant="box">
                <MainBottomItem className="bg-[var(--color-gray-5)]">
                  <Grow gap={1}>
                    <Skeleton className="h-[3.6rem] w-[8.5rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[6rem]" color="dark" />
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
                  <Skeleton className="h-[1.5rem] w-[1.5rem]" color="dark" />
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

export default Ltpa35006Skeleton;
