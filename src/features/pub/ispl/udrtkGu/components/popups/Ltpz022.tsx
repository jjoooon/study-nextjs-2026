/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { CellClickedEvent, CellStyle, ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import Ltpz068 from '@/features/pub/ispl/udrtkGu/components/popups/Ltpz068';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { AiIcon } from '@icons';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';

/** 탭 메뉴 구성 타입 정의 */
type Ltpz022TabType = {
  name: string;
  value: string;
  label: string;
};

const DATA_TABS: Ltpz022TabType[] = [
  {
    name: '설계',
    value: 'tab1',
    label: '설계',
  },
];

/** 인수 지침 위배 내역 데이터 타입 */
type UnderwritingViolationRow = {
  id: number;
  criteria: string; // 인수제한 구분 (인수기준, 청약완료불가 등)
  details: string; // 상세 위배 내용 (HTML 포함 가능)
};

/** 그리드에 표시될 임시 데이터 */
const violationRowData: UnderwritingViolationRow[] = [
  {
    id: 1,
    criteria: '인수기준',
    details:
      '[ULA16364H01_1814_01] [암(유사암제외)항암호르몬약물(연1회)][전체누적][인수한도: 300 만원][초과: 300 만원]',
  },
  {
    id: 2,
    // target: '홍길순',
    criteria: '인수기준',
    details: '[ULA16364H01_1818_01] [암(유사암제외)항암호르몬약물(합)][전체누적][인수한도: 300 만원][초과: 300 만원]',
  },
  {
    id: 3,
    // target: '홍길순',
    criteria: '인수기준',
    details:
      '[ULA16364H01_1095_01] [카티(CAR-T)항암약물허가치료비(1회한)][전체누적][인수한도: 5000 만원][초과: 5,000 만원]',
  },
  {
    id: 4,
    // target: '홍길순',
    criteria: '인수기준',
    details:
      '[ULA16364H01_1035_01] [표적항암약물허가치료비(1회한)(합)][전체누적][인수한도: 7000 만원][초과: 2,000 만원]',
  },
  {
    id: 5,
    // target: '홍길순',
    criteria: '인수기준',
    details: '[ULA16364H01_663_01] [표적항암약물허가치료비(합)][전체누적][인수한도: 16000 만원][초과: 3,000 만원]',
  },
  {
    id: 6,
    // target: '홍길순',
    criteria: '인수기준',
    details: '[ULA16364H01_834_01] [항암양성자방사선치료비(1회한)][전체누적][인수한도: 3000 만원][초과: 3,000 만원]',
  },
  {
    id: 7,
    // target: '홍길순',
    criteria: '인수기준',
    details: '[ULA16364H01_2634_01] [항암양성자방사선치료비(합)][전체누적][인수한도: 4000 만원][초과: 2,000 만원]',
  },
  {
    id: 8,
    // target: '홍길순',
    criteria: '인수기준',
    details:
      '[ULA16364H01_2280_01] [항암중입자방사선치료(유사암포함)(1회한)][전체누적][인수한도: 5000 만원][초과: 5,000 만원]',
  },
  {
    id: 9,
    // target: '홍길순',
    criteria: '특인대상',
    details: '[표준하체산출이력001] [특별조건부 확인 필요] 표준하체 위험지수 산출의뢰 이력이 있습니다.',
  },
  {
    id: 10,
    // target: '홍길순',
    criteria: '참고사항',
    details: '[표준하체산출이력001] [특별조건부 확인 필요] 표준하체 위험지수 산출의뢰 이력이 있습니다.',
  },
  {
    id: 11,
    // target: '홍길순',
    criteria: '참고사항',
    details: '[시그니처여성올인원플랜00] [시그니처 여성 올인원플랜]',
  },
  {
    id: 12,
    // target: '홍길순',
    criteria: '참고사항',
    details:
      '[모집인제한_암담보비중안내_여성] ▶암담보제한◀ 전체 보장보험료 (119814원) 중 암담보보장보험료 (71507원)  비중 40% 초과되었습니다. ①암직접치료통원비(상급종합병원포함) 5만원 이상 또는 ②뇌출혈진단비 1500만원 이상 가입 필요합니다. (암/유의담보 리스트는 대내문서 참고)',
  },
  {
    id: 13,
    // target: '홍길순',
    criteria: '참고사항',
    details: '[테스트_13] 대인벌금:  0대물벌금:  0변호사:  0형사합의실손:  0형사합의실손_42일미만:  0',
  },
  {
    id: 14,
    // target: '홍길순',
    criteria: '청약완료불가(업계누적)',
    details:
      '[정액담보(항암약물치료)초과ICIS001] [업계가입금액 초과 수납불가][주소희] 고액항암치료비 2억7천만원 초과시(업계 정액보상담보 포함) 가입이 불가능합니다. [당사 : 37000만원 / 타사 : 0만원]',
  },
];

/** 인수제한 구분값에 따른 기본 텍스트 색상 매핑 */
const criteriaColorMap: Record<string, string> = {
  인수기준: 'var(--color-danger-50)',
  '청약완료불가\n(업계누적)': 'var(--color-information-50)',
};

interface Ltpz022Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onApply?: () => void;
}

