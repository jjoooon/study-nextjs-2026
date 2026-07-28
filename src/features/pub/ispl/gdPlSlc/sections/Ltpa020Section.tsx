/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { useCallback, useState } from 'react';
import Ltpz034 from '@/features/pub/shared/components/popups/Ltpz034';
import { Gcol, Grow, Divider, Grid, Typo } from '@atoms';

import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputCombo } from '@common/InputCombo';
import { KeyValueItem } from '@common/KeyValueList';
import { ViewMode } from '@common/ViewMode';
import { EmpInput } from '@features/EmpInput';
import { PageID } from '@features/PageID';
import { SearchIcon, AiIcon, PlusIcon } from '@icons';
import { LayoutFoot, LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplatePx0 } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Ltpa02001 } from '../components/Ltpa02001';
import { Ltpa02002 } from '../components/Ltpa02002';

export default function Ltpa020Section() {
  // 상단 탭 상태
  // - Ltpa02001: 상품선택
  // - Ltpa02002: 추천설계
  const [tabSelectValue, setTabSelectValue] = useState('Ltpa02001');
  // 추천설계 하위 컴포넌트(Ltpa02002) 데이터 유무 제어 상태
  // 화면 분기/Empty 상태 표현에 사용
  const [dataNone, setDataNone] = useState<boolean>(false);
  const [userAdmin, setUserAdmin] = useState<boolean>(false);

  // 고지유형찾기(Ltpz034) 팝업 표시/최소화 상태
  // open 시 minimized를 false로 초기화해 항상 정상 크기로 시작하도록 보정
  const [isLtpz034Open, _setIsLtpz034Open] = useState(false);
  const [isLtpz034Minimized, setIsLtpz034Minimized] = useState(false);

  // 가능상품 보기 상태 관리 (Ltpa02001의 데이터 소스를 가능상품용으로 필터링하는 조건)
  const [isPossibleProductsOnly, setIsPossibleProductsOnly] = useState(false);

  // 팝업 open 전용 setter
  // 팝업을 다시 열 때 이전 최소화 상태가 남아있지 않도록 함께 초기화
  const setIsLtpz034Open = useCallback((open: boolean) => {
    _setIsLtpz034Open(open);
    if (open) {
      setIsLtpz034Minimized(false);
    }
  }, []);

  // 고객정보 표시 모드
  // - recent: 등록 고객 조회
  // - new: 미등록 고객 입력
  const [customerType, setCustomerType] = React.useState('recent');

  // InputCombo 필드 key를 유니온으로 제한해 오타 방지 및 타입 안정성 확보
  type ComboFieldKey = 'user' | 'age';

  // InputCombo 값 상태
  // - user: 등록 고객 검색어/선택값
  // - age: 미등록 고객 나이 추천 선택값
  const [comboValues, setComboValues] = useState<Record<ComboFieldKey, string>>({
    user: '',
    age: '',
  });

  // 미등록 고객 모드에서 사용하는 파생 상태(성별/직업급수)
  // 나이 추천 선택 시 옵션 메타데이터로 자동 동기화됨
  const [newCustomerGender, setNewCustomerGender] = useState('남');
  const [newCustomerClass, setNewCustomerClass] = useState('1급');

  // 공통 Combo 필드 업데이트 핸들러
  // 제네릭 key를 받아 부분 업데이트하여 다른 필드 값은 유지
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

  // 나이 추천 InputCombo 전용 핸들러
  // 선택값 저장 + 옵션 메타데이터(gender/class)로 연관 상태 자동 반영
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

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '상품플랜설계', pageId: 'LTPA020' }} />

        {/* 상단 헤더 영역
            1) 상품선택/추천설계 탭 전환
            2) 기준일자/판매채널 조건
            3) 계약자 검색 입력 */}
        <Grow placement={'bwc'} gap={3} className="w-full pt-1 pb-1">
          <RadioGroup
            value={tabSelectValue}
            onValueChange={(value) => setTabSelectValue(value)}
            className="bg-[#fff] gap-[0.2rem] rounded-2 relative after:content-[''] after:absolute after:block after:w-full after:h-full after:border after:border-[var(--color-secondary-15)] after:rounded-[0.8rem] after:z-0"
          >
            <RadioGroupItem
              variant={'button'}
              value="Ltpa02001"
              className="relative z-1 [&>div]:hidden w-[18rem] h-[3.6rem] bg-[transparent] border-0! flex items-center gap-1 justify-center rounded-2 text-[1.4rem] text-[var(--color-secondary-70)] font-bold data-[state=checked]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] data-[state=checked]:text-white"
            >
              상품선택
            </RadioGroupItem>
            <RadioGroupItem
              variant={'button'}
              value="Ltpa02002"
              className="relative z-1 [&>div]:hidden w-[18rem] h-[3.6rem] bg-[transparent] border-0! flex items-center gap-1 justify-center rounded-2 text-[1.4rem] text-[var(--color-secondary-70)] font-bold data-[state=checked]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] data-[state=checked]:text-white"
            >
              <span className="flex w-full justify-center items-center">추천설계</span>
              {/* 현재 탭 상태에 맞춰 AI 아이콘 색상을 전환해 선택 상태를 직관적으로 표시 */}
              <AiIcon
                size={24}
                color={tabSelectValue === 'Ltpa02002' ? '#ffffff' : '#006FF2'}
                color2={tabSelectValue === 'Ltpa02002' ? '#ffffff' : '#A683FF'}
              />
            </RadioGroupItem>
          </RadioGroup>
          {userAdmin && (
            <Grow>
              <FormTable variant="none">
                <FormRow>
                  <FormCell title={'기준일자'}>
                    <DatePickerInput value="2026-01-01" />
                  </FormCell>
                  <FormCell title={'판매채널'}>
                    <RadioGroup>
                      {[
                        { value: '전체', label: '전체' },
                        { value: '전속', label: '전속' },
                        { value: 'GA', label: 'GA' },
                        { value: 'TM', label: 'TM' },
                        { value: 'CM', label: 'CM' },
                        { value: '방카', label: '방카' },
                      ].map((option) => (
                        <RadioGroupItem key={option.value} value={option.value}>
                          {option.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
          )}
          <EmpInput empNo={'3999999'} empName={'김한손'} readOnly />
        </Grow>
      </LayoutHead>
      <LayoutTemplatePx0
        mainBody={
          <Grid className="w-full h-full grid-rows-[auto_1fr]" gap={2} placement="ss">
            {/* 검색/고객정보 영역
                - 등록/미등록 모드에 따라 입력 UI가 완전히 분기됨
                - 고지유형찾기 팝업 호출 버튼 포함 */}
            <div className="w-full px-[1rem]">
              <Gcol placement="ss" className="bg-[var(--color-blue-gray-70)] rounded-[0.8rem] p-[1rem]">
                <FormTable caption="" cols={['w-[6rem]', 'w-auto']} variant={'none'}>
                  <FormRow className="items-start!">
                    <FormCell
                      title={'고객정보'}
                      className="[&>div]:!text-[var(--color-gray-20)] [&>div+div]:!text-[#fff]"
                    >
                      <Grow placement="ss" gap={5} className="w-full">
                        <ViewMode
                          label={['등록', '미등록']}
                          state={customerType === 'recent'}
                          // ViewMode의 boolean 값을 도메인 상태(recent/new)로 변환
                          onChange={(value) => setCustomerType(value ? 'recent' : 'new')}
                        />

                        <Grow placement="bwc" gap={2} className="w-full">
                          {/* 등록 고객 모드
                              - 고객 검색 + 기존 데이터(직업/보장분석/지급이력) 확인 중심 */}
                          {customerType === 'recent' && (
                            <Grow placement="sc" className="flex-1 min-w-0 flex-wrap gap-x-5 gap-y-1">
                              <Grow placement="sc">
                                <InputCombo
                                  aria-label="고객 검색"
                                  width={136}
                                  col={2}
                                  options={[{ value: '김한화 41세(여)', label: <td>김한화</td> }]}
                                  value={comboValues.user}
                                  onChange={handleComboValueChange('user')}
                                  placeholder="고객 검색"
                                />
                                <Button variant={'outlined'} color={'gray-light'} size={'lg'} only="icon">
                                  <SearchIcon color="var(--color-primary-50)" />
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
                                    2026-07-15
                                    <Button variant={'contained'} size={'sm'} color={'coolgray-light'}>
                                      조회
                                    </Button>
                                  </Grow>
                                </KeyValueItem>
                                <Divider color="gray-dark" />
                              </Grow>
                            </Grow>
                          )}

                          {/* 미등록 고객 모드
                              - 나이 추천 선택 시 성별/직업급수가 자동 반영되도록 구성 */}
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

                          <Grow placement="ec" gap={2}>
                            {customerType === 'recent' ? (
                              <>
                                {comboValues.user ? (
                                  comboValues.user === '김한화 32세(여)' ? (
                                    <Typo variant={'body-sm'} icon={'warning'} className="text-[#FFF]">
                                      [이용제한] 고지유형찾기 서비스 점검중입니다
                                    </Typo>
                                  ) : (
                                    <Typo variant={'body-sm'} icon={'info'} className="text-[#FFF]">
                                      적정 고지유형을 찾는다면, 클릭해주세요.
                                    </Typo>
                                  )
                                ) : (
                                  <Typo variant={'body-sm'} icon={'info'} className="text-[#FFF]">
                                    고객정보를 입력해주세요.
                                  </Typo>
                                )}
                              </>
                            ) : (
                              <>
                                <Typo variant={'body-sm'} icon={'info'} className="text-[#FFF]">
                                  적정 고지유형을 찾는다면, 클릭해주세요.
                                </Typo>
                              </>
                            )}

                            <Button
                              disabled={!comboValues.user || comboValues?.user === '김한 32세(여)'}
                              size={'lg'}
                              onClick={() => setIsLtpz034Open(true)}
                            >
                              {isLtpz034Open && <PlusIcon size={16} className="translate-y-[-.1rem]" />}
                              {isLtpz034Open ? '고지유형찾기 다시보기' : '고지유형찾기'}
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
              // 탭: 상품선택
              <Ltpa02001
                isPossibleProductsOnly={isPossibleProductsOnly}
                onResetPossibleFilter={() => setIsPossibleProductsOnly(false)}
              />
            ) : (
              // 탭: 추천설계
              // dataNone/setDataNone: 하위에서 데이터 유무 상태를 상위와 동기화
              // userType: 고객 등록/미등록 모드 전달
              <Ltpa02002 userType={customerType} />
            )}
          </Grid>
        }
      ></LayoutTemplatePx0>
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>

      {/* 고지유형찾기 팝업
          - open 상태일 때만 마운트
          - 최소화 상태는 상위 state로 제어 */}
      {isLtpz034Open && (
        <Ltpz034
          open={isLtpz034Open}
          onOpenChange={setIsLtpz034Open}
          minimized={isLtpz034Minimized}
          onMinimizeChange={setIsLtpz034Minimized}
          onShowPossibleProducts={() => {
            setTabSelectValue('Ltpa02001');
            setIsPossibleProductsOnly(true);
          }}
        />
      )}
    </>
  );
}
