'use client';

import * as React from 'react';
import { Grow } from '@atoms';
import LinkGo, { getStoryIframeUrl, getStoryUrl } from './Link';

type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;

type IARow = {
  No: string;
  dep1: string;
  dep2: string;
  dep3: string;
  id: string;
  subId: string;
  step: string;
  dep4: string;
  type: string;
  tab: string;
  dev: string;
  plan: string;
  pub: string;
};

const ROWS: IARow[] = [
  { "No": "1", "dep1": "차세대가입설계", "dep2": "공통", "dep3": "공통", "id": "LNICMZ99", "subId": "", "step": "", "dep4": "메세지내용", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이채우", "pub":"조현민" },
  { "No": "2", "dep1": "차세대가입설계", "dep2": "공통", "dep3": "공통", "id": "LNICMZ01", "subId": "", "step": "", "dep4": "문자메시지전송", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "3", "dep1": "차세대가입설계", "dep2": "공통", "dep3": "공통", "id": "LNICMZ02", "subId": "", "step": "", "dep4": "출력", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이채우", "pub":"조현민" },
  { "No": "4", "dep1": "차세대가입설계", "dep2": "공통", "dep3": "공통", "id": "LNIPLZ51", "subId": "", "step": "", "dep4": "가입설계검색", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이채우", "pub":"조현민" },
  { "No": "5", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "상품플랜설계", "id": "LNIPL010", "subId": "", "step": "상품플랜설계", "dep4": "상품 플랜 설계", "type": "화면", "tab": "탭", "dev": "신규", "plan": "안혜은", "pub":"조현민" },
  { "No": "6", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "상품플랜설계", "id": "LNIPLZ01", "subId": "", "step": "상품플랜", "dep4": "알릴사항", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "안혜은", "pub":"조현민" },
  { "No": "7", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "상품플랜설계", "id": "LNIPL010", "subId": "", "step": "추천설계", "dep4": "추천 설계", "type": "화면", "tab": "탭", "dev": "신규", "plan": "안혜은", "pub":"조현민" },
  { "No": "8", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "상품플랜설계", "id": "LNIPL010", "subId": "", "step": "추천설계", "dep4": "추천 설계", "type": "화면", "tab": "탭", "dev": "신규", "plan": "안혜은", "pub":"조현민" },
  { "No": "9", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "상품플랜설계", "id": "LNIPLZ02", "subId": "", "step": "추천설계", "dep4": "담보보기", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "안혜은", "pub":"조현민" },
  { "No": "10", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPL020", "subId": "LNIPL020_1", "step": "계약사항", "dep4": "계약사항", "type": "화면", "tab": "화면", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "11", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ03", "subId": "", "step": "꼭 확인해야 할 일", "dep4": "꼭 확인해야 할 일_누적초과", "type": "팝업", "tab": "탭", "dev": "신규", "plan": "이채우", "pub":"조현민" },
  { "No": "12", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ03", "subId": "", "step": "꼭 확인해야 할 일", "dep4": "꼭 확인해야 할 일_실손중복", "type": "팝업", "tab": "탭", "dev": "신규", "plan": "이채우", "pub":"조현민" },
  { "No": "13", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ03", "subId": "", "step": "꼭 확인해야 할 일", "dep4": "꼭 확인해야 할 일_직업상이 해소", "type": "팝업", "tab": "", "dev": "신규", "plan": "이채우", "pub":"조현민" },
  { "No": "14", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ03", "subId": "", "step": "꼭 확인해야 할 일", "dep4": "꼭 확인해야 할 일_예상UW결과", "type": "팝업", "tab": "", "dev": "신규", "plan": "이채우", "pub":"조현민" },
  { "No": "15", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "설계관리", "id": "LNIPLZ04", "subId": "", "step": "", "dep4": "해야 할 업무", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "17", "dep1": "차세대가입설계", "dep2": "고객", "dep3": "고객", "id": "LNICUZ01", "subId": "", "step": "고객", "dep4": "고객검색(영업가족고객)", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "18", "dep1": "차세대가입설계", "dep2": "고객", "dep3": "고객", "id": "LNICUZ02", "subId": "", "step": "고객", "dep4": "고객등록(영업가족고객)", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "19", "dep1": "차세대가입설계", "dep2": "공통", "dep3": "공통", "id": "LNIPLZ05", "subId": "", "step": "", "dep4": "메모입력", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이채우", "pub":"조현민" },
  { "No": "20", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ06", "subId": "", "step": "가입설계", "dep4": "동시가입설계상세", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "21", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ07", "subId": "", "step": "가입설계", "dep4": "담보내용상세", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "22", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ08", "subId": "", "step": "가입설계", "dep4": "청약포인트 상세", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "안혜은", "pub":"조현민" },
  { "No": "23", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "담보설계", "id": "LNIPL020", "subId": "LNIPL020_2", "step": "담보설계", "dep4": "담보설계", "type": "화면", "tab": "화면", "dev": "신규", "plan": "안혜은", "pub":"조현민" },
  { "No": "24", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ09", "subId": "LNIPL020_2", "step": "담보설계", "dep4": "비교설계", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "안혜은", "pub":"조현민" },
  { "No": "25", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ10", "subId": "", "step": "", "dep4": "동영상매뉴얼바로가기", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "28", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "담보설계", "id": "LNIPLZ11", "subId": "LNIPL020_2", "step": "담보설계", "dep4": "누적위험 합산제외 관리 화면", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "안혜은", "pub":"조현민" },
  { "No": "30", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ13", "subId": "LNIPL020_2", "step": "담보설계", "dep4": "나만의설계", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "31", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ14", "subId": "", "step": "", "dep4": "바로가기 설정", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "이채우", "pub":"조현민" },
  { "No": "32", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ15", "subId": "", "step": "", "dep4": "다른상품설계", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "안혜은", "pub":"조현민" },
  { "No": "36", "dep1": "차세대가입설계", "dep2": "인수지침/심사", "dep3": "인수지침", "id": "LNIUW010", "subId": "", "step": "", "dep4": "피보험자별 누적조회", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "37", "dep1": "차세대가입설계", "dep2": "인수지침/심사", "dep3": "인수지침", "id": "LNIUW020", "subId": "", "step": "", "dep4": "계약별 누적위험", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "38", "dep1": "차세대가입설계", "dep2": "인수지침/심사", "dep3": "인수지침", "id": "LNIPLZ18", "subId": "", "step": "", "dep4": "지침확인결과", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "안혜은", "pub":"조현민" },
  { "No": "40", "dep1": "차세대가입설계", "dep2": "인수지침/심사", "dep3": "인수지침", "id": "LNIPLZ19", "subId": "", "step": "", "dep4": "지침확인결과", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "안혜은", "pub":"조현민" },
  { "No": "41", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ20", "subId": "", "step": "", "dep4": "질병동의", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "44", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "알릴사항", "id": "LNIPLZ22", "subId": "", "step": "알릴사항", "dep4": "단체보험 알릴사항 조회(단체)", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "45", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "알릴사항", "id": "LNIPLZ23", "subId": "", "step": "알릴사항", "dep4": "SELF고지 답변내용", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "이현숙", "pub":"조현민" },
  { "No": "46", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ24", "subId": "", "step": "알릴사항", "dep4": "SELF고지 알림톡 발송", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "이현숙", "pub":"조현민" },
  { "No": "47", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "심사", "id": "LNIPLZ25", "subId": "", "step": "알릴사항", "dep4": "대안설계 미리보기(AI)", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "48", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "알릴사항", "id": "LNIPLZ26", "subId": "", "step": "알릴사항", "dep4": "질병력세부정보", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "49", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "알릴사항", "id": "LNIPLZ27", "subId": "", "step": "알릴사항", "dep4": "질병검색 및 입력", "type": "팝업", "tab": "탭", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "50", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "알릴사항", "id": "LNIPLZ28", "subId": "", "step": "", "dep4": "질병가져오기", "type": "팝업", "tab": "탭", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "51", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "알릴사항", "id": "LNIPLZ29", "subId": "", "step": "알릴사항", "dep4": "질병별 상세정보가져오기", "type": "팝업", "tab": "탭", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "52", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "알릴사항", "id": "LNIPLZ30", "subId": "", "step": "", "dep4": "간편고지형 경증인수조건별 질병입력 자동화", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "53", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "알릴사항", "id": "LNIPLZ31", "subId": "", "step": "", "dep4": "(신청원) 고지대상 질병 가져오기", "type": "팝업", "tab": "탭", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "54", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "알릴사항", "id": "LNIPLZ32", "subId": "", "step": "", "dep4": "(심평원) 고지대상 질병 가져오기", "type": "팝업", "tab": "탭", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "59", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "추가사항", "id": "LNIPL020", "subId": "NSPL020_4", "step": "추가사항", "dep4": "추가사항", "type": "화면", "tab": "화면", "dev": "신규", "plan": "이현숙", "pub":"조현민" },
  { "No": "60", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "수납", "id": "LNIPL020", "subId": "NSPL020_5", "step": "수납", "dep4": "수납", "type": "화면", "tab": "화면", "dev": "신규", "plan": "안성희", "pub":"조현민" },
  { "No": "73", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPL080", "subId": "", "step": "", "dep4": "통합가입설계조회", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "77", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPL120", "subId": "", "step": "", "dep4": "청약완료불가사전안내", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "78", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "설계데이터조회", "id": "LNIPL130", "subId": "", "step": "", "dep4": "장기보험-가입설계요청", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "79", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "설계데이터조회", "id": "LNIPL140", "subId": "", "step": "", "dep4": "GA대리점 설계 지원_상세조회", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "81", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPL160", "subId": "", "step": "담보설계", "dep4": "고지유형별 보험료비교", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "82", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "설계데이터조회", "id": "LNIPL170", "subId": "", "step": "", "dep4": "납입예정 리스트", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "83", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "설계데이터관리", "id": "LNIPL180", "subId": "", "step": "", "dep4": "신계약기준관리", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "84", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "설계데이터관리", "id": "LNIPL190", "subId": "", "step": "", "dep4": "장기청약서류출력기준관리", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "85", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "설계데이터관리", "id": "LNIPL200", "subId": "", "step": "", "dep4": "신계약스캔권한관리", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "86", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "설계데이터관리", "id": "LNIPL210", "subId": "", "step": "", "dep4": "장기신계약가입설계관리정보", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "87", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPL220", "subId": "", "step": "", "dep4": "건종 검색", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "88", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ35", "subId": "", "step": "", "dep4": "설계검색", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "89", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ36", "subId": "", "step": "", "dep4": "예상환급금(장기)", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "90", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ37", "subId": "", "step": "", "dep4": "실손의료비 전환 계약 조회", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "91", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ38", "subId": "", "step": "", "dep4": "개인사업자 정보 등록", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "92", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ39", "subId": "", "step": "", "dep4": "은행유자격자조회", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "93", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ40", "subId": "", "step": "", "dep4": "주차장배상책임", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "94", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ41", "subId": "", "step": "", "dep4": "고객신원정보확인", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "95", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ42", "subId": "", "step": "", "dep4": "화재대물배상책임부호선택", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "96", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ43", "subId": "", "step": "", "dep4": "화재배상책임 추가속성", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "97", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ44", "subId": "", "step": "", "dep4": "QA심사이력", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "98", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ45", "subId": "", "step": "", "dep4": "특별조건부특약조회", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "99", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ46", "subId": "", "step": "", "dep4": "부실유의계약 선별인수 확인서", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "100", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ47", "subId": "", "step": "", "dep4": "고객 직업정보(상해급수)변경안내", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "101", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ48", "subId": "", "step": "", "dep4": "일괄 가입설계동의 관리", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "102", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ49", "subId": "", "step": "", "dep4": "원클릭스캔", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "118", "dep1": "차세대가입설계", "dep2": "인수지침/심사", "dep3": "지침확인", "id": "LNIPLZ65", "subId": "", "step": "", "dep4": "AI인수지침 위배해소 결과 확인 및 적용", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "안혜은", "pub":"조현민" },
  { "No": "127", "dep1": "차세대가입설계", "dep2": "인수지침/심사", "dep3": "설계데이터관리", "id": "LNIPL230", "subId": "", "step": "", "dep4": "CSM계산내역", "type": "화면", "tab": "화면", "dev": "전환", "plan": "안혜은", "pub":"조현민" },
  { "No": "133", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ67", "subId": "", "step": "", "dep4": "변경조건", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "136", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "가입설계", "id": "LNIPLZ68", "subId": "", "step": "", "dep4": "변경조건상세", "type": "팝업", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "137", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "설계관리", "id": "LNIPL260", "subId": "", "step": "", "dep4": "정액담보점검목록 조회", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "138", "dep1": "차세대가입설계", "dep2": "가입설계", "dep3": "설계관리", "id": "LNIPL270", "subId": "", "step": "", "dep4": "정액담보점검내역", "type": "화면", "tab": "화면", "dev": "전환", "plan": "서영진", "pub":"조현민" },
  { "No": "293", "dep1": "차세대가입설계", "dep2": "인수지침/심사", "dep3": "지침관리", "id": "LNIPLZ80", "subId": "", "step": "", "dep4": "지침확인결과", "type": "팝업", "tab": "화면", "dev": "신규", "plan": "안성회", "pub":"조현민" }
];

export function IAListWithPreview() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const activeRow = ROWS[hoveredIndex] ?? ROWS[0];

  const toPageStep = React.useCallback((subId: string): PageProcessStep | undefined => {
    const match = subId.match(/_(\d)$/);

    if (!match) {
      return undefined;
    }

    const step = Number(match[1]);
    if (step >= 1 && step <= 6) {
      return step as PageProcessStep;
    }

    return undefined;
  }, []);

  const activeStep = toPageStep(activeRow?.subId ?? '');
  const previewUrl = activeStep ? getStoryIframeUrl(activeRow.id, activeStep) : undefined;

  const handleMovePage = React.useCallback(() => {
    if (activeStep) {
      LinkGo(activeRow.id, activeStep);
      return;
    }

    LinkGo(activeRow.id);
  }, [activeRow.id, activeStep]);

  const workList = [
    'LNIPL020'
  ];

  const workIdSet = React.useMemo(() => new Set(workList), [workList]);

  return (
    <Grow className="w-full gap-[1.2rem] items-start ia-preview-root justify-center">
      <div className="h-[calc(100vh-4rem)] overflow-auto flex justify-center">
        <table className="text-[1.2rem] IA-list m-0! shrink-0!">
          <colgroup>
            <col style={{ width: '10rem' }} />
            <col />
            <col style={{ width: '5rem' }} />
            <col style={{ width: '5rem' }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">ID (Sub ID)</th>
              <th scope="col">페이지명</th>  
              <th scope="col" className="text-center">기획</th>
              <th scope="col" className="text-center">퍼블</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, index) => {
              return (
              <tr
                key={`${row.No}-${row.id}-${row.subId}-${index}`}
                data-active={hoveredIndex === index ? 'true' : undefined}
                onClick={() => setHoveredIndex(index)}
              >
                <th scope="row" className={`${workIdSet.has(row.id) ? 'bg-[#c5bfbf]!' : ''}`}>
                  {row.id}{row.subId ? (<><br /> ({row.subId})</>) : ''}
                </th>
                <td className={workIdSet.has(row.id) ? 'bg-[#fff3cd]!' : undefined}>
                  <b>{row.dep4}</b>
                </td>
                <td className={`text-center ${workIdSet.has(row.id) ? 'bg-[#fff3cd]!' : ''}`}>{row.plan}</td>
                <td className={`text-center ${workIdSet.has(row.id) ? 'bg-[#fff3cd]!' : ''}`}>{row.pub}</td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="ia-preview-pane">
        <div className="ia-preview-label cursor-pointer" onClick={handleMovePage}>
          {activeRow.dep1} &gt; {activeRow.dep2} &gt; {activeRow.dep3} &gt; <b>{activeRow.dep4}</b>
        </div>
        {previewUrl ? (
          <iframe
            key={previewUrl}
            src={previewUrl}
            title="화면 미리보기"
            className="ia-preview-iframe"
          />
        ) : (
          <div className="ia-preview-iframe flex items-center justify-center text-[1.3rem] text-[#666]">
            미리보기 가능한 STEP 정보가 없습니다.
          </div>
        )}
      </div>
    </Grow>
  );
}
