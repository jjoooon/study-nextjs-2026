'use client';

import { useState } from 'react';
import { Gcol, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea, } from '@uiux/Dialog';

import { AgGridEmptyComponent } from '@aggrid';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import type { PopupBaseProps } from './types';


ModuleRegistry.registerModules([AllCommunityModule]);


export const LTPZ998 = ({ open, onOpenChange }: PopupBaseProps) => {
  type DummyDataType = {
    id: number;
    field1: string;
    field2: string;
    field3: string;
  };
    
  const dummyData: DummyDataType[] = [
    { id: 1, field1: '예산-리스크관리', field2: '경영기획 관리자', field3: '조회' },
    { id: 2, field1: '계약관리-신계약', field2: '영업지점 담당자', field3: '조회,등록' },
    { id: 3, field1: '계약관리-보험료', field2: '영업지점 관리자', field3: '조회,수정' },
    { id: 4, field1: '보상관리-사고접수', field2: '보상센터 담당자', field3: '조회,등록,수정' },
    { id: 5, field1: '보상관리-지급심사', field2: '보상센터 관리자', field3: '조회,승인' },
    { id: 6, field1: '고객관리-고객정보', field2: '고객서비스 담당자', field3: '조회' },
    { id: 7, field1: '고객관리-계약조회', field2: '고객서비스 관리자', field3: '조회,수정' },
    { id: 8, field1: '상품관리-상품등록', field2: '상품개발 담당자', field3: '조회,등록,수정,삭제' },
    { id: 9, field1: '통계-영업실적', field2: '경영기획 담당자', field3: '조회' },
    { id: 10, field1: '시스템관리-권한설정', field2: '시스템 관리자', field3: '조회,등록,수정,삭제' },
  ];
	const [rowData, setRowData] = useState<DummyDataType[]>(dummyData);

	const columnDefs: ColDef<DummyDataType>[] = [
		{
			headerName: '메뉴명',
			field: 'field1',
			flex: 1,
			cellClass: 'text-center',
		},
		{
			headerName: '역할명',
			field: 'field2',
			flex: 1,
      cellClass: 'text-center',
		},
    {
			headerName: '역할권한',
			field: 'field3',
			flex: 1,
      cellClass: 'text-center',
		},
	];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>화면권한보기</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ998)</Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
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
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
	);
};

export default LTPZ998;
