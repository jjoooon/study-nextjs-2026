/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  editableSelectCellRenderer,
  numberValueFormatter,
  createInsertCopiedRowButtonCellRenderer,
  useDynamicColumnWidths,
} from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { SearchIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogClose,
  DialogFooterArea,
} from '@uiux/Dialog';

import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import type { ColDef, EditableCallbackParams, ICellRendererParams, RowSelectedEvent } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState, useRef } from 'react';

import * as React from 'react';

type DummyDataType = {
  id: number;
  isCheck: boolean;
  isDuplicate: boolean;
  productName: string;
  badge?: string[];
  attribute: boolean;
  coverageAmount: string;
  premium: number;
  expiryPeriod: string;
  paymentPeriod: string;
  canEditExpiry: boolean;
};

const dummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: true, // 첫 번째 행을 선택 상태로
    isDuplicate: false, // 원본 행은 항상 false
    productName:
      '기본형 실손의료비(상해급여)(갱신형)기본형 실손의료비(상해급여)(갱신형)기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: true,
    coverageAmount: '5천만원(통원20만원)',
    premium: 1377,
    expiryPeriod: '01년만기',
    paymentPeriod: '전기납',
    canEditExpiry: true,
  },
  {
    id: 2,
    isCheck: false,
    isDuplicate: false, // 원본 행은 항상 false
    productName: '기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: false,
    coverageAmount: '2천만원(통원20만원)',
    premium: 9999999,
    expiryPeriod: '01년만기',
    paymentPeriod: '전기납',
    canEditExpiry: true,
  },
  {
    id: 3,
    isCheck: false,
    isDuplicate: false, // 원본 행은 항상 false
    productName: '기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: true,
    coverageAmount: '3천만원(통원20만원)',
    premium: 159999,
    expiryPeriod: '01년만기',
    paymentPeriod: '전기납',
    canEditExpiry: true,
  },
  {
    id: 4,
    isCheck: false,
    isDuplicate: false, // 원본 행은 항상 false
    productName: '기본형 실손의료비(상해급여)(갱신형)',
    badge: ['갱신'],
    attribute: false,
    coverageAmount: '4천만원(통원20만원)',
    premium: 2323230,
    expiryPeriod: '01년만기',
    paymentPeriod: '전기납',
    canEditExpiry: true,
  },
];

