'use client';

import { useReducer, useState, type ReactNode } from 'react';

import { Grow, Gcol, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { DatePickerInput } from '@common/DatePicker';
import { TabPager } from '@common/TabPager';
import { SearchIcon, PlusIcon, QuestionMark } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { KeyValueItem } from '@common/KeyValueList';
import { Badge } from '@uiux/Badge';

import { useTabs } from '@/shared/hooks/useTabs';

import { LNIPL020_1_FORM_OPTIONS } from '@/features/pub/proto/data/LNIPL020_1FormOptions';
import type { LNIPL020DataType } from '@/features/pub/proto/data/LNIPL020Data';

type LNIPL020_1Props = {
  data?: LNIPL020DataType['mainBody'];
  selectedPlanId?: number | null;
  onSelectPlan?: (planId: number) => void;
  className?: string;
  children?: ReactNode;
};

type ContractFormState = {
  insuranceStartDate: string;
  maturityValue: string;
  paymentPeriodValue: string;
  paymentCycleValue: string;
  renewalCycleValue: string;
  notificationTypeValue: string;
  drivingTypeValue: string;
  motorcycleTypeValue: string;
};

type ContractFormField = keyof ContractFormState;

type ContractFormAction = {
  type: 'setField';
  field: ContractFormField;
  value: string;
};

const INITIAL_CONTRACT_FORM_STATE: ContractFormState = {
  insuranceStartDate: '',
  maturityValue: LNIPL020_1_FORM_OPTIONS.maturity[0]?.value ?? '',
  paymentPeriodValue: LNIPL020_1_FORM_OPTIONS.paymentPeriod[0]?.value ?? '',
  paymentCycleValue: LNIPL020_1_FORM_OPTIONS.paymentCycle[0]?.value ?? '',
  renewalCycleValue: LNIPL020_1_FORM_OPTIONS.renewalCycle[0]?.value ?? '',
  notificationTypeValue: LNIPL020_1_FORM_OPTIONS.notificationType[0]?.value ?? '',
  drivingTypeValue: LNIPL020_1_FORM_OPTIONS.drivingType[0]?.value ?? '',
  motorcycleTypeValue: LNIPL020_1_FORM_OPTIONS.motorcycleType[0]?.value ?? '',
};

function contractFormReducer(state: ContractFormState, action: ContractFormAction): ContractFormState {
  switch (action.type) {
    case 'setField':
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
}

export function LNIPL020_1({
  data: _data,
  selectedPlanId: _selectedPlanId,
  onSelectPlan: _onSelectPlan,
  className,
  children,
}: LNIPL020_1Props) {
  const [contractForm, dispatchContractForm] = useReducer(contractFormReducer, INITIAL_CONTRACT_FORM_STATE);
  const maskedIdentity = '900101 - 1******';
  const {
    tabs,
    active: tabValue,
    setActive: setTabValue,
    handleRemove: handleRemoveTab,
  } = useTabs([
    { value: 'tab1', label: '김한화', error: false },
    { value: 'tab2', label: '김나나', error: false },
    { value: 'tab3', label: '장손보', error: false },
    { value: 'tab4', label: '나손보', error: false },
    { value: 'tab5', label: '피보험자', error: false },
  ]);
  const [rangeValue, setRangeValue] = useState<{ from?: string; to?: string }>({
    from: '2026-01-30',
    to: '2026-01-30',
  });

  const [checked, setChecked] = useState(false);

  return (
    <Gcol placement={'ss'} className={className ?? 'w-full gap-[1.2rem]'}>
      <Grow placement={'ss'} className={className ?? 'w-full'}>

        <FormTable caption="보험정보 입력하세요." cols={['w-[14rem] min-w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem] min-w-[14rem]', 'w-[calc(50%-14rem)]']}>
          {/* 보험시기, 보험기간 */}
          <FormRow>
            <FormCell title="보험시기">
              <DatePickerInput
                value={contractForm.insuranceStartDate}
                mode={'single'}
                width={'9rem'}
                onChange={
                  (_, formattedValue) => dispatchContractForm({ 
                    type: 'setField', 
                    field: 'insuranceStartDate', 
                    value: formattedValue ?? '' 
                  })
                }
              />
              <Button color={'secondary'} onClick={() => { }} only={'default'} size={'lg'} variant={'outlined'}
              >오늘</Button>
            </FormCell>
            <FormCell title="보험기간">
              <DatePickerInput readOnly mode={'range'} width={'9rem'} rangeValue={rangeValue}/>
            </FormCell>
          </FormRow>

          {/* 만기, 납기 */}
          <FormRow>
            <FormCell title="만기" colSpan={3}>
              <RadioGroup
                value={contractForm.maturityValue}
                onValueChange={(value) => dispatchContractForm({ type: 'setField', field: 'maturityValue', value })}
                className='flex-row gap-3'
              >
                {LNIPL020_1_FORM_OPTIONS.maturity.map((option) => (
                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title="납기" colSpan={3}>
              <RadioGroup
                value={contractForm.paymentPeriodValue}
                onValueChange={(value) => dispatchContractForm({ type: 'setField', field: 'paymentPeriodValue', value })}
                className='flex-row gap-3'
              >
                {LNIPL020_1_FORM_OPTIONS.paymentPeriod.map((option) => (
                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </FormCell>
          </FormRow>

          <FormRow>
            <FormCell title="납입주기">
              <RadioGroup
                value={contractForm.paymentCycleValue}
                onValueChange={(value) => dispatchContractForm({ type: 'setField', field: 'paymentCycleValue', value })}
                className='flex-row gap-3'
              >
                {LNIPL020_1_FORM_OPTIONS.paymentCycle.map((option) => (
                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </FormCell>
            <FormCell title="갱신주기">
              <RadioGroup
                value={contractForm.renewalCycleValue}
                onValueChange={(value) => dispatchContractForm({ type: 'setField', field: 'renewalCycleValue', value })}
                className='flex-row gap-3'
              >
                {LNIPL020_1_FORM_OPTIONS.renewalCycle.map((option) => (
                  <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                    {option.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </FormCell>
          </FormRow>

          <FormRow>
            <FormCell title="고지유형" colSpan={3}>
              <RadioGroup
                value={contractForm.notificationTypeValue}
                onValueChange={(value) => dispatchContractForm({ type: 'setField', field: 'notificationTypeValue', value })}
                width={'full'}
                className='grid grid-cols-3 gap-x-6 gap-y-2 w-full'
              >
                {LNIPL020_1_FORM_OPTIONS.notificationType.map((option) => (
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
      <Gcol placement="ss" className={className ?? 'w-full'}>
        <TabPager
          variant={'default'}
          data={tabs}
          active={tabValue}
          setActive={setTabValue}
          renderButtons={
            <Grow>
              <Button color={'gray'} size={'md'} variant={'outlined'}>
                피보험자
                <PlusIcon color={'#61554F'} />
              </Button>
            </Grow>
          }
          removable
          onRemove={handleRemoveTab}
          visibleCount={5}
          getValue={(tab) => String(tab.value)}
          renderTab={(tab) => tab.label}
        >
          <div className="w-full h-full relative">
            <Gcol placement={'ss'}>
              <FormTable caption="행/열 병합 케이스" cols={['w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem]', 'w-[calc(50%-14rem)]']}>
                <FormRow>
                  <FormCell colSpan={3} title={<b className="text-[var(--color-text-primary)] text-[1.5rem]">피보험자</b>} >
                    <Grow className="flex-nowrap w-full" placement={'bwc'}>
                      <Grow>
                        <Input aria-label="피보험자명" width={'7.6rem'} value="김한화" readOnly />
                        <Input aria-label="주민등록번호 마스킹" width={'12rem'} value={maskedIdentity} readOnly />
                        <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="피보험자 나이" width={'4.6rem'} value="36세" readOnly />
                        <Input aria-label="피보험자 성별" width={'3.2rem'} value="남" readOnly />
                      </Grow>
                      <Grow gap={2}>
                        <KeyValueItem label={'상령일'}>
                          <Grow gap={1}>
                            <Typo weight={'bold'}>
                              2026-03-09
                            </Typo>
                            <Badge color={'blue'} size={'md'} variant={'contained'}>D-31</Badge>
                          </Grow>
                        </KeyValueItem>
                        <KeyValueItem label={'상령일'}>
                          <Grow gap={1}>
                            <Typo weight={'bold'}>
                              2026-03-09
                            </Typo>
                            <Badge color={'red'} size={'md'} variant={'contained'}>D-20</Badge>
                          </Grow>
                        </KeyValueItem>
                        <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => { }}>
                          알림톡발송
                        </Button>
                      </Grow>
                    </Grow>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="직업" colSpan={3}>
                    <Grow className="gap-1 flex-nowrap w-full" placement={'ss'}>
                      <Input aria-label="직업코드" width={'7.6rem'} value="52111" readOnly />
                      <Input aria-label="직업분류" width={'27.4rem'} value="소규모 상점 경영 및 일선 관리 종사원" readOnly />
                      <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                      <Input aria-label="피보험자 나이" width={'2xs'} value="2급" readOnly />
                    </Grow>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="운전형태">
                    <RadioGroup
                      value={contractForm.drivingTypeValue}
                      onValueChange={(value) => dispatchContractForm({ type: 'setField', field: 'drivingTypeValue', value })}
                      className='flex-row gap-3'
                    >
                      {LNIPL020_1_FORM_OPTIONS.drivingType.map((option) => (
                        <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                          {option.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </FormCell>
                  <FormCell title="이륜차">
                    <RadioGroup
                      value={contractForm.motorcycleTypeValue}
                      onValueChange={(value) => dispatchContractForm({ type: 'setField', field: 'motorcycleTypeValue', value })}
                      className='flex-row gap-3'
                    >
                      {LNIPL020_1_FORM_OPTIONS.motorcycleType.map((option) => (
                        <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                          {option.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="계약자와 관계">
                    <Input aria-label="피보험자명" width={'7.6rem'} value="김한화" readOnly />는 계약자의
                    <NativeSelect aria-label="플랜 선택" width={'15.8rem'} required>
                      <NativeSelectOption value="">본인</NativeSelectOption>
                    </NativeSelect>
                  </FormCell>
                  <FormCell title="(실손)동시설계">
                    <Input aria-label="코드" width={'13rem'} value="LA260219319244" readOnly />
                    <Input aria-label="코드" width={'13rem'} value="33,301" commaAmount readOnly />
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="할인적용" colSpan={3}>
                    <Checkbox
                      color="primary"
                      checked={checked}
                      onCheckedChange={(c) => setChecked(c === true)}
                      size="md"
                      variant="default"
                    >
                      가족연계할인
                    </Checkbox>
                    <Button aria-label="피보험자 검색" variant="outlined" only="icon" size="lg" color="gray-light">
                      <SearchIcon color="var(--color-primary-50)" />
                    </Button>
                  </FormCell>
                </FormRow>
              </FormTable>
              <FormTable caption="행/열 병합 케이스" cols={['w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem]', 'w-[calc(50%-14rem)]']}>
                <FormRow>
                  <FormCell title={<b className="text-[var(--color-text-primary)] text-[15px]">계약자</b>} >
                    <Grow>
                      <Input aria-label="피보험자명" width="7.6rem" value="김한화" readOnly />
                      <Input aria-label="주민등록번호 마스킹" width="12rem" value={maskedIdentity} readOnly />
                      <Button aria-label="피보험자 검색" variant="outlined" only="icon" color="gray-light" size="lg">
                        <SearchIcon color="var(--color-primary-50)" />
                      </Button>
                      <Checkbox
                        color="primary"
                        checked={checked}
                        onCheckedChange={(c) => setChecked(c === true)}
                        size="md"
                        variant="default"
                      >
                        개인사업자
                      </Checkbox>
                    </Grow>
                  </FormCell>
                  <FormCell title="개인정보취득경로">
                    <NativeSelect aria-label="개인정보취득경로 선택" width="20rem" required>
                      <NativeSelectOption value="">선택</NativeSelectOption>
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
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="연락처">
                    <Grow placement='bwc'>
                      <Grow>010-1234-5678</Grow>
                      <Grow>
                        <KeyValueItem label="전자적안내동의">
                          <Grow placement='sc' gap="0">
                            <Badge color="green" size="md" variant="ghost">Y</Badge>
                            <QuestionMark color="#61554F" />
                          </Grow>
                        </KeyValueItem>
                      </Grow>
                    </Grow>
                  </FormCell>
                  <FormCell title="이메일">
                    qwer@hwgi.kr
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title="보험차익비과세">
                    <Checkbox
                      color="primary"
                      checked={checked}
                      onCheckedChange={(c) => setChecked(c === true)}
                      size="md"
                      variant="default"
                    >
                      가입
                    </Checkbox>
                    <NativeSelect aria-label="월납식비과세 선택" width="17rem">
                      <NativeSelectOption value="">월납식비과세</NativeSelectOption>
                    </NativeSelect>
                    <Button color="secondary" size="lg" variant="outlined" onClick={() => { }}>
                      알림톡발송
                    </Button>
                  </FormCell>
                  <FormCell title="설계금액/잔여한도">
                    <Input aria-label="설계금액" width="7.1rem" value="68,000" commaAmount readOnly />
                    /
                    <Input aria-label="설계금액" width="7.1rem" value="12,000" commaAmount readOnly />
                    <Button color="secondary" size='lg' variant="outlined" onClick={() => { }}>
                      조회
                    </Button>
                  </FormCell>
                </FormRow>
              </FormTable>
            </Gcol>
          </div>
        </TabPager>
      </Gcol>
    </Gcol>
  );
}
