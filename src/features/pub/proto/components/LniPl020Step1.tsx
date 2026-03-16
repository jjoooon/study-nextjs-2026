'use client';

import { useReducer, useState, type ReactNode, useCallback } from 'react';

// Layout Components
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { LayoutScrollWrap, LayoutScrollItem } from '@common/LayoutScroll';

// Atomic Components
import { Grow, Gcol, Typo } from '@atoms';

// UIUX Components
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Badge } from '@uiux/Badge';

// Common Components
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { DatePickerInput } from '@common/DatePicker';
import { TabPager } from '@common/TabPager';
import { KeyValueItem } from '@common/KeyValueList';

// Feature Components
import { LniPl020Step1 as MainFoot } from '@features/MainFoot';

// Icons
import { SearchIcon, PlusIcon, QuestionMark } from '@icons';

// Hooks
import { useTabs } from '@/shared/hooks/useTabs';

// Data & Types
import { LniPl020Step1Data as LniPl020Step1Data } from '@/features/pub/proto/data/LniPl020Step1Data';
import { LniPl020Step1FormOptions } from '@/features/pub/proto/data/LniPl020Step1FormOptions';
import type { LniPl020DataType } from '@/features/pub/proto/data/LniPl020Data';

// Props Type
type LniPl020Step1Props = {
  data?: LniPl020DataType['mainBody'];
  selectedPlanId?: number | null;
  onSelectPlan?: (planId: number) => void;
  className?: string;
  children?: ReactNode;
};

// State & Reducer Types
type ContractFormState = {
  insuranceStartDate: string;
  maturityValue: string;
  paymentPeriodValue: string;
  paymentCycleValue: string;
  renewalCycleValue: string;
  notificationTypeValue: string;
};

type ContractFormField = keyof ContractFormState;

type ContractFormAction = {
  type: 'setField';
  field: ContractFormField;
  value: string;
};

type InsuredPersonFormItem = {
  driveType: string;
  motorcycle: string;
  isDiscountApplied: boolean;
};

// --- Constants ---
const CONTRACTOR_INFO = LniPl020Step1Data.ContractorInfo;
const POLICYHOLDER = LniPl020Step1Data.Policyholder;

const PAYMENT_CYCLE_VALUE_MAP: Record<string, string> = {
  월납: 'month',
  '3개월': 'quarter',
  '6개월': 'semiannual',
  연납: 'year',
};

const NOTICE_TYPE_VALUE_MAP: Record<string, string> = {
  '1형': 'type1',
  '2형': 'type2',
  '3형': 'type3',
  '4형': 'type4',
  '5형': 'type5',
  '6형': 'type6',
};

const DRIVE_VALUE_MAP: Record<string, string> = {
  자가용: 'private',
  영업용: 'commercial',
  비운전: 'nondriver',
};

const MOTORCYCLE_VALUE_MAP: Record<string, string> = {
  운전함: 'drives',
  운전안함: 'nondriver',
};

// --- Initial State ---
const INITIAL_INSURED_FORM: Record<string, InsuredPersonFormItem> = Object.fromEntries(
  LniPl020Step1Data.InsuredPerson.map((person, i) => [
    `tab${i + 1}`,
    {
      driveType: DRIVE_VALUE_MAP[person.driveType] ?? '',
      motorcycle: MOTORCYCLE_VALUE_MAP[person.motorcycle] ?? '',
      isDiscountApplied: person.isDiscountApplied === 'Y',
    },
  ])
);

const INITIAL_CONTRACT_FORM_STATE: ContractFormState = {
  insuranceStartDate: CONTRACTOR_INFO.insStartDate,
  maturityValue: CONTRACTOR_INFO.expiryDate || LniPl020Step1FormOptions.maturity[0]?.value || '',
  paymentPeriodValue: CONTRACTOR_INFO.payPeriod || LniPl020Step1FormOptions.paymentPeriod[0]?.value || '',
  paymentCycleValue: PAYMENT_CYCLE_VALUE_MAP[CONTRACTOR_INFO.payCycle] ?? CONTRACTOR_INFO.payCycle ?? LniPl020Step1FormOptions.paymentCycle[0]?.value ?? '',
  renewalCycleValue: CONTRACTOR_INFO.renewCycle || LniPl020Step1FormOptions.renewalCycle[0]?.value || '',
  notificationTypeValue: NOTICE_TYPE_VALUE_MAP[CONTRACTOR_INFO.noticeType] ?? CONTRACTOR_INFO.noticeType ?? LniPl020Step1FormOptions.notificationType[0]?.value ?? '',
};

