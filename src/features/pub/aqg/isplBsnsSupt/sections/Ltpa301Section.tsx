'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Grow, Gcol, Typo, Grid } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { PageID } from '@features/PageID';
import { SearchIcon, ResetIcon, ArrowNext } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Textarea } from '@uiux/Textarea';
import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';

type Ltpa301DummyDataRow = {
  id: number;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
  field10: string | number;
  field11: string | number;
  field12: string | number;
  field13: string | number;
  field14: string | number;
};
const Ltpa301DummyData: Ltpa301DummyDataRow[] = [
  {
    id: 1,
    isCheck: true,
    field01: 'TEXT',
    field02: '3',
    field03: '2026-01-01',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '김한화',
    field07: 'TEXT',
    field08: '999999999',
    field09: '999999999',
    field10: '999999999',
    field11: '999999999',
    field12: '김직원',
    field13: '2026-01-01',
    field14: 'TEXT',
  },
  {
    id: 2,
    isCheck: true,
    field01: 'TEXT',
    field02: '3',
    field03: '2026-01-01',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '김한화',
    field07: 'TEXT',
    field08: '999999999',
    field09: '999999999',
    field10: '999999999',
    field11: '999999999',
    field12: '김직원',
    field13: '2026-01-01',
    field14: 'TEXT',
  },
];

