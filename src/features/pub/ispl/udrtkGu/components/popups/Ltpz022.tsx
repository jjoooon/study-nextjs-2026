/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent } from '@aggrid';
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
import type { CellClickedEvent, CellStyle, ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';

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
  {
    name: '홍길순',
    value: 'tab2',
    label: '홍길순',
  },
  {
    name: '목적물1',
    value: 'tab3',
    label: '목적물1',
  },
];

type UnderwritingViolationRow = {
  id: number;
  // target: string;
  criteria: string;
  details: string;
};
const violationRowData: UnderwritingViolationRow[] = [
  {
    id: 1,
    // target: '홍길순',
    criteria: '인수기준',
    details:
      '시그니처여성 올인원플랜은 [상해사망 1.5억] 또는 [상해사망 5천만 + 상해/질병중환자실입원비 각 20만] 가입이 필수입니다.',
  },
  {
    id: 2,
    // target: '홍길순',
    criteria: '인수기준',
    details:
      '[암(유사암제외)진단비(암진단비 I)표준권누적 한도초과]<br />[인수한도: 10000 만원] [초과금액: 20,000 만원]',
  },
  {
    id: 3,
    // target: '홍길순',
    criteria: '인수기준',
    details:
      '[암진단비 I + II + III(암)(재진단비포함)표준권누적 한도초과]<br/>[인수한도: 10000 만원] [초과금액: 20,000 만원]',
  },
  {
    id: 4,
    // target: '홍길순',
    criteria: '인수기준',
    details:
      '[유사암진단비/기타피부암][전체누적 한도초과] [가입금액 2.5배 적용]<br/>[인수한도: 3000 만원] [초과금액: 1,300 만원]',
  },
  {
    id: 5,
    // target: '홍길순',
    criteria: '청약완료불가\n(정액)',
    details:
      '[뇌졸중외부기공통기준암(유사암제외)진단비(암진단비 I)][전체누적 한도초과]<br/>[인수한도: 20000 만원] [초과금액: 13,100 만원]',
  },
  {
    id: 6,
    // target: '홍길순',
    criteria: '청약완료불가\n(정액)',
    details: '[암(유사암제외)진단비(암진단비 I)] 전체누적 한도초과<br/>[인수한도: 10000 만원] [초과금액: 23,100 만원]',
  },
  {
    id: 7,
    // target: '홍길순',
    criteria: '청약완료불가\n(정액)',
    details:
      '[암진단비 I + II + III(합)(재진단미포함)][전체누적 한도초과]<br/>[인수한도: 10000 만원] [초과금액: 25,100 만원]',
  },
  {
    id: 8,
    // target: '홍길순',
    criteria: '청약완료불가\n(업계누적)',
    details:
      '[업계가입금액 초과 수납불가 당사+타사 암진단비 3억원 초과시(업계 정액보상담보 포함) 가입이 불가합니다.<br>[당사: 33,100만원 / 타사: 1,600만원]',
  },
  {
    id: 9,
    // target: '홍길순',
    criteria: '참고사항',
    details: '[한화NEWRICH간병입원플랜]',
  },
];

