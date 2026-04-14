'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';

import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
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
import { Checkbox } from '@uiux/Checkbox';

ModuleRegistry.registerModules([AllCommunityModule]);
// 첫번째 항목 DummyDataType
type DummyDataType = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '보통약관(상해80%이상후유장애)(간편)',
    field2: '3000',
    field3: '3000',
  },
  {
    id: 2,
    field1: '보험료납입면제대상보장(5대유해)(간편)',
    field2: '10',
    field3: '10',
  },
  {
    id: 3,
    field1: '상해사망(간편)',
    field2: '15000',
    field3: '9600',
  },
  {
    id: 4,
    field1: '골절(치아파절포함)진단비(간편)',
    field2: '10',
    field3: '1185',
  },
  {
    id: 5,
    field1: '암(4대유사암제외)특정치료비(암전문의료기관)',
    field2: '13500',
    field3: '72255',
  },
  {
    id: 6,
    field1: '암(특정유사암포함)표적항암약물허가치료비(1)',
    field2: '5000',
    field3: '11600',
  },
  {
    id: 7,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 8,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 9,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 10,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 11,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
];

// 두번째 항목 DummyDataType
type DummyDataType1 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};

const DummyData1: DummyDataType1[] = [
  {
    id: 1,
    field1: '보험료납입면제대상보장(5대유해)(간편)',
    field2: '20',
    field3: '20',
  },
  {
    id: 2,
    field1: '보통약관(상해80%이상후유장애)(간편)',
    field2: '3000',
    field3: '3000',
  },
  {
    id: 3,
    field1: '상해사망(간편)',
    field2: '15000',
    field3: '9600',
  },
  {
    id: 4,
    field1: '골절(치아파절포함)진단비(간편)',
    field2: '10',
    field3: '1850',
  },
  {
    id: 5,
    field1: '암(4대유사암제외)특정치료비(암전문의료기관)',
    field2: '13500',
    field3: '72255',
  },
  {
    id: 6,
    field1: '암(특정유사암포함)표적항암약물허가치료비(1)',
    field2: '5000',
    field3: '11600',
  },
  {
    id: 7,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 8,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 9,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 10,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 11,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
];

// 세번째 항목 DummyDataType
type DummyDataType2 = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field1: '보험료납입면제대상보장(5대유해)(간편)',
    field2: '30',
    field3: '30',
  },
  {
    id: 2,
    field1: '보통약관(상해80%이상후유장애)(간편)',
    field2: '3000',
    field3: '3000',
  },
  {
    id: 3,
    field1: '상해사망(간편)',
    field2: '15000',
    field3: '9600',
  },
  {
    id: 4,
    field1: '골절(치아파절포함)진단비(간편)',
    field2: '10',
    field3: '3850',
  },
  {
    id: 5,
    field1: '암(4대유사암제외)특정치료비(암전문의료기관)',
    field2: '13500',
    field3: '72255',
  },
  {
    id: 6,
    field1: '암(특정유사암포함)표적항암약물허가치료비(1)',
    field2: '5000',
    field3: '11600',
  },
  {
    id: 7,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 8,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 9,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 10,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
  {
    id: 11,
    field1: '질병사항(간편)',
    field2: '10000',
    field3: '10000',
  },
];

