/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { SearchIcon } from '@icons';

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
import { ColDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent } from '@/shared/components/agGridUtils/AgGridUtils';
import { BulletItem, BulletList, BulletListItem } from '@/shared/components/common/BulletList';
import { DialogBottomInfo } from '@/shared/components/common/DialogBottomInfo';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';

type DummyDataType = {
  id: number;
  isChecked: boolean;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  field7: string | number;
  field8: string | number;
  field9: string | number;
  field10: string | number;
  field11: string | number;
  field12: string | number;
  field13: string | number;
  field14: string | number;
  field15: string | number;
  field16: string | number;
  field17: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: false,
    field1: '김한화',
    field2: '900101-1234567',
    field3: '010',
    field4: '1234',
    field5: '5678',
    field6: 'text',
    field7: 'text',
    field8: 'text',
    field9: 'text',
    field10: '신용추심원',
    field11: 'text',
    field12: 'text',
    field13: 'text',
    field14: 'text',
    field15: 'text',
    field16: 'text',
    field17: 'text',
  },
];
export const Ltpz063 = () => {
  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '가입설계동의 시 최소 필요정보',
      width: 100,
      children: [
        {
          headerName: '이름',
          field: 'field1',
          width: 100,
          editable: true,
          cellClass: 'editable-cell text-center',
          sortable: false,
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
          headerName: '주민등록번호',
          field: 'field2',
          width: 110,
          editable: true,
          cellClass: 'editable-cell text-center',
          sortable: false,
        },
        {
          headerName: '전화번호(휴대폰)',
          children: [
            {
              field: 'field3',
              width: 50,
              editable: true,
              cellClass: 'editable-cell text-center',
            },
            {
              field: 'field4',
              width: 50,
              editable: true,
              cellClass: 'editable-cell text-center',
            },
            {
              field: 'field5',
              width: 50,
              editable: true,
              cellClass: 'editable-cell text-center',
            },
          ],
        },
      ],
    } as ColDef<DummyDataType>,
    {
      headerComponent: () => (
        <div className="w-full flex flex-col items-center justify-center leading-[1.1]">
          <span>동의 여부</span>
          <span>개별/단체</span>
        </div>
      ),
      field: 'field6',
      width: 60,
      editable: true,
      cellClass: 'editable-cell text-center',
      sortable: false,
    },
    {
      headerName: '고객 및 설계 기본 정보',
      children: [
        {
          headerName: '주피와의관계',
          field: 'field7',
          width: 80,
          editable: true,
          cellClass: 'editable-cell text-center',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: ['선택1', '선택2'] },
        },
        {
          headerName: '연령',
          field: 'field8',
          width: 60,
          editable: true,
          cellClass: 'editable-cell text-center',
          sortable: false,
        },
        {
          headerName: '상해급수',
          field: 'field9',
          width: 60,
          editable: true,
          cellClass: 'editable-cell text-center',
          sortable: false,
        },
        {
          headerName: '직업',
          field: 'field10',
          flex: 1,
          minWidth: 100,
          editable: true,
          cellClass: 'editable-cell text-center',
          sortable: false,
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
          field: 'field11',
          flex: 1,
          minWidth: 80,
          editable: true,
          cellClass: 'editable-cell text-center',
          sortable: false,
        },
        {
          headerName: '업종',
          field: 'field12',
          minWidth: 80,
          flex: 1,
          editable: true,
          cellClass: 'editable-cell text-center',
          sortable: false,
        },
        {
          headerName: '직무',
          field: 'field13',
          minWidth: 80,
          flex: 1,
          editable: true,
          cellClass: 'editable-cell text-center',
          sortable: false,
        },
        {
          headerName: '운전형태',
          field: 'field14',
          width: 80,
          editable: true,
          cellClass: 'editable-cell text-center',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: ['선택1', '선택2'] },
        },
        {
          headerName: '이륜차',
          field: 'field15',
          width: 80,
          editable: true,
          cellClass: 'editable-cell text-center',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: ['선택1', '선택2'] },
        },
        {
          headerName: '병력여부',
          field: 'field16',
          width: 80,
          editable: true,
          cellClass: 'editable-cell text-center',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: ['선택1', '선택2'] },
        },
        {
          headerName: '알릴사항',
          field: 'field17',
          width: 80,
          editable: true,
          cellClass: 'editable-cell text-center',
          sortable: false,
        },
      ],
    } as ColDef<DummyDataType>,
  ];
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              비교안내확인서(타사용) 입력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ063)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable
              variant={'head'}
              lineTop={false}
              caption="정액담보점검목록 조회"
              cols={['w-[6rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]']}
            >
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input
                    aria-label="설계번호 입력"
                    value={'LA26022432174'}
                    onChange={() => {}}
                    variant="info"
                    readOnly
                  />
                  <Input
                    aria-label=""
                    value={'한화 더 건강한 한아름좋합보험2601'}
                    onChange={() => {}}
                    variant="info"
                    readOnly
                  />
                </FormCell>
                <FormCell title={'승환확인여부 대상'}>
                  <Input aria-label="" value={'계약자:홍길동'} onChange={() => {}} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
            <Grow>
              <Button id="btnRA" color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                검색
              </Button>
            </Grow>
          </Grow>
          <Gcol className="w-full" placement="ss" variant="box-warning">
            <Typo icon="warning" variant="body-sm">
              <b>주의사항</b>
            </Typo>
            <BulletList color={'warning'} size="sm">
              <BulletListItem>
                하단의 비교안내 정보는 고객님께 <b>정확한 설명 필요.</b> (고객에게 유리한 내용만 설명하는 행위 금지)
              </BulletListItem>
              <BulletListItem>
                항목별 공란은 고객님께 확인 후 <b>정확하게 기재</b>. (별도 설명자료 첨부 가능)
              </BulletListItem>
              <BulletListItem>
                휴대폰, 태블릿, 음성녹음 서명의 경우 전자서명 요청 전 모든 공란 기입 필수 (공란 존재 시 발송 불가) /
                문서서명은 모든 공란 기입 후 스캔
                <BulletItem color="warning" size="sm" type="ref">
                  {"보험회사 면책사유 및 면책사항은 '상품설명서 참조' 등의 단순 기재가 불가. (* 금감원 주의사항)"}
                </BulletItem>
                <BulletItem color="warning" size="sm" type="ref">
                  조회기준일에 따라 일부 기존계약은 계약상태가 다르게 표기될 수 있음
                </BulletItem>
              </BulletListItem>
            </BulletList>
          </Gcol>
          <TableFold>
            <TableFoldHead title="피보험자 명세">
              <Grow>
                <Button color="gray" variant="outlined" onClick={() => {}}>
                  재조회
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  onGridReady={(event) => {
                    gridApiRef.current = event.api;
                  }}
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  singleClickEdit={true}
                  rowClassRules={{}}
                  domLayout="normal"
                  rowSelection={{
                    mode: 'multiRow',
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  selectionColumnDef={{
                    width: 30,
                  }}
                  groupHeaderHeight={30}
                  headerHeight={0}
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
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz063;
