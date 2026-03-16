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
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';


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

// Data
// Types
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
  relationWithContractor: string;
};


// --- Constants ---
const PERSONAL_INSURANCE_STEP1_DATA = {
  ContractorInfo: {
    insStartDate: '2026-03-04',
    insStartPeriod: '2026-01-30',
    insEndPeriod: '2046-03-04',
    expiryDate: '80',
    payPeriod: '10',
    payCycle: 'month',
    renewCycle: '3',
    noticeType: 'type1',
  },
  InsuredPerson: [
    {
      type: 'default',
      name: '김한화',
      juminNumber: '900101-1******',
      age: 36,
      gender: '남',
      ageStandardDate: '2026-03-09',
      ageDDay: 'D-31',
      designAgreeDate: '2026-03-09',
      designAgreeDDay: 'D-20',
      jobCode: '52111',
      jobName: '소규모 상점 경영 및 일선 관리 종사원',
      jobGrade: '2급',
      driveType: 'private',
      motorcycle: 'nondriver',
      relationWithContractor: 'Self',
      actualLossSimulDesignNo: 'LA260219319244',
      premium: 33301,
      isDiscountApplied: 'Y',
    },
    {
      type: 'default',
      name: '이영희',
      juminNumber: '880520-2******',
      age: 38,
      gender: '여',
      ageStandardDate: '2026-05-20',
      ageDDay: 'D-68',
      designAgreeDate: '2026-03-10',
      designAgreeDDay: 'D-19',
      jobCode: '02111',
      jobName: '일반 사무 행정 전문가',
      jobGrade: '1급',
      driveType: 'private',
      motorcycle: 'nondriver',
      relationWithContractor: 'Employer',
      actualLossSimulDesignNo: 'LA260310452133',
      premium: 28500,
      isDiscountApplied: 'N',
    },
    {
      type: 'child',
      name: '박지성',
      juminNumber: '021115-3******',
      age: 24,
      gender: '남',
      ageStandardDate: '2026-11-15',
      ageDDay: 'D-247',
      designAgreeDate: '2026-03-12',
      designAgreeDDay: 'D-17',
      jobCode: '74112',
      jobName: '전기 및 전자 설비 설치원',
      jobGrade: '3급',
      driveType: 'nondriver',
      motorcycle: 'drives',
      relationWithContractor: 'Child',
      actualLossSimulDesignNo: 'LA260312987412',
      premium: 45200,
      isDiscountApplied: 'Y',
    },
  ],
  Policyholder: {
    name: '김한화',
    juminNumber: '900101-1******',
    infoAcquisitionPath: 'selection',
    addresses: '경기도 부천시 원미구 역곡동',
    workAddress: '경상남도 진주시 (하대동)',
    contact: '010-1234-5678',
    isBusinessOwner: 'Y',
    email: 'qwer@hwgi.kr',
    electronicNoticeAgree: 'Y',
    taxFreeType: 'nonemonthly',
    designAmount: 33301,
    remainingLimit: 100000000,
  },
};