// --- Reducer ---
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

export function LniPl020Step1({
  data: _data,
  selectedPlanId: _selectedPlanId,
  onSelectPlan: _onSelectPlan,
  className,
  children,
}: LniPl020Step1Props) {
  // ---------------------------------------------------------------------------
  // 1) Data source
  // ---------------------------------------------------------------------------
  const rangeValue = {
    from: CONTRACTOR_INFO.insStartPeriod,
    to: CONTRACTOR_INFO.insEndPeriod,
  };

  // ---------------------------------------------------------------------------
  // 2) State & Reducer
  // ---------------------------------------------------------------------------
  const [contractForm, dispatchContractForm] = useReducer(contractFormReducer, INITIAL_CONTRACT_FORM_STATE);
  const [insuredForm, setInsuredForm] = useState<Record<string, InsuredPersonFormItem>>(INITIAL_INSURED_FORM);
  const [policyholderIsBusinessOwner, setPolicyholderIsBusinessOwner] = useState(POLICYHOLDER.isBusinessOwner === 'Y');
  const [taxFreeChecked, setTaxFreeChecked] = useState(false);

  // ---------------------------------------------------------------------------
  // 3) Tabs
  // ---------------------------------------------------------------------------
  const {
    tabs,
    active: tabValue,
    setActive: setTabValue,
    handleRemove: handleRemoveTab,
  } = useTabs(
    LniPl020Step1Data.InsuredPerson.map((person, i) => ({
      value: `tab${i + 1}`,
      label: person.name,
      error: false,
    }))
  );

  const currentPersonIndex = LniPl020Step1Data.InsuredPerson.findIndex((_, i) => `tab${i + 1}` === tabValue);
  const currentPerson = LniPl020Step1Data.InsuredPerson[currentPersonIndex >= 0 ? currentPersonIndex : 0]!;

  // ---------------------------------------------------------------------------
  // 4) Handlers
  // ---------------------------------------------------------------------------
  const handleContractFieldChange = useCallback((field: ContractFormField, value: string) => {
    dispatchContractForm({ type: 'setField', field, value });
  }, []);

  const handleTodayClick = useCallback(() => {
    handleContractFieldChange('insuranceStartDate', new Date().toISOString().slice(0, 10));
  }, [handleContractFieldChange]);

  const updateInsuredField = useCallback((tab: string, field: keyof InsuredPersonFormItem, value: string | boolean) => {
    setInsuredForm((prev) => ({ ...prev, [tab]: { ...prev[tab]!, [field]: value } }));
  }, []);

  return (
    // ---------------------------------------------------------------------------
    // 5) Render
    // ---------------------------------------------------------------------------
    <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem]">
      <LayoutMainBody>
        <LayoutScrollWrap>
          <LayoutScrollItem>
            <Gcol placement={'ss'} className={className ?? 'w-full gap-[1.2rem]'}>
              <Grow placement={'ss'} className={className ?? 'w-full'}>

                <FormTable caption="보험정보 입력하세요." cols={['w-[14rem] min-w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem] min-w-[14rem]', 'w-[calc(50%-14rem)]']}>
                  {/* 보험시기, 보험기간 */}
                  <FormRow>
                    <FormCell title={'보험시기'}>
                      <DatePickerInput
                        value={contractForm.insuranceStartDate}
                        mode={'single'}
                        width={'9rem'}
                        onChange={(_, formattedValue) => handleContractFieldChange('insuranceStartDate', formattedValue ?? '')}
                      />
                      <Button
                        color={'secondary'}
                        onClick={handleTodayClick}
                        only={'default'}
                        size={'lg'}
                        variant={'outlined'}
                      >
                        오늘
                      </Button>
                    </FormCell>
                    <FormCell title={'보험기간'}>
                      <DatePickerInput readOnly mode={'range'} width={'9rem'} rangeValue={rangeValue}/>
                    </FormCell>
                  </FormRow>

                  {/* 만기, 납기 */}
                  <FormRow>
                    <FormCell title={'만기'} colSpan={3}>
                      <RadioGroup
                        value={contractForm.maturityValue}
                        onValueChange={(value) => handleContractFieldChange('maturityValue', value)}
                        className='flex-row gap-3'
                      >
                        {LniPl020Step1FormOptions.maturity.map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납기'} colSpan={3}>
                      <RadioGroup
                        value={contractForm.paymentPeriodValue}
                        onValueChange={(value) => handleContractFieldChange('paymentPeriodValue', value)}
                        className='flex-row gap-3'
                      >
                        {LniPl020Step1FormOptions.paymentPeriod.map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                  </FormRow>

                  <FormRow>
                    <FormCell title={'납입주기'}>
                      <RadioGroup
                        value={contractForm.paymentCycleValue}
                        onValueChange={(value) => handleContractFieldChange('paymentCycleValue', value)}
                        className='flex-row gap-3'
                      >
                        {LniPl020Step1FormOptions.paymentCycle.map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                    <FormCell title={'갱신주기'}>
                      <RadioGroup
                        value={contractForm.renewalCycleValue}
                        onValueChange={(value) => handleContractFieldChange('renewalCycleValue', value)}
                        className='flex-row gap-3'
                      >
                        {LniPl020Step1FormOptions.renewalCycle.map((option) => (
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
                        value={contractForm.notificationTypeValue}
                        onValueChange={(value) => handleContractFieldChange('notificationTypeValue', value)}
                        width={'full'}
                        className='grid grid-cols-3 gap-x-6 gap-y-2 w-full'
                      >
                        {LniPl020Step1FormOptions.notificationType.map((option) => (
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
                      { /* 피보험자 테이블 */ }
                      <FormTable caption="행/열 병합 케이스" lineTop={false} cols={['w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem]', 'w-[calc(50%-14rem)]']}>
                        <FormRow>
                          <FormCell colSpan={3} title={'피보험자'} titleVariant="section">
                            <Grow className="flex-nowrap w-full" placement={'bwc'}>
                              <Grow>
                                <Input aria-label="피보험자명" width={'7.6rem'} value={currentPerson.name} readOnly />
                                <Input aria-label="주민등록번호 마스킹" width={'12rem'} value={currentPerson.juminNumber} readOnly />
                                <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="피보험자 나이" width={'4.6rem'} value={`${currentPerson.age}세`} readOnly />
                                <Input aria-label="피보험자 성별" width={'3.2rem'} value={currentPerson.gender} readOnly />
                              </Grow>
                              <Grow gap={2}>
                                <KeyValueItem label={'상령일'}>
                                  <Grow gap={1}>
                                    <Typo weight={'bold'}>
                                      {currentPerson.ageStandardDate}
                                    </Typo>
                                    <Badge color={'blue'} size={'md'} variant={'contained'}>{currentPerson.ageDDay}</Badge>
                                  </Grow>
                                </KeyValueItem>
                                <KeyValueItem label={'설계동의'}>
                                  <Grow gap={1}>
                                    <Typo weight={'bold'}>
                                      {currentPerson.designAgreeDate}
                                    </Typo>
                                    <Badge color={'red'} size={'md'} variant={'contained'}>{currentPerson.designAgreeDDay}</Badge>
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
                              <Input aria-label="직업코드" width={'7.6rem'} value={currentPerson.jobCode} readOnly />
                              <Input aria-label="직업분류" width={'27.4rem'} value={currentPerson.jobName} readOnly />
                              <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input aria-label="피보험자 나이" width={'2xs'} value={currentPerson.jobGrade} readOnly />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="운전형태">
                            <RadioGroup
                              value={insuredForm[tabValue]?.driveType ?? ''}
                              onValueChange={(v) => updateInsuredField(tabValue, 'driveType', v)}
                              className='flex-row gap-3'
                            >
                              {LniPl020Step1FormOptions.drivingType.map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                          <FormCell title="이륜차">
                            <RadioGroup
                              value={insuredForm[tabValue]?.motorcycle ?? ''}
                              onValueChange={(v) => updateInsuredField(tabValue, 'motorcycle', v)}
                              className='flex-row gap-3'
                            >
                              {LniPl020Step1FormOptions.motorcycleType.map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="계약자와 관계">
                            <Input aria-label="피보험자명" width={'7.6rem'} value={currentPerson.name} readOnly />는 계약자의
                            <NativeSelect aria-label="플랜 선택" width={'15.8rem'} required>
                              <NativeSelectOption value="">{currentPerson.relationWithContractor}</NativeSelectOption>
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="(실손)동시설계">
                            <Input aria-label="코드" width={'13rem'} value={currentPerson.actualLossSimulDesignNo} readOnly />
                            <Input aria-label="코드" width={'13rem'} value={String(currentPerson.premium)} commaAmount readOnly />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="할인적용" colSpan={3}>
                            <Checkbox
                              color="primary"
                              checked={insuredForm[tabValue]?.isDiscountApplied ?? false}
                              onCheckedChange={(c) => updateInsuredField(tabValue, 'isDiscountApplied', c === true)}
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

                      { /* 계약자 테이블 */ }
                      <FormTable caption="계약자 정보" cols={['w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem]', 'w-[calc(50%-14rem)]']}>
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section">
                            <Grow>
                              <Input aria-label="계약자명" width="7.6rem" value={POLICYHOLDER.name} readOnly />
                              <Input aria-label="주민등록번호 마스킹" width="12rem" value={POLICYHOLDER.juminNumber} readOnly />
                              <Button aria-label="피보험자 검색" variant="outlined" only="icon" color="gray-light" size="lg">
                                <SearchIcon color="var(--color-primary-50)" />
                              </Button>
                              <Checkbox
                                color="primary"
                                checked={policyholderIsBusinessOwner}
                                onCheckedChange={(c) => setPolicyholderIsBusinessOwner(c === true)}
                                size="md"
                                variant="default"
                              >
                                개인사업자
                              </Checkbox>
                            </Grow>
                          </FormCell>
                          <FormCell title="개인정보취득경로">
                            <NativeSelect aria-label="개인정보취득경로 선택" width="20rem" required>
                              <NativeSelectOption value="">{POLICYHOLDER.infoAcquisitionPath}</NativeSelectOption>
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="자택(소재지)" colSpan={3}>
                            {POLICYHOLDER.addresses}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="직장(본사)" colSpan={3}>
                            {POLICYHOLDER.workAddress}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="연락처">
                            <Grow placement='bwc'>
                              <Grow>{POLICYHOLDER.contact}</Grow>
                              <Grow>
                                <KeyValueItem label="전자적안내동의">
                                  <Grow placement='sc' gap="0">
                                    <Badge color="green" size="md" variant="ghost">{POLICYHOLDER.electronicNoticeAgree}</Badge>
                                    <QuestionMark color="#61554F" />
                                  </Grow>
                                </KeyValueItem>
                              </Grow>
                            </Grow>
                          </FormCell>
                          <FormCell title="이메일">
                            {POLICYHOLDER.email}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="보험차익비과세">
                            <Checkbox
                              color="primary"
                              checked={taxFreeChecked}
                              onCheckedChange={(c) => setTaxFreeChecked(c === true)}
                              size="md"
                              variant="default"
                            >
                              가입
                            </Checkbox>
                            <NativeSelect aria-label="비과세 유형 선택" width="17rem">
                              <NativeSelectOption value="">{POLICYHOLDER.taxFreeType}</NativeSelectOption>
                            </NativeSelect>
                            <Button color="secondary" size="lg" variant="outlined" onClick={() => { }}>
                              알림톡발송
                            </Button>
                          </FormCell>
                          <FormCell title="설계금액/잔여한도">
                            <Input aria-label="설계금액" width="7.1rem" value={String(POLICYHOLDER.designAmount)} commaAmount readOnly />
                            /
                            <Input aria-label="잔여한도" width="7.1rem" value={String(POLICYHOLDER.remainingLimit)} commaAmount readOnly />
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
          </LayoutScrollItem>
        </LayoutScrollWrap>
      </LayoutMainBody>
      <LayoutMainFoot>
      <MainFoot />
      </LayoutMainFoot>
    </LayoutMain>
  );
}
