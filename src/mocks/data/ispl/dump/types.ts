export interface PlanCovData {
  id: number;
  productCode: string;
  isDuplicate: boolean;
  productName: string;
  coverageAmount: number;
  premium: number;
  availableAmount: number;
  expiryPeriod: string;
  paymentPeriod: string;
  expectedUwResult: '인수' | '조건부인수' | '거절';
  isHighlighted: boolean;
}
