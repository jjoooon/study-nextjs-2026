/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Divider, Grid } from '@atoms';

import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputCombo } from '@common/InputCombo';
import { KeyValueItem } from '@common/KeyValueList';
import { ViewMode } from '@common/ViewMode';
import { PageID } from '@features/PageID';
import { SearchIcon, AiIcon } from '@icons';
import { LayoutFoot, LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplatePx0 } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { useCallback, useState } from 'react';
import * as React from 'react';

import { Ltpa02001 } from '../components/Ltpa02001';
import { Ltpa02002 } from '../components/Ltpa02002';

export default function Ltpa020Section() {
  const [tabSelectValue, setTabSelectValue] = useState('Ltpa02002');
  const [customerType, setCustomerType] = React.useState('recent');
  type ComboFieldKey = 'user' | 'age';

  const [comboValues, setComboValues] = useState<Record<ComboFieldKey, string>>({
    user: '',
    age: '',
  });
  const [newCustomerGender, setNewCustomerGender] = useState('남');
  const [newCustomerClass, setNewCustomerClass] = useState('1급');
  const handleComboValueChange = useCallback(
    <TField extends ComboFieldKey>(field: TField) =>
      (nextValue: string) => {
        setComboValues((prev) => ({
          ...prev,
          [field]: nextValue,
        }));
      },
    []
  );
  const handleAgeComboChange = useCallback((nextValue: string, option?: { [key: string]: unknown }) => {
    setComboValues((prev) => ({
      ...prev,
      age: nextValue,
    }));

    if (!option) return;

    const gender = option['gender'];
    if (typeof gender === 'string') {
      setNewCustomerGender(gender);
    }

    const customerClass = option['class'];
    if (typeof customerClass === 'string') {
      setNewCustomerClass(customerClass);
    }
  }, []);
  // 고객정보 등록/미등록
  const [dataNone, setDataNone] = useState<boolean>(true);

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '상품플랜설계', pageId: 'LTPA020' }} />
        <Grow placement={'bwc'} gap={3} className="w-full pt-1 pb-1">
          <RadioGroup
            value={tabSelectValue}
            onValueChange={(value) => setTabSelectValue(value)}
            className="bg-[#fff] gap-[0.2rem] rounded-2 relative after:content-[''] after:absolute after:block after:w-full after:h-full after:border after:border-[var(--color-secondary-15)] after:rounded-[0.8rem] after:z-0"
          >
            <RadioGroupItem
              variant={'button'}
              value="Ltpa02001"
              className="relative z-1 [&>div]:hidden w-[24rem] h-[3.6rem] bg-[transparent] border-0! flex items-center gap-1 justify-center rounded-2 text-[1.4rem] text-[var(--color-secondary-70)] font-bold data-[state=checked]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] data-[state=checked]:text-white"
            >
              상품선택
            </RadioGroupItem>
            <RadioGroupItem
              variant={'button'}
              value="Ltpa02002"
              className="relative z-1 [&>div]:hidden w-[24rem] h-[3.6rem] bg-[transparent] border-0! flex items-center gap-1 justify-center rounded-2 text-[1.4rem] text-[var(--color-secondary-70)] font-bold data-[state=checked]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] data-[state=checked]:text-white"
            >
              <span className="flex w-full justify-center items-center">추천설계</span>
              <AiIcon
                size={24}
                color={tabSelectValue === 'Ltpa02002' ? '#ffffff' : '#006FF2'}
                color2={tabSelectValue === 'Ltpa02002' ? '#ffffff' : '#A683FF'}
              />
            </RadioGroupItem>
          </RadioGroup>
          <Grow className="gap-1 shrink-0" placement={'ec'}>
            <Input aria-label="계약자명 입력" type="text" value={'6012345 박하늘별님달'} width={'full'} />
            <Button variant={'outlined'} color={'gray-light'} aria-label="계약자 추가" only={'icon'} size={'lg'}>
              <SearchIcon color="var(--color-primary-50)" />
            </Button>
          </Grow>
        </Grow>
      </LayoutHead>
      <LayoutTemplatePx0
        mainBody={
          <Grid className="w-full h-full grid-rows-[auto_1fr]" gap={2} placement="ss">
            {/* 검색 */}
            <div className="w-full px-[1rem]">
              <Gcol placement="ss" className="bg-[var(--color-blue-gray-70)] rounded-[0.8rem] p-[1rem]">
                <FormTable caption="" cols={['w-[6rem]', 'w-auto']} variant={'none'}>
                  <FormRow className="items-start!">
                    <FormCell
                      title={'고객정보'}
                      className="align-top [&>span]:block [&>span]:pt-1 [&>span]:text-[#fff]"
                    >
                      <Grow placement="ss" gap={5} className="w-full">
                        <ViewMode
                          label={['등록', '미등록']}
                          state={customerType === 'recent'}
                          onChange={(value) => setCustomerType(value ? 'recent' : 'new')}
                        />

                        <Grow placement="bwc" gap={2} className="w-full">
                          {customerType === 'recent' && (
                            <Grow placement="sc" className="flex-1 min-w-0 flex-wrap gap-x-5 gap-y-1">
                              <Grow placement="sc">
                                <InputCombo
                                  aria-label="고객 검색"
                                  width={136}
                                  col={2}
                                  options={[
                                    { value: '홍길순 32세(여)', label: <td>홍길순</td> },
                                    { value: '홍길동 32세(여)', label: <td>홍길동</td> },
                                    { value: '김한화 32세(여)', label: <td>김한화</td> },
                                  ]}
                                  value={comboValues.user}
                                  onChange={handleComboValueChange('user')}
                                  placeholder="고객 검색"
                                />
                                <Button variant={'outlined'} color={'gray-light'} size={'lg'} only="icon">
                                  <SearchIcon size={14} color="var(--color-primary-50)" />
                                </Button>
                              </Grow>

                              <Grow placement="sc" gap={3}>
                                <KeyValueItem
                                  label={'직업'}
                                  variant="info"
                                  className="[&>div]:!text-[var(--color-gray-20)] [&>div+div]:!text-[#fff]"
                                >
                                  (1급)회사 사무직 종사자
                                </KeyValueItem>
                                <Divider color="gray-dark" />

                                <KeyValueItem
                                  label={'보장분석'}
                                  variant="info"
                                  className="[&>div]:!text-[var(--color-gray-20)] [&>div+div]:!text-[#fff] gap-2"
                                >
                                  <Grow gap={2}>
                                    2026-01-01
                                    <Button variant={'contained'} size={'sm'} color={'coolgray-light'}>
                                      조회
                                    </Button>
                                  </Grow>
                                </KeyValueItem>
                                <Divider color="gray-dark" />

                                <KeyValueItem
                                  label={'보험금지급 이력정보'}
                                  variant="info"
                                  className="[&>div]:!text-[var(--color-gray-20)] [&>div+div]:!text-[#fff] gap-2"
                                >
                                  <Grow gap={2}>
                                    2026-01-01
                                    <Button variant={'contained'} size={'sm'} color={'coolgray-light'}>
                                      조회
                                    </Button>
                                  </Grow>
                                </KeyValueItem>
                              </Grow>
                            </Grow>
                          )}
                          {customerType === 'new' && (
                            <Grow placement="sc" gap={3}>
                              <KeyValueItem
                                label={'나이'}
                                variant="info"
                                className="[&>div]:!text-[var(--color-gray-20)] [&>div+div]:!text-[#000] [&>div+div]:!font-normal"
                              >
                                <InputCombo
                                  aria-label="나이 검색"
                                  width={48}
                                  col={2}
                                  variant="recommend"
                                  options={[
                                    {
                                      value: '40세',
                                      gender: '남',
                                      class: '1급',
                                      label: (
                                        <div>
                                          <b>#40세(남)</b>1급
                                        </div>
                                      ),
                                    },
                                    {
                                      value: '35세',
                                      gender: '여',
                                      class: '1급',
                                      label: (
                                        <div>
                                          <b>#35세(여)</b>1급
                                        </div>
                                      ),
                                    },
                                    {
                                      value: '50세',
                                      gender: '남',
                                      class: '1급',
                                      label: (
                                        <div>
                                          <b>#50세(남)</b>1급
                                        </div>
                                      ),
                                    },
                                    {
                                      value: '45세',
                                      gender: '여',
                                      class: '1급',
                                      label: (
                                        <div>
                                          <b>#45세(여)</b>1급
                                        </div>
                                      ),
                                    },
                                    {
                                      value: '60세',
                                      gender: '남',
                                      class: '1급',
                                      label: (
                                        <div>
                                          <b>#60세(남)</b>1급
                                        </div>
                                      ),
                                    },
                                    {
                                      value: '55세',
                                      gender: '여',
                                      class: '1급',
                                      label: (
                                        <div>
                                          <b>#55세(여)</b>1급
                                        </div>
                                      ),
                                    },
                                  ]}
                                  value={comboValues.age}
                                  onChange={handleAgeComboChange}
                                />
                                <DatePickerInput value="1994-05-10" />
                              </KeyValueItem>
                              <Divider color="gray-dark" />

                              <KeyValueItem
                                label={'성별'}
                                variant="info"
                                className="[&>div]:!text-[var(--color-gray-20)] [&>div+div]:!text-[#fff]"
                              >
                                <RadioGroup className="gap-2" value={newCustomerGender}>
                                  {[
                                    { value: '남', label: '남' },
                                    { value: '여', label: '여' },
                                  ].map((tag) => (
                                    <RadioGroupItem key={tag.value} value={tag.value}>
                                      {tag.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </KeyValueItem>
                              <Divider color="gray-dark" />

                              <KeyValueItem
                                label={'직업'}
                                variant="info"
                                className="[&>div]:!text-[var(--color-gray-20)] [&>div+div]:!text-[#fff]"
                              >
                                <RadioGroup className="gap-2" value={newCustomerClass}>
                                  {[
                                    { value: '1급', label: '1급' },
                                    { value: '2급', label: '2급' },
                                    { value: '3급', label: '3급' },
                                  ].map((tag) => (
                                    <RadioGroupItem key={tag.value} value={tag.value}>
                                      {tag.label}
                                    </RadioGroupItem>
                                  ))}
                                </RadioGroup>
                              </KeyValueItem>

                              {/* <Button variant="contained" size="md" color="gray" className="gap-1" onClick={() => {}}>
                                고객등록
                                <ZoomInIcon size={16} />
                              </Button> */}
                            </Grow>
                          )}

                          <Grow>
                            <Button size={'sm'} onClick={() => {}}>
                              경증예외질환?
                            </Button>
                          </Grow>
                        </Grow>
                      </Grow>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Gcol>
            </div>

            {tabSelectValue === 'Ltpa02001' ? (
              <Ltpa02001 />
            ) : (
              <Ltpa02002 dataNone={dataNone} setDataNone={setDataNone} userType={customerType} />
            )}
          </Grid>
        }
      ></LayoutTemplatePx0>
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
