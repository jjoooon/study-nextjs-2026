export interface Ltpa350Step5DataType {
  // 만기수익자
  ContractorInfo: {
    matBnf: string;
    postAddr: string;
    replCont: string;
    sign: string;
    deliveryMethod: string;
    replacementCont: string;
    benChange: string;
    taxTarget: string;
    bOCheck: string;
    receiptDate: string;
    autoDebitCancel: string;
    retentionMobPay: string;
    disabilityConv: string;
    adultGuardian: string;
  };
  InsuredPerson: Array<{
    name: string;
    juminNumber: string;
    age: number;
    gender: string;
    ageStandardDate: string;
    ageDDay: string;
    designAgreeDate: string;
    designAgreeDDay: string;
    jobCode: string;
    jobName: string;
    jobGrade: string;
    driveType: string;
    motorcycle: string;
    relationWithContractor: string;
    actualLossSimulDesignNo: string;
    premium: number;
    isDiscountApplied: string;
  }>;
  Policyholder: {
    name: string;
    juminNumber: string;
    infoAcquisitionPath: string;
    addresses: string;
    workAddress: string;
    contact: string;
    isBusinessOwner: string;
    email: string;
    electronicNoticeAgree: string;
    taxFreeType: string;
    designAmount: number;
    remainingLimit: number;
  };
}
export const Ltpa350Step5Data: Ltpa350Step5DataType = {
  ContractorInfo: {
    matBnf: '2026-03-04', // 만기수익자
    postAddr: '2026-01-30', // 우편물수령처
    replCont: '2046-03-04', // 전자적 안내동의
    sign: '80', // 서명방법
    deliveryMethod: '10', // 증권전달방법
    replacementCont: '월납', // 승환계약여부
    benChange: '3', // 수익자 지정변경
    taxTarget: '1형', // 조세규정확인대상
    bOCheck: '1형', // 실소유자 확인
    receiptDate: '1형', // 영수일자
    autoDebitCancel: '1형', // 당월해지 자동이체 신청
    retentionMobPay: '1형', // 해지 방지 휴대폰 결제
    disabilityConv: '1형', // 장애인보험 전환
    adultGuardian: '1형', // 성년후견인지정여부
  },

  InsuredPerson: [
    {
      name: '김한화', // 피보험자 이름
      juminNumber: '900101-1******', // 피보험자 생년월일
      age: 36, // 피보험자 나이
      gender: '남', // 피보험자 성별
      ageStandardDate: '2026-03-09', // 상령일
      ageDDay: 'D-31', // 상령일 D-Day
      designAgreeDate: '2026-03-09', // 설계동의일
      designAgreeDDay: 'D-20', // 설계동의 D-Day
      jobCode: '52111', // 직업코드
      jobName: '소규모 상점 경영 및 일선 관리 종사원', // 직업명
      jobGrade: '2급', // 직업급수
      driveType: '자가용', // 운전형태 (예시: 자가용, 영업용, 미운전)
      motorcycle: '운전안함', // 이륜차 (예시: 사용, 미사용)
      relationWithReplacementContractor: '본인', // 계약자와의 관계
      actualLossSimulDesignNo: 'LA260219319244', // (실손)동시설계 번호
      premium: 33301, // 보험료
      isDiscountApplied: 'Y', // 할인적용 여부
    },
    {
      name: '이영희',
      juminNumber: '880520-2******',
      age: 38,
      gender: '여',
      ageStandardDate: '2026-05-20',
      ageDDay: 'D-68',
      designAgreeDate: '2026-03-10',
      designAgreeDDay: 'D-19',
      jobCode: '02111',
      jobName: '일반 사무 행정 전문가',
      jobGrade: '1급',
      driveType: '자가용',
      motorcycle: '운전안함',
      relationWithContractor: '배우자',
      actualLossSimulDesignNo: 'LA260310452133',
      premium: 28500,
      isDiscountApplied: 'N',
    },
    {
      name: '박지성',
      juminNumber: '021115-3******',
      age: 24,
      gender: '남',
      ageStandardDate: '2026-11-15',
      ageDDay: 'D-247',
      designAgreeDate: '2026-03-12',
      designAgreeDDay: 'D-17',
      jobCode: '74112',
      jobName: '전기 및 전자 설비 설치원',
      jobGrade: '3급',
      driveType: '비운전',
      motorcycle: '운전함',
      relationWithContractor: '자녀',
      actualLossSimulDesignNo: 'LA260312987412',
      premium: 45200,
      isDiscountApplied: 'Y',
    },
    {
      name: '최수지',
      juminNumber: '820710-2******',
      age: 44,
      gender: '여',
      ageStandardDate: '2026-07-10',
      ageDDay: 'D-119',
      designAgreeDate: '2026-03-13',
      designAgreeDDay: 'D-16',
      jobCode: '53121',
      jobName: '음식점 경영 및 관리자',
      jobGrade: '2급',
      driveType: '영업용', // 배송 업무 포함
      motorcycle: '운전안함',
      relationWithContractor: '본인',
      actualLossSimulDesignNo: 'LA260313112233',
      premium: 39800,
      isDiscountApplied: 'Y',
    },
  ],

  Policyholder: {
    name: '김한화', // 예시: 피보험자와 동일인일 경우
    juminNumber: '900101-1******', // 예시: 피보험자와 동일인일 경우
    infoAcquisitionPath: '고객직접선택', // 개인정보취득경로
    addresses: '경기도 부천시 원미구 역곡동', // 자택(소재지)
    workAddress: '경상남도 진주시 (하대동)', // 직장 주소
    contact: '010-1234-5678', // 연락처
    isBusinessOwner: 'Y', // 개인사업자
    email: 'qwer@hwgi.kr', // 이메일
    electronicNoticeAgree: 'Y', // 전자적안내동의
    taxFreeType: '월납식비과세', // 보험차익비과세
    designAmount: 33301, // 설계금액
    remainingLimit: 100000000, // 잔여한도 (예시값)
  },
};