const CHILD_FETUS_INSURANCE_STEP1_DATA = {
  ContractorInfo: {
    insStartDate: '2026-01-30',   // 보험시기
    insStartPeriod: '2026-01-30', // 보험기간 start
    insEndPeriod: '2126-01-30',   // 보험기간 end
    expiryDate: '100',            // 만기 (option value 기준)
    payPeriod: '10',              // 납기
    payCycle: 'month',            // 납입주기
    renewCycle: '20',             // 갱신주기
    baby: 'Y',                    // 태아 가입 여부
    multiFetus: 'N',              // 다태아 여부
    advanceCommission: 'N',       // 수수료선지급 여부
    contract: 'Y',                // 계약전환
  },
  InsuredPerson: [
    {
      type: 'child',                              // 피보험자 유형
      name: '김한희',                             // 피보험자 이름
      juminNumber: '220101-3******',             // 주민등록번호
      age: 4,                                    // 나이
      gender: '남',                               // 성별
      ageStandardDate: '2026-03-09',             // 상령일
      ageDDay: 'D-31',                           // 상령일 D-Day
      designAgreeDate: '2026-03-09',             // 설계동의일
      designAgreeDDay: 'D-20',                   // 설계동의 D-Day
      jobCode: 'B6100',                          // 직업코드
      jobName: '미취학아동',                      // 직업명
      jobGrade: '1급',                            // 직업급수
      driveType: 'nondriver',                    // 운전형태
      motorcycle: 'nondriver',                   // 이륜차
      relationWithContractor: 'Child',           // 계약자와 관계
      actualLossSimulDesignNo: '',               // (실손)동시설계 번호
      premium: 0,                               // 보험료
      isDiscountApplied: 'Y',                    // 할인적용 여부
      weeksOfPregnancy: 20,                      // 임신 주수 (태아 전용)
      dueDate: '2026-08-20',                     // 출산예정일 (태아 전용)
    },
  ],
  Policyholder: {
    name: '이한화',
    juminNumber: '910101-2******',
    infoAcquisitionPath: 'selection',
    addresses: '경남 진주시 하대동',
    workAddress: '경남 진주시 시청역',
    contact: '010-9876-5432',
    isBusinessOwner: 'N',
    email: 'endlskieio@naver.com',
    electronicNoticeAgree: 'N',
    taxFreeType: 'monthly',
    designAmount: 111,
    remainingLimit: 4298928,
  },
};

const PROPERTY_INSURANCE_STEP1_DATA = {
  ContractorInfo: {
    insStartDate: '',
    insStartPeriod: '',
    insEndPeriod: '',
    expiryDate: '',
    payPeriod: '',
    payCycle: '',
    renewCycle: '',
    noticeType: '',
  },
  InsuredPerson: [],
  Policyholder: {
    name: '',
    juminNumber: '',
    infoAcquisitionPath: '',
    addresses: '',
    workAddress: '',
    contact: '',
    isBusinessOwner: 'N',
    email: '',
    electronicNoticeAgree: 'N',
    taxFreeType: '',
    designAmount: 0,
    remainingLimit: 0,
  },
};

const INSURANCE_STEP1_DATA_BY_PRODUCT = {
  personal: PERSONAL_INSURANCE_STEP1_DATA,
  childFetus: CHILD_FETUS_INSURANCE_STEP1_DATA,
  property: PROPERTY_INSURANCE_STEP1_DATA,
} as const;

const personalInsuranceStep1Data = INSURANCE_STEP1_DATA_BY_PRODUCT.personal;

const CONTRACTOR_INFO = personalInsuranceStep1Data.ContractorInfo;
const POLICYHOLDER = personalInsuranceStep1Data.Policyholder;


// --- Initial State ---
const INITIAL_INSURED_FORM: Record<string, InsuredPersonFormItem> = Object.fromEntries(
  personalInsuranceStep1Data.InsuredPerson.map((person, i) => [
    `tab${i + 1}`,
    {
      driveType: person.driveType ?? '',
      motorcycle: person.motorcycle ?? '',
      isDiscountApplied: person.isDiscountApplied === 'Y',
      relationWithContractor: person.relationWithContractor ?? '',
    },
  ])
);