export default function Ltpa301Section() {
  // AgGrid Column
  const columnDefs: (ColDef<Ltpa301DummyDataRow> | ColGroupDef<Ltpa301DummyDataRow>)[] = [
    {
      headerName: '점검결과',
      field: 'field01',
      width: 90,
    },
    {
      headerName: '순번',
      field: 'field02',
      width: 60,
    },
    {
      headerName: '점검일자',
      field: 'field03',
      width: 90,
    },

    {
      headerName: '점검방법',
      field: 'field04',
      width: 100,
    },
    {
      headerName: '점검구분',
      field: 'field05',
      width: 100,
    },
    {
      headerName: '피보험자',
      field: 'field06',
      width: 80,
    },
    {
      headerName: '정액담보한도분류',
      field: 'field07',
      width: 130,
    },
    {
      headerName: '가입한도',
      field: 'field08',
      width: 100,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '초과금액',
      field: 'field09',
      width: 100,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '당사금액',
      field: 'field10',
      width: 100,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '타사금액',
      field: 'field11',
      width: 100,
      cellClass: 'text-right',
      valueFormatter: numberValueFormatter,
    },
    {
      headerName: '처리직원',
      field: 'field12',
      width: 90,
    },
    {
      headerName: '처리일시',
      field: 'field13',
      width: 100,
    },
    {
      headerName: '처리내용',
      field: 'field14',
      width: 150,
    },
  ];

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '정액담보점검내역',
            pageId: 'LTPA301',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid-rows-[auto_1fr_auto] h-full" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable variant={'head'} lineTop={false} caption="증권번호 조회" cols={['w-[10rem]', 'flex-1']}>
                <FormRow>
                  <FormCell title={'증권번호'}>
                    <Input aria-label="증권번호 입력" width={160} />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
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

            <Grid className="w-full grid-rows-[auto_1fr_auto] h-full" gap={3}>
              <TableFold variant={'accordion'}>
                <TableFoldHead title="정액담보점검내역" />
                <TableFoldBody>
                  <FormTable caption="정액담보점검내역 테이블" cols={['w-[10rem]', 'flex-1', 'w-[10rem]', 'flex-1']}>
                    <FormRow>
                      <FormCell title={'증권번호'}>
                        <Input aria-label="증권번호 입력" readOnly />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                          <ArrowNext color={'var(--color-primary-50)'} />
                        </Button>
                      </FormCell>
                      <FormCell title={'계약방법'}>
                        <Input aria-label="계약방법 입력" readOnly />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'점검일자'}>
                        <Input aria-label="점검일자 입력" readOnly />
                      </FormCell>
                      <FormCell title={'점검방법'}>
                        <Input aria-label="점검방법 입력" readOnly />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'점검상태'}>
                        <Input aria-label="점검상태 입력" readOnly />
                      </FormCell>
                      <FormCell title={'점검이력순번'}>
                        <Input aria-label="점검이력순번 입력" readOnly />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>

              <TableFold variant={'accordion'}>
                <TableFoldHead title="정액담보점검결과">
                  <Typo variant="body-md">(단위: 원)</Typo>
                </TableFoldHead>
                <TableFoldBody>
                  <div className="ag-theme-alpine min-h-[18.4rem]">
                    <AgGridReact<Ltpa301DummyDataRow>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={Ltpa301DummyData}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                        cellClass: 'text-center p-0!',
                      }}
                      singleClickEdit={true}
                      rowSelection={{
                        mode: 'multiRow',
                        checkboxes: true,
                        headerCheckbox: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        width: 30,
                        cellClass: 'text-center p-0!',
                        cellClassRules: {
                          'pointer-events-none': (params) => !!params.data?.locked,
                        },
                      }}
                      domLayout="normal"
                    />
                  </div>
                </TableFoldBody>
              </TableFold>

              <TableFold variant={'accordion'}>
                <TableFoldHead title="정액담보점검 관리">
                  <Grow className="w-full justify-end" placement="ee">
                    <Button color="gray" variant="outlined">
                      실손특약조회
                    </Button>
                    <Button color="gray" variant="outlined">
                      업계한도조회
                    </Button>
                    <Button color="primary" variant="contained">
                      저장
                    </Button>
                  </Grow>
                </TableFoldHead>
                <TableFoldBody>
                  <FormTable caption="정액담보점검관리 테이블" cols={['w-[10rem]', 'flex-1']}>
                    <FormRow>
                      <FormCell title={'처리구분'}>
                        <NativeSelect aria-label="처리구분 선택" width={130}>
                          {[
                            { value: 'selection', label: '처리구분' },
                            { value: 'selection2', label: '처리내용' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'처리내용'}>
                        <Textarea placeholder="" resize={true} className="w-full" />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
            </Grid>

            <Gcol className="w-full">
              <Gcol className="s-full" variant={'box-warning'} placement="ss">
                <Typo variant={'body-sm'} icon={'warning'}>
                  <b>누적계산기준</b>
                </Typo>
                <BulletList color={'warning'} size="sm">
                  <BulletListItem before="1." className="whitespace-nowrap" color="default" size="md" type="symbols">
                    당사 : 기계약(보험료 미납해지 포함) 및 심사중인 건 포함
                  </BulletListItem>
                  <BulletListItem before="2." className="whitespace-nowrap" color="default" size="md" type="symbols">
                    타사 : 한국신용정보원의 집적 기준 및 Data 사용
                  </BulletListItem>
                </BulletList>
              </Gcol>
              <Gcol className="s-full" variant={'box-warning'} placement="ss">
                <Typo variant={'body-sm'} icon={'warning'}>
                  <b>주의사항</b>
                </Typo>
                <BulletList color={'warning'} size="sm">
                  <BulletListItem before="1." className="whitespace-nowrap" color="default" size="md" type="symbols">
                    점검 수행 전 신정원 조회 후 정액담보점검 클릭 권장
                  </BulletListItem>
                  <BulletListItem before="2." className="whitespace-nowrap" color="default" size="md" type="symbols">
                    당사금액 문제가 있는 경우 다른 심사요청 건이 있는지 확인 권장
                  </BulletListItem>
                  <BulletListItem before="3." className="whitespace-nowrap" color="default" size="md" type="symbols">
                    타사의 누적집적오류는 당사에서 수정요청 불가
                  </BulletListItem>
                </BulletList>
              </Gcol>
            </Gcol>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  정액담보업계누적기준
                </Button>
              </Grow>
              <Grow gap={1}>
                <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'gray'} size={'xl'}>
                  신정원조회
                </Button>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  정액담보점검
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