export const Ltpa02004 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [rowData1] = React.useState<DummyDataType1[]>(DummyData1);
  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);

  // DummyDataType
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 1,
      cellClass: 'text-left',
      editable: false,
      colSpan: (params) => {
        // 합계 행이면 이름+서브레이블 합치기
        if (params.data?.id === 0) return 2;
        return 1;
      },
    },
    {
      headerName: '가입금액(원)',
      field: 'field2',
      width: 82,
      editable: false,
      valueFormatter: numberValueFormatter,
      colSpan: (params) => {
        // 합계 행이면 숨김
        if (params.data?.id === 0) return 0;
        return 1;
      },
      cellClass: (params) => {
        if (params.data?.id === 0) return 'hidden';
        return 'text-right';
      },
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      width: 82,
      valueFormatter: numberValueFormatter, 
      cellClass: (params) => {
        if (params.data?.id === 0) return 'text-right font-bold bg-gray-100';
        return 'text-right';
      },
      editable: false, 
    },
  ];

  // DummyDataType1
  const columnDefs1: ColDef<DummyDataType1>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 1,
      cellClass: 'text-left',
      editable: false,
      colSpan: (params) => {
        // 합계 행이면 이름+서브레이블 합치기
        if (params.data?.id === 0) return 2;
        return 1;
      },
    },
    {
      headerName: '가입금액(원)',
      field: 'field2',
      width: 86,
      editable: false,
      valueFormatter: numberValueFormatter,
      colSpan: (params) => {
        // 합계 행이면 숨김
        if (params.data?.id === 0) return 0;
        return 1;
      },
      cellClass: (params) => {
        if (params.data?.id === 0) return 'hidden';
        return 'text-right';
      },
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      width: 86,
      valueFormatter: numberValueFormatter, 
      cellClass: (params) => {
        if (params.data?.id === 0) return 'text-right font-bold bg-gray-100';
        return 'text-right';
      },
      editable: false, 
    },
  ];

  // DummyDataType2
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '담보명',
      field: 'field1',
      flex: 1,
      cellClass: 'text-left',
      editable: false,
      colSpan: (params) => {
        // 합계 행이면 이름+서브레이블 합치기
        if (params.data?.id === 0) return 2;
        return 1;
      },
    },
    {
      headerName: '가입금액(원)',
      field: 'field2',
      width: 86,
      editable: false,
      valueFormatter: numberValueFormatter,
      colSpan: (params) => {
        // 합계 행이면 숨김
        if (params.data?.id === 0) return 0;
        return 1;
      },
      cellClass: (params) => {
        if (params.data?.id === 0) return 'hidden';
        return 'text-right';
      },
    },
    {
      headerName: '보험료(원)',
      field: 'field3',
      width: 86,
      valueFormatter: numberValueFormatter, 
      cellClass: (params) => {
        if (params.data?.id === 0) return 'text-right font-bold bg-gray-100';
        return 'text-right';
      },
      editable: false, 
    },
  ];

  // 첫 번째 합계 행 생성 (field3가 숫자인 값만 합산)
  const sumRow = React.useMemo(() => {
    const total = rowData.reduce((acc, cur) => {
      const field3Num = typeof cur.field3 === 'number' ? cur.field3 : Number(cur.field3);
      return acc + (isNaN(field3Num) ? 0 : field3Num);
    }, 0);
    return [{ 
      id: 0, 
      field1: '예상보험료', 
      field2: '',           
      field3: total 
    }];

  }, [rowData]);

  // 두 번째 합계 행 생성 (rowData1 기준)
  const sumRow1 = React.useMemo(() => {
    const total = rowData1.reduce((acc, cur) => {
      const field3Num = typeof cur.field3 === 'number' ? cur.field3 : Number(cur.field3);
      return acc + (isNaN(field3Num) ? 0 : field3Num);
    }, 0);
    return [
      {
        id: 0,
        field1: '예상보험료',
        field2: '',
        field3: total,
      },
    ];
  }, [rowData1]);

  // 세 번째 합계 행 생성 (rowData2 기준)
  const sumRow2 = React.useMemo(() => {
    const total = rowData2.reduce((acc, cur) => {
      const field3Num = typeof cur.field3 === 'number' ? cur.field3 : Number(cur.field3);
      return acc + (isNaN(field3Num) ? 0 : field3Num);
    }, 0);
    return [
      {
        id: 0,
        field1: '예상보험료',
        field2: '',
        field3: total,
      },
    ];
  }, [rowData2]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              추천설계비교
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Grow gap={3}>
            <Gcol className="overflow-hidden border border-[#CBE3FF] rounded-[0.6rem] gap-5">
              <Grow placement='bws' className="w-full bg-[#EFF8FF] p-[1rem] rounded-t-[0.6rem]">
                <Gcol placement="ss">
                  <Typo tag={'strong'} variant={'body-lg'} weight={'bold'}>
                    한화 3N5 더간편건강보험(세만기형) 2601
                  </Typo>
                  <Typo tag={'p'} variant={'body-sm'} color={'gray'}>
                    기본형·납입면제운영형·3N5간편고간편고지형III
                  </Typo> 
                </Gcol>
                <Grow>
                  <Checkbox
                    color="primary"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                  ></Checkbox>
                </Grow>
              </Grow>
              <Grow className="w-full px-[1rem]">
                <TableFold>
                  <TableFoldBody>
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        domLayout="autoHeight"
                        // 합계 행 설정
                        pinnedBottomRowData={sumRow}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>   
              </Grow>
            </Gcol>
            {/* 두번째 항목 */}
            <Gcol className="overflow-hidden border border-[#CBE3FF] rounded-[0.6rem] gap-5">
              <Grow placement='bws' className="w-full bg-[#EFF8FF] p-[1rem] rounded-t-[0.6rem]">
                <Gcol placement="ss">
                  <Typo tag={'strong'} variant={'body-lg'} weight={'bold'}>
                    한화 3N5 더간편건강보험(세만기형) 2601
                  </Typo>
                  <Typo tag={'p'} variant={'body-sm'} color={'gray'}>
                    기본형·납입면제운영형·3N5간편고간편고지형III
                  </Typo> 
                </Gcol>
                <Grow>
                  <Checkbox
                    color="primary"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                  ></Checkbox>
                </Grow>
              </Grow>
              <Grow className="w-full px-[1rem]">
                <TableFold>
                  <TableFoldBody>
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType1>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData1}
                        columnDefs={columnDefs1}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        domLayout="autoHeight"
                        // 합계 행 설정
                        pinnedBottomRowData={sumRow1}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>   
              </Grow>
            </Gcol>
             {/* 세번째 항목 */}
             <Gcol className="overflow-hidden border border-[#CBE3FF] rounded-[0.6rem] gap-5">
              <Grow placement='bws' className="w-full bg-[#EFF8FF] p-[1rem] rounded-t-[0.6rem]">
                <Gcol placement="ss">
                  <Typo tag={'strong'} variant={'body-lg'} weight={'bold'}>
                    한화 3N5 더간편건강보험(세만기형) 2601
                  </Typo>
                  <Typo tag={'p'} variant={'body-sm'} color={'gray'}>
                    기본형·납입면제운영형·3N5간편고간편고지형III
                  </Typo> 
                </Gcol>
                <Grow>
                  <Checkbox
                    color="primary"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                  ></Checkbox>
                </Grow>
              </Grow>
              <Grow className="w-full px-[1rem]">
                <TableFold>
                  <TableFoldBody>
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType2>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData2}
                        columnDefs={columnDefs2}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        domLayout="autoHeight"
                        // 합계 행 설정
                        pinnedBottomRowData={sumRow2}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>   
              </Grow>
            </Gcol>
          </Grow>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
                설계생성(0)
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
  );
};
