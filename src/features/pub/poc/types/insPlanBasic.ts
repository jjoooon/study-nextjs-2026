/**
 * 피보험자 데이터 타입
 */
export interface InsuredData {
  name: string;
  gender: string;
  age: string;
  ageIncreaseDate: string;
  job: string;
  lossDate: string;
  drivingType: string;
  twoWheeled: string;
  contractor: string;
  insured: string;
}

/**
 * 계약 데이터 타입
 */
export interface TabData {
  id: string;
  name: string;
  personalInfoPath: string;
  deliveryType: string;
  deliveryAddress: string;
  deliveryDetailAddress: string;
  planType: string;
  planOption: string;
  deliveryTerm: string;
  deliveryOption: string;
  maturityTerm: string;
  maturityOption: string;
  paymentCycle: string;
  noticeType: string;
  insuranceStartDate: string;
  insurancePeriod: [string, string];
  insured?: InsuredData[];
}

/**
 * 탭 목록 타입
 */
export interface TabItem {
  value: string;
  label: string;
}
