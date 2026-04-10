export type Ltpa350Step6GridRow = {
  // 즉시집금
  id: number;
  sortation: string | number;
  bank: string | number;
  customerAccountNum: string | number;
  amount: string | number;
  withdrawalStatus: string | number;
  collectionStatus: string | number;
  delete: string | number;
  canEditExpiry: boolean;
};

// 카드
export type Ltpa350Step6GridRow1 = {
  id: number;
  sortation: string | number;
  cardIssuer: string | number;
  cardNumber: string | number;
  expiryDate: string | number;
  installment: string | number;
  amount: string | number;
  postBilling: string | number;
  approvalNumber: string | number;
  approvalStatus: string | number;
  delete: string | number;
};

// 입금사항
export type Ltpa350Step6GridRow2 = {
  id: number;
  sortation: string | number;
  depositDate: string | number;
  amount: string | number;
  description: string | number;
  remark: string | number;
};

export interface Ltpa350Step6DataType {
  ImmediateDeposit: Ltpa350Step6GridRow[];
  ImmediateDepositCard: Ltpa350Step6GridRow1[];
  depositInfo: Ltpa350Step6GridRow2[];
}

export const Ltpa350Step6Data: Ltpa350Step6DataType = {
  ImmediateDeposit: [
    {
      id: 1,
      sortation: '1',
      bank: '선택',
      customerAccountNum: '숫자만 입력',
      amount: '46500',
      withdrawalStatus: '',
      collectionStatus: '',
      delete: '삭제',
      canEditExpiry: false,
    },
    {
      id: 2,
      sortation: '2',
      bank: '선택',
      customerAccountNum: '숫자만 입력',
      amount: '46500',
      withdrawalStatus: '',
      collectionStatus: '',
      delete: '삭제',
      canEditExpiry: false,
    },
  ],

  // 카드
  ImmediateDepositCard: [
    {
      id: 1,
      sortation: '구분',
      cardIssuer: '카드사',
      cardNumber: '카드번호',
      expiryDate: '유효기간',
      installment : '할부',
      amount: '금액',
      postBilling: '후청구',
      approvalNumber: '승인번호',
      approvalStatus: '승인상태',
      delete: '삭제',
    },
    {
      id: 2,
      sortation: '구분',
      cardIssuer: '카드사',
      cardNumber: '카드번호',
      expiryDate: '유효기간',
      installment : '할부',
      amount: '금액',
      postBilling: '후청구',
      approvalNumber: '승인번호',
      approvalStatus: '승인상태',
      delete: '삭제',
    },    
  ],

  // 입금사항
  depositInfo: [
    {
      id: 1,
      sortation: '구분',
      depositDate: '입금일자',
      amount: '금액',
      description: '적요',
      remark: '비고',
      
      
    },
    
  ],

};
