/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createFieldRenderer } from '@aggrid';
import { Grid, Grow, Gcol } from '@atoms';
import { BottomBar } from '@common/BottomBar';

import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { PageID } from '@features/PageID';

import { ResetIcon, SearchIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';

import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';

import '@/shared/lib/agGridPub';
// dummy data
type DummyDataType = {
  id: number;
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
  field15: string | number;
  field16: string | number;
  field17: string | number;
  field18: string | number;
  field19: string | number;
  field20: string | number;
  field21: string | number;
  field22: string | number;
  field23: string | number;
  field24: string | number;
  field25: string | number;
  field26: string | number;
  field27: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'YYYY-MM-DD',
    field02: 'LA2414313',
    field03: 'TEXT',
    field04: 'TEXT',
    field05: 'TEXT',
    field06: '2A',
    field07: 'TEXT',
    field08: 'YYYY-MM-DD',
    field09: 'TEXT',
    field10: 'YYYY-MM-DD',
    field11: 'TEXT',
    field12: 'TEXT',
    field13: 'TEXT',
    field14: 'YYYY-MM-DD',
    field15: 'TEXT',
    field16: 'TEXT',
    field17: '김한화',
    field18: 'YYYY-MM-DD',
    field19: '김한화',
    field20: 'YYYY-MM-DD',
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
  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '전문개시일',
      autoHeight: true,
      children: [
        {
          headerName: '상품코드',
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType>('field23', 'field24'),
        },
      ],
    },
    {
      headerName: '피보험자명',
      autoHeight: true,
      children: [
        {
          headerName: '피보험자명',
          field: 'field25',
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
          width: 100,
          cellClass: 'text-center px-0!',
          autoHeight: true,
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
                    <RadioGroup className="gap-1" onValueChange={() => {}} width="full">
                      {[
                        { value: '전체', label: '전체' },
                        { value: '유효', label: '유효' },
                      ].map((option) => (
                        <RadioGroupItem key={option.value} value={option.value} size="lg">
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
                          { value: 'selection0401', label: '선택1' },
                          { value: 'selection0402', label: '선택2' },
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
                          { value: 'selection0401', label: '선택1' },
                          { value: 'selection0402', label: '선택2' },
                        ].map((option) => (
                          <NativeSelectOption key={option.value} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                    <FormCell title="신용정보제공구분">
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
                            aria-label="피보험자 검색"
                            variant={'outlined'}
                            only="icon"
                            size={'lg'}
                            color={'gray-light'}
                          >
                            <SearchIcon color={'var(--color-primary-50)'} />
                          </Button>
                          <Input aria-label="피보험자 나이" width={100} value={'김한화'} readOnly />
                        </Grow>
                        <Checkbox color="primary" errorMsg="선택은 필수입니다." errorPs="bl" onCheckedChange={() => {}}>
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
