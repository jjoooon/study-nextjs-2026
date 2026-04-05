import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Button } from '@uiux/Button';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, CellClassParams, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent, DatePickerCellEditor, useAgGridPagination } from '@aggrid';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { Input } from '@uiux/Input';
import { DatePickerInput } from '@common/DatePicker';
import { SearchIcon } from '@icons';
import { TestData, TestDataType } from '@/stories/components/tables/TestAgGridData';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA090',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 상품개정검수관리 &gt; 검수대상 LTPA090</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA090Props = {
  isNoData?: boolean;
};

type GridRow = TestDataType['data'][number];


type GridRowWithSum = GridRow & { isSumRow?: boolean };


const LTPA090 = ({ isNoData = false }: LTPA090Props) => {
  const [DummyDataType, setRowData] = React.useState<GridRow[]>(TestData.data);

  const handleCellValueChanged = React.useCallback((params: any) => {
    if (!params.data || (params.data as GridRowWithSum)?.isSumRow) return;
    setRowData((prev) => {
      // id 기준으로 해당 row만 교체
      return prev.map((row) =>
        row.id === params.data.id ? { ...row, ...params.data } : row
      );
    });
  }, []);

  // dummy data
  type DummyDataType = {
    isCheck: boolean;
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;
    field07: string | number;
    field08: string | number;
  };
  const DummyData: DummyDataType[] = [
    {
      id: 1,
      isCheck: false,
      field01: 'LA0211',  
      field02: '한화 골드클래스 여성 간편건강보험 무배당2',  
      field03: '2026-03-01',  
      field04: '2026-01-01',  
      field05: '',  
      field06: '',  
      field07: '일부 검수미완료',  
      field08: '소비자 안내자료:검수완료, 상품설명서,:반려',  
    },
    {
      id: 2,
      isCheck: false,
      field01: 'LA0213',
      field02: '한화 100세 암치료보장보험 무배당2601',
      field03: '2026-03-01',
      field04: '2026-01-01',
      field05: '',
      field06: '',
      field07: '개발중',
      field08: '소비자 안내자료:검수완료, 상품설명서,:반려',
    },
    {
      id: 3,
      isCheck: false,
      field01: '',
      field02: '',
      field03: '',
      field04: '',
      field05: '',
      field06: '',
      field07: '개발중',
      field08: '',
    },
    {
      id: 4,
      isCheck: false,
      field01: 'LA0213',
      field02: '한화 건강쑥쑥 어린이보험 무배당2601_TM',
      field03: '',
      field04: '',
      field05: '',
      field06: '',
      field07: '개발중',
      field08: '',
    },
    {
      id: 5,
      isCheck: false,
      field01: 'LA0213',  
      field02: '한화 100세 암치료보장보험 무배당2601',  
      field03: '2026-03-01',
      field04: '2026-01-01',
      field05: '',  
      field06: '',  
      field07: '비대상',  
      field08: '소비자 안내자료:검수완료, 상품설명서,:반려',  
    },
  ];

  // AgGrid Column 
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '상품코드',
      field: 'field01',
      width: 120,
      cellClass: 'text-center flex! items-center! justify-center!',
      editable: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        // 예시: field01에 '반려' 포함시 빨강, '검수완료' 포함시 파랑, 아니면 기본
        const value = String(params.data?.field01 ?? '');
        let color = '';
        if (value.includes('반려')) color = 'text-red-500';
        else if (value.includes('검수완료')) color = 'text-blue-600';
        return (
          <span className={color} dangerouslySetInnerHTML={{ __html: value }} />
        );
      },
      cellEditor: 'agTextCellEditor',
      cellEditorParams: {
        useFormatter: false,
        getValue: (params: any) => {
          // HTML 태그 제거 후 값만 반환 (첫 포커스 시에도 적용)
          if (typeof params.value === 'string') {
            const div = document.createElement('div');
            div.innerHTML = params.value;
            return div.textContent || div.innerText || '';
          }
          return params.value;
        },
      },
      valueFormatter: (params: any) => params.value,
      valueParser: (params: any) => {
        // HTML 태그 제거 후 텍스트만 추출, 다시 span 태그로 감싸서 저장 (색상 유지)
        if (typeof params.newValue === 'string') {
          const div = document.createElement('div');
          div.innerHTML = params.newValue;
          const text = div.textContent || div.innerText || '';
          // 색상 조건: 예시로 '반려' 포함시 빨강, '검수완료' 포함시 파랑, 아니면 기본
          if (text.includes('반려')) {
            return `<span class="text-red-500">${text}</span>`;
          } else if (text.includes('검수완료')) {
            return `<span class="text-blue-600">${text}</span>`;
          } else {
            return `<span>${text}</span>`;
          }
        }
        return params.newValue;
      },
    },
    {
      headerName: '상품명',
      field: 'field02',
      width: 270, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-start!',
      editable: true,
    },
    {
      headerName: '판매일자',
      field: 'field03',
      width: 130, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-center!',
      editable: true,
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '검수기한',
      field: 'field04',
      width: 130, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-center!',
      editable: true,
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '담당자',
      field: 'field05',
      flex: 1.5, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-start!',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Grow className="w-full px-1" >
          <Input aria-label="" width={'100%'} size="sm" value={'김한화'} readOnly />
          <Input aria-label="" width={'100%'} size="sm" value={'8085111'} readOnly />
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
            <SearchIcon  color={'var(--color-primary-50)'} />
          </Button>
        </Grow>
      ),
    },
    {
      headerName: '관리번호',
      field: 'field06',
      width: 150, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-center!',
      editable: true,
    },
    {
      headerName: '검수단계',
      field: 'field07',
      width: 130, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
          { params.data?.field07 ?? '' }
        </Button>
      ),
    },
    {
      headerName: '세부상태',
      field: 'field08',
      width: 280, // 원하는 가로값으로 조정
      cellClass: 'flex! items-center! justify-center!',
    },
  ];

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(isNoData ? [] : DummyData);

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
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
          caption="상품개정검수관리 검수대상 조회 테이블"
          cols={[
            'w-[10rem]', 'min-w-[16rem] flex-1',
            'w-[10rem]', 'min-w-[16rem] flex-1',
            'w-[10rem]', 'min-w-[16rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'기간조회'} colSpan={5}>
              <NativeSelect
                aria-label="기간조회 선택"
                width="12rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
                required
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '검수일자' },
                  { value: 'selection', id: 'type01-2', label: '검수기한' },
                  { value: 'selection', id: 'type01-3', label: '판매일자' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-03', to: '2026-05' }} size="lg" width="sm" required />
              <NativeSelect
                aria-label=" 선택"
                width="12rem"
                value={form.type02}
                onChange={(e) => setFormField('type02', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '전체' },
                  { value: 'selection', id: 'type02-2', label: '1개월' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'검수구분'}>
              <NativeSelect
                aria-label="검수구분 선택"
                width="12rem"
                value={form.type03}
                onChange={(e) => setFormField('type03', e.target.value)}
                required
              >
                {[
                  { value: 'selection', id: 'type03-1', label: '상품설명서' },
                  { value: 'selection', id: 'type03-2', label: '보장상세' },
                  { value: 'selection', id: 'type03-3', label: '보험료' },
                  { value: 'selection', id: 'type03-4', label: '소비자 안내자료' },
                  { value: 'selection', id: 'type03-5', label: '브랜드 사전심사' },
                  { value: 'selection', id: 'type03-6', label: '최종제작본' },
                  { value: 'selection', id: 'type03-7', label: '청약서' },
                  { value: 'selection', id: 'type03-8', label: '보험증권' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'단계조건'}>
              <NativeSelect
                aria-label="단계조건 선택"
                width="12rem"
                value={form.type04}
                onChange={(e) => setFormField('type04', e.target.value)}
                required
              >
                {[
                  { value: 'selection', id: 'type04-1', label: '전체' },
                  { value: 'selection', id: 'type04-2', label: '개발중' },
                  { value: 'selection', id: 'type04-3', label: '검수중' },
                  { value: 'selection', id: 'type04-4', label: '재검토중' },
                  { value: 'selection', id: 'type04-5', label: '검수완료' },
                  { value: 'selection', id: 'type04-6', label: '비대상' },
                  { value: 'selection', id: 'type04-7', label: '사전검수중' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'검색조건'}>
              <NativeSelect
                aria-label="검색조건 선택"
                width="12rem"
                value={form.type05}
                onChange={(e) => setFormField('type05', e.target.value)}
                required
              >
                {[
                  { value: 'selection', id: 'type05-1', label: '상품코드' },
                  { value: 'selection', id: 'type05-2', label: '상품명' },
                  { value: 'selection', id: 'type05-3', label: '상품담당자' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input
                aria-label=""
                width={'12rem'}
                size="md"
                value={form.type06 || '12345678'}
                onChange={e => setFormField('type06', e.target.value)}
                required
              />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>  
              <Input
                aria-label=""
                width={'15rem'}
                size="md"
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
            defaultColDef={{ 
              sortable: false,
              resizable: true,
            }}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            suppressRowTransform={true}

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
  render: () => <LTPA090 />,
};