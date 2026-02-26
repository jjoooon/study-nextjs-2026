
// DUMMY_LTRA350_DATA 타입 정의
export interface LTRA350DataType {
  pageHead: {
    simpleMode: boolean;
    pageName: string;
    pageId: string;
    title: string;
    options: string[];
    planNumber: string[];
    contractHolder: string;
  };
  mainHead: {
    visibleCount: number;
    tabList: Array<{
      name: string;
      age: string | number;
      gender: string;
      value: string;
      info: string[];
    }>;
    checkboxList1: Array<{ label: string; value: string }>;
    checkboxList2: Array<{ label: string; value: string }>;
    tagList: string[];
  };
  mainBody: {
    agGridTable1: Array<{
      id: number;
      locked?: boolean; // 잠금 여부 추가
      isDuplicate: boolean;
      productName: string;
      coverageAmount: number;
      premium: number;
      availableAmount: number;
      expiryPeriod: string;
      paymentPeriod: string;
      expectedUwResult: string;
      isHighlighted: boolean;
      canEditExpiry: boolean;
      selected?: boolean;
      badge?: string[]; 
    }>;
  };
  taskState: Array<{ id: number; status: string; label: string }>;
  aside: {
    simpleContractInfo: {
      date: string;
      polName: string;
      insName: string;
      insAge: string;
      insGender: string;
      insGrade: string;
      info: Array<string>;
      quoteExpiryDate: string;
      insuranceAgeDate: string;
      consentEndDate: string;
      note: string;
    };
  };
}

