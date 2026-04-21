'use client';

// M1. 팝업에서 화면으로 변경
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent, numberValueFormatter } from '@aggrid';
import { Grid, Grow } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { BottomBar } from '@common/BottomBar';
import { PageID } from '@features/PageID';
import { ResetIcon, FileExportIcon } from '@icons';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

ModuleRegistry.registerModules([AllCommunityModule]);

type LTPA904TabType = {
  name: string;
  value: string;
  label: string;
};
const DATA_TABS: LTPA904TabType[] = [
  {
    name: '납입예정',
    value: 'tab1',
    label: '납입예정',
  },
  {
    name: '담보',
    value: 'tab2',
    label: '담보',
  },
];

// tab1 dummy data
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
  field28: string | number;
  field29: string | number;
  field30: string | number;
  field31: string | number;
  field32: string | number;
  field33: string | number;
  field34: string | number;
  field35: string | number;
  field36: string | number;
  field37: string | number;
  field38: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
    field20: '',
    field21: '',
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
    field37: '',
    field38: '',
  },
  {
    id: 2,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
    field20: '',
    field21: '',
    field22: '',
    field23: '',
    field24: '',
    field25: '',
    field26: '',
    field27: '',
    field28: '',
    field29: '',
    field30: '',
    field31: '',
    field32: '',
    field33: '',
    field34: '',
    field35: '',
    field36: '',
    field37: '',
    field38: '',
  },
];

// M1. DummyDataType2, DummyData2 갯수 추가
// tab2 dummy data
type DummyDataType2 = {
  id: number;
  field2_01: string | number;
  field2_02: string | number;
  field2_03: string | number;
  field2_04: string | number;
  field2_05: string | number;
  field2_06: string | number;
  field2_07: string | number;
  field2_08: string | number;
  field2_09: string | number;
  field2_10: string | number;
};
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field2_01: '',
    field2_02: '',
    field2_03: '',
    field2_04: '',
    field2_05: '',
    field2_06: '',
    field2_07: '',
    field2_08: '',
    field2_09: '',
    field2_10: '',
  },
  {
    id: 2,
    field2_01: '',
    field2_02: '',
    field2_03: '',
    field2_04: '',
    field2_05: '',
    field2_06: '',
    field2_07: '',
    field2_08: '',
    field2_09: '',
    field2_10: '',
  },
];

