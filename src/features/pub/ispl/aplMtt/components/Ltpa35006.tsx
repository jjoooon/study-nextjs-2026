/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ICellRendererParams, SelectionChangedEvent } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import { createCellClickSelectionToggleHandler, numberValueFormatter, useDynamicColumnWidths } from '@aggrid';
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

/**
 * @description 입금사항 ag-Grid 테이블의 각 행(Row) 데이터를 나타내는 타입 정의
 */
type Ltpa35006GridRow = {
  id: number; // 고유 식별 번호 (ID)
  field1: string | number; // 구분 값 (일반 행: 순번, 합계 행: 선택 건수 값)
  field2: string | number; // 입금일자 (일반 행: YYYY-MM-DD 형식의 문자열, 합계 행: '선택합계' 표시)
  field3: string | number; // 입금 금액
  field4: string | number; // 적요 내용
  field5: string | number; // 비고
  isSumRow?: boolean; // 합계(Summary) 행 여부를 구분하기 위한 플래그
};

/**
 * @description 컴포넌트 내 그리드 및 테이블에서 사용할 더미 데이터의 타입 정의
 */
interface DummyDataType {
  agGridTable: Ltpa35006GridRow[];
}

/**
 * @description 화면에 표시할 임시 입금사항 데이터 (더미 데이터)
 */
