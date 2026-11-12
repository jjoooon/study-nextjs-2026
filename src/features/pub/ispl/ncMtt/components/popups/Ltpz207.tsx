/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';

import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  useDynamicColumnWidths,
  createTooltipValueGetter,
} from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';
import { Tooltip, TooltipTrigger, TooltipContent } from '@uiux/Tooltip';

type DummyDataType = {
  id?: number;
  isChecked: boolean;
  field0: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string[];
  field7: string;
  field8: string;
  field9: string;
  field10: string;
};
type DummyDataType2 = {
  id?: number;
  isChecked: boolean;
  field0: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string[];
  field7: string;
  field8: string;
  field9: string;
  field10: string;
};

// ===== 샘플 데이터 =====
const dummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절발등 골절발등 골절발등 골절발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '22(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'Y',
  },
  {
    id: 2,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '12(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'N',
  },
  {
    id: 3,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '12(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'N',
  },
  {
    id: 4,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '12(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'N',
  },
  {
    id: 5,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '12(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'N',
  },
  {
    id: 6,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '12(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'N',
  },
];
const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절발등 골절발등 골절발등 골절발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '22(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'Y',
  },
  {
    id: 2,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '12(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'N',
  },
  {
    id: 3,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '12(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'N',
  },
  {
    id: 4,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '12(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'N',
  },
  {
    id: 5,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '12(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'N',
  },
  {
    id: 6,
    isChecked: false,
    field0: '고지필요',
    field1: 'S98',
    field2: '발등 골절',
    field3: '2021-01-21',
    field4: '2021-01-21',
    field5: '2',
    field6: ['1', '12(2021-01-21~2021-02-01)'],
    field7: '1',
    field8: '1',
    field9: '',
    field10: 'N',
  },
];

