// Ltpa350Step2Data 타입 정의
export interface Ltpa350Step2DataType {
  tabList: Array<{
    id: string | number;
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
    isDuplicate?: boolean;
    displayNo?: number;
  }>;
}
export const Ltpa350Step2Data: Ltpa350Step2DataType = {
  tabList: [
    {
      id: 1,
      name: '홍길동',
      age: '1',
      gender: '여',
      value: 'tab1',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
    },
    {
      id: 2,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 3,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
    },
    {
      id: 4,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 5,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
    },
    {
      id: 6,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 7,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
    },
    {
      id: 8,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 9,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
    },
    {
      id: 10,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 11,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
    },
    {
      id: 12,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 13,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
    },
    {
      id: 14,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 15,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
    },
    {
      id: 16,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 17,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
    },
    {
      id: 18,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 19,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
    },
    {
      id: 20,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 21,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
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
};

export interface Ltpa350Step2DataType2 {
  tabList: Array<{
    id: string | number;
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
export const Ltpa350Step2Data2: Ltpa350Step2DataType2 = {
  tabList: [
    {
      id: 1,
      name: '홍길동',
      age: '1',
      gender: '여',
      value: 'tab1',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
    },
    {
      id: 2,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 3,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
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
  ],
};



export interface Ltpa350Step2DataType3 {
  tabList: Array<{
    id: string | number;
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
export const Ltpa350Step2Data3: Ltpa350Step2DataType3 = {
  tabList: [
    {
      id: 1,
      name: '홍길동',
      age: '1',
      gender: '여',
      value: 'tab1',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
    },
    {
      id: 2,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 3,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
    },
  ],
  agGridTable1: [
    {
      id: 1,
      field1: '건물',
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
  ],
};



export interface Ltpa350Step2DataType4 {
  tabList: Array<{
    id: string | number;
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
export const Ltpa350Step2Data4: Ltpa350Step2DataType4 = {
  tabList: [
    {
      id: 1,
      name: '홍길동',
      age: '1',
      gender: '여',
      value: 'tab1',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
    },
    {
      id: 2,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 3,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
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
  ],
};


export interface Ltpa350Step2DataType5 {
  tabList: Array<{
    id: string | number;
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
export const Ltpa350Step2Data5: Ltpa350Step2DataType5 = {
  tabList: [
    {
      id: 1,
      name: '홍길동',
      age: '1',
      gender: '여',
      value: 'tab1',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
    },
    {
      id: 2,
      name: '반짝빛나리반짝빛나리',
      age: '2',
      gender: '남',
      value: 'tab2',
      error: true,
      info: ['추가정보1', '추가정보2', '추가정보3'],
    },
    {
      id: 3,
      name: '반짝빛나리반짝빛나리',
      age: '3',
      gender: '여',
      value: 'tab3',
      error: false,
      info: ['추가정보1', '추가정보2'],
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
  ],
};
