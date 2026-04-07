import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Button } from '@uiux/Button';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Popover, PopoverTrigger, PopoverContent } from '@uiux/Popover';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent, createFieldRenderer, useAgGridPagination } from '@aggrid';
import { useFormFields } from '@hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA904',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계데이터조회 &gt; 납입예정리스트 LTPA904</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA904Props = {
  isNoData?: boolean;
};

const LTPA904 = ({ isNoData = false }: LTPA904Props) => {

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

  // AgGrid Column 
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '납입회차',
      field: 'field01',
      width: 100,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '납입_응당일',
      field: 'field02',
      width: 120,
      cellClass: `text-center bg-white!`,
    },
    {
      headerName: '계약_영업보험료',
      field: 'field03',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '계약_영업보험료_이전',
      field: 'field04',
      width: 160,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립보험료',
      field: 'field05',
      width: 150,
      cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
    },
    {
      headerName: '적립보험료 이전',
      field: 'field06',
      width: 160,
      cellClass: `text-center bg-white!`,
    },
    {
      headerName: '계약_적용보험료',
      field: 'field07',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '계약_적용보험료_이전',
      field: 'field08',
      width: 160,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '계약_할인_보험료',
      field: 'field09',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '계약_할인_보험료_이전',
      field: 'field10',
      width: 160,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '담보_적용보험료_합계',
      field: 'field11',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '담보_적용보험료_합계_이전',
      field: 'field12',
      width: 160,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '할인_적립_담보_보험료',
      field: 'field13',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '할인_적립_담보_보험료_이전',
      field: 'field14',
      width: 160,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립순보험료',
      field: 'field15',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립순보험료_이전',
      field: 'field16',
      width: 160,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립_계수_01',
      field: 'field17',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립_계수_02',
      field: 'field18',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립금',
      field: 'field19',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '실손의료비예상납입보험료',
      field: 'field20',
      width: 180,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립보험료대체납입특약보험료',
      field: 'field21',
      width: 200,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '신계약비초년도영업보험료비율[α1]',
      field: 'field22',
      width: 220,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '신계약비초년도영업보험료비율[α2]',
      field: 'field23',
      width: 220,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '신계약비가입금액비율[αs]',
      field: 'field24',
      width: 180,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '신계약비일정금액[αc]',
      field: 'field25',
      width: 180,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '손해조사비차감유지비율[β(a%)]',
      field: 'field26',
      width: 200,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '손해조사비차감유지한도비율[β(b%)]',
      field: 'field27',
      width: 230,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '완납전유지비년납한도금액[β(c)]',
      field: 'field28',
      width: 200,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '완납전유지비일정금액[βc]',
      field: 'field29',
      width: 180,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '수금비영업보험료비율[β5]',
      field: 'field30',
      width: 180,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '손해조사비율[Ce(a%)]',
      field: 'field31',
      width: 180,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '손해조사비고정금액[Ce(c)]',
      field: 'field32',
      width: 180,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '회차_라운드_다운_여부',
      field: 'field33',
      width: 180,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '중도인출금액적립액',
      field: 'field34',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '적립대체보험료',
      field: 'field35',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '준비금대체보험료',
      field: 'field36',
      width: 150,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '할인율납입',
      field: 'field37',
      width: 120,
      cellClass: `text-right bg-white!`,
    },
    {
      headerName: '할인율만기',
      field: 'field38',
      width: 120,
      cellClass: `text-right bg-white!`,
    },
  ];
   
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(isNoData ? [] : DummyData);

  // form event
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
  });

  // ag-Grid + TablePagination 연동 (공통 훅 사용)
  const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
  const pageSize = 5;
  const {
    currentPage,
    totalPages,
    handleGridReady,
    handlePageChange
  } = useAgGridPagination(gridRef, pageSize);

  return (
    <Gcol className="w-full gap-[1.2rem]">
      {/* 조회 폼 */}
      <Grow className="w-full" variant="box-round" placement={'bwe'}>
        <FormTable variant={'none'}
          caption="납입예정 리스트 테이블"
          cols={[
            'w-[10rem]', 'min-w-[16rem] flex-1',
            'w-[10rem]', 'min-w-[16rem] flex-1',
            'w-[10rem]', 'min-w-[16rem] flex-1',
            'w-[10rem]', 'min-w-[16rem] flex-1',
            'w-[10rem]', 'min-w-[16rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'설계번호'}>
              <Input aria-label="" 
                width={'14rem'} 
                value={form.type01} 
                onChange={e => setFormField('type01', e.target.value)}
              />
            </FormCell>
            <FormCell title={'발행후변경순번'}>
              <Input aria-label="" 
                width={'14rem'} 
                value={form.type02} 
                onChange={e => setFormField('type02', e.target.value)} 
              />
            </FormCell>
            <FormCell title={'증권번호'}>
              <Input aria-label="" 
                width={'14rem'} 
                value={form.type03} 
                onChange={e => setFormField('type03', e.target.value)} 
              />
            </FormCell>
            <FormCell title={'시작납입회차'}>
              <Input aria-label="" 
                width={'14rem'} 
                value={form.type04} 
                onChange={e => setFormField('type04', e.target.value)} 
              />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'업무구분1'}>
              <NativeSelect
                aria-label="업무구분1 선택"
                width="14rem"
                value={form.type05}
                onChange={(e) => setFormField('type05', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type05-1', label: '(10)가입설계' },
                  { value: 'selection2', id: 'type05-2', label: '(20)변경설계' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'업무구분2'}>
              <NativeSelect
                aria-label="업무구분2 선택"
                width="14rem"
                value={form.type06}
                onChange={(e) => setFormField('type06', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type06-1', label: '(11)예상만기' },
                  { value: 'selection2', id: 'type06-2', label: '(13)최소최대' },
                  { value: 'selection3', id: 'type06-3', label: '(21)추천' },
                  { value: 'selection4', id: 'type06-4', label: '(12)인수심사' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'환급률'}>
              <Input aria-label="" 
                width={'14rem'} 
                value={form.type07} 
                onChange={e => setFormField('type07', e.target.value)} 
              />
            </FormCell>
            <FormCell title={'환급금'}>
              <Input aria-label="" 
                width={'14rem'} 
                value={form.type08} 
                onChange={e => setFormField('type08', e.target.value)}
              />
            </FormCell>
            <FormCell title={'추천구분'}>
              <NativeSelect
                aria-label="추천구분 선택"
                width="14rem"
                value={form.type09}
                onChange={(e) => setFormField('type09', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type09-1', label: '(10)목표환급율' },
                  { value: 'selection2', id: 'type09-2', label: '(01)목표환급율' },
                  { value: 'selection3', id: 'type09-3', label: '(02)목표환급금' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
          </FormRow>
        </FormTable>
        <Grow>
          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
            조회
          </Button>
          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
            새로고침
          </Button>
        </Grow>
      </Grow>

      {/* agGrid */}
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{ 
              sortable: false, 
              resizable: true,
            }}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
          />
        </div>
      </Grow>

      {/* 예상만기환급금 테이블 */}
      <Grow className="w-full">
        <FormTable caption="예상만기환급금 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1',]}>
          <FormRow>
            <FormCell title={'총예상납입보험료'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                commaAmount={true}
                after="원"
                value={form.type10} 
                onChange={e => setFormField('type10', e.target.value)}
              />
            </FormCell>
            <FormCell title={'중도환급금'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                commaAmount={true}
                after="원"
                value={form.type11} 
                onChange={e => setFormField('type11', e.target.value)}
              />
            </FormCell>
            <FormCell title={'예상만기환급금'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                commaAmount={true}
                after="원"
                value={form.type12}
                onChange={e => setFormField('type12', e.target.value)}
              />
            </FormCell>
            <FormCell title={'예상만기환급율'}>
              <Input
                placeholder=""
                size="lg"
                width="full"
                variant="default"
                after="%"
                value={form.type13}
                onChange={e => setFormField('type13', e.target.value)}
              />
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>

      {/* 추천보험료 테이블 */}
      <Grow className="w-full">
        <FormTable caption="추천보험료 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1',]}>
          <FormRow>
            <FormCell title={'추천보험료'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                commaAmount={true}
                after="원"
                value={form.type14}
                onChange={e => setFormField('type14', e.target.value)}
              />
            </FormCell>
            <FormCell title={'최소추천(출생후)'} colSpan={5}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="21.5rem"
                after="원"
                commaAmount={true}
                value={form.type15}
                onChange={e => setFormField('type15', e.target.value)}
              />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'최소추천보험료'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type16}
                onChange={e => setFormField('type16', e.target.value)}
              />
            </FormCell>
            <FormCell title={'최소예상만기환급율'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="%"
                value={form.type17}
                onChange={e => setFormField('type17', e.target.value)}
              />
            </FormCell>
            <FormCell title={'최대추천보험료'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type18}
                onChange={e => setFormField('type18', e.target.value)}
              />
            </FormCell>
            <FormCell title={'최대예상만기환급율'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="%"
                value={form.type19}
                onChange={e => setFormField('type19', e.target.value)}
              />
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>

      {/* 기타 테이블 */}
      <Grow className="w-full">
        <FormTable caption="기타 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1', 'w-[14rem]', 'min-w-[18rem] flex-1',]}>
          <FormRow>
            <FormCell title={'만기환급담보환급금'}>
              <Input
                placeholder=""
                size="lg"
                variant="default"
                width="full"
                after="원"
                commaAmount={true}
                value={form.type20}
                onChange={e => setFormField('type20', e.target.value)}
              />
            </FormCell>
            <FormCell title={'적립보험료대체납입특약보험료'}>
              <Input
                placeholder=""
                size="lg"
                width="full"
                after="원"
                commaAmount={true}
                variant="default"
                value={form.type21}
                onChange={e => setFormField('type21', e.target.value)}
              />
            </FormCell>
            <FormCell title={'실손의료비예상납입보험료'}>
              <Input
                placeholder=""
                size="lg"
                width="full"
                variant="default"
                after="원"
                commaAmount={true}
                value={form.type22}
                onChange={e => setFormField('type22', e.target.value)}
              />
            </FormCell>
            <FormCell title={'만기유지보너스'}>
              <Input
                placeholder=""
                size="lg"
                width="full"
                variant="default"
                after="원"
                commaAmount={true}
                value={form.type23}
                onChange={e => setFormField('type23', e.target.value)}
              />
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
    </Gcol>
  );
}

type Story = StoryObj<typeof meta>;

export const Ltpa904Story: Story = {
  render: () => <LTPA904 />,
};

export const Ltpa904NoData: Story = {
  render: () => <LTPA904 isNoData={true} />,
};