const Ltpz010 = () => {
  const [relationValue, setRelationValue] = useState('');
  const [rowData, setRowData] = useState<DummyDataType[]>(dummyData);
  const [, setErrorRows] = useState<number[]>(dummyData.filter((row) => !row.isCheck).map((row) => row.id));
  const gridRef = useRef<AgGridReact<DummyDataType>>(null);

  // 중복 행 추가 추적용 ref
  const pendingSelectIdRef = useRef<number | null>(null);
  // 중복 행 추가/삭제 추적 setRowData 래퍼
  const setRowDataWithTracking = useCallback(
    (updater: DummyDataType[] | ((prev: DummyDataType[]) => DummyDataType[])) => {
      setRowData((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        if (next.length > prev.length) {
          const prevIds = new Set(prev.map((r) => r.id));
          const newDuplicate = next.find((r) => !prevIds.has(r.id) && r.isDuplicate);
          if (newDuplicate) {
            pendingSelectIdRef.current = newDuplicate.id;
          }
        }
        return next;
      });
    },
    []
  );

  // 중복버튼 여부에 따른 셀 렌더러 (DummyDataType 기준)
  const duplicateRenderer = useMemo(
    () => (params: ICellRendererParams<DummyDataType>) => {
      // 복사된 행(isDuplicate: true)에는 버튼 자체를 렌더하지 않음
      if (params.data?.isDuplicate) return null;
      return createInsertCopiedRowButtonCellRenderer<DummyDataType, 'id'>(setRowDataWithTracking, {
        idKey: 'id',
        getNextId: (rows) => rows.reduce((maxId, row) => (row.id > maxId ? row.id : maxId), 0) + 1,
        patchCopiedRow: (originalRow, nextId) => ({
          ...originalRow,
          id: nextId,
          isCheck: true,
          isDuplicate: true,
        }),
        isVisible: (p) => Boolean(p.data?.isCheck), // checked 행에만 활성화
        ariaLabel: '동일 담보 추가',
      })(params);
    },
    [setRowDataWithTracking]
  );

  // 검색버튼 여부에 따른 셀 렌더러
  const attributeRenderer = (params: ICellRendererParams<DummyDataType>) => {
    if (!params.value) {
      return null;
    }

    return (
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-1">
        <Button only={'icon'} variant={'none'} size={'sm'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </div>
    );
  };

  // 담보명 셀 렌더러
  const titleRenderer = useCallback((params: ICellRendererParams<DummyDataType>) => {
    return (
      <Grow className="h-full pr-1.5" placement={'bwc'}>
        <p className="w-full flex-1 truncate pl-2">{params.data?.productName}</p>
        {params.data?.badge && (
          <Grow className="shrink-0">
            {params.data.badge.includes('갱신') && (
              <Badge color={'blue'} className="w-[3rem]">
                갱신
              </Badge>
            )}
          </Grow>
        )}
      </Grow>
    );
  }, []);

  // 가입금액 셀 렌더러
  const coverageAmountCellRenderer = (params: ICellRendererParams<DummyDataType>) =>
    editableSelectCellRenderer<DummyDataType>(params);

  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '중복',
        field: 'isDuplicate',
        width: attributeColumnWidth(30),
        cellClass: 'text-center',
        sortable: false,
        cellRenderer: duplicateRenderer,
      },
      {
        headerName: '담보명',
        field: 'productName',
        flex: 10,
        cellRenderer: titleRenderer,
      },
      {
        headerName: '속성',
        field: 'attribute',
        width: attributeColumnWidth(30),
        cellClass: 'text-center',
        cellRenderer: attributeRenderer,
        sortable: false,
      },
      {
        headerName: '가입금액(만원)',
        field: 'coverageAmount',
        minWidth: attributeColumnWidth(160),
        flex: 1,
        cellClass: () => 'w-auto text-centerleft editable-cell [&_input]:text-left!',
        sortable: false,
        filter: false,
        editable: (params: EditableCallbackParams<DummyDataType>) => {
          // canEditExpiry가 true인 행만 수정 가능
          return params.data?.canEditExpiry === true;
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['5천만원(통원20만원)', '2천만원(통원20만원)', '3천만원(통원20만원)', '4천만원(통원20만원)'],
        },
        cellRenderer: coverageAmountCellRenderer,
      },
      {
        headerName: '보험료(만원)',
        field: 'premium',
        minWidth: attributeColumnWidth(100),
        flex: 1,
        cellClass: 'text-right',
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '만기',
        field: 'expiryPeriod',
        minWidth: attributeColumnWidth(70),
        flex: 1,
        cellClass: 'text-center px-[0.2rem]!',
        sortable: false,
        filter: false,
      },
      {
        headerName: '납기',
        field: 'paymentPeriod',
        minWidth: attributeColumnWidth(70),
        flex: 1,
        cellClass: 'text-center px-[0.2rem]!',
        sortable: false,
        filter: false,
      },
    ],
    [attributeColumnWidth]
  );

  const onCellValueChanged = useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  const handleRowDataUpdated = useCallback(() => {
    const pendingSelectId = pendingSelectIdRef.current;

    if (pendingSelectId === null) {
      return;
    }

    const node = gridRef.current?.api.getRowNode(String(pendingSelectId));

    if (!node) {
      return;
    }

    node.setSelected(true);
    pendingSelectIdRef.current = null;
  }, []);

  const handleRowSelected = useCallback((event: RowSelectedEvent<DummyDataType>) => {
    const data = event.data;

    if (!data) {
      return;
    }

    const isSelected = Boolean(event.node.isSelected());

    if (!isSelected && data.isDuplicate) {
      setRowData((prev) => prev.filter((row) => row.id !== data.id));
      if (pendingSelectIdRef.current === data.id) {
        pendingSelectIdRef.current = null;
      }
      return;
    }

    setRowData((prev) => prev.map((row) => (row.id === data.id ? { ...row, isCheck: isSelected } : row)));
  }, []);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              동시가입설계상세
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ010)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant="none" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell
                  title={'설계번호'}
                  tdClassName="grid grid-cols-[auto_auto_auto_1fr] items-center gap-1 w-full"
                >
                  <Input aria-label="" width={130} value={'LA26020945959594'} readOnly />
                  -
                  <Input aria-label="" width={30} value={'1'} readOnly />
                  <Input aria-label="" variant="info" value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          {/* 2026-05-27 전체 TableFold에 accordion 추가, gap 수정 */}
          <Grid placement={'ss'} className="w-full gap-3 grid-rows-[auto_1fr]">
            <Gcol gap={3}>
              <TableFold variant={'accordion'}>
                <TableFoldHead title="계약기본사항"></TableFoldHead>
                <TableFoldBody>
                  <FormTable caption={'계약기본사항'} cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'상품선택'} colSpan={3}>
                        <RadioGroup className="gap-2" onValueChange={() => {}} width="full" defaultValue="4세대신손">
                          {[
                            { value: '4세대신손', label: '4세대신손' },
                            { value: '간편실손', label: '간편실손' },
                          ].map((option, index) => (
                            <RadioGroupItem key={index} value={option.value}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'보험시기'}>2026-03-06</FormCell>
                      <FormCell title={'유효설계'}>2026-03-06까지</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'보장내용변경주기'}>
                        <RadioGroup className="gap-2" onValueChange={() => {}} width="full" defaultValue="05년만기">
                          <RadioGroupItem value="05년만기">05년만기</RadioGroupItem>
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'납기'}>
                        <RadioGroup className="gap-2" onValueChange={() => {}} width="full" defaultValue="전기납">
                          <RadioGroupItem value="전기납">전기납</RadioGroupItem>
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'납기주기'}>
                        <RadioGroup className="gap-2" onValueChange={() => {}} width="full" defaultValue="월납">
                          {[
                            { value: '월납', id: 'Monthly1', label: '월납' },
                            { value: '2월납', id: 'Monthly2', label: '2월납' },
                            { value: '3월납', id: 'Monthly3', label: '3월납' },
                            { value: '6월납', id: 'Monthly6', label: '6월납' },
                            { value: '년납', id: 'Yearly1', label: '년납' },
                          ].map((option, index) => (
                            <RadioGroupItem key={index} value={option.value}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'갱신주기'}>
                        <RadioGroup className="gap-2" onValueChange={() => {}} width="full" defaultValue="1년">
                          <RadioGroupItem value="1년">1년</RadioGroupItem>
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'태아여부'}>
                        <Grow placement={'sc'}>
                          <CheckboxGroup className="gap-3" onValueChange={() => {}} variant="default">
                            <CheckboxGroupItem value="a">가입</CheckboxGroupItem>
                            <CheckboxGroupItem value="b">다태아</CheckboxGroupItem>
                          </CheckboxGroup>
                          <Button
                            color="secondary"
                            onClick={() => {}}
                            only="default"
                            size="lg"
                            variant="outlined"
                            className="ml-[1rem]"
                          >
                            다태아 연계
                          </Button>
                        </Grow>
                      </FormCell>

                      <FormCell title={'일신부'}>
                        <Input aria-label="" width={70} value={''} readOnly />
                        <Input aria-label="" width={140} value={''} readOnly />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>

              <TableFold variant={'accordion'}>
                <TableFoldHead title="피보험자/계약자"></TableFoldHead>
                <TableFoldBody className="gap-2">
                  {' '}
                  {/* 2026-05-27 gap 추가 */}
                  <FormTable caption={'피보험자'} cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'피보험자'}>
                        <Input aria-label="" width={70} value={'김한화'} readOnly />
                        <Input aria-label="" width={140} value={'910101-1******'} readOnly />
                      </FormCell>
                      <FormCell title={'알림사항'}>
                        <Grow placement={'bwc'}>
                          <Grow>
                            <Input aria-label="" width={40} value={'무'} readOnly />
                            <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                              입력
                            </Button>
                          </Grow>
                          <Checkbox onCheckedChange={() => {}}>의료급여수급권자할인</Checkbox>
                        </Grow>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'계약자'}>
                        <Input aria-label="" width={70} value={'김한화'} readOnly />
                        <Input aria-label="" width={140} value={'910101-1******'} readOnly />
                      </FormCell>
                      <FormCell title={'주피와관계'}>
                        주피보험자(김한화)는 계약자의
                        <NativeSelect
                          aria-label="개인정보취득경로 선택"
                          width={100}
                          readOnly
                          value={relationValue}
                          onChange={(event) => setRelationValue(event.target.value)}
                        >
                          {[
                            { value: 'selection', label: '선택1' },
                            { value: 'selection2', label: '선택2' },
                          ].map((option, idx) => (
                            <NativeSelectOption key={idx} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                  {/* 2026-05-27 위치 변경 */}
                  <FormTable caption={'합계보험료'} cols={['w-[14rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'합계보험료'}>
                        <Input aria-label="" width={200} value={'123456'} commaAmount readOnly />원
                        <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                          출생후 보혐료
                        </Button>
                        <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                          보험료 계산
                        </Button>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
            </Gcol>

            <TableFold variant={'accordion'}>
              <TableFoldHead title="담보가입사항" />
              <TableFoldBody>
                <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                  <AgGridReact<DummyDataType>
                    ref={gridRef}
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      cellClass: 'p-0',
                      cellStyle: { padding: 0 },
                    }}
                    singleClickEdit={true}
                    onCellValueChanged={onCellValueChanged}
                    rowSelection={{
                      mode: 'multiRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      cellClass: 'text-center editable-cell',
                      width: 30,
                    }}
                    animateRows={false}
                    domLayout="normal"
                    onRowDataUpdated={handleRowDataUpdated}
                    onRowSelected={handleRowSelected}
                    onGridReady={(params) => {
                      params.api.forEachNode((node) => {
                        if (node.data?.isCheck) {
                          node.setSelected(true);
                        }
                      });
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              {/* 2026-05-26 텍스트 수정 */}
              <Button variant={'contained'} size={'xl'}>
                확인
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

export default Ltpz010;
