'use client';

import { useEffect, useState } from 'react';

import { useTabs } from '@/shared/hooks/useTabs';
import { Grow, Gcol, Typo } from '@atoms';
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

import { Ltpz014 } from './popups/Ltpz014';

const DUMMY_DATA = {
  view1: [
    { value: 'user1', name: '김한화' },
    { value: 'user2', name: '박민서' },
  ],
  view2: [
    { value: 'user1', name: '이방긋' },
    { value: 'user2', name: '박튼튼' },
  ],
  view3: [
    { value: 'user1', name: '이재물' },
    { value: 'user2', name: '목적물' },
  ],
  view4: [
    { value: 'user1', name: '그룹1' },
    { value: 'user2', name: '그룹2' },
  ],
  view5: [
    { value: 'user1', name: '연금계약자1' },
    { value: 'user2', name: '연금계약자2' },
  ],
};
const tooltipContents = [
  <>
    문서서명/TM은 청양서상 고객이 청약서로 [전자적 방밥의 안내동의여부]에 기재한 내용을 화면에서 선택하시면 됩니다.
    <br />
    전자서명/전자청약은 전자적 안내동의가 필수사항입니다.
  </>,
];

type ViewKey = keyof typeof DUMMY_DATA;
type Ltpa350Step1Props = {
  simpleMode: boolean;
  viewKey: ViewKey;
};

