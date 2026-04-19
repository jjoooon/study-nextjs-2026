'use client';

import { type ColDef, type ICellRendererParams, type SelectionChangedEvent } from 'ag-grid-community';

import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import {
  createCellClickSelectionToggleHandler,
  numberValueFormatter,
} from '@/shared/components/agGridUtils/AgGridUtils';
import { Grow, Gcol, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon, ResetIcon, PlusIcon } from '@icons';
import { LayoutMain, LayoutMainFoot, LayoutScrollItem, LayoutScrollWrap, LayoutMainBody } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

import { Ltpz014 } from '../../../shared/components/popups/Ltpz014';

type Ltpa350Step6GridRow = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  isSumRow?: boolean;
};

interface DummyDataType {
  agGridTable: Ltpa350Step6GridRow[];
}

const DummyData: DummyDataType = {
  agGridTable: [
    {
      id: -1,
      field1: '선택건수',
      field2: '0',
      field3: '선택합계',
      field4: '46,500',
      field5: '',
      isSumRow: true,
    },
    {
      id: 1,
      field1: '2',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
    },
    {
      id: 2,
      field1: '3',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
    },
  ],
};

export const Ltpa350Step6 = () => {
  const [isLtpz014Open, setIsLtpz014Open] = useState(false);
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '',
    type09: '',
    type10: '',
    type11: '',
    type12: '',
    type13: '',
    type14: '',
    type15: '',
    type16: '',
    type17: '',
    type18: '',
    type19: '',
    type20: '',
    type21: '',
    type22: '',
    type23: '',
    type24: '',
    type25: '',
    type26: '',
  });

  const gridRows = useMemo<Ltpa350Step6GridRow[]>(() => DummyData.agGridTable ?? [], []);

  const depositGridRows = useMemo(() => gridRows.filter((row) => !row.isSumRow), [gridRows]);

  const [selectedDepositCount, setSelectedDepositCount] = useState(0);
  const [selectedDepositAmount, setSelectedDepositAmount] = useState(0);

  const depositSumRow = useMemo<Ltpa350Step6GridRow[]>(
    () => [
      {
        id: -1,
        field1: String(selectedDepositCount),
        field2: '선택합계',
        field3: selectedDepositAmount.toLocaleString(),
        field4: '',
        field5: '',
        isSumRow: true,
      },
    ],
    [selectedDepositAmount, selectedDepositCount]
  );

  // ─── 입금사항 dummy data ──────────────────────────────────────────────────────────
  const columnDefs = useMemo<ColDef<Ltpa350Step6GridRow>[]>(
    () => [
      {
        headerName: '구분',
        field: 'field1',
        width: 110,
        cellClass: (params) => (params.data?.isSumRow ? 'text-right pr-2 font-bold' : 'text-center editable-cell'),
        sortable: false,
        filter: false,
        editable: (params) => !params.data?.isSumRow,
        cellEditor: 'agInputCellEditor',
        cellRenderer: (params: ICellRendererParams<Ltpa350Step6GridRow>) =>
          params.data?.isSumRow ? <b>{params.value}</b> : params.value,
      },
      {
        headerName: '입금일자',
        field: 'field2',
        sortable: false,
        width: 200,
        cellClass: (params) => (params.data?.isSumRow ? 'text-center font-bold' : 'text-left editable-cell'),
        editable: (params) => !params.data?.isSumRow,
        cellEditor: 'agInputCellEditor',
        cellRenderer: (params: ICellRendererParams<Ltpa350Step6GridRow>) =>
          params.data?.isSumRow ? <b>{params.value}</b> : params.value,
      },
      {
        headerName: '금액',
        field: 'field3',
        width: 150,
        cellClass: (params) => (params.data?.isSumRow ? 'text-right font-bold' : 'text-right'),
        headerClass: 'px-0!',
        sortable: false,
        filter: false,
        editable: (params) => !params.data?.isSumRow,
        valueParser: (params) => {
          const parsedValue = String(params.newValue ?? '')
            .replace(/,/g, '')
            .trim();
          return parsedValue === '' ? '' : Number(parsedValue) || 0;
        },
        valueFormatter: (params) => {
          if (params.data?.isSumRow) return String(params.value ?? '');
          return numberValueFormatter(params);
        },
        cellClassRules: {
          'ag-cell-error-border': (params) =>
            !params.data?.isSumRow && (params.value === '' || params.value === undefined || Number(params.value) === 0),
        },
        cellRenderer: (params: ICellRendererParams<Ltpa350Step6GridRow>) =>
          params.data?.isSumRow ? <b>{params.value}</b> : params.value,
      },
      {
        headerName: '적요',
        field: 'field4',
        width: 200,
        cellClass: (params) => (params.data?.isSumRow ? 'text-right font-bold' : 'text-right editable-cell'),
        sortable: false,
        filter: false,
        editable: (params) => !params.data?.isSumRow,
        cellRenderer: (params: ICellRendererParams<Ltpa350Step6GridRow>) =>
          params.data?.isSumRow ? <b>{params.value}</b> : params.value,
      },
      {
        headerName: '비고',
        field: 'field5',
        flex: 1,
        cellClass: 'text-center editable-cell',
        sortable: false,
        filter: false,
        editable: (params) => !params.data?.isSumRow,
      },
    ],
    []
  );

  const handleGridCellClickToggle = useMemo(() => createCellClickSelectionToggleHandler<Ltpa350Step6GridRow>(), []);

  const handleDepositSelectionChanged = useCallback((event: SelectionChangedEvent<Ltpa350Step6GridRow>) => {
    const selectedRows = event.api
      .getSelectedNodes()
      .map((node) => node.data)
      .filter((row): row is Ltpa350Step6GridRow => row !== undefined && !row.isSumRow);

    const nextSelectedAmount = selectedRows.reduce((total, row) => {
      const parsedValue = String(row.field3 ?? '')
        .replace(/,/g, '')
        .trim();
      return total + (parsedValue === '' ? 0 : Number(parsedValue) || 0);
    }, 0);

    setSelectedDepositCount(selectedRows.length);
    setSelectedDepositAmount(nextSelectedAmount);
  }, []);

  return (
    <LayoutTemplateLTPA350MainBody
      mainBody={
        <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem] h-full w-full">
          <LayoutMainBody>
            <LayoutScrollWrap>
              <LayoutScrollItem>
                <Gcol placement={'ss'} className="w-full overflow-x-hidden" gap={3}>
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
                            aria-label="조직구분 선택"
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
                            aria-label="점검결과 선택"
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
                      <Button
                        id="btnRA"
                        color="coolgray"
                        onClick={() => {}}
                        only="default"
                        size="lg"
                        variant="contained"
                      >
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

                  <Gcol placement={'ss'} className="w-full gap-1.5">
                    <Typo variant="heading-md">청약사항</Typo>
                    <FormTable cols={['w-[8rem]', 'w-[30rem]', 'w-[8rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]']}>
                      <FormRow>
                        <FormCell title={'보험종목'}>
                          <Input
                            aria-label="보험종목"
                            placeholder={''}
                            width={'full'}
                            value={'LIFEPLUS 3N5 간편건강보험'}
                            readOnly
                          />
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
                  {/* 즉시집금 */}
                  <TableFold variant={'default'}>
                    <TableFoldHead title="즉시집금" />
                    <TableFoldBody>
                      <Table variant="default">
                        <colgroup>
                          <col style={{ width: '5rem' }} />
                          <col style={{ width: '10rem' }} />
                          <col style={{ width: '14rem' }} />
                          <col style={{ width: 'auto' }} />
                          <col style={{ width: 'auto' }} />
                          <col style={{ width: '10rem' }} />
                          <col style={{ width: '5rem' }} />
                        </colgroup>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[4.5rem] min-w-[4.5rem]">구분</TableHead>
                            <TableHead>은행</TableHead>
                            <TableHead>고객계좌번호</TableHead>
                            <TableHead>금액</TableHead>
                            <TableHead>출금동의상태</TableHead>
                            <TableHead>집금상태</TableHead>
                            <TableHead>삭제</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="text-center">1</TableCell>
                            <TableCell>
                              <NativeSelect
                                size="lg"
                                value={form.type07}
                                variant="default"
                                width="full"
                                onChange={(e) => setFormField('type07', e.target.value)}
                              >
                                {[
                                  { value: 'selection', id: 'type07-1', label: '선택1' },
                                  { value: 'selection2', id: 'type07-2', label: '선택2' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </TableCell>
                            <TableCell>
                              <Input
                                size="lg"
                                variant="default"
                                placeholder="숫자만 입력"
                                onChange={(e) => setFormField('type08', e.target.value)}
                                value={form.type08}
                              />
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input
                                  size="lg"
                                  variant="default"
                                  placeholder=""
                                  width={'full'}
                                  onChange={(e) => setFormField('type09', e.target.value)}
                                  value={form.type09}
                                  commaAmount
                                />
                                원
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input
                                  onChange={() => {}}
                                  size="lg"
                                  value=""
                                  variant="default"
                                  width={120}
                                  placeholder=""
                                  commaAmount
                                  readOnly
                                />
                                <Button
                                  variant={'outlined'}
                                  color={'secondary'}
                                  size={'lg'}
                                  className="flex-1 justify-between! w-[80]"
                                >
                                  출금동의
                                  <PlusIcon color={'var(--color-secondary-50)'} />
                                </Button>
                                <Input
                                  onChange={() => {}}
                                  size="lg"
                                  value=""
                                  variant="default"
                                  width={120}
                                  placeholder=""
                                  commaAmount
                                  readOnly
                                />
                                <Button
                                  variant={'outlined'}
                                  color={'secondary'}
                                  size={'lg'}
                                  className="flex-1 justify-between!"
                                >
                                  스캔
                                  <PlusIcon color={'var(--color-secondary-50)'} />
                                </Button>
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Input
                                onChange={() => {}}
                                size="lg"
                                value=""
                                variant="default"
                                width="full"
                                placeholder=""
                                commaAmount
                                readOnly
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant={'outlined'}
                                color={'secondary'}
                                size={'lg'}
                                className="flex-1 justify-center! w-auto"
                              >
                                삭제
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="text-center">2</TableCell>
                            <TableCell className="w-[100]">
                              <NativeSelect
                                size="lg"
                                value={form.type07}
                                variant="default"
                                width="full"
                                onChange={(e) => setFormField('type07', e.target.value)}
                              >
                                {[
                                  { value: 'selection', id: 'type07-1', label: '선택1' },
                                  { value: 'selection2', id: 'type07-2', label: '선택2' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>
                                    {option.label}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </TableCell>
                            <TableCell>
                              <Input
                                size="lg"
                                variant="default"
                                placeholder="숫자만 입력"
                                onChange={(e) => setFormField('type08', e.target.value)}
                                value={form.type08}
                              />
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input
                                  size="lg"
                                  variant="default"
                                  placeholder=""
                                  width="full"
                                  onChange={(e) => setFormField('type09', e.target.value)}
                                  value={form.type09}
                                  commaAmount
                                />
                                원
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input
                                  onChange={() => {}}
                                  size="lg"
                                  value=""
                                  variant="default"
                                  width={120}
                                  placeholder=""
                                  commaAmount
                                  readOnly
                                />
                                <Button
                                  variant={'outlined'}
                                  color={'secondary'}
                                  size={'lg'}
                                  className="flex-1 justify-between! w-[80]"
                                >
                                  출금동의
                                  <PlusIcon color={'var(--color-secondary-50)'} />
                                </Button>
                                <Input
                                  onChange={() => {}}
                                  size="lg"
                                  value=""
                                  variant="default"
                                  width={120}
                                  placeholder=""
                                  commaAmount
                                  readOnly
                                />
                                <Button
                                  variant={'outlined'}
                                  color={'secondary'}
                                  size={'lg'}
                                  className="flex-1 justify-between!"
                                >
                                  스캔
                                  <PlusIcon color={'var(--color-secondary-50)'} />
                                </Button>
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Input
                                onChange={() => {}}
                                size="lg"
                                value=""
                                variant="default"
                                width="full"
                                placeholder=""
                                commaAmount
                                readOnly
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant={'outlined'}
                                color={'secondary'}
                                size={'lg'}
                                className="flex-1 justify-center! w-auto"
                              >
                                삭제
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableFoldBody>
                  </TableFold>
                  {/* 카드 */}
                  <TableFold variant={'default'}>
                    <TableFoldHead title="카드" />
                    <TableFoldBody>
                      <Table variant="default">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[4.5rem] min-w-[4.5rem]">구분</TableHead>
                            <TableHead>카드사</TableHead>
                            <TableHead>카드번호</TableHead>
                            <TableHead>유효기간</TableHead>
                            <TableHead>할부</TableHead>
                            <TableHead>금액</TableHead>
                            <TableHead className="w-[5.5rem] min-w-[5.5rem] text-center">후청구</TableHead>
                            <TableHead>승인번호</TableHead>
                            <TableHead>승인상태</TableHead>
                            <TableHead>삭제</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="w-[4.5rem] min-w-[4.5rem] text-center">1</TableCell>
                            <TableCell>
                              <Input
                                onChange={() => {}}
                                size="lg"
                                value=""
                                variant="default"
                                width="full"
                                placeholder=""
                                readOnly
                              />
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input value={form.type10} onChange={(e) => setFormField('type10', e.target.value)} />
                                -
                                <Input value={form.type11} onChange={(e) => setFormField('type11', e.target.value)} />
                                -
                                <Input value={form.type12} onChange={(e) => setFormField('type12', e.target.value)} />
                                -
                                <Input value={form.type13} onChange={(e) => setFormField('type13', e.target.value)} />
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input value={form.type14} onChange={(e) => setFormField('type14', e.target.value)} />
                                월
                                <Input value={form.type15} onChange={(e) => setFormField('type15', e.target.value)} />년
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input value={form.type16} onChange={(e) => setFormField('type16', e.target.value)} />월
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input
                                  value={form.type17}
                                  onChange={(e) => setFormField('type17', e.target.value)}
                                  commaAmount
                                />
                                원
                              </Grow>
                            </TableCell>
                            <TableCell className="w-[5.5rem] min-w-[5.5rem">
                              <Grow>
                                <Checkbox
                                  color="primary"
                                  errorMsg="선택은 필수입니다."
                                  errorPs="bl"
                                  onCheckedChange={() => {}}
                                  size="lg"
                                  variant="default"
                                />
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Input
                                onChange={() => {}}
                                size="lg"
                                value=""
                                variant="default"
                                width="full"
                                placeholder=""
                                readOnly
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                onChange={() => {}}
                                size="lg"
                                value=""
                                variant="default"
                                width="full"
                                placeholder=""
                                readOnly
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant={'outlined'}
                                color={'secondary'}
                                size={'lg'}
                                className="flex-1 justify-center! w-auto"
                              >
                                삭제
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="w-[4.5rem] min-w-[4.5rem] text-center">2</TableCell>
                            <TableCell>
                              <Input
                                onChange={() => {}}
                                size="lg"
                                value=""
                                variant="default"
                                width="full"
                                placeholder=""
                                readOnly
                              />
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input value={form.type18} onChange={(e) => setFormField('type18', e.target.value)} />
                                -
                                <Input value={form.type19} onChange={(e) => setFormField('type19', e.target.value)} />
                                -
                                <Input value={form.type20} onChange={(e) => setFormField('type20', e.target.value)} />
                                -
                                <Input value={form.type21} onChange={(e) => setFormField('type21', e.target.value)} />
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input value={form.type22} onChange={(e) => setFormField('type22', e.target.value)} />
                                월
                                <Input value={form.type23} onChange={(e) => setFormField('type23', e.target.value)} />년
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input value={form.type24} onChange={(e) => setFormField('type24', e.target.value)} />월
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Grow>
                                <Input
                                  size="lg"
                                  value={form.type25}
                                  variant="default"
                                  width="full"
                                  placeholder=""
                                  onChange={(e) => setFormField('type25', e.target.value)}
                                  commaAmount
                                />
                                원
                              </Grow>
                            </TableCell>
                            <TableCell className="w-[5.5rem] min-w-[5.5rem]">
                              <Grow>
                                <Checkbox
                                  color="primary"
                                  errorMsg="선택은 필수입니다."
                                  errorPs="bl"
                                  onCheckedChange={() => {}}
                                  size="lg"
                                  variant="default"
                                />
                              </Grow>
                            </TableCell>
                            <TableCell>
                              <Input
                                onChange={() => {}}
                                size="lg"
                                value=""
                                variant="default"
                                width="full"
                                placeholder=""
                                readOnly
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                onChange={() => {}}
                                size="lg"
                                value=""
                                variant="default"
                                width="full"
                                placeholder=""
                                readOnly
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant={'outlined'}
                                color={'secondary'}
                                size={'lg'}
                                className="flex-1 justify-center! w-auto"
                              >
                                삭제
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableFoldBody>
                  </TableFold>
                  {/* 입금사항 */}
                  <TableFold variant={'default'}>
                    <TableFoldHead title="입금사항" />
                    <TableFoldBody>
                      <div className="ag-theme-alpine">
                        <AgGridReact<Ltpa350Step6GridRow>
                          getRowId={(params) => String(params.data.id)}
                          rowData={depositGridRows}
                          pinnedBottomRowData={depositSumRow}
                          columnDefs={columnDefs}
                          defaultColDef={{ sortable: false, resizable: false, editable: false }}
                          domLayout="autoHeight"
                          singleClickEdit={true}
                          rowSelection={{
                            mode: 'multiRow' as const,
                            checkboxes: true,
                            headerCheckbox: true,
                            enableClickSelection: false,
                            enableSelectionWithoutKeys: true,
                          }}
                          onCellClicked={handleGridCellClickToggle}
                          onSelectionChanged={handleDepositSelectionChanged}
                          selectionColumnDef={{
                            headerName: '',
                            width: 50,
                            cellClass: 'text-center p-0!',
                            cellRenderer: (params: ICellRendererParams<Ltpa350Step6GridRow>) =>
                              params.node.rowPinned ? <b>선택건수</b> : null,
                            cellClassRules: {
                              'pointer-events-none': (params) => !!params.data?.locked,
                            },
                          }}
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                  {/* 수납사항 */}
                  <TableFold variant={'default'}>
                    <TableFoldHead title="수납사항" />
                    <TableFoldBody>
                      <FormTable cols={['w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]', 'w-[14rem]', 'w-[auto]']}>
                        <FormRow>
                          <FormCell title={'영수할보험료'}>
                            <Input aria-label="영수할보험료" width={'full'} commaAmount value={'46500'} readOnly />원
                          </FormCell>
                          <FormCell title={'입금보험료'}>
                            <Input aria-label="입금보험료" width={'full'} commaAmount value={'46500'} readOnly />원
                          </FormCell>
                          <FormCell title={'차액보험료'}>
                            <Input aria-label="차액보험료" width={'full'} commaAmount value={'46500'} readOnly />원
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'계약번호'}>
                            <Input aria-label="계약번호" width={'full'} value={''} readOnly />
                          </FormCell>
                          <FormCell title={'계상일자'}>
                            <Input aria-label="계상일자" width={'full'} value={''} readOnly />
                          </FormCell>
                          <FormCell title={'수납번호'}>
                            <Input
                              size="lg"
                              value={form.type26}
                              variant="default"
                              width="full"
                              placeholder=""
                              onChange={(e) => setFormField('type26', e.target.value)}
                            />
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </TableFoldBody>
                  </TableFold>
                  {/* 수납일자 */}
                  <Grow>
                    <Grow>
                      <Typo variant="heading-md" className="w-[7.1rem]">
                        수납일자
                      </Typo>
                    </Grow>
                    <Input aria-label="수납일자" width={100} value={'2024-03-18'} readOnly />
                  </Grow>
                </Gcol>
              </LayoutScrollItem>
            </LayoutScrollWrap>
          </LayoutMainBody>
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
      }
    />
  );
};
