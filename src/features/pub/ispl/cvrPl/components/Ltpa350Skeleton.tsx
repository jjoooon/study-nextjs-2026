/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import { useEffect, useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow, Gcol, Typo, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { BulletList, BulletListItem } from '@common/BulletList';
import { BulletItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputCombo } from '@common/InputCombo';
import { KeyValueItem } from '@common/KeyValueList';
import { TabPager } from '@common/TabPager';
import { TooltipQ } from '@common/TooltipQ';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { SearchIcon, AddIcon } from '@icons';
import { LayoutFoot, LayoutHead } from '@layout/BaseLayout';
import { LayoutMain, LayoutScrollWrap, LayoutMainFoot, LayoutMainBody, LayoutScrollItem } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350 } from '@layout/LayoutTemplate';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Skeleton } from '@uiux/Skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

export interface Ltpa350SkeletonProps {
  /**
   * 스켈레톤 모션(애니메이션) 적용 여부
   * @default false
   */
  animate?: boolean;
}

export function Ltpa350Skeleton({ animate = false }: Ltpa350SkeletonProps = {}) {
  return (
    <Grid className="grid-rows-[auto_1fr_auto] h-full">
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
              <Skeleton className="h-[2.8rem] w-[6rem] rounded-full" />
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
              <Skeleton className="h-[9rem] w-[3.3rem] rounded-[0.8rem_0_0_0.8rem]" color="dark" />
              <Skeleton className="h-[6rem] w-[2.9rem] rounded-[0.8rem_0_0_0.8rem]" color="" />
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
                    <FormTable cols={['w-[12rem]', 'w-[40%]', 'w-[12rem]', 'w-[auto]']} skeleton="true">
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[10rem]" type="text" />
                        </FormCell>
                        <FormCell title={<Skeleton className="w-[9rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[14rem]" type="text" />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell colSpan={3} title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[17rem]" type="text" />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell colSpan={3} title={<Skeleton className="w-[9rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[5rem]" type="text" />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell colSpan={3} title={<Skeleton className="w-[4rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[30rem]" type="text" />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell colSpan={3} title={<Skeleton className="w-[5rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[36rem]" type="text" />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[20rem]" type="text" />
                        </FormCell>
                        <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[18rem]" type="text" />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell colSpan={3} title={<Skeleton className="w-[5rem]" type="text" color="dark" />}>
                          <Gcol gap={2} placement="ss" className="py-2">
                            <Skeleton className="w-[100%]" type="text" />
                            <Skeleton className="w-[90%]" type="text" />
                            <Skeleton className="w-[80%]" type="text" />
                          </Gcol>
                        </FormCell>
                      </FormRow>
                    </FormTable>

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

                      <FormTable cols={['w-[12rem]', 'w-[40%]', 'w-[12rem]', 'w-[auto]']} skeleton="true">
                        <FormRow>
                          <FormCell colSpan={3} title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                            <Grow className="w-full" placement="bwc">
                              <Skeleton className="w-[20rem]" type="text" />
                              <Skeleton className="w-[30rem]" type="text" />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell colSpan={3} title={<Skeleton className="w-[9rem]" type="text" color="dark" />}>
                            <Grow className="w-full" placement="bwc">
                              <Skeleton className="w-[15rem]" type="text" />
                              <Skeleton className="w-[10rem]" type="text" />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell colSpan={3} title={<Skeleton className="w-[4rem]" type="text" color="dark" />}>
                            <Skeleton className="w-[30rem]" type="text" />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell colSpan={3} title={<Skeleton className="w-[5rem]" type="text" color="dark" />}>
                            <Skeleton className="w-[36rem]" type="text" />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                            <Skeleton className="w-[20rem]" type="text" />
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />}>
                            <Skeleton className="w-[18rem]" type="text" />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                            <Skeleton className="w-[20rem]" type="text" />
                          </FormCell>
                          <FormCell title={<Skeleton className="w-[4rem]" type="text" color="dark" />}>
                            <Skeleton className="w-[18rem]" type="text" />
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol>
                    <FormTable cols={['w-[12rem]', 'w-[40%]', 'w-[12rem]', 'w-[auto]']} skeleton="true">
                      <FormRow>
                        <FormCell colSpan={3} title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                          <Grow className="w-full" placement="bwc">
                            <Skeleton className="w-[20rem]" type="text" />
                            <Skeleton className="w-[30rem]" type="text" />
                          </Grow>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell colSpan={3} title={<Skeleton className="w-[9rem]" type="text" color="dark" />}>
                          <Grow className="w-full" placement="bwc">
                            <Skeleton className="w-[15rem]" type="text" />
                            <Skeleton className="w-[10rem]" type="text" />
                          </Grow>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell colSpan={3} title={<Skeleton className="w-[4rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[30rem]" type="text" />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell colSpan={3} title={<Skeleton className="w-[5rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[36rem]" type="text" />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[20rem]" type="text" />
                        </FormCell>
                        <FormCell title={<Skeleton className="w-[7rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[18rem]" type="text" />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title={<Skeleton className="w-[6rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[20rem]" type="text" />
                        </FormCell>
                        <FormCell title={<Skeleton className="w-[4rem]" type="text" color="dark" />}>
                          <Skeleton className="w-[18rem]" type="text" />
                        </FormCell>
                      </FormRow>
                    </FormTable>
                  </Gcol>
                </LayoutScrollItem>
              </LayoutScrollWrap>
            </LayoutMainBody>
            <LayoutMainFoot>
              <MainBottom variant="box">
                <MainBottomItem className="bg-[var(--color-gray-5)]">
                  <Skeleton className="w-[10rem] h-[3.2rem]" color="dark" />
                  <Grow>
                    <Skeleton className="w-[6rem] h-[3.2rem]" color="dark" />
                  </Grow>
                </MainBottomItem>
              </MainBottom>
            </LayoutMainFoot>
          </LayoutMain>
        }
        asideHead={<Skeleton className="min-h-[7.8rem] w-full rounded-[0.8rem]" />}
        asideInfo={
          <Gcol gap={3}>
            <Gcol placement="ss" className="w-full px-1">
              <Grow className="w-full" placement={'bwc'}>
                <Skeleton className="w-[8rem]" type="text" />
                <Skeleton className="h-[2.5rem] w-[2.2rem]" />
              </Grow>
            </Gcol>
            <Skeleton className="h-[3.4rem] w-full" />
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
            <Skeleton className="h-[5.6rem] w-full rounded-[0.8rem]" />
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

export default Ltpa350Skeleton;
