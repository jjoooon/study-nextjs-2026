/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
export type DummyDataType = {
  id: number;
  isChecked?: boolean;
  field1?: string | number | boolean;
  insuredAmount?: string | number | boolean;
  field3?: string | number | boolean;
  field4?: string | number | boolean;
  field5?: string | number | boolean;
  field6?: string | number | boolean;
  field7?: string | number | boolean;
  field8?: string | number | boolean;
  [key: string]: unknown;
};

export const dummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field1: '건물(실손)',
    insuredAmount: 2000,
    field3: 1333,
    field4: '일체',
    field5: '일체',
    field6: '건물내',
    field7: '아니오',
    field8: '가연성',

    isEditedField6: true,
    isEditedField7: true,
    isEditedField8: true,
  },
];

export type DummyData2Type = {
  id: number;
  isChecked?: boolean;
  isStandard?: {
    group: boolean;
    edit: boolean;
  }; // [isStandard, 기준이 되는 필드명]
  num?: number | null | undefined;
  title?: string | number | boolean;
  titleDetail?: {
    title: string;
    description: string;
    info: string[];
  };
  insuredAmount?: string | number | boolean | string[]; //가입금액
  isSelectedInsuredAmount?: boolean;
  rowCopy?: string | number | boolean;

  field1?: string | number | boolean;
  field2?: string | number | boolean;
  field3?: string | number | boolean;
  field4?: string | number | boolean;
  field5?: string | number | boolean;
  field6?: string | number | boolean;
  field7?: string | number | boolean;
  field8?: string | number | boolean;

  isEditedtitle?: boolean;
  isEditedInsuredAmount?: boolean;
  isEditedrowCopy?: boolean;

  isEditedField2?: boolean;
  isEditedinsuredAmount?: boolean;
  isEditedField5?: boolean;
  isEditedField6?: boolean;
  isEditedField7?: boolean;
  isEditedField8?: boolean;

  filePath?: string[];
  locked?: boolean;
  isError?: boolean;
  badge?: string[];
  [key: string]: unknown;
};
export const dummyData2: DummyData2Type[] = [
  {
    id: 1,
    isChecked: true,
    field1: '배상책임',
    title: '보통약관(화재배상책임)',
    field3: false,
    insuredAmount: '2100',
    isEditedInsuredAmount: true,
    field5: '20년',
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 2300,
    isEditedField7: true,
    titleDetail: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
  },
  {
    id: 2,
    isChecked: false,
    field1: '배상책임',
    title:
      '보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)',
    field3: true,
    insuredAmount: '100',
    isEditedInsuredAmount: true,
    field5: '20년',
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 0,
    isEditedField7: true,
    titleDetail: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
  },
  {
    id: 3,
    isChecked: false,
    field1: '배상책임',
    title: '보통약관(화재배상책임)',
    field3: false,
    insuredAmount: '4100',
    isEditedInsuredAmount: true,
    field5: '20년',
    isEditedField5: false,
    field6: '전기납',
    isEditedField6: false,
    field7: 0,
    isEditedField7: false,
    titleDetail: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
  },
  {
    id: 4,
    isChecked: true,
    field1: '화재기타',
    title: '보통약관(화재배상책임, 무과실)',
    field3: true,
    insuredAmount: 100,
    isEditedInsuredAmount: true,
    field5: '20년',
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 0,
    isEditedField7: true,
    titleDetail: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
  },
];
