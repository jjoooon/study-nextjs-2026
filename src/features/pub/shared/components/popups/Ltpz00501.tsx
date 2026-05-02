'use client';

import '@/shared/lib/agGridPub';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Typo } from '@atoms';

import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

// 공통
type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
};
// 공통
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '설계',
    field02: '인수제한',
    field03: '[CHL적립보험료기준011] 보장성기준(환급률 100%이하)을 준수해야 합니다.',
  },
  {
    id: 2,
    field01: '설계',
    field02: '인수금지',
    field03:
      '[손실유의계약04] [심사요청불가][부실유의] 적립보험료(29052333원) 가 영업보험료(30000000원) 의 50%(15000000원)를 초과할 경우 부실유의계약 대상입니다.',
  },
  {
    id: 3,
    field01: '설계',
    field02: '인수기준',
    field03:
      '[손실유의계약03] [손실유의계약분류][5년초과만기/세만기] 적립보험료(29052333원) 가 영업보험료(30000000원)의 50%(15000000원) 이상일 경우 손실계약으로 분류될 수 있습니다.',
  },
  {
    id: 4,
    field01: '설계',
    field02: '참고사항',
    field03: '[유사암진단비가입조건99] 4대유사암진단비 간의 가입금액은 같아야 합니다.',
  },

  // [홍길순] 파트
  {
    id: 5,
    field01: '홍길순',
    field02: '인수기준',
    field03:
      '[8738720][상아내_6] [간병인사용질병입원비(요양병원)(180일한도)(면체누적)] 4만원 이상 가입 시, [간병인사용질병입원비(요양병원제외)(180일한도)(전체누적)] 4만원 가입필요',
  },
  {
    id: 6,
    field01: '홍길순',
    field02: '인수기준',
    field03: '[청약포인트001] 청약포인트 : -347.63',
  },
  {
    id: 7,
    field01: '홍길순',
    field02: '인수기준',
    field03:
      '[남성통합암관계001] 통합암 가입관계는 [(소화기관) >= (입술/구강/인두=호흡기=요로암=눈/뇌=남성생식기관) >= (뼈/관절/피부=혈액/림프및조혈)] 이어야 합니다.',
  },
  {
    id: 8,
    field01: '홍길순',
    field02: '청약완료불가',
    field03:
      '[SILSON035] [가족일상생활중배상책임III(대물20만원(누수50만원)공제)(갱신형)] 실손 보험계약 정보조회결과 일상생활배상책임이 중복됩니다. 일상생활배상책임은 청약완료 처리시에도 중복되는 경우 청약완료가 불가합니다.',
  },
  {
    id: 9,
    field01: '홍길순',
    field02: '청약완료불가',
    field03:
      '[보장자산수입요구00] [보장자산가이드라인] 상해급여/질병급여/상해비급여/질병비급여 1천만원 초과 가입 시 최종적으로 보장자산가이드라인(사망1억 수납완료, 운전자보험 제외) 충족 시 청약 가능합니다.',
  },
  {
    id: 10,
    field01: '홍길순',
    field02: '청약완료불가',
    field03:
      '[SILSON002] [특약형 실손의료비(질병비급여)(갱신형)] 실손 보험계약 정보조회결과 질병입원의료비(4세대 급여,비급여포함)가 중복됩니다. 질병입원의료비는 청약완료 처리시에도 중복되는 경우 청약완료가 불가합니다.(단, 실손전환/재개전환은 제외)',
  },
  {
    id: 11,
    field01: '홍길순',
    field02: '진단대상',
    field03:
      '[CJ진단비기준006] [진단C][담당:장기U/W파트] 진단상품 40세 이하 진단대상 진단기준누적금액 전체누적 인수한도 1억1천만원을 49000만원 초과하여 진단심사대상 입니다.',
  },
  {
    id: 12,
    field01: '홍길순',
    field02: '진단대상',
    field03:
      '[질병20진단심사001] [진단B][담당:장기U/W파트] 20세이상 피보험자가 실손의료비(질병급여/비급여), 노후실손의료비(질병형) 담보 가입시에는 진단심사 대상입니다.',
  },
  {
    id: 13,
    field01: '홍길순',
    field02: '자동심사',
    field03:
      '[SILSON002] [기본형 실손의료비(상해급여)(갱신형)] 실손보험계약 정보조회결과(단체)상해입원의료비(4세대 급여,비급여포함)가 중복됩니다. 실손보험계약중복가입에 대한 청약서 자필서명 수령(중복가입확인서) 또는 녹취(TM 계피동일)를 반드시 하셔야 합니다.',
  },
  {
    id: 14,
    field01: '홍길순',
    field02: '참고사항',
    field03: '[모집자등급표시003] 모집자인수그룹 : 화이트그룹',
  },
  {
    id: 15,
    field01: '홍길순',
    field02: '참고사항',
    field03:
      '[실손진단심사필수01] [진단심사 필수] 20세 이상 피보험자는 진단심사 진행이 필수입니다. (참고) 보장자산가이드라인 충족 시 최대 5천만원, 미충족 시 1천만원까지 가입 가능',
  },

  // [이혜인] 파트
  {
    id: 16,
    field01: '이혜인',
    field02: '인수기준',
    field03:
      '[남성통합암관계001] 통합암 가입관계는 [(소화기관) >= (입술/구강/인두=호흡기=요로암=눈/뇌=남성생식기관) >= (뼈/관절/피부=혈액/림프및조혈)] 이어야 합니다.',
  },
  {
    id: 17,
    field01: '이혜인',
    field02: '청약완료불가',
    field03:
      '[SILSON035] [가족일상생활중배상책임III(대물20만원(누수50만원)공제)(갱신형)] 실손 보험계약 정보조회결과 일상생활배상책임이 중복됩니다. 일상생활배상책임은 청약완료 처리시에도 중복되는 경우 청약완료가 불가합니다.',
  },
  {
    id: 18,
    field01: '이혜인',
    field02: '자동심사',
    field03:
      '[SILSON002] [기본형 실손의료비(상해급여)(갱신형)] 실손보험계약 정보조회결과(단체)상해입원의료비(4세대 급여,비급여포함)가 중복됩니다. 실손보험계약중복가입에 대한 청약서 자필서명 수령(중복가입확인서) 또는 녹취(TM 계피동일)를 반드시 하셔야 합니다.',
  },
  {
    id: 19,
    field01: '이혜인',
    field02: '참고사항',
    field03: '[모집자등급표시003] 모집자인수그룹 : 화이트그룹',
  },

  // [목적물1] 파트
  {
    id: 20,
    field01: '목적물1',
    field02: '인수기준',
    field03: '[재물담보별인수한도030_21 풍수재(비특수 건물)] 담보는 10억까지만 가입 검토 가능합니다.',
  },
  {
    id: 21,
    field01: '목적물1',
    field02: '일반심사',
    field03:
      '[CJF계약자주택01] 계약자별 주택물건 화재손해 가입금액 합계 20억초과(소재지 무관, 모든 목적물 합산) 본사 일반심사 대상입니다.',
  },
  {
    id: 22,
    field01: '목적물1',
    field02: '참고사항',
    field03:
      '[특별관리보험금004] 최근 5년이내 보험금지급액(추산 포함) 100만원 미만 : 재물보험금지급건수 1건, 재물보험금지급금액 45557원',
  },

  // [목적물2] 파트
  {
    id: 23,
    field01: '목적물2',
    field02: '특인대상',
    field03:
      '[심사전결주택증권002] 주택업종 1급 위험함 가입금액기준 30억원초과일 경우 본사 특인대상입니다. [위험체크리스트]를 첨부하여 특인요청 바랍니다.',
  },
  {
    id: 24,
    field01: '목적물2',
    field02: '일반심사',
    field03:
      '[CJF계약자주택01] 계약자별 주택물건 화재손해 가입금액 합계 20억초과(소재지 무관, 모든 목적물 합산) 본사 일반심사 대상입니다.',
  },
  {
    id: 25,
    field01: '목적물2',
    field02: '참고사항',
    field03: '[목적물담보코드001] 목적물담보코드001',
  },
];

const Ltpz00501 = () => {
  // 공통
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '설계',
      field: 'field01',
      width: 100,
      spanRows: true,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '인수제한',
      field: 'field02',
      width: 100,
      spanRows: true,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '위배내용',
      field: 'field03',
      flex: 1,
      cellClass: 'flex! items-center! justify-start! whitespace-normal!',
      autoHeight: true,
    },
  ];

  // 공통
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Gcol className="w-full">
      <Typo tag={'strong'} variant={'heading-md'}>
        확인사항
      </Typo>
      <Gcol className="w-full flex">
        <TableFold>
          <TableFoldHead title="필수지침"></TableFoldHead>
          <TableFoldBody>
            <div className="ag-theme-alpine min-h-[24rem]">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                }}
                rowClassRules={{}}
                enableCellSpan={true}
                domLayout="autoHeight"
                animateRows={false}
              />
            </div>
          </TableFoldBody>
        </TableFold>
      </Gcol>
    </Gcol>
  );
};

export default Ltpz00501;
