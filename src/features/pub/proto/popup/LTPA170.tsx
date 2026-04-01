'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
// import { amountUnitInputCellRenderer, AgGridEmptyComponent } from '@aggrid';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { InfoBox } from '@/shared/components/common/InfoBox';
import { FileExportIcon } from '@/shared/components/icons/CommonIcons';
import { CheckboxGroup, CheckboxGroupItem } from '@/shared/components/uiux/Checkbox';
import { formatCurrency } from '@/shared/utils/stringUtils';
ModuleRegistry.registerModules([AllCommunityModule]);


export interface LTPA170PProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LTPA170P = ({ open, onOpenChange }: LTPA170PProps) => {

  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string  | number;
    field03: string  | number;
    field04: string  | number;
    field05: string  | number;
    field06: string  | number;
    field07: string  | number;
    field08: string  | number;
    field09: string  | number;
    field10: string  | number;
    field11: string  | number;
  };
  
  const DummyData: DummyDataType[] = [
    { 
      id: 1, 
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

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '증권(설계번호)',
      field: 'field01',
      width: 190,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '상품명',
      field: 'field02',
      width: 250,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-left flex items-center justify-start',
    },
    {
      headerName: '보험시기',
      field: 'field03',
      width: 120,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '보험종기',
      field: 'field04',
      width: 120,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '최종월드',
      field: 'field05',
      width: 120,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'truncate text-center flex items-center justify-left',
    },
    {
      headerName: '담보명',
      field: 'field06',
      width: 200,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '가입금액',
      field: 'field07',
      width: 110,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-right flex items-center justify-end ',
      // valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      headerName: '누적위험명',
      field: 'field08',
      width: 110,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '누적배수',
      field: 'field09',
      width: 110,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '누적반영금액',
      field: 'field10',
      width: 110,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '계약(설계상태)',
      field: 'field11',
      width: 110,
      sortable: false, 
      filter: false, 
      suppressMovable: true, 
      resizable: true,
      cellClass: 'text-center flex items-center justify-center',
    },
  ];
  
  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  const [copyValues, setCopyValues] = React.useState<string[]>([]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'h2'} variant={'heading-lg'}>계약별누적위험</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPA170)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          <Grow placement='bwc' className="w-full" variant={'box-round'}>
            <FormTable variant={'head'} lineTop={false} caption="누적조회" cols={['w-[14rem] min-w-[14rem]', 'w-[20rem] min-w-[20rem]', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'조회구분'}>
                  김한화
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol placement='ss' className='w-full' gap={5}>
            <TableFold>
              <TableFoldHead title="피보험자의 위험정보(고객정보)"></TableFoldHead>
              <TableFoldBody>
                <Grow className="w-full">
                  <FormTable caption="피보험자의 위험정보 테이블" cols={['w-[5rem]', 'flex-1', 'w-[8rem]', 'flex-1', 'w-[5rem]', 'flex-1', 'w-[5rem]', 'flex-1']}>
                    <FormRow>
                      <FormCell title={'직업'}>
                        전기공학 개발자 및 연구원
                      </FormCell>
                      <FormCell title={'급수/등급'}>
                        2/B
                      </FormCell>
                      <FormCell title={'회사'}>
                        전기공학 개발자 및 연구원
                      </FormCell>
                      <FormCell title={'직무'}>
                        전기공학 개발자 및 연구원
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
              </TableFoldBody>  
            </TableFold>  
            <TableFold>
              <TableFoldHead title="보험증권별 위험별 누적">
                <Grow>
                  <CheckboxGroup
                    className="gap-3"
                    color="primary"
                    minSelected={0}
                    onValueChange={setCopyValues}
                    size="lg"
                    value={copyValues}
                    variant="default"
                    width="auto"
                  >
                    <CheckboxGroupItem value="display01" >
                      보험시기 표시
                    </CheckboxGroupItem>
                    <CheckboxGroupItem value="display02">
                      보험종기 표시
                    </CheckboxGroupItem>
                    <CheckboxGroupItem value="display03">
                      최종월드 표시
                    </CheckboxGroupItem>
                  </CheckboxGroup>
                  <Button
                    color="success"
                    variant="outlined"
                  >
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <Gcol className="w-full" gap={5}>
                  <div className="ag-theme-alpine min-h-[18rem]">
                    <AgGridReact<DummyDataType>
                      // getRowId 적용: id 필드를 고유 식별자로 사용
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={{ sortable: false }}
                      enableCellSpan={true}
                    />
                  </div>
                  <InfoBox bg subTitle="안내사항 노출 영역" variant="warning" className='mt-2' ></InfoBox>        
                  <InfoBox title="누적위험 초과인수기준 클릭시에도 조회가 안되는 경우 해당 설계로 인한 누적위험 초과입니다." variant="detail" bg={false} />
                </Gcol>
              </TableFoldBody>
            </TableFold>
          </Gcol>
        </DialogSection> 

        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <Grow placement={'bwc'} gap={2} className="w-full pb-5 px-6">
              <Grow>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>피보험자 누적 조회</Button>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>지침확인결과</Button>
              </Grow>
              <Grow>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </Grow>
            </Grow>
            <DialogBottomInfo />
          </Gcol>
        </DialogFooter>
    </DialogContent>
  </Dialog>    
  );
};

export default LTPA170P;