const Ltpz022 = () => {
  type SelectedViolationCell = Pick<UnderwritingViolationRow, 'id' | 'criteria'>;

  const applyDetailsColor = (html: string): string => {
    return html
      .replace(/(\[상해사망[^\]]*\])/g, `<b style="color:var(--color-information-50)">$1</b>`)
      .replace(/(\[인수한도:[^\]]*\])/g, `<span style="color:var(--color-information-50)">$1</span>`)
      .replace(/(\[초과금액:[^\]]*\])/g, `<b style="color:var(--color-danger-50)">$1</b>`)
      .replace(/(가입금액 2\.5배 적용)/g, `<span style="color:var(--color-success-50)">$1</span>`)
      .replace(/(\d+억원)/g, `<b style="color:var(--color-danger-50)">$1</b>`)
      .replace(/(\[당사:[^\]]*\])/g, `<b style="color:var(--color-danger-50)">$1</b>`);
  };

  const criteriaColorMap: Record<string, string> = {
    인수기준: 'var(--color-danger-50)',
    '청약완료불가\n(정액)': 'var(--color-success-50)',
    '청약완료불가\n(업계누적)': 'var(--color-information-50)',
  };

  const selectedCellRef = React.useRef<SelectedViolationCell | null>(null);
  const gridApiRef = React.useRef<GridApi<UnderwritingViolationRow> | null>(null);

  const isCriteriaSelected = (criteria: string) => criteria !== '' && selectedCellRef.current?.criteria === criteria;
  const isDetailsSelected = (id: number) => selectedCellRef.current?.id === id;

  const handleCellClicked = (e: CellClickedEvent<UnderwritingViolationRow>) => {
    if (e.colDef.field !== 'details' || !e.data) return;

    if (selectedCellRef.current?.id === e.data.id) return;

    selectedCellRef.current = {
      id: e.data.id,
      criteria: e.data.criteria,
    };

    gridApiRef.current?.refreshCells({ force: true });
  };

  const getSelectedCellStyle = (isSelected: boolean): CellStyle => {
    if (!isSelected) {
      return {};
    }

    return {
      backgroundColor: '#FEF4D4',
    };
  };

  const getAlternatingCellStyle = (rowIndex: number | null | undefined): CellStyle => {
    const isOddCell = ((rowIndex ?? 0) + 1) % 2 !== 0;

    return {
      backgroundColor: isOddCell ? '#FFFFFF' : '#F4F4F4',
    };
  };

  const getCriteriaCellStyle = (criteria: string): CellStyle => {
    if (criteria.startsWith('청약완료불가\n(정액)') || criteria === '참고사항') {
      return { backgroundColor: '#F4F4F4' };
    }

    return { backgroundColor: '#FFFFFF' };
  };

  const spanDefaultColDef: ColDef<UnderwritingViolationRow> = {
    sortable: true,
    filter: false,
    resizable: true,
    suppressMovable: true,
    headerClass: 'ag-header-center',
  };

  const spanColumnDefs: ColDef<UnderwritingViolationRow>[] = [
    {
      headerName: '인수제한',
      field: 'criteria',
      width: 80,
      spanRows: true,
      cellClass: 'flex! items-center! justify-center! whitespace-pre-line text-center',
      cellStyle: (params) => ({
        ...getCriteriaCellStyle(params.data?.criteria ?? ''),
        ...getSelectedCellStyle(isCriteriaSelected(params.data?.criteria ?? '')),
      }),
      cellRenderer: (params: ICellRendererParams<UnderwritingViolationRow>) => {
        const criteria = params.data?.criteria ?? '';
        const color = criteriaColorMap[criteria];

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
      flex: 1,
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
  ];

  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md" className="h-[50rem]">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              지침확인결과
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz022)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant={'head'}>
              <FormRow>
                <FormCell title={'설계번호'} className="whitespace-nowrap">
                  <Input aria-label="" width={'quoteNo'} value={'LA123456789012'} align="center" readOnly />
                  <Input aria-label="" width={200} value={'한화 시그니처 여성 건강보험4.0'} readOnly />
                  <Input aria-label="" width={80} value={''} readOnly />
                </FormCell>
                <FormCell title={'플랜명'} className="whitespace-nowrap">
                  <Input aria-label="" value={'올인원 플랜(15~40세)'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
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
            renderAfter={
              <Button variant={'contained'} size={'md'} effect={'flash'}>
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
          >
            <div className="ag-theme-alpine ag-border-t min-h-[16rem]">
              <AgGridReact<UnderwritingViolationRow>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={violationRowData}
                columnDefs={spanColumnDefs}
                defaultColDef={spanDefaultColDef}
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
    </Dialog>
  );
};

export default Ltpz022;