export default function Ltpa904Section() {
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '납입회차',
        field: 'field01',
        width: 100,
        autoHeight: true,
        editable: false,
        cellClass: 'text-center',
      },
      {
        headerName: '납입_응당일',
        field: 'field02',
        width: 120,
        autoHeight: true,
        editable: false,
        cellClass: 'text-center',
      },
      {
        headerName: '계약_영업보험료',
        field: 'field03',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '계약_영업보험료_이전',
        field: 'field04',
        width: 160,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '적립보험료',
        field: 'field05',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '적립보험료 이전',
        field: 'field06',
        width: 160,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '계약_적용보험료',
        field: 'field07',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '계약_적용보험료_이전',
        field: 'field08',
        width: 160,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '계약_할인_보험료',
        field: 'field09',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '계약_할인_보험료_이전',
        field: 'field10',
        width: 160,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '담보_적용보험료_합계',
        field: 'field11',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '담보_적용보험료_합계_이전',
        field: 'field12',
        width: 160,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '할인_적립_담보_보험료',
        field: 'field13',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '할인_적립_담보_보험료_이전',
        field: 'field14',
        width: 160,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '적립순보험료',
        field: 'field15',
        width: 150,
        autoHeight: true,
        editable: false,

        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '적립순보험료_이전',
        field: 'field16',
        width: 160,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '적립_계수_01',
        field: 'field17',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-center',
      },
      {
        headerName: '적립_계수_02',
        field: 'field18',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-center',
      },
      {
        headerName: '적립금',
        field: 'field19',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '실손의료비예상납입보험료',
        field: 'field20',
        width: 180,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '적립보험료대체납입특약보험료',
        field: 'field21',
        width: 200,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '신계약비초년도영업보험료비율[α1]',
        field: 'field22',
        width: 220,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '신계약비매년영업보험료비율[α2]', // M1. 텍스트 수정
        field: 'field23',
        width: 220,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '신계약비가입금액비율[αs]',
        field: 'field24',
        width: 180,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '신계약비일정금액[αc]',
        field: 'field25',
        width: 180,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '손해조사비차감유지비율[β(a%)]',
        field: 'field26',
        width: 200,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '손해조사비차감유지한도비율[β(b%)]',
        field: 'field27',
        width: 230,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '완납전유지비년납한도금액[β(c)]',
        field: 'field28',
        width: 200,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '완납전유지비일정금액[βc]',
        field: 'field29',
        width: 180,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '수금비영업보험료비율[β5]',
        field: 'field30',
        width: 180,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '손해조사비율[Ce(a%)]',
        field: 'field31',
        width: 180,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
      },
      {
        headerName: '손해조사비고정금액[Ce(c)]',
        field: 'field32',
        width: 180,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '회차_라운드_다운_여부',
        field: 'field33',
        width: 180,
        autoHeight: true,
        editable: false,
        cellClass: 'text-center',
      },
      {
        headerName: '중도인출금액적립액',
        field: 'field34',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '적립대체보험료',
        field: 'field35',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '준비금대체보험료',
        field: 'field36',
        width: 150,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '할인율납입',
        field: 'field37',
        width: 120,
        autoHeight: true,
        editable: false,
        cellClass: 'text-center',
      },
      {
        headerName: '할인율만기',
        field: 'field38',
        width: 120,
        autoHeight: true,
        editable: false,
        cellClass: 'text-center',
      },
    ],
    []
  );
  // M1. columnDefs2 전체 수정
  const columnDefs2 = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: '납입회차',
        field: 'field2_01',
        width: 100,
        editable: false,
        autoHeight: true,
        cellClass: 'text-center',
      },
      {
        headerName: '납입_응당일',
        field: 'field2_02',
        flex: 1,
        editable: false,
        autoHeight: true,
        cellClass: 'text-center',
      },
      {
        headerName: '계약_영업보험료',
        field: 'field2_03',
        flex: 1,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '계약_영업보험료_이전',
        field: 'field2_04',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '적립보험료',
        field: 'field2_05',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '적립보험료_이전',
        field: 'field2_06',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '계약_적립보험료',
        field: 'field2_07',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '계약_적립보험료_이전',
        field: 'field2_08',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '계약_할인_보험료',
        field: 'field2_09',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '계약_할인_보험료_이전',
        field: 'field2_10',
        flex: 1,
        autoHeight: true,
        editable: false,
        cellClass: 'text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
    ],
    []
  );
  
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '납입예정리스트',
            pageId: 'LTPA904',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          // M1. Grid 태그, gap 추가
          <Grid className="grid-rows-[auto_1fr]" gap={3}>
            <Grow placement="bwe" className="w-full" variant={'box-round'} gap={5}>
              <FormTable
                variant={'none'}
                caption="납입예정 리스트 테이블"
                cols={[
                  'flex-auto',
                  'flex-1',
                  'flex-auto',
                  'flex-1',
                  'flex-auto',
                  'flex-1',
                  'flex-auto',
                  'flex-1',
                  'flex-auto',
                  'flex-1',
                ]}
              >
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Input />
                  </FormCell>
                  <FormCell title={'발행후변경순번'}>
                    <Input />
                  </FormCell>
                  <FormCell title={'증권번호'}>
                    <Input />
                  </FormCell>
                  <FormCell title={'시작납입회차'}>
                    <Input />
                  </FormCell>
                </FormRow>
                {/* M1. 가로값 추가 */}
                <FormRow>
                  <FormCell title={'업무구분1'}>
                    <NativeSelect aria-label="업무구분1 선택" width={120}>
                      {[
                        { value: 'selection', label: '(10)가입설계' },
                        { value: 'selection2', label: '(20)변경설계' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'업무구분2'}>
                    <NativeSelect aria-label="업무구분2 선택" width={120}>
                      {[
                        { value: 'selection', label: '(11)예상만기' },
                        { value: 'selection2', label: '(13)최소최대' },
                        { value: 'selection3', label: '(21)추천' },
                        { value: 'selection4', label: '(12)인수심사' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </FormCell>
                  <FormCell title={'환급률'}>
                    <Input />
                  </FormCell>
                  <FormCell title={'환급금'}>
                    <Input />
                  </FormCell>
                  <FormCell title={'추천구분'}>
                    <NativeSelect aria-label="추천구분 선택" width={130}>
                      {[
                        { value: 'selection', label: '(10)목표환급율' },
                        { value: 'selection2', label: '(01)목표환급율' },
                        { value: 'selection3', label: '(02)목표환급금' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
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

            <TabPager
              data={tabs}
              active={active}
              setActive={setActive}
              removable={false}
              onRemove={handleRemove}
              visibleCount={4}
              variant="default"
              hasTableBelow={true}
              error={false}
              errorMsg="에러 메시지 예시"
              getValue={(tab) => String(tab.value)}
              renderTab={(tab) => <span>{tab.label}</span>}
              renderDropdownItem={false}
            >
              {active === 'tab1' ? (
                <Grid placement="ss" className="w-full h-full pt-2 grid-rows-[1fr_auto_auto_auto]" gap={5}>
                  <TableFold variant={'accordion'} className="grid grid-rows-[auto_1fr]">
                    <TableFoldHead title="납입예정" />
                    <TableFoldBody>
                      <div className="ag-theme-alpine w-full min-h-[13rem]">
                        <AgGridReact<DummyDataType>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={DummyData}
                          columnDefs={columnDefs}
                          domLayout="normal"
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                  {/* 예상만기환급금 테이블 */}
                  <TableFold variant={'accordion'}>
                    <TableFoldHead title="예상만기환급금"> {/* M1. 텍스트 수정 */}
                      <Grow>
                        <Button color="success" variant="outlined">
                          엑셀내보내기
                          <FileExportIcon />
                        </Button>
                      </Grow>
                    </TableFoldHead>
                    <TableFoldBody>
                      <FormTable
                        caption="예상만기환급금 테이블"
                        cols={[
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                        ]}
                      >
                        <FormRow>
                          <FormCell title={'총예상납입보험료'}>
                            <Input commaAmount={true} />원
                          </FormCell>
                          <FormCell title={'중도환급금'}>
                            <Input commaAmount={true} />원
                          </FormCell>
                          <FormCell title={'예상만기환급금'}>
                            <Input commaAmount={true} />원
                          </FormCell>
                          <FormCell title={'예상만기환급율'}>
                            <Input />%
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </TableFoldBody>
                  </TableFold>

                  {/* M1. 수정 */}
                  {/* 추천보험료 테이블 */}
                  <TableFold variant={'accordion'}>
                    <TableFoldHead title="추천보험료" />
                    <TableFoldBody>
                      <FormTable
                        caption="추천보험료 테이블"
                        cols={[
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                        ]}
                      >
                        <FormRow>
                          <FormCell title={'추천보험료'}>
                            <Input commaAmount={true} />원
                          </FormCell>
                          <FormCell title={'최소추천(출생후)'} colSpan={4}>
                            <Input commaAmount={true} />원
                          </FormCell>
                        </FormRow>

                        <FormRow>
                          <FormCell title={'최소추천보험료'}>
                            <Input commaAmount={true} />원
                          </FormCell>
                          <FormCell title={'최소예상만기환급율'}>
                            <Input />%
                          </FormCell>
                          <FormCell title={'최다추천보험료'}>
                            <Input commaAmount={true} />원
                          </FormCell>
                          <FormCell title={'최대예상만기환급율'}>
                            <Input />%
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </TableFoldBody>
                  </TableFold>
                  {/* 기타 테이블 */}
                  <TableFold variant={'accordion'}>
                    <TableFoldHead title="기타"></TableFoldHead>
                    <TableFoldBody>
                      <FormTable
                        caption="기타 테이블"
                        cols={[
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                        ]}
                      >
                        {/* M1. 텍스트 추가 */}
                        <FormRow>
                          <FormCell title={'만기환급담보환급금'}>
                            <Input commaAmount={true} />원
                          </FormCell>
                          <FormCell title={'적립보험료대체납입특약보험료'}>
                            <Input commaAmount={true} />원
                          </FormCell>
                          <FormCell title={'실손의료비예상납입보험료'}>
                            <Input commaAmount={true} />원
                          </FormCell>
                          <FormCell title={'만기유지보너스'}>
                            <Input commaAmount={true} />원
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </TableFoldBody>
                  </TableFold>
                </Grid>
              ) : (
                <Grid placement="ss" className="w-full h-full pt-2 grid-rows-[1fr_auto_auto_auto]" gap={5}>
                  <TableFold>
                    <TableFoldHead title="담보" />
                    <TableFoldBody>
                      <div className="ag-theme-alpine min-h-[13rem]">
                        <AgGridReact<DummyDataType2>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={DummyData2}
                          columnDefs={columnDefs2}
                          domLayout="normal"
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>

                  {/* 예상만기환급금 */}
                  <TableFold variant={'accordion'}>
                    <TableFoldHead title="예상만기환급금">
                      <Grow>
                        <Button color="success" variant="outlined">
                          엑셀내보내기
                          <FileExportIcon />
                        </Button>
                      </Grow>
                    </TableFoldHead>
                    <TableFoldBody>
                      <FormTable
                        caption="예상만기환급금 테이블"
                        cols={[
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                          'w-[14rem]',
                          'flex-1',
                        ]}
                      >
                        <FormRow>
                          <FormCell title={'총예상납입보험료'}>
                            <Input placeholder="" size="lg" variant="default" commaAmount={true} width="full" />원
                          </FormCell>
                          <FormCell title={'중도환급금'}>
                            <Input placeholder="" size="lg" variant="default" width="full" commaAmount={true} />원
                          </FormCell>
                          <FormCell title={'예상만기환급금'}>
                            <Input placeholder="" size="lg" variant="default" width="full" commaAmount={true} />원 {/* M1. commaAmount 추가 */}
                          </FormCell>
                          <FormCell title={'예상만기환급율'}>
                            <Input placeholder="" size="lg" variant="default" width="full" />%
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </TableFoldBody>
                  </TableFold>

                  {/* 추천보험료 */}
                  <TableFold variant={'accordion'}>
                    <TableFoldHead title="추천보험료"></TableFoldHead>
                    <TableFoldBody>
                      <Grow className="w-full">
                        <FormTable
                          caption="추천보험료 테이블"
                          cols={[
                            'w-[14rem]',
                            'flex-1',
                            'w-[14rem]',
                            'flex-1',
                            'w-[14rem]',
                            'flex-1',
                            'w-[14rem]',
                            'flex-1',
                          ]}
                        >
                          <FormRow>
                            <FormCell title={'추천보험료'}>
                              <Input commaAmount={true} />원
                            </FormCell>
                            {/* M1. 태그 삭제, colSpan 위치 수정 */}
                            <FormCell title={'최소추천(출생후)'} colSpan={4}>
                              <Input commaAmount={true} />원
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title={'최소추천보험료'}>
                              <Input commaAmount={true} />원
                            </FormCell>
                            <FormCell title={'최소예상만기환급율'}>
                              <Input />%
                            </FormCell>
                            <FormCell title={'최대추천보험료'}>
                              <Input commaAmount={true} />원
                            </FormCell>
                            <FormCell title={'최대예상만기환급율'}>
                              <Input />%
                            </FormCell>
                          </FormRow>
                        </FormTable>
                      </Grow>
                    </TableFoldBody>
                  </TableFold>

                  {/* 기타 */}
                  <TableFold variant={'accordion'}>
                    <TableFoldHead title="기타"></TableFoldHead>
                    <TableFoldBody>
                      <Grow className="w-full">
                        <FormTable
                          caption="기타 테이블"
                          cols={[
                            'w-[14rem]',
                            'flex-1',
                            'w-[14rem]',
                            'flex-1',
                            'w-[14rem]',
                            'flex-1',
                            'w-[14rem]',
                            'flex-1',
                          ]}
                        >
                          <FormRow>
                            <FormCell title={'만기환급담보환급금'}>
                              <Input commaAmount={true} />원
                            </FormCell>
                            <FormCell title={'적립보험료대체납입특약보험료'}>
                              <Input commaAmount={true} />원
                            </FormCell>
                            <FormCell title={'실손의료비예상납입보험료'}>
                              <Input commaAmount={true} />원
                            </FormCell>
                            <FormCell title={'만기유지보너스'}>
                              <Input commaAmount={true} />원
                            </FormCell>
                          </FormRow>
                        </FormTable>
                      </Grow>
                    </TableFoldBody>
                  </TableFold>
                </Grid>
              )}
            </TabPager>
          </Grid>
        }
        // M1. 푸터(버튼) 삭제
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
