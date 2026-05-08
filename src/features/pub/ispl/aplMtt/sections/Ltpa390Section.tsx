'use client';

import '@/shared/lib/agGridPub';
import { Grow, Gcol, Typo, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';

import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { AgGridEmptyComponent } from '@/shared/components/agGridUtils';

type DummyDataType = {
  id: number;
  field1: string;
  field2: string;
  field3: string;
};

const DummyData: DummyDataType[] = [
  { id: 1, field1: '', field2: '', field3: '' },
  { id: 2, field1: '', field2: '', field3: '' },
];

export default function Ltpa390Section() {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: 'No',
      field: 'id',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '피보험자',
      field: 'field2',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '위배내용',
      field: 'field3',
      flex: 2,
      cellClass: 'text-center',
    },
  ];

  const rowData = DummyData;

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '청약불가 사전안내',
            pageId: 'LTPA390',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr] h-full">
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable variant={'head'} lineTop={false} caption="설계번호">
                <FormRow>
                  <FormCell title={'설계번호'}>LA2608902384509</FormCell>
                </FormRow>
              </FormTable>
            </Grow>

            <Grid placement="ss" className="grid-rows-[auto_1fr_auto] gap-4">
              <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
                <Typo variant={'body-sm'} icon={'warning'}>
                  아래 내용은 청약완료까지 해소되지 않을경우 수납이 불가능합니다.(청약완료 불가)
                </Typo>
              </Gcol>
              <Gcol placement="ss" className="w-full" gap={5}>
                <div className="ag-theme-alpine min-h-[30rem]">
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    domLayout="normal"
                    alwaysShowVerticalScroll={true}
                  />
                </div>
              </Gcol>
              <Gcol>
                <TableFold variant="default">
                  <TableFoldHead title="모집자 확인사항" />
                  <TableFoldBody>
                    <Gcol className="w-full" placement="ss" variant="box-warning">
                      <Typo variant="body-sm">
                        <Checkbox
                          color="primary"
                          errorMsg="선택은 필수입니다."
                          errorPs="bl"
                          onCheckedChange={() => {}}
                          size="lg"
                          variant="default"
                        >
                          모집자 김한화는 상기 내용에 대해 정확히 확인 하였습니다.
                        </Checkbox>
                      </Typo>
                    </Gcol>
                  </TableFoldBody>
                </TableFold>
              </Gcol>
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom className="border-none!">
            <MainBottomItem>
              <Grow gap={1}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  엑셀내보내기
                </Button>
              </Grow>
              <Grow gap={1}>
                <Button variant={'contained'} size={'xl'} color={'gray-light'}>
                  확인
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
