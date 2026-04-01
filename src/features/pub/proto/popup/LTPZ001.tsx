'use client';

import { useMemo, useState } from 'react';
import { Gcol, Typo, Grow, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, } from '@uiux/Dialog';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { FileExportIcon, ResetIcon } from '@icons'
import { Input } from '@uiux/Input';


import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent } from '@aggrid';
import { useFormFields } from '@/shared/hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

interface LTPZ001Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LTPZ001 = ({ open, onOpenChange }: LTPZ001Props) => {
  type DummyDataType = {
    id: number;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
  };
  const dummyData: DummyDataType[] = [
    { 
      id: 1, 
      field1: 'sMenuInfo',
      field2: 'transComG100', 
      field3: 'RB',
      field4: 'COM10107',
      field5: '자료가 조회되었습니다.' 
    },
    
  ];
	const [rowData, setRowData] = useState<DummyDataType[]>(dummyData);
  const columnDefs: ColDef<DummyDataType>[] = useMemo(() => [
		{
			headerName: '출력물',
			field: 'field1',
			flex: 1,
			cellClass: 'text-center',
		},
		{
			headerName: '미리보기',
			field: 'field2',
			flex: 1,
      cellClass: 'text-center',
		},
    {
			headerName: '출력방식',
			field: 'field3',
			flex: 1,
      cellClass: 'text-center',
		},
    {
			headerName: '출력코드',
			field: 'field4',
			flex: 1,
      cellClass: 'text-center',
		},
    {
			headerName: '출력여부',
			field: 'field5',
			flex: 1,
      cellClass: 'text-center',
		},
    {
			headerName: '스캔대상',
			field: 'field5',
			flex: 1,
      cellClass: 'text-center',
		},
    {
			headerName: '이메일',
			field: 'field5',
			flex: 1,
      cellClass: 'text-center',
		},
    {
			headerName: '팩스',
			field: 'field5',
			flex: 1,
      cellClass: 'text-center',
		},
    {
			headerName: '모바일',
			field: 'field5',
			flex: 1,
      cellClass: 'text-center',
		},
  ], []);

  const [form, setFormField] = useFormFields({
      type01: '',
      type02: '',
      type03: '',
      type04: '',
      type05: '',
      type06: '',
      type07: '',
      type08: '',
      type09: '',
      type10: '',
      type11: '',
      type12: '',
      type13: '',
      type14: '',
      type15: '',
      type16: '',
      type17: '',
      type18: '',
      type19: '',
      type20: '',
      type21: '',
      type22: '',
      type23: '', 
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>장기출력물팝업</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ001)</Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-cols-[1fr_auto]">
          <div>
            <Grow variant={'box-info-line'} className="mb-4">
              <FormTable variant={'head'}
              caption="납입예정 리스트 테이블"
              cols={[
                'w-1', 'w-1',
                'w-1', 'w-1',
                'w-1', 'w-auto',
              ]}
            >
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Typo tag={'b'} variant={'body-lg'}>LA26029313558</Typo>
                </FormCell>
                <FormCell title={'계약자명'}>
                  <Typo tag={'b'} variant={'body-lg'}>김한화</Typo>
                </FormCell>
                <FormCell title={'상품명'}>
                  <Typo tag={'b'} variant={'body-lg'}>한화시그니처여성 건강 보험 3.0 무배당 </Typo>
                </FormCell>
              </FormRow>
               
            </FormTable>
            </Grow>
            <div className="ag-theme-alpine" >
              <AgGridReact<DummyDataType>
                noRowsOverlayComponent={AgGridEmptyComponent}
                getRowId={(params) => String(params.data.id)}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{ 
                  sortable: true, 
                  resizable: true,
                }}
                domLayout='autoHeight'

                // ag-Grid selection(좌측 체크박스) 옵션
                rowSelection={{
                  mode: 'multiRow', // 다중 선택 모드
                  headerCheckbox: true, // 헤더(전체 선택) 체크박스 표시
                  checkboxes: true, // 각 행에 체크박스 표시
                  enableClickSelection: false, // 셀 클릭 시 selection 변경 비활성화(오직 체크박스 클릭만 허용)
                  isRowSelectable: params => !params.data?.disabled && !params.data?.allDisabled, // disabled/allDisabled 행은 선택 불가
                }}
                selectionColumnDef={{
                  width: 30,
                  cellClass: 'text-center editable-cell',
                }}

                // 행 상태별 스타일 적용 예시
                rowClassRules={{
                  'my-row-disabled': params => !!params.data?.disabled, 
                  // disabled: true면 비활성화 스타일
                  'my-row-isCheck': params => !!params.data?.checked,   
                  // checked: true면 강조 스타일
                  'my-all-disabled': params => !!params.data?.allDisabled, 
                  // allDisabled: true면 완전 비활성화 스타일
                  // ...다른 규칙 추가 가능
                }}

                // 그리드 최초 렌더 시 checked: true인 행을 selection에 반영
                onGridReady={params => {
                  params.api.forEachNode(node => {
                    if (node.data?.checked) {
                      node.setSelected(true);
                    }
                  });
                }}
              />
            </div>
          </div>
          <div>
              sddd      
          </div>
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

export default LTPZ001;
