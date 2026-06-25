/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { AgGridEmptyComponent, createFieldRenderer, useDynamicColumnWidths } from '@aggrid';
import { Grid, Grow, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';

import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { ResetIcon, SearchIcon } from '@icons';

import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

import '@/shared/lib/agGridPub';
// dummy data
type DummyDataType = {
  id: number;
  field01: string;
  field02: string;
  field03: string;
  field04: string;
  field05: string;
  field06: string;
  field07: string;
  field08: string;
  field09: string;
  field10: string;
  field11: string;
  field12: string;
  field13: string;
  field14: string;
  field15: string;
  field16: string;
  field17: string;
  field18: string;
  field19: string;
  field20: string;
  field21: string;
  field22: string;
  field23: string;
  field24: string;
  field25: string;
  field26: string;
  field27: string;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '2026-05-01',
    field02: 'LA2414313',
    field03: 'TEXT',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2A',
    field07: 'TEXT',
    field08: '2026-05-01',
    field09: 'TEXT',
    field10: '2026-05-01',
    field11: 'TEXT',
    field12: 'TEXT',
    field13: 'TEXT',
    field14: '2026-05-01',
    field15: 'TEXT',
    field16: 'TEXT',
    field17: '김한화',
    field18: '2026-05-01',
    field19: '김한화',
    field20: '2026-05-01',
    field21: '관계순번',
    field22: 'TEXT',
    field23: '김한화',
    field24: '김한화',
    field25: '김한화',
    field26: 'TEXT',
    field27: 'TEXT',
  },
  {
    id: 2,
    field01: '2026-05-01',
    field02: 'LA2414313',
    field03: 'TEXT',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2A',
    field07: 'TEXT',
    field08: '2026-05-01',
    field09: 'TEXT',
    field10: '2026-05-01',
    field11: 'TEXT',
    field12: 'TEXT',
    field13: 'TEXT',
    field14: '2026-05-08',
    field15: 'TEXT',
    field16: 'TEXT',
    field17: '김한화',
    field18: '2026-05-08',
    field19: '김한화',
    field20: '2026-05-08',
    field21: '관계순번',
    field22: 'TEXT',
    field23: '김한화',
    field24: '김한화',
    field25: '김한화',
    field26: 'TEXT',
    field27: 'TEXT',
  },
];

