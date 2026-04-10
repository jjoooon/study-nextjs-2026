'use client';

import { useEffect, useMemo, useState } from 'react';

import { AgAbstractInputField, AgInputTextField, type ColDef, type EditableCallbackParams, type ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { editableSelectCellRenderer, numberValueFormatter, useAgGridInfiniteAppend } from '@/shared/components/agGridUtils/AgGridUtils';
import { useTabs } from '@/shared/hooks/useTabs';
import { Grow, Gcol, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TableMore } from '@common/TablePagination';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon, PlusIcon } from '@icons';
import { LayoutMain, LayoutMainFoot } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

import { Ltpa350Step6Data } from '../data/ltpa350Step6Data';
import type { Ltpa350Step6GridRow, Ltpa350Step6GridRow1 } from '../data/ltpa350Step6Data';
import { Ltpz014 } from './popups/Ltpz014';

const DUMMY_DATA = {
  view1: [
    { value: 'user1', name: '홍길순 23세(여)' },
    { value: 'user2', name: '홍길동 42세(남)' },
    { value: 'user3', name: '김한화 31세(여)' },
    { value: 'user4', name: '박다온 28세(남)' },
    { value: 'user5', name: '이서준 45세(남)' },
    { value: 'user6', name: '최가은 37세(여)' },
    { value: 'user7', name: '정하늘 19세(여)' },
  ],
};

type ViewKey = keyof typeof DUMMY_DATA;
type Ltpa350Step6Props = {
  viewKey: ViewKey;
};

