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
};

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

  const { tabs, active, setActive, handleRemove } = useTabs(DUMMY_DATA['view1']);

  return (
    <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem]">
      {/* 퍼블 페이지확인용 */}
      <NativeSelect
        className="fixed top-1 left-[50%] z-100 w-[auto] opacity-80"
        value={'view1'}
        onChange={(e) => {
          const selectedKey = e.target.value;

          setViewContents({
            view1: selectedKey === 'view1',
            view2: selectedKey === 'view2',
            view3: selectedKey === 'view3',
            view4: selectedKey === 'view4',
            view5: selectedKey === 'view5',
          });
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
          <Gcol placement={'ss'} className="w-full" gap={3}>
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

                <Gcol placement="ss" className={'w-full'}>
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
                    <div className="w-full h-full relative">
                      <Gcol placement={'ss'}>
                        <FormTable
                          caption="행/열 병합 케이스"
                          lineTop={false}
                          cols={['w-[14rem]', 'flex-1', 'w-[14rem]', 'flex-1']}
                        >
                          {/* 상세 화면 전용 */}
                          {_simpleMode ? (
                            <FormRow>
                              <FormCell title="피보험자" titleVariant="section">
                                <InputCombo
                                  clear
                                  onChange={() => {}}
                                  options={[
                                    {
                                      label: <div>박은빈</div>,
                                      value: '',
                                    },
                                    {
                                      label: <div>김민지</div>,
                                      value: 'LA24094848896',
                                    },
                                    {
                                      label: <div>이도현</div>,
                                      value: 'LA25094848897',
                                    },
                                    {
                                      label: <div>최수영</div>,
                                      value: 'LA25094848898',
                                    },
                                    {
                                      label: <div>박보검</div>,
                                      value: 'LA25094848899',
                                    },
                                    {
                                      label: <div>한지민</div>,
                                      value: 'LA25094848900',
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
                          ) : (
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
                      </Gcol>
                    </div>
                  </TabPager>

                  {!_simpleMode && (
                    <FormTable
                      caption="계약자 정보"
                      cols={[
                        'w-[14rem] min-w-[14rem]',
                        'min-w-[32.6rem] flex-1',
                        'w-[14rem] min-w-[14rem]',
                        'min-w-[32.6rem] flex-1',
                      ]}
                    >
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
                                <TooltipQ>ddddd</TooltipQ>
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
