/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import {
  AgGridEmptyComponent,
  createTooltipValueGetter,
  numberValueFormatter,
  useAgGridColumnVisibility,
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { FileExportIcon } from '@icons';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
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
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
  field10: string | number;
  field11: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'LA20165772444000',
    field02:
      '무배당 마이라이프 굿밸런스보장보험Ⅱ1무배당 마이라이프 굿밸런스보장보험Ⅱ1무배당 마이라이프 굿밸런스보장보험Ⅱ1무배당 마이라이프 굿밸런스보장보험Ⅱ16',
    field03: '2026-03-22',
    field04: '2027-03-22',
    field05: '2026-02',
    field06: '보통약관(일반상해사망)',
    field07: '109999999',
    field08: '일반상해사망',
    field09: '1.0',
    field10: '109999999',
    field11: '정상',
  },
  {
    id: 2,
    field01: 'LA20165772444000',
    field02: '무배당 마이라이프 굿밸런스보장보험Ⅱ16',
    field03: '2026-03-22',
    field04: '2027-03-22',
    field05: '2026-02',
    field06: '보통약관(일반상해사망)',
    field07: '9999999',
    field08: '일반상해사망',
    field09: '1.0',
    field10: '9999999',
    field11: '심사완료',
  },
  {
    id: 3,
    field01: 'LA20165772444000',
    field02: '무배당 마이라이프 굿밸런스보장보험Ⅱ16',
    field03: '2026-03-22',
    field04: '2027-03-22',
    field05: '2026-02',
    field06: '보통약관(일반상해사망)',
    field07: '9999999',
    field08: '일반상해사망',
    field09: '1.0',
    field10: '9999999',
    field11: '정상',
  },
  {
    id: 4,
    field01: 'LA20165772444000',
    field02: '무배당 마이라이프 굿밸런스보장보험Ⅱ16',
    field03: '2026-03-22',
    field04: '2027-03-22',
    field05: '2026-02',
    field06: '보통약관(일반상해사망)',
    field07: '9999999',
    field08: '일반상해사망',
    field09: '1.0',
    field10: '9999999',
    field11: '심사완료',
  },
];

const Ltpz098 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  // 2026-05-28 cellClass 수정
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '증권(설계번호)',
      field: 'field01',
      flex: 1,
      minWidth: attributeColumnWidth(130),
      cellClass: 'text-center',
    },
    {
      headerName: '상품명',
      field: 'field02',
      flex: 3,
      minWidth: attributeColumnWidth(280),
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
    },
    {
      headerName: '보험시기',
      field: 'field03',
      flex: 1,
      minWidth: attributeColumnWidth(85),
      cellClass: 'text-center',
    },
    {
      headerName: '보험종기',
      field: 'field04',
      flex: 1,
      minWidth: attributeColumnWidth(85),
      cellClass: 'text-center',
    },
    {
      headerName: '최종월드',
      field: 'field05',
      flex: 1,
      minWidth: attributeColumnWidth(75),
      cellClass: 'text-center',
    },
    {
      headerName: '담보명',
      field: 'field06',
      flex: 2,
      minWidth: attributeColumnWidth(200),
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field06' }),
    },
    {
      headerName: '가입금액',
      field: 'field07',
      flex: 1,
      minWidth: attributeColumnWidth(85),
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '누적위험명',
      field: 'field08',
      flex: 1,
      minWidth: attributeColumnWidth(150),
      cellClass: 'text-left',
    },
    {
      headerName: '누적배수',
      field: 'field09',
      width: 70,
      cellClass: 'text-center',
    },
    {
      headerName: '누적반영금액',
      field: 'field10',
      flex: 1,
      minWidth: attributeColumnWidth(85),
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '계약(설계상태)',
      field: 'field11',
      flex: 1,
      minWidth: attributeColumnWidth(90),
      cellClass: 'text-center',
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const gridRef = React.useRef<AgGridReact<DummyDataType> | null>(null);
  const toggleFields = ['field03', 'field04', 'field05'] as const;
  const { visibleFields, onVisibleFieldsChange, onGridReady } = useAgGridColumnVisibility<DummyDataType>({
    gridRef,
    toggleFields,
  });

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              계약별누적위험
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ098)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable variant={'head'} lineTop={false} caption="누적조회">
              <FormRow>
                <FormCell title={'피보험자'}>
                  <Input value={'김한화'} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grid placement="ss" className="w-full grid-rows-[auto_1fr]" gap={3}>
            <TableFold>
              <TableFoldHead title="피보험자의 위험정보(고객정보)"></TableFoldHead>
              <TableFoldBody>
                <Grow className="w-full">
                  <FormTable
                    caption="피보험자의 위험정보 테이블"
                    cols={['w-[5rem]', 'flex-1', 'w-[8rem]', 'flex-1', 'w-[5rem]', 'flex-1', 'w-[5rem]', 'flex-1']}
                  >
                    <FormRow>
                      <FormCell title={'직업'}>전기공학 개발자 및 연구원</FormCell>
                      <FormCell title={'급수/등급'}>2/B</FormCell>
                      <FormCell title={'회사'}>전기공학 개발자 및 연구원</FormCell>
                      <FormCell title={'직무'}>전기공학 개발자 및 연구원</FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
              </TableFoldBody>
            </TableFold>
            <TableFold>
              <TableFoldHead title="보험증권별 위험별 누적">
                <Grow gap={2}>
                  <CheckboxGroup
                    className="gap-3"
                    color="primary"
                    minSelected={0}
                    onValueChange={onVisibleFieldsChange}
                    value={visibleFields}
                    variant="default"
                    width="auto"
                  >
                    <CheckboxGroupItem value="field03">보험시기 표시</CheckboxGroupItem>
                    <CheckboxGroupItem value="field04">보험종기 표시</CheckboxGroupItem>
                    <CheckboxGroupItem value="field05">최종월드 표시</CheckboxGroupItem>
                  </CheckboxGroup>
                  <Grow>
                    <Button color="success" variant="outlined">
                      엑셀내보내기
                      <FileExportIcon />
                    </Button>
                  </Grow>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <Grid className="w-full grid-rows-[1fr_auto] gap-2 h-full">
                  <div className="ag-theme-alpine inner-scroll" data-row={DummyData.length}>
                    <AgGridReact<DummyDataType>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      ref={gridRef}
                      onGridReady={onGridReady}
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={{ sortable: true, resizable: true }}
                      enableCellSpan={true}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                  <Gcol>
                    <Gcol variant={'box-warning'} placement={'ss'}>
                      <Typo variant={'body-sm'} icon={'warning'}>
                        <b>안내사항 노출 영역</b>
                      </Typo>
                    </Gcol>
                    <Gcol placement={'ss'}>
                      <Typo variant={'body-sm'} icon={'detail'}>
                        누적위험 초과인수기준 클릭시에도 조회가 안되는 경우 해당 설계로 인한 누적위험 초과입니다.
                      </Typo>
                    </Gcol>
                  </Gcol>
                </Grid>
              </TableFoldBody>
            </TableFold>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                피보험자 누적 조회
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                지침확인결과
              </Button>
            </Grow>
            <Grow>
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

export default Ltpz098;
