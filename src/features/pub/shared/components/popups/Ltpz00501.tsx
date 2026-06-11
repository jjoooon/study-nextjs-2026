/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';

import { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { Divider, Gcol, Grow, Typo } from '@atoms';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';

import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TooltipQ } from '@common/TooltipQ';

/** 인수 지침 위배 내역 및 청약 제한 사항 데이터 타입 */
type DummyDataType = {
  id: number;
  field01: string | number; // 대상 (설계/피보험자명 등)
  field02: string | number; // 구분 (인수제한/인수기준 등)
  field03: string | number; // 상세 위배 내용
};

/** 하단 '필수지침' 그리드에 표시될 임시 데이터 */
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

/**
 * Ltpz00501: '꼭 해야할 일' 팝업 내의 '공통' 탭 컨텐츠입니다.
 * 유사계약 확인, 고객확인(CDD/EDD), 청약 완료 불가 사유 등을 리스트업하여 보여줍니다.
 */
const Ltpz00501 = () => {
  /** 화면 해상도에 따른 동적 컬럼 너비 계산 */
  const { attributeColumnWidth } = useDynamicColumnWidths();

  /** 하단 필수지침 그리드 컬럼 정의 */
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '설계',
      field: 'field01',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      spanRows: true,
      cellClass: 'flex! items-center! justify-center!',
    },
    {
      headerName: '인수제한',
      field: 'field02',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      spanRows: true,
      cellClass: 'flex! items-center! justify-center!',
      // 구분값에 따라 텍스트 색상을 다르게 표시
      cellStyle: ({ value }) => {
        if (value === '인수기준' || value === '인수금지') {
          return { color: '#E43939' };
        }
        if (value === '청약완료불가') {
          return { color: '#00AA4D' };
        }
        if (value === '진단대상') {
          return { color: '#006FF2' };
        }
        return undefined;
      },
    },
    {
      headerName: '위배내용',
      field: 'field03',
      flex: 20,
      cellClass: 'flex! !items-center !justify-start !whitespace-normal !leading-[1.4] !py-1 !pl-2.5',
      autoHeight: true,
      resizable: false,
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Gcol className="w-full" placement="ss" gap={3}>
      <Gcol gap={3} placement="ss">
        {/* 1. 청약완료 전 필수 확인사항 영역 */}
        <Gcol placement="ss">
          <Typo tag={'strong'} variant={'body-lg'}>
            청약완료 전 필수 확인사항
          </Typo>
          <FormTable cols={['w-[20.4rem]', 'w-auto']}>
            <FormRow>
              <FormCell title={<b>유사계약현황 확인</b>}>
                <Grow gap={2}>
                  <Button color="gray" onClick={() => {}} variant="outlined">
                    유사계약현황
                  </Button>
                  <Grow>
                    <Typo variant={'body-sm'} icon={'detail'} weight={'bold'} color={'primary'}>
                      미확인 항목 있음
                    </Typo>
                    <Divider variant={'default'} className="w-[0.1rem] h-[1rem] bg-[#6B7280]" />
                    <Typo variant={'body-sm'} color={'gray'}>
                      [유사계약현황] 내역을 확인해주세요{' '}
                    </Typo>
                  </Grow>
                </Grow>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={<b>CDD(고객확인)</b>}>
                <Grow gap={3}>
                  <RadioGroup>
                    <RadioGroupItem value="계약자 실소유자">계약자 실소유자</RadioGroupItem>
                    <RadioGroupItem value="실소유자 아님">실소유자 아님</RadioGroupItem>
                  </RadioGroup>
                  <Grow gap={2}>
                    <Button color="gray" onClick={() => {}} variant="outlined">
                      CDD 등록
                    </Button>
                    <Grow>
                      <Typo variant={'body-sm'} icon={'detail'} weight={'bold'} color={'primary'}>
                        계약자 CDD(고객확인)대상
                      </Typo>
                      <Divider variant={'default'} className="w-[0.1rem] h-[1rem] bg-[#6B7280]" />
                      <Typo variant={'body-sm'} color={'gray'}>
                        [CDD 등록] 해주세요
                      </Typo>
                    </Grow>
                  </Grow>
                </Grow>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={<b>EDD(강화된 고객확인)</b>}>
                <Grow gap={3}>
                  <RadioGroup>
                    <RadioGroupItem value="계약자 실소유자">계약자 실소유자</RadioGroupItem>
                    <RadioGroupItem value="실소유자 아님">실소유자 아님</RadioGroupItem>
                  </RadioGroup>
                  <Grow gap={2}>
                    <Button color="gray" onClick={() => {}} variant="outlined">
                      EDD 등록
                    </Button>
                    <Grow>
                      <Typo variant={'body-sm'} icon={'detail'} weight={'bold'} color={'primary'}>
                        AML 관련 고위험도로 EDD(강화된 고객확인) 대상
                      </Typo>
                      <Divider variant={'default'} className="w-[0.1rem] h-[1rem] bg-[#6B7280]" />
                      <Typo variant={'body-sm'} color={'gray'}>
                        [EDD 등록] 해주세요
                      </Typo>
                    </Grow>
                  </Grow>
                </Grow>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={<b>FATCA/CRS 정보등록</b>}>
                <Grow gap={3}>
                  <RadioGroup>
                    <RadioGroupItem value="해당 없음">해당 없음</RadioGroupItem>
                    <RadioGroupItem value="해당">해당</RadioGroupItem>
                  </RadioGroup>
                  <Grow gap={2}>
                    <Button color="gray" onClick={() => {}} variant="outlined">
                      FATCA/CRS 입력
                    </Button>
                    <Grow>
                      <Typo variant={'body-sm'} icon={'detail'} weight={'bold'} color={'primary'}>
                        본인확인서(FATCA/CRS)양식 미등록
                      </Typo>
                      <Divider variant={'default'} className="w-[0.1rem] h-[1rem] bg-[#6B7280]" />
                      <Typo variant={'body-sm'} color={'gray'}>
                        양식 출력 및 스캔을 진행해주세요
                      </Typo>
                    </Grow>
                  </Grow>
                </Grow>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={<b>미성년자 법정대리인 정보입력</b>}>
                <Grow gap={3}>
                  <Badge>미등록</Badge>
                  <Grow gap={1}>
                    <Button color="gray" onClick={() => {}} variant="outlined">
                      법정대리인등록
                    </Button>
                    <Button color="gray" onClick={() => {}} variant="outlined">
                      재조회
                    </Button>
                  </Grow>
                </Grow>
              </FormCell>
            </FormRow>
          </FormTable>
        </Gcol>

        {/* 2. 청약완료 불가사항 영역: 반드시 해소해야 청약 진행 가능 */}
        <Gcol placement="ss">
          <Typo tag={'strong'} variant={'body-lg'}>
            청약완료 불가사항
          </Typo>
          <FormTable cols={['w-[20.4rem]', 'w-auto']}>
            <FormRow>
              <FormCell title={<b>타인의 사망보험 동의 확인 강화</b>}>
                <Grow gap={1}>
                  <Grow gap={2}>
                    <Typo variant={'body-md'}>피보험자 : 김한화</Typo>
                    <Divider variant={'default'} className="w-[0.1rem] h-[1rem] bg-[#6B7280]" />
                    <Typo variant={'body-sm'}>스캔</Typo>
                  </Grow>
                  <Grow gap={2}>
                    <Badge>N</Badge>
                    <Typo variant={'body-sm'} icon={'detail'} color={'gray'}>
                      타인 사망 피보험자 동의 확인서 스캔 후 청약완료 가능합니다.
                    </Typo>
                  </Grow>
                </Grow>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={<b>미지급 휴면보험금 처리</b>}>
                <Grow gap={3}>
                  <Typo variant={'body-md'}>대상 증권번호 : LA260112297637 외 N건</Typo>
                  <Button color="gray" onClick={() => {}} variant="outlined">
                    휴면보험금조회
                  </Button>
                </Grow>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    전환대상 계약 변경/해약 확인
                    <TooltipQ>
                      전환용 실손의료비 청약완료 가능한 조건은 아래와 같습니다.
                      <BulletList position="col">
                        <BulletListItem before="1." size="sm" type="symbols">
                          전환전 계약(72T088012022) 해약(만기) 또는 전환대상 실손의료비 담보 삭제
                        </BulletListItem>
                        <BulletListItem before="2." size="sm" type="symbols">
                          신계약보험시기 = 전환전 계약의 해약(만기) 일자 또는 변경 기준일
                        </BulletListItem>
                      </BulletList>
                    </TooltipQ>
                  </Grow>
                }
              >
                <Typo variant={'body-md'}>전환전 계약 : LA260112297637</Typo>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={<b>신계약청약서 미스캔계약처리</b>}>
                <Grow gap={3}>
                  <Typo variant={'body-md'}>LA260112297637 외 N건</Typo>
                  <Grow>
                    <Typo variant={'body-sm'} icon={'detail'} weight={'bold'} color={'primary'}>
                      기 체결건 중 미스캔 건 존재
                    </Typo>
                    <Divider variant={'default'} className="w-[0.1rem] h-[1rem] bg-[#6B7280]" />
                    <Typo variant={'body-sm'} color={'gray'}>
                      스캔완료 후 청약완료가 가능합니다.{' '}
                    </Typo>
                  </Grow>
                </Grow>
              </FormCell>
            </FormRow>
            <FormRow>
              <FormCell title={<b>계속보험료계좌(당사직원)입력제한</b>}>
                <Gcol placement="ss">
                  <Typo variant={'body-md'}>
                    자동이체, 급여이체, 카드이체의 예금주/소유주가 당사직원입니다.<br></br>
                    <b className="text-[#FF5C2E]">최종결재권자에 한하여 청약완료가 가능</b>합니다.<br></br>승인기준,
                    절차 등 자세한 사항은 각 채널지원파트로 문의하세요.
                  </Typo>
                  <Typo variant={'body-sm'} color={'gray'}>
                    ( * 참고 : 업무알림(특별이익제공금지)예금주 확인 프로세스 강화 안내(장기보험 전사시행), 2016.11.10)
                  </Typo>
                </Gcol>
              </FormCell>
            </FormRow>
          </FormTable>
        </Gcol>

        {/* 3. 단순 참고사항 영역 */}
        <Gcol placement="ss">
          <Typo tag={'strong'} variant={'body-lg'}>
            참고사항
          </Typo>
          <FormTable cols={['w-[20.4rem]', 'w-auto']}>
            <FormRow>
              <FormCell title={<b>유의승환</b>}>13회차, 25회차, 37회차</FormCell>
            </FormRow>
          </FormTable>
        </Gcol>
      </Gcol>

      {/* 4. 하단 필수지침 그리드 영역: Ag-Grid 활용 */}
      <Gcol>
        <TableFold>
          <TableFoldHead title="필수지침"></TableFoldHead>
          <TableFoldBody>
            <div className="ag-theme-alpine ">
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
