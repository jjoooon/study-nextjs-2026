/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef } from 'react';
import { Grow, Grid } from '@atoms';
import { FileExportIcon, FileImportIcon, ResetIcon, EssentialIcon } from '@icons';
import { AgGridEmptyComponent, useAgGridInfiniteAppend, useDynamicColumnWidths } from '@aggrid';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Textarea } from '@uiux/Textarea';
import { BottomBar } from '@common/BottomBar';
import { FormTable, FormRow, FormCell } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isChecked: boolean;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: false,
    field1: '시스템오류',
    field2: '',
    field3:
      '자료가 존재하지 않습니다. 자료가 존재하지 않습니다. 자료가 존재하지 않습니다. 자료가 존재하지 않습니다. 자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 2,
    isChecked: false,
    field1: '알림',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 3,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 4,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 5,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 6,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 7,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 8,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 9,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 10,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 11,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 12,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 13,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 14,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 15,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 16,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  {
    id: 17,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: '자료가 존재하지 않습니다.',
    field4: '2026.08.31',
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: 18 + i,
    isChecked: false,
    field1: '질의',
    field2: '',
    field3: `추가 자료 ${18 + i}`,
    field4: '2026.08.31',
  })),
];

export default function Ltpa690Section() {
  // 2026-06-02 flex, minWidth 수정
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '메시지 구분',
      field: 'field1',
      width: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '메시지코드',
      field: 'field2',
      width: attributeColumnWidth(80),
      cellClass: 'text-center',
    },
    {
      headerName: '메시지',
      field: 'field3',
      flex: 10,
      cellClass: 'text-left',
      // tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field3' }),
    },
    {
      headerName: '등록일',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellClass: 'text-center',
    },
  ];

  // pagination
  const gridRef = useRef<AgGridReact<DummyDataType>>(null);
  const pageSize = 3;
  const {
    loadedCount,
    totalCount,
    dataSource,
    handleLoadAll: handleLoadAllDefault,
    handleLoadNext: handleLoadNextDefault,
    handleLoadReset: handleLoadResetDefault,
  } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });

  const handleLoadNext = useCallback(() => {
    handleLoadNextDefault();
  }, [handleLoadNextDefault]);

  const handleLoadAll = useCallback(() => {
    handleLoadAllDefault();
  }, [handleLoadAllDefault]);

  const handleLoadReset = useCallback(() => {
    handleLoadResetDefault();
  }, [handleLoadResetDefault]);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '메시지관리',
            pageId: 'LTPA690',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full grid grid-rows-[auto_1fr] gap-3 h-full">
            <Grow placement="bwc" className="w-full" variant={'box-round'}>
              <FormTable variant={'head'}>
                <FormRow>
                  <FormCell title={'조회구분'} tdClassName="grid-cols-[auto_1fr]">
                    <NativeSelect width={'auto'}>
                      {['전체', '메시지명', '등록자', '등록부서'].map((option) => (
                        <NativeSelectOption key={option} value={option}>
                          {option}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input width={200} value={''} />
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
            <Grid className="grid-cols-2 h-full" gap={3}>
              <TableFold variant="accordion">
                <TableFoldHead title="메시지 목록">
                  <Grow>
                    <Button color="success" variant="outlined">
                      엑셀내보내기
                      <FileExportIcon />
                    </Button>
                    <Button color="success" variant="outlined">
                      엑셀가져오기
                      <FileImportIcon />
                    </Button>
                  </Grow>
                </TableFoldHead>
                <TableFoldBody className="grid grid-rows-[1fr_auto] gap-1">
                  <div className="ag-theme-alpine inner-scroll" data-row={DummyData.length}>
                    {/* 2026-06-01 resizable true로 수정, selectionColumnDef 추가 */}
                    <AgGridReact<DummyDataType>
                      ref={gridRef}
                      key={loadedCount}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={DummyData}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      domLayout="normal"
                      rowSelection={{
                        mode: 'multiRow',
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      rowModelType="infinite"
                      cacheBlockSize={pageSize}
                      maxBlocksInCache={2}
                      datasource={dataSource}
                      selectionColumnDef={{
                        width: 30,
                        cellClass: 'editable-cell',
                      }}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                  <TableMore
                    gridRef={gridRef}
                    loadedCount={loadedCount}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onLoadAll={handleLoadAll}
                    onLoadNext={handleLoadNext}
                    onLoadReset={handleLoadReset}
                  />
                </TableFoldBody>
              </TableFold>
              <TableFold variant="accordion">
                <TableFoldHead title="메시지 등록"></TableFoldHead>
                <TableFoldBody>
                  <FormTable cols={['w-[9rem]', 'w-auto', 'w-[9rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell
                        title={
                          <Grow placement="sc">
                            <span>메시지코드</span>
                            <EssentialIcon />
                          </Grow>
                        }
                      >
                        <Input value={'LTPA123'} required />
                        <Button variant={'outlined'} color={'gray'} size={'lg'} onClick={() => {}}>
                          중복확인
                        </Button>
                      </FormCell>
                      <FormCell
                        title={
                          <Grow placement="sc">
                            <span>등록자</span>
                            <EssentialIcon />
                          </Grow>
                        }
                      >
                        <Input value={'LTPA123'} required />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'메시지 구분'}>
                        <NativeSelect width={'auto'}>
                          {[
                            { label: '선택', value: '' },
                            { label: '시스템오류', value: '시스템오류' },
                            { label: '업무오류', value: '업무오류' },
                            { label: '알림', value: '알림' },
                            { label: '질의', value: '질의' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                      <FormCell title={'메시지 유형'}>
                        <NativeSelect width={'auto'}>
                          {[
                            { label: '선택', value: '' },
                            { label: '정상', value: '정상' },
                            { label: '계좌오류', value: '계좌오류' },
                            { label: '기타오류', value: '기타오류' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell
                        title={
                          <Grow placement="sc">
                            <span>메시지</span>
                            <EssentialIcon />
                          </Grow>
                        }
                        colSpan={3}
                      >
                        <Input value={'자료가 존재하지 않습니다.'} required />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'메시지 설명'} colSpan={3}>
                        <Input value={''} />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'처리방안'} colSpan={3}>
                        <Textarea variant={'default'} placeholder={'내용을 입력하세요'} minLength={10}>
                          오류가있을경우 해소는 이렇게 해주세요.
                        </Textarea>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'연계화면ID'} colSpan={3}>
                        <Input width={100} value={''} /> <p>오류 팝업에 연계시킬 화면 아이디 입력</p>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'비고'} colSpan={3}>
                        <Textarea
                          variant={'default'}
                          placeholder={'내용을 입력하세요'}
                          minLength={10}
                          className="min-h-[calc(100vh-54rem)]"
                        ></Textarea>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom className="border-none!">
            <MainBottomItem>
              <Grow gap={1}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  신규등록
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  삭제
                </Button>
                <Button variant={'contained'} size={'xl'} color={'primary'}>
                  저장
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
