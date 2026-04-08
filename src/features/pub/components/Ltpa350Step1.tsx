'use client';

import { useState } from 'react';
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
import { LayoutMain, LayoutMainFoot } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';

import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

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
};

// State & Reducer Types
export const Ltpa350Step1 = ({ simpleMode: _simpleMode }: Ltpa350Step1Props) => {
  const [viewContents, setViewContents] = useState<Record<string, boolean>>({
    view1: true,
    view2: false,
    view3: false,
    view4: false,
    view5: false,
  });
  const currentViewKey = (Object.keys(viewContents).find((key) => viewContents[key]) ?? 'view1') as ViewKey;

  const { tabs, active, setActive, handleRemove, replaceTabs } = useTabs(DUMMY_DATA.view1);

  return (
    <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem]">
      {/* 퍼블 페이지확인용 */}
      <NativeSelect
        className="fixed top-1 left-[50%] z-100 w-[auto] opacity-80"
        value={currentViewKey}
        onChange={(e) => {
          const selectedKey = e.target.value as ViewKey;

          setViewContents({
            view1: selectedKey === 'view1',
            view2: selectedKey === 'view2',
            view3: selectedKey === 'view3',
            view4: selectedKey === 'view4',
            view5: selectedKey === 'view5',
          });
          replaceTabs(DUMMY_DATA[selectedKey]);
        }}
      >
        <NativeSelectOption value="view1">임시 화면확인용: 인보험</NativeSelectOption>
        <NativeSelectOption value="view2">임시 화면확인용: 태아</NativeSelectOption>
        <NativeSelectOption value="view3">임시 화면확인용: 재물</NativeSelectOption>
        <NativeSelectOption value="view4">임시 화면확인용: 단체</NativeSelectOption>
        <NativeSelectOption value="view5">임시 화면확인용: 연금/저축</NativeSelectOption>
      </NativeSelect>
      {/* 퍼블 페이지확인용 */}

      <LayoutTemplateLTPA350MainBody
        mainBody={
          <Gcol placement={'ss'} className="w-full overflow-x-hidden" gap={3}>
            {/* 인보험 */}
            {viewContents.view1 && (
              <>
                <Grow placement={'ss'} className="w-full">
                  <FormTable cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}>
                    <FormRow>
                      <FormCell title={'보험시기'}>
                        <DatePickerInput mode={'single'} width={'9rem'} />
                        <Button color={'secondary'} only={'default'} size={'lg'} variant={'outlined'}>
                          오늘
                        </Button>
                      </FormCell>
                      <FormCell title={'보험기간'}>
                        <DatePickerInput readOnly mode={'range'} width={'9rem'} />
                      </FormCell>
                    </FormRow>

                    <FormRow>
                      <FormCell title={'만기'} colSpan={3}>
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '80', id: 'insurance-period-80', label: '80세' },
                            { value: '90', id: 'insurance-period-90', label: '90세' },
                            { value: '100', id: 'insurance-period-100-a', label: '100세' },
                            { value: '110', id: 'insurance-period-100-b', label: '110세' },
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
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '10', id: 'payment-period-10', label: '10년납' },
                            { value: '15', id: 'payment-period-15', label: '15년납' },
                            { value: '20', id: 'payment-period-20', label: '20년납' },
                            { value: '25', id: 'payment-period-25', label: '25년납' },
                            { value: '30', id: 'payment-period-30', label: '30년납' },
                            { value: 'life', id: 'payment-period-lifetime', label: '전기납' },
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
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: 'month', id: 'payment-cycle-monthly', label: '월납' },
                            { value: 'quarter', id: 'payment-cycle-quarterly', label: '3개월' },
                            { value: 'semiannual', id: 'payment-cycle-semiannual', label: '6개월' },
                            { value: 'year', id: 'payment-cycle-annual', label: '연납' },
                          ].map((option) => (
                            <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'갱신주기'}>
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '3', id: 'renewal-period-3', label: '3년' },
                            { value: '10', id: 'renewal-period-10', label: '10년' },
                            { value: '20', id: 'renewal-period-20', label: '20년' },
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
                        <RadioGroup width={'full'} className="grid grid-cols-3 gap-x-6 gap-y-2 w-full">
                          {[
                            {
                              value: 'type1',
                              id: 'notification-type-1',
                              label: '1형(일반고지형)',
                              justifyStart: true,
                            },
                            {
                              value: 'type2',
                              id: 'notification-type-2',
                              label: '2형(건강고지형II(6년))',
                              justifyStart: true,
                            },
                            {
                              value: 'type3',
                              id: 'notification-type-3',
                              label: '3형(건강고지형II(7년))',
                              justifyStart: true,
                            },
                            {
                              value: 'type4',
                              id: 'notification-type-4',
                              label: '4형(건강고지형II(8년))',
                              justifyStart: true,
                            },
                            {
                              value: 'type5',
                              id: 'notification-type-5',
                              label: '5형(건강고지형II(9년))',
                              justifyStart: true,
                            },
                            {
                              value: 'type6',
                              id: 'notification-type-6',
                              label: '6형(건강고지형II(10년))',
                              justifyStart: true,
                            },
                          ].map((option) => (
                            <RadioGroupItem
                              key={option.id}
                              className={option.justifyStart ? 'justify-start' : undefined}
                              value={option.value}
                              id={option.id}
                            >
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>

                <Gcol placement="ss" className={'w-full'} gap={2}>
                  {/* 피보험자 */}
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
                          <AddIcon color={'#61554F'} />
                        </Button>
                      </Grow>
                    }
                  >
                    <FormTable
                      caption="행/열 병합 케이스"
                      lineTop={false}
                      cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}
                    >
                      {/* 상세 화면 전용 */}
                      {!_simpleMode ? (
                        <FormRow>
                          <FormCell colSpan={3} title={'피보험자'} titleVariant="section">
                            <Grow className="flex-nowrap w-full" placement={'bwc'}>
                              <Grow>
                                <Input aria-label="피보험자명" width={'7.6rem'} readOnly />
                                <Input aria-label="주민등록번호 마스킹" width={'12rem'} readOnly />
                                <Button
                                  aria-label="피보험자 검색"
                                  variant={'outlined'}
                                  only="icon"
                                  size={'lg'}
                                  color={'gray-light'}
                                >
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="피보험자 나이" width={'4.8rem'} readOnly />
                                <Input aria-label="피보험자 성별" width={'3.2rem'} readOnly />
                              </Grow>
                              <Grow gap={2}>
                                <KeyValueItem label={'상령일'}>
                                  <Grow gap={1}>
                                    <Typo weight={'bold'}>2023-01-12</Typo>
                                    <Badge color={'blue'} size={'md'} variant={'contained'}>
                                      D-31
                                    </Badge>
                                  </Grow>
                                </KeyValueItem>
                                <KeyValueItem label={'설계동의'}>
                                  <Grow gap={1}>
                                    <Typo weight={'bold'}>2023-01-12</Typo>
                                    <Badge color={'red'} size={'md'} variant={'contained'}>
                                      D-31
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
                              clear
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
                              width={'7.6rem'}
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
                            <RadioGroup className="flex-row gap-3">
                              <RadioGroupItem value="man" id="man" checked>
                                남
                              </RadioGroupItem>
                              <RadioGroupItem value="woman" id="woman">
                                여
                              </RadioGroupItem>
                            </RadioGroup>
                          </FormCell>
                          <FormCell title="연령">
                            <Grow gap={3}>
                              <Grow>
                                <Input aria-label="피보험자 나이" width={'4.6rem'} value={''} required />세
                              </Grow>
                              <DatePickerInput mode={'single'} width={'9rem'} required />
                            </Grow>
                          </FormCell>
                        </FormRow>
                      )}

                      <FormRow>
                        <FormCell title="직업" colSpan={3}>
                          <Grow className="gap-1 flex-nowrap w-full" placement={'ss'}>
                            <Input aria-label="직업코드" width={'7.6rem'} readOnly />
                            <Input aria-label="직업분류" width={'27.4rem'} readOnly />
                            <Button
                              aria-label="피보험자 검색"
                              variant={'outlined'}
                              only="icon"
                              size={'lg'}
                              color={'gray-light'}
                            >
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <Input aria-label="피보험자 나이" width={'2xs'} readOnly />
                          </Grow>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="운전형태">
                          <RadioGroup className="flex-row gap-3">
                            {[
                              { value: 'private', id: 'driving-type-private', label: '자가용' },
                              { value: 'commercial', id: 'driving-type-commercial', label: '영업용' },
                              { value: 'nondriver', id: 'driving-type-nondriver', label: '비운전자' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                        <FormCell title="이륜차">
                          <RadioGroup className="flex-row gap-3">
                            {[
                              { value: 'drives', id: 'motorcycle-drives', label: '운전함' },
                              { value: 'nondriver', id: 'motorcycle-nondriver', label: '운전안함' },
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
                          <Input aria-label="피보험자명" width={'7.6rem'} readOnly />는 계약자의
                          <NativeSelect aria-label="계약자와의 관계 선택" width={'15.8rem'} required>
                            <NativeSelectOption>주피와</NativeSelectOption>
                          </NativeSelect>
                        </FormCell>
                        <FormCell title="(실손)동시설계">
                          <Input aria-label="코드" width={'13rem'} readOnly />
                          <Input aria-label="코드" width={'13rem'} commaAmount readOnly />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title={'할인적용'} colSpan={3}>
                          <Checkbox color="primary" size="md" variant="default">
                            가족연계할인
                          </Checkbox>
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
                      </FormRow>
                    </FormTable>
                  </TabPager>

                  {/* 계약자 - 상세 */}
                  {!_simpleMode && (
                    <FormTable caption="계약자 정보" cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}>
                      <FormRow>
                        <FormCell title={'계약자'} titleVariant="section" colSpan={3}>
                          <Grow>
                            <Input aria-label="계약자명" width="7.6rem" readOnly />
                            <Input aria-label="주민등록번호 마스킹" width="12rem" readOnly />
                            <Button
                              aria-label="피보험자 검색"
                              variant="outlined"
                              only="icon"
                              color="gray-light"
                              size="lg"
                            >
                              <SearchIcon color="var(--color-primary-50)" />
                            </Button>
                            <Checkbox color="primary" size="md" variant="default">
                              개인사업자
                            </Checkbox>
                          </Grow>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="계약자와 관계">
                          <Input aria-label="피보험자명" width={'7.6rem'} readOnly />는 계약자의
                          <NativeSelect aria-label="계약자와의 관계 선택" width={'15.8rem'} required>
                            <NativeSelectOption>계약</NativeSelectOption>
                          </NativeSelect>
                        </FormCell>
                        <FormCell title="개인정보취득경로">
                          <NativeSelect aria-label="개인정보취득경로 선택" width="20rem" required>
                            {[
                              { value: 'selection', id: 'personalinfo-1', label: '고객직접선택' },
                              { value: 'selection2', id: 'personalinfo-2', label: '선택' },
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
                        <FormCell title="직장(본사)" colSpan={3}>
                          dddd
                        </FormCell>
                      </FormRow>

                      <FormRow>
                        <FormCell title="연락처">
                          <Grow placement="bwc">
                            <Grow>010-1234-5678</Grow>
                            <KeyValueItem label="전자적안내동의">
                              <Grow placement="sc" gap="0">
                                <Badge color="green" size="md" variant="ghost">
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
                          <Checkbox color="primary" size="md" variant="default">
                            가입
                          </Checkbox>
                          <NativeSelect aria-label="비과세 유형 선택" width="17rem">
                            {[
                              { value: 'monthly', id: 'monthly-payment-monthly', label: '월납식비과세' },
                              {
                                value: 'nonemonthly',
                                id: 'monthly-payment-nonemonthly',
                                label: '비월납식비과세',
                              },
                            ].map((option) => (
                              <NativeSelectOption key={option.id} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </FormCell>
                        <FormCell title="설계금액/잔여한도">
                          <Input aria-label="설계금액" width="7.1rem" commaAmount readOnly />
                          /
                          <Input aria-label="잔여한도" width="7.1rem" commaAmount readOnly />
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
            {/* 태아 */}
            {viewContents.view2 && (
              <>
                <Grow placement={'ss'} className={'w-full'}>
                  <FormTable caption="보험정보" cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}>
                    <FormRow>
                      <FormCell title={'보험시기'}>
                        <DatePickerInput mode={'single'} width={'9rem'} />
                        <Button color={'secondary'} only={'default'} size={'lg'} variant={'outlined'}>
                          오늘
                        </Button>
                      </FormCell>
                      <FormCell title={'보험기간'}>
                        <DatePickerInput readOnly mode={'range'} width={'9rem'} />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'만기'} colSpan={3}>
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '100', id: 'child-insurance-period-100', label: '100세만기' },
                            { value: '90', id: 'child-insurance-period-90', label: '90세만기' },
                            { value: '80', id: 'child-insurance-period-80', label: '80세만기' },
                            { value: '55', id: 'child-insurance-period-55', label: '55세만기' },
                            { value: '30', id: 'child-insurance-period-30', label: '30세만기' },
                            { value: '20', id: 'child-insurance-period-20', label: '20세만기' },
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
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '10', id: 'child-payment-period-10', label: '10년납' },
                            { value: '15', id: 'child-payment-period-15', label: '15년납' },
                            { value: '20', id: 'child-payment-period-20', label: '20년납' },
                            { value: '25', id: 'child-payment-period-25', label: '25년납' },
                            { value: '30', id: 'child-payment-period-30', label: '30년납' },
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
                        <RadioGroup className="flex-row gap-3">
                          {[{ value: 'month', id: 'child-payment-cycle-monthly', label: '월납' }].map((option) => (
                            <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'갱신주기'}>
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '20', id: 'child-renewal-period-20', label: '20년' },
                            { value: '10', id: 'child-renewal-period-10', label: '10년' },
                            { value: '3', id: 'child-renewal-period-3', label: '3년' },
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
                          <Checkbox color="primary" size="md" variant="default">
                            가입
                          </Checkbox>
                          <Checkbox color="primary" size="md" variant="default">
                            다태아
                          </Checkbox>
                          <Checkbox color="primary" size="md" variant="default">
                            수수료선지급
                          </Checkbox>
                        </Grow>
                      </FormCell>
                      <FormCell title={'계약전환'}>
                        <Checkbox color="primary" size="md" variant="default">
                          신청
                        </Checkbox>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
                <Gcol placement="ss" className={'w-full'} gap={2}>
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
                          <AddIcon color={'#61554F'} />
                        </Button>
                      </Grow>
                    }
                  >
                    <FormTable
                      caption="피보험자 정보"
                      lineTop={false}
                      cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}
                    >
                      {!_simpleMode ? (
                        <FormRow>
                          <FormCell colSpan={3} title={'피보험자'} titleVariant="section">
                            <Grow className="flex-nowrap w-full" placement={'bwc'}>
                              <Grow>
                                <Input aria-label="피보험자명" width={'7.6rem'} readOnly />
                                <Input aria-label="주민등록번호 마스킹" width={'12rem'} readOnly />
                                <Button
                                  aria-label="피보험자 검색"
                                  variant={'outlined'}
                                  only="icon"
                                  size={'lg'}
                                  color={'gray-light'}
                                >
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="피보험자 나이" width={'4.6rem'} readOnly />
                                <Input aria-label="피보험자 성별" width={'3.2rem'} readOnly />
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
                              clear
                              onChange={() => {}}
                              options={[
                                {
                                  label: <td>박은빈</td>,
                                  value: '박은빈',
                                },
                                {
                                  label: <td>김민지</td>,
                                  value: '김민지',
                                },
                              ]}
                              placeholder=""
                              required
                              size="lg"
                              value=""
                              variant="default"
                              width={'7.6rem'}
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
                            <RadioGroup className="flex-row gap-3">
                              <RadioGroupItem value="man" id="man" checked>
                                남
                              </RadioGroupItem>
                              <RadioGroupItem value="woman" id="woman">
                                여
                              </RadioGroupItem>
                            </RadioGroup>
                          </FormCell>
                          <FormCell title="연령">
                            <Grow gap={3}>
                              <Grow>
                                <Input aria-label="피보험자 나이" width={'4.6rem'} value={''} required />세
                              </Grow>
                              <DatePickerInput mode={'single'} width={'9rem'} required />
                            </Grow>
                          </FormCell>
                        </FormRow>
                      )}
                      <FormRow>
                        <FormCell title="직업" colSpan={3}>
                          <Grow className="gap-1 flex-nowrap w-full" placement={'ss'}>
                            <Input aria-label="직업코드" width={'7.6rem'} readOnly />
                            <Input aria-label="직업분류" width={'27.4rem'} readOnly />
                            <Button
                              aria-label="직업 검색"
                              variant={'outlined'}
                              only="icon"
                              size={'lg'}
                              color={'gray-light'}
                            >
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <Input aria-label="직업급수" width={'2xs'} readOnly />
                          </Grow>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="운전형태">
                          <RadioGroup className="flex-row gap-3">
                            {[
                              { value: 'private', id: 'child-driving-type-private', label: '자가용' },
                              { value: 'commercial', id: 'child-driving-type-commercial', label: '영업용' },
                              { value: 'nondriver', id: 'child-driving-type-nondriver', label: '비운전자' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                        </FormCell>
                        <FormCell title="이륜차">
                          <RadioGroup className="flex-row gap-3">
                            {[
                              { value: 'drives', id: 'child-motorcycle-drives', label: '운전함' },
                              { value: 'nondriver', id: 'child-motorcycle-nondriver', label: '운전안함' },
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
                          <Input aria-label="피보험자명" width={'7.6rem'} readOnly />는 계약자의
                          <NativeSelect aria-label="계약자와의 관계 선택" width={'15.8rem'} required>
                            {[
                              { value: 'spouse', id: 'child-relationship-spouse', label: '배우자' },
                              { value: 'child', id: 'child-relationship-child', label: '자녀' },
                              { value: 'sibling', id: 'child-relationship-sibling', label: '형제자매' },
                              { value: 'parent', id: 'child-relationship-parent', label: '부모' },
                              { value: 'etc', id: 'child-relationship-etc', label: '기타' },
                            ].map((option) => (
                              <NativeSelectOption key={option.id} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </FormCell>
                        <FormCell title="(실손)동시설계">
                          <Input aria-label="설계번호" width={'13rem'} readOnly />
                          <Input aria-label="보험료" width={'13rem'} commaAmount readOnly />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="할인적용">
                          <Checkbox size="md" variant="default">
                            가족연계할인
                          </Checkbox>
                          <Button aria-label="검색" variant="outlined" only="icon" size="lg" color="gray-light">
                            <SearchIcon color="var(--color-primary-50)" />
                          </Button>
                        </FormCell>
                        <FormCell title="임신주수">
                          <Input aria-label="임신주수" width={'5rem'} required />
                          주 (출산예정일)
                          <DatePickerInput mode={'single'} width={'9rem'} required />)
                        </FormCell>
                      </FormRow>
                    </FormTable>
                  </TabPager>

                  {!_simpleMode && (
                    <FormTable caption="계약자 정보" cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}>
                      <FormRow>
                        <FormCell title={'계약자'} titleVariant="section" colSpan={3}>
                          <Grow>
                            <Input aria-label="계약자명" width="7.6rem" readOnly />
                            <Input aria-label="주민등록번호 마스킹" width="12rem" readOnly />
                            <Button
                              aria-label="계약자 검색"
                              variant="outlined"
                              only="icon"
                              color="gray-light"
                              size="lg"
                            >
                              <SearchIcon color="var(--color-primary-50)" />
                            </Button>
                            <Checkbox color="primary" size="md" variant="default">
                              개인사업자
                            </Checkbox>
                          </Grow>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="계약자와 관계">
                          <Input aria-label="피보험자명" width={'7.6rem'} readOnly />는 계약자의
                          <NativeSelect aria-label="계약자와의 관계 선택" width={'15.8rem'} required>
                            {[
                              { value: 'spouse', id: 'relationship-spouse', label: '배우자' },
                              { value: 'child', id: 'relationship-child', label: '자녀' },
                              { value: 'sibling', id: 'relationship-sibling', label: '형제자매' },
                              { value: 'parent', id: 'relationship-parent', label: '부모' },
                              { value: 'etc', id: 'relationship-etc', label: '기타' },
                            ].map((option) => (
                              <NativeSelectOption key={option.id} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </FormCell>
                        <FormCell title="개인정보취득경로">
                          <NativeSelect aria-label="개인정보취득경로 선택" width="20rem" required>
                            {[
                              { value: 'selection', id: 'child-personalinfo-1', label: '고객직접선택' },
                              { value: 'selection2', id: 'child-personalinfo-2', label: '선택' },
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
                          ddddd
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="직장(본사)" colSpan={3}>
                          ddddd{' '}
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="연락처">
                          <Grow placement="bwc">
                            <Grow>010 2222 2222</Grow>
                            <Grow>
                              <KeyValueItem label="전자적안내동의">
                                <Grow placement="sc" gap="0">
                                  <Badge color="green" size="md" variant="ghost">
                                    ddaffd
                                  </Badge>
                                  <TooltipQ>{tooltipContents[0]}</TooltipQ>
                                </Grow>
                              </KeyValueItem>
                            </Grow>
                          </Grow>
                        </FormCell>
                        <FormCell title="이메일">dddddd</FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="보험차익비과세">
                          <Checkbox color="primary" size="md" variant="default">
                            가입
                          </Checkbox>
                          <NativeSelect aria-label="비과세 유형 선택" width="17rem">
                            {[
                              { value: 'monthly', id: 'child-monthly-payment-monthly', label: '월납식비과세' },
                              {
                                value: 'nonemonthly',
                                id: 'child-monthly-payment-nonemonthly',
                                label: '비월납식비과세',
                              },
                            ].map((option) => (
                              <NativeSelectOption key={option.id} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </FormCell>
                        <FormCell title="설계금액/잔여한도">
                          <Input aria-label="설계금액" width="7.1rem" commaAmount readOnly />
                          /
                          <Input aria-label="잔여한도" width="7.1rem" commaAmount readOnly />
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
            {/* 재물 */}
            {viewContents.view3 && (
              <>
                <Grow placement={'ss'} className={'w-full'}>
                  <FormTable caption="재물보험 정보" cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}>
                    <FormRow>
                      <FormCell title={'보험시기'}>
                        <DatePickerInput mode={'single'} width={'9rem'} />
                        <Button color={'secondary'} only={'default'} size={'lg'} variant={'outlined'}>
                          오늘
                        </Button>
                      </FormCell>
                      <FormCell title={'보험기간'}>
                        <DatePickerInput readOnly mode={'range'} width={'9rem'} />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'만기'} colSpan={3}>
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '03', id: 'child-insurance-period-03', label: '03세 만기' },
                            { value: '05', id: 'child-insurance-period-05', label: '05세 만기' },
                            { value: '07', id: 'child-insurance-period-07', label: '07세 만기' },
                            { value: '10', id: 'child-insurance-period-10', label: '10세 만기' },
                            { value: '15', id: 'child-insurance-period-15', label: '15세 만기' },
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
                        <RadioGroup className="flex-row gap-3">
                          {[{ value: 'Y', id: 'property-payment-period-full', label: '전기납' }].map((option) => (
                            <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'단체취급'}>
                        <Checkbox color="primary" size="md" variant="default"></Checkbox>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'납입주기'}>
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: 'month', id: 'property-payment-cycle-monthly', label: '월납' },
                            { value: 'year', id: 'property-payment-cycle-yearly', label: '연납' },
                          ].map((option) => (
                            <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'갱신주기'}>
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '3', id: 'property-renewal-cycle-3', label: '3년' },
                            { value: '5', id: 'property-renewal-cycle-5', label: '5년' },
                          ].map((option) => (
                            <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
                <Gcol placement="ss" className={'w-full'} gap={2}>
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
                          <AddIcon color={'#61554F'} />
                        </Button>
                        <Button color={'gray'} size={'md'} variant={'outlined'}>
                          목적물
                          <AddIcon color={'#61554F'} />
                        </Button>
                      </Grow>
                    }
                  >
                    <Gcol placement={'ss'}>
                      <FormTable
                        caption="피보험자 정보"
                        lineTop={false}
                        cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}
                      >
                        {!_simpleMode ? (
                          <FormRow>
                            <FormCell colSpan={3} title={'피보험자'} titleVariant="section">
                              <Grow className="flex-nowrap w-full" placement={'bwc'}>
                                <Grow>
                                  <Input aria-label="피보험자명" width={'7.6rem'} readOnly />
                                  <Input aria-label="주민등록번호 마스킹" width={'12rem'} readOnly />
                                  <Button
                                    aria-label="피보험자 검색"
                                    variant={'outlined'}
                                    only="icon"
                                    size={'lg'}
                                    color={'gray-light'}
                                  >
                                    <SearchIcon color={'var(--color-primary-50)'} />
                                  </Button>
                                  <Input aria-label="피보험자 나이" width={'4.6rem'} readOnly />
                                  <Input aria-label="피보험자 성별" width={'3.2rem'} readOnly />
                                </Grow>
                                <Grow gap={2}>
                                  <KeyValueItem label={'상령일'}>
                                    <Grow gap={1}>
                                      <Typo weight={'bold'}>2024-12-22</Typo>
                                      <Badge color={'blue'} size={'md'} variant={'contained'}>
                                        D-11
                                      </Badge>
                                    </Grow>
                                  </KeyValueItem>
                                  <KeyValueItem label={'설계동의'}>
                                    <Grow gap={1}>
                                      <Typo weight={'bold'}>2024-12-22</Typo>
                                      <Badge color={'red'} size={'md'} variant={'contained'}>
                                        D-11
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
                                clear
                                onChange={() => {}}
                                options={[
                                  {
                                    label: <td>김민지</td>,
                                    value: 'LA24094848896',
                                  },
                                  {
                                    label: <td>이도현</td>,
                                    value: 'LA25094848897',
                                  },
                                ]}
                                placeholder=""
                                required
                                size="lg"
                                value=""
                                variant="default"
                                width={'7.6rem'}
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
                              <RadioGroup className="flex-row gap-3">
                                <RadioGroupItem value="man" id="man" checked>
                                  남
                                </RadioGroupItem>
                                <RadioGroupItem value="woman" id="woman">
                                  여
                                </RadioGroupItem>
                              </RadioGroup>
                            </FormCell>
                            <FormCell title="연령">
                              <Grow gap={3}>
                                <Grow>
                                  <Input aria-label="피보험자 나이" width={'4.6rem'} value={''} required />세
                                </Grow>
                                <DatePickerInput mode={'single'} width={'9rem'} required />
                              </Grow>
                            </FormCell>
                          </FormRow>
                        )}
                        <FormRow>
                          <FormCell title="직업" colSpan={3}>
                            <Grow className="gap-1 flex-nowrap w-full" placement={'ss'}>
                              <Input aria-label="직업코드" width={'7.6rem'} readOnly />
                              <Input aria-label="직업분류" width={'27.4rem'} readOnly />
                              <Button
                                aria-label="직업 검색"
                                variant={'outlined'}
                                only="icon"
                                size={'lg'}
                                color={'gray-light'}
                              >
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input aria-label="직업급수" width={'2xs'} readOnly />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="운전형태">
                            <RadioGroup className="flex-row gap-3">
                              {[
                                { value: 'private', id: 'property-driving-type-private', label: '자가용' },
                                { value: 'commercial', id: 'property-driving-type-commercial', label: '영업용' },
                                { value: 'nondriver', id: 'property-driving-type-nondriver', label: '비운전자' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                          <FormCell title="이륜차">
                            <RadioGroup className="flex-row gap-3">
                              {[
                                { value: 'drives', id: 'property-motorcycle-drives', label: '운전함' },
                                { value: 'nondriver', id: 'property-motorcycle-nondriver', label: '운전안함' },
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
                            <Input aria-label="피보험자명" width={'7.6rem'} readOnly />는
                            <NativeSelect aria-label="계약자와의 관계 선택" width={'15.8rem'} required>
                              {[
                                {
                                  value: '고용주(사업주)',
                                  id: 'property-contractor-info-employer',
                                  label: '고용주(사업주)',
                                },
                                {
                                  value: '고용인(종업원)',
                                  id: 'property-contractor-info-employee',
                                  label: '고용인(종업원)',
                                },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                      </FormTable>

                      <FormTable
                        caption="목적물 소유자 정보"
                        lineTop={false}
                        cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}
                      >
                        <FormRow>
                          <FormCell colSpan={3} title={'소유자'} titleVariant="section">
                            <Grow className="flex-nowrap w-full" placement={'bwc'}>
                              <Grow>
                                <Input aria-label="소유자명" width={'7.6rem'} readOnly />
                                <Input aria-label="주민등록번호 마스킹" width={'12rem'} readOnly />
                                <Button
                                  aria-label="소유자 검색"
                                  variant={'outlined'}
                                  only="icon"
                                  size={'lg'}
                                  color={'gray-light'}
                                >
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="소유자 나이" width={'4.6rem'} readOnly />
                                <Input aria-label="소유자 성별" width={'3.2rem'} readOnly />
                              </Grow>
                              <Grow gap={2}>
                                <Checkbox color="primary" size="md" variant="default">
                                  계약자와 동일
                                </Checkbox>
                                <Grow>
                                  (
                                  <Checkbox color="primary" size="md" variant="default">
                                    자택
                                  </Checkbox>
                                  <Checkbox color="primary" size="md" variant="default">
                                    직장
                                  </Checkbox>
                                  <Button color={'secondary'} size={'lg'} variant={'contained'}>
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
                            <Input aria-label="목적물명" width={'7.6rem'} />
                            <Button aria-label="목적물 주소찾기" variant={'outlined'} size={'lg'} color={'gray-light'}>
                              주소찾기
                            </Button>
                            <Input aria-label="목적물 소재지" readOnly />
                            <Input aria-label="목적물 소재지" />
                            <Input aria-label="목적물 소재지" readOnly />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="가입업종">
                            <Input aria-label="가입업종코드" width={'7.6rem'} readOnly />
                            <Button
                              aria-label="가입업종 검색"
                              variant={'outlined'}
                              only="icon"
                              size={'lg'}
                              color={'gray-light'}
                            >
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <Input aria-label="가입업종명" width={'26rem'} readOnly />
                          </FormCell>
                          <FormCell title="건물급수">
                            <Input aria-label="건물급수" width={'5rem'} readOnly /> 급 (적용급수
                            <Input aria-label="적용급수" width={'5rem'} readOnly /> 급)
                            <Button aria-label="건물구조입력" variant={'outlined'} size={'lg'} color={'gray-light'}>
                              건물구조입력
                            </Button>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="요율적용업종">
                            <Input aria-label="요율적용업종코드" width={'7.6rem'} readOnly />
                            <Input aria-label="요율적용업종명" width={'27.4rem'} readOnly />
                          </FormCell>
                          <FormCell title="건물상세">
                            지상 <Input aria-label="건물 지상층" width={'5rem'} readOnly /> 층 / 지하
                            <Input aria-label="건물 지하층" width={'5rem'} readOnly /> 층 /
                            <Input aria-label="건물 폭" width={'5rem'} readOnly /> ㎡
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="실손보상구분">
                            <NativeSelect aria-label="실손보상구분" width={'20rem'} required>
                              {[{ value: 'selection', id: 'property-reimbursement-1', label: '선택' }].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                            <Button aria-label="알림톡발송" variant={'outlined'} size={'lg'} color={'gray-light'}>
                              알림톡발송
                            </Button>
                            <Checkbox color="primary" size="md" variant="default">
                              소화기 있음
                            </Checkbox>
                          </FormCell>
                          <FormCell title="기타상세">
                            <Grow gap={3}>
                              <Checkbox color="primary" size="md" variant="default">
                                <Button aria-label="특수건물" variant={'outlined'} size={'lg'} color={'gray-light'}>
                                  특수건물
                                </Button>
                              </Checkbox>
                              <Checkbox color="primary" size="md" variant="default">
                                <Button aria-label="복합건물" variant={'outlined'} size={'lg'} color={'gray-light'}>
                                  복합건물
                                </Button>
                              </Checkbox>
                            </Grow>
                          </FormCell>
                        </FormRow>
                      </FormTable>

                      {/*// 간편 화면 미노출 */}
                    </Gcol>
                  </TabPager>

                  {!_simpleMode && (
                    <FormTable caption="계약자 정보" cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}>
                      <FormRow>
                        <FormCell title={'계약자'} titleVariant="section">
                          <Grow>
                            <Input aria-label="계약자명" width="7.6rem" readOnly />
                            <Input aria-label="주민등록번호 마스킹" width="12rem" readOnly />
                            <Button
                              aria-label="계약자 검색"
                              variant="outlined"
                              only="icon"
                              color="gray-light"
                              size="lg"
                            >
                              <SearchIcon color="var(--color-primary-50)" />
                            </Button>
                            <Checkbox color="primary" size="md" variant="default">
                              개인사업자
                            </Checkbox>
                          </Grow>
                        </FormCell>
                        <FormCell title="개인정보취득경로">
                          <NativeSelect aria-label="개인정보취득경로 선택" width="20rem" required>
                            {[
                              { value: 'selection', id: 'property-personalinfo-1', label: '고객직접선택' },
                              { value: 'selection2', id: 'property-personalinfo-2', label: '선택' },
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
                          <Input aria-label="피보험자명" width={'7.6rem'} readOnly />는 계약자의
                          <NativeSelect aria-label="계약자와의 관계 선택" width={'15.8rem'} required>
                            {[
                              { value: 'spouse', id: 'property-relationship-spouse', label: '배우자' },
                              { value: 'child', id: 'property-relationship-child', label: '자녀' },
                              { value: 'sibling', id: 'property-relationship-sibling', label: '형제자매' },
                              { value: 'parent', id: 'property-relationship-parent', label: '부모' },
                              { value: 'etc', id: 'property-relationship-etc', label: '기타' },
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
                          dddd
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="직장(본사)" colSpan={3}>
                          aaaaa
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="연락처">
                          <Grow placement="bwc">
                            <Grow>010 20020 02</Grow>
                            <Grow>
                              <KeyValueItem label="전자적안내동의">
                                <Grow placement="sc" gap="0">
                                  <Badge color="green" size="md" variant="ghost">
                                    Y
                                  </Badge>
                                  <TooltipQ>{tooltipContents[0]}</TooltipQ>
                                </Grow>
                              </KeyValueItem>
                            </Grow>
                          </Grow>
                        </FormCell>
                        <FormCell title="이메일">dsfasdfas</FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="보험차익비과세">
                          <Checkbox color="primary" size="md" variant="default">
                            가입
                          </Checkbox>
                          <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                            알림톡발송
                          </Button>
                        </FormCell>
                        <FormCell title="설계금액/잔여한도">
                          <Input aria-label="설계금액" width="7.1rem" commaAmount readOnly />
                          /
                          <Input aria-label="잔여한도" width="7.1rem" commaAmount readOnly />
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
            {/* 단체 */}
            {viewContents.view4 && (
              <>
                <Grow placement={'ss'} className={'w-full'}>
                  <FormTable caption="보험정보" cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}>
                    <FormRow>
                      <FormCell title={'보험시기'}>
                        <DatePickerInput mode={'single'} width={'9rem'} />
                        <Button color={'secondary'} only={'default'} size={'lg'} variant={'outlined'}>
                          오늘
                        </Button>
                      </FormCell>
                      <FormCell title={'보험기간'}>
                        <DatePickerInput readOnly mode={'range'} width={'9rem'} />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'만기'} colSpan={3}>
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '03', id: 'group-insurance-period-03', label: '03년' },
                            { value: '05', id: 'group-insurance-period-05', label: '05년' },
                            { value: '07', id: 'group-insurance-period-07', label: '07년' },
                            { value: '10', id: 'group-insurance-period-10', label: '10년' },
                            { value: '15', id: 'group-insurance-period-15', label: '15년' },
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
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '03', id: 'group-payment-period-03', label: '03년납' },
                            { value: '05', id: 'group-payment-period-05', label: '05년납' },
                            { value: '07', id: 'group-payment-period-07', label: '07년납' },
                            { value: '10', id: 'group-payment-period-10', label: '10년납' },
                            { value: 'all', id: 'group-payment-period-all', label: '전기납' },
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
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: 'month', id: 'group-payment-cycle-monthly', label: '월납' },
                            { value: 'quarter', id: 'group-payment-cycle-quarterly', label: '3개월' },
                            { value: 'semiannual', id: 'group-payment-cycle-semiannual', label: '6개월' },
                            { value: 'year', id: 'group-payment-cycle-annual', label: '연납' },
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
                        <RadioGroup onValueChange={() => {}} className="flex-row gap-3">
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
                        <Grow placement="bwc" gap={3}>
                          <RadioGroup onValueChange={() => {}} className="flex-row gap-3">
                            {[
                              { value: 'type1', id: 'group-type-1', label: '1종(급여단체)' },
                              { value: 'type2', id: 'group-type-2', label: '2종(비급여단체)' },
                              { value: 'type3', id: 'group-type-3', label: '3종(임의단체)' },
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
                      <FormCell title={'총인원수'}>
                        <Input aria-label="총인원" width={'6rem'} />
                        명(전체 근로자 수)
                      </FormCell>
                      <FormCell title={'인원현황'}>
                        <Grow className="flex-nowrap">
                          <Input aria-label="가입인원" width={'6rem'} readOnly /> 명 / 가입비율
                          <Input aria-label="가입비율" width={'6rem'} readOnly />%
                        </Grow>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
                <Gcol placement="ss" className={'w-full'} gap={2}>
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
                          <AddIcon color={'#61554F'} />
                        </Button>
                        <Button color={'gray'} size={'md'} variant={'outlined'}>
                          단쳬입력
                          <AddIcon color={'#61554F'} />
                        </Button>
                        <Button color={'gray'} size={'md'} variant={'outlined'}>
                          단체규약
                          <AddIcon color={'#61554F'} />
                        </Button>
                      </Grow>
                    }
                  >
                    <Gcol placement={'ss'}>
                      <FormTable
                        caption="그룹 정보"
                        lineTop={false}
                        cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}
                      >
                        <FormRow>
                          <FormCell title={'그룹명'} titleVariant="section">
                            <Input aria-label="그룹명" width={'12rem'} />
                            <Grow className="flex-nowrap w-full" placement={'bwc'}></Grow>
                          </FormCell>
                          <FormCell title="보험나이">
                            <Input aria-label="보험나이" width={'5rem'} />세
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="성별">
                            <RadioGroup onValueChange={() => {}} className="flex-row gap-3">
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
                            <Input aria-label="인원" width={'5rem'} />명
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="직업" colSpan={3}>
                            <Grow className="gap-1 flex-nowrap w-full" placement={'ss'}>
                              <Input aria-label="직업코드" width={'7.6rem'} readOnly />
                              <Input aria-label="직업분류" width={'27.4rem'} readOnly />
                              <Button
                                aria-label="직업 검색"
                                variant={'outlined'}
                                only="icon"
                                size={'lg'}
                                color={'gray-light'}
                              >
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input aria-label="직업등급" width={'2xs'} readOnly />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="운전형태" colSpan={3}>
                            <RadioGroup className="flex-row gap-3">
                              {[
                                { value: 'private', id: 'group-driving-type-private', label: '자가용' },
                                { value: 'commercial', id: 'group-driving-type-commercial', label: '영업용' },
                                { value: 'nondriver', id: 'group-driving-type-nondriver', label: '비운전자' },
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

                  {!_simpleMode && (
                    <FormTable caption="계약자 정보" cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}>
                      <FormRow>
                        <FormCell title={'계약자'} titleVariant="section" colSpan={3}>
                          <Grow>
                            <Input aria-label="계약자명" width="7.6rem" readOnly />
                            <Input aria-label="주민등록번호 마스킹" width="12rem" readOnly />
                            <Button
                              aria-label="계약자 검색"
                              variant="outlined"
                              only="icon"
                              color="gray-light"
                              size="lg"
                            >
                              <SearchIcon color="var(--color-primary-50)" />
                            </Button>
                            <Checkbox color="primary" size="md" variant="default">
                              개인사업자
                            </Checkbox>
                          </Grow>
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="계약자와 관계">
                          <Input aria-label="계약자" width={'14rem'} readOnly />는 계약자의
                          <NativeSelect aria-label="계약자와 관계 선택" width={'14rem'} required>
                            {[{ value: 'spouse', id: 'group-relationship-spouse', label: '배우자' }].map((option) => (
                              <NativeSelectOption key={option.id} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </FormCell>
                        <FormCell title="개인정보취득경로">
                          <NativeSelect aria-label="개인정보취득경로 선택" width="20rem" readOnly>
                            {[
                              { value: '단체계약', id: 'group-personalinfo-1', label: '단체계약' },
                              { value: 'selection', id: 'group-personalinfo-2', label: '고객직접선택' },
                              { value: 'selection2', id: 'group-personalinfo-3', label: '선택' },
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
                          ㄴㅇㅁㄴㄹㄴㅇ
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="직장(본사)" colSpan={3}>
                          ㄴㅇㅁㄹㄴㅇㄹ
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="연락처">
                          <Grow placement="bwc">
                            <Grow>010 02020 0202</Grow>
                            <Grow>
                              <KeyValueItem label="전자적안내동의">
                                <Grow placement="sc" gap="0">
                                  <Badge color="green" size="md" variant="ghost">
                                    Y
                                  </Badge>
                                  <TooltipQ>{tooltipContents[0]}</TooltipQ>
                                </Grow>
                              </KeyValueItem>
                            </Grow>
                          </Grow>
                        </FormCell>
                        <FormCell title="이메일">sdafasdf@sdfs,ddd</FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title="보험차익비과세">
                          <Checkbox color="primary" size="md" variant="default">
                            가입
                          </Checkbox>
                          <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                            알림톡발송
                          </Button>
                        </FormCell>
                        <FormCell title="설계금액/잔여한도">
                          <Input aria-label="설계금액" width="7.1rem" commaAmount readOnly />
                          /
                          <Input aria-label="잔여한도" width="7.1rem" commaAmount readOnly />
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
            {/* 연금/저축 */}
            {viewContents.view5 && (
              <>
                <Grow placement={'ss'} className={'w-full'}>
                  <FormTable caption="보험정보" cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}>
                    <FormRow>
                      <FormCell title={'보험시기'}>
                        <DatePickerInput mode={'single'} width={'9rem'} />
                        <Button color={'secondary'} only={'default'} size={'lg'} variant={'outlined'}>
                          오늘
                        </Button>
                      </FormCell>
                      <FormCell title={'보험기간'}>
                        <DatePickerInput readOnly mode={'range'} width={'9rem'} />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'개시연령'}>
                        <NativeSelect aria-label="개시연령 선택" width="13rem">
                          {[
                            { value: '50', id: 'pension-age-50', label: '50세' },
                            { value: '55', id: 'pension-age-55', label: '55세' },
                            { value: '60', id: 'pension-age-60', label: '60세' },
                            { value: '65', id: 'pension-age-65', label: '65세' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'지급기간'}>
                        <NativeSelect aria-label="지급기간 선택" width="13rem">
                          {[
                            { value: '5', id: 'pension-payout-5', label: '5년' },
                            { value: '10', id: 'pension-payout-10', label: '10년' },
                            { value: '15', id: 'pension-payout-15', label: '15년' },
                            { value: '20', id: 'pension-payout-20', label: '20년' },
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
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: 'annual', id: 'receive-mode-annual', label: '연1회' },
                            { value: 'monthly', id: 'receive-mode-monthly', label: '매월' },
                            { value: 'quarterly', id: 'receive-mode-quarterly', label: '3개월마다' },
                            { value: 'semiannual', id: 'receive-mode-semiannual', label: '6개월마다' },
                          ].map((option) => (
                            <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'연금지급형'}>
                        <RadioGroup className="flex-row gap-3">
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
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: '5', id: 'pension-pay-period-5', label: '05년납' },
                            { value: '10', id: 'pension-pay-period-10', label: '10년납' },
                            { value: '15', id: 'pension-pay-period-15', label: '15년납' },
                            { value: '20', id: 'pension-pay-period-20', label: '20년납' },
                            { value: '25', id: 'pension-pay-period-25', label: '25년납' },
                            { value: '30', id: 'pension-pay-period-30', label: '30년납' },
                            { value: 'continuous', id: 'pension-pay-period-continuous', label: '전기납' },
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
                        <RadioGroup className="flex-row gap-3">
                          {[
                            { value: 'month', id: 'pension-cycle-monthly', label: '월납' },
                            { value: 'quarter', id: 'pension-cycle-quarterly', label: '3개월' },
                            { value: 'semiannual', id: 'pension-cycle-semiannual', label: '6개월' },
                            { value: 'year', id: 'pension-cycle-annual', label: '연납' },
                          ].map((option) => (
                            <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>

                <Grow placement={'ss'} className={'w-full'}>
                  <FormTable caption="계약자 정보" cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}>
                    {!_simpleMode ? (
                      <>
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section" colSpan={3}>
                            <Grow>
                              <Input aria-label="계약자명" width="7.6rem" readOnly />
                              <Input aria-label="주민등록번호 마스킹" width="12rem" readOnly />
                              <Button
                                aria-label="계약자 검색"
                                variant="outlined"
                                only="icon"
                                color="gray-light"
                                size="lg"
                              >
                                <SearchIcon color="var(--color-primary-50)" />
                              </Button>
                              <Checkbox color="primary" size="md" variant="default">
                                개인사업자
                              </Checkbox>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="주피와 관계">
                            <Input aria-label="피보험자명" width={'7.6rem'} readOnly />는
                            <NativeSelect aria-label="주피와 관계 선택" width={'15.8rem'} required>
                              {[{ value: 'spouse', id: 'pension-relationship-spouse', label: '배우자' }].map(
                                (option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                )
                              )}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="개인정보취득경로">
                            <NativeSelect aria-label="개인정보취득경로 선택" width="20rem" required>
                              {[
                                { value: 'selection2', id: 'pension-personalinfo-3', label: '선택' },
                                { value: 'selection', id: 'pension-personalinfo-2', label: '고객직접선택' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                      </>
                    ) : (
                      <>
                        <FormRow>
                          <FormCell title="주피와 관계">
                            <Input aria-label="피보험자명" width={'7.6rem'} readOnly />는 계약자의
                            <NativeSelect aria-label="주피와 관계 선택" width={'15.8rem'} readOnly>
                              {[{ value: 'spouse', id: 'pension-relationship-spouse', label: '배우자' }].map(
                                (option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                )
                              )}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="개인정보취득경로">
                            <NativeSelect aria-label="개인정보취득경로 선택" width="20rem" required>
                              {[
                                { value: 'selection2', id: 'pension-personalinfo-3', label: '선택' },
                                { value: 'selection', id: 'pension-personalinfo-2', label: '고객직접선택' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>
                                  {option.label}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section">
                            <Grow>
                              <InputCombo
                                clear
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
                                width={'7.6rem'}
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
                            </Grow>
                          </FormCell>
                          <FormCell title="생년월일">
                            <DatePickerInput mode={'single'} width={'9rem'} required />
                          </FormCell>
                        </FormRow>
                      </>
                    )}
                    <FormRow>
                      <FormCell title="자택(소재지)" colSpan={3}>
                        ㅇㄴㅇㅁㄹ
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title="직장(본사)" colSpan={3}>
                        ㄴㅇㄻㄴㅇㄹ
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title="연락처">
                        <Grow placement="bwc">
                          <Grow>010 020 2022</Grow>
                          <Grow>
                            <KeyValueItem label="전자적안내동의">
                              <Grow placement="sc" gap="0">
                                <Badge color="green" size="md" variant="ghost">
                                  Y
                                </Badge>
                                <TooltipQ>{tooltipContents[0]}</TooltipQ>
                              </Grow>
                            </KeyValueItem>
                          </Grow>
                        </Grow>
                      </FormCell>
                      <FormCell title="이메일">example@example.com</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title="보험차익비과세">
                        <Checkbox color="primary" size="md" variant="default">
                          가입
                        </Checkbox>
                        <NativeSelect aria-label="비과세 유형 선택" width="17rem" readOnly>
                          {[
                            { value: 'monthly', id: 'pension-monthly-payment-monthly', label: '연금저축' },
                            {
                              value: 'nonemonthly',
                              id: 'pension-monthly-payment-nonemonthly',
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
                        <Input aria-label="설계금액" width="7.1rem" commaAmount readOnly />
                        /
                        <Input aria-label="잔여한도" width="7.1rem" commaAmount readOnly />
                        <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                          조회
                        </Button>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
              </>
            )}
          </Gcol>
        }
      />

      <LayoutMainFoot>
        <MainBottom>
          <MainBottomItem>
            <Button variant={'outlined'} color={'gray'} size={'xl'}>
              동영상매뉴얼
            </Button>
            <Grow gap={1}>
              <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                저장
              </Button>
            </Grow>
          </MainBottomItem>
        </MainBottom>
      </LayoutMainFoot>
    </LayoutMain>
  );
};
