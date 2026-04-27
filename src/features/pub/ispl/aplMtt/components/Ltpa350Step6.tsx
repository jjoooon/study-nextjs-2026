'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-community';
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
import { EssentialIcon, ResetIcon, PlusIcon } from '@icons';
import { LayoutMain, LayoutMainFoot, LayoutScrollItem, LayoutScrollWrap, LayoutMainBody } from '@layout/BaseLayout';
import { LayoutTemplateLTPA350MainBody } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

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
      field2: '2023-01-01',
      field3: '1209495',
      field4: '',
      field5: '',
    },
    {
      id: 2,
      field1: '3',
      field2: '',
      field3: '23000',
      field4: '',
      field5: '',
    },
  ],
};

export const Ltpa350Step6 = () => {
  // const [isLtpz014Open, setIsLtpz014Open] = useState(false);
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
        field3: selectedDepositAmount,
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
        width: 50,
        cellClass: 'text-center',
      },
      {
        headerName: '입금일자',
        field: 'field2',
        sortable: false,
        width: 140,
        cellClass: 'text-center',
        cellRenderer: (params: ICellRendererParams<Ltpa350Step6GridRow>) => params.value,
      },
      {
        headerName: '금액',
        field: 'field3',
        width: 150,
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '적요',
        field: 'field4',
        width: 200,
      },
      {
        headerName: '비고',
        field: 'field5',
        flex: 1,
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
      let value = row.field3;
      if (typeof value === 'string') {
        value = value.replace(/,/g, '').trim();
      }
      const num = Number(value);

      // console.log('value:', isNaN(num), 'num:', num, total);

      return total + (isNaN(num) ? 0 : num);
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
                    {/* M1. FormTable 전체 수정 */}
                    <FormTable variant={'head'} lineTop={false} cols={['flex-auto', 'flex-1']}>
                      <FormRow>
                        <FormCell
                          title={
                            <Grow>
                              영수관리번호
                              <EssentialIcon aria-label="필수 입력" />
                            </Grow>
                          }
                        >
                          <Input aria-label="영수관리번호" value={'LA37784990'} />
                        </FormCell>
                      </FormRow>
                    </FormTable>
                    {/* //M1. FormTable 전체 수정 */}

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
                    <FormTable cols={['min-w-[8rem]', 'w-[30%]', 'min-w-[8rem]', 'w-[30%]', 'min-w-[8rem]', 'w-[30%]']}>
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
                    <TableFoldHead title="즉시집금">
                      <Grow>
                        <Checkbox id="selectAllDeposits" aria-label="영수보험표 입력"></Checkbox>
                      </Grow>
                    </TableFoldHead>
                    <TableFoldBody className="gap-1">
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
                      {/* M1. 문구추가 */}
                      <Typo variant="body-sm" color="primary" icon="info">
                        같은날 동일계좌의 동일금액으로 출금이 불가합니다. 집금상태 정상시 고객님의 계좌로부터
                        즉시이체출금에 성공한 것이니 입금내역을 확인하세요.
                      </Typo>
                    </TableFoldBody>
                  </TableFold>
                  {/* 카드 */}
                  <TableFold variant={'default'}>
                    <TableFoldHead title="카드">
                      <Grow>
                        <Checkbox id="selectAllDeposits" aria-label="영수보험표 입력"></Checkbox>
                      </Grow>
                    </TableFoldHead>
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
                    <TableFoldHead title="입금사항">
                      <Grow>
                        <Button variant={'outlined'} color={'gray'}>
                          입금입력
                        </Button>
                      </Grow>
                    </TableFoldHead>
                    <TableFoldBody>
                      <div className="ag-theme-alpine">
                        <AgGridReact<Ltpa350Step6GridRow>
                          getRowId={(params) => String(params.data.id)}
                          rowData={depositGridRows}
                          pinnedBottomRowData={depositSumRow}
                          columnDefs={columnDefs}
                          defaultColDef={{ sortable: true, resizable: true }}
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
                      {/* M1. cols 크기 수정 */}
                      <FormTable cols={['w-[10rem]', 'w-[auto]', 'w-[10rem]', 'w-[auto]', 'w-[10rem]', 'w-[auto]']}>
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
                    {/* M1. Grow 삭제 및 EssentialIcon 추가 */}
                    <Typo variant="heading-md" className="w-[7.1rem] flex items-center gap-0.5">
                      수납일자
                      <EssentialIcon aria-label="필수 입력" />
                    </Typo>
                    <Input aria-label="수납일자" width={100} value={'2024-03-18'} readOnly />
                  </Grow>
                </Gcol>
              </LayoutScrollItem>
            </LayoutScrollWrap>
          </LayoutMainBody>
          <LayoutMainFoot>
            {/* M1. MainBottom 수정 , variant="box" 추가 */}
            <MainBottom variant="box">
              <MainBottomItem className="bg-[var(--color-gray-5)]">
                <Grow gap={1}>
                  <Button form={'page2-MainForm'} size={'xl'}>
                    원수수납
                  </Button>
                  <Button form={'page2-MainForm'} size={'xl'}>
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
