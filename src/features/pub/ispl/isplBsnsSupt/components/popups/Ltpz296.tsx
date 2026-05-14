/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { Grid, Grow, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { ResetIcon, SearchIcon } from '@icons';

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

import '@/shared/lib/agGridPub';
import { Input } from '@uiux/Input';
import { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { AgGridEmptyComponent } from '@/shared/components/agGridUtils/AgGridUtils';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux/NativeSelect';

type DummyDataType = {
  id: number;
  isChecked: boolean;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string | number;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
  field10: string;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: false,
    field1: 'Text',
    field2: '10명',
    field3: '남자',
    field4: '35세',
    field5: 31110,
    field6: '회사 사무직 종사자',
    field7: '1/A',
    field8: 'text',
    field9: '99,999,999원',
    field10: '3명',
  },
];

export const Ltpz296 = () => {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '그룹명',
      field: 'field1',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '인원',
      field: 'field2',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '성별',
      field: 'field3',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '평균연령',
      field: 'field4',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '직업코드',
      field: 'field5',
      width: 120,
      cellRenderer: (_params: ICellRendererParams<DummyDataType>) => (
        <Grid className="w-full h-full grid-cols-[1fr_auto] grid-flow-col items-center" placement="cc">
          <Typo>{_params.value}</Typo>
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grid>
      ),
    },
    {
      headerName: '직업명',
      field: 'field6',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '급수',
      field: 'field7',
      width: 60,
      cellClass: 'text-center',
    },
    {
      headerName: '운정용도',
      field: 'field8',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '보혐료',
      field: 'field9',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '등록인원',
      field: 'field10',
      width: 80,
      cellClass: 'text-right',
    },
  ];
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={false} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              철회알림특전송
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ296)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable
              variant={'none'}
              lineTop={false}
              caption="정액담보점검목록 조회"
              cols={['w-[6rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]']}
            >
              <FormRow>
                <FormCell title={'설계번호'}>LA26022432174</FormCell>
                <FormCell title={'발행후변경순번'}>1</FormCell>
                <FormCell title={'피보험자찾기'}>
                  <NativeSelect aria-label="점검방법 선택" value={''} width={80} onChange={() => {}}>
                    {[
                      { value: 'selection', id: 'type1', label: '이름' },
                      { value: 'selection2', id: 'type2', label: '이름1' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input aria-label="조직구분명 입력" width={120} value={'김한화'} onChange={() => {}} />
                </FormCell>
              </FormRow>
            </FormTable>

            <Grow>
              <Button id="btnRA" color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
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
          <TableFold>
            <TableFoldHead title="등록사항">
              <Grow>
                <Button color="gray" variant="outlined">
                  그룹추가
                </Button>
                <Button color="gray" variant="outlined">
                  그룹삭제
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  singleClickEdit={true}
                  rowClassRules={{}}
                  domLayout="autoHeight"
                  alwaysShowVerticalScroll={true}
                />
              </div>
            </TableFoldBody>
          </TableFold>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => {}}>
                새로고침
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => {}}>
                단체규약
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => {}}>
                일괄가입설계동의
              </Button>
            </Grow>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz296;
