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
  titleDetail?: {
    title: string;
    description: string;
    info: string[];
  };
  insuredAmount?: string | number | boolean | string[];
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
  isEditedField4?: boolean;
  isEditedField5?: boolean;
  isEditedField6?: boolean;
  isEditedField7?: boolean;
  isEditedField8?: boolean;

  filePath?: string[];
  locked?: boolean; //checked + disabled로 체크된상태로 고정
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
    title: '보통약관(상해사망(간편))',
    field2: true,
    insuredAmount: 5000,
    isSelectedInsuredAmount: false,
    field4: 5000,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 700,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '보통약관(상해사망(간편))',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: true,
    isHighlighted: true,
    badge: [],
    isError: false,
  },
  {
    id: 2,
    num: 2,
    filePath: ['set-2'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },
    title: '보험료납입면제대상보장(5대사유)(간편)',
    field2: true,
    insuredAmount: 10,
    isSelectedInsuredAmount: false,
    field4: 10,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 279,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '보험료납입면제대상보장(5대사유)(간편)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: true,
    badge: [],
    isError: false,
  },
  {
    id: 3,
    num: 3,
    filePath: ['set-3'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },
    title: '보장보험료50%납입지원II(4대유사암)',
    field2: false,
    insuredAmount: 1,
    isSelectedInsuredAmount: false,
    field4: 1,
    field5: '20세만기',
    isEditedField5: true,
    field6: '전기납',
    isEditedField6: true,
    field7: 942,
    field8: '조건부인수',
    rowCopy: false,
    titleDetail: {
      title: '보장보험료50%납입지원II(4대유사암)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    badge: [],
    isError: false,
  },
  {
    id: 4,
    num: 131,
    filePath: ['set-131'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '유방암(수용체타입)진단비',
    field2: false,
    insuredAmount: 8000,
    isSelectedInsuredAmount: false,
    field4: 8000,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 5780,
    field8: '조건부인수',
    rowCopy: false,
    titleDetail: {
      title: '유방암(수용체타입)진단비',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: [],
    isError: false,
  },
  {
    id: 5,
    num: null,
    filePath: ['set-131', 'set-131-1'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '유방암A타입진단비(호르몬수용체양성,HER2양성)',
    field2: false,
    insuredAmount: 2000,
    isSelectedInsuredAmount: false,
    field4: 2000,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 4140,
    field8: '조건부인수',
    rowCopy: false,
    titleDetail: {
      title: '유방암A타입진단비(호르몬수용체양성,HER2양성)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: [],
    isError: false,
  },
  {
    id: 6,
    num: null,
    filePath: ['set-131', 'set-131-2'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '유방암B타입진단비(호르몬수용체양성,HER2양성)',
    field2: false,
    insuredAmount: 2000,
    isSelectedInsuredAmount: false,
    field4: 2000,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 700,
    field8: '조건부인수',
    rowCopy: false,
    titleDetail: {
      title: '유방암B타입진단비(호르몬수용체양성,HER2양성)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: [],
    isError: false,
  },
  {
    id: 7,
    num: null,
    filePath: ['set-131', 'set-131-3'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '유방암C타입진단비(HER2양성)',
    field2: false,
    insuredAmount: 2000,
    isSelectedInsuredAmount: false,
    field4: 2000,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 380,
    field8: '조건부인수',
    rowCopy: false,
    titleDetail: {
      title: '유방암C타입진단비(HER2양성)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: [],
    isError: false,
  },
  {
    id: 8,
    num: null,
    filePath: ['set-131', 'set-131-4'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '유방암D타입진단비(삼중음성)',
    field2: false,
    insuredAmount: 2000,
    isSelectedInsuredAmount: false,
    field4: 2000,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 560,
    field8: '조건부인수',
    rowCopy: false,
    titleDetail: {
      title: '유방암D타입진단비(삼중음성)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: [],
    isError: false,
  },

  {
    id: 9,
    num: 322,
    filePath: ['set-322'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '주요순환계질환I특정치료비(요양병원제외,각연간1회한)',
    field2: false,
    insuredAmount: 3500,
    isSelectedInsuredAmount: false,
    field4: 3500,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 5305,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '주요순환계질환I특정치료비(요양병원제외,각연간1회한)',
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
    filePath: ['set-322', 'set-322-1'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '주요순환계질환I특정치료비(수술(혈전제거술제외))(요양병원제외,각연간1회한)',
    field2: false,
    insuredAmount: 1000,
    isSelectedInsuredAmount: false,
    field4: 1000,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 4140,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '주요순환계질환I특정치료비(수술(혈전제거술제외))(요양병원제외,각연간1회한)',
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
    filePath: ['set-322', 'set-322-2'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '주요순환계질환I특정치료비(혈전제거술)(요양병원제외,연간1회한)',
    field2: false,
    insuredAmount: 1000,
    isSelectedInsuredAmount: false,
    field4: 1000,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 180,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '주요순환계질환I특정치료비(혈전제거술)(요양병원제외,연간1회한)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 12,
    num: null,
    filePath: ['set-322', 'set-322-3'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '주요순환계질환I특정치료비(혈전용해치료)(요양병원제외,연간1회한)',
    field2: false,
    insuredAmount: 1000,
    isSelectedInsuredAmount: false,
    field4: 1000,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 300,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '주요순환계질환I특정치료비(혈전용해치료)(요양병원제외,연간1회한)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 13,
    num: null,
    filePath: ['set-322', 'set-322-4'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '주요순환계질환I특정치료비(중환자실치료)(요양병원제외,연간1회한)',
    field2: false,
    insuredAmount: 500,
    isSelectedInsuredAmount: false,
    field4: 500,
    field5: '100세만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 1785,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '주요순환계질환I특정치료비(중환자실치료)(요양병원제외,연간1회한)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: ['독립'],
    isError: false,
  },
  {
    id: 14,
    num: 364,
    filePath: ['set-364'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },
    title: '난임진단비(기혼자용)(갱신형)',
    field2: false,
    insuredAmount: 20,
    isSelectedInsuredAmount: false,
    field4: 20,
    field5: '05년만기',
    isEditedField5: false,
    field6: '전기납',
    isEditedField6: false,
    field7: 434,
    field8: '인수가능',
    rowCopy: true,
    titleDetail: {
      title: '난임진단비(기혼자용)(갱신형)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },

    locked: false,
    badge: ['갱신'],
    isError: false,
  },

  {
    id: 15,
    num: 365,
    filePath: ['set-365'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '난임치료비II(급여인공수정,3회한,기혼자용)(갱신형)',
    field2: false,
    insuredAmount: 150,
    isSelectedInsuredAmount: false,
    field4: 150,
    field5: '05년만기',
    isEditedField5: false,
    field6: '20년납',
    isEditedField6: false,
    field7: 530,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '난임치료비II(급여인공수정,3회한,기혼자용)(갱신형)',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: ['갱신'],
    isError: false,
  },
  {
    id: 16,
    num: null,
    filePath: ['set-365', 'set-365-1'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '난임치료비II(급여인공수정치료비(첫번째)(갱신형))',
    field2: false,
    insuredAmount: 50,
    isSelectedInsuredAmount: false,
    field4: 50,
    field5: '05년만기',
    isEditedField5: false,
    field6: '전기납',
    isEditedField6: false,
    field7: 330,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '난임치료비II(급여인공수정치료비(첫번째)(갱신형))',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: ['갱신'],
    isError: false,
  },
  {
    id: 17,
    num: null,
    filePath: ['set-365', 'set-365-2'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '난임치료비II(급여인공수정치료비(두번째)(갱신형))',
    field2: false,
    insuredAmount: 50,
    isSelectedInsuredAmount: false,
    field4: 50,
    field5: '05년만기',
    isEditedField5: false,
    field6: '전기납',
    isEditedField6: false,
    field7: 150,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '난임치료비II(급여인공수정치료비(두번째)(갱신형))',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: ['갱신'],
    isError: false,
  },
  {
    id: 18,
    num: null,
    filePath: ['set-365', 'set-365-3'],
    isChecked: true,
    isStandard: {
      group: false,
      edit: false,
    },

    title: '난임치료비II(급여인공수정치료비(세번째)(갱신형))',
    field2: false,
    insuredAmount: 50,
    isSelectedInsuredAmount: false,
    field4: 50,
    field5: '05년만기',
    isEditedField5: false,
    field6: '전기납',
    isEditedField6: false,
    field7: 150,
    field8: '인수가능',
    rowCopy: false,
    titleDetail: {
      title: '난임치료비II(급여인공수정치료비(세번째)(갱신형))',
      description:
        '질병 또는 상해의 직접결과로써 안면부에 입원중 ”급여 안부창상봉합술(3cm이상)”를 받은 경우 또는 통원하여 “급여 안면부창상봉합술(3cm이상)”를 받은경우 보험가입금액 지급(입원 및 통원 각각 1일 1회에 한함)',
      info: ['가입단위:100만원', '플랜상품 가입금액 : 100만원~5,000만원'],
    },
    locked: false,
    badge: ['갱신'],
    isError: false,
  },
];
