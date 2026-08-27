/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useEffect } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { Grow, Gcol, Typo, Grid } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputCombo } from '@common/InputCombo';
import { KeyValueItem } from '@common/KeyValueList';
import { TabPager } from '@common/TabPager';
import { TooltipQ } from '@common/TooltipQ';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { SearchIcon, AddIcon } from '@icons';
import { LayoutMain, LayoutScrollWrap, LayoutMainFoot, LayoutMainBody, LayoutScrollItem } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

type TabsDataType = {
  id: number;
  value: string;
  name: string;
  type: string;
  info: string[];
};

const TabsData: TabsDataType[] = [
  {
    id: 1,
    value: 'user1',
    name: '인보험',
    type: '일반',
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 2,
    value: 'user2',
    name: '어린이태아',
    type: '태아',
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 3,
    value: 'user3',
    name: '재물피보험자',
    type: '재물피보험자',
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 4,
    value: 'user4',
    name: '재물목적물',
    type: '재물목적물',
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 5,
    value: 'user5',
    name: '단체최한화',
    type: '단체',
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 6,
    value: 'user6',
    name: '연금저축',
    type: '연금저축',
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
];

/**
 * 물음표(?) 아이콘 클릭 시 활성화되는 툴팁 컨텐츠 정의 (안내 동의 여부 관련)
 */
const tooltipContents = [
  <>
    문서서명/TM은 청양서상 고객이 청약서로 [전자적 방밥의 안내동의여부]에 기재한 내용을 화면에서 선택하시면 됩니다.
    <br />
    전자서명/전자청약은 전자적 안내동의가 필수사항입니다.
  </>,
];

/**
 * Ltpa35001 컴포넌트 Props 정의
 * - simpleMode: 간편 설계 모드 여부 (true인 경우 간소화된 폼 표시)
 */
type Ltpa35001Props = {
  simpleMode: boolean;
};

/**
 * @component Ltpa35001
 * @description 보험 설계 시 기본 정보 및 피보험자/목적물/단체 정보를 입력하는 공통 템플릿 컴포넌트
 * - 간편 모드(simpleMode) 여부에 따라 피보험자 등록 및 세부 입력 폼의 노출 조건이 달라집니다.
 */
export const Ltpa35001 = ({ simpleMode: _simpleMode }: Ltpa35001Props) => {
  // useTabs 훅을 활용해 탭 목록(tabs), 현재 활성 탭(active) 및 탭 추가/삭제 처리를 수행
  const { tabs, active, setActive, handleRemove, replaceTabs } = useTabs(TabsData);

  // 현재 활성화된 탭 정보
  const currentTab = tabs.find((t) => t.value === active);

  // M1. 무한루프에러 수정
  useEffect(() => {
    const isSame =
      tabs.length === TabsData.length &&
      tabs.every((tab, idx) => tab.value === TabsData[idx].value && tab.name === TabsData[idx].name);
    if (!isSame) {
      replaceTabs(TabsData);
    }
  }, [replaceTabs, tabs]);

  return (
    <LayoutTemplateLTPA350MainBody
      mainBody={
        <LayoutMain className="grid grid-rows-[1fr] gap-[1rem] h-full w-full">
          <LayoutMainBody>
            <LayoutScrollWrap>
              <LayoutScrollItem>
                <Gcol placement={'ss'} className="w-full overflow-x-hidden" gap={3}>
                  {/* 1.1 기본 보험정보 설정 테이블 */}
                  <FormTable cols={['w-[12rem]', 'w-[40%]', 'w-[12rem]', 'w-[auto]']}>
                    {/* 공통: 보험시기, 보험기간 */}
                    <FormRow>
                      <FormCell title={'보험시기'}>
                        <DatePickerInput mode={'single'} />
                        <Button color={'secondary'} only={'default'} size={'lg'} variant={'outlined'}>
                          오늘
                        </Button>
                      </FormCell>
                      <FormCell title={'보험기간'}>
                        <DatePickerInput readOnly mode={'range'} />
                      </FormCell>
                    </FormRow>

                    {/* 연금저축: 개시연령,지급기간 */}
                    {currentTab?.type === '연금저축' && (
                      <>
                        <FormRow>
                          <FormCell title={'개시연령'}>
                            <NativeSelect aria-label="개시연령 선택" width={80}>
                              {[
                                { value: '50세', id: 'pension-age-50', label: '50세' },
                                { value: '55세', id: 'pension-age-55', label: '55세' },
                                { value: '60세', id: 'pension-age-60', label: '60세' },
                                { value: '65세', id: 'pension-age-65', label: '65세' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title={'지급기간'}>
                            <NativeSelect aria-label="지급기간 선택" width={80}>
                              {[
                                { value: '5년', id: 'pension-payout-5', label: '5년' },
                                { value: '10년', id: 'pension-payout-10', label: '10년' },
                                { value: '15년', id: 'pension-payout-15', label: '15년' },
                                { value: '20년', id: 'pension-payout-20', label: '20년' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>

                        <FormRow>
                          <FormCell title={'수령방법'}>
                            <NativeSelect aria-label="수령방법 선택" width={100}>
                              {[1, 2, 3, 4, 5].map((item) => (
                                <NativeSelectOption key={item} value={item}>
                                  {item}년
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                      </>
                    )}

                    {/* 만기: 일반 */}
                    {currentTab?.type === '일반' && (
                      <FormRow>
                        <FormCell title={'만기'} colSpan={3}>
                          <RadioGroup defaultValue="80세">
                            {[
                              { value: '80세', label: '80세' },
                              { value: '90세', label: '90세' },
                              { value: '100세', label: '100세' },
                              { value: '110세', label: '110세' },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 만기: 태아 */}
                    {currentTab?.type === '태아' && (
                      <FormRow>
                        <FormCell title={'만기'} colSpan={3}>
                          <RadioGroup defaultValue="100세만기">
                            {[
                              { value: '100세만기', id: 'child-insurance-period-100', label: '100세만기' },
                              { value: '90세만기', id: 'child-insurance-period-90', label: '90세만기' },
                              { value: '80세만기', id: 'child-insurance-period-80', label: '80세만기' },
                              { value: '55세만기', id: 'child-insurance-period-55', label: '55세만기' },
                              { value: '30세만기', id: 'child-insurance-period-30', label: '30세만기' },
                              { value: '20세만기', id: 'child-insurance-period-20', label: '20세만기' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 만기: 재물 */}
                    {(currentTab?.type === '재물피보험자' || currentTab?.type === '재물목적물') && (
                      <FormRow>
                        <FormCell title={'만기'} colSpan={3}>
                          <RadioGroup defaultValue="03세 만기">
                            {[
                              { value: '03세 만기', id: 'child-insurance-period-03', label: '03세 만기' },
                              { value: '05세 만기', id: 'child-insurance-period-05', label: '05세 만기' },
                              { value: '07세 만기', id: 'child-insurance-period-07', label: '07세 만기' },
                              { value: '10세 만기', id: 'child-insurance-period-10', label: '10세 만기' },
                              { value: '15세 만기', id: 'child-insurance-period-15', label: '15세 만기' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 만기: 단체 */}
                    {currentTab?.type === '단체' && (
                      <FormRow>
                        <FormCell title={'만기'} colSpan={3}>
                          <RadioGroup defaultValue="03년">
                            {[
                              { value: '03년', id: 'group-insurance-period-03', label: '03년' },
                              { value: '05년', id: 'group-insurance-period-05', label: '05년' },
                              { value: '07년', id: 'group-insurance-period-07', label: '07년' },
                              { value: '10년', id: 'group-insurance-period-10', label: '10년' },
                              { value: '15년', id: 'group-insurance-period-15', label: '15년' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}

                    {/* 납기: 일반 */}
                    {currentTab?.type === '일반' && (
                      <FormRow>
                        <FormCell title={'납기'} colSpan={3}>
                          <RadioGroup defaultValue="10년납">
                            {[
                              { value: '10년납', label: '10년납' },
                              { value: '15년납', label: '15년납' },
                              { value: '20년납', label: '20년납' },
                              { value: '25년납', label: '25년납' },
                              { value: '30년납', label: '30년납' },
                              { value: '전기납', label: '전기납' },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 납기: 태아  */}
                    {currentTab?.type === '태아' && (
                      <FormRow>
                        <FormCell title={'납기'} colSpan={3}>
                          <RadioGroup defaultValue="20년납">
                            {[
                              { value: '10년납', id: 'child-payment-period-10', label: '10년납' },
                              { value: '15년납', id: 'child-payment-period-15', label: '15년납' },
                              { value: '20년납', id: 'child-payment-period-20', label: '20년납' },
                              { value: '25년납', id: 'child-payment-period-25', label: '25년납' },
                              { value: '30년납', id: 'child-payment-period-30', label: '30년납' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 납기::재물 */}
                    {(currentTab?.type === '재물피보험자' || currentTab?.type === '재물목적물') && (
                      <FormRow>
                        <FormCell title={'납기'}>
                          <RadioGroup defaultValue="전기납">
                            {[{ value: '전기납', id: 'property-payment-period-full', label: '전기납' }].map(
                              (option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              )
                            )}
                          </RadioGroup>
                        </FormCell>
                        <FormCell title={'단체취급'}>
                          <Checkbox color="primary"></Checkbox>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 납기: 단체 */}
                    {currentTab?.type === '단체' && (
                      <FormRow>
                        <FormCell title={'납기'} colSpan={3}>
                          <RadioGroup defaultValue="03년납">
                            {[
                              { value: '03년납', id: 'group-payment-period-03', label: '03년납' },
                              { value: '05년납', id: 'group-payment-period-05', label: '05년납' },
                              { value: '07년납', id: 'group-payment-period-07', label: '07년납' },
                              { value: '10년납', id: 'group-payment-period-10', label: '10년납' },
                              { value: '전기납', id: 'group-payment-period-all', label: '전기납' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 납기: 연금저축 */}
                    {currentTab?.type === '연금저축' && (
                      <FormRow>
                        <FormCell title={'납기'} colSpan={3}>
                          <RadioGroup defaultValue="05년납">
                            {[
                              { value: '05년납', id: 'pension-pay-period-5', label: '05년납' },
                              { value: '10년납', id: 'pension-pay-period-10', label: '10년납' },
                              { value: '15년납', id: 'pension-pay-period-15', label: '15년납' },
                              { value: '20년납', id: 'pension-pay-period-20', label: '20년납' },
                              { value: '25년납', id: 'pension-pay-period-25', label: '25년납' },
                              { value: '30년납', id: 'pension-pay-period-30', label: '30년납' },
                              { value: '전기납', id: 'pension-pay-period-continuous', label: '전기납' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}

                    {/* 납입주기/갱신주기: 일반 */}
                    {currentTab?.type === '일반' && (
                      <FormRow>
                        <FormCell title={'납입주기'}>
                          <RadioGroup defaultValue="월납">
                            {[
                              { value: '월납', label: '월납' },
                              { value: '3개월', label: '3개월' },
                              { value: '6개월', label: '6개월' },
                              { value: '연납', label: '연납' },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                        <FormCell title={'갱신주기'}>
                          <RadioGroup defaultValue="3년">
                            {[
                              { value: '3년', label: '3년' },
                              { value: '10년', label: '10년' },
                              { value: '20년', label: '20년' },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 납입주기/갱신주기: 태아 */}
                    {currentTab?.type === '태아' && (
                      <FormRow>
                        <FormCell title={'납입주기'}>
                          <RadioGroup defaultValue="월납">
                            {[{ value: '월납', id: 'child-payment-cycle-monthly', label: '월납' }].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                        <FormCell title={'갱신주기'}>
                          <RadioGroup defaultValue="20년">
                            {[
                              { value: '20년', id: 'child-renewal-period-20', label: '20년' },
                              { value: '10년', id: 'child-renewal-period-10', label: '10년' },
                              { value: '3년', id: 'child-renewal-period-3', label: '3년' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 납입주기/갱신주기: 재물 */}
                    {(currentTab?.type === '재물피보험자' || currentTab?.type === '재물목적물') && (
                      <FormRow>
                        <FormCell title={'납입주기'}>
                          <RadioGroup defaultValue="월납">
                            {[
                              { value: '월납', id: 'property-payment-cycle-monthly', label: '월납' },
                              { value: '연납', id: 'property-payment-cycle-yearly', label: '연납' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                        <FormCell title={'갱신주기'}>
                          <RadioGroup defaultValue="3년">
                            {[
                              { value: '3년', id: 'property-renewal-cycle-3', label: '3년' },
                              { value: '5년', id: 'property-renewal-cycle-5', label: '5년' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 납입주기: 단체 */}
                    {currentTab?.type === '단체' && (
                      <FormRow>
                        <FormCell title={'납입주기'} colSpan={3}>
                          <RadioGroup defaultValue="월납">
                            {[
                              { value: '월납', id: 'group-payment-cycle-monthly', label: '월납' },
                              { value: '3개월', id: 'group-payment-cycle-quarterly', label: '3개월' },
                              { value: '6개월', id: 'group-payment-cycle-semiannual', label: '6개월' },
                              { value: '연납', id: 'group-payment-cycle-annual', label: '연납' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 납입주기: 연금저축 */}
                    {currentTab?.type === '연금저축' && (
                      <FormRow>
                        <FormCell title={'납입주기'} colSpan={3}>
                          <RadioGroup defaultValue="월납">
                            {[
                              { value: '월납', id: 'pension-cycle-monthly', label: '월납' },
                              { value: '3개월', id: 'pension-cycle-quarterly', label: '3개월' },
                              { value: '6개월', id: 'pension-cycle-semiannual', label: '6개월' },
                              { value: '연납', id: 'pension-cycle-annual', label: '연납' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}

                    {/* 일반 */}
                    {currentTab?.type === '일반' && (
                      <FormRow>
                        <FormCell title={'고지유형'} colSpan={3}>
                          <RadioGroup
                            width={'full'}
                            defaultValue="1형(일반고지형)"
                            className="grid grid-cols-[1fr_1fr_1fr] gap-y-2"
                          >
                            {[
                              {
                                value: '1형(일반고지형)',
                                label: '1형(일반고지형)',
                              },
                              {
                                value: '2형(건강고지형II(6년))',
                                label: '2형(건강고지형II(6년))',
                              },
                              {
                                value: '3형(건강고지형II(7년))',
                                label: '3형(건강고지형II(7년))',
                              },
                              {
                                value: '4형(건강고지형II(8년))',
                                label: '4형(건강고지형II(8년))',
                              },
                              {
                                value: '5형(건강고지형II(9년))',
                                label: '5형(건강고지형II(9년))',
                              },
                              {
                                value: '6형(건강고지형II(10년))',
                                label: '6형(건강고지형II(10년))',
                              },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 태아 */}
                    {currentTab?.type === '태아' && (
                      <FormRow>
                        <FormCell title={'태아여부'}>
                          <Grow className="flex gap-3">
                            <Checkbox color="primary">가입</Checkbox>
                            <Checkbox color="primary">다태아</Checkbox>
                            <Checkbox color="primary">수수료선지급</Checkbox>
                          </Grow>
                        </FormCell>
                        <FormCell title={'계약전환'}>
                          <Checkbox color="primary">신청</Checkbox>
                        </FormCell>
                      </FormRow>
                    )}
                    {/* 단체 */}
                    {currentTab?.type === '단체' && (
                      <>
                        <FormRow>
                          <FormCell title={'단체구분'}>
                            <RadioGroup defaultValue="피보험자단계(개별요율)">
                              {[
                                {
                                  value: '피보험자단계(개별요율)',
                                  id: 'group-category-1',
                                  label: '피보험자단계(개별요율)',
                                },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                          <FormCell title={'단체유형'}>
                            <RadioGroup defaultValue="1종(급여단체)">
                              {[
                                { value: '1종(급여단체)', id: 'group-type-1', label: '1종(급여단체)' },
                                { value: '2종(비급여단체)', id: 'group-type-2', label: '2종(비급여단체)' },
                                { value: '3종(임의단체)', id: 'group-type-3', label: '3종(임의단체)' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'총인원수'}>
                            <Input aria-label="총인원" width={50} align="right" value={1000} />
                            명(전체 근로자 수)
                          </FormCell>
                          <FormCell title={'인원현황'}>
                            <Input aria-label="가입인원" width={50} align="right" value={1000} readOnly />명 / 가입비율
                            <Input aria-label="가입비율" width={50} align="right" value={99.99} readOnly />%
                          </FormCell>
                        </FormRow>
                      </>
                    )}
                    {/* 연금저축: 간편모드일 때 납입금액 지정 행 노출 */}
                    {currentTab?.type === '연금저축' && _simpleMode && (
                      <FormRow>
                        <FormCell title={'납입금액'} colSpan={3}>
                          <RadioGroup defaultValue="20만원">
                            {[
                              { value: '20만원', id: 'pension-cycle-monthly', label: '20만원' },
                              { value: '30만원', id: 'pension-cycle-monthly', label: '30만원' },
                              {
                                value: '50만원(최대 세액공제)',
                                id: 'pension-cycle-monthly',
                                label: '50만원(최대 세액공제)',
                              },
                              { value: '100만원', id: 'pension-cycle-monthly', label: '100만원' },
                              { value: '직접입력', id: 'pension-cycle-monthly', label: '직접입력' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                          <Input aria-label="납입금액 직접입력" width={120} value={''} commaAmount readOnly />
                          만원(5~150만원 입력가능)
                        </FormCell>
                      </FormRow>
                    )}
                  </FormTable>

                  {/* 피보험자 관리 탭 및 상세 입력 */}
                  {currentTab?.type !== '연금저축' && (
                    <TabPager
                      variant={'default'}
                      data={tabs}
                      active={active}
                      hasTableBelow={true}
                      setActive={setActive}
                      removable={true}
                      onRemove={handleRemove}
                      visibleCount={5}
                      getValue={(tab) => String(tab.value)}
                      renderTab={(tab) => (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex items-center">
                              <span className="max-w-20 truncate block">{tab.name}</span>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="top" sideOffset={8}>
                            <BulletList className="gap-[0.5rem]">
                              {tab.info.map((info: string, index: number) => (
                                <BulletListItem key={index} type="dot">
                                  {info}
                                </BulletListItem>
                              ))}
                            </BulletList>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      renderButtons={
                        <Grow gap={2.5}>
                          {/* 인보험, 태아, 제물 */}
                          {(currentTab?.type === '일반' ||
                            currentTab?.type === '태아' ||
                            currentTab?.type === '재물피보험자' ||
                            currentTab?.type === '재물목적물') && (
                            <Button color={'gray'} size={'md'} variant={'outlined'}>
                              피보험자
                              <AddIcon color={'var(--color-gray-60)'} />
                            </Button>
                          )}

                          {/* 제물일때 추가 */}
                          {currentTab?.type === '재물피보험자' ||
                            (currentTab?.type === '재물목적물' && (
                              <Button color={'gray'} size={'md'} variant={'outlined'}>
                                목적물
                                <AddIcon color={'var(--color-gray-50)'} />
                              </Button>
                            ))}

                          {/* 단체인 경우만 */}
                          {currentTab?.type === '단체' && (
                            <>
                              <Button color={'gray'} size={'md'} variant={'outlined'}>
                                그룹추가
                                <AddIcon color={'var(--color-gray-50)'} />
                              </Button>
                              <Button color={'gray'} size={'md'} variant={'outlined'}>
                                단쳬입력
                              </Button>
                              <Button color={'gray'} size={'md'} variant={'outlined'}>
                                단체규약
                              </Button>
                            </>
                          )}
                        </Grow>
                      }
                    >
                      {/* 인보험 */}
                      <FormTable lineTop={false} cols={['w-[12rem]', 'w-[40%]', 'w-[12rem]', 'w-[auto]']}>
                        {(currentTab?.type === '일반' ||
                          currentTab?.type === '태아' ||
                          currentTab?.type === '재물피보험자') && (
                          <>
                            {_simpleMode ? (
                              <FormRow>
                                <FormCell title="피보험자" titleVariant="section">
                                  <InputCombo
                                    clear={true}
                                    onChange={() => {}}
                                    options={[
                                      { label: <td>박은빈</td>, value: '박은빈' },
                                      { label: <td>김은빈</td>, value: '김은빈' },
                                      { label: <td>최은빈</td>, value: '최은빈' },
                                      { label: <td>안은빈</td>, value: '안은빈' },
                                      { label: <td>조은빈</td>, value: '조은빈' },
                                    ]}
                                    col={2}
                                    required
                                    value=""
                                    width={84}
                                  />
                                  <Button
                                    aria-label="피보험자 검색"
                                    variant={'outlined'}
                                    only="icon"
                                    size={'lg'}
                                    color={'gray-light'}
                                  >
                                    <SearchIcon color={'var(--color-primary-50)'} />
                                  </Button>
                                  <RadioGroup defaultValue="man">
                                    {[
                                      { value: 'man', label: '남' },
                                      { value: 'woman', label: '여' },
                                    ].map((option) => (
                                      <RadioGroupItem key={option.value} value={option.value}>
                                        {option.label}
                                      </RadioGroupItem>
                                    ))}
                                  </RadioGroup>
                                </FormCell>
                                <FormCell title="연령" tdClassName="gap-3">
                                  <Grow>
                                    <Input aria-label="피보험자 나이" width={40} align="right" required />세
                                  </Grow>
                                  <DatePickerInput mode={'single'} required />
                                </FormCell>
                              </FormRow>
                            ) : (
                              <FormRow>
                                <FormCell
                                  colSpan={3}
                                  title={'피보험자'}
                                  titleVariant="section"
                                  tdClassName="justify-between flex-wrap"
                                >
                                  <Grow placement="sc">
                                    <Input aria-label="피보험자명" width={84} value={'김환화환화'} readOnly />
                                    <Input
                                      aria-label="주민등록번호 마스킹"
                                      width={114}
                                      value={'000000-0******'}
                                      readOnly
                                    />
                                    <Button
                                      aria-label="피보험자 검색"
                                      variant={'outlined'}
                                      only="icon"
                                      size={'lg'}
                                      color={'gray-light'}
                                    >
                                      <SearchIcon color={'var(--color-primary-50)'} />
                                    </Button>
                                    <Input
                                      aria-label="피보험자 나이"
                                      width={53}
                                      value={'134세'}
                                      align="right"
                                      readOnly
                                    />
                                    <Input aria-label="피보험자 성별" width={32} value={'남'} align="center" readOnly />
                                  </Grow>
                                  <Grow gap={2.5}>
                                    <KeyValueItem label={'상령일'}>
                                      <Typo weight={'bold'}>2023-01-12</Typo>
                                      <Badge color={'blue'} size={'md'} variant={'contained'}>
                                        D-31
                                      </Badge>
                                    </KeyValueItem>

                                    {/* 태아는 설계동의 없음 */}
                                    {currentTab?.type !== '태아' && (
                                      <KeyValueItem label={'설계동의'}>
                                        <Typo weight={'bold'}>2023-01-12</Typo>
                                        <Badge color={'red'} size={'md'} variant={'contained'}>
                                          D-31
                                        </Badge>
                                      </KeyValueItem>
                                    )}
                                    <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                      알림톡발송
                                    </Button>
                                  </Grow>
                                </FormCell>
                              </FormRow>
                            )}

                            <FormRow>
                              <FormCell title="직업" colSpan={3}>
                                <Input aria-label="직업코드" width={56} value={'32254'} align="center" readOnly />
                                <Input
                                  aria-label="직업분류"
                                  width={274}
                                  value={'소규모상점경영및읽선관리종사원'}
                                  readOnly
                                />
                                <Button
                                  aria-label="피보험자 검색"
                                  variant={'outlined'}
                                  only="icon"
                                  size={'lg'}
                                  color={'gray-light'}
                                >
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <NativeSelect aria-label="등급" width={60} className="ml-[0.4rem]">
                                  {[
                                    { value: '1급', label: '1급' },
                                    { value: '2급', label: '2급' },
                                    { value: '3급', label: '3급' },
                                  ].map((option, index) => (
                                    <NativeSelectOption key={'등급' + index} value={option.value}>
                                      {option.label}
                                    </NativeSelectOption>
                                  ))}
                                </NativeSelect>
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title="운전형태">
                                <RadioGroup defaultValue="자가용">
                                  {[
                                    { value: '자가용', label: '자가용' },
                                    { value: '영업용', label: '영업용' },
                                    { value: '비운전자', label: '비운전자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.value} value={option.value}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </FormCell>
                              <FormCell title="이륜차">
                                <RadioGroup defaultValue="운전함">
                                  {[
                                    { value: '운전함', label: '운전함' },
                                    { value: '운전안함', label: '운전안함' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.value} value={option.value}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title="주피와 관계" colSpan={currentTab?.type === '재물피보험자' ? 3 : 1}>
                                <Input aria-label="피보험자명" width={84} value={'김한화'} readOnly />는
                                <NativeSelect
                                  aria-label="주피와 관계 선택"
                                  width={156}
                                  className="ml-[0.4rem]"
                                  required
                                >
                                  {[
                                    { value: '본인', id: 'motorcycle-drives', label: '본인' },
                                    { value: '배우자', id: 'motorcycle-nondriver', label: '배우자' },
                                  ].map((option, index) => (
                                    <NativeSelectOption key={'주피와관계' + index} value={option.value}>
                                      {option.label}
                                    </NativeSelectOption>
                                  ))}
                                </NativeSelect>
                              </FormCell>

                              {currentTab?.type !== '재물피보험자' && (
                                <FormCell title="(실손)동시설계">
                                  <Input aria-label="코드" width={131} value={'LA12345678901234'} readOnly />
                                  <Input aria-label="코드" width={120} value={11189492940} commaAmount readOnly />
                                </FormCell>
                              )}
                            </FormRow>
                          </>
                        )}
                        {(currentTab?.type === '일반' || currentTab?.type === '태아') && (
                          <FormRow>
                            <FormCell title={'할인적용'} colSpan={currentTab?.type === '태아' ? 1 : 3}>
                              <Checkbox color="primary">가족연계할인</Checkbox>
                              <Button
                                aria-label="피보험자 검색"
                                variant="outlined"
                                only="icon"
                                size="lg"
                                color="gray-light"
                              >
                                <SearchIcon color="var(--color-primary-50)" />
                              </Button>
                            </FormCell>

                            {currentTab?.type === '태아' && (
                              <FormCell title="임신주수">
                                <Input aria-label="임신주수" width={32} align="right" value={'20'} required />
                                주 (출산예정일
                                <DatePickerInput mode={'single'} value={'2026-03-10'} required />)
                              </FormCell>
                            )}
                          </FormRow>
                        )}
                        {currentTab?.type === '재물목적물' && (
                          <>
                            <FormRow>
                              {_simpleMode ? (
                                <FormCell colSpan={3} title={'소유자'} titleVariant="section">
                                  <Input aria-label="소유자명" width={84} value={'김환화'} readOnly />
                                  <Button
                                    aria-label="소유자 검색"
                                    variant={'outlined'}
                                    only="icon"
                                    size={'lg'}
                                    color={'gray-light'}
                                  >
                                    <SearchIcon color={'var(--color-primary-50)'} />
                                  </Button>
                                  <Button variant={'outlined'} size={'lg'} color={'gray-light'}>
                                    고객등록
                                  </Button>
                                </FormCell>
                              ) : (
                                <FormCell colSpan={3} title={'소유자'} titleVariant="section">
                                  <Grow className="flex-nowrap w-full" placement={'bwc'}>
                                    <Grow placement="sc">
                                      <Input aria-label="소유자명" width={84} value={'김환화'} readOnly />
                                      <Input
                                        aria-label="주민등록번호 마스킹"
                                        width={114}
                                        value={'000000-0******'}
                                        readOnly
                                      />
                                      <Button
                                        aria-label="소유자 검색"
                                        variant={'outlined'}
                                        only="icon"
                                        size={'lg'}
                                        color={'gray-light'}
                                      >
                                        <SearchIcon color={'var(--color-primary-50)'} />
                                      </Button>
                                      <Input
                                        aria-label="소유자 나이"
                                        width={53}
                                        value={'134세'}
                                        align="right"
                                        readOnly
                                      />
                                      <Input aria-label="소유자 성별" width={32} value={'남'} align="center" readOnly />
                                    </Grow>
                                    <Grow gap={2}>
                                      <Checkbox color="primary">계약자와 동일</Checkbox>
                                      <Grow>
                                        (<Checkbox color="primary">자택</Checkbox>
                                        <Checkbox color="primary">직장</Checkbox>
                                        <Button color={'gray'} size={'md'} variant={'contained'}>
                                          가져오기
                                        </Button>
                                        )
                                      </Grow>
                                    </Grow>
                                  </Grow>
                                </FormCell>
                              )}
                            </FormRow>
                            <FormRow>
                              {_simpleMode ? (
                                <FormCell title="소재지" colSpan={3}>
                                  <Input aria-label="목적물명" width={84} value={'목적물1'} />
                                </FormCell>
                              ) : (
                                <FormCell title="소재지" colSpan={3} tdClassName="grid grid-cols-[auto_auto_1fr]">
                                  <Input aria-label="목적물명" width={84} value={'목적물1'} />
                                  <Button
                                    aria-label="목적물 주소찾기"
                                    variant={'outlined'}
                                    size={'lg'}
                                    color={'gray-light'}
                                  >
                                    주소찾기
                                  </Button>
                                  <Grid className="grid-cols-[1fr_1fr_1fr]">
                                    <Input aria-label="목적물 소재지" width={'auto'} readOnly />
                                    <Input aria-label="목적물 소재지" width={'auto'} />
                                    <Input aria-label="목적물 소재지" width={'auto'} readOnly />
                                  </Grid>
                                </FormCell>
                              )}
                            </FormRow>
                            <FormRow>
                              <FormCell title="가입업종" tdClassName="grid grid-cols-[auto_auto_1fr]">
                                <Input aria-label="가입업종코드" width={76} value={'12345'} readOnly />
                                <Button
                                  aria-label="가입업종 검색"
                                  variant={'outlined'}
                                  only="icon"
                                  size={'lg'}
                                  color={'gray-light'}
                                >
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="가입업종명" value={'학원(기원및 교육목적의 가죽목공방'} readOnly />
                              </FormCell>
                              <FormCell title="건물급수">
                                {_simpleMode ? (
                                  <NativeSelect aria-label="건물급수 선택" width={'auto'} required>
                                    {[{ value: '1급', id: '1급', label: '1급' }].map((option) => (
                                      <NativeSelectOption key={option.id} value={option.value}>
                                        {option.label}
                                      </NativeSelectOption>
                                    ))}
                                  </NativeSelect>
                                ) : (
                                  <>
                                    <Input aria-label="건물급수" width={26} align="right" value={'2'} readOnly /> 급
                                    (적용급수
                                    <Input aria-label="적용급수" width={26} align="right" value={'2'} readOnly /> 급)
                                    <Button
                                      aria-label="건물구조입력"
                                      variant={'outlined'}
                                      size={'lg'}
                                      color={'gray-light'}
                                    >
                                      건물구조입력
                                    </Button>
                                  </>
                                )}
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell
                                title="요율적용업종"
                                tdClassName="grid grid-cols-[auto_1fr]"
                                colSpan={_simpleMode ? 3 : 1}
                              >
                                <Input aria-label="요율적용업종코드" width={76} value={'12345'} readOnly />
                                <Input
                                  aria-label="요율적용업종명"
                                  value={'학원(기원및 교육목적의 가죽목공방'}
                                  readOnly
                                />
                              </FormCell>
                              {!_simpleMode && (
                                <FormCell title="건물상세">
                                  지상 <Input aria-label="건물 지상층" width={40} align="right" value={'2'} readOnly />{' '}
                                  층 / 지하
                                  <Input aria-label="건물 지하층" width={26} align="center" value={'1'} readOnly /> 층 /
                                  <Input aria-label="건물 폭" width={40} align="right" value={'100'} readOnly /> ㎡
                                </FormCell>
                              )}
                            </FormRow>
                            <FormRow>
                              <FormCell title="실손보상구분">
                                <NativeSelect aria-label="실손보상구분" width={200} required>
                                  {[{ value: 'selection', id: 'property-reimbursement-1', label: '선택' }].map(
                                    (option) => (
                                      <NativeSelectOption key={option.id} value={option.value}>
                                        {option.label}
                                      </NativeSelectOption>
                                    )
                                  )}
                                </NativeSelect>
                                <Button aria-label="알림톡발송" variant={'outlined'} size={'lg'} color={'gray-light'}>
                                  알림톡발송
                                </Button>
                                <Checkbox color="primary">소화기 있음</Checkbox>
                              </FormCell>
                              <FormCell title="기타상세">
                                <Grow gap={3}>
                                  <Checkbox color="primary">
                                    <Button aria-label="특수건물" variant={'outlined'} size={'lg'} color={'gray-light'}>
                                      특수건물
                                    </Button>
                                  </Checkbox>
                                  <Checkbox color="primary">
                                    <Button aria-label="복합건물" variant={'outlined'} size={'lg'} color={'gray-light'}>
                                      복합건물
                                    </Button>
                                  </Checkbox>
                                </Grow>
                              </FormCell>
                            </FormRow>
                          </>
                        )}
                        {currentTab?.type === '단체' && (
                          <>
                            <FormRow>
                              <FormCell title={'그룹명'} titleVariant="section">
                                <Input aria-label="그룹명" />
                              </FormCell>
                              <FormCell title="보험나이">
                                <Input aria-label="보험나이" width={40} align="right" />세
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title="성별">
                                <RadioGroup defaultValue="남">
                                  {[
                                    { value: '남', id: 'group-gender-male', label: '남' },
                                    { value: '여', id: 'group-gender-female', label: '여' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </FormCell>
                              <FormCell title="인원">
                                <Input aria-label="인원" width={60} align="right" />명
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title="직업" colSpan={3}>
                                <Input aria-label="직업코드" width={56} value={'32254'} readOnly />
                                <Input
                                  aria-label="직업분류"
                                  width={274}
                                  value={'소규모상점경영및읽선관리종사원'}
                                  readOnly
                                />
                                <Button
                                  aria-label="피보험자 검색"
                                  variant={'outlined'}
                                  only="icon"
                                  size={'lg'}
                                  color={'gray-light'}
                                >
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <NativeSelect aria-label="등급" width={60} className="ml-[0.4rem]">
                                  {[
                                    { value: '1급', label: '1급' },
                                    { value: '2급', label: '2급' },
                                    { value: '3급', label: '3급' },
                                  ].map((option, index) => (
                                    <NativeSelectOption key={'등급' + index} value={option.value}>
                                      {option.label}
                                    </NativeSelectOption>
                                  ))}
                                </NativeSelect>
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title="운전형태" colSpan={3}>
                                <RadioGroup defaultValue="자가용">
                                  {[
                                    { value: '자가용', id: 'group-driving-type-private', label: '자가용' },
                                    { value: '영업용', id: 'group-driving-type-commercial', label: '영업용' },
                                    { value: '비운전자', id: 'group-driving-type-nondriver', label: '비운전자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </FormCell>
                            </FormRow>
                          </>
                        )}
                      </FormTable>
                    </TabPager>
                  )}

                  {/* 계약자 정보 : 상세모드일때 / 간편모드&연금저축일때 */}
                  {(!_simpleMode || (_simpleMode && currentTab?.type === '연금저축')) && (
                    <FormTable caption="계약자 정보" cols={['w-[12rem]', 'w-[40%]', 'w-[12rem]', 'w-[auto]']}>
                      {_simpleMode ? (
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section">
                            <InputCombo
                              clear={true}
                              onChange={() => {}}
                              options={[
                                { label: <td>박은빈</td>, value: '박은빈' },
                                { label: <td>김은빈</td>, value: '김은빈' },
                                { label: <td>최은빈</td>, value: '최은빈' },
                                { label: <td>안은빈</td>, value: '안은빈' },
                                { label: <td>조은빈</td>, value: '조은빈' },
                              ]}
                              col={2}
                              required
                              value=""
                              width={84}
                            />
                            <Button
                              aria-label="피보험자 검색"
                              variant={'outlined'}
                              only="icon"
                              size={'lg'}
                              color={'gray-light'}
                            >
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                          </FormCell>
                          <FormCell title="생년월일">
                            <DatePickerInput mode={'single'} required />
                          </FormCell>
                        </FormRow>
                      ) : (
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section" colSpan={3}>
                            <Input aria-label="피보험자명" width={84} value={'김환화'} readOnly />
                            <Input aria-label="주민등록번호 마스킹" width={114} value={'000000-0******'} readOnly />
                            <Button
                              aria-label="피보험자 검색"
                              variant={'outlined'}
                              only="icon"
                              size={'lg'}
                              color={'gray-light'}
                            >
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>

                            <Checkbox color="primary" />
                            <Button variant={'none'} className="px-0">
                              개인사업자
                            </Button>
                          </FormCell>
                        </FormRow>
                      )}

                      {currentTab?.type !== '재물목적물' && (
                        <FormRow>
                          <FormCell title={currentTab?.type !== '연금저축' ? '계약자와 관계' : '주피와 관계'}>
                            <Input aria-label="피보험자명" width={84} value={'김한화'} readOnly />는{' '}
                            {currentTab?.type !== '연금저축' ? '계약자의' : ''}
                            <NativeSelect aria-label="주피와 관계 선택" width={'auto'} className="ml-[0.4rem]" required>
                              {[
                                { value: '본인', id: 'motorcycle-drives', label: '본인' },
                                { value: '배우자', id: 'motorcycle-nondriver', label: '배우자' },
                              ].map((option, index) => (
                                <NativeSelectOption key={'주피와관계' + index} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="개인정보취득경로">
                            <NativeSelect aria-label="개인정보취득경로 선택" width={'auto'} required>
                              {[
                                { value: '선택', id: 'personalinfo-1', label: '선택' },
                                { value: '다른경로', id: 'personalinfo-2', label: '다른경로' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                      )}

                      <FormRow>
                        <FormCell title="자택(소재지)" colSpan={3}>
                          경상남도 진주시 경기도 부천시 원미구 역곡동 경기도 평택시 팽성읍 (하대동)
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="직장(본사)" colSpan={3}></FormCell>
                      </FormRow>

                      <FormRow>
                        <FormCell title="연락처">
                          <Grow placement="bwc">
                            <Grow>010-0000-0000</Grow>
                            <KeyValueItem label="전자적안내동의">
                              <Grow placement="sc">
                                <Badge color="green" size="md">
                                  Y
                                </Badge>
                                <Badge color="red" size="md">
                                  N
                                </Badge>
                                <TooltipQ>{tooltipContents[0]}</TooltipQ>
                              </Grow>
                            </KeyValueItem>
                          </Grow>
                        </FormCell>
                        <FormCell title="이메일">example@example.com</FormCell>
                      </FormRow>

                      <FormRow>
                        <FormCell title="보험차익비과세">
                          <Checkbox color="primary">가입</Checkbox>
                          <NativeSelect
                            aria-label="보험차익비과세 선택"
                            width={'auto'}
                            required
                            className="ml-[0.4rem]"
                          >
                            {[
                              { value: '월납식비과세', id: 'monthly-payment-monthly', label: '월납식비과세' },
                              {
                                value: '비월납식비과세',
                                id: 'monthly-payment-nonemonthly',
                                label: '비월납식비과세',
                              },
                            ].map((option) => (
                              <NativeSelectOption key={option.id} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                          <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                            알림톡발송
                          </Button>
                        </FormCell>
                        <FormCell title="설계금액/잔여한도">
                          <Input aria-label="설계금액" width={70} value={12033} commaAmount readOnly />
                          /
                          <Input aria-label="잔여한도" width={70} value={4435} commaAmount readOnly />
                          <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                            조회
                          </Button>
                        </FormCell>
                      </FormRow>
                    </FormTable>
                  )}
                </Gcol>
              </LayoutScrollItem>
            </LayoutScrollWrap>
          </LayoutMainBody>
          <LayoutMainFoot>
            {/* 하단 저장/동영상 매뉴얼 풋라인 영역 */}
            {/* M1. variant="box" 추가 */}
            <MainBottom variant="box">
              <MainBottomItem className="bg-[var(--color-gray-5)]">
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  동영상매뉴얼
                </Button>
                <Grow>
                  <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                    저장
                  </Button>
                </Grow>
              </MainBottomItem>
            </MainBottom>
          </LayoutMainFoot>
        </LayoutMain>
      }
    />
  );
};
