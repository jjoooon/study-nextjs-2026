type InsuranceFormOptionsItemType = {
  value: string;
  id: string;
  label: string;
  justifyStart?: boolean;
};
type InsuranceFormOptionsType = {
  maturity: InsuranceFormOptionsItemType[];
  paymentPeriod: InsuranceFormOptionsItemType[];
  paymentCycle: InsuranceFormOptionsItemType[];
  renewalCycle: InsuranceFormOptionsItemType[];
  notificationType: InsuranceFormOptionsItemType[];
  drivingType: InsuranceFormOptionsItemType[];
  motorcycleType: InsuranceFormOptionsItemType[];
};

export const InsuranceFormOptions: InsuranceFormOptionsType = {
  // 만기
  maturity: [
    { value: '80', id: 'insurance-period-80', label: '80세' },
    { value: '90', id: 'insurance-period-90', label: '90세' },
    { value: '100', id: 'insurance-period-100-a', label: '100세' },
    { value: '110', id: 'insurance-period-100-b', label: '110세' },
  ],
  // 납기
  paymentPeriod: [
    { value: '10', id: 'payment-period-10', label: '10년납' },
    { value: '15', id: 'payment-period-15', label: '15년납' },
    { value: '20', id: 'payment-period-20', label: '20년납' },
    { value: '25', id: 'payment-period-25', label: '25년납' },
    { value: '30', id: 'payment-period-30', label: '30년납' },
    { value: 'life', id: 'payment-period-lifetime', label: '전기납' },
  ],
  // 납입주기
  paymentCycle: [
    { value: 'month', id: 'payment-cycle-monthly', label: '월납' },
    { value: 'quarter', id: 'payment-cycle-quarterly', label: '3개월' },
    { value: 'semiannual', id: 'payment-cycle-semiannual', label: '6개월' },
    { value: 'year', id: 'payment-cycle-annual', label: '연납' },
  ],
  // 갱신주기
  renewalCycle: [
    { value: '3', id: 'renewal-period-3', label: '3년' },
    { value: '10', id: 'renewal-period-10', label: '10년' },
    { value: '20', id: 'renewal-period-20', label: '20년' },
  ],
  // 고지유형
  notificationType: [
    { value: 'type1', id: 'notification-type-1', label: '1형(일반고지형)', justifyStart: true },
    { value: 'type2', id: 'notification-type-2', label: '2형(건강고지형II(6년))', justifyStart: true },
    { value: 'type3', id: 'notification-type-3', label: '3형(건강고지형II(7년))', justifyStart: true },
    { value: 'type4', id: 'notification-type-4', label: '4형(건강고지형II(8년))', justifyStart: true },
    { value: 'type5', id: 'notification-type-5', label: '5형(건강고지형II(9년))', justifyStart: true },
    { value: 'type6', id: 'notification-type-6', label: '6형(건강고지형II(10년))', justifyStart: true },
  ],
  // 운전형태
  drivingType: [
    { value: 'private', id: 'driving-type-private', label: '자가용' },
    { value: 'commercial', id: 'driving-type-commercial', label: '영업용' },
    { value: 'nondriver', id: 'driving-type-nondriver', label: '비운전자' },
  ],
  // 이륜차
  motorcycleType: [
    { value: 'drives', id: 'motorcycle-drives', label: '운전함' },
    { value: 'nondriver', id: 'motorcycle-nondriver', label: '운전안함' },
  ],

  // 계약자 유형
  contractorType: [
    { value: 'Self', id: 'contractor-info-self', label: '본인' }, 
    { value: 'Child', id: 'contractor-info-Child', label: '자녀' },
    { value: 'Employer', id: 'contractor-info-Employer', label: '고용주' },
  ],

  // 개인정보취득경로
  personalselectionType: [
    { value: 'selection', id: 'personalinfo1', label: '고객직접선택' },
    { value: 'selection2', id: 'personalinfo2', label: '선택' },
  ],

  // 월납식 비과세 유형
  monthlypaymentType: [
    { value: 'monthly', id: 'monthly-payment-monthly', label: '월납식비과세' },
    { value: 'nonemonthly', id: 'monthly-payment-nonemonthly', label: '비월납식비과세' },
  ]


};
