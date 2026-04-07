'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useRef, useState } from 'react';
import * as React from 'react';
import { amountUnitInputCellRenderer, AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
} from '@uiux/Dialog';

import { Input } from '@uiux/Input';

import type { PopupBaseProps } from './types';
ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPA160 = ({ open, onOpenChange }: PopupBaseProps) => {
  type DummyDataType = {
    id: number;
    accName: string;
    accRisk: string;
    accDesignAmt: string;
    accTotalAmt: string;
    upperAccName: string;
    upperAccRisk: string;
    upperDesignAmt: string;
    upperTotalAmt: string;
  };

  const DummyData: DummyDataType[] = [
    {
      id: 1,
      accName: '상해사망후유',
      accRisk: '일반상해사망',
      accDesignAmt: '1,000,000',
      accTotalAmt: '1,000,000',
      upperAccName: '상해사망후유',
      upperAccRisk: '일반상해사망',
      upperDesignAmt: '1,000,000',
      upperTotalAmt: '1,000,000',
    },
    {
      id: 2,
      accName: '상해사망후유',
      accRisk: '일반상해사망후유장애',
      accDesignAmt: '1,000,000',
      accTotalAmt: '1,000,000',
      upperAccName: '상해사망후유',
      upperAccRisk: '일반상해사망후유장애',
      upperDesignAmt: '1,000,000',
      upperTotalAmt: '1,000,000',
    },
    {
      id: 3,
      accName: '상해사망후유',
      accRisk: '교통상해사망',
      accDesignAmt: '1,000,000',
      accTotalAmt: '1,000,000',
      upperAccName: '상해사망후유',
      upperAccRisk: '교통상해사망',
      upperDesignAmt: '1,000,000',
      upperTotalAmt: '1,000,000',
    },
    {
      id: 4,
      accName: '특정상해',
      accRisk: '통합상해진단비(경증)(연1회한)',
      accDesignAmt: '1,000,000',
      accTotalAmt: '1,000,000',
      upperAccName: '특정상해',
      upperAccRisk: '통합상해진단비(경증)(연1회한)',
      upperDesignAmt: '1,000,000',
      upperTotalAmt: '1,000,000',
    },
    {
      id: 5,
      accName: '특정상해',
      accRisk: '통합상해진단비(중증)(연1회한)',
      accDesignAmt: '1,000,000',
      accTotalAmt: '1,000,000',
      upperAccName: '특정상해',
      upperAccRisk: '통합상해진단비(중증)(연1회한)',
      upperDesignAmt: '1,000,000',
      upperTotalAmt: '1,000,000',
    },
    {
      id: 6,
      accName: '특정상해',
      accRisk: '골절진단+통합상해진단(중등증)(합)',
      accDesignAmt: '1,000,000',
      accTotalAmt: '1,000,000',
      upperAccName: '특정상해',
      upperAccRisk: '골절진단+통합상해진단(중등증)(합)',
      upperDesignAmt: '1,000,000',
      upperTotalAmt: '1,000,000',
    },
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '누적명',
      field: 'accName',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      spanRows: true,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '누적위험명',
      field: 'accRisk',
      width: 250,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center bg-white!`,
    },
    {
      headerName: '설계별 누적금액',
      field: 'accDesignAmt',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '전체누적금액',
      field: 'accTotalAmt',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '상위누적명',
      field: 'upperAccName',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      spanRows: true,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '누적위험명',
      field: 'upperAccRisk',
      width: 250,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center bg-white!`,
    },
    {
      headerName: '설계별 누적금액',
      field: 'upperDesignAmt',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '전체누적금액',
      field: 'upperTotalAmt',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right bg-white!`,
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'h2'} variant={'heading-lg'}>
              담보내용상세
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA160)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <TableFold>
            <TableFoldHead title="피보험자의 위험정보(고객정보)"></TableFoldHead>
            <TableFoldBody></TableFoldBody>
          </TableFold>
          <Gcol className="w-full gap-[1.2rem]">
            <Grow className="w-full">
              <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
                <AgGridReact<DummyDataType>
                  // getRowId 적용: id 필드를 고유 식별자로 사용
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{ sortable: false }}
                  enableCellSpan={true}
                  // animateRows={true}
                  // alwaysShowHorizontalScroll={true}
                  // singleClickEdit={true}
                />
              </div>
            </Grow>
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <DialogFooterArea>
              <Grow>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  지침확인결과
                </Button>
              </Grow>
              <Grow>
                <Button color={'gray'} size={'xl'} variant={'outlined'}>
                  버튼
                </Button>
                <Button variant={'contained'} size={'xl'}>
                  저장
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </Grow>
            </DialogFooterArea>
            <DialogBottomInfo />
          </Gcol>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LTPA160;