/**
 * Ltpz022: 보험 설계의 지침 확인 결과(인수 지침 위배 사항)를 보여주는 팝업 컴포넌트입니다.
 */
const Ltpz022 = ({ open = true, onOpenChange, onApply }: Ltpz022Props) => {
  type SelectedViolationCell = Pick<UnderwritingViolationRow, 'id' | 'criteria'>;

  // AI인수지침 위배해소 결과(Ltpz068) 팝업 가시성 상태
  const [isLtpz068Open, setIsLtpz068Open] = React.useState(false);

  /** 위배내용 텍스트 중 특정 키워드에 색상을 입히는 치환 함수 */
  const applyDetailsColor = (html: string): string => {
    return html
      .replace(/(\[상해사망[^\]]*\])/g, `<b style="color:var(--color-information-50)">$1</b>`)
      .replace(/(\[인수한도:[^\]]*\])/g, `<span style="color:var(--color-information-50)">$1</span>`)
      .replace(/(\[초과금액:[^\]]*\])/g, `<b style="color:var(--color-danger-50)">$1</b>`)
      .replace(/(가입금액 2\.5배 적용)/g, `<span style="color:var(--color-success-50)">$1</span>`)
      .replace(/(\d+억원)/g, `<b style="color:var(--color-danger-50)">$1</b>`)
      .replace(/(\[당사:[^\]]*\])/g, `<b style="color:var(--color-danger-50)">$1</b>`);
  };

  /** 현재 선택된 셀(위배 내역) 정보를 저장하는 ref */
  const selectedCellRef = React.useRef<SelectedViolationCell | null>(null);
  /** Ag-Grid API 제어를 위한 ref */
  const gridApiRef = React.useRef<GridApi<UnderwritingViolationRow> | null>(null);

  /** 특정 행이 현재 선택된 상태인지 확인하는 유틸 함수 */
  const isCriteriaSelected = (criteria: string) => criteria !== '' && selectedCellRef.current?.criteria === criteria;
  const isDetailsSelected = (id: number) => selectedCellRef.current?.id === id;

  /** 셀 클릭 이벤트 핸들러: 상세 내용을 클릭하면 해당 행을 강조 표시 */
  const handleCellClicked = (e: CellClickedEvent<UnderwritingViolationRow>) => {
    if (e.colDef.field !== 'details' || !e.data) return;

    // 이미 선택된 셀이면 무시
    if (selectedCellRef.current?.id === e.data.id) return;

    // 선택 정보 업데이트 후 셀 리프레시
    selectedCellRef.current = {
      id: e.data.id,
      criteria: e.data.criteria,
    };

    gridApiRef.current?.refreshCells({ force: true });
  };

  /** 선택된 셀의 배경색 스타일 정의 */
  const getSelectedCellStyle = (isSelected: boolean): CellStyle => {
    if (!isSelected) {
      return {};
    }

    return {
      backgroundColor: '#FEF4D4',
    };
  };

  /** 행별 교차 배경색 정의 (홀/짝수 구분) */
  const getAlternatingCellStyle = (rowIndex: number | null | undefined): CellStyle => {
    const isOddCell = ((rowIndex ?? 0) + 1) % 2 !== 0;

    return {
      backgroundColor: isOddCell ? '#FFFFFF' : '#F4F4F4',
    };
  };

  /** 인수제한 구분에 따른 배경색 정의 (특정 상태값 강조) */
  const getCriteriaCellStyle = (criteria: string): CellStyle => {
    if (criteria.startsWith('청약완료불가\n(정액)') || criteria === '참고사항') {
      return { backgroundColor: '#F4F4F4' };
    }

    return { backgroundColor: '#FFFFFF' };
  };

  /** 그리드 기본 열 설정 */
  const spanDefaultColDef: ColDef<UnderwritingViolationRow> = {
    sortable: true,
    filter: false,
    resizable: true,
    suppressMovable: true,
    headerClass: 'ag-header-center',
  };
  const { attributeColumnWidth } = useDynamicColumnWidths();

  /** 그리드 컬럼 정의 */
  const spanColumnDefs = React.useMemo<ColDef<UnderwritingViolationRow>[]>(
    () => [
      {
        headerName: '인수제한',
        field: 'criteria',
        flex: 1,
        width: attributeColumnWidth(80),
        // 동일한 인수제한 항목은 셀을 병합하여 표시
        spanRows: true,
        cellClass: 'flex! items-center! justify-center! whitespace-pre-line text-center',
        // 상태 및 선택 여부에 따른 스타일 적용
        cellStyle: (params) => ({
          ...getCriteriaCellStyle(params.data?.criteria ?? ''),
          ...getSelectedCellStyle(isCriteriaSelected(params.data?.criteria ?? '')),
        }),
        cellRenderer: (params: ICellRendererParams<UnderwritingViolationRow>) => {
          const criteria = params.data?.criteria ?? '';
          const color = criteriaColorMap[criteria];

          // 줄바꿈 문자를 <br/>로 치환하여 렌더링
          return (
            <div
              className="w-full leading-[1.3]"
              style={color ? { color } : undefined}
              dangerouslySetInnerHTML={{ __html: String(criteria).replace(/\n/g, '<br/>') }}
            />
          );
        },
      },
      {
        headerName: '위배내용',
        field: 'details',
        wrapText: true,
        autoHeight: true,
        flex: 4,
        cellStyle: (params) => ({
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          ...getAlternatingCellStyle(params.node.rowIndex),
          ...getSelectedCellStyle(isDetailsSelected(params.data?.id ?? -1)),
        }),
        cellRenderer: (params: ICellRendererParams<UnderwritingViolationRow>) => (
          <div
            className="h-full w-full py-1.5 pl-1 leading-[1.3] whitespace-normal"
            dangerouslySetInnerHTML={{ __html: applyDetailsColor(String(params.data?.details ?? '')) }}
          />
        ),
      },
    ],
    [attributeColumnWidth]
  );

  /** 탭 상태 관리 훅 */
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md" className="h-[50rem]">
        {/* 헤더: 제목 및 화면ID */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              지침확인결과
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ022)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          {/* 상단: 설계 기본 정보 표시 영역 */}
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant={'head'}>
              <FormRow>
                <FormCell
                  title={'설계번호'}
                  className="whitespace-nowrap "
                  tdClassName="grid grid-cols-[auto_1fr_auto] w-full"
                >
                  <Input aria-label="" width={'quoteNo'} value={'LA260706315118'} align="center" readOnly />
                  <Input aria-label="" width={220} value={'시그니처여성건강(4종/올인원플랜)'} readOnly />
                  <Input aria-label="" width={80} value={''} readOnly />
                </FormCell>
                <FormCell title={'플랜명'} className="whitespace-nowrap">
                  <Input aria-label="" value={'100세만기 월납 / 20년납'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          {/* 중간: 탭 영역 및 위배 내역 그리드 */}
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            removable={false}
            onRemove={handleRemove}
            visibleCount={5}
            hasTableBelow={true}
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
            // AI 자동해소 버튼 추가 (플래시 효과 적용)
            renderAfter={
              <Button variant={'contained'} size={'md'} effect={'flash'} onClick={() => setIsLtpz068Open(true)}>
                <AiIcon color={'#fff'} color2={'#fff'} />
                AI자동해소
              </Button>
            }
            renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (
              <Button
                variant="text"
                key={String(tab.value)}
                onClick={() => {
                  setActive(String(tab.value));
                  const idx = data.findIndex((t) => String(t.value) === String(tab.value));
                  if (idx !== -1) {
                    const page = Math.floor(idx / visibleCount);
                    setVisibleStart(page * visibleCount);
                  }
                }}
              ></Button>
            )}
            /* 탭 하단 컨텐츠: 지침 확인 결과 Ag-Grid */
          >
            <div className="ag-theme-alpine ag-border-t inner-scroll" data-row={violationRowData.length}>
              <AgGridReact<UnderwritingViolationRow>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={violationRowData}
                columnDefs={spanColumnDefs}
                defaultColDef={spanDefaultColDef}
                // 셀 병합 기능 활성화
                enableCellSpan={true}
                onGridReady={(params) => {
                  gridApiRef.current = params.api;
                }}
                onCellClicked={handleCellClicked}
                animateRows={false}
              />
            </div>
          </TabPager>
        </DialogSection>

        {/* 푸터: 추가 확인 버튼 및 닫기 */}
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                당사누적확인
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                타사누적확인
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                청약포인트
              </Button>
            </Grow>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                간편누적해소
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
      <Ltpz068 open={isLtpz068Open} onOpenChange={setIsLtpz068Open} onApply={onApply} />
    </Dialog>
  );
};

export default Ltpz022;
