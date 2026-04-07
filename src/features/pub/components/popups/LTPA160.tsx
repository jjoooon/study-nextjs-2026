'use client';

import { numberValueFormatter } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ResetIcon } from '@icons';
import { FileExportIcon, SearchIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import type { PopupBaseProps } from './types';
import { useFormFields } from '@/shared/hooks/useFormFields';

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
      accDesignAmt: '1000000',
      accTotalAmt: '1000000',
      upperAccName: '상해사망후유',
      upperAccRisk: '일반상해사망',
      upperDesignAmt: '1000000',
      upperTotalAmt: '1000000',
    },
    {
      id: 2,
      accName: '상해사망후유',
      accRisk: '일반상해사망후유장애',
      accDesignAmt: '1000000',
      accTotalAmt: '1000000',
      upperAccName: '상해사망후유',
      upperAccRisk: '일반상해사망후유장애',
      upperDesignAmt: '1000000',
      upperTotalAmt: '1000000',
    },
    {
      id: 3,
      accName: '상해사망후유',
      accRisk: '교통상해사망',
      accDesignAmt: '1000000',
      accTotalAmt: '1000000',
      upperAccName: '상해사망후유',
      upperAccRisk: '교통상해사망',
      upperDesignAmt: '1000000',
      upperTotalAmt: '1000000',
    },
    {
      id: 4,
      accName: '특정상해',
      accRisk: '통합상해진단비(경증)(연1회한)',
      accDesignAmt: '1000000',
      accTotalAmt: '1000000',
      upperAccName: '특정상해',
      upperAccRisk: '통합상해진단비(경증)(연1회한)',
      upperDesignAmt: '1000000',
      upperTotalAmt: '1000000',
    },
    {
      id: 5,
      accName: '특정상해',
      accRisk: '통합상해진단비(중증)(연1회한)',
      accDesignAmt: '1000000',
      accTotalAmt: '1000000',
      upperAccName: '특정상해',
      upperAccRisk: '통합상해진단비(중증)(연1회한)',
      upperDesignAmt: '1000000',
      upperTotalAmt: '1000000',
    },
    {
      id: 6,
      accName: '특정상해',
      accRisk: '골절진단+통합상해진단(중등증)(합)',
      accDesignAmt: '1000000',
      accTotalAmt: '1000000',
      upperAccName: '특정상해',
      upperAccRisk: '골절진단+통합상해진단(중등증)(합)',
      upperDesignAmt: '1000000',
      upperTotalAmt: '1000000',
    },
  ];
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '상위누적명',
      field: 'accName',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      spanRows: true,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center `,
    },
    {
      headerName: '누적위험명',
      field: 'accRisk',
      width: 250,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center`,
    },
    {
      headerName: '설계별 누적금액',
      field: 'accDesignAmt',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right`,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '전체누적금액',
      field: 'accTotalAmt',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right`,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
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
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center `,
    },
    {
      headerName: '누적위험명',
      field: 'upperAccRisk',
      width: 250,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-center`,
    },
    {
      headerName: '설계별 누적금액',
      field: 'upperDesignAmt',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right`,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '전체누적금액',
      field: 'upperTotalAmt',
      flex: 1,
      sortable: false,
      filter: false,
      suppressMovable: true,
      resizable: true,
      cellClass: `text-right`,
      valueParser: (params) => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter,
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              담보내용상세
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA160)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          {/* 조회 */}
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormRow>
                <FormCell title={'조회구분'}>
                  <NativeSelect
                    aria-label="항목 선택"
                    className="w-40"
                    value={form.type01}
                    required
                    onChange={(e) => setFormField('type01', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type01-1', label: '설계번호' },
                      { value: 'selection2', id: 'type01-2', label: '증권번호' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input
                    className="w-40"
                    value={form.type02 || 'LA260204310632'}
                    onChange={(e) => setFormField('type02', e.target.value)}
                  />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input value={'한화 더 건강한 1040종합..'} readOnly />
                </FormCell>
                <FormCell title={'피보험자정보'}>
                  <Grow>
                    <NativeSelect
                      aria-label="항목 선택"
                      value={form.type03}
                      onChange={(e) => setFormField('type03', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type03-1', label: '김한화(890823-1******)' },
                        { value: 'selection2', id: 'type03-2', label: '박한화(890823-1******)' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>

            <Grow>
              <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                조회
              </Button>
              <Button
                color={'gray'}
                only={'icon'}
                size={'lg'}
                variant={'outlined'}
                onClick={() => {}}
                aria-label="새로고침"
              >
                <ResetIcon />
              </Button>
            </Grow>
          </Grow>

          {/* 조회 정보 */}
          <Gcol placement="ss" className="w-full" gap={5}>
            <TableFold>
              <TableFoldHead title="피보험자의 위험정보(고객정보)">
                <Grow>
                  <Button color="success" variant="outlined">
                    엑셀내보내기
                    <FileExportIcon />
                  </Button>
                </Grow>
              </TableFoldHead>
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
              <TableFoldHead title="피보험자의 위험별 누적(상단배치 후 하위누적 합산 시 적색은 단순합산, 주황색은 최대값합산)" />
              <TableFoldBody>
                <Gcol gap={5}>
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={{ sortable: false }}
                      enableCellSpan={true}
                      domLayout="autoHeight"
                    />
                  </div>
                  <Gcol className="w-full">
                    <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
                      <Typo variant={'body-sm'} icon={'warning'}>
                        <b>주의사항 노출 영역</b>
                      </Typo>
                    </Gcol>
                    <Gcol placement={'ss'} className="w-full">
                      <Typo variant={'body-sm'} icon={'detail'}>
                        자세한 합산 누적인수기준은 [스마트가이드 - 인수지침 - 장기보험 - 인보험 - 3. 담보별
                        인수기준]에서 확인해주시면 됩니다.
                      </Typo>
                    </Gcol>
                  </Gcol>
                </Gcol>
              </TableFoldBody>
            </TableFold>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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