// PageHead에 전달할 데이터 예시
export const DUMMY_LTRA350_DATA: LTRA350DataType = {
  pageHead : {
    simpleMode: true,
    pageName: '가입설계',
    pageId: 'LTRA350',
    title: '한화 시그니처 여성 건강보험 3.0 2504',
    options: ['납입면제 강화형', '기본형'],
    planNumber: ['LA20234472050000', '2'],
    contractHolder: '6012345 박하늘별님달',
  },
  mainHead: {
    visibleCount: 6,
    tabList: [
      {
        name: '홍길동',
        age: '1',
        gender: '여',
        value: 'tab1',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '2',
        gender: '남',
        value: 'tab2',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '3',
        gender: '여',
        value: 'tab3',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '4',
        gender: '남',
        value: 'tab4',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '5',
        gender: '여',
        value: 'tab5',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '6',
        gender: '여',
        value: 'tab6',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '7',
        gender: '남',
        value: 'tab7',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '8',
        gender: '남',
        value: 'tab8',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '9',
        gender: '여',
        value: 'tab9',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '10',
        gender: '남',
        value: 'tab10',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '11',
        gender: '여',
        value: 'tab11',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '12',
        gender: '남',
        value: 'tab12',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '13',
        gender: '남',
        value: 'tab13',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '14',
        gender: '여',
        value: 'tab14',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
      {
        name: '반짝빛나리반짝빛나리',
        age: '15',
        gender: '남',
        value: 'tab15',
        info: [
          '추가정보1',
          '추가정보2',
          '추가정보3',
          '추가정보4',
          '추가정보5',
          '추가정보6',
          '추가정보7',
          '추가정보8',
          '추가정보9',
        ],
      },
    ],
    checkboxList1: [
      { label: '사망후유', value: '0' },
      { label: '3대진단', value: '1' },
      { label: '입원일당', value: '2' },
      { label: '수술비', value: '3' },
      { label: '골절/화상', value: '4' },
      { label: '운전비용', value: '5' },
      { label: '치료비', value: '6' },
      { label: '기타', value: '7' },
     ],
    checkboxList2: [
      { label: '갱신', value: '1' },
      { label: '비갱신', value: '2' },
    ],
    tagList: ['암', '뇌', '심', '수술', '특정', '표적', '치료', '골절', '화상', '치매'],
  },
  mainBody: {
    agGridTable1: [
      {
        id: 1,
        locked: true,
        isDuplicate: true,
        productName: '무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험',
        coverageAmount: 500,
        premium: 450,
        availableAmount: 100,
        expiryPeriod: '80세',
        paymentPeriod: '20년',
        expectedUwResult: '인수',
        isHighlighted: true,
        canEditExpiry: true, 
        badge: ['독립', '갱신'],
      },
      {
        id: 2,
        locked: true,
        isDuplicate: true,
        productName: '무배당 메리츠 종합보험 무배당 메리츠 종합보험무배당 메리츠 종합보험무배당 메리츠 종합보험',
        coverageAmount: 300,
        premium: 350,
        availableAmount: 500,
        expiryPeriod: '100세',
        paymentPeriod: '전기납',
        expectedUwResult: '조건부인수',
        isHighlighted: false,
        canEditExpiry: false,
      },
      {
        id: 3,
        locked: false,
        isDuplicate: true,
        productName: 'KB손해보험 암보험KB손해보험 암보험KB손해보험 암보험KB손해보험 암보험',
        coverageAmount: 700,
        premium: 550,
        availableAmount: 1500,
        expiryPeriod: '90세',
        paymentPeriod: '15년',
        expectedUwResult: '인수',
        isHighlighted: false,
        canEditExpiry: true,
        badge: ['독립'],
      },
      {
        id: 4,
        locked: false,
        isDuplicate: true,
        productName: '한화생명 의료실비보험',
        coverageAmount: 450,
        premium: 420,
        availableAmount: 900,
        expiryPeriod: '85세',
        paymentPeriod: '10년',
        expectedUwResult: '거절',
        isHighlighted: false,
        canEditExpiry: false,
        badge: ['갱신'],
      },
      {
        id: 5,
        locked: false,
        isDuplicate: true,
        productName: '롯데생명 종신보험',
        coverageAmount: 100,
        premium: 750,
        availableAmount: 200,
        expiryPeriod: '100세',
        paymentPeriod: '전기납',
        expectedUwResult: '조건부인수',
        isHighlighted: false,
        canEditExpiry: true,
      },
      {
        id: 6,
        locked: false,
        isDuplicate: true,
        productName: '현대생명 정기보험',
        coverageAmount: 600,
        premium: 480,
        availableAmount: 1200,
        expiryPeriod: '80세',
        paymentPeriod: '20년',
        expectedUwResult: '인수',
        isHighlighted: false,
        canEditExpiry: false,
      },
      {
        id: 7,
        locked: false,
        isDuplicate: true,
        productName: 'AXA손해보험 질병보험',
        coverageAmount: 550,
        premium: 500,
        availableAmount: 1100,
        expiryPeriod: '75세',
        paymentPeriod: '15년',
        expectedUwResult: '조건부인수',
        isHighlighted: false,
        canEditExpiry: true,
      },
      {
        id: 8,
        locked: false,
        isDuplicate: true,
        productName: '삼성생명 어린이보험',
        coverageAmount: 250,
        premium: 280,
        availableAmount: 400,
        expiryPeriod: '30세',
        paymentPeriod: '12년',
        expectedUwResult: '인수',
        isHighlighted: false,
        canEditExpiry: false,
      },
      {
        id: 9,
        locked: false,
        isDuplicate: true,
        productName: '교보생명 장기요양보험',
        coverageAmount: 800,
        premium: 650,
        availableAmount: 1600,
        expiryPeriod: '100세',
        paymentPeriod: '20년',
        expectedUwResult: '인수',
        isHighlighted: false,
        canEditExpiry: true,
      },
      {
        id: 10,
        locked: false,
        isDuplicate: true,
        productName: '신한생명 변액보험',
        coverageAmount: 900,
        premium: 700,
        availableAmount: 1800,
        expiryPeriod: '80세',
        paymentPeriod: '15년',
        expectedUwResult: '거절',
        isHighlighted: false,
        canEditExpiry: false,
      },
      {
        id: 11,
        locked: false,
        isDuplicate: true,
        productName: 'DB손해보험 특정질병보험',
        coverageAmount: 350,
        premium: 380,
        availableAmount: 700,
        expiryPeriod: '65세',
        paymentPeriod: '10년',
        expectedUwResult: '조건부인수',
        isHighlighted: false,
        canEditExpiry: true,
      },
      {
        id: 12,
        locked: false,
        isDuplicate: true,
        productName: '우리생명 연금보험',
        coverageAmount: 1200,
        premium: 850,
        availableAmount: 2500,
        expiryPeriod: '100세',
        paymentPeriod: '전기납',
        expectedUwResult: '인수',
        isHighlighted: false,
        canEditExpiry: false,
      },
      {
        id: 13,
        locked: false,
        isDuplicate: true,
        productName: '동부화재 운전자보험',
        coverageAmount: 400,
        premium: 320,
        availableAmount: 800,
        expiryPeriod: '75세',
        paymentPeriod: '20년',
        expectedUwResult: '인수',
        isHighlighted: false,
        canEditExpiry: true,
      },
      {
        id: 14,
        locked: false,
        isDuplicate: true,
        productName: '미래에셋생명 저축보험',
        coverageAmount: 750,
        premium: 600,
        availableAmount: 1500,
        expiryPeriod: '85세',
        paymentPeriod: '15년',
        expectedUwResult: '거절',
        isHighlighted: false,
        canEditExpiry: false,
      },
      {
        id: 15,
        locked: false,
        isDuplicate: true,
        productName: '하나생명 여행보험',
        coverageAmount: 200,
        premium: 250,
        availableAmount: 300,
        expiryPeriod: '80세',
        paymentPeriod: '1년',
        expectedUwResult: '인수',
        isHighlighted: false,
        canEditExpiry: true,
      },
    ],
  },
  taskState:[
    { id: 1, status: '정상', label: '누적' },
    { id: 2, status: '경고', label: '중복' },
    { id: 3, status: '중지', label: '직업' },
    { id: 4, status: '정상', label: '기타' },
  ],
  aside: {
    simpleContractInfo: {
      date: '2024-05-01',
      polName: '홍길동',
      insName: '홍길동',
      insAge: '32',
      insGender: '남',
      insGrade: '1급',
      info: ['100세만기', '20년납입', '월납', '20년갱신', '1형(일반고지형)'],
      quoteExpiryDate: '2024-06-30',
      insuranceAgeDate: '2024-05-01',
      consentEndDate: '2024-06-30',
      note: '알릴사항 비대상',
    },
  },
}


