import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Button } from '@uiux/Button';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler, DatePickerCellEditor, useAgGridPagination } from '@aggrid';
import { useFormFields } from '@hooks/useFormFields';
import { SearchIcon } from '@/shared/components/icons/CommonIcons';
import { Input } from '@/shared/components/uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA360_01',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 상품판매준비프로세스 &gt; 입력장표 LTPA360_01</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA360_01Props = {
  isNoData?: boolean; 
};

const LTPA360_01 = ({ isNoData = false }: LTPA360_01Props) => {
  

  // dummy data
  type DummyDataType = {

    id: number;
    isCheck: boolean;
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
  };
  const DummyData: DummyDataType[] = [
    {
      id: 1,
      isCheck: false,
      field01: 'LA02843001',  
      field02: '25년 10월 개정',
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
    },
    {
      id: 2,
      isCheck: false,
      field01: 'LA02843001',  
      field02: '한화 더건강한 1040 종합보험 무배당2510 - 기본형',
      field03: '',             
      field04: '',
      field05: 'LAC1208303',        
      field06: 'F552102',
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
    },
    {
      id: 3,
      isCheck: false,
      field01: 'LA02843001',  
      field02: '한화 더건강한 1040 종합보험 무배당2510 - 납입후 50% 해약 환급금 지급형',
      field03: '',             
      field04: '',
      field05: 'LAC1208303',        
      field06: 'F552102',
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
    },
    {
      id: 4,
      isCheck: false,
      field01: 'LA02843001',  
      field02: '한화 더건강한 1040 종합보험 무배당2510_TM - 기본형',
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
    },
    {
      id: 5,
      isCheck: false,
      field01: 'LA02843001',  
      field02: '한화 더건강한 1040 종합보험 무배당2510_TM - 납입후50% 해약 환급금 지급형',
      field03: '',             
      field04: '',
      field05: 'LAC1208303',        
      field06: 'F552102',
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
    },
    {
      id: 6,
      isCheck: false,
      field01: 'LA02843001',  
      field02: '한화 건강쑥쑥 어린이보험 무배당2510 - 기본형',
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
    },
    {
      id: 7,
      isCheck: false,
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
    },
    {
      id: 8,
      isCheck: false,
      field01: 'LA02843001',  
      field02: '한화 더건강한 1040 종합보험 무배당2510_TM - 기본형',
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
      field18: '개발중',              
      field19: '',              
      field20: '',              
      field21: '',             
    },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '상품코드',
      field: 'field01',
      width: 100,
      autoHeight: true,
      editable: true,
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      cellEditorParams: { values: ['선택', ''] },
    },
    {
      headerName: '상품명',
      field: 'field02',
      width: 230,
      editable: true,
      cellClass: 'truncate text-left'
    },
    {
      headerName: '판매일자',
      field: 'field03',
      width: 140,
      editable: true,
      cellClass: 'text-center',
      autoHeight: true,
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '계획/실적 구분',
      field: 'field04',
      width: 120,
      editable: true,
      cellClass: 'flex! items-center! justify-center!',
      wrapText: true,
      autoHeight: true,
      headerComponent: () => (
        <div className="w-full h-full flex items-center justify-center text-center whitespace-normal leading-5">
          계획/<br />실적
        </div>
      ),
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '실적', ''] },
    },
    {
      headerName: '담당자',
      children: [
        {
          headerName: '개발(정)',
          field: 'field05',
          width: 120,
          autoHeight: true,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
            <Grow className="w-full px-1" >
              <Input aria-label="" width={'100%'} size="sm" value={'박한화'} />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                <SearchIcon  color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
          ),
          // cellRenderer: attributeRenderer,
        },
        {
          headerName: '개발(부)',
          field: 'field06',
          width: 120,
          autoHeight: true,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
            <Grow className="w-full px-1" >
              <Input aria-label="" width={'100%'} size="sm" value={'박한화'} />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                <SearchIcon  color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
          ),
        },
        {
          headerName: '지원',
          field: 'field07',
          width: 120,
          autoHeight: true,

          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
          <Grow className="w-full px-1" >
            <Input aria-label="" width={'100%'} size="sm" value={'박한화'} />
            <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
              <SearchIcon  color={'var(--color-primary-50)'} />
            </Button>
          </Grow>
          ),
        },
        {
          headerName: 'IT',
          field: 'field08',
          width: 120,
          autoHeight: true,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
          <Grow className="w-full px-1" >
            <Input aria-label="" width={'100%'} size="sm" value={'박한화'} />
            <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
              <SearchIcon  color={'var(--color-primary-50)'} />
            </Button>
          </Grow>
          ),
        },
      ],
    },
    {
      headerName: '메모',
      children: [
        {
          headerName: '질문',
          field: 'field09',
          width: 70,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
        },
        {
          headerName: '답변',
          field: 'field10',
          width: 70,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
        },
      ],
    },
    {
      headerName: '체크 리스트',
      field: 'field11',
      width: 60,
      autoHeight: true,
      cellClass: 'text-center editable-cell flex! items-center justify-center!',
      cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
      cellEditor: 'agCheckboxCellEditor',     // ag-Grid 기본 체크박스 에디터 사용
      editable: true,
      wrapText: true,
      headerComponent: () => (
        <div className="w-full h-full flex items-center justify-center text-center whitespace-normal leading-5">
          체크/<br />리스트
        </div>
      ),
    },
    {
      headerName: '준비일정',
      children: [
        {
          headerName: '기초서류 송부',
          field: 'field12',
          width: 140,
          editable: true,
          cellClass: 'text-center',
          autoHeight: true,
          cellEditor: DatePickerCellEditor,
        },
        {
          headerName: '상품정보 시스템',
          field: 'field13',
          width: 140,
          editable: true,
          cellClass: 'text-center',
          autoHeight: true,
          cellEditor: DatePickerCellEditor,
        },
        {
          headerName: 'PV',
          field: 'field14',
          width: 120,
          editable: true,
          cellClass: 'text-center',
          autoHeight: true,
          cellEditor: 'agSelectCellEditor',
        },
        {
          headerName: '룰',
          field: 'field15',
          width: 80,
          editable: true,
          cellClass: 'text-center',
          autoHeight: true,
          cellEditor: 'agSelectCellEditor',
        },
      ],
    },
    {
      headerName: '테스트진행',
      children: [
        {
          headerName: '설계번호',
          field: 'field16',
          width: 90,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: ['선택', '', ''] },
        },
        {
          headerName: '테스트 결과',
          field: 'field17',
          width: 90,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: ['선택', '정상', '수납완료', '청약중', '설계중', '보험료계산오류', '환급금오류', '출력물오류', '기타오류'] },
        },
        {
          headerName: '청약서류 검수',
          field: 'field18',
          width: 90,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
          <Button
            color="secondary"
            onClick={() => {}}
            only="default"
            size="lg"
            variant="none"
            className="whitespace-nowrap"
          >
            {String(params.data?.field18 ?? '')}
          </Button>
        ),
        },
      ],
    },
    {
      headerName: '판매준비 완료여부',
      field: 'field19',
      width: 80,
      cellClass: 'text-center flex! items-center justify-center!',
      wrapText: true,
      autoHeight: true,
      headerComponent: () => (
        <div className="w-full h-full! flex items-center justify-center text-center whitespace-normal leading-5">
          판매준비/<br />완료여부
        </div>
      ),
    },
    {
      headerName: '개정 전 상품코드',
      field: 'field20',
      width: 80,
      editable: true,
      cellClass: 'flex! items-center! justify-center!',
      headerComponent: () => (
        <div className="w-full h-full! flex items-center justify-center text-center whitespace-normal leading-5">
          개정 전<br />상품코드
        </div>
      ),
    },
    {
      headerName: '개정 전 상품명',
      field: 'field21',
      width: 200,
      editable: true,
      cellClass: 'flex! items-center! justify-center!' 
    },
  ];


   
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(isNoData ? [] : DummyData);
  const [errorRows, setErrorRows] = React.useState<number[]>(
    DummyData.filter(row => !row.isCheck).map(row => row.id)
  );
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '', 
    type04: '', 
    type05: '', 
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
      <Grow className="w-full" variant="box-round" placement={'bwe'}>
        <FormTable variant={'none'}
          caption="입력장표 조회 테이블"
          cols={[
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'상품판매일자'}>
              <NativeSelect
                aria-label="상품판매일자 선택"
                width="12rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '2025-10-13' },
                  { value: 'selection2', id: 'type01-2', label: '2025-10-13' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'조회구분'}>
              <NativeSelect
                aria-label="조회구분 선택"
                width="9rem"
                value={form.type02}
                onChange={(e) => setFormField('type02', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '상품명' },
                  { value: 'selection2', id: 'type02-2', label: '상품코드' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input
                aria-label=""
                width={'17rem'}
                value={form.type03 || '12345678'}
                onChange={e => setFormField('type03', e.target.value)}
              />
               <NativeSelect
                aria-label="조회구분 선택"
                width="9rem"
                value={form.type04}
                onChange={(e) => setFormField('type04', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type04-1', label: '선택' },
                  { value: 'selection2', id: 'type04-2', label: '담당자' },
                  { value: 'selection3', id: 'type04-3', label: '담당부서' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input
                aria-label=""
                width={'15rem'}
                value={'신부산GA지점'}
                readOnly
              />
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
            onCellValueChanged={onCellValueChanged}


            // 체크박스 시
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: true,
              checkboxes: true,
              enableClickSelection: false,
            }}
            selectionColumnDef={{
              headerName: 'checkbox',
            }}
            onGridReady={params => {
              params.api.forEachNode(node => {
                if (node.data?.isCheck) {
                  node.setSelected(true);
                }
              });
            }}
          />
        </div>
      </Grow>
    </Gcol>
  );

}

type Story = StoryObj<typeof meta>;

export const LTPA360_01Story: Story = {
  render: () => <LTPA360_01 />,
};

export const LTPA360_01NoData: Story = {
  render: () => <LTPA360_01 isNoData={true} />,
};