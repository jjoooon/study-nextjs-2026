'use client';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { useAgGridInfiniteAppend } from '@aggrid';
import { Gcol, Grow } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TableMore } from '@common/TablePagination';
import { PageID } from '@features/PageID';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon, FileExportIcon } from '@icons';
import { LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import { Ltpa300DummyData } from '../data/ltpa300Data';
import type { Ltpa300DummyDataRow } from '../data/ltpa300Data';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Ltpa300Section() {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
  });
  const columnDefs = React.useMemo<ColDef<Ltpa300DummyDataRow>[]>(
    () => [
      { headerName: '취급기관', field: 'field01', width: 120, cellClass: 'text-center' },
      { headerName: '모집직원번호', field: 'field02', width: 110, cellClass: 'text-center' },
      { headerName: '모집직원명', field: 'field03', width: 100, cellClass: 'text-center' },
      { headerName: '사용인번호', field: 'field04', width: 100, cellClass: 'text-center' },
      { headerName: '사용인', field: 'field05', width: 80, cellClass: 'text-center' },
      { headerName: '증권번호', field: 'field06', flex: 170, cellClass: 'text-center' },
      { headerName: '점검설계번호', field: 'field07', width: 110, cellClass: 'text-center' },
      { headerName: '점검', field: 'field08', width: 110, cellClass: 'text-center' },
      { headerName: '피보험자명', field: 'field09', width: 100, cellClass: 'text-center' },
      { headerName: '점검일자', field: 'field10', width: 110, cellClass: 'text-center' },
      { headerName: '결과순번', field: 'field11', width: 90, cellClass: 'text-center' },
      { headerName: '사전확인시사용여부', field: 'field12', width: 130, cellClass: 'text-center' },
      { headerName: '점검방법', field: 'field13', width: 90, cellClass: 'text-center' },
      { headerName: '한도초과건수', field: 'field14', width: 100, cellClass: 'text-center' },
    ],
    []
  );
  const pageSize = 4;
  const { loadedCount, totalCount, dataSource, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: Ltpa300DummyData,
    pageSize,
  });

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '정액담보점검목록 조회',
            pageId: 'LTPA300',
          }}
        />
      </LayoutHead>

      <LayoutTemplate
        mainBody={
          <Gcol className="w-full" placement={'ss'} gap={4}>
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable
                variant={'none'}
                lineTop={false}
                caption="정액담보점검목록 조회"
                cols={['w-[6rem]', 'w-[22rem]', 'w-[8rem]', 'w-[38rem]', 'w-[8rem]', 'w-[auto]']}
              >
                <FormRow>
                  <FormCell title={'점검일자'}>
                    <DatePickerInput
                      errorMsg="입력은 필수입니다."
                      errorPs="bl"
                      mode="range"
                      onChange={() => {}}
                      rangeValue={{ from: '2026-03-01', to: '2026-03-07' }}
                      size="lg"
                      required
                    />
                  </FormCell>
                  <FormCell title={'조직구분'}>
                    <NativeSelect
                      aria-label="설계조직 선택"
                      value={form.type01}
                      width={100}
                      required
                      onChange={(e) => setFormField('type01', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type01-1', label: '선택1' },
                        { value: 'selection2', id: 'type01-2', label: '선택2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input
                      aria-label="조직구분명 입력"
                      width={100}
                      value={form.type02}
                      onChange={(e) => setFormField('type02', e.target.value)}
                      required
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="조직구분명 입력" width={140} value={'신부산GA지점'} readOnly />
                  </FormCell>
                  <FormCell title={'점검방법'}>
                    <NativeSelect
                      aria-label="점검방법 선택"
                      value={form.type03}
                      width={140}
                      onChange={(e) => setFormField('type03', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type03-1', label: '전체' },
                        { value: 'selection2', id: 'type03-2', label: '전체2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'점검방법'}>
                    <Input
                      aria-label="점검방법 입력"
                      width={140}
                      value={form.type04}
                      onChange={(e) => setFormField('type04', e.target.value)}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </FormCell>
                  <FormCell title={'점검결과'}>
                    <NativeSelect
                      aria-label="점검방법 선택"
                      value={form.type05}
                      width={140}
                      onChange={(e) => setFormField('type05', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type05-1', label: '전체' },
                        { value: 'selection2', id: 'type05-2', label: '전체2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'점검구분'}>
                    <NativeSelect
                      aria-label="점검구분 선택"
                      value={form.type06}
                      width={140}
                      onChange={(e) => setFormField('type06', e.target.value)}
                    >
                      {[
                        { value: 'selection', id: 'type06-1', label: '전체' },
                        { value: 'selection2', id: 'type06-2', label: '전체2' },
                      ].map((option) => (
                        <NativeSelectOption key={option.id} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
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
              <TableFoldHead title="정액담보점검결과(피보험자별)">
                <Button id="btnPA" color="success" variant="outlined" onClick={() => {}}>
                  엑셀내보내기
                  <FileExportIcon />
                </Button>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine">
                  <AgGridReact<Ltpa300DummyDataRow>
                    // noRowsOverlayComponent={AgGridEmptyComponent}
                    getRowId={(params) => String(params.data.id)}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                      editable: false,
                    }}
                    domLayout="autoHeight"
                    key={loadedCount}
                    rowModelType="infinite"
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
                />
              </TableFoldBody>
            </TableFold>
          </Gcol>
        }
      />
    </>
  );
}