export default function Ltpa140Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  // 2026-06-01 width, flex 수정
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '전문개시일',
      autoHeight: true,
      children: [
        {
          headerName: '상품코드',
          flex: 1,
          minWidth: attributeColumnWidth(90),
          cellRenderer: createFieldRenderer<DummyDataType>('field01', 'field02'),
        },
      ],
    },
    {
      headerName: '전문번호',
      autoHeight: true,
      children: [
        {
          headerName: '의료비보종',
          flex: 1,
          minWidth: attributeColumnWidth(100),
          cellRenderer: createFieldRenderer<DummyDataType>('field03', 'field04'),
        },
      ],
    },
    {
      headerName: '전송순번',
      autoHeight: true,
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          minWidth: attributeColumnWidth(100),
          cellRenderer: createFieldRenderer<DummyDataType>('field05', 'field06'),
        },
      ],
    },
    {
      headerName: '종별코드',
      autoHeight: true,
      children: [
        {
          headerName: '보험시기',
          flex: 1,
          minWidth: attributeColumnWidth(100),
          cellRenderer: createFieldRenderer<DummyDataType>('field07', 'field08'),
        },
      ],
    },
    {
      headerName: '세부코드',
      autoHeight: true,
      children: [
        {
          headerName: '보험종기',
          flex: 1,
          minWidth: attributeColumnWidth(100),
          cellRenderer: createFieldRenderer<DummyDataType>('field09', 'field10'),
        },
      ],
    },
    {
      headerName: '등록구분',
      autoHeight: true,
      children: [
        {
          headerName: '배서번호',
          flex: 1,
          minWidth: attributeColumnWidth(100),
          cellRenderer: createFieldRenderer<DummyDataType>('field11', 'field12'),
        },
      ],
    },
    {
      headerName: '응답코드',
      cellClass: 'text-center',
      autoHeight: true,
      children: [
        {
          headerName: '배서기준일',
          flex: 1,
          minWidth: attributeColumnWidth(100),
          cellRenderer: createFieldRenderer<DummyDataType>('field13', 'field14'),
        },
      ],
    },
    {
      headerName: '처리상태',
      autoHeight: true,
      children: [
        {
          headerName: '계약상태',
          flex: 1,
          minWidth: attributeColumnWidth(100),
          cellRenderer: createFieldRenderer<DummyDataType>('field15', 'field16'),
        },
      ],
    },
    {
      headerName: '송신자',
      autoHeight: true,
      children: [
        {
          headerName: '상태변경일',
          width: attributeColumnWidth(90),
          cellRenderer: createFieldRenderer<DummyDataType>('field17', 'field18'),
        },
      ],
    },
    {
      headerName: '계약자명',
      autoHeight: true,
      children: [
        {
          headerName: '부활일자',
          width: attributeColumnWidth(90),
          cellRenderer: createFieldRenderer<DummyDataType>('field19', 'field20'),
        },
      ],
    },
    {
      headerName: '관계순번',
      autoHeight: true,
      children: [
        {
          headerName: '담보건수',
          field: 'field22',
          width: attributeColumnWidth(90),
          cellRenderer: createFieldRenderer<DummyDataType>('field21', 'field22'),
        },
      ],
    },
    {
      headerName: '피보험자번호',
      autoHeight: true,
      children: [
        {
          headerName: '변경후피보험자',
          field: 'field24',
          width: attributeColumnWidth(100),
          cellRenderer: createFieldRenderer<DummyDataType>('field23', 'field24'),
        },
      ],
    },
    {
      headerName: '피보험자명',
      autoHeight: true,
      children: [
        {
          headerName: '수신기관',
          field: 'field25',
          width: attributeColumnWidth(80),
          colSpan: () => 2,
          cellRenderer: (params: { data?: DummyDataType }) => {
            const field25 = String(params.data?.field25 ?? '');
            const field26 = String(params.data?.field26 ?? '');
            const field27 = String(params.data?.field27 ?? '');

            return (
              <div className="grid h-full w-full grid-rows-[1fr_1fr]">
                <div className="flex items-center justify-center truncate-no px-1">{field25}</div>
                <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200">
                  <div className="flex items-center justify-center truncate-no px-1">{field26}</div>
                  <div className="flex items-center justify-center truncate-no px-1">{field27}</div>
                </div>
              </div>
            );
          },
        },
        {
          headerName: '유효',
          field: 'field27',
          flex: 1,
          minWidth: attributeColumnWidth(80),
          colSpan: () => 0,
        },
      ],
    },
  ];

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '실손특약증권별등록',
            pageId: 'LTPA140',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr]" gap={3}>
            <Grow className="w-full" variant="box-round" placement={'bwe'}>
              <FormTable variant={'head'} caption="실손특약증권별등록 테이블" cols={['w-1', 'w-auto', 'w-1', 'w-auto']}>
                <FormRow>
                  <FormCell title={'증권번호'}>
                    <Input value={'LA2414313498143'} required />
                  </FormCell>
                  <FormCell title={'유효여부'}>
                    <RadioGroup defaultValue={'전체'} onValueChange={() => {}} width="full">
                      {[
                        { value: '전체', label: '전체' },
                        { value: '유효', label: '유효' },
                      ].map((option) => (
                        <RadioGroupItem key={option.value} value={option.value}>
                          {option.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
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
            <Gcol className="w-full" gap={1}>
              <div className="ag-theme-alpine min-h-150">
                <AgGridReact<DummyDataType>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  domLayout="normal"
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    cellClass: 'text-center px-0!',
                    autoHeight: true,
                  }}
                />
              </div>
            </Gcol>
            <TableFold variant="accordion">
              <TableFoldHead title="등록추가정보"></TableFoldHead>
              <TableFoldBody>
                <FormTable
                  caption="등록추가정보 테이블"
                  cols={['w-[10%]', 'w-[15%]', 'w-[10%]', 'w-[15%]', 'w-[10%]', 'w-[40%]']}
                  lineTop
                >
                  <FormRow>
                    <FormCell className="" title={'처리구분'} variant="default">
                      <NativeSelect
                        error
                        errorMsg="처리구분코드를 선택해 주세요."
                        errorPs="tl"
                        aria-label="처리구분"
                        value={''}
                        onChange={() => {}}
                      >
                        {[
                          { value: '선택', label: '선택' },
                          { value: '전송결과생성', label: '전송결과생성' },
                          { value: '전문전송처리', label: '전문전송처리' },
                          { value: '전송전DB저장', label: '전송전DB저장' },
                          { value: 'DB저장후전송', label: 'DB저장후전송' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                    <FormCell title="신용정보제공구분">
                      <NativeSelect
                        error
                        errorMsg="신용정보제공구분을 선택해 주세요."
                        errorPs="tl"
                        aria-label="처리구분"
                        value={''}
                        onChange={() => {}}
                      >
                        {[
                          { value: '선택', label: '선택' },
                          { value: '제외', label: '제외' },
                          { value: '온라인처리', label: '온라인처리' },
                          { value: '배치처리', label: '배치처리' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                    <FormCell title="피보험자">
                      <Grow placement="bwc">
                        <Grow>
                          <Input
                            aria-label="주민등록번호 마스킹"
                            width={120}
                            value={''}
                            placeholder={'______-_______'}
                            error
                            errorMsg="주민등록번호를 입력해주세요."
                            errorPs="tl"
                          />
                          <Button
                            aria-label="주민등록번호 검색"
                            variant={'outlined'}
                            only="icon"
                            size={'lg'}
                            color={'gray-light'}
                          >
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                          <Input aria-label="피보험자 이름" width={100} value={'김한화'} readOnly />
                        </Grow>
                        <Checkbox color="primary" errorMsg="" errorPs="bl" onCheckedChange={() => {}}>
                          전송전삭제처리
                        </Checkbox>
                      </Grow>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </TableFoldBody>
            </TableFold>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              <Grow gap={1}>
                <Button form={'page2-MainForm'} variant={'outlined'} color={'gray'} size={'xl'}>
                  삭제
                </Button>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  등록
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
