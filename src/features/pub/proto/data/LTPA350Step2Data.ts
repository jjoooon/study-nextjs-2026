
// LTPA350Step2Data 타입 정의
export interface LTPA350Step2DataType {
  tabList: Array<{
    name: string;
    age: string | number;
    gender: string;
    value: string;
    error: boolean;
    info: string[];
  }>;
  agGridTable1: Array<{
    id: number;

    field1: string;
    field2: boolean;
    field3: number;
    field3Required: boolean; // 필수 여부 추가
    field4: number;
    field5: string;
    field6: string;
    field7: number;
    field8: string;
    field9: boolean;

    locked?: boolean; // 잠금 여부 추가
    isHighlighted: boolean;
    selected?: boolean;
    badge?: string[]; 
  }>;
}
export const LTPA350Step2Data: LTPA350Step2DataType = {
  tabList: [
    {
      name: '홍길동',
      age: '1',
      gender: '여',
      value: 'tab1',
      error: true,
      info: [
        '추가정보1',
        '추가정보2',
        '추가정보3',
        '추가정보4',
        '추가정보5',
      ],
    },
    {
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: [
        '추가정보1',
        '추가정보2',
        '추가정보3',
      ],
    },
    {
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: [
        '추가정보1',
        '추가정보2',
      ],
    },
  ],
  agGridTable1: [
    {
      id: 1,
      field1: '무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험',
      field2: true,
      field3: 500,
      field3Required: true, // 필수 여부 설정
      field4: 450,
      field5: '80세',
      field6: '20년',
      field7: 100,
      field8: '인수',
      field9: true,

      locked: true,
      isHighlighted: true,
      badge: ['독립', '갱신'],
    },
    {
      id: 2,
      field1: '무배당 KB손해보험 암보험',
      field2: true,
      field3: 300,
      field3Required: false,
      field4: 280,
      field5: '100세',
      field6: '30년',
      field7: 80,
      field8: '인수',
      field9: true,

      locked: false,
      isHighlighted: false,
      badge: ['갱신'],
    },
    {
      id: 3,
      field1: '무배당 현대해상 3대질병보험',
      field2: false,
      field3: 400,
      field3Required: false,
      field4: 380,
      field5: '90세',
      field6: '25년',
      field7: 120,
      field8: '인수',
      field9: true,
      locked: false,
      isHighlighted: false,
      badge: ['독립'],
    },
  ],
}