const Ltpz207 = () => {
  // 테이블 데이터 상태 관리
  const [rowData, setRowData] = React.useState<DummyDataType[]>(dummyData);
  const [rowData2, setRowData2] = React.useState<DummyDataType2[]>(dummyData2);
  // 화면 크기에 따라 컬럼 너비를 동적으로 조정
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 에러 행 상태 관리 (체크박스 처리용)
  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);

  // ===== ag-Grid 컬럼 정의 =====
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '체크',
      field: 'field0',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center text-[var(--color-information-50)]',
    },
    {
      headerName: '대표질병코드',
      field: 'field1',
      flex: 1,
      minWidth: attributeColumnWidth(94),
      cellClass: 'text-center',
    },
    {
      headerName: '질병명',
      field: 'field2',
      flex: 10,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field2' }),
    },
    {
      headerName: '치료시작일',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '치료종료일',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '통원',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '입원',
      field: 'field6',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        console.log(params.value);
        return (
          <Tooltip>
            <TooltipTrigger>{params.value[0]}</TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={0}>
              {params.value[1]}
            </TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      headerName: '수술',
      field: 'field7',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '발생횟수',
      field: 'field8',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '완치(가정)',
      field: 'field9',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '고지여부',
      field: 'field10',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
  ];
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '확인',
      field: 'field0',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '대표질병코드',
      field: 'field1',
      flex: 1,
      minWidth: attributeColumnWidth(94),
      cellClass: 'text-center',
    },
    {
      headerName: '질병명',
      field: 'field2',
      flex: 10,
      cellClass: 'text-center',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field2' }),
    },
    {
      headerName: '치료시작일',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '치료종료일',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '통원',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '입원',
      field: 'field6',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        console.log(params.value);
        return (
          <Tooltip>
            <TooltipTrigger>{params.value[0]}</TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={0}>
              {params.value[1]}
            </TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      headerName: '수술',
      field: 'field7',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '발생횟수',
      field: 'field8',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
    {
      headerName: '완치(가정)',
      field: 'field9',
      flex: 1,
      minWidth: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '고지여부',
      field: 'field10',
      flex: 1,
      minWidth: attributeColumnWidth(60),
      cellClass: 'text-center',
    },
  ];

  // ===== 셀 값 변경 핸들러 =====
  // 체크박스 변경 시 데이터 업데이트 처리
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isChecked', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );
  const onCellValueChanged2 = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType2, number>('isChecked', setRowData2, setErrorRows, 'id'),
    [setRowData2, setErrorRows]
  );

  const [isAlert01, setAlert01] = React.useState(false);

  // 필수고지 대상 건수(미고지/고지) 및 고지확인 대상 건수 계산
  const unnotifiedCount = React.useMemo(() => rowData.filter((item) => item.field10 === 'N').length, [rowData]);
  const notifiedCount = React.useMemo(() => rowData.filter((item) => item.field10 === 'Y').length, [rowData]);
  const confirmTargetCount = rowData2.length;

  return (
    <>
      <Dialog open>
        <DialogContent showCloseButton resizable={false} size="xl">
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                고지대상 조회 및 입력
              </Typo>
              <Typo tag={'p'} variant={'body-xl'}>
                (LTPZ207)
              </Typo>
            </DialogTitle>
          </DialogHeader>

          <DialogSection className="grid-rows-[auto_minmax(0,1fr)] gap-3">
            {/* FP정보제공 동의 및 조회 기간 입력 섹션 */}
            <Grow className="w-full" variant="box-round">
              <FormTable variant={'head'} lineTop={false} caption="">
                <FormRow>
                  <FormCell title={'FP정보제공동의(유효일자)'}>
                    <Input aria-label="FP정보제공동의 유효일자" width={76} value={'2026-03-01'} readOnly />
                  </FormCell>
                  <FormCell title={'전문호출기간'}>
                    <Input aria-label="전문호출기간" width={40} value={5} readOnly align="center" />
                    <Typo>년</Typo>
                  </FormCell>
                  <FormCell title={'최종적재일'}>
                    <Input aria-label="최종적재일" width={76} value={'2026-03-01'} readOnly />
                  </FormCell>
                  <FormCell title={'고지유형'}>
                    <Input aria-label="고지유형" width={100} value={''} readOnly />
                  </FormCell>
                </FormRow>
              </FormTable>
            </Grow>
            <Gcol placement="ss" gap={3}>
              <Grow className="w-full" placement="ss" variant="box-detail" gap={3}>
                <Typo icon="detail" variant="body-sm">
                  추가 고지대상 사고력이 확인되었습니다. 확인 후 고지유형을 변경해주세요.
                </Typo>

                <Grow placement="sc">
                  <Badge color="green">고혈압 Y</Badge>
                  <Badge color="green">당뇨 Y</Badge>
                </Grow>
              </Grow>

              {/* 펼침메뉴: 필수고지 */}
              <TableFold className="h-full">
                <TableFoldHead
                  variant="accordion"
                  title={`필수고지 대상: 미고지 ${unnotifiedCount}건, 고지 ${notifiedCount}건`}
                />
                <TableFoldBody className="w-full relative">
                  {/* ag-Grid 테이블: 필수고지 데이터 */}
                  <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      selectionColumnDef={{
                        width: 30,
                        cellClass: 'editable-cell',
                      }}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      onCellValueChanged={onCellValueChanged}
                      // ag-Grid 기본 설정
                      defaultColDef={{
                        sortable: true, // 컬럼 정렬 가능
                        resizable: true, // 컬럼 너비 조절 가능
                        cellClass: 'text-center', // 중앙 정렬
                      }}
                      // 다중행 선택 모드 (고지 상태 행 제외)
                      rowSelection={{
                        mode: 'multiRow',
                        isRowSelectable: (node) => node.data?.field8 !== '고지', // '고지' 상태 행은 선택 불가
                        checkboxes: true, // 체크박스 표시
                        enableClickSelection: false, // 행 클릭으로 선택 안됨
                      }}
                      // 그리드 초기화 후 체크 상태 복원
                      onGridReady={(params) => {
                        params.api.forEachNode((node) => {
                          if (node.data?.isChecked) {
                            node.setSelected(true);
                          }
                        });
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      tooltipHideDelay={1000}
                    />
                  </div>
                </TableFoldBody>
              </TableFold>

              {/* 펼침메뉴: 고지확인대상 */}
              <TableFold className="h-full">
                <TableFoldHead title={`고지확인 대상: ${confirmTargetCount}건`} variant="accordion" />
                <TableFoldBody className="w-full relative">
                  {/* ag-Grid 테이블: 고지확인대상 데이터 */}
                  <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                    <AgGridReact<DummyDataType2>
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData2}
                      columnDefs={columnDefs2}
                      selectionColumnDef={{
                        width: 30,
                        cellClass: 'editable-cell',
                      }}
                      onCellValueChanged={onCellValueChanged2}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                        cellClass: 'text-center',
                      }}
                      rowSelection={{
                        mode: 'multiRow',
                        isRowSelectable: (node) => node.data?.field8 !== '고지',
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      onGridReady={(params) => {
                        params.api.forEachNode((node) => {
                          if (node.data?.isChecked) {
                            node.setSelected(true);
                          }
                        });
                      }}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      tooltipHideDelay={1000}
                      domLayout="normal"
                    />
                  </div>
                </TableFoldBody>
              </TableFold>

              <Gcol variant="box-info" placement="ss">
                <Typo icon={'info'}>
                  질병코드별 치료내용 요약정보는 보험금지급정보의 불완전성으로 실제 치료내용과 차이가 있을 수 있으므로{' '}
                  <b className="text-[var(--color-primary-50)]">고객에게 알릴의무 해당여부를 반드시 확인바랍니다.</b>
                  <br />
                  사실과 다르게 고지하거나 알릴의무를 이행하지 않을 경우 보험계약이 해지되거나 보장이 제한될 수
                  있습니다.
                </Typo>
              </Gcol>
            </Gcol>
          </DialogSection>

          <DialogFooter>
            <DialogFooterArea>
              <Grow>
                <Button variant={'contained'} color={'primary'} size={'xl'} onClick={() => setAlert01(true)}>
                  알릴사항 반영하기
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

      <Dialog open={isAlert01} onOpenChange={setAlert01} isIframe={false}>
        <DialogContent showCloseButton resizable={false} className="w-[35rem]">
          <DialogHeader>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                알림
              </Typo>
            </DialogTitle>
          </DialogHeader>

          <DialogSection>
            <div className="flex flex-col gap-3 ">
              <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
                <Typo tag={'h3'} variant={'body-sm'} icon={'warning'} weight={'bold'}>
                  알릴 사항 반영
                </Typo>
                <BulletList position="col" className="gap-1">
                  <BulletListItem type="dot" size="sm">
                    조회정보를 기준으로 추정입력되며(예.완치여부)
                    <br />
                    실제 사실관계와 다를 수 있으므로 반드시 고객에게 확인 바랍니다.
                  </BulletListItem>
                  <BulletListItem type="dot" size="sm" color="warning">
                    추가 확인 또는 입력이 필요한 경우 해당 입력화면으로 이동합니다.
                  </BulletListItem>
                </BulletList>
              </Gcol>
              <Gcol placement={'cc'}>
                <Typo>알릴사항 반영하시겠습니까?</Typo>
                <Typo tag={'strong'} weight={'bold'}>
                  위 내용을 확인하였으며, 설계에 반영합니다.
                </Typo>
              </Gcol>
            </div>
          </DialogSection>

          <DialogFooter>
            <DialogFooterArea>
              <Grow>
                <Button variant={'contained'} size={'xl'}>
                  진행
                </Button>
                <DialogClose asChild>
                  <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                    닫기
                  </Button>
                </DialogClose>
              </Grow>
            </DialogFooterArea>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Ltpz207;
