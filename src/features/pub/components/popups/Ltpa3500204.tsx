'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ResetIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/uiux/Table';
import { Checkbox } from '@/shared/components/uiux/Checkbox';
import { GridIcon } from 'lucide-react';
import { t } from 'i18next';

ModuleRegistry.registerModules([AllCommunityModule]);

// dummy data
type DummyDataType = {
  id: number;
  isCheck: boolean | null;
  field01: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: true,
    field01: '전이암특정치료비(종합병원)(각연간1회한)',
  },
  {
    id: 2,
    isCheck: null,
    field01: '- 전이암특정치료비(종합병원)(각연간1회한)',
  },
  {
    id: 3,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(종합병원)(연간1회한)',
  },
  {
    id: 4,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(종합병원)(연간1회한)',
  },
  {
    id: 5,
    isCheck: true,
    field01: '전이암특정치료비(암전문의료기관(상급종합병원등))(각연간1회한)',
  },
  {
    id: 6,
    isCheck: null,
    field01: '- 전이암특정치료비(수술)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 7,
    isCheck: null,
    field01: '- 전이암특정치료비(항암방사선치료)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 8,
    isCheck: null,
    field01: ' - 전이암특정치료비(항암약물치료)(암전문의료기관(상급종합병원등))(연간1회한)',
  },
  {
    id: 9,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환통합치료비(연간1억원한도)',
  },
  {
    id: 10,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환통합치료비(연간5천만원한도)',
  },
  {
    id: 11,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환(일반질환)통합치료비(연간2천만원한도)',
  },
  {
    id: 12,
    isCheck: true,
    field01: '유방,갑상선,여성생식기질환(일반질환)통합치료비(연간1천만원한도)',
  },
];

export const Ltpa3500204 = ({ open, onOpenChange }: PopupBaseProps) => {
  // AgGrid Column
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '담보명',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
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
              보장패키지 선택
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA350)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grid className='w-full grid-cols-[auto_1fr]' placement='ss' gap={5}>
            <Grow placement='ss'>
              <TableFold>
                <TableFoldHead title="패키지 유형" />
                <TableFoldBody>
                  <Table variant="default">
                    <colgroup>
                      <col style={{ width: '10rem' }} />
                      <col style={{ width: '5rem' }} />
                      <col style={{ width: 'auto' }} />
                    </colgroup>
                    <TableBody>
                      <TableRow>
                        <TableHead className='text-left'>
                          간병
                        </TableHead>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              암주요치료(상급종합)
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          암주요치료(상급종합)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className='text-left' rowSpan={5}>
                          암주요
                        </TableHead>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              암주요치료(종합병원)
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          암주요치료(종합병원)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              암주요치료(비급여)
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          암주요치료(비급여)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              암주요치료(전이암)
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          암주요치료(전이암)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              표적항암
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          표적항암
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              요양병원제외
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          요양병원제외
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className='text-left' rowSpan={3}>
                          순환계치료비
                        </TableHead>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              상급종합병원
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          주요순환계
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell >
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              주요순환계
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          상급종합병원
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              유/갑/생
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          유/갑/생
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className='text-left'>
                          여성
                        </TableHead>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              여성
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          미혼자용
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className='text-left'>
                          출산/난임
                        </TableHead>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              기혼자용
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          기혼자용
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className='text-left' rowSpan={2}>
                          입원
                        </TableHead>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              1인실
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          1인실
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              2~3인실  
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          2~3인실  
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead className='text-left'>
                          운전자
                        </TableHead>
                        <TableCell>
                          <Checkbox
                              color="primary"
                              onCheckedChange={() => {}}
                              size="md"
                              variant="noneText"
                              className='mx-auto '
                            >
                              운전자비용
                            </Checkbox>
                        </TableCell>
                        <TableCell>
                          운전자비용
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableFoldBody>
              </TableFold>  
            </Grow>
            <Grow placement="ss" className="w-full" gap={5}>
              <TableFold>
                <TableFoldHead title="세부담보" />
                <TableFoldBody>
                  <Grow className="w-full" gap={5}>
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType>
                        // getRowId 적용: id 필드를 고유 식별자로 사용
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        enableCellSpan={true}
                        domLayout="autoHeight"
                        rowSelection={{
                          mode: 'multiRow',
                          checkboxes: (params) => params.data?.isCheck !== null,
                          hideDisabledCheckboxes: true,
                          enableClickSelection: false,
                        }}
                      />
                    </div>
                  </Grow>
                </TableFoldBody>
              </TableFold>
            </Grow>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                저장
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
/**
 * 확인요청
 * 전체체크의 사용여부
 * <Grow className="ml-32"> 간격체크
 */
