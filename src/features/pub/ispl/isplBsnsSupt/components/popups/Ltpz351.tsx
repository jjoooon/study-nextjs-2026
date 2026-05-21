/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogClose,
} from '@uiux/Dialog';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isChecked: boolean;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};
const DummyData: DummyDataType[] = [
  { id: 1, isChecked: true, field1: '취급자', field2: '안손보', field3: '010-1234-5678' },
  { id: 2, isChecked: false, field1: '계약자', field2: '', field3: '' },
];

const Ltpz351 = () => {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '구분',
      field: 'field1',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '성명',
      field: 'field2',
      flex: 1,
      cellClass: 'text-center',
      editable: (params) => params.data?.field1 === '계약자',
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
      headerName: '휴대폰',
      field: 'field3',
      flex: 1,
      cellClass: 'text-center',
      editable: (params) => params.data?.field1 === '계약자',
      cellEditor: 'agTextCellEditor',
      cellEditorParams: {
        maxLength: 13,
      },
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가입설계도우미 알림톡발송
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ351)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="">
          <Gcol className="w-full" placement="ss" gap={2}>
            <div className="ag-theme-alpine radio-selection min-h-[9.4rem]">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: false,
                  resizable: false,
                }}
                rowSelection={{
                  mode: 'singleRow',
                  checkboxes: true,
                  enableClickSelection: false,
                }}
                singleClickEdit={true}
                rowClassRules={{}}
                domLayout="normal"
              />
            </div>
            <Grow placement="ec" className="w-full">
              <Button variant={'contained'} size={'md'}>
                전송
              </Button>
            </Grow>
          </Gcol>
          <Gcol className="w-full" placement="ss" variant="box-warning">
            <Typo icon="warning" variant="body-sm">
              계약자 휴대폰 번호는 고객등록화면에서 수정
            </Typo>
          </Gcol>
          <Gcol className="w-full" placement="ss" variant="box-info">
            {/* 2026-05-21 bold 추가*/}
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              보험차익비과세
            </Typo>
            <BulletList>
              <BulletListItem size="sm">
                보험차익비과세란? - 저축성보험에서 보험차익이 이자소득에 해당되어 과세가 되어야 하나 금융산업을 위해
                일정한 조건을 충족하면 이에 대해 비과세를 적용합니다.
              </BulletListItem>
              <BulletListItem size="sm">
                저축성보험 비과세 적용 요건 및 가입한도 : 비과세 상품 가입 시 세금우대 등록이 필수입니다. (전 금융권
                통합 가입한도 초과여부 관리)
                <BulletList>
                  <BulletListItem size="sm" before="1." type="symbols">
                    월 적립식 저축성보험
                    <BulletList>
                      <BulletListItem size="sm" before="①" type="symbols">
                        비과세요건 - 10년 이상 유지, 5년 이상 납입
                      </BulletListItem>
                      <BulletListItem size="sm" before="②" type="symbols">
                        가입한도 - 월 납입액 150만원 이하
                      </BulletListItem>
                      <BulletListItem size="sm" before="③" type="symbols">
                        비과세 적용 - 세금우대전산망 비과세 등록 시
                      </BulletListItem>
                    </BulletList>
                  </BulletListItem>
                  <BulletListItem size="sm" before="2." type="symbols">
                    월 적립식 외 저축성보험
                    <BulletList>
                      <BulletListItem size="sm" before="①" type="symbols">
                        비과세요건 - 10년 이상 유지
                      </BulletListItem>
                      <BulletListItem size="sm" before="②" type="symbols">
                        가입한도 - 계약기간 총 납입액 1억 이하
                      </BulletListItem>
                      <BulletListItem size="sm" before="③" type="symbols">
                        비과세 적용 - 세금우대전산망 비과세 등록 시
                      </BulletListItem>
                    </BulletList>
                  </BulletListItem>
                </BulletList>
              </BulletListItem>
            </BulletList>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
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

export default Ltpz351;
