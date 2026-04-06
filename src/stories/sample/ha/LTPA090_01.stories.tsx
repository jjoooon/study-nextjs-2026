import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Button } from '@uiux/Button';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { BulletList, BulletListItem, BulletItem } from '@common/BulletList';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent, createCellValueChangedHandler, createFieldRenderer, DatePickerCellEditor, useAgGridPagination } from '@aggrid';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { Input } from '@uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA090_01',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 상품개정검수관리 LTPA090_01</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA090_01Props = {
  isNoData?: boolean;
};

const LTPA090_01 = ({ isNoData = false }: LTPA090_01Props) => {

  // 첫 번째 그리드 타입/데이터/컬럼
  // dummy data
  type DummyDataType = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;

  };
  const DummyData: DummyDataType[] = [
    {
      id: 1,
      field01: '2022-12-06 15:33:27',  
      field02: '김한화(8094210)',  
      field03: '상품설명서',  
      field04: '검수완료',  
      field05: 'LA01581001_무배당 참 편한 건강보험 1809(TM)_상품설명서_20220520_LA220518114508.tif적재',  
      field06: '',  
    },
    {
      id: 2,
      field01: '2022-12-06 15:33:27',  
      field02: '김한화(8094210)',  
      field03: '최종제작본',  
      field04: '검수요청',  
      field05: 'LA01581001_무배당 참 편한 건강보험 1809(TM)_상품설명서_20220520_LA220518114508.tif적재',
      field06: '',
    },
    {
      id: 3,
      field01: '2022-12-06 15:33:27',  
      field02: '김한화(8094210)',  
      field03: '',  
      field04: '반려',
      field05: 'LA01581001_무배당 참 편한 건강보험 1809(TM)_상품설명서_20220520_LA220518114508.tif적재',
      field06: '',
    },
  ];

  // AgGrid Column 
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '처리일시',
      field: 'field01',
      width: 200,
      cellClass: 'text-left flex! items-center! justify-center!',
    },
    {
      headerName: '처리자',
      field: 'field02',
      width: 160, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-center!'
    },
    {
      headerName: '검수구분',
      field: 'field03',
      width: 150, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-center!'
    },
    {
      headerName: '검수상태',
      field: 'field04',
      width: 150, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-center!'
    },
    {
      headerName: '검수이력',
      field: 'field05',
      flex: 2, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-start!'
    },
    {
      headerName: '다운로드',
      field: 'field06',
      width: 150, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          다운로드
        </Button>
      ),
    },
  ];

  // 두 번째 그리드 타입/데이터/컬럼
  interface DummyDataType2 {
    id: number;
    isCheck: boolean;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
  }

  const DummyData2: DummyDataType2[] = [
    { 
      id: 1, 
      isCheck: false,
      field01: '상품설명서', 
      field02: '2026-03-17', 
      field03: '검수완료', 
      field04: '검수완료(LA01581001_상품설명서(검수완료-테스)LA01581001_보험증권(반려-테스트)LA01581001_청약서(반려-))', 
      field05: '', 
    },
    { 
      id: 2, 
      isCheck: false,
      field01: '', 
      field02: '', 
      field03: '', 
      field04: '', 
      field05: '', 
    },
    { 
      id: 3, 
      isCheck: false,
      field01: '소비자 안내자료', 
      field02: '2026-03-18', 
      field03: '검수요청', 
      field04: '', 
      field05: '', 
    },
    
  ];
  const columnDefs2: ColDef<DummyDataType2>[] = [
    { 
      headerName: '검수구분', 
      field: 'field01', 
      width: 160, 
      cellClass: 'text-center flex! items-center! justify-center!', 
      autoHeight: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['상품설명서', '보장상세', '보험료', '소비자 안내자료', '브랜드 사전심사', '최종제작본', '청약서', '보험증권'] },
    },
    { 
      headerName: '최종적재일시', 
      field: 'field02', 
      width: 160, 
      cellClass: 'text-center flex! items-center! justify-center!',
      editable: true,
      cellEditor: DatePickerCellEditor,
    },
    { 
      headerName: '검수상태', 
      field: 'field03', 
      width: 160, 
      cellClass: 'text-center flex! items-center! justify-center!',
      autoHeight: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['검수요청', '검수완료', '반려'] },
    },
    { 
      headerName: '검수상세내용', 
      field: 'field04', 
      flex: 2, 
      editable: true,
      cellClass: 'editable-cell text-center flex! items-center justify-center!' 
    },
    { 
      headerName: '업로드', 
      field: 'field05', 
      width: 150, 
      cellClass: 'text-center flex! items-center justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          업로드
        </Button>
      ),
    },
    
  ];

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(isNoData ? [] : DummyData);
  // errorRows 및 onCellValueChanged는 첫 번째 그리드에서는 필요 없음 (isCheck 없음)

  const [rowData2] = React.useState<DummyDataType2[]>(isNoData ? [] : DummyData2);

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
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
          caption="상품개정검수관리 검수상세 조회 테이블"
          cols={[
            'w-[10rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'검색조건'}>
              <NativeSelect
                aria-label="검색조건 선택"
                width="12rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
                required
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '상품코드' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input
                aria-label=""
                width={'12rem'}
                size="md"
                value={form.type02 || 'LA01581001'}
                onChange={e => setFormField('type02', e.target.value)}
                required
              />
              <Input
                aria-label=""
                width={'27rem'}
                size="md"
                value={'무배당 참 편한 건강보험1809_TM'}
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
            defaultColDef={{ 
              sortable: false,
              resizable: true,
            }}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            suppressRowTransform={true}
          />
        </div>
      </Grow>

       <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-60!">
          <AgGridReact<DummyDataType2>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData2}
            columnDefs={columnDefs2}
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{ 
              sortable: false, 
              resizable: true,
            }}
            singleClickEdit={true}
            alwaysShowHorizontalScroll={true}

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
};

type Story = StoryObj<typeof meta>;

export const LTPA090_01Story: Story = {
  render: () => <LTPA090_01 />,
};