const INITIAL_CONTRACT_FORM_STATE: ContractFormState = {
  insuranceStartDate: CONTRACTOR_INFO.insStartDate,
  maturityValue: CONTRACTOR_INFO.expiryDate || '',
  paymentPeriodValue: CONTRACTOR_INFO.payPeriod || '',
  paymentCycleValue: CONTRACTOR_INFO.payCycle || '',
  renewalCycleValue: CONTRACTOR_INFO.renewCycle || '',
  notificationTypeValue: CONTRACTOR_INFO.noticeType || '',
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
}: LniPl020Step1Props) {
  // ---------------------------------------------------------------------------
  // 1) Data source
  // ---------------------------------------------------------------------------
  const rangeValue = {
    from: CONTRACTOR_INFO.insStartPeriod,
    to: CONTRACTOR_INFO.insEndPeriod,
  };

  const childRangeValue = {
    from: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.insStartPeriod,
    to: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.insEndPeriod,
  };

  // ---------------------------------------------------------------------------
  // 2) State & Reducer
  // ---------------------------------------------------------------------------
  const [contractForm, dispatchContractForm] = useReducer(contractFormReducer, INITIAL_CONTRACT_FORM_STATE);
  const [insuredForm, setInsuredForm] = useState<Record<string, InsuredPersonFormItem>>(INITIAL_INSURED_FORM);
  const [policyholderIsBusinessOwner, setPolicyholderIsBusinessOwner] = useState(POLICYHOLDER.isBusinessOwner === 'Y');
  const [taxFreeChecked, setTaxFreeChecked] = useState(false);
  const [taxFreeTypeValue, setTaxFreeTypeValue] = useState(POLICYHOLDER.taxFreeType ?? '');
  const [infoAcquisitionValue, setInfoAcquisitionValue] = useState(POLICYHOLDER.infoAcquisitionPath ?? '');

  // 어린이(태아) 상태
  const [childContractForm, dispatchChildContractForm] = useReducer(contractFormReducer, {
    insuranceStartDate: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.insStartDate,
    maturityValue:      CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.expiryDate || '',
    paymentPeriodValue: CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.payPeriod || '',
    paymentCycleValue:  CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.payCycle || '',
    renewalCycleValue:  CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.renewCycle || '',
    notificationTypeValue: '',
  });
  const [childInsuredForm, setChildInsuredForm] = useState<Record<string, InsuredPersonFormItem>>(
    Object.fromEntries(
      CHILD_FETUS_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => [
        `tab${i + 1}`,
        {
          driveType: person.driveType ?? '',
          motorcycle: person.motorcycle ?? '',
          isDiscountApplied: person.isDiscountApplied === 'Y',
          relationWithContractor: person.relationWithContractor ?? '',
        },
      ])
    )
  );
  const [childPolicyholderIsBusinessOwner, setChildPolicyholderIsBusinessOwner] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.isBusinessOwner === 'Y'
  );
  const [childTaxFreeChecked, setChildTaxFreeChecked] = useState(false);
  const [childTaxFreeTypeValue, setChildTaxFreeTypeValue] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.taxFreeType ?? ''
  );
  const [childInfoAcquisitionValue, setChildInfoAcquisitionValue] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.infoAcquisitionPath ?? ''
  );
  const [childBabyChecked, setChildBabyChecked] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.baby === 'Y'
  );
  const [childMultiFetusChecked, setChildMultiFetusChecked] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.multiFetus === 'Y'
  );
  const [childAdvanceCommissionChecked, setChildAdvanceCommissionChecked] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.advanceCommission === 'Y'
  );
  const [childContractConversionChecked, setChildContractConversionChecked] = useState(
    CHILD_FETUS_INSURANCE_STEP1_DATA.ContractorInfo.contract === 'Y'
  );

  // ---------------------------------------------------------------------------
  // 3) Tabs
  // ---------------------------------------------------------------------------
  const {
    tabs,
    active: tabValue,
    setActive: setTabValue,
    handleRemove: handleRemoveTab,
  } = useTabs(
    personalInsuranceStep1Data.InsuredPerson.map((person, i) => ({
      value: `tab${i + 1}`,
      label: person.name,
      error: false,
    }))
  );

  const currentPersonIndex = personalInsuranceStep1Data.InsuredPerson.findIndex((_, i) => `tab${i + 1}` === tabValue);
  const currentPerson = personalInsuranceStep1Data.InsuredPerson[currentPersonIndex >= 0 ? currentPersonIndex : 0]!;

  // 어린이(태아) 탭
  const {
    tabs: childTabs,
    active: childTabValue,
    setActive: setChildTabValue,
    handleRemove: handleRemoveChildTab,
  } = useTabs(
    CHILD_FETUS_INSURANCE_STEP1_DATA.InsuredPerson.map((person, i) => ({
      value: `tab${i + 1}`,
      label: person.name,
      error: false,
    }))
  );

  const childCurrentPersonIndex = CHILD_FETUS_INSURANCE_STEP1_DATA.InsuredPerson.findIndex((_, i) => `tab${i + 1}` === childTabValue);
  const childCurrentPerson = CHILD_FETUS_INSURANCE_STEP1_DATA.InsuredPerson[childCurrentPersonIndex >= 0 ? childCurrentPersonIndex : 0]!;

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

  // 어린이(태아) 핸들러
  const handleChildContractFieldChange = useCallback((field: ContractFormField, value: string) => {
    dispatchChildContractForm({ type: 'setField', field, value });
  }, []);

  const handleChildTodayClick = useCallback(() => {
    handleChildContractFieldChange('insuranceStartDate', new Date().toISOString().slice(0, 10));
  }, [handleChildContractFieldChange]);

  const updateChildInsuredField = useCallback((tab: string, field: keyof InsuredPersonFormItem, value: string | boolean) => {
    setChildInsuredForm((prev) => ({ ...prev, [tab]: { ...prev[tab]!, [field]: value } }));
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
              {/* 인보험 */ }
              <Grow placement={'ss'} className={className ?? 'w-full'}>
                <FormTable caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem] min-w-[14rem]', 'w-[calc(50%-14rem)]']}>
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
                      <RadioGroup
                        value={contractForm.paymentPeriodValue}
                        onValueChange={(value) => handleContractFieldChange('paymentPeriodValue', value)}
                        className='flex-row gap-3'
                      >
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
                      <RadioGroup
                        value={contractForm.paymentCycleValue}
                        onValueChange={(value) => handleContractFieldChange('paymentCycleValue', value)}
                        className='flex-row gap-3'
                      >
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
                      <RadioGroup
                        value={contractForm.renewalCycleValue}
                        onValueChange={(value) => handleContractFieldChange('renewalCycleValue', value)}
                        className='flex-row gap-3'
                      >
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
                      <RadioGroup
                        value={contractForm.notificationTypeValue}
                        onValueChange={(value) => handleContractFieldChange('notificationTypeValue', value)}
                        width={'full'}
                        className='grid grid-cols-3 gap-x-6 gap-y-2 w-full'
                      >
                        {[
                            { value: 'type1', id: 'notification-type-1', label: '1형(일반고지형)', justifyStart: true },
                            { value: 'type2', id: 'notification-type-2', label: '2형(건강고지형II(6년))', justifyStart: true },
                            { value: 'type3', id: 'notification-type-3', label: '3형(건강고지형II(7년))', justifyStart: true },
                            { value: 'type4', id: 'notification-type-4', label: '4형(건강고지형II(8년))', justifyStart: true },
                            { value: 'type5', id: 'notification-type-5', label: '5형(건강고지형II(9년))', justifyStart: true },
                            { value: 'type6', id: 'notification-type-6', label: '6형(건강고지형II(10년))', justifyStart: true },
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
                            <RadioGroup
                              value={insuredForm[tabValue]?.motorcycle ?? ''}
                              onValueChange={(v) => updateInsuredField(tabValue, 'motorcycle', v)}
                              className='flex-row gap-3'
                            >
                              {[ 
                                { value: 'drives', id: 'motorcycle-drives', label: '운전함' },
                                { value: 'nondriver', id: 'motorcycle-nondriver', label: '운전안함' }
                                ].map((option) => (
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
                            <NativeSelect
                              aria-label="계약자와의 관계 선택"
                              width={'15.8rem'}
                              required
                              value={insuredForm[tabValue]?.relationWithContractor ?? ''}
                              onChange={(e) => updateInsuredField(tabValue, 'relationWithContractor', e.target.value)}
                            >
                              {[
                                  { value: 'Self', id: 'contractor-info-self', label: '본인' },
                                  { value: 'Child', id: 'contractor-info-Child', label: '자녀' },
                                  { value: 'Employer', id: 'contractor-info-Employer', label: '고용주' },
                                ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
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
                            <NativeSelect
                              aria-label="개인정보취득경로 선택"
                              width="20rem"
                              required
                              value={infoAcquisitionValue}
                              onChange={(e) => setInfoAcquisitionValue(e.target.value)}
                            >
                              {[
                                  { value: 'selection', id: 'personalinfo-1', label: '고객직접선택' },
                                  { value: 'selection2', id: 'personalinfo-2', label: '선택' },
                                ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
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
                                    <Tooltip defaultOpen>
                                      <TooltipTrigger asChild>
                                        <Button
                                          only="icon"
                                          size="md"
                                          variant="none"
                                        >
                                          <QuestionMark color="#61554F" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent
                                        side="top"
                                        sideOffset={1}
                                        variant="default"
                                      >
                                        {`문서서명/IM은 청약서상 고객이 청약서로<br> [전자적 방법의 안내동의여부]에 기재한 내용을<br> 화면에서 선택하시면 됩니다.<br> 전자서명/전자청약은 전자적 안내동의가<br> 필수사항입니다.`}
                                      </TooltipContent>
                                    </Tooltip>
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
                            <NativeSelect 
                              aria-label="비과세 유형 선택" 
                              width="17rem"
                              value={taxFreeTypeValue}
                              onChange={(e) => setTaxFreeTypeValue(e.target.value)}
                            > 
                              {[
                                  { value: 'monthly', id: 'monthly-payment-monthly', label: '월납식비과세' },
                                  { value: 'nonemonthly', id: 'monthly-payment-nonemonthly', label: '비월납식비과세' },
                                ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
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
              {/*// 인보험 */ }
              {/* 어린이(태아) */}
              <Grow placement={'ss'} className={className ?? 'w-full'}>
                <FormTable caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem] min-w-[14rem]', 'w-[calc(50%-14rem)]']}>
                  <FormRow>
                    <FormCell title={'보험시기'}>
                      <DatePickerInput
                        value={childContractForm.insuranceStartDate}
                        mode={'single'}
                        width={'9rem'}
                        onChange={(_, formattedValue) => handleChildContractFieldChange('insuranceStartDate', formattedValue ?? '')}
                      />
                      <Button color={'secondary'} onClick={handleChildTodayClick} only={'default'} size={'lg'} variant={'outlined'}>
                        오늘
                      </Button>
                    </FormCell>
                    <FormCell title={'보험기간'}>
                      <DatePickerInput readOnly mode={'range'} width={'9rem'} rangeValue={childRangeValue} />
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'만기'} colSpan={3}>
                      <RadioGroup
                        value={childContractForm.maturityValue}
                        onValueChange={(value) => handleChildContractFieldChange('maturityValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: '100',  id: 'child-insurance-period-100', label: '100세만기' },
                          { value: '90',  id: 'child-insurance-period-90', label: '90세만기' },
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
                      <RadioGroup
                        value={childContractForm.paymentPeriodValue}
                        onValueChange={(value) => handleChildContractFieldChange('paymentPeriodValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: '10',   id: 'child-payment-period-10', label: '10년납' },
                          { value: '15',   id: 'child-payment-period-15', label: '15년납' },
                          { value: '20',   id: 'child-payment-period-20', label: '20년납' },
                          { value: '25',   id: 'child-payment-period-25', label: '25년납' },
                          { value: '30',   id: 'child-payment-period-30', label: '30년납' },
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
                      <RadioGroup
                        value={childContractForm.paymentCycleValue}
                        onValueChange={(value) => handleChildContractFieldChange('paymentCycleValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: 'month',     id: 'child-payment-cycle-monthly',    label: '월납' },
                        ].map((option) => (
                          <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </FormCell>
                    <FormCell title={'갱신주기'}>
                      <RadioGroup
                        value={childContractForm.renewalCycleValue}
                        onValueChange={(value) => handleChildContractFieldChange('renewalCycleValue', value)}
                        className='flex-row gap-3'
                      >
                        {[
                          { value: '20', id: 'child-renewal-period-20', label: '20년' },
                          { value: '10', id: 'child-renewal-period-10', label: '10년' },
                          { value: '3',  id: 'child-renewal-period-3',  label: '3년' },
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
                      <Checkbox
                        color="primary"
                        checked={childBabyChecked}
                        onCheckedChange={(c) => setChildBabyChecked(c === true)}
                        size="md"
                        variant="default"
                      >
                        가입
                      </Checkbox>
                     <Checkbox
                        color="primary"
                        checked={childMultiFetusChecked}
                        onCheckedChange={(c) => setChildMultiFetusChecked(c === true)}
                        size="md"
                        variant="default"
                      >
                        다태아
                      </Checkbox>
                     <Checkbox
                        color="primary"
                        checked={childAdvanceCommissionChecked}
                        onCheckedChange={(c) => setChildAdvanceCommissionChecked(c === true)}
                        size="md"
                        variant="default"
                      >
                        수수료선지급
                      </Checkbox>
                    </FormCell>
                    <FormCell title={'계약전환'}>
                      <Checkbox
                        color="primary"
                        checked={childContractConversionChecked}
                        onCheckedChange={(c) => setChildContractConversionChecked(c === true)}
                        size="md"
                        variant="default"
                      >
                        신청
                      </Checkbox>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Grow>
              <Gcol placement="ss" className={className ?? 'w-full'}>
                <TabPager
                  variant={'default'}
                  data={childTabs}
                  active={childTabValue}
                  setActive={setChildTabValue}
                  renderButtons={
                    <Grow>
                      <Button color={'gray'} size={'md'} variant={'outlined'}>
                        피보험자
                        <PlusIcon color={'#61554F'} />
                      </Button>
                    </Grow>
                  }
                  removable
                  onRemove={handleRemoveChildTab}
                  visibleCount={5}
                  getValue={(tab) => String(tab.value)}
                  renderTab={(tab) => tab.label}
                >
                  <div className="w-full h-full relative">
                    <Gcol placement={'ss'}>
                      {/* 피보험자 테이블 */}
                      <FormTable caption="피보험자 정보" lineTop={false} cols={['w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem]', 'w-[calc(50%-14rem)]']}>
                        <FormRow>
                          <FormCell colSpan={3} title={'피보험자'} titleVariant="section">
                            <Grow className="flex-nowrap w-full" placement={'bwc'}>
                              <Grow>
                                <Input aria-label="피보험자명" width={'7.6rem'} value={childCurrentPerson?.name ?? ''} readOnly />
                                <Input aria-label="주민등록번호 마스킹" width={'12rem'} value={childCurrentPerson?.juminNumber ?? ''} readOnly />
                                <Button aria-label="피보험자 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                  <SearchIcon color={'var(--color-primary-50)'} />
                                </Button>
                                <Input aria-label="피보험자 나이" width={'4.6rem'} value={`${childCurrentPerson?.age ?? 0}세`} readOnly />
                                <Input aria-label="피보험자 성별" width={'3.2rem'} value={childCurrentPerson?.gender ?? ''} readOnly />
                              </Grow>
                              <Grow gap={2}>
                                <KeyValueItem label={'상령일'}>
                                  <Grow gap={1}>
                                    <Typo weight={'bold'}>{childCurrentPerson?.ageStandardDate ?? ''}</Typo>
                                    <Badge color={'blue'} size={'md'} variant={'contained'}>{childCurrentPerson?.ageDDay ?? ''}</Badge>
                                  </Grow>
                                </KeyValueItem>
                                <KeyValueItem label={'설계동의'}>
                                  <Grow gap={1}>
                                    <Typo weight={'bold'}>{childCurrentPerson?.designAgreeDate ?? ''}</Typo>
                                    <Badge color={'red'} size={'md'} variant={'contained'}>{childCurrentPerson?.designAgreeDDay ?? ''}</Badge>
                                  </Grow>
                                </KeyValueItem>
                                <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
                                  알림톡발송
                                </Button>
                              </Grow>
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="직업" colSpan={3}>
                            <Grow className="gap-1 flex-nowrap w-full" placement={'ss'}>
                              <Input aria-label="직업코드" width={'7.6rem'} value={childCurrentPerson?.jobCode ?? ''} readOnly />
                              <Input aria-label="직업분류" width={'27.4rem'} value={childCurrentPerson?.jobName ?? ''} readOnly />
                              <Button aria-label="직업 검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input aria-label="직업급수" width={'2xs'} value={childCurrentPerson?.jobGrade ?? ''} readOnly />
                            </Grow>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="임신주수">
                            <Input aria-label="임신주수" width={'5rem'} value={String(childCurrentPerson?.weeksOfPregnancy ?? '')} readOnly />
                            주
                          </FormCell>
                          <FormCell title="출산예정일">
                            <Input aria-label="출산예정일" width={'9rem'} value={childCurrentPerson?.dueDate ?? ''} readOnly />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="운전형태">
                            <RadioGroup
                              value={childInsuredForm[childTabValue]?.driveType ?? ''}
                              onValueChange={(v) => updateChildInsuredField(childTabValue, 'driveType', v)}
                              className='flex-row gap-3'
                            >
                              {[
                                { value: 'private',    id: 'child-driving-type-private',    label: '자가용' },
                                { value: 'commercial', id: 'child-driving-type-commercial', label: '영업용' },
                                { value: 'nondriver',  id: 'child-driving-type-nondriver',  label: '비운전자' },
                              ].map((option) => (
                                <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                  {option.label}
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          </FormCell>
                          <FormCell title="이륜차">
                            <RadioGroup
                              value={childInsuredForm[childTabValue]?.motorcycle ?? ''}
                              onValueChange={(v) => updateChildInsuredField(childTabValue, 'motorcycle', v)}
                              className='flex-row gap-3'
                            >
                              {[
                                { value: 'drives',    id: 'child-motorcycle-drives',    label: '운전함' },
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
                          <FormCell title="계약자와 관계">
                            <Input aria-label="피보험자명" width={'7.6rem'} value={childCurrentPerson?.name ?? ''} readOnly />는 계약자의
                            <NativeSelect
                              aria-label="계약자와의 관계 선택"
                              width={'15.8rem'}
                              required
                              value={childInsuredForm[childTabValue]?.relationWithContractor ?? ''}
                              onChange={(e) => updateChildInsuredField(childTabValue, 'relationWithContractor', e.target.value)}
                            >
                              {[
                                { value: 'Self',     id: 'child-contractor-info-self',     label: '본인' },
                                { value: 'Child',    id: 'child-contractor-info-Child',    label: '자녀' },
                                { value: 'Employer', id: 'child-contractor-info-Employer', label: '고용주' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title="(실손)동시설계">
                            <Input aria-label="설계번호" width={'13rem'} value={childCurrentPerson?.actualLossSimulDesignNo ?? ''} readOnly />
                            <Input aria-label="보험료" width={'13rem'} value={String(childCurrentPerson?.premium ?? 0)} commaAmount readOnly />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="할인적용" colSpan={3}>
                            <Checkbox
                              color="primary"
                              checked={childInsuredForm[childTabValue]?.isDiscountApplied ?? false}
                              onCheckedChange={(c) => updateChildInsuredField(childTabValue, 'isDiscountApplied', c === true)}
                              size="md"
                              variant="default"
                            >
                              가족연계할인
                            </Checkbox>
                            <Button aria-label="검색" variant="outlined" only="icon" size="lg" color="gray-light">
                              <SearchIcon color="var(--color-primary-50)" />
                            </Button>
                          </FormCell>
                        </FormRow>
                      </FormTable>

                      {/* 계약자 테이블 */}
                      <FormTable caption="계약자 정보" cols={['w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem]', 'w-[calc(50%-14rem)]']}>
                        <FormRow>
                          <FormCell title={'계약자'} titleVariant="section">
                            <Grow>
                              <Input aria-label="계약자명" width="7.6rem" value={CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.name} readOnly />
                              <Input aria-label="주민등록번호 마스킹" width="12rem" value={CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.juminNumber} readOnly />
                              <Button aria-label="계약자 검색" variant="outlined" only="icon" color="gray-light" size="lg">
                                <SearchIcon color="var(--color-primary-50)" />
                              </Button>
                              <Checkbox
                                color="primary"
                                checked={childPolicyholderIsBusinessOwner}
                                onCheckedChange={(c) => setChildPolicyholderIsBusinessOwner(c === true)}
                                size="md"
                                variant="default"
                              >
                                개인사업자
                              </Checkbox>
                            </Grow>
                          </FormCell>
                          <FormCell title="개인정보취득경로">
                            <NativeSelect
                              aria-label="개인정보취득경로 선택"
                              width="20rem"
                              required
                              value={childInfoAcquisitionValue}
                              onChange={(e) => setChildInfoAcquisitionValue(e.target.value)}
                            >
                              {[
                                { value: 'selection',  id: 'child-personalinfo-1', label: '고객직접선택' },
                                { value: 'selection2', id: 'child-personalinfo-2', label: '선택' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="자택(소재지)" colSpan={3}>
                            {CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.addresses}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="직장(본사)" colSpan={3}>
                            {CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.workAddress}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="연락처">
                            <Grow placement='bwc'>
                              <Grow>{CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.contact}</Grow>
                              <Grow>
                                <KeyValueItem label="전자적안내동의">
                                  <Badge color="green" size="md" variant="ghost">{CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.electronicNoticeAgree}</Badge>
                                </KeyValueItem>
                              </Grow>
                            </Grow>
                          </FormCell>
                          <FormCell title="이메일">
                            {CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.email}
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title="보험차익비과세">
                            <Checkbox
                              color="primary"
                              checked={childTaxFreeChecked}
                              onCheckedChange={(c) => setChildTaxFreeChecked(c === true)}
                              size="md"
                              variant="default"
                            >
                              가입
                            </Checkbox>
                            <NativeSelect
                              aria-label="비과세 유형 선택"
                              width="17rem"
                              value={childTaxFreeTypeValue}
                              onChange={(e) => setChildTaxFreeTypeValue(e.target.value)}
                            >
                              {[
                                { value: 'monthly',     id: 'child-monthly-payment-monthly',     label: '월납식비과세' },
                                { value: 'nonemonthly', id: 'child-monthly-payment-nonemonthly', label: '비월납식비과세' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                            <Button color="secondary" size="lg" variant="outlined" onClick={() => {}}>
                              알림톡발송
                            </Button>
                          </FormCell>
                          <FormCell title="설계금액/잔여한도">
                            <Input aria-label="설계금액" width="7.1rem" value={String(CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.designAmount)} commaAmount readOnly />
                            /
                            <Input aria-label="잔여한도" width="7.1rem" value={String(CHILD_FETUS_INSURANCE_STEP1_DATA.Policyholder.remainingLimit)} commaAmount readOnly />
                            <Button color="secondary" size='lg' variant="outlined" onClick={() => {}}>
                              조회
                            </Button>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol>
                  </div>
                </TabPager>
              </Gcol>
              {/*// 어린이(태아) */}
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
