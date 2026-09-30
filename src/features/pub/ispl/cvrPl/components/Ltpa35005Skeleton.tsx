/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import { Grow, Gcol, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { LayoutFoot, LayoutHead } from '@layout/BaseLayout';
import { LayoutMain, LayoutScrollWrap, LayoutMainFoot, LayoutMainBody, LayoutScrollItem } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350 } from '@layout/LayoutTemplate';
import { Skeleton } from '@uiux/Skeleton';

export function Ltpa35005Skeleton() {
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
              <Skeleton className="h-[9rem] w-[3.3rem] rounded-[0.8rem_0_0_0.8rem]" color="dark" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
            </Gcol>
          </Gcol>
        }
        mainBody={
          <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem] h-full w-full [&_th]:break-keep">
            <LayoutMainBody>
              <LayoutScrollWrap>
                <LayoutScrollItem className="overflow-hidden">
                  <Gcol placement={'ss'} className="w-full overflow-x-hidden" gap={3}>
                    {/* 상단 기본 계약사항 FormTable */}
                    <FormTable cols={['w-[15.6rem]', 'w-[40%]', 'w-[13.8rem]', 'w-[auto]']} skeleton="true">
                      {/* 1. 만기수익자 */}
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[6.5rem]" type="text" color="dark" />} colSpan={3}>
                          <Grow className="gap-1 items-center flex-wrap">
                            <Skeleton className="h-[2.8rem] w-[10rem]" />
                            <Skeleton className="h-[2.8rem] w-[11.4rem]" />
                            <Skeleton className="h-[2.8rem] w-[2.8rem]" />
                            <Skeleton className="h-[2.8rem] w-[8.4rem]" />
                            <Skeleton className="h-[2.8rem] w-[10rem]" />
                            <Skeleton className="h-[2.8rem] w-[19rem]" />
                            <Skeleton className="h-[2.8rem] w-[7.5rem]" />
                          </Grow>
                        </FormCell>
                      </FormRow>

                      {/* 2. 우편물수령처 */}
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />} colSpan={3}>
                          <Grow className="gap-3 items-center">
                            <Grow className="gap-2 items-center">
                              <Skeleton className="h-[2rem] w-[4.5rem]" />
                              <Skeleton className="h-[2rem] w-[4.5rem]" />
                            </Grow>
                            <Skeleton className="h-[1.8rem] w-[38rem] ml-2" type="text" />
                          </Grow>
                        </FormCell>
                      </FormRow>

                      {/* 3. 전자적 안내동의 & 서명방법 */}
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[9rem]" type="text" color="dark" />}>
                          <Grow className="gap-2 items-center">
                            <Skeleton className="h-[2rem] w-[5rem]" />
                            <Skeleton className="h-[2rem] w-[5.5rem]" />
                          </Grow>
                        </FormCell>
                        <FormCell title={<Skeleton className="w-[5.5rem]" type="text" color="dark" />}>
                          <Grow placement="bwc" className="w-full items-center">
                            <Grow className="gap-2 items-center">
                              <Skeleton className="h-[2rem] w-[5.5rem]" />
                              <Skeleton className="h-[2rem] w-[5rem]" />
                              <Skeleton className="h-[2rem] w-[5rem]" />
                            </Grow>
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[1.8rem] w-[7rem]" type="text" />
                            </Grow>
                          </Grow>
                        </FormCell>
                      </FormRow>

                      {/* 4. 증권전달방법 & 승환계약여부 (rowSpan 2) */}
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[7.5rem]" type="text" color="dark" />}>
                          <Grow className="gap-2 items-center">
                            <Skeleton className="h-[2rem] w-[5rem]" />
                            <Skeleton className="h-[2rem] w-[4.5rem]" />
                          </Grow>
                        </FormCell>
                        <FormCell
                          title={
                            <Gcol gap={1} className="items-start">
                              <Skeleton className="w-[7rem]" type="text" color="dark" />
                              <Skeleton className="w-[11rem]" type="text" color="dark" />
                            </Gcol>
                          }
                          rowSpan={2}
                          titleRowSpan={2}
                        >
                          <Gcol placement="se" className="w-full gap-1.5">
                            <Grow className="w-full gap-2 items-center" placement="sc">
                              <Skeleton className="h-[2rem] w-[3.5rem]" />
                              <Skeleton className="h-[1.8rem] w-[4rem]" />
                              <Skeleton className="h-[2.4rem] w-[4rem]" />
                              <Skeleton className="h-[1.8rem] w-[5.5rem]" />
                              <Skeleton className="h-[2.4rem] w-[4rem]" />
                              <Skeleton className="h-[1.8rem] w-[2rem]" />
                            </Grow>
                            <Grow placement="bwc" className="w-full items-center">
                              <Grow className="gap-1 items-center">
                                <Skeleton className="h-[2rem] w-[5rem]" />
                                <Skeleton className="h-[1.6rem] w-[18rem]" />
                              </Grow>
                              <Skeleton className="h-[2.8rem] w-[8.5rem]" />
                            </Grow>
                          </Gcol>
                        </FormCell>
                      </FormRow>

                      {/* 5. 약관유형 */}
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[5.5rem]" type="text" color="dark" />}>
                          <Grow gap={2} className="items-center">
                            <Grow className="gap-2 items-center">
                              <Skeleton className="h-[2rem] w-[5rem]" />
                              <Skeleton className="h-[2rem] w-[6rem]" />
                            </Grow>
                            <Skeleton className="h-[2.8rem] w-[5.5rem]" />
                          </Grow>
                        </FormCell>
                      </FormRow>

                      {/* 6. 수익자 지정·변경 추가약정 & 조세규정확인대상 */}
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[12rem]" type="text" color="dark" />}>
                          <Grow placement="bwc" className="w-full items-center">
                            <Grow className="gap-2 items-center">
                              <Skeleton className="h-[2rem] w-[5rem]" />
                              <Skeleton className="h-[2rem] w-[5.5rem]" />
                            </Grow>
                            <Skeleton className="h-[2.8rem] w-[7.5rem]" />
                          </Grow>
                        </FormCell>
                        <FormCell
                          title={
                            <Gcol gap={1} className="items-start">
                              <Skeleton className="w-[9rem]" type="text" color="dark" />
                              <Skeleton className="w-[6.5rem]" type="text" color="dark" />
                            </Gcol>
                          }
                        >
                          <Grow placement="bwc" className="w-full items-center">
                            <Grow className="gap-2 items-center">
                              <Skeleton className="h-[2rem] w-[7rem]" />
                              <Skeleton className="h-[2rem] w-[5rem]" />
                            </Grow>
                            <Skeleton className="h-[2.8rem] w-[10rem]" />
                          </Grow>
                        </FormCell>
                      </FormRow>

                      {/* 7. 영수일자 (보험시기) & 실소유자 확인 */}
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[10rem]" type="text" color="dark" />}>
                          <Grow className="gap-1 items-center">
                            <Skeleton className="h-[2.8rem] w-[10rem]" />
                            <Skeleton className="h-[2.8rem] w-[2.8rem]" />
                          </Grow>
                        </FormCell>
                        <FormCell title={<Skeleton className="w-[7.5rem]" type="text" color="dark" />}>
                          <Grow placement="bwc" className="w-full items-center">
                            <Grow className="gap-2 items-center">
                              <Skeleton className="h-[2rem] w-[10.5rem]" />
                              <Skeleton className="h-[2rem] w-[8.5rem]" />
                            </Grow>
                            <Grow className="gap-1 items-center">
                              <Skeleton className="h-[2.8rem] w-[6.5rem]" />
                              <Skeleton className="h-[2.8rem] w-[6.5rem]" />
                            </Grow>
                          </Grow>
                        </FormCell>
                      </FormRow>

                      {/* 8. 성년후견인 지정여부 & 장애인보험 전환 */}
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[11rem]" type="text" color="dark" />}>
                          <Skeleton className="h-[2.8rem] w-[13rem]" />
                        </FormCell>
                        <FormCell title={<Skeleton className="w-[8.5rem]" type="text" color="dark" />}>
                          <Grow placement="bwc" className="w-full items-center">
                            <Grow className="gap-3 items-center">
                              <Grow className="gap-1 items-center">
                                <Skeleton className="h-[1.8rem] w-[8rem]" />
                              </Grow>
                              <Grow className="gap-1 items-center">
                                <Skeleton className="h-[1.8rem] w-[7.5rem]" />
                              </Grow>
                            </Grow>
                            <Skeleton className="h-[2.8rem] w-[7.5rem]" />
                          </Grow>
                        </FormCell>
                      </FormRow>

                      {/* 9. 노후실손 자동재가입동의 */}
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[12rem]" type="text" color="dark" />} colSpan={3}>
                          <Grow className="gap-2 items-center">
                            <Skeleton className="h-[2rem] w-[5rem]" />
                            <Skeleton className="h-[2rem] w-[5.5rem]" />
                          </Grow>
                        </FormCell>
                      </FormRow>

                      {/* 10. 당월해지 자동이체 신청 & 해지 방지 휴대폰 결제 */}
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[12rem]" type="text" color="dark" />}>
                          <Grow placement="sc" gap={2} className="items-center">
                            <Grow className="gap-2 items-center">
                              <Skeleton className="h-[2rem] w-[5rem]" />
                              <Skeleton className="h-[2rem] w-[5.5rem]" />
                            </Grow>
                            <Skeleton className="h-[2.8rem] w-[7.5rem]" />
                          </Grow>
                        </FormCell>
                        <FormCell title={<Skeleton className="w-[11.5rem]" type="text" color="dark" />}>
                          <Grow placement="bwc" className="w-full items-center">
                            <Grow placement="sc" gap={2} className="items-center">
                              <Grow className="gap-2 items-center">
                                <Skeleton className="h-[2rem] w-[5rem]" />
                                <Skeleton className="h-[2rem] w-[5.5rem]" />
                              </Grow>
                              <Skeleton className="h-[2.8rem] w-[10rem]" />
                            </Grow>
                            <Skeleton className="h-[2.8rem] w-[7.5rem]" />
                          </Grow>
                        </FormCell>
                      </FormRow>
                    </FormTable>

                    {/* 보험료 납부방법 FormTable */}
                    <FormTable cols={['w-[9.6rem]', 'w-[40%]', 'w-[9rem]', 'w-[auto]']} skeleton="true">
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[6.5rem]" type="text" color="dark" />}>
                          <Skeleton className="h-[2.8rem] w-[10rem]" />
                        </FormCell>
                        <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />}>
                          <Grow gap={1} className="items-center">
                            <Skeleton className="h-[2.8rem] w-[10rem]" />
                            <Grow className="gap-1 items-center ml-2">
                              <Skeleton className="h-[1.8rem] w-[7rem]" type="text" />
                            </Grow>
                          </Grow>
                        </FormCell>
                      </FormRow>
                    </FormTable>

                    {/* 탭 페이저 및 수익자/대리인 영역 */}
                    <Gcol gap={0} className="w-full">
                      {/* 탭 헤더 및 페이징 컨트롤 */}
                      <Grow placement="bwc" className="w-full border-b-[0.2rem] border-[var(--color-gray-10)]">
                        <Grow className="gap-0.5 items-end">
                          <Skeleton className="w-[6rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" color="dark" />
                          <Skeleton className="w-[6rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                          <Skeleton className="w-[12rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                          <Skeleton className="w-[12rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                          <Skeleton className="w-[12rem] h-[3rem] rounded-[0.8rem_0.8rem_0_0]" />
                        </Grow>
                        <Grow className="gap-1 items-center pb-1">
                          <Skeleton className="h-[2.4rem] w-[2.4rem]" />
                          <Skeleton className="h-[2.4rem] w-[2.4rem]" />
                          <Skeleton className="h-[2.4rem] w-[2.4rem]" />
                        </Grow>
                      </Grow>

                      {/* 수익자 및 대리인 FormTable */}
                      <FormTable
                        lineTop={false}
                        cols={['w-[9.6rem]', 'w-[40%]', 'w-[9rem]', 'w-[auto]']}
                        skeleton="true"
                      >
                        {/* 사망수익자 & 사망외수익자 */}
                        <FormRow>
                          <FormCell title={<Skeleton className="w-[6.5rem]" type="text" color="dark" />}>
                            <Grow className="gap-1 items-center flex-wrap">
                              <Skeleton className="h-[2.8rem] w-[8.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[11.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[2.8rem]" />
                              <Skeleton className="h-[2.8rem] w-[10rem]" />
                            </Grow>
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />}>
                            <Grow className="gap-1 items-center flex-wrap">
                              <Skeleton className="h-[2.8rem] w-[8.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[11.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[2.8rem]" />
                              <Skeleton className="h-[2.8rem] w-[10rem]" />
                            </Grow>
                          </FormCell>
                        </FormRow>

                        {/* 지정대리인 */}
                        <FormRow>
                          <FormCell title={<Skeleton className="w-[6.5rem]" type="text" color="dark" />} colSpan={3}>
                            <Grow className="gap-1 items-center flex-wrap">
                              <Skeleton className="h-[2.8rem] w-[8.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[11.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[2.8rem]" />
                              <Skeleton className="h-[2.8rem] w-[10rem]" />
                              <Skeleton className="h-[2.8rem] w-[7.5rem]" />
                            </Grow>
                          </FormCell>
                        </FormRow>

                        {/* 법정대리인1 */}
                        <FormRow>
                          <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />} colSpan={3}>
                            <Grow placement="bwc" className="w-full items-center">
                              <Grow className="gap-1 items-center flex-wrap">
                                <Skeleton className="h-[2.8rem] w-[8.4rem]" />
                                <Skeleton className="h-[2.8rem] w-[11.4rem]" />
                                <Skeleton className="h-[2.8rem] w-[2.8rem]" />
                                <Skeleton className="h-[2.8rem] w-[10rem]" />
                              </Grow>
                              <Grow className="gap-1 items-center">
                                <Skeleton className="h-[2.8rem] w-[9.5rem]" />
                                <Skeleton className="h-[2.8rem] w-[4.5rem]" />
                                <Skeleton className="h-[2.8rem] w-[5.5rem]" />
                              </Grow>
                            </Grow>
                          </FormCell>
                        </FormRow>

                        {/* 법정대리인2 & 1인 사유 */}
                        <FormRow>
                          <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />}>
                            <Grow className="gap-1 items-center flex-wrap">
                              <Skeleton className="h-[2.8rem] w-[8.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[11.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[2.8rem]" />
                            </Grow>
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[5rem]" type="text" color="dark" />}>
                            <Skeleton className="h-[2.8rem] w-full max-w-[32rem]" />
                          </FormCell>
                        </FormRow>

                        {/* 지정대리인1 */}
                        <FormRow>
                          <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />} colSpan={3}>
                            <Grow className="gap-1 items-center flex-wrap">
                              <Skeleton className="h-[2.8rem] w-[8.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[11.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[2.8rem]" />
                              <Skeleton className="h-[2.8rem] w-[10rem]" />
                              <Skeleton className="h-[2.8rem] w-[7.5rem]" />
                            </Grow>
                          </FormCell>
                        </FormRow>

                        {/* 지정대리인2 */}
                        <FormRow>
                          <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />} colSpan={3}>
                            <Grow className="gap-1 items-center flex-wrap">
                              <Skeleton className="h-[2.8rem] w-[8.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[11.4rem]" />
                              <Skeleton className="h-[2.8rem] w-[2.8rem]" />
                              <Skeleton className="h-[2.8rem] w-[10rem]" />
                            </Grow>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol>
                  </Gcol>
                </LayoutScrollItem>
              </LayoutScrollWrap>
            </LayoutMainBody>
            <LayoutMainFoot>
              <MainBottom variant="box">
                <MainBottomItem className="bg-[var(--color-gray-5)]">
                  <Grow className="gap-1">
                    <Skeleton className="h-[3.6rem] w-[8rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[9rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[9.5rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[8rem]" color="dark" />
                  </Grow>
                  <Grow className="gap-1">
                    <Skeleton className="h-[3.6rem] w-[6rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[10.5rem]" color="dark" />
                    <Skeleton className="h-[3.6rem] w-[8.5rem]" color="dark" />
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

export default Ltpa35005Skeleton;
