/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { Grow, Gcol, Typo } from '@atoms';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroupItem, CheckboxGroup } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TooltipQ } from '@common/TooltipQ';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { LayoutMain, LayoutScrollWrap, LayoutMainFoot, LayoutMainBody, LayoutScrollItem } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';

interface TabDataType {
  id: string | number;
  name?: string;
  age?: string | number;
  gender?: string;
  value: string;
  error?: boolean;
  info: string[];
}
const TabData: TabDataType[] = [
  {
    id: 1,
    name: '홍길동',
    age: '1',
    gender: '여',
    value: 'tab1',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 2,
    name: '목적물',
    age: '1',
    gender: '',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 3,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 4,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 5,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 6,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 7,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 8,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 9,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 10,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 11,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 12,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 13,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 14,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 15,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 16,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 17,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 18,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 19,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
  {
    id: 20,
    name: '반짝빛나리반짝빛나리',
    age: '2',
    gender: '남',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 21,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
];

export const Ltpa35005 = () => {
  const tabListData = TabData;
  const stringifiedTabs: TabDataType[] = tabListData.map((item) => ({
    ...item,
    value: String(item.id),
  }));
  const { tabs: Tabs, active: TabActive, setActive: TabSetActive } = useTabs<TabDataType>(stringifiedTabs);

  const [firstPay, setFirstPay] = React.useState<string>('선택');
  const [morePay, setMorePay] = React.useState<string>('선택');
  const isSimilarContractCheckRequired = true; //4-1 특정조건인 경우 문구 노출

  const is노후실손자동재가입동의 = true;
  const is해지방지휴대폰결제 = true;

  return (
    <LayoutTemplateLTPA350MainBody
      mainBody={
        <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem] h-full w-full [&_th]:break-keep">
          <LayoutMainBody>
            <LayoutScrollWrap>
              <LayoutScrollItem>
                <Gcol placement={'ss'} className="w-full overflow-x-hidden" gap={3}>
                  <FormTable cols={['w-[15.6rem]', 'w-[25rem]', 'w-[13.8rem]', 'w-[auto]']}>
                    <FormRow>
                      <FormCell title={'만기수익자'} colSpan={3}>
                        <NativeSelect aria-label="주피와 관계 선택" width={100} className="ml-[0.4rem]">
                          {[
                            { value: '본인', label: '본인' },
                            { value: '본인', label: '본인' },
                          ].map((option, index) => (
                            <NativeSelectOption key={'만기수익자' + index} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input aria-label="만기수익자 주민등록번호" width={114} value={'000000-0******'} readOnly />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="만기수익자 이름" width={84} value={'김한화'} readOnly />
                        <NativeSelect aria-label="만기수익자 은행선택" width={100} className="ml-[0.4rem]">
                          {[
                            { value: '은행선택', label: '은행선택' },
                            { value: '우리은행', label: '우리은행' },
                          ].map((option, index) => (
                            <NativeSelectOption key={'만기수익자 은행선택' + index} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Input aria-label="은행 계좌번호" width={190} placeholder={'계좌번호 입력'} value={''} />
                        <Button color={'secondary'} only={'default'} size={'lg'} variant={'outlined'}>
                          계좌확인
                        </Button>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'우편물수령처'} colSpan={3}>
                        <RadioGroup defaultValue="자택" required>
                          {[
                            { value: '자택', label: '자택' },
                            { value: '직장', label: '직장' },
                          ].map((option) => (
                            <RadioGroupItem key={option.value} value={option.value}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                        <Grow className="pl-2">
                          부산 사하구 경기도 남양주시 도농동 서울특별시 종로구 평창동 (하단동)
                        </Grow>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell
                        title={
                          <div>
                            전자적 안내동의
                            <TooltipQ>
                              문서서명/TM은 청약서상 고객이 청약서로 [전자적 방법의 안내동의여부]에 기재한 내용을
                              화면에서 선택하시면 됩니다.
                              <br />
                              전자서명/전자청약은 전자적 안내동의가 필수사항입니다.
                            </TooltipQ>
                          </div>
                        }
                      >
                        <RadioGroup defaultValue="동의함" required>
                          {[
                            { value: '동의함', label: '동의함' },
                            { value: '동의안함', label: '동의안함' },
                          ].map((option) => (
                            <RadioGroupItem key={option.value} value={option.value}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'서명방법'}>
                        <Grow placement="bwc">
                          <RadioGroup defaultValue="문서서명">
                            {[
                              { value: '문서서명', label: '문서서명' },
                              { value: '태블릿', label: '태블릿' },
                              { value: '휴대폰', label: '휴대폰' },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                          <Checkbox color="primary">조회동일여부</Checkbox>
                        </Grow>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'증권전달방법'}>
                        <RadioGroup defaultValue="모바일" required>
                          {[
                            { value: '모바일', label: '모바일' },
                            { value: '우편', label: '우편' },
                          ].map((option) => (
                            <RadioGroupItem key={option.value} value={option.value}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                      <FormCell
                        title={
                          <div className="leading-[1.2]">
                            승환계약여부
                            <br />
                            <Typo variant={'body-xs'}>(당·타사 승환예정 포함)</Typo>
                          </div>
                        }
                        rowSpan={2}
                        titleRowSpan={2}
                      >
                        <Grow className="w-full" placement="ss">
                          <RadioGroup defaultValue="아니요" className="w-full" width={'full'}>
                            <Gcol placement="se" className="w-full">
                              <Grow className="w-full flex-wrap" placement="sc">
                                <RadioGroupItem value="예">예</RadioGroupItem>
                                <Grow className="whitespace-nowrap">
                                  (승환(
                                  <Input aria-label="" width={40} value={'13'} align="right" readOnly />
                                  )건,
                                </Grow>
                                <Grow className="whitespace-nowrap">
                                  승환예정(
                                  <Input aria-label="" width={40} value={'333'} align="right" readOnly />
                                  )건)
                                </Grow>
                              </Grow>
                              {/* //M1. 정렬관련 수정 */}
                              <Grow placement="bwc" className="w-full">
                                <RadioGroupItem value="아니요">
                                  아니요
                                  {isSimilarContractCheckRequired && '(타사 정상 유사계약현황 확인 필수)'}
                                </RadioGroupItem>

                                <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                  유사계약현황
                                </Button>
                              </Grow>
                            </Gcol>
                          </RadioGroup>
                        </Grow>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'약관유형'}>
                        <Grow gap={2}>
                          <RadioGroup defaultValue="모바일" required>
                            {[
                              { value: '모바일', label: '모바일' },
                              { value: '인쇄약관', label: '인쇄약관' },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                          <Button color={'secondary'} size={'lg'} variant={'contained'} onClick={() => {}}>
                            M발송
                          </Button>
                        </Grow>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'수익자 지정·변경 추가약정'}>
                        <Grow placement="bwc">
                          <RadioGroup defaultValue="약정함" required>
                            {[
                              { value: '약정함', label: '약정함' },
                              { value: '약정안함', label: '약정안함' },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                            알림톡발송
                          </Button>
                        </Grow>
                      </FormCell>
                      <FormCell
                        title={
                          <div className="leading-[1.2]">
                            조세규정확인대상
                            <br />
                            <Typo variant={'body-xs'}>(FATCA/CRS)</Typo>
                          </div>
                        }
                      >
                        <Grow placement="bwc">
                          <RadioGroup defaultValue="해당사항없음">
                            {[
                              { value: '해당사항없음', label: '해당사항없음' },
                              { value: '해당함', label: '해당함' },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                          {/* M5. 버튼명 수정 */}
                          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                            FATCA/CRA정보
                          </Button>
                        </Grow>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'영수일자 (보험시기)'}>
                        <DatePickerInput mode={'single'} required />
                      </FormCell>
                      <FormCell title={'실소유자 확인'}>
                        <Grow placement="bwc">
                          <RadioGroup defaultValue="계약자가 실소유자임" required>
                            {[
                              { value: '계약자가 실소유자임', label: '계약자가 실소유자임' },
                              { value: '실소유자 아님', label: '실소유자 아님' },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                          <Grow placement="ss">
                            <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                              CDD등록
                            </Button>
                            <Button color={'secondary'} size={'lg'} variant={'contained'} onClick={() => {}}>
                              EDD등록
                            </Button>
                          </Grow>
                        </Grow>
                      </FormCell>
                    </FormRow>

                    <FormRow>
                      <FormCell
                        title={
                          <div>
                            성년후견인 지정여부
                            <TooltipQ>
                              <b>성년후견제도란?</b>
                              <br /> 정신적 제약으로 보호가 필요한 성인의 권익보호와 지원을 위해 마련된 제도로, 보호가
                              필요한 성인의 정신능력정도 등에 따라 성년/한정/특정/임의후견으로
                              나뉨(민법제9조,제12조,제14조의2 및 제959조의 14)
                            </TooltipQ>
                          </div>
                        }
                      >
                        <NativeSelect aria-label="통신사" width={130} readOnly>
                          {[
                            { value: '해당사항 없음', label: '해당사항 없음' },
                            { value: '계약자', label: '계약자' },
                            { value: '피보험자', label: '피보험자' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'장애인보험 전환'}>
                        <Grow placement="bwc">
                          <CheckboxGroup color="primary" minSelected={0} size="lg" width="auto" variant="default">
                            {[
                              { label: '피보험자장애인', value: '1' },
                              { label: '수익자장애인', value: '2' },
                            ].map((category) => (
                              <CheckboxGroupItem key={category.value} value={category.value}>
                                {category.label}
                              </CheckboxGroupItem>
                            ))}
                          </CheckboxGroup>
                          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                            알림톡발송
                          </Button>
                        </Grow>
                      </FormCell>
                    </FormRow>

                    {is노후실손자동재가입동의 && (
                      <FormRow>
                        <FormCell title={'노후실손 자동재가입동의'} colSpan={3}>
                          {/* <FormCell title={'당월해지 자동이체 신청'}> */}
                          <Grow placement="sc" gap={3}>
                            <RadioGroup defaultValue="동의함" required>
                              {[
                                { value: '동의함', label: '동의함' },
                                { value: '동의안함', label: '동의안함' },
                              ].map((option) => (
                                <RadioGroupItem key={option.value} value={option.value}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </Grow>
                        </FormCell>
                      </FormRow>
                    )}

                    <FormRow>
                      <FormCell title={'당월해지 자동이체 신청'} colSpan={is해지방지휴대폰결제 ? 1 : 3}>
                        {/* <FormCell title={'당월해지 자동이체 신청'}> */}
                        <Grow placement="sc" gap={2}>
                          <RadioGroup defaultValue="동의함" required>
                            {[
                              { value: '동의함', label: '동의함' },
                              { value: '동의안함', label: '동의안함' },
                            ].map((option) => (
                              <RadioGroupItem key={option.value} value={option.value}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                            알림톡발송
                          </Button>
                        </Grow>
                      </FormCell>
                      {is해지방지휴대폰결제 && (
                        <FormCell title={'해지 방지 휴대폰 결제'}>
                          <Grow placement="bwc">
                            <Grow placement="sc" gap={2}>
                              <RadioGroup defaultValue="동의함" required>
                                {[
                                  { value: '동의함', label: '동의함' },
                                  { value: '동의안함', label: '동의안함' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.value} value={option.value}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                              <NativeSelect aria-label="통신사" width={100}>
                                {[
                                  { value: '통신사', label: '통신사' },
                                  { value: '통신사2', label: '통신사2' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.value} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </Grow>
                            <Grow>
                              <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                알림톡발송
                              </Button>
                            </Grow>
                          </Grow>
                        </FormCell>
                      )}
                    </FormRow>
                  </FormTable>

                  <FormTable cols={['w-[9.6rem]', 'w-[40%]', 'w-[9rem]', 'w-[auto]']}>
                    <FormRow>
                      <FormCell title={'초회보험료'} tdClassName="justify-between">
                        <NativeSelect
                          aria-label="납부방법 선택"
                          width={100}
                          required
                          value={firstPay}
                          onChange={(e) => setFirstPay(e.target.value)}
                        >
                          {[
                            { value: '선택', label: '선택' },
                            { value: '즉시이체', label: '즉시이체' },
                            { value: '현금', label: '현금' },
                            { value: '카드납입', label: '카드납입' },
                            { value: '예약이체', label: '예약이체' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        {firstPay === '예약이체' && (
                          <Grow gap={2} placement="ec">
                            이체일(보험시기)
                            <Input value={'2025-01-01'} width={90} readOnly />
                          </Grow>
                        )}
                      </FormCell>
                      <FormCell title="계속 보험료">
                        <Grow gap={1}>
                          <NativeSelect
                            aria-label="연속이체 선택"
                            width={100}
                            required
                            value={morePay}
                            onChange={(e) => setMorePay(e.target.value)}
                          >
                            {[
                              { value: '선택', label: '선택' },
                              { value: '자동이체', label: '자동이체' },
                              { value: '급여이체', label: '급여이체' },
                              { value: '방문', label: '방문' },
                              { value: '카드이체', label: '카드이체' },
                              { value: '지로', label: '지로' },
                            ].map((option) => (
                              <NativeSelectOption key={option.value} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                          <Checkbox color="primary">조회동일여부</Checkbox>
                        </Grow>
                      </FormCell>
                    </FormRow>
                    {(firstPay !== '선택' || morePay !== '선택') && (
                      <>
                        <FormRow>
                          {firstPay === '선택' && <FormCell title=""></FormCell>}
                          {firstPay === '즉시이체' && (
                            <FormCell title="예금주관계">
                              <Grow gap={1}>
                                <NativeSelect aria-label="연속이체 선택" width={80}>
                                  {[{ value: '본인', label: '본인' }].map((option) => (
                                    <NativeSelectOption key={option.value} value={option.value}>
                                      {option.label}
                                    </NativeSelectOption>
                                  ))}
                                </NativeSelect>
                                <RadioGroup defaultValue="개인" disabled>
                                  {[
                                    { value: '개인', label: '개인' },
                                    { value: '사업자', label: '사업자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.value} value={option.value} id={option.value}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </Grow>
                            </FormCell>
                          )}
                          {firstPay === '현금' && (
                            <FormCell title="">
                              <Grow gap={1}>
                                <RadioGroup defaultValue="개인" disabled>
                                  {[
                                    { value: '개인', label: '개인' },
                                    { value: '사업자', label: '사업자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.value} value={option.value} id={option.value}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </Grow>
                            </FormCell>
                          )}
                          {firstPay === '카드납입' && (
                            <FormCell title="카드주관계">
                              <Grow gap={1}>
                                <NativeSelect aria-label="연속이체 선택" width={80}>
                                  {[{ value: '본인', label: '본인' }].map((option) => (
                                    <NativeSelectOption key={option.value} value={option.value}>
                                      {option.label}
                                    </NativeSelectOption>
                                  ))}
                                </NativeSelect>
                                <RadioGroup defaultValue="개인" disabled>
                                  {[
                                    { value: '개인', label: '개인' },
                                    { value: '사업자', label: '사업자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.value} value={option.value} id={option.value}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </Grow>
                            </FormCell>
                          )}
                          {firstPay === '예약이체' && (
                            <FormCell title="예금주관계">
                              <Grow gap={1}>
                                <NativeSelect aria-label="연속이체 선택" width={80}>
                                  {[{ value: '본인', label: '본인' }].map((option) => (
                                    <NativeSelectOption key={option.value} value={option.value}>
                                      {option.label}
                                    </NativeSelectOption>
                                  ))}
                                </NativeSelect>
                                <RadioGroup defaultValue="개인" disabled>
                                  {[
                                    { value: '개인', label: '개인' },
                                    { value: '사업자', label: '사업자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.value} value={option.value} id={option.value}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </Grow>
                            </FormCell>
                          )}

                          {morePay === '자동이체' && (
                            <FormCell title="예금주관계">
                              <Grow gap={1}>
                                <NativeSelect aria-label="연속이체 선택" width={80}>
                                  {[{ value: '본인', label: '본인' }].map((option) => (
                                    <NativeSelectOption key={option.value} value={option.value}>
                                      {option.label}
                                    </NativeSelectOption>
                                  ))}
                                </NativeSelect>
                                <RadioGroup defaultValue="개인" disabled>
                                  {[
                                    { value: '개인', label: '개인' },
                                    { value: '사업자', label: '사업자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.value} value={option.value} id={option.value}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </Grow>
                            </FormCell>
                          )}
                          {morePay === '급여이체' && (
                            <FormCell title="직원관계">
                              <Grow gap={1}>
                                <NativeSelect aria-label="연속이체 선택" width={80}>
                                  {[{ value: '본인', label: '본인' }].map((option) => (
                                    <NativeSelectOption key={option.value} value={option.value}>
                                      {option.label}
                                    </NativeSelectOption>
                                  ))}
                                </NativeSelect>
                                <RadioGroup defaultValue="개인" disabled>
                                  {[
                                    { value: '개인', label: '개인' },
                                    { value: '사업자', label: '사업자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.value} value={option.value} id={option.value}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </Grow>
                            </FormCell>
                          )}
                          {morePay === '카드이체' && (
                            <FormCell title="카드주관계">
                              <Grow gap={1}>
                                <NativeSelect aria-label="연속이체 선택" width={80}>
                                  {[{ value: '본인', label: '본인' }].map((option) => (
                                    <NativeSelectOption key={option.value} value={option.value}>
                                      {option.label}
                                    </NativeSelectOption>
                                  ))}
                                </NativeSelect>
                                <RadioGroup defaultValue="개인" disabled>
                                  {[
                                    { value: '개인', label: '개인' },
                                    { value: '사업자', label: '사업자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.value} value={option.value} id={option.value}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </Grow>
                            </FormCell>
                          )}

                          {(morePay === '선택' || morePay === '지로' || morePay === '방문') && (
                            <FormCell title=""></FormCell>
                          )}
                        </FormRow>

                        <FormRow>
                          {firstPay === '선택' && <FormCell title=""></FormCell>}
                          {firstPay === '즉시이체' && (
                            <FormCell title="예금주">
                              <Input aria-label="예금주명" width={70} value={'김한화'} readOnly />
                              <Input aria-label="주민등록번호" width={70} value={'000000'} readOnly />
                              <Typo variant={'body-lg'} className="tracking-wide">
                                -xxxxxxx
                              </Typo>
                              <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'} disabled>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                            </FormCell>
                          )}
                          {firstPay === '현금' && (
                            <FormCell title="계약자">
                              <Input aria-label="계약자명" width={70} value={'김한화'} readOnly />
                              <Input aria-label="주민등록번호" width={70} value={'000000'} readOnly />
                              <Typo variant={'body-lg'} className="tracking-wide">
                                -xxxxxxx
                              </Typo>
                            </FormCell>
                          )}
                          {firstPay === '카드납입' && (
                            <FormCell title="카드주">
                              <Input aria-label="카드주명" width={70} value={'김한화'} readOnly />
                              <Input aria-label="주민등록번호" width={70} value={'000000'} readOnly />
                              <Typo variant={'body-lg'} className="tracking-wide">
                                -xxxxxxx
                              </Typo>
                              <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'} disabled>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                            </FormCell>
                          )}
                          {firstPay === '예약이체' && (
                            <FormCell title="예금주">
                              <Input aria-label="예금주명" width={70} value={'김한화'} readOnly />
                              <Input aria-label="주민등록번호" width={70} value={'000000'} readOnly />
                              <Typo variant={'body-lg'} className="tracking-wide">
                                -xxxxxxx
                              </Typo>
                              <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'} disabled>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                            </FormCell>
                          )}

                          {morePay === '자동이체' && (
                            <FormCell title="예금주">
                              <Input aria-label="예금주명" width={70} value={'김한화'} readOnly />
                              <Input aria-label="주민등록번호" width={70} value={'000000'} readOnly />
                              <Typo variant={'body-lg'} className="tracking-wide">
                                -xxxxxxx
                              </Typo>
                              <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'} disabled>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                            </FormCell>
                          )}
                          {morePay === '급여이체' && (
                            <FormCell title="직원명">
                              <Input aria-label="직원명" width={70} value={'김한화'} readOnly />
                              <Input aria-label="주민등록번호" width={70} value={'000000'} readOnly />
                              <Typo variant={'body-lg'} className="tracking-wide">
                                -xxxxxxx
                              </Typo>
                              <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'} disabled>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                            </FormCell>
                          )}
                          {morePay === '카드이체' && (
                            <FormCell title="카드주">
                              <Input aria-label="카드주명" width={70} value={'김한화'} readOnly />
                              <Input aria-label="주민등록번호" width={70} value={'000000'} readOnly />
                              <Typo variant={'body-lg'} className="tracking-wide">
                                -xxxxxxx
                              </Typo>
                              <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'} disabled>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                            </FormCell>
                          )}

                          {(morePay === '선택' || morePay === '지로' || morePay === '방문') && (
                            <FormCell title=""></FormCell>
                          )}
                        </FormRow>
                        <FormRow>
                          {firstPay === '선택' && <FormCell title=""></FormCell>}
                          {(firstPay === '즉시이체' || firstPay === '현금' || firstPay === '예약이체') && (
                            <FormCell title="은행">
                              <NativeSelect aria-label="은행 선택" width={100}>
                                {[{ value: '선택', label: '선택' }].map((option) => (
                                  <NativeSelectOption key={option.value} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                          )}
                          {firstPay === '카드납입' && (
                            <FormCell title="카드사">
                              <NativeSelect aria-label="은행 선택" width={100}>
                                {[{ value: '선택', label: '선택' }].map((option) => (
                                  <NativeSelectOption key={option.value} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                          )}

                          {morePay === '자동이체' && (
                            <FormCell title="은행">
                              <NativeSelect aria-label="은행 선택" width={100}>
                                {[{ value: '선택', label: '선택' }].map((option) => (
                                  <NativeSelectOption key={option.value} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                              <NativeSelect aria-label="이체일 선택" width={100}>
                                {[{ value: '이체일', label: '이체일' }].map((option) => (
                                  <NativeSelectOption key={option.value} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                          )}
                          {morePay === '카드이체' && (
                            <FormCell title="카드사">
                              <NativeSelect aria-label="카드 선택" width={100}>
                                {[{ value: '선택', label: '선택' }].map((option) => (
                                  <NativeSelectOption key={option.value} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                              <NativeSelect aria-label="이체일 선택" width={100}>
                                {[{ value: '이체일', label: '이체일' }].map((option) => (
                                  <NativeSelectOption key={option.value} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                          )}

                          {(morePay === '선택' ||
                            morePay === '지로' ||
                            morePay === '방문' ||
                            morePay === '급여이체') && <FormCell title=""></FormCell>}
                        </FormRow>
                        <FormRow>
                          {firstPay === '선택' && <FormCell title=""></FormCell>}
                          {(firstPay === '즉시이체' || firstPay === '예약이체') && (
                            <FormCell title="계좌번호">
                              <Input aria-label="계좌번호" width={200} value={''} placeholder="계좌번호" />
                              <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                                계좌확인
                              </Button>
                            </FormCell>
                          )}
                          {firstPay === '현금' && (
                            <FormCell title="가상계좌번호">
                              <Input aria-label="가상계좌번호" width={200} value={''} placeholder="가상계좌번호" />
                              <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                                가상계좌
                              </Button>
                            </FormCell>
                          )}
                          {firstPay === '카드납입' && (
                            <FormCell title="카드번호">
                              <Input aria-label="카드번호" width={170} value={''} />
                              <Input aria-label="카드기간" width={80} value={''} />
                              <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                                카드확인
                              </Button>
                            </FormCell>
                          )}

                          {morePay === '자동이체' && (
                            <FormCell title="계좌번호">
                              <Input aria-label="계좌번호" width={200} value={''} placeholder="계좌번호" />
                              <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                                계좌확인
                              </Button>
                            </FormCell>
                          )}
                          {morePay === '카드이체' && (
                            <FormCell title="카드번호">
                              <Input aria-label="카드번호" width={170} value={''} />
                              <Input aria-label="카드기간" width={80} value={''} />
                              <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                                카드확인
                              </Button>
                            </FormCell>
                          )}

                          {(morePay === '선택' ||
                            morePay === '지로' ||
                            morePay === '방문' ||
                            morePay === '급여이체') && <FormCell title=""></FormCell>}
                        </FormRow>
                      </>
                    )}
                  </FormTable>

                  <TabPager
                    variant={'default'}
                    data={Tabs}
                    active={TabActive}
                    hasTableBelow={true}
                    setActive={TabSetActive}
                    visibleCount={5}
                    getValue={(tab) => String(tab.value)}
                    renderTab={(tab) => <span>{tab.name}</span>}
                    renderDropdownItem={(tab, setActiveTab, setVisibleStart, data, visibleCount) => (
                      <Button
                        variant="text"
                        key={String(tab.value)}
                        onClick={() => {
                          setActiveTab(String(tab.value));
                          const currentIndex = data.findIndex(
                            (currentTab) => String(currentTab.value) === String(tab.value)
                          );
                          if (currentIndex !== -1) {
                            const page = Math.floor(currentIndex / visibleCount);
                            setVisibleStart(page * visibleCount);
                          }
                        }}
                      >
                        {tab.name}
                      </Button>
                    )}
                  >
                    <FormTable lineTop={false} cols={['w-[9.6rem]', 'w-[40%]', 'w-[9rem]', 'w-[auto]']}>
                      {/* 사망수익자 / 사망외수익자 (항상 노출) */}
                      <FormRow>
                        <FormCell
                          title={
                            <div>
                              사망수익자
                              <TooltipQ>
                                사망보험금 수익자를 특정하지 않거나 법정상속인으로 지정한 경우 피보험자 사망시
                                법정상속인간보험급 지급에 관한 분쟁이 발생할 수 있습니다. <br />
                                (예시)양육에 기여하지 않은 부모가 보험금에 대한 지분을 요구
                                <br />
                                *상품설명서의 &apos;보험금 수익자 지정&apos;에 관한 사항을 참고하여 계약자에게 안내해
                                주시기 바랍니다.
                              </TooltipQ>
                            </div>
                          }
                        >
                          <Input aria-label="법정상속인" width={84} value={'법정상속인'} readOnly />
                          <Input aria-label="법정상속인명" width={114} value={''} readOnly />
                          <Button
                            aria-label="법정상속인 검색"
                            variant={'outlined'}
                            only="icon"
                            size={'lg'}
                            color={'gray-light'}
                            disabled
                          >
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                          <NativeSelect aria-label="법정상속인 선택" width={100} className="ml-[0.4rem]">
                            {[{ value: '법정상속인', label: '법정상속인' }].map((option) => (
                              <NativeSelectOption key={option.value} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </FormCell>
                        <FormCell title="사망외수익자">
                          <Input aria-label="사망외수익자명" width={84} value={'김한화'} readOnly />
                          <Input aria-label="사망외수익자 주민등록번호" width={114} value={'000000-0000000'} readOnly />
                          <Button
                            aria-label="사망외수익자 검색"
                            variant={'outlined'}
                            only="icon"
                            size={'lg'}
                            color={'gray-light'}
                            disabled
                          >
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                          <NativeSelect aria-label="사망외수익자 선택" width={100} className="ml-[0.4rem]">
                            {[{ value: '본인', label: '본인' }].map((option) => (
                              <NativeSelectOption key={option.value} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="지정대리인" colSpan={3}>
                          <Input aria-label="지정대리인" width={84} value={''} readOnly />
                          <Input aria-label="지정대리인" width={114} value={''} readOnly />
                          <Button
                            aria-label="지정대리인 검색"
                            variant={'outlined'}
                            only="icon"
                            size={'lg'}
                            color={'gray-light'}
                            disabled
                          >
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                          <NativeSelect aria-label="지정대리인 선택" width={100} className="ml-[0.4rem]">
                            {[{ value: '선택', label: '선택' }].map((option) => (
                              <NativeSelectOption key={option.value} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                            알림톡발송
                          </Button>
                        </FormCell>
                      </FormRow>
                      {/* 미성년 */}
                      <FormRow>
                        <FormCell title="법정대리인1" colSpan={3} tdClassName="justify-between">
                          <Grow>
                            <Input aria-label="법정대리인1" width={84} value={''} />
                            <Input aria-label="법정대리인1" width={114} value={''} />
                            <Button
                              aria-label="법정대리인1 검색"
                              variant={'outlined'}
                              only="icon"
                              size={'lg'}
                              color={'gray-light'}
                            >
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <NativeSelect aria-label="법정대리인1 선택" width={100} className="ml-[0.4rem]">
                              {[{ value: '선택', label: '선택' }].map((option) => (
                                <NativeSelectOption key={option.value} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </Grow>
                          <Grow placement="ec">
                            <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                              법정대리인등록
                            </Button>
                            <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                              수정
                            </Button>
                            <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                              재조회
                            </Button>
                          </Grow>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="법정대리인2">
                          <Input aria-label="법정대리인1" width={84} value={''} />
                          <Input aria-label="법정대리인1" width={114} value={''} />
                          <Button
                            aria-label="법정대리인1 검색"
                            variant={'outlined'}
                            only="icon"
                            size={'lg'}
                            color={'gray-light'}
                          >
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                        </FormCell>
                        <FormCell title="1인 사유">
                          <Input value={''} />
                        </FormCell>
                      </FormRow>
                    </FormTable>
                  </TabPager>
                </Gcol>
              </LayoutScrollItem>
            </LayoutScrollWrap>
          </LayoutMainBody>
          <LayoutMainFoot>
            {/* M1. variant="box" 추가 */}
            <MainBottom variant="box">
              {/* M1. className 추가 */}
              <MainBottomItem className="bg-[var(--color-gray-5)]">
                <Grow>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    설계수정
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    영수증발행
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    동영상매뉴얼
                  </Button>
                </Grow>
                <Grow gap={1}>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray'} size={'xl'}>
                    저장
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray'} size={'xl'}>
                    청약심사요청
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                    청약완료
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
