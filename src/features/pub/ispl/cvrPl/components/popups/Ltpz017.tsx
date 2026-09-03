/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { CellValueChangedEvent, ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  createTooltipValueGetter,
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon } from '@icons';
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

type DummyDataType = {
  id: number;
  isCheck: boolean;
  planName: string;
  myPlanName: string;
  target: boolean | string;
  registrationDate: string;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    planName: '(355간편지형)(프리미엄을인원플랜)(1.7.8(355간편지형)(프리미엄을인원플랜)(1.7.8',
    myPlanName: '3대진단형',
    registrationDate: '2026-03-22',
    target: true,
  },
  {
    id: 2,
    isCheck: false,
    planName: '(355간편지형)(프리미엄을인원플랜)(1.7.8',
    myPlanName: '3대진단형',
    registrationDate: '2026-03-22',
    target: true,
  },
  {
    id: 3,
    isCheck: true,
    planName: '(355간편지형)(프리미엄을인원플랜)(1.7.8',
    myPlanName: '60대 3만원 암관련',
    registrationDate: '2026-03-22',
    target: true,
  },
  {
    id: 4,
    isCheck: false,
    planName: '',
    myPlanName: '',
    registrationDate: '',
    target: false,
  },
];

const Ltpz017 = () => {
  // 검색버튼 여부에 따른 셀 렌더러
  const attributeRenderer = (_params: ICellRendererParams<DummyDataType>) => {
    return (
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-1">
        <Button only={'icon'} variant={'none'} size={'sm'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </div>
    );
  };

  // 나만의플랜명 상시 인풋 노출 렌더러
  const planNameInputRenderer = (params: ICellRendererParams<DummyDataType>) => {
    const value = params.value || '';
    const rowIndex = params.node.rowIndex;
    const isLastRow = rowIndex !== null && params.api.getDisplayedRowCount() - 1 === rowIndex;

    if (isLastRow || !value.trim()) {
      return (
        <div className="w-full h-full flex items-center justify-stretch py-[0.1rem]">
          <input
            type="text"
            className="w-full h-[2.6rem] px-2.5 border border-[var(--color-gray-30)] rounded-[0.4rem] bg-white text-[1.2rem] pointer-events-none"
            value={value}
            placeholder="나만의플랜명 입력"
            readOnly
          />
        </div>
      );
    }

    return <span className="px-2 text-[1.2rem]">{value}</span>;
  };

  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '순번',
        field: 'id',
        width: attributeColumnWidth(40),
        cellClass: 'text-center',
      },
      {
        headerName: '회사플랜명',
        field: 'planName',
        flex: 5,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'planName' }),
      },
      {
        headerName: '나만의플랜명',
        field: 'myPlanName',
        flex: 1,
        minWidth: attributeColumnWidth(110),
        editable: true,
        cellClass: 'editable-cell',
        cellRenderer: planNameInputRenderer,
      },
      {
        headerName: '등록일자',
        field: 'registrationDate',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
      {
        headerName: '적용대상',
        field: 'target',
        width: attributeColumnWidth(50),
        cellClass: 'text-center',
        cellRenderer: attributeRenderer,
      },
    ],
    [attributeColumnWidth]
  );

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);

  const onCellValueChanged = React.useMemo(() => {
    const baseHandler = createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id');
    return (event: CellValueChangedEvent<DummyDataType>) => {
      baseHandler(event);

      setRowData((prev) => {
        if (prev.length === 0) return prev;
        const lastRow = prev[prev.length - 1];

        if (lastRow && (lastRow.myPlanName?.trim() || lastRow.planName?.trim())) {
          const nextId = Math.max(...prev.map((r) => r.id), 0) + 1;
          return [
            ...prev,
            {
              id: nextId,
              isCheck: false,
              planName: '',
              myPlanName: '',
              registrationDate: '',
              target: false,
            },
          ];
        }
        return prev;
      });
    };
  }, [setRowData, setErrorRows]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="ml">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              나만의설계
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ017)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable
              variant={'head'}
              lineTop={false}
              caption="보험정보"
              cols={['w-[1rem]', 'w-[10rem]', 'w-[1rem]', 'w-auto']}
            >
              <FormRow>
                <FormCell title={'설계사'}>
                  <Input value={'김한화'} readOnly variant="info" />
                </FormCell>
                <FormCell title={'상품명'}>
                  <Input value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly variant="info" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <TableFold>
            <TableFoldHead title="플랜등록사항" />
            {/* 2026-05-28 */}
            <TableFoldBody className="gap-2 grid grid-rows-[auto_1fr]">
              <Gcol className="w-full" placement="ss" variant="box-detail">
                <Typo icon="detail" variant="body-sm">
                  적용대상 설정 시 지정한 취급직원만 플랜이 노출됩니다.(미설정시 전체 노출)
                </Typo>
                <Typo icon="detail" variant="body-sm">
                  적용대상 설정 시 지정한 취급직원만 플랜이 노출됩니다.(미설정시 미노출)
                </Typo>
              </Gcol>
              <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{ sortable: true }}
                  singleClickEdit={true}
                  onCellValueChanged={onCellValueChanged}
                  rowSelection={{
                    mode: 'multiRow',
                    headerCheckbox: false,
                    checkboxes: true,
                  }}
                  selectionColumnDef={{
                    headerName: '선택',
                    width: attributeColumnWidth(30),
                    cellClass: 'editable-cell',
                  }}
                  onGridReady={(params) => {
                    params.api.forEachNode((node) => {
                      if (node.data?.isCheck) {
                        node.setSelected(true);
                      }
                    });
                  }}
                  domLayout="normal"
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                나만의설계종복사
              </Button>
            </Grow>
            <Grow>
              <Button variant={'outlined'} color={'gray'} size={'xl'}>
                삭제
              </Button>
              <Button variant={'contained'} size={'xl'}>
                저장
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

export default Ltpz017;
