/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

export type DummyDataType = {
  id: number;
  isChecked?: boolean;
  isStandard?: {
    group: boolean;
    edit: boolean;
  }; // [isStandard, 기준이 되는 필드명]
  num?: number | null | undefined;
  title?: string | number | boolean;
  field1?: string | number | boolean;
  titleDetail?: {
    title: string;
    description: string;
    info: string[];
  };
  insuredAmount?: string | number | boolean | string[];
  isSelectedInsuredAmount?: boolean;
  rowCopy?: string | number | boolean;

  field2?: string | number | boolean;
  field4?: string | number | boolean;
  field5?: string | number | boolean;
  field6?: string | number | boolean;
  field7?: string | number | boolean;
  field8?: string | number | boolean;

  isEditedtitle?: boolean;
  isEditedInsuredAmount?: boolean;
  isEditedrowCopy?: boolean;

  isEditedField2?: boolean;
  isEditedField4?: boolean;
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

export const dummyData: DummyDataType[] = [
  {
    id: 1,
    num: 1,
    filePath: ['set-1'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },
    title:
      '무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험 무배당 삼성화재 실손의료보험무배당 삼성화재 실손의료보험',
    field2: true,
    insuredAmount: '5000',
    isSelectedInsuredAmount: false,
    field4: 4500,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 1000,
    field8: '인수가능',
    rowCopy: true,
    titleDetail: {
      title: '담보명 특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: true,
    isHighlighted: true,
    badge: ['독립', '갱신', '배타', '미래'],
    isError: false,
  },
  {
    id: 2,
    num: 2,
    filePath: ['set-2'],
    isChecked: false,
    isStandard: {
      group: false,
      edit: false,
    },
    title: '무배당 KB손해보험 암보험',
    field2: true,
    insuredAmount: '3400',
    isSelectedInsuredAmount: false,
    field4: 2800,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 8000,
    field8: '인수불가',
    rowCopy: true,
    titleDetail: {
      title: '담보명 1특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,

    badge: ['갱신'],
    isError: false,
  },
  {
    id: 3,
    num: 123,
    filePath: ['set-123'],
    isChecked: false,
    isStandard: {
      group: true,
      edit: false,
    },
    title: '유방암(수용체타입)진단비',
    field2: false,
    insuredAmount: '4400',
    isSelectedInsuredAmount: false,
    field4: 380,
    field5: '80세',
    isEditedField5: true,
    field6: '20년',
    isEditedField6: true,
    field7: 120,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,

    badge: ['독립'],
    isError: false,
  },
  {
    id: 4,
    num: null,
    filePath: ['set-123', 'set-123-1'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: true,
    },

    title: '유방암A타입진단비(호르몬수용체양성,HER2음성)',
    field2: false,
    insuredAmount: '4400',
    isSelectedInsuredAmount: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,

    badge: ['독립'],
    isError: false,
  },
  {
    id: 5,
    num: null,
    filePath: ['set-123', 'set-123-2'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: false,
    },

    title: '유방암B타입진단비(호르몬수용체양성,HER2양성)',
    field2: false,
    insuredAmount: '4400',
    isSelectedInsuredAmount: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,

    badge: ['독립'],
    isError: false,
  },
  {
    id: 6,
    num: 230,
    filePath: ['set-230'],
    isChecked: false,
    isStandard: {
      group: true,
      edit: false,
    },

    title: '주요순환계질환Ⅰ특정치료비(요양병원제외,각연간1회한)',
    field2: false,
    insuredAmount: '5460',
    isSelectedInsuredAmount: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,

    badge: ['독립'],
    isError: false,
  },
  {
    id: 7,
    num: null,
    filePath: ['set-230', 'set-230-1'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: true,
    },
    title: '주요순환계질환Ⅰ특정치료비(수술(혈전제거술제외))(요양병원제외,－연간1회한)',
    field2: false,
    insuredAmount: '1천만원',
    isSelectedInsuredAmount: true,
    field4: '380',
    field5: '80세',
    isEditedField5: true,
    field6: '20년',
    isEditedField6: true,
    field7: 120,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,

    badge: ['독립'],
    isError: false,
  },
  {
    id: 8,
    num: null,
    filePath: ['set-230', 'set-230-2'],
    isChecked: true,
    isStandard: {
      group: true,
      edit: false,
    },

    title: '주요순환계질환Ⅰ특정치료비(혈전제거술)(요양병원제외,연간1회한)',
    field2: false,
    insuredAmount: '4400',
    isSelectedInsuredAmount: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,

    badge: ['독립'],
    isError: false,
  },
  {
    id: 9,
    num: 231,
    filePath: ['set-231'],
    isChecked: false,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '무배당 현대해상 3대질병보험',
    field2: false,
    insuredAmount: '5460',
    isSelectedInsuredAmount: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,

    badge: ['독립'],
    isError: false,
  },
  {
    id: 10,
    num: null,
    filePath: ['set-231', 'set-231-1'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },
    title: '- 무배당 현대해상 3대질병보험',
    field2: false,
    insuredAmount: '1400',
    isSelectedInsuredAmount: false,
    field4: '380',
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,

    badge: ['독립'],
    isError: false,
  },
  {
    id: 11,
    num: null,
    filePath: ['set-231', 'set-231-2'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '- 무배당 현대해상 3대질병보험',
    field2: false,
    insuredAmount: '4400',
    isSelectedInsuredAmount: false,
    field4: 380,
    field5: '80세',
    isEditedField5: false,
    field6: '20년',
    isEditedField6: false,
    field7: 120,
    field8: '조건부인수',
    rowCopy: true,
    titleDetail: {
      title: '담보명 2특정유사람진단후특정치료비(암전문의료기관(상급종합병원등))(진단후 10년, 연간1회한)(CLA70874)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,

    badge: ['독립'],
    isError: false,
  },
];