export interface LTPA350Step2DataType_2 {
  tabList: Array<{
    name: string;
    age: string | number;
    gender: string;
    value: string;
    error: boolean;
    info: string[];
  }>;
  agGridTable1: Array<{
    id: number;

    field1: string;
    field2: boolean;
    field3: number;
    field4: number;
    field5: string;
    field6: string;
    field7: number;
    field8: string;
    field9: boolean;

    locked?: boolean; // 잠금 여부 추가
    isHighlighted: boolean;
    selected?: boolean;
    badge?: string[]; 
  }>;
}
export const LTPA350Step2Data_2: LTPA350Step2DataType_2 = {
  tabList: [
    {
      name: '홍길동',
      age: '1',
      gender: '여',
      value: 'tab1',
      error: true,
      info: [
        '추가정보1',
        '추가정보2',
        '추가정보3',
        '추가정보4',
        '추가정보5',
      ],
    },
    {
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: [
        '추가정보1',
        '추가정보2',
        '추가정보3',
      ],
    },
    {
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: [
        '추가정보1',
        '추가정보2',
      ],
    },
  ],
  agGridTable1: [
    {
      id: 1,
      field1: '무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험',
      field2: true,
      field3: 500,
      field4: 450,
      field5: '80세',
      field6: '20년',
      field7: 100,
      field8: '인수',
      field9: true,

      locked: true,
      
      isHighlighted: true,
      badge: ['독립', '갱신'],
    },
    {
      id: 2,
      field1: '무배당 KB손해보험 암보험',
      field2: true,
      field3: 300,
      field4: 280,
      field5: '100세',
      field6: '30년',
      field7: 80,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: ['갱신'],
    },
    {
      id: 3,
      field1: '무배당 현대해상 3대질병보험',
      field2: false,
      field3: 400,
      field4: 380,
      field5: '90세',
      field6: '25년',
      field7: 120,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: ['독립'],
    },
    {
      id: 4,
      field1: '무배당 롯데손해보험 입원일당',
      field2: true,
      field3: 250,
      field4: 230,
      field5: '85세',
      field6: '15년',
      field7: 50,
      field8: '조건부인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: [],
    },
    {
      id: 5,
      field1: '무배당 삼성화재 수술비보험',
      field2: false,
      field3: 600,
      field4: 550,
      field5: '100세',
      field6: '30년',
      field7: 150,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: true,
      badge: ['갱신'],
    },
    {
      id: 6,
      field1: '무배당 AXA손해보험 종합건강보험',
      field2: true,
      field3: 550,
      field4: 500,
      field5: '80세',
      field6: '20년',
      field7: 180,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: ['독립', '갱신'],
    },
    {
      id: 7,
      field1: '무배당 메트라이프 간병보험',
      field2: false,
      field3: 350,
      field4: 320,
      field5: '90세',
      field6: '25년',
      field7: 95,
      field8: '거절',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: [],
    },
    {
      id: 8,
      field1: '무배당 미래에셋생명 질병보험',
      field2: true,
      field3: 450,
      field4: 420,
      field5: '100세',
      field6: '30년',
      field7: 140,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: ['갱신'],
    },
    {
      id: 9,
      field1: '무배당 신한생명 골절보험',
      field2: false,
      field3: 200,
      field4: 180,
      field5: '85세',
      field6: '15년',
      field7: 35,
      field8: '조건부인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: [],
    },
    {
      id: 10,
      field1: '무배당 한화생명 치매보험',
      field2: true,
      field3: 500,
      field4: 460,
      field5: '100세',
      field6: '35년',
      field7: 200,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: ['독립'],
    },
    {
      id: 11,
      field1: '무배당 교보생명 뇌질환보험',
      field2: false,
      field3: 600,
      field4: 570,
      field5: '90세',
      field6: '25년',
      field7: 220,
      field8: '인수',
      field9: true,
      locked: false,
      isHighlighted: false,
      badge: ['갱신'],
    },
    {
      id: 12,
      field1: '무배당 우리손해보험 화상보험',
      field2: true,
      field3: 300,
      field4: 270,
      field5: '80세',
      field6: '20년',
      field7: 60,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: [],
    },
    {
      id: 13,
      field1: '무배당 DB손해보험 운전비용보험',
      field2: false,
      field3: 250,
      field4: 220,
      field5: '75세',
      field6: '15년',
      field7: 45,
      field8: '조건부인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: [],
    },
    {
      id: 14,
      field1: '무배당 삼井sumitomo실손의료',
      field2: true,
      field3: 480,
      field4: 440,
      field5: '95세',
      field6: '30년',
      field7: 160,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: ['독립', '갱신'],
    },
    {
      id: 15,
      field1: '무배당 푸본손해보험 치료비',
      field2: false,
      field3: 350,
      field4: 310,
      field5: '85세',
      field6: '20년',
      field7: 85,
      field8: '거절',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: [],
    },
    {
      id: 16,
      field1: '무배당 태양생명 특정질환보험',
      field2: true,
      field3: 520,
      field4: 480,
      field5: '100세',
      field6: '35년',
      field7: 190,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: true,
      badge: ['갱신'],
    },
    {
      id: 17,
      field1: '무배당 동부화재 종합보험',
      field2: false,
      field3: 400,
      field4: 370,
      field5: '90세',
      field6: '25년',
      field7: 130,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: ['독립'],
    },
    {
      id: 18,
      field1: '무배당 페낙손해보험 위험보장',
      field2: true,
      field3: 280,
      field4: 250,
      field5: '80세',
      field6: '18년',
      field7: 70,
      field8: '조건부인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: [],
    },
    {
      id: 19,
      field1: '무배당 안내생명 장기요양보험',
      field2: false,
      field3: 420,
      field4: 390,
      field5: '100세',
      field6: '30년',
      field7: 170,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: ['갱신'],
    },
    {
      id: 20,
      field1: '무배당 삼성생명 통합보험',
      field2: true,
      field3: 550,
      field4: 510,
      field5: '95세',
      field6: '28년',
      field7: 210,
      field8: '인수',
      field9: false,
      locked: false,
      isHighlighted: false,
      badge: ['독립', '갱신'],
    },
  ],
}
