/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { EssentialIcon } from '@icons';
import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';

type DataType = {
  id: number;
  field01: number;
  field02: string | number;
  field03: string | number;
};

const dummyData: DataType[] = [
  {
    id: 1,
    field01: 1,
    field02: 'TEXT',
    field03: '',
  },
  {
    id: 2,
    field01: 2,
    field02: 'TEXT2',
    field03: 'TEXT3',
  },
];

const columnDefs: ColDef<DataType>[] = [
  {
    headerName: '순번',
    field: 'field01',
    cellClass: 'text-center',
    flex: 1,
  },
  {
    headerName: '기본주소(소재지)',
    field: 'field02',
    flex: 10,
    cellClass: 'text-left',
  },
  {
    headerName: '보상한도',
    field: 'field03',
    flex: 3,
    cellClass: 'text-left',
  },
];

const Ltpz01604 = () => {
  return (
    <>
      <TableFold>
        <TableFoldHead title={'임대인배상책임(주택,화재제외)'} />
        <TableFoldBody>
          <FormTable cols={['w-[16rem]', 'w-[30rem]', 'w-[16rem]', 'w-[auto]']}>
            <FormRow>
              <FormCell
                title={
                  <Grow placement="sc">
                    임대가구수
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input aria-label="" value={''} width={120} />
                가구
              </FormCell>
              <FormCell
                title={
                  <Grow placement="sc">
                    준공연도(사용승인연도)
                    <EssentialIcon />
                  </Grow>
                }
              >
                <Input aria-label="" value={''} width={120} />
              </FormCell>
            </FormRow>
          </FormTable>
        </TableFoldBody>
      </TableFold>
      <TableFold>
        <TableFoldHead title={'임대주택'} />
        <TableFoldBody className="gap-2">
          <div className="ag-theme-alpine inner-scroll" data-rows={dummyData.length}>
            <AgGridReact<DataType>
              getRowId={(params) => String(params.data.id)}
              noRowsOverlayComponent={AgGridEmptyComponent}
              rowData={dummyData}
              columnDefs={columnDefs}
              defaultColDef={{ sortable: false }}
              enableCellSpan={true}
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
              singleClickEdit={true}
              rowSelection={{
                mode: 'multiRow',
                headerCheckbox: false,
                checkboxes: true,
                enableClickSelection: false,
              }}
              headerHeight={50}
              selectionColumnDef={{
                headerName: '선택',
                width: 30,
                cellClass: 'editable-cell',
              }}
            />
          </div>
          <Gcol variant={'box-info'} placement={'ss'} className="w-full">
            <Typo variant={'body-sm'} icon={'info'}>
              소유자가 임대해 준 주택(상기 소재지)의 호수 상세정보를 행추가 하여 입력하시기 바랍니다.{' '}
              <b>(한행에 한가구의 정보만 입력)</b>
            </Typo>
            <BulletList position="col">
              <BulletListItem size="sm">호수 상세정보 입력 예시</BulletListItem>
              <BulletListItem size="sm">기본주소(소재지) : XXX~~~ A동 101호, 호수 상세정보 : A동 101호</BulletListItem>
            </BulletList>
          </Gcol>
        </TableFoldBody>
      </TableFold>
    </>
  );
};

export default Ltpz01604;