export const Ltpa350Step6 = ({ viewKey }: Ltpa350Step6Props) => {
  const { replaceTabs } = useTabs(DUMMY_DATA[viewKey]);

  const [isLtpz014Open, setIsLtpz014Open] = useState(false);

  const bankSelectCellRenderer = (params: ICellRendererParams<Ltpa350Step6GridRow>) =>
    editableSelectCellRenderer<Ltpa350Step6GridRow>(params);

  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
  });

  const gridRows = useMemo<Ltpa350Step6GridRow[]>(
    () => Ltpa350Step6Data.ImmediateDeposit,
    []
  );

  const gridRowsCard = useMemo<Ltpa350Step6GridRow1[]>(
    () => Ltpa350Step6Data.ImmediateDepositCard,
    []
  );

  const columnDefs = useMemo<ColDef<Ltpa350Step6GridRow>[]>(() =>
    [
      { 
        headerName: '구분', 
        field: 'sortation', 
        width: 70, 
        cellClass: 'text-center' 
      },
      { 
        headerName: '은행', 
        field: 'bank', 
        width: 110, 
        cellClass: 'text-center editable-cell',
        sortable: false,
        filter: false,
        editable: (params: EditableCallbackParams<Ltpa350Step6GridRow>) => params.data?.canEditExpiry ?? false,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['선택'],
        },
        cellRenderer: bankSelectCellRenderer,
      },
      { 
        headerName: '고객계좌번호', 
        field: 'customerAccountNum', 
        width: 220, 
        cellClass: 'text-left required editable-cell',
        cellEditor: 'agInputCellEditor',
        editable: true,
      },
      { 
        headerName: '금액',
        field: 'amount',
        width: 150,
        cellClass: 'text-right editable-cell',
        sortable: false,
        filter: false,
        editable: false,
        // cellEditor: 'agInputCellEditor',
        valueFormatter: numberValueFormatter,
        autoHeaderHeight: true,  // 줄바꿈 적용 시 필요
        wrapHeaderText: true,    // 줄바꿈 적용 시 필요 
        cellRenderer: (params: ICellRendererParams<Ltpa350Step6GridRow>) => (
          <Grow className="w-full h-full flex items-center gap-1">
            <input 
              aria-label=""
              className="ag-input-field-input ag-text-field-input w-[6.4rem]"
              value={String(params.data?.withdrawalStatus ?? '')}
              readOnly
              onClick={(e) => e.stopPropagation()}
            />
            원
          </Grow>
        ),
      },
      { 
        headerName: '출금동의상태', 
        field: 'withdrawalStatus', 
        width: 300, 
        cellClass: 'text-center editable-cell' ,
        sortable: false,
        filter: false,
        editable: true,
        // cellEditor: 'agInputCellEditor',
        cellRenderer: (params: ICellRendererParams<Ltpa350Step6GridRow>) => (
          <Grow className="w-full flex items-center gap-1 h-full py-1">
            <input 
              aria-label=""
              className="ag-input-field-input ag-text-field-input w-[6.4rem]"
              value={String(params.data?.withdrawalStatus ?? '')}
              readOnly
              onClick={(e) => e.stopPropagation()}
            />
            <Button variant={'outlined'} color={'secondary'} size={'lg'} className="flex-1 justify-between!">
              출금동의
              <PlusIcon color={'var(--color-secondary-50)'} />
            </Button>            
            <input
              aria-label=""
              className="ag-input-field-input ag-text-field-input w-[6.4rem]"
              value={''}
              readOnly
              onClick={(e) => e.stopPropagation()}
            />
            <Button variant={'outlined'} color={'secondary'} size={'lg'} className="flex-1 justify-between!">
              스캔
              <PlusIcon color={'var(--color-secondary-50)'} />
            </Button>
          </Grow>
        ),
      },
      { 
        headerName: '집금상태', 
        field: 'collectionStatus',
        flex: 1,
        cellClass: 'text-left required editable-cell',
        cellEditor: 'agInputCellEditor',
        editable: true,
      },
      { 
        headerName: '삭제', 
        field: 'delete', 
        width:100, 
        cellRenderer: (params: ICellRendererParams<Ltpa350Step6GridRow>) => (
          <Grow className="w-full h-full flex items-center gap-1">
            <Button variant={'outlined'} color={'secondary'} size={'lg'} className="flex-1 justify-between!">
              삭제
            </Button>            
          </Grow>
        ),
      },
    ],
    []
  );

  const columnDefs1 = useMemo<ColDef<Ltpa350Step6GridRow1>[]>(() =>
    [
      { 
        headerName: '구분', 
        field: 'sortation', 
        width: 70, 
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        editable: false,
      },
      { 
        headerName: '카드사', 
        field: 'cardIssuer', 
        width: 70, 
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        editable: false,
      },
      { 
        headerName: '카드번호', 
        field: 'cardNumber', 
        width: 70, 
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        editable: false,
      
      },
      { 
        headerName: '유효기간', 
        field: 'expiryDate', 
        width: 70, 
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        editable: false,
      },
      { 
        headerName: '할부', 
        field: 'installment', 
        width: 70, 
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        editable: false,
      },
      { 
        headerName: '금액', 
        field: 'amount', 
        width: 70, 
        cellClass: 'text-center',
        sortable: false, 
        filter: false,
        editable: false,
        valueFormatter: numberValueFormatter, 
      },
      { 
        headerName: '후청구', 
        field: 'postBilling', 
        width: 70, 
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        editable: false,
      },
      { 
        headerName: '승인번호', 
        field: 'approvalNumber', 
        width: 70, 
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        editable: false,
      },
      { 
        headerName: '승인상태', 
        field: 'approvalStatus', 
        width: 70, 
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        editable: false,
      },
      { 
        headerName: '삭제', 
        field: 'delete', 
        width: 70, 
        cellClass: 'text-center',
        sortable: false, 
        filter: false,
        editable: false,
        cellRenderer: (params: ICellRendererParams<Ltpa350Step6GridRow>) => (
          <Grow className="w-full h-full flex items-center gap-1">
            <Button variant={'outlined'} color={'secondary'} size={'lg'} className="flex-1 justify-between!">
              삭제
            </Button>            
          </Grow>
        ),
      },
    ],
    []
  );

  const pageSize = 4;
  const { loadedCount, totalCount, dataSource, handleLoadAll, handleLoadNext } = useAgGridInfiniteAppend({
    allRows: gridRows,
    pageSize,
  });

  const {
    loadedCount: loadedCountCard,
    totalCount: totalCountCard,
    dataSource: dataSourceCard,
    handleLoadAll: handleLoadAllCard,
    handleLoadNext: handleLoadNextCard,
  } = useAgGridInfiniteAppend({
    allRows: gridRowsCard,
    pageSize,
  });

  useEffect(() => {
    replaceTabs(DUMMY_DATA[viewKey]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewKey]);

  return (
    <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem]">
      <LayoutTemplateLTPA350MainBody
        mainBody={
          <Gcol placement={'ss'} className="w-full overflow-x-hidden" gap={3}>
            {viewKey === 'view1' && (
              <>
                <Grow className="w-full" variant="box-round" placement={'bwe'}>
                  <FormTable
                    variant={'none'}
                    lineTop={false}
                    caption="정액담보점검목록 조회"
                    cols={['flex-auto', 'flex-1', 'flex-auto', 'flex-1', 'flex-auto', 'flex-1']}
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
                          width="sm"
                          required
                        />
                      </FormCell>
                      <FormCell title={'조직구분'}>
                        <NativeSelect
                          aria-label="설계조직 선택"
                          value={form.type01}
                          width="10rem"
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
                          aria-label=""
                          width={'10rem'}
                          value={form.type02}
                          onChange={(e) => setFormField('type02', e.target.value)}
                          required
                        />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" width={'14rem'} value={'신부산GA지점'} readOnly />
                      </FormCell>
                      <FormCell title={'점검방법'}>
                        <NativeSelect
                          aria-label="점검방법 선택"
                          value={form.type03}
                          width="14rem"
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
                          aria-label=""
                          width={'14rem'}
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
                          width="14rem"
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
                          width="14rem"
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
                    >00
                      <ResetIcon />
                    </Button>
                  </Grow>
                </Grow>
                <Gcol placement={'ss'} className="w-full gap-1.5">
                  <Typo variant="heading-md">청약사항</Typo>
                  <FormTable cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
                    <FormRow>
                      <FormCell title={'보험종목'}>
                        <Input aria-label="보험종목" placeholder={''} width={'full'} value={'LIFEPLUS 3N5 간편건강보험'} readOnly />
                      </FormCell>
                      <FormCell title={'보험기간'}>
                        <DatePickerInput readOnly mode={'range'} />
                      </FormCell>
                      <FormCell title={'설계번호'}>
                        <Input aria-label="설계번호" width={'full'} value={'LA2401521476365'} readOnly />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'계약자'}>
                        <Input aria-label="계약자명" width={170} value={'김한화(00)'} readOnly />
                        <Input aria-label="계약자 주민등록번호" width={'full'} value={'940000-1******'} readOnly />
                      </FormCell>
                      <FormCell title={'수금자'}>
                        <Input aria-label="수금자" width={'full'} value={'김한화(8098884)'} readOnly />
                      </FormCell>
                      <FormCell title={'차량번호'}>
                        <Input aria-label="차량번호" width={'full'} value={''} readOnly />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'영수보험료'}>
                        <Input aria-label="총보험료" width={'full'} commaAmount value={'46500'} readOnly />원
                      </FormCell>
                      <FormCell title={'총보험료'}>
                        <Input aria-label="총보험료" width={'full'} commaAmount value={'46500'} readOnly />원
                      </FormCell>
                      <FormCell title={'입금구분'}>
                        <Input aria-label="입금구분" width={'full'} value={'장기초화납입'} readOnly />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'피보험자'}>
                        <Input aria-label="계약자명" width={170} value={'김한화(00)'} readOnly />
                        <Input aria-label="계약자 주민등록번호" width={'full'} value={'940000-1******'} readOnly />
                      </FormCell>
                      <FormCell title={'입금선택'} colSpan={4}>
                        <RadioGroup defaultValue="계약자">
                            {[
                              { value: '계약자', id: 'contractor', label: '계약자' },
                              { value: '피보험자', id: 'insurant', label: '피보험자' },
                            ].map((option) => (
                              <RadioGroupItem key={option.id} value={option.value} id={option.id}>
                                {option.label}
                              </RadioGroupItem>
                            ))}
                          </RadioGroup>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Gcol>
                
                <TableFold variant={'default'}>
                  <TableFoldHead title="즉시집금" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine">
                      <AgGridReact<Ltpa350Step6GridRow>
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
                        singleClickEdit={true}
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

                <TableFold variant={'default'}>
                  <TableFoldHead title="카드" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine">
                      <AgGridReact<Ltpa350Step6GridRow1>
                        getRowId={(params) => String(params.data.id)}
                        columnDefs={columnDefs1}
                        defaultColDef={{
                          sortable: false,
                          resizable: false,
                          editable: false,
                        }}
                        domLayout="autoHeight"
                        key={loadedCountCard}
                        rowModelType="infinite"
                        cacheBlockSize={pageSize}
                        maxBlocksInCache={2}
                        datasource={dataSourceCard}
                        singleClickEdit={true}
                      />
                    </div>
                    <TableMore
                      loadedCount={loadedCountCard}
                      totalCount={totalCountCard}
                      pageSize={pageSize}
                      onLoadAll={handleLoadAllCard}
                      onLoadNext={handleLoadNextCard}
                    />
                  </TableFoldBody>
                </TableFold>

                <TableFold variant={'default'}>
                  <TableFoldHead title="입금사항" />
                  <TableFoldBody>
                    <div className="ag-theme-alpine">
                      <AgGridReact<Ltpa350Step6GridRow>
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
                        singleClickEdit={true}
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
              </>
            )}
          </Gcol>
        }
      />

      <LayoutMainFoot>
        <MainBottom>
          <MainBottomItem>
            <Grow>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => setIsLtpz014Open(false)}>
                할부무이자
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => setIsLtpz014Open(false)}>
                원수(설계사/대리점 수납)
              </Button>
            </Grow>
            <Ltpz014 open={isLtpz014Open} onOpenChange={setIsLtpz014Open} />
            <Grow gap={1}>
              <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                수납
              </Button>
            </Grow>
          </MainBottomItem>
        </MainBottom>
      </LayoutMainFoot>
    </LayoutMain>
  );
};
