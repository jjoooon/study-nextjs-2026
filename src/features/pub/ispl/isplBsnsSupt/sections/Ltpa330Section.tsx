'use client';

import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';
import { Checkbox } from '@/shared/components/uiux/Checkbox';
import { useAgGridInfiniteAppend } from '@aggrid';
import { Grid, Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableMore } from '@common/TablePagination';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon } from '@icons';
import { LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

type Ltpa330DummyDataRow = {
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
};
const Ltpa330DummyData: Ltpa330DummyDataRow[] = [
  {
    id: 1,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: 'TEXT',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: 'TEXT',
    field07: 'TEXT',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: 'YYYY-MM-DD HH:MM:SS',
  },
  {
    id: 2,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: 'TEXT',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: 'TEXT',
    field07: 'TEXT',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: 'YYYY-MM-DD HH:MM:SS',
  },
  {
    id: 3,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: 'TEXT',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: 'TEXT',
    field07: 'TEXT',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: 'YYYY-MM-DD HH:MM:SS',
  },
  {
    id: 4,
    isCheck: false,
    field01: 'TEXT',
    field02: 'TEXT',
    field03: 'TEXT',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: 'TEXT',
    field07: 'TEXT',
    field08: 'TEXT',
    field09: 'TEXT',
    field10: 'YYYY-MM-DD HH:MM:SS',
  },
];

export default function Ltpa330Section() {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });
  const columnDefs = React.useMemo<ColDef<Ltpa330DummyDataRow>[]>(
    () => [
      {
        headerName: '고객정보',
        field: 'field01',
        flex: 1,
      },
      { headerName: '문서종류코드', field: 'field02', width: 110 },
      { headerName: '문서종류명', field: 'field03', flex: 1 },
      { headerName: '전자문서ID', field: 'field04', width: 120 },
      { headerName: '문서묶음ID', field: 'field05', width: 120 },
      { headerName: '문서발급일자', field: 'field06', flex: 1 },
      { headerName: '전문일자', field: 'field07', width: 110 },
      { headerName: '설계상태', field: 'field08', width: 110 },
      { headerName: '이미지', field: 'field09', flex: 1 },
      { headerName: '이미지저장시간', field: 'field10', width: 200 },
    ],
    []
  );
  const pageSize = 3;
  const { loadedCount, totalCount, dataSource, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: Ltpa330DummyData,
    pageSize,
  });

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '전자증명서(정부24) 등록 현황',
            pageId: 'LTPA330',
          }}
        />
      </LayoutHead>

      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid-rows-[auto_1fr] gap-4 h-full">
            <Grow className="w-full items-center" variant="box-round" placement={'bwe'} gap={6}>
              <FormTable
                variant={'none'}
                lineTop={false}
                caption="전자증명서(정부24) 등록 현황 조회"
                cols={['w-[6rem]', 'w-[38rem]', 'w-[8rem]', 'w-[auto]']}
              >
                <FormRow>
                  <FormCell title={'조회구분'}>
                    <NativeSelect
                      aria-label="조회구분 선택"
                      value={form.type01}
                      width={100}
                      required
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type01-1', label: '계약자' },
                        { value: 'selection2', id: 'type01-2', label: '피보험자' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input
                      width={100}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                      readOnly
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="조직구분명 입력" width={140} value={'901212-1234567'} readOnly />
                  </FormCell>
                  <FormCell title={'문서발급일자'}>
                    <DatePickerInput
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      mode="range"
                      onChange={() => {}}
                      rangeValue={{ from: '2026-01-30', to: '2026-04-30' }}
                      size="lg"
                      required
                    />
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Checkbox>
                  <span className="whitespace-nowrap mr-4">정부24시 실시간 조회</span>
                </Checkbox>
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

            <Grid className="grid-rows-[1fr_auto] gap-1">
              <div className="ag-theme-alpine">
                <AgGridReact<Ltpa330DummyDataRow>
                  getRowId={(params) => String(params.data.id)}
                  columnDefs={columnDefs}
                  rowData={Ltpa330DummyData}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    editable: false,
                    cellClass: 'text-center',
                  }}
                  rowClassRules={{}}
                  onGridReady={(params) => {
                    params.api.forEachNode((node) => {
                      if (node.data?.isCheck) {
                        node.setSelected(true);
                      }
                    });
                  }}
                  rowSelection={{
                    mode: 'multiRow',
                    headerCheckbox: true,
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  selectionColumnDef={{
                    width: 30,
                    cellClass: 'text-center editable-cell',
                  }}
                  enableCellSpan={true}
                  domLayout="normal"
                  key={loadedCount}
                  // rowModelType="infinite"
                  cacheBlockSize={pageSize}
                  maxBlocksInCache={2}
                  datasource={dataSource}
                />
              </div>
              <TableMore
                loadedCount={loadedCount}
                totalCount={totalCount}
                pageSize={pageSize}
                onLoadAll={handleLoadAll}
                onLoadNext={handleLoadNext}
                isAll={false}
              />
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  이미지조회
                </Button>
              </Grow>
              <Grow>
                <Typo>설계번호</Typo>
                <Input
                  size={'lg'}
                  width={150}
                  value={'LA20233591906000'}
                  onChange={() => {}}
                  readOnly
                  style={{ height: 32 }}
                />
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  이미지전송
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
    </>
  );
}