const DummyData: DummyDataType = {
  agGridTable: [
    {
      id: -1,
      field1: '선택건수',
      field2: '0',
      field3: '선택합계',
      field4: '46,500',
      field5: '',
      isSumRow: true, // 하단 요약(합계) 표시 행
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

export const Ltpa35006 = () => {
  // 화면 너비에 반응하여 ag-Grid의 컬럼 너비를 동적으로 조정하기 위한 커스텀 훅
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 화면 내부 각종 폼 필드(Input, Select 등)의 값들을 일괄적으로 관리하는 상태 관리 훅
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

  // 전체 입금 내역 목록을 메모이제이션 로드
  const gridRows = useMemo<Ltpa35006GridRow[]>(() => DummyData.agGridTable ?? [], []);

  // 입금 내역 중에서 하단 합계 행(isSumRow)을 필터링하여 실제 데이터 행만 추출
  const depositGridRows = useMemo(() => gridRows.filter((row) => !row.isSumRow), [gridRows]);

  // ag-Grid 내 체크박스로 선택된 입금 행의 건수 및 총 금액 합계 상태 변수
  const [selectedDepositCount, setSelectedDepositCount] = useState(0);
  const [selectedDepositAmount, setSelectedDepositAmount] = useState(0);

  // ag-Grid 하단에 고정되어 실시간으로 선택 금액 합계를 나타낼 pinned 행 데이터 설정
  const depositSumRow = useMemo<Ltpa35006GridRow[]>(
    () => [
      {
        id: -1,
        field1: String(selectedDepositCount), // 선택된 건수
        field2: '선택합계', // 합계 행 레이블
        field3: selectedDepositAmount, // 선택된 총 입금 금액 합계
        field4: '',
        field5: '',
        isSumRow: true,
      },
    ],
    [selectedDepositAmount, selectedDepositCount]
  );

  // ─── 입금사항 ag-Grid 컬럼 정의 ──────────────────────────────────────────────────────────
  const columnDefs = useMemo<ColDef<Ltpa35006GridRow>[]>(
    () => [
      {
        headerName: '구분',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(40),
        cellClass: 'text-center',
        // 하단 고정 pinned 행일 경우 구분 필드에 아무것도 표시하지 않음
        cellRenderer: (params: ICellRendererParams<Ltpa35006GridRow>) => (params.node.rowPinned ? '' : params.value),
      },
      {
        headerName: '입금일자',
        field: 'field2',
        sortable: false,
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-center',
        cellRenderer: (params: ICellRendererParams<Ltpa35006GridRow>) => params.value,
      },
      {
        headerName: '금액',
        field: 'field3',
        flex: 1,
        minWidth: attributeColumnWidth(80),
        cellClass: 'text-right',
        valueFormatter: numberValueFormatter, // 금액 세자리마다 천단위 콤마 포맷 적용
      },
      {
        headerName: '적요',
        field: 'field4',
        flex: 1,
        minWidth: attributeColumnWidth(200),
      },
      {
        headerName: '비고',
        field: 'field5',
        flex: 20,
      },
    ],
    [attributeColumnWidth]
  );

  // 그리드 셀 영역을 클릭하면 행이 자동으로 선택/해제(체크박스 토글)되도록 지정하는 핸들러
  const handleGridCellClickToggle = useMemo(() => createCellClickSelectionToggleHandler<Ltpa35006GridRow>(), []);

  /**
   * @description 그리드의 체크박스 선택 상태가 바뀔 때 실행되는 콜백 함수.
   *              선택된 일반 데이터들의 합계 금액 및 건수를 계산하여 상태를 동기화합니다.
   */
  const handleDepositSelectionChanged = useCallback((event: SelectionChangedEvent<Ltpa35006GridRow>) => {
    // 선택된 노드들 중 합계 행을 제외한 유효한 데이터 행만 필터링하여 가져옵니다.
    const selectedRows = event.api
      .getSelectedNodes()
      .map((node) => node.data)
      .filter((row): row is Ltpa35006GridRow => row !== undefined && !row.isSumRow);

    // 선택된 행들의 금액(field3)의 콤마를 제거한 뒤 전부 합산
    const nextSelectedAmount = selectedRows.reduce((total, row) => {
      let value = row.field3;
      if (typeof value === 'string') {
        value = value.replace(/,/g, '').trim();
      }
      const num = Number(value);

      // console.log('value:', isNaN(num), 'num:', num, total);

      return total + (isNaN(num) ? 0 : num);
    }, 0);

    // 선택된 건수와 총 합계 금액을 React 상태에 반영 -> depositSumRow 메모이제이션 갱신됨
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
                  {/* ────────────────────────────────────────────────────────────────────────
                      1. 검색 및 조회 영역 (영수관리번호 조회 조건 설정)
                      ──────────────────────────────────────────────────────────────────────── */}
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
                      {/* 조회 실행 버튼 */}
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
                      {/* 검색 조건 초기화 버튼 */}
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

                  {/* ────────────────────────────────────────────────────────────────────────
                      2. 청약사항 상세 정보 표시 영역 (읽기 전용 정보 및 라디오 선택)
                      ──────────────────────────────────────────────────────────────────────── */}
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
                          {/* 보험 적용 기간 표시용 날짜 범위 선택 컴포넌트 */}
                          <DatePickerInput readOnly mode={'range'} />
                        </FormCell>
                        <FormCell title={'설계번호'}>
                          <Input aria-label="설계번호" width={'full'} value={'LA2401521476365'} readOnly />
                        </FormCell>
                      </FormRow>
                      <FormRow>
                        <FormCell title={'계약자'}>
                          <Input aria-label="계약자명" width={170} value={'김한화(00)'} readOnly />
                          <Input aria-label="계약자 주민등록번호" width={'full'} value={'000000-0******'} readOnly />
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
                          <Input aria-label="계약자 주민등록번호" width={'full'} value={'000000-0******'} readOnly />
                        </FormCell>
                        {/* 입금 주체 선택 라디오 버튼 */}
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
                  {/* ────────────────────────────────────────────────────────────────────────
                      3. 즉시집금 설정 영역 (고객 계좌 즉시출금 동의 및 스캔)
                      ──────────────────────────────────────────────────────────────────────── */}
                  <TableFold variant={'default'}>
                    <TableFoldHead title="즉시집금"></TableFoldHead>
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
                          {/* 첫 번째 즉시집금 행 설정 */}
                          <TableRow>
                            <TableCell className="text-center">1</TableCell>
                            <TableCell>
                              {/* 은행 선택 셀렉트 */}
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
                              {/* 계좌번호 입력창 */}
                              <Input
                                size="lg"
                                variant="default"
                                placeholder="숫자만 입력"
                                onChange={(e) => setFormField('type08', e.target.value)}
                                value={form.type08}
                              />
                            </TableCell>
                            <TableCell>
                              {/* 집금 금액 입력창 */}
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
                              {/* 출금 동의를 위한 상태 입력 및 동의서 스캔 처리 영역 */}
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
                              {/* 현재 집금 진행 상태 표시 */}
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
                              {/* 행 삭제 버튼 */}
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

                          {/* 두 번째 즉시집금 행 설정 */}
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
                      {/* 즉시집금 처리 시 주의사항 안내 메시지 */}
                      <Typo variant="body-sm" color="primary" icon="info">
                        같은날 동일계좌의 동일금액으로 출금이 불가합니다. 집금상태 정상시 고객님의 계좌로부터
                        즉시이체출금에 성공한 것이니 입금내역을 확인하세요.
                      </Typo>
                    </TableFoldBody>
                  </TableFold>
                  {/* ────────────────────────────────────────────────────────────────────────
                      4. 카드 결제 정보 영역 (신용카드 결제 및 할부 정보 관리)
                      ──────────────────────────────────────────────────────────────────────── */}
                  <TableFold variant={'default'}>
                    <TableFoldHead title="카드"></TableFoldHead>
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
                          {/* 첫 번째 카드 결제 내역 행 */}
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
                              {/* 카드 번호 (4자리씩 총 16자리 입력) */}
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
                              {/* 카드 유효기간 (월 / 년) */}
                              <Grow>
                                <Input value={form.type14} onChange={(e) => setFormField('type14', e.target.value)} />
                                월
                                <Input value={form.type15} onChange={(e) => setFormField('type15', e.target.value)} />년
                              </Grow>
                            </TableCell>
                            <TableCell>
                              {/* 할부 개월 수 입력 */}
                              <Grow>
                                <Input value={form.type16} onChange={(e) => setFormField('type16', e.target.value)} />월
                              </Grow>
                            </TableCell>
                            <TableCell>
                              {/* 카드 결제 요청 금액 */}
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
                              {/* 후청구 선택 체크박스 */}
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
                              {/* 카드 승인 성공 시 승인번호 표시창 */}
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
                              {/* 승인 성공/실패 상태 표시창 */}
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

                          {/* 두 번째 카드 결제 내역 행 */}
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
                  {/* ────────────────────────────────────────────────────────────────────────
                      5. 입금사항 정보 그리드 영역 (ag-Grid를 이용한 다중 선택 및 자동 합계 계산)
                      ──────────────────────────────────────────────────────────────────────── */}
                  <TableFold variant={'default'}>
                    <TableFoldHead title="입금사항">
                      <Grow>
                        <Button variant={'outlined'} color={'gray'}>
                          입금입력
                        </Button>
                      </Grow>
                    </TableFoldHead>
                    <TableFoldBody>
                      <div className="ag-theme-alpine  inner-scroll" data-row={depositGridRows.length}>
                        <AgGridReact<Ltpa35006GridRow>
                          getRowId={(params) => String(params.data.id)}
                          rowData={depositGridRows} // 하단 합계를 뺀 순수 입금 내역 리스트
                          pinnedBottomRowData={depositSumRow} // 선택 건수 및 금액의 합계를 보여주는 하단 고정행
                          columnDefs={columnDefs} // 컬럼 정의
                          defaultColDef={{ sortable: true, resizable: true }}
                          domLayout="autoHeight"
                          singleClickEdit={true}
                          rowSelection={{
                            mode: 'multiRow' as const, // 다중 선택 허용
                            checkboxes: true, // 체크박스 렌더링
                            headerCheckbox: true, // 헤더의 일괄 선택 체크박스 사용
                            enableClickSelection: false, // 일반 셀 클릭 시 선택 방지
                            enableSelectionWithoutKeys: true,
                          }}
                          onCellClicked={handleGridCellClickToggle} // 셀을 직접 클릭해도 체크박스가 토글되도록 처리
                          onSelectionChanged={handleDepositSelectionChanged} // 체크 상태 바뀔 시 합계 계산
                          selectionColumnDef={{
                            headerName: '',
                            width: attributeColumnWidth(30),
                            ...({
                              colSpan: (params: { node?: { rowPinned?: boolean } }) => (params.node?.rowPinned ? 2 : 1),
                            } as Record<string, unknown>),
                            cellClass: 'text-center p-0! editable-cell',
                            cellRenderer: (params: ICellRendererParams<Ltpa35006GridRow>) =>
                              params.node.rowPinned ? `선택건수 ${params.data?.field1 ?? ''}` : null,
                            cellClassRules: {
                              'pointer-events-none': (params) => !!params.data?.locked,
                            },
                          }}
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                  {/* ────────────────────────────────────────────────────────────────────────
                      6. 수납사항 요약 영역 (보험료 영수금액/입금금액 차액 및 계약 정보 확인)
                      ──────────────────────────────────────────────────────────────────────── */}
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
                            {/* 수납번호 입력 양식 */}
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

                  {/* ────────────────────────────────────────────────────────────────────────
                      7. 수납일자 입력 및 확인 영역
                      ──────────────────────────────────────────────────────────────────────── */}
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

          {/* ────────────────────────────────────────────────────────────────────────
              8. 화면 하단 공통 기능 버튼 영역 (원수수납, 수납 처리)
              ──────────────────────────────────────────────────────────────────────── */}
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
