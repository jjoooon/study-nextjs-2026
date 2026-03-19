
// TestData 타입 정의
export interface TestDataType {
  data: Array<{
    id: number;
    code: string;
    locked?: boolean; // 잠금 여부 추가
    isDuplicate: boolean;
    productName: string;
    coverageAmount: number;
    attribute: boolean;
    premium: number;
    availableAmount: number;
    expiryPeriod: string;
    paymentPeriod: string;
    expectedUwResult: string;
    isHighlighted: boolean;
    canEditExpiry: boolean;
    selected?: boolean;
    badge?: string[]; 
    filePath: string[]; // 트리 경로를 포함한 배열
    type: 'Folder' | 'File';
  }>;
}
export const TestData: TestDataType = {
  data: [
    {
      id: 1,
      locked: true,
      code: 'A001',
      isDuplicate: true,
      productName: '무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험',
      coverageAmount: 500,
      attribute: true,
      premium: 450,
      availableAmount: 100,
      expiryPeriod: '80세',
      paymentPeriod: '20년',
      expectedUwResult: '인수',
      isHighlighted: true,
      canEditExpiry: true, 
      badge: ['독립', '갱신'],
      filePath: ['A001'], 
      type: 'Folder',
    },
    {
      id: 2,
      code: 'A001',
      locked: true,
      isDuplicate: true,
      productName: '무배당 메리츠 종합보험 무배당 메리츠 종합보험무배당 메리츠 종합보험무배당 메리츠 종합보험',
      coverageAmount: 300,
      attribute: false,
      premium: 350,
      availableAmount: 500,
      expiryPeriod: '100세',
      paymentPeriod: '전기납',
      expectedUwResult: '조건부인수',
      isHighlighted: false,
      canEditExpiry: false,
      filePath: ['A001', '1'], 
      type: 'File'
    },
    {
      id: 3,
      code: 'A001',
      locked: false,
      isDuplicate: true,
      productName: 'KB손해보험 암보험KB손해보험 암보험KB손해보험 암보험KB손해보험 암보험',
      coverageAmount: 700,
      attribute: false,
      premium: 550,
      availableAmount: 1500,
      expiryPeriod: '90세',
      paymentPeriod: '15년',
      expectedUwResult: '인수',
      isHighlighted: false,
      canEditExpiry: true,
      badge: ['독립'],
      filePath: ['A001', '2'], 
      type: 'File'
    },
    {
      id: 4,
      code: 'A002',
      locked: false,
      isDuplicate: true,
      productName: '한화생명 의료실비보험',
      coverageAmount: 450,
      attribute: false,
      premium: 420,
      availableAmount: 900,
      expiryPeriod: '85세',
      paymentPeriod: '10년',
      expectedUwResult: '거절',
      isHighlighted: false,
      canEditExpiry: false,
      badge: ['갱신'],
      filePath: ['A002'], 
      type: 'Folder'
    },
    {
      id: 5,
      locked: false,
      code: 'A002',
      isDuplicate: true,
      productName: '롯데생명 종신보험',
      coverageAmount: 100,
      attribute: false,
      premium: 750,
      availableAmount: 200,
      expiryPeriod: '100세',
      paymentPeriod: '전기납',
      expectedUwResult: '조건부인수',
      isHighlighted: false,
      canEditExpiry: true,
      filePath: ['A002', '1'], 
      type: 'File'
    },
    {
      id: 6,
      code: 'A002',
      locked: false,
      isDuplicate: true,
      productName: '현대생명 정기보험',
      coverageAmount: 600,
      attribute: false,
      premium: 480,
      availableAmount: 1200,
      expiryPeriod: '80세',
      paymentPeriod: '20년',
      expectedUwResult: '인수',
      isHighlighted: false,
      canEditExpiry: false,
      filePath: ['A002', '2'], 
      type: 'File'
    },
  ],
}


