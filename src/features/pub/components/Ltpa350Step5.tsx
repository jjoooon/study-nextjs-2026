'use client';

import { useEffect, useState } from 'react';

import { useTabs } from '@/shared/hooks/useTabs';
import { Grow, Gcol } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TooltipQ } from '@common/TooltipQ';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { SearchIcon } from '@icons';
import { LayoutMain, LayoutScrollWrap, LayoutMainFoot, LayoutMainBody, LayoutScrollItem } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';

import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroupItem, CheckboxGroup } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Ltpz014 } from './popups/Ltpz014';

const DUMMY_DATA = {
  view1: [
    { value: 'user1', name: '홍길순 23세(여)' },
    { value: 'user2', name: '홍길동 42세(남)' },
    { value: 'user3', name: '김한화 31세(여)' },
    { value: 'user4', name: '박다온 28세(남)' },
    { value: 'user5', name: '이서준 45세(남)' },
    { value: 'user6', name: '최가은 37세(여)' },
    { value: 'user7', name: '정하늘 19세(여)' },
  ],
  view2: [],
  view3: [],
  view4: [],
  view5: [],
};

type ViewKey = keyof typeof DUMMY_DATA;
type Ltpa350Step5Props = {
  viewKey: ViewKey;
};

export const Ltpa350Step5 = ({ viewKey }: Ltpa350Step5Props) => {
  const { tabs, active, setActive, handleRemove, replaceTabs } = useTabs(DUMMY_DATA[viewKey]);
  const [isLtpz014Open, setIsLtpz014Open] = useState(false);

  useEffect(() => {
    replaceTabs(DUMMY_DATA[viewKey]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewKey]);

  return (
    <LayoutTemplateLTPA350MainBody
      mainBody={
        <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem] h-full w-full">
          <LayoutMainBody>
            <LayoutScrollWrap>
              <LayoutScrollItem>
                <Gcol placement={'ss'} className="w-full overflow-x-hidden" gap={3}>
                  {viewKey === 'view1' && (
                    <>
                      <FormTable cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
                        <FormRow>
                          <FormCell title={'만기수익자'} colSpan={3}>
                            <NativeSelect aria-label="주피와 관계 선택" width={100} className="ml-[0.4rem]">
                              {[
                                { value: '본인', id: 'self', label: '본인' },
                                { value: '', id: '', label: '' },
                              ].map((option, index) => (
                                <NativeSelectOption key={'만기수익자' + index} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                            <Input
                              aria-label="만기수익자 주민등록번호"
                              width={120}
                              value={'900101-1234567'}
                              readOnly
                            />
                            <Button
                              aria-label="검색"
                              variant={'outlined'}
                              only="icon"
                              size={'lg'}
                              color={'gray-light'}
                            >
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <Input aria-label="만기수익자 이름" width={75} value={'김한화'} readOnly />
                            <NativeSelect aria-label="만기수익자 은행선택" width={100} className="ml-[0.4rem]">
                              {[
                                { value: '은행선택', id: 'bank-selection', label: '은행선택' },
                                { value: '우리은행', id: 'woori-bank', label: '우리은행' },
                              ].map((option, index) => (
                                <NativeSelectOption key={'만기수익자 은행선택' + index} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                            <Input aria-label="은행 계좌번호" width={150} placeholder={'계좌번호 입력'} value={''} />
                            <Button color={'secondary'} only={'default'} size={'lg'} variant={'outlined'}>
                              계좌확인
                            </Button>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'우편물수령처'} colSpan={3}>
                            <RadioGroup defaultValue="자택" required>
                              {[
                                { value: '자택', id: 'home', label: '자택' },
                                { value: '직장', id: 'work', label: '직장' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
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
                              <Grow gap={1} placement="sc">
                                전자적 안내동의
                                <TooltipQ>
                                  문서서명/TM은 청약서상 고객이 청약서로 [전자적 방법의 안내동의여부]에 기재한 내용을
                                  화면에서 선택하시면 됩니다.
                                  <br />
                                  전자서명/전자청약은 전자적 안내동의가 필수사항입니다.
                                </TooltipQ>
                              </Grow>
                            }
                          >
                            <RadioGroup defaultValue="동의함" required>
                              {[
                                { value: '동의함', id: 'electronic-agree', label: '동의함' },
                                { value: '동의안함', id: 'electronic-disagree', label: '동의안함' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                          <FormCell title={'서명방법'}>
                            <RadioGroup defaultValue="문서서명">
                              {[
                                { value: '문서서명', id: 'document-sign', label: '문서서명' },
                                { value: '태블릿', id: 'tablet-sign', label: '태블릿' },
                                { value: '휴대폰', id: 'mobile-sign', label: '휴대폰' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'증권전달방법'}>
                            <RadioGroup defaultValue="모바일" required>
                              {[
                                { value: '모바일', id: 'mobile-dlvr', label: '모바일' },
                                { value: '우편', id: 'mail-dlvr', label: '우편' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                          <FormCell title={'승환계약여부(당·타사 승환예정 포함)'} rowSpan={2} titleRowSpan={2}>
                            <Grow className="w-full">
                              <Grow className="flex w-[8rem]">
                                <CheckboxGroup
                                  className="gap-3"
                                  color="primary"
                                  minSelected={0}
                                  size="lg"
                                  width="auto"
                                  variant="default"
                                >
                                  <CheckboxGroupItem value="1">예</CheckboxGroupItem>
                                  <CheckboxGroupItem value="2" disabled>
                                    아니오
                                  </CheckboxGroupItem>
                                </CheckboxGroup>
                              </Grow>
                              <Gcol placement="se" className="w-full">
                                <Grow className="w-full justify-start!">
                                  (승환(
                                  <Input aria-label="" width={50} value={''} readOnly />
                                  )건, 승환예정(
                                  <Input aria-label="" width={50} value={''} readOnly />
                                  )건)
                                </Grow>
                                <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                  유사계약현황
                                </Button>
                              </Gcol>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'약관유형'}>
                            <Grow gap={2}>
                              <RadioGroup defaultValue="모바일" required>
                                {[
                                  { value: '모바일', id: 'mobile-agreement', label: '모바일' },
                                  { value: '인쇄약관', id: 'printed-agreement', label: '인쇄약관' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
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
                                  { value: '약정함', id: 'agreement-1', label: '약정함' },
                                  { value: '약정안함', id: 'agreement-2', label: '약정안함' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                              <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                알림톡발송
                              </Button>
                            </Grow>
                          </FormCell>
                          <FormCell title={'조세규정확인대상(FATCA/CRS)'}>
                            <Grow placement="bwc">
                              <RadioGroup defaultValue="해당사항없음">
                                {[
                                  { value: '해당사항없음', id: 'applicable-1', label: '해당사항없음' },
                                  { value: '해당함', id: 'applicable-2', label: '해당함' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                              <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                알림톡발송
                              </Button>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'실소유자 확인'}>
                            <Grow placement="bws">
                              <RadioGroup defaultValue="계약자가 실소유자임" className="w-[14rem]" required>
                                {[
                                  { value: '계약자가 실소유자임', id: 'boCheck-1', label: '계약자가 실소유자임' },
                                  { value: '실소유자 아님', id: 'boCheck-2', label: '실소유자 아님' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                              <Grow placement="ss">
                                <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                  CDD등록
                                </Button>
                                <Button color={'secondary'} size={'lg'} variant={'contained'} onClick={() => {}}>
                                  CDD등록
                                </Button>
                              </Grow>
                            </Grow>
                          </FormCell>
                          <FormCell title={'영수일자(보험시기)'}>
                            <DatePickerInput mode={'single'} required />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'당월해지 자동이체 신청'}>
                            <Grow placement="bwc">
                              <RadioGroup defaultValue="동의함" required>
                                {[
                                  { value: '동의함', id: 'agree', label: '동의함' },
                                  { value: '동의안함', id: 'disagree', label: '동의안함' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                              <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                알림톡발송
                              </Button>
                            </Grow>
                          </FormCell>
                          <FormCell title={'해지 방지 휴대폰 결제'}>
                            <Grow placement="bws">
                              <Grow placement="ss">
                                <RadioGroup defaultValue="동의함" className="w-[10rem]" required>
                                  {[
                                    { value: '동의함', id: 'agree', label: '동의함' },
                                    { value: '동의안함', id: 'disagree', label: '동의안함' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                                <NativeSelect aria-label="통신사" width={100}>
                                  {[
                                    { value: '통신사', id: 'carrier-1', label: '통신사' },
                                    { value: '', id: 'carrier-2', label: '' },
                                  ].map((option) => (
                                    <NativeSelectOption key={option.id} value={option.value}>
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
                        </FormRow>
                        <FormRow>
                          <FormCell title={'장애인보험 전환'}>
                            <Grow placement="bwc">
                              <CheckboxGroup
                                className="gap-3"
                                color="primary"
                                minSelected={0}
                                size="lg"
                                width="auto"
                                variant="default"
                              >
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
                          <FormCell
                            title={
                              <Grow gap={1} placement="sc">
                                성년후견인지정여부
                                <TooltipQ>
                                  <b>성년후견제도란?</b>
                                  <br /> 정신적 제약으로 보호가 필요한 성인의 권익보호와 지원을 위해 마련된 제도로,
                                  보호가 필요한 성인의 정신능력정도 등에 따라 성년/한정/특정/임의후견으로
                                  나뉨(민법제9조,제12조,제14조의2 및 제959조의 14)
                                </TooltipQ>
                              </Grow>
                            }
                          >
                            <CheckboxGroup
                              className="gap-3"
                              color="primary"
                              minSelected={0}
                              size="lg"
                              width="auto"
                              variant="default"
                            >
                              {[
                                { label: '계약자', value: '1' },
                                { label: '피보험자', value: '2' },
                              ].map((category) => (
                                <CheckboxGroupItem key={category.value} value={category.value}>
                                  {category.label}
                                </CheckboxGroupItem>
                              ))}
                            </CheckboxGroup>
                          </FormCell>
                        </FormRow>
                      </FormTable>

                      <FormTable cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
                        <FormRow>
                          <FormCell title={'초회보험료'}>
                            <NativeSelect aria-label="납부방법 선택" width={100} required>
                              {[{ value: '즉시이체', id: 'immediateTransfer', label: '즉시이체' }].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="계속 보험료">
                            <Grow gap={1}>
                              <NativeSelect aria-label="연속이체 선택" width={100} required>
                                {[{ value: '자동이체', id: 'automaticTransfer', label: '자동이체' }].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                              <Checkbox color="primary">조회동일여부</Checkbox>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="예금주관계">
                            <Grow gap={1}>
                              <NativeSelect aria-label="연속이체 선택" width={80}>
                                {[{ value: '본인', id: 'deposit-owner-self-1', label: '본인' }].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                              <RadioGroup defaultValue="개인" disabled>
                                {[
                                  { value: '개인', id: 'individual-1', label: '개인' },
                                  { value: '사업자', id: 'business-1', label: '사업자' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </Grow>
                          </FormCell>
                          <FormCell title="예금주관계">
                            <Grow gap={1}>
                              <NativeSelect aria-label="연속이체 선택" width={80}>
                                {[{ value: '본인', id: 'deposit-owner-self-2', label: '본인' }].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                              <RadioGroup defaultValue="개인" disabled>
                                {[
                                  { value: '개인', id: 'individual-2', label: '개인' },
                                  { value: '사업자', id: 'business-2', label: '사업자' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="예금주">
                            <Input aria-label="예금주명" width={70} value={'김한화'} readOnly />
                            <Input aria-label="주민등록번호" width={70} value={900101} readOnly />
                            <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'} disabled>
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                          </FormCell>
                          <FormCell title="예금주">
                            <Input aria-label="예금주명" width={70} value={'김한화'} readOnly />
                            <Input aria-label="주민등록번호" width={70} value={900101} readOnly />
                            <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'} disabled>
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="은행">
                            <NativeSelect aria-label="은행 선택" width={100}>
                              {[{ value: '선택', id: 'bank-01', label: '선택' }].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="은행">
                            <NativeSelect aria-label="은행 선택" width={100}>
                              {[{ value: '선택', id: 'bank-02', label: '선택' }].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                            <NativeSelect aria-label="이체일 선택" width={100}>
                              {[{ value: '이체일', id: 'transfer-date', label: '이체일' }].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="계좌번호">
                            <Input aria-label="계좌번호" width={200} value={''} placeholder="계좌번호" />
                            <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                              계좌확인
                            </Button>
                          </FormCell>
                          <FormCell title="계좌번호">
                            <Input aria-label="계좌번호" width={200} value={''} placeholder="계좌번호" />
                            <Button variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                              계좌확인
                            </Button>
                          </FormCell>
                        </FormRow>
                      </FormTable>

                      <TabPager
                        variant={'default'}
                        data={tabs}
                        active={active}
                        setActive={setActive}
                        removable={true}
                        onRemove={handleRemove}
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
                        <FormTable lineTop={false} cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
                          {/* 사망수익자 / 사망외수익자 (항상 노출) */}
                          <FormRow>
                            <FormCell
                              title={
                                <Grow gap={1} placement="sc">
                                  사망수익자
                                  <TooltipQ>
                                    사망보험금 수익자를 특정하지 않거나 법정상속인으로 지정한 경우 피보험자 사망시
                                    법정상속인간보험급 지급에 관한 분쟁이 발생할 수 있습니다. <br />
                                    (예시)양육에 기여하지 않은 부모가 보험금에 대한 지분을 요구
                                    <br />
                                    *상품설명서의 &apos;보험금 수익자 지정&apos;에 관한 사항을 참고하여 계약자에게
                                    안내해 주시기 바랍니다.
                                  </TooltipQ>
                                </Grow>
                              }
                            >
                              <Input aria-label="법정상속인" width={90} value={'법정상속인'} readOnly />
                              <Input aria-label="법정상속인명" width={130} value={''} readOnly />
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
                              <NativeSelect aria-label="법정상속인 선택" width={120} className="ml-[0.4rem]">
                                {[{ value: '법정상속인', id: 'motorcycle-drives', label: '법정상속인' }].map(
                                  (option, index) => (
                                    <NativeSelectOption key={'법정상속인' + index} value={option.value}>
                                      {option.label}
                                    </NativeSelectOption>
                                  )
                                )}
                              </NativeSelect>
                            </FormCell>
                            <FormCell title="사망외수익자">
                              <Input aria-label="사망외수익자명" width={90} value={'김한화'} readOnly />
                              <Input
                                aria-label="사망외수익자 주민등록번호"
                                width={130}
                                value={'900101-1234567'}
                                readOnly
                              />
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
                              <NativeSelect aria-label="사망외수익자 선택" width={120} className="ml-[0.4rem]">
                                {[{ value: '본인', id: 'myself', label: '본인' }].map((option, index) => (
                                  <NativeSelectOption key={'사망외수익자' + index} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title="지정대리인" colSpan={3}>
                              <Input aria-label="지정대리인" width={90} value={''} readOnly />
                              <Input aria-label="지정대리인" width={130} value={''} readOnly />
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
                              <NativeSelect aria-label="지정대리인 선택" width={120} className="ml-[0.4rem]">
                                {[{ value: '선택', id: 'select', label: '선택' }].map((option, index) => (
                                  <NativeSelectOption key={'지정대리인' + index} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                              <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                알림톡발송
                              </Button>
                            </FormCell>
                          </FormRow>
                        </FormTable>
                      </TabPager>
                    </>
                  )}
                </Gcol>
              </LayoutScrollItem>
            </LayoutScrollWrap>
          </LayoutMainBody>
          <LayoutMainFoot>
            <MainBottom>
              <MainBottomItem>
                <Grow>
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => setIsLtpz014Open(false)}>
                    설계수정
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => setIsLtpz014Open(false)}>
                    영수증발행
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => setIsLtpz014Open(true)}>
                    동영상매뉴얼
                  </Button>
                </Grow>
                <Ltpz014 open={isLtpz014Open} onOpenChange={setIsLtpz014Open} />
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