// State & Reducer Types
export const Ltpa350Step1 = ({ simpleMode: _simpleMode, viewKey }: Ltpa350Step1Props) => {
  // viewKey만 사용, 상태 제거
  const { tabs, active, setActive, handleRemove, replaceTabs } = useTabs(DUMMY_DATA[viewKey]);
  const [isLtpz014Open, setIsLtpz014Open] = useState(false);

  useEffect(() => {
    replaceTabs(DUMMY_DATA[viewKey]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewKey]);

  return (
    <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem]">
      <LayoutTemplateLTPA350MainBody
        mainBody={
          <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem] h-full w-full">
            <LayoutMainBody>
              <LayoutScrollWrap>
                <LayoutScrollItem>
                  <Gcol placement={'ss'} className="w-full overflow-x-hidden" gap={3}>
                    {/* 인보험 */}
                    {viewKey === 'view1' && (
                      <>
                        <FormTable cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
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
                          <FormRow>
                            <FormCell title={'만기'} colSpan={3}>
                              <RadioGroup defaultValue="80세">
                                {[
                                  { value: '80세', id: 'insurance-period-80', label: '80세' },
                                  { value: '90세', id: 'insurance-period-90', label: '90세' },
                                  { value: '100세', id: 'insurance-period-100', label: '100세' },
                                  { value: '110세', id: 'insurance-period-110', label: '110세' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </FormCell>
                          </FormRow>

                          <FormRow>
                            <FormCell title={'납기'} colSpan={3}>
                              <RadioGroup defaultValue="10년납">
                                {[
                                  { value: '10년납', id: 'payment-period-10', label: '10년납' },
                                  { value: '15년납', id: 'payment-period-15', label: '15년납' },
                                  { value: '20년납', id: 'payment-period-20', label: '20년납' },
                                  { value: '25년납', id: 'payment-period-25', label: '25년납' },
                                  { value: '30년납', id: 'payment-period-30', label: '30년납' },
                                  { value: '전기납', id: 'payment-period-lifetime', label: '전기납' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title={'납입주기'}>
                              <RadioGroup defaultValue="월납">
                                {[
                                  { value: '월납', id: 'payment-cycle-monthly', label: '월납' },
                                  { value: '3개월', id: 'payment-cycle-quarterly', label: '3개월' },
                                  { value: '6개월', id: 'payment-cycle-semiannual', label: '6개월' },
                                  { value: '연납', id: 'payment-cycle-annual', label: '연납' },
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
                                  { value: '3년', id: 'renewal-period-3', label: '3년' },
                                  { value: '10년', id: 'renewal-period-10', label: '10년' },
                                  { value: '20년', id: 'renewal-period-20', label: '20년' },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </FormCell>
                          </FormRow>

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
                                    id: 'notification-type-1',
                                    label: '1형(일반고지형)',
                                  },
                                  {
                                    value: '2형(건강고지형II(6년))',
                                    id: 'notification-type-2',
                                    label: '2형(건강고지형II(6년))',
                                  },
                                  {
                                    value: '3형(건강고지형II(7년))',
                                    id: 'notification-type-3',
                                    label: '3형(건강고지형II(7년))',
                                  },
                                  {
                                    value: '4형(건강고지형II(8년))',
                                    id: 'notification-type-4',
                                    label: '4형(건강고지형II(8년))',
                                  },
                                  {
                                    value: '5형(건강고지형II(9년))',
                                    id: 'notification-type-5',
                                    label: '5형(건강고지형II(9년))',
                                  },
                                  {
                                    value: '6형(건강고지형II(10년))',
                                    id: 'notification-type-6',
                                    label: '6형(건강고지형II(10년))',
                                  },
                                ].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
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
                          renderButtons={
                            <Grow gap={2.5}>
                              <Button color={'gray'} size={'md'} variant={'outlined'}>
                                피보험자
                                <AddIcon color={'var(--color-gray-60)'} />
                              </Button>
                            </Grow>
                          }
                        >
                          <FormTable lineTop={false} cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
                            {/* 상세 화면 전용 */}
                            {!_simpleMode ? (
                              <FormRow>
                                <FormCell
                                  colSpan={3}
                                  title={'피보험자'}
                                  titleVariant="section"
                                  tdClassName="justify-between flex-wrap"
                                >
                                  <Grow placement="sc">
                                    <Input aria-label="피보험자명" width={75} value={'김환화'} readOnly />
                                    <Input aria-label="주민등록번호 마스킹" width={110} value={'900101-1******'} readOnly />
                                    <Button
                                      aria-label="피보험자 검색"
                                      variant={'outlined'}
                                      only="icon"
                                      size={'lg'}
                                      color={'gray-light'}
                                    >
                                      <SearchIcon color={'var(--color-primary-50)'} />
                                    </Button>
                                    <Input aria-label="피보험자 나이" width={56} value={'134세'} readOnly />
                                    <Input aria-label="피보험자 성별" width={32} value={'남'} readOnly />
                                  </Grow>
                                  <Grow gap={2}>
                                    <KeyValueItem label={'상령일'}>
                                      <Typo weight={'bold'}>2023-01-12</Typo>
                                      <Badge color={'blue'} size={'md'} variant={'contained'}>
                                        D-31
                                      </Badge>
                                    </KeyValueItem>
                                    <KeyValueItem label={'설계동의'}>
                                      <Typo weight={'bold'}>2023-01-12</Typo>
                                      <Badge color={'red'} size={'md'} variant={'contained'}>
                                        D-31
                                      </Badge>
                                    </KeyValueItem>
                                    <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                      알림톡발송
                                    </Button>
                                  </Grow>
                                </FormCell>
                              </FormRow>
                            ) : (
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
                                    width={75}
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
                                      { value: 'man', id: 'v1-insured-gender-man', label: '남' },
                                      { value: 'woman', id: 'v1-insured-gender-woman', label: '여' },
                                    ].map((option) => (
                                      <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                        {option.label}
                                      </RadioGroupItem>
                                    ))}
                                  </RadioGroup>
                                </FormCell>
                                <FormCell title="연령" tdClassName="gap-3">
                                  <Grow>
                                    <Input aria-label="피보험자 나이" width={70} required />세
                                  </Grow>
                                  <DatePickerInput mode={'single'} required />
                                </FormCell>
                              </FormRow>
                            )}

                            <FormRow>
                              <FormCell title="직업" colSpan={3}>
                                <Input aria-label="직업코드" width={76} value={'32254'} readOnly />
                                <Input aria-label="직업분류" width={274} value={'소규모상점경영및읽선관리종사원'} readOnly />
                                <Button
                                  aria-label="피보험자 검색"
                                  variant={'outlined'}
                                  only="icon"
                                  size={'lg'}
                                  color={'gray-light'}
                                >
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="등급" width={50} value={'2급'} readOnly />
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title="운전형태">
                                <RadioGroup defaultValue="자가용">
                                  {[
                                    { value: '자가용', id: 'driving-type-private', label: '자가용' },
                                    { value: '영업용', id: 'driving-type-commercial', label: '영업용' },
                                    { value: '비운전자', id: 'driving-type-nondriver', label: '비운전자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </FormCell>
                              <FormCell title="이륜차">
                                <RadioGroup defaultValue="운전함">
                                  {[
                                    { value: '운전함', id: 'motorcycle-drives', label: '운전함' },
                                    { value: '운전안함', id: 'motorcycle-nondriver', label: '운전안함' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title="주피와 관계">
                                <Input aria-label="피보험자명" width={76} value={'김한화'} readOnly />는
                                <NativeSelect aria-label="주피와 관계 선택" width={156} className="ml-[0.4rem]" required>
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
                              <FormCell title="(실손)동시설계">
                                <Input aria-label="코드" width={130} value={'LA260219319244'} readOnly />
                                <Input aria-label="코드" width={130} value={89492940} commaAmount readOnly />
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title={'할인적용'} colSpan={3}>
                                <Checkbox color="primary">가족연계할인</Checkbox>
                                <Button aria-label="피보험자 검색" variant="outlined" only="icon" size="lg" color="gray-light">
                                  <SearchIcon color="var(--color-primary-50)" />
                                </Button>
                              </FormCell>
                            </FormRow>
                          </FormTable>
                        </TabPager>
                      </>
                    )}
                    {/* 태아 */}
                    {viewKey === 'view2' && (
                      <>
                        <FormTable caption="보험정보" cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
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
                          renderButtons={
                            <Grow gap={2.5}>
                              <Button color={'gray'} size={'md'} variant={'outlined'}>
                                피보험자
                                <AddIcon color={'var(--color-gray-50)'} />
                              </Button>
                            </Grow>
                          }
                        >
                          <FormTable
                            caption="피보험자 정보"
                            lineTop={false}
                            cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}
                          >
                            {!_simpleMode ? (
                              <FormRow>
                                <FormCell colSpan={3} title={'피보험자'} titleVariant="section">
                                  <Grow className="flex-nowrap w-full" placement={'bwc'}>
                                    <Grow>
                                      <Input aria-label="피보험자명" width={76} value={'태아'} readOnly />
                                      <Input aria-label="주민등록번호 마스킹" width={120} value={'200101-0000000'} readOnly />
                                      <Button
                                        aria-label="피보험자 검색"
                                        variant={'outlined'}
                                        only="icon"
                                        size={'lg'}
                                        color={'gray-light'}
                                      >
                                        <SearchIcon color={'var(--color-primary-50)'} />
                                      </Button>
                                      <Input aria-label="피보험자 나이" width={56} value={'0세'} readOnly />
                                      <Input aria-label="피보험자 성별" width={32} value={'남'} readOnly />
                                    </Grow>
                                    <Grow gap={2}>
                                      <KeyValueItem label={'상령일'}>
                                        <Grow gap={1}>
                                          <Typo weight={'bold'}>2035.01.31</Typo>
                                          <Badge color={'blue'} size={'md'} variant={'contained'}>
                                            D-21
                                          </Badge>
                                        </Grow>
                                      </KeyValueItem>
                                      <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                        알림톡발송
                                      </Button>
                                    </Grow>
                                  </Grow>
                                </FormCell>
                              </FormRow>
                            ) : (
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
                                    width={75}
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
                                      { value: 'man', id: 'v1-insured-gender-man', label: '남' },
                                      { value: 'woman', id: 'v1-insured-gender-woman', label: '여' },
                                    ].map((option) => (
                                      <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                        {option.label}
                                      </RadioGroupItem>
                                    ))}
                                  </RadioGroup>
                                </FormCell>
                                <FormCell title="연령" tdClassName="gap-3">
                                  <Grow>
                                    <Input aria-label="피보험자 나이" width={70} required />세
                                  </Grow>
                                  <DatePickerInput mode={'single'} required />
                                </FormCell>
                              </FormRow>
                            )}
                            <FormRow>
                              <FormCell title="직업" colSpan={3}>
                                <Input aria-label="직업코드" width={76} value={'32254'} readOnly />
                                <Input aria-label="직업분류" width={274} value={'소규모상점경영및읽선관리종사원'} readOnly />
                                <Button
                                  aria-label="피보험자 검색"
                                  variant={'outlined'}
                                  only="icon"
                                  size={'lg'}
                                  color={'gray-light'}
                                >
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="등급" width={50} value={'2급'} readOnly />
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title="운전형태">
                                <RadioGroup defaultValue="자가용">
                                  {[
                                    { value: '자가용', id: 'driving-type-private', label: '자가용' },
                                    { value: '영업용', id: 'driving-type-commercial', label: '영업용' },
                                    { value: '비운전자', id: 'driving-type-nondriver', label: '비운전자' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </FormCell>
                              <FormCell title="이륜차">
                                <RadioGroup defaultValue="운전함">
                                  {[
                                    { value: '운전함', id: 'motorcycle-drives', label: '운전함' },
                                    { value: '운전안함', id: 'motorcycle-nondriver', label: '운전안함' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title="주피와 관계">
                                <Input aria-label="피보험자명" width={76} value={'김한화'} readOnly />는
                                <NativeSelect aria-label="주피와 관계 선택" width={156} className="ml-[0.4rem]" required>
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
                              <FormCell title="(실손)동시설계">
                                <Input aria-label="코드" width={130} value={'LA260219319244'} readOnly />
                                <Input aria-label="코드" width={130} value={'89492940'} commaAmount readOnly />
                              </FormCell>
                            </FormRow>
                            <FormRow>
                              <FormCell title={'할인적용'}>
                                <Checkbox color="primary">가족연계할인</Checkbox>
                                <Button aria-label="피보험자 검색" variant="outlined" only="icon" size="lg" color="gray-light">
                                  <SearchIcon color="var(--color-primary-50)" />
                                </Button>
                              </FormCell>

                              <FormCell title="임신주수">
                                <Input aria-label="임신주수" width={'5rem'} value={20} required />
                                주 (출산예정일
                                <DatePickerInput mode={'single'} value={'2026-03-10'} required />)
                              </FormCell>
                            </FormRow>
                          </FormTable>
                        </TabPager>
                      </>
                    )}

                    {/* 재물 */}
                    {viewKey === 'view3' && (
                      <>
                        <FormTable caption="재물보험 정보" cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
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
                          <FormRow>
                            <FormCell title={'납기'}>
                              <RadioGroup defaultValue="전기납">
                                {[{ value: '전기납', id: 'property-payment-period-full', label: '전기납' }].map((option) => (
                                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                    {option.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </FormCell>
                            <FormCell title={'단체취급'}>
                              <Checkbox color="primary"></Checkbox>
                            </FormCell>
                          </FormRow>
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
                          renderButtons={
                            <Grow>
                              <Button color={'gray'} size={'md'} variant={'outlined'}>
                                피보험자
                                <AddIcon color={'var(--color-gray-50)'} />
                              </Button>
                              <Button color={'gray'} size={'md'} variant={'outlined'}>
                                목적물
                                <AddIcon color={'var(--color-gray-50)'} />
                              </Button>
                            </Grow>
                          }
                        >
                          <Gcol placement={'ss'}>
                            <FormTable
                              caption="피보험자 정보"
                              lineTop={false}
                              cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}
                            >
                              {!_simpleMode ? (
                                <FormRow>
                                  <FormCell
                                    colSpan={3}
                                    title={'피보험자'}
                                    titleVariant="section"
                                    tdClassName="justify-between flex-wrap"
                                  >
                                    <Grow placement="sc">
                                      <Input aria-label="피보험자명" width={75} value={'김환화'} readOnly />
                                      <Input aria-label="주민등록번호 마스킹" width={110} value={'900101-1******'} readOnly />
                                      <Button
                                        aria-label="피보험자 검색"
                                        variant={'outlined'}
                                        only="icon"
                                        size={'lg'}
                                        color={'gray-light'}
                                      >
                                        <SearchIcon color={'var(--color-primary-50)'} />
                                      </Button>
                                      <Input aria-label="피보험자 나이" width={56} value={'134세'} readOnly />
                                      <Input aria-label="피보험자 성별" width={32} value={'남'} readOnly />
                                    </Grow>
                                    <Grow gap={2}>
                                      <KeyValueItem label={'상령일'}>
                                        <Typo weight={'bold'}>2023-01-12</Typo>
                                        <Badge color={'blue'} size={'md'} variant={'contained'}>
                                          D-31
                                        </Badge>
                                      </KeyValueItem>
                                      <KeyValueItem label={'설계동의'}>
                                        <Typo weight={'bold'}>2023-01-12</Typo>
                                        <Badge color={'red'} size={'md'} variant={'contained'}>
                                          D-31
                                        </Badge>
                                      </KeyValueItem>
                                      <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                        알림톡발송
                                      </Button>
                                    </Grow>
                                  </FormCell>
                                </FormRow>
                              ) : (
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
                                      width={75}
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
                                        { value: 'man', id: 'v1-insured-gender-man', label: '남' },
                                        { value: 'woman', id: 'v1-insured-gender-woman', label: '여' },
                                      ].map((option) => (
                                        <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                          {option.label}
                                        </RadioGroupItem>
                                      ))}
                                    </RadioGroup>
                                  </FormCell>
                                  <FormCell title="연령" tdClassName="gap-3">
                                    <Grow>
                                      <Input aria-label="피보험자 나이" width={70} required />세
                                    </Grow>
                                    <DatePickerInput mode={'single'} required />
                                  </FormCell>
                                </FormRow>
                              )}
                              <FormRow>
                                <FormCell title="직업" colSpan={3}>
                                  <Input aria-label="직업코드" width={76} value={'32254'} readOnly />
                                  <Input aria-label="직업분류" width={274} value={'소규모상점경영및읽선관리종사원'} readOnly />
                                  <Button
                                    aria-label="피보험자 검색"
                                    variant={'outlined'}
                                    only="icon"
                                    size={'lg'}
                                    color={'gray-light'}
                                  >
                                    <SearchIcon color={'var(--color-primary-50)'} />
                                  </Button>
                                  <Input aria-label="등급" width={50} value={'2급'} readOnly />
                                </FormCell>
                              </FormRow>
                              <FormRow>
                                <FormCell title="운전형태">
                                  <RadioGroup defaultValue="자가용">
                                    {[
                                      { value: '자가용', id: 'driving-type-private', label: '자가용' },
                                      { value: '영업용', id: 'driving-type-commercial', label: '영업용' },
                                      { value: '비운전자', id: 'driving-type-nondriver', label: '비운전자' },
                                    ].map((option) => (
                                      <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                        {option.label}
                                      </RadioGroupItem>
                                    ))}
                                  </RadioGroup>
                                </FormCell>
                                <FormCell title="이륜차">
                                  <RadioGroup defaultValue="운전함">
                                    {[
                                      { value: '운전함', id: 'motorcycle-drives', label: '운전함' },
                                      { value: '운전안함', id: 'motorcycle-nondriver', label: '운전안함' },
                                    ].map((option) => (
                                      <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                        {option.label}
                                      </RadioGroupItem>
                                    ))}
                                  </RadioGroup>
                                </FormCell>
                              </FormRow>
                              <FormRow>
                                <FormCell title="주피와 관계" colSpan={3}>
                                  <Input aria-label="피보험자명" width={76} value={'김한화'} readOnly />는
                                  <NativeSelect aria-label="주피와 관계 선택" width={156} className="ml-[0.4rem]" required>
                                    {[
                                      { value: '고용인(종업원)', id: 'motorcycle-drives', label: '고용인(종업원)' },
                                      { value: '배우자', id: 'motorcycle-nondriver', label: '배우자' },
                                    ].map((option, index) => (
                                      <NativeSelectOption key={'주피와관계' + index} value={option.value}>
                                        {option.label}
                                      </NativeSelectOption>
                                    ))}
                                  </NativeSelect>
                                </FormCell>
                              </FormRow>
                            </FormTable>

                            {/* 목적물 */}
                            <FormTable
                              caption="목적물 정보"
                              lineTop={false}
                              cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}
                            >
                              <FormRow>
                                <FormCell colSpan={3} title={'소유자'} titleVariant="section">
                                  <Grow className="flex-nowrap w-full" placement={'bwc'}>
                                    <Grow placement="sc">
                                      <Input aria-label="소유자명" width={75} value={'김환화'} readOnly />
                                      <Input aria-label="주민등록번호 마스킹" width={110} value={'900101-1******'} readOnly />
                                      <Button
                                        aria-label="소유자 검색"
                                        variant={'outlined'}
                                        only="icon"
                                        size={'lg'}
                                        color={'gray-light'}
                                      >
                                        <SearchIcon color={'var(--color-primary-50)'} />
                                      </Button>
                                      <Input aria-label="소유자 나이" width={56} value={'134세'} readOnly />
                                      <Input aria-label="소유자 성별" width={32} value={'남'} readOnly />
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
                              </FormRow>
                              <FormRow>
                                <FormCell title="소재지" colSpan={3}>
                                  <Input aria-label="목적물명" width={76} value={'목적물1'} />
                                  <Button aria-label="목적물 주소찾기" variant={'outlined'} size={'lg'} color={'gray-light'}>
                                    주소찾기
                                  </Button>
                                  <Input aria-label="목적물 소재지" width={'auto'} readOnly />
                                  <Input aria-label="목적물 소재지" width={'auto'} />
                                  <Input aria-label="목적물 소재지" width={'auto'} readOnly />
                                </FormCell>
                              </FormRow>
                              <FormRow>
                                <FormCell title="가입업종">
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
                                  <Input
                                    aria-label="가입업종명"
                                    width={260}
                                    value={'학원(기원및 교육목적의 가죽목공방'}
                                    readOnly
                                  />
                                </FormCell>
                                <FormCell title="건물급수">
                                  <Input aria-label="건물급수" width={40} value={'2'} readOnly /> 급 (적용급수
                                  <Input aria-label="적용급수" width={40} value={'2'} readOnly /> 급)
                                  <Button aria-label="건물구조입력" variant={'outlined'} size={'lg'} color={'gray-light'}>
                                    건물구조입력
                                  </Button>
                                </FormCell>
                              </FormRow>
                              <FormRow>
                                <FormCell title="요율적용업종">
                                  <Input aria-label="요율적용업종코드" width={76} value={'12345'} readOnly />
                                  <Input
                                    aria-label="요율적용업종명"
                                    width={274}
                                    value={'학원(기원및 교육목적의 가죽목공방'}
                                    readOnly
                                  />
                                </FormCell>
                                <FormCell title="건물상세">
                                  지상 <Input aria-label="건물 지상층" width={46} value={'2'} readOnly /> 층 / 지하
                                  <Input aria-label="건물 지하층" width={46} value={'1'} readOnly /> 층 /
                                  <Input aria-label="건물 폭" width={46} value={'10'} readOnly /> ㎡
                                </FormCell>
                              </FormRow>
                              <FormRow>
                                <FormCell title="실손보상구분">
                                  <NativeSelect aria-label="실손보상구분" width={200} required>
                                    {[{ value: 'selection', id: 'property-reimbursement-1', label: '선택' }].map((option) => (
                                      <NativeSelectOption key={option.id} value={option.value}>
                                        {option.label}
                                      </NativeSelectOption>
                                    ))}
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
                            </FormTable>
                          </Gcol>
                        </TabPager>
                      </>
                    )}
                    {/* 단체 */}
                    {viewKey === 'view4' && (
                      <>
                        <FormTable caption="보험정보" cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
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
                              <Input aria-label="총인원" width={60} />
                              명(전체 근로자 수)
                            </FormCell>
                            <FormCell title={'인원현황'}>
                              <Input aria-label="가입인원" width={60} readOnly />명 / 가입비율
                              <Input aria-label="가입비율" width={60} readOnly />%
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
                          renderButtons={
                            <Grow>
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
                            </Grow>
                          }
                        >
                          <Gcol placement={'ss'}>
                            <FormTable
                              caption="그룹 정보"
                              lineTop={false}
                              cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}
                            >
                              <FormRow>
                                <FormCell title={'그룹명'} titleVariant="section">
                                  <Input aria-label="그룹명" width={120} />
                                </FormCell>
                                <FormCell title="보험나이">
                                  <Input aria-label="보험나이" width={50} />세
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
                                  <Input aria-label="인원" width={50} value={40} />명
                                </FormCell>
                              </FormRow>
                              <FormRow>
                                <FormCell title="직업" colSpan={3}>
                                  <Input aria-label="직업코드" width={76} value={'32254'} readOnly />
                                  <Input aria-label="직업분류" width={274} value={'소규모상점경영및읽선관리종사원'} readOnly />
                                  <Button
                                    aria-label="피보험자 검색"
                                    variant={'outlined'}
                                    only="icon"
                                    size={'lg'}
                                    color={'gray-light'}
                                  >
                                    <SearchIcon color={'var(--color-primary-50)'} />
                                  </Button>
                                  <Input aria-label="등급" width={50} value={'2급'} readOnly />
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
                            </FormTable>
                          </Gcol>
                        </TabPager>
                      </>
                    )}
                    {/* 연금/저축 */}
                    {viewKey === 'view5' && (
                      <>
                        <Gcol placement={'ss'} className={'w-full'}>
                          <FormTable caption="보험정보" cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
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
                            <FormRow>
                              <FormCell title={'개시연령'}>
                                <NativeSelect aria-label="개시연령 선택" width={120}>
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
                                <NativeSelect aria-label="지급기간 선택" width={120}>
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
                                <RadioGroup defaultValue="연1회">
                                  {[
                                    { value: '연1회', id: 'receive-mode-annual', label: '연1회' },
                                    { value: '매월', id: 'receive-mode-monthly', label: '매월' },
                                    { value: '3개월마다', id: 'receive-mode-quarterly', label: '3개월마다' },
                                    { value: '6개월마다', id: 'receive-mode-semiannual', label: '6개월마다' },
                                  ].map((option) => (
                                    <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </FormCell>
                              <FormCell title={'연금지급형'}>
                                <RadioGroup defaultValue="정액형">
                                  {[{ value: '정액형', id: 'payout-type-fixed', label: '정액형' }].map((option) => (
                                    <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                      {option.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </FormCell>
                            </FormRow>
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
                            {_simpleMode && (
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
                          {_simpleMode && (
                            <FormTable caption="계약자 정보" cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
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
                                    width={75}
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

                              <FormRow>
                                <FormCell title="주피와 관계">
                                  <Input aria-label="피보험자명" width={76} value={'김한화'} readOnly />는 계약자의
                                  <NativeSelect aria-label="주피와 관계 선택" width={156} className="ml-[0.4rem]" required>
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
                                  <NativeSelect aria-label="개인정보취득경로 선택" width={200} required>
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
                                    <Grow>010-1234-5678</Grow>
                                    <KeyValueItem label="전자적안내동의">
                                      <Grow placement="sc" gap="0">
                                        <Badge color="green" size="md" variant="ghost" className="text-[1.4rem]">
                                          Y
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
                      </>
                    )}

                    {/* 계약자 - 상세 */}
                    {!_simpleMode && (
                      <FormTable caption="계약자 정보" cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section">
                            <Input aria-label="피보험자명" width={75} value={'김환화'} readOnly />
                            <Input aria-label="주민등록번호 마스킹" width={110} value={'900101-1******'} readOnly />
                            <Button
                              aria-label="피보험자 검색"
                              variant={'outlined'}
                              only="icon"
                              size={'lg'}
                              color={'gray-light'}
                            >
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <Checkbox color="primary">개인사업자</Checkbox>
                          </FormCell>
                          <FormCell title="개인정보취득경로">
                            <NativeSelect aria-label="개인정보취득경로 선택" width={200} required>
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

                        <FormRow>
                          <FormCell title="계약자와 관계" colSpan={3}>
                            <Input aria-label="피보험자명" width={76} value={'김한화'} readOnly />는 계약자의
                            <NativeSelect aria-label="주피와 관계 선택" width={156} className="ml-[0.4rem]" required>
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
                        </FormRow>

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
                              <Grow>010-1234-5678</Grow>
                              <KeyValueItem label="전자적안내동의">
                                <Grow placement="sc" gap="0">
                                  <Badge color="green" size="md" variant="ghost" className="text-[1.4rem]">
                                    Y
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
                            <NativeSelect aria-label="보험차익비과세 선택" width={'auto'} required className="ml-[0.4rem]">
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
              <MainBottom>
                <MainBottomItem>
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => setIsLtpz014Open(true)}>
                    동영상매뉴얼
                  </Button>
                  <Ltpz014 open={isLtpz014Open} onOpenChange={setIsLtpz014Open} />
                  <Grow gap={1}>
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
    </LayoutMain>
  );
};
