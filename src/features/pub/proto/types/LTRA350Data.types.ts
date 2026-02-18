
export interface Category { value: string; label: string }

export type Tag = string;

export interface TabDataType {
  name: string;
  age: string;
  gender: string;
  value: string;
  info: string[];
};

export interface AgGridData {
  id: number;
  isDuplicate: boolean; // 중복 여부 (boolean은 관습적으로 is/has 접두사 사용)
  productName: string; // 상품명
  coverageAmount: number; // 가입금액 (보장받는 금액)
  premium: number; // 보험료 (매달 내는 돈)
  availableAmount: number; // 가능금액
  expiryPeriod: string; // 만기 (또는 maturityTerm)
  paymentPeriod: string; // 납기 (또는 paymentTerm)
  expectedUwResult: string; // 예상UW결과 (UnderWriting의 약어)
  isHighlighted?: boolean;
  selected?: boolean; // 체크박스 상태 추가
}
export interface AgGridProps {
  data: AgGridData[];
  selectedPlanId?: number | null;
  onSelectPlan?: (planId: number) => void;
  hideAside: boolean;
  setHideAside: (hide: boolean) => void;
}
