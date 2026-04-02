'use client';

import { useMemo, useState } from 'react';
import { Gcol, Typo, Grow, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, } from '@uiux/Dialog';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Input } from '@uiux/Input';
import { Button } from '@uiux/Button';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { SearchIcon, ResetIcon } from '@icons';
import { DatePickerInput } from '@common/DatePicker';


import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import type { PopupBaseProps } from './types';


ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ002 = ({ open, onOpenChange }: PopupBaseProps) => {
  type DummyDataType = {
    id: number;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: string;
    field7: string;
  };
  const dummyData: DummyDataType[] = [
    { 
      id: 1, 
      field1: '구분정보',
      field2: '보험종목명 ', 
      field3: '설계번호',
      field4: '계약자',
      field5: '290000',
      field6: '2023-01-01',
      field7: '상태'
    },
    { 
      id: 2, 
      field1: '구분정보',
      field2: '보험종목명 ', 
      field3: '설계번호',
      field4: '계약자',
      field5: '290000',
      field6: '2023-01-01',
      field7: '상태'
    },
    { 
      id: 3, 
      field1: '구분정보',
      field2: '보험종목명 ', 
      field3: '설계번호',
      field4: '계약자',
      field5: '290000',
      field6: '2023-01-01',
      field7: '상태'
    },
  ];
  const columnDefs: ColDef<DummyDataType>[] = [
		{
			headerName: '구분',
			field: 'field1',
			width: 100,
		},
		{
			headerName: '보험종목명',
			field: 'field2',
			flex: 1,
		},
    {
			headerName: '설계번호',
			field: 'field3',
			width: 100,
		},
    {
			headerName: '계약자',
			field: 'field4',
			width: 100,
		},
    {
			headerName: '보험료(원)',
			field: 'field5',
      cellClass: 'text-right',
			width: 120,
      cellRenderer: numberValueFormatter,
		},
    {
			headerName: '설계일자',
			field: 'field6',
			width: 100,
		},
    {
			headerName: '상태',
			field: 'field7',
			width: 80,
		},
  ];

  type DummyDataType2 = {
    id: number;
    field1: string | number;
    field2: string | number;
    field3: string | number;
  };
  const dummyData2: DummyDataType2[] = [
    { 
      id: 1, 
      field1: '담보명',
      field2: '28990', 
      field3: '2026-01-01~2026-12-31',
    },
    { 
      id: 2, 
      field1: '담보명',
      field2: '28990', 
      field3: '2026-01-01~2026-12-31',
    },
    { 
      id: 3, 
      field1: '담보명',
      field2: '28990', 
      field3: '2026-01-01~2026-12-31',
    },
  ];
  const columnDefs2: ColDef<DummyDataType2>[] = [
		{
			headerName: '담보명',
			field: 'field1',
      cellClass: 'text-left',
			flex: 1,
		},
    {
			headerName: '가입금액(만원)',
			field: 'field2',
			width: 100,
      cellClass: 'text-right',
      cellRenderer: numberValueFormatter,
		},
    {
			headerName: '보험기간',
			field: 'field3',
			flex: 1,
		},
  ];

  const [rowData, setRowData] = useState<DummyDataType[]>(dummyData);
  const [rowData2, setRowData2] = useState<DummyDataType2[]>(dummyData2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>가입설계검색</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ002)</Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <TableFold variant={'default'}>
            <TableFoldHead title={'고객정보'} />
            <TableFoldBody className="grid-rows-[auto_1fr] gap-[2rem]">
              <Grow className='w-full' variant='box-round' placement={'bwe'}>
                <FormTable variant={'none'}
                  cols={[
                    'w-1', 'w-[30rem]',
                    'w-[10rem]', 'w-auto',
                  ]}
                >
                  <FormRow>
                    <FormCell title={'조회구분'}>
                      <NativeSelect required>
                        <NativeSelectOption value="">피보험자번호</NativeSelectOption>
                      </NativeSelect>
                      <Input value={'000000-0******'} readOnly />
                      <Button variant={'outlined'} only={'icon'} color={'gray-light'}>
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                    </FormCell>
                    <FormCell title={'설계상태'}>
                      <NativeSelect width={'auto'}>
                        {['설계중', '간편설계', '설계심사중', '설계완료', '심사의뢰', '심사중', '심사완료','청약중', '청약완료', '수납완료', '구득심사중', '구득심사완료', '청약삭제', '보험료산출', '설계취소', '지로', '반려', '취소', '가설계', '1차보험료산출', '업셀링설계', '검증'].map(option => (
                          <NativeSelectOption key={option} value={option}>{option}</NativeSelectOption>
                        ))}

                      </NativeSelect>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'설계일자'}>
                      <DatePickerInput
                        required
                        mode={'range'}
                      />
                    </FormCell>
                    <FormCell title={'고객명(영문)'}>
                      <b>hong gum</b>
                    </FormCell>
                  </FormRow>
                </FormTable>
                <Grow>
                  <Button color="coolgray" onClick={() => { }} only="default" size="lg" variant="contained">
                    조회
                  </Button>
                  <Button color={'gray'} only={'icon'} size={'lg'} variant={'outlined'} onClick={() => {}} aria-label="새로고침">
                    <ResetIcon />
                  </Button>
                </Grow>
              </Grow>
              
              <Gcol gap={2.5} placement='ss' >
                <FormTable 
                  cols={[
                    'w-[8rem]', 'w-auto',
                    'w-[8rem]', 'w-auto',
                    'w-[8rem]', 'w-auto',
                  ]}
                >
                  <FormRow>
                    <FormCell title={'동일모집인'}>
                      동일모집인 이외의 설계는 지점 (OR 매니져)에게 문의하세요.
                    </FormCell>
                    <FormCell title={'상장구분'}>
                      <b>hong gum</b>
                    </FormCell>
                    <FormCell title={'설립일자'} tdClassName={'justify-center'}>
                      <Button color="gray" onClick={() => { }} size="lg" variant="contained">
                        설계조회
                      </Button>
                    </FormCell>
                  </FormRow>
                </FormTable>

                <div className="ag-theme-alpine h-auto!" >
                  <AgGridReact<DummyDataType>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{ 
                      sortable: true, 
                      resizable: true,
                      cellClass: 'text-center',
                    }}
                    domLayout='autoHeight'

                    // selection 설정
                    rowSelection={{
                      mode: 'singleRow',
                      checkboxes: true, // 각 행에 체크박스 표시
                      enableClickSelection: false, // 셀 클릭 시 selection 변경 비활성화(오직 체크박스 클릭만 허용)
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      width: 36,
                      cellClass: 'text-center editable-cell',
                    }}
                    
                  />
                </div>

                <Grow className='w-full' placement='ss' gap={5}>
                  <TableFold>
                    <TableFoldHead title={'현재 설계'} />
                    <TableFoldBody className="grid-rows-[auto_1fr] gap-[1rem]">

                      <FormTable 
                        cols={[
                          'w-[8rem]', 'w-auto',
                          'w-[8rem]', 'w-auto',
                        ]}
                      >
                        <FormRow>
                          <FormCell title={'설계번호'}>
                            <b>234234</b>
                          </FormCell>
                          <FormCell title={'설계상태'}>
                            <b>ㅁㅁㅁㅁ</b>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'취급기관'}>
                            <b>ㅇㅇㅇㅇㅇㅇ</b>
                          </FormCell>
                          <FormCell title={'취급자'}>
                            <b>홍길동</b>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      <div className="ag-theme-alpine" >
                        <AgGridReact<DummyDataType2>
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData2}
                          columnDefs={columnDefs2}
                          defaultColDef={{ 
                            sortable: true, 
                            resizable: true,
                            cellClass: 'text-center',
                          }}
                          domLayout='autoHeight'
                        />
                      </div>
                      
                    </TableFoldBody>
                  </TableFold>
                  <TableFold>
                    <TableFoldHead title={'비교 설계'} />
                    <TableFoldBody className="grid-rows-[auto_1fr] gap-[1rem]">
                      
                      <FormTable 
                        cols={[
                          'w-[8rem]', 'w-auto',
                          'w-[8rem]', 'w-auto',
                        ]}
                      >
                        <FormRow>
                          <FormCell title={'설계번호'}>
                            <b>234234</b>
                          </FormCell>
                          <FormCell title={'설계상태'}>
                            <b>ㅁㅁㅁㅁ</b>
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'취급기관'}>
                            <b>ㅇㅇㅇㅇㅇㅇ</b>
                          </FormCell>
                          <FormCell title={'취급자'}>
                            <b>홍길동</b>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      <div className="ag-theme-alpine" >
                        <AgGridReact<DummyDataType2>
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData2}
                          columnDefs={columnDefs2}
                          defaultColDef={{ 
                            sortable: true, 
                            resizable: true,
                            cellClass: 'text-center',
                          }}
                          domLayout='autoHeight'
                        />
                      </div>

                    </TableFoldBody>
                  </TableFold>
                </Grow>

                <Gcol variant={'box-warning'} placement={'ss'} className='w-full'>
                  <Typo variant={'body-sm'} icon={'warning'}>
                    청약진행 이후에는 삭제조건부 등록 사항을 수정할 수 없습니다. 설계수정이 필요 하오니, 유의하시기 바립니다.
                  </Typo>
                </Gcol>
              </Gcol>
            </TableFoldBody>
          </TableFold>
          
        </DialogSection>

        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <DialogBottomInfo />
          </Gcol>
        </DialogFooter>
      </DialogContent>
    </Dialog>
	);
};

export default LTPZ002;
