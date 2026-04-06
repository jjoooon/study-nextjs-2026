import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Button } from '@uiux/Button';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent } from '@/shared/components/agGridUtils';
import { useFormFields } from '@hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA360',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 상품판매준비프로세스 &gt; 총괄장표 LTPA360</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA360Props = {
  isNoData?: boolean; 
};

const LTPA360 = ({ isNoData = false }: LTPA360Props) => {
  

  // 첫 번째 그리드 타입/데이터/컬럼
  type DummyDataType1 = {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;
  };
  const DummyData1: DummyDataType1[] = [
    { 
      id: 1, 
      field01: '기초서류', 
      field02: '기초서류 작성 및 유관부서 송부', 
      field03: '2025-10-01', 
      field04: '2025-10-01', 
      field05: '30/50', 
      field06: '' 
    },
    { 
      id: 2, 
      field01: '상품정보', 
      field02: '상품정보시스템 입력', 
      field03: '2025-10-01', 
      field04: '2025-10-01', 
      field05: '30/50', 
      field06: '' 
    },
    { 
      id: 3, 
      field01: 'PV', 
      field02: '보험료 및 준비금 테이블 반영', 
      field03: '2025-10-01', 
      field04: '2025-10-01', 
      field05: '30/50', 
      field06: '' 
    },
    { 
      id: 4, 
      field01: '룰', 
      field02: '룰 시스템 개발 및 반영', 
      field03: '2025-10-01', 
      field04: '2025-10-01', 
      field05: '30/50', 
      field06: '' 
    },
    { 
      id: 5, 
      field01: '통합테스트개시', 
      field02: '관련부서 통합 설계 테스트', 
      field03: '', 
      field04: '', 
      field05: '', 
      field06: '' 
    },
    { 
      id: 6, 
      field01: '출력물검수', 
      field02: '청약서류(상품설명서, 청약서, 증권) 검수', 
      field03: '2025-10-01', 
      field04: '2025-10-01', 
      field05: '30/50', 
      field06: '' 
    },
    { 
      id: 7, 
      field01: '상품출시', 
      field02: '상품판매 준비완료', 
      field03: '2025-10-01', 
      field04: '2025-10-01', 
      field05: '30/50', 
      field06: '' 
    }
  ];
  const columnDefs1: ColDef<DummyDataType1>[] = [
    { 
      headerName: '단계별 진행현황', 
      field: 'field01', 
      width: 150, 
      cellClass: 'text-center flex! items-center! justify-center!', 
      cellEditorParams: { values: ['선택', ''] } 
    },
    { 
      headerName: '세부내용', 
      field: 'field02', 
      flex: 2.5, 
      cellClass: 'text-center flex! items-center! justify-center!' 
    },
    { 
      headerName: '계획일정', 
      field: 'field03', 
      width: 140, 
      cellClass: 'text-center flex! items-center! justify-center!' 
    },
    { 
      headerName: '완료일자', 
      field: 'field04', 
      width: 140, 
      cellClass: 'text-center flex! items-center justify-center!' 
    },
    { 
      headerName: '완료/대상', 
      field: 'field05', 
      flex: 1, 
      cellClass: 'text-center flex! items-center justify-center!' 
    },
    { 
      headerName: '진행율', 
      field: 'field06', 
      width: 500, 
      editable: true, 
      cellClass: 'flex! items-center! justify-center!' 
    },
  ];
  const [rowData1] = React.useState<DummyDataType1[]>(isNoData ? [] : DummyData1);

  // 두 번째 그리드 타입/데이터/컬럼

  interface DummyDataType2 {
    id: number;
    field01: string | number;
    field02: string | number;
    field03: React.ReactNode;
    field04: string | number;
    field05: string | number;
    field06: string | number;
    field07: string | number;
    field08: string | number;
    field09: string | number;
    field10: string | number;
  }

  const DummyData2: DummyDataType2[] = [
    { 
      id: 1, 
      field01: '<b>2025-10-13</b>', 
      field02: '<b>*</b>', 
      field03: '<b>25년 10월 개정</b>', 
      field04: '<b class="text-[var(--color-primary-50))]">지연(37)건</b>', 
      field05: '<b class="text-[var(--color-primary-50))]">지연(37)건</b>', 
      field06: '<b class="text-[var(--color-primary-50))]">지연(37)건</b>', 
      field07: '<b class="text-[var(--color-primary-50))]">지연(37)건</b>', 
      field08: '', 
      field09: '', 
      field10: '', 
    },
    { 
      id: 2, 
      field01: '2025-10-13', 
      field02: 'LA02768', 
      field03: '(담보추가)더건강한 한아름종합보험 2504 - 납입면제형, 기본형)', 
      field04: '미완료', 
      field05: '미완료', 
      field06: '미완료', 
      field07: '미완료', 
      field08: '미완료', 
      field09: '미완료', 
      field10: '준비중', 
    },
    { 
      id: 3, 
      field01: '2025-10-13', 
      field02: 'LA02769', 
      field03: '(담보추가)더건강한 한아름종합보험 2504 - 납입면제형, 기본형)', 
      field04: '미완료', 
      field05: '미완료', 
      field06: '미완료', 
      field07: '미완료', 
      field08: '미완료', 
      field09: '미완료', 
      field10: '준비중', 
    },
    { 
      id: 4, 
      field01: '2025-10-13', 
      field02: 'LA02770', 
      field03: '(담보추가)더건강한 한아름종합보험 2504 - 납입면제형, 기본형)', 
      field04: '미완료', 
      field05: '미완료', 
      field06: '미완료', 
      field07: '미완료', 
      field08: '미완료', 
      field09: '미완료', 
      field10: '준비중', 
    },
    
  ];
  const columnDefs2: ColDef<DummyDataType2>[] = [
    { 
      headerName: '판매일자', 
      field: 'field01', 
      width: 120, 
      cellClass: 'text-center flex! items-center! justify-center!', 
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        return (
          <div
            className="h-full w-full px-2 py-1 text-sm leading-5 break-words whitespace-normal"
            dangerouslySetInnerHTML={{ __html: String(params.data?.field01 ?? '') }}
          />
        );
      },
    },
    { 
      headerName: '보종코드', 
      field: 'field02', 
      flex: 0.8, 
      cellClass: 'text-center flex! items-center! justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        return (
          <div
            className="h-full w-full px-2 py-1 text-sm leading-5 break-words whitespace-normal"
            dangerouslySetInnerHTML={{ __html: String(params.data?.field02 ?? '') }}
          />
        );
      },
    },
    { 
      headerName: '보종명', 
      field: 'field03', 
      flex: 2, 
      cellClass: 'text-center flex! items-center! justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        return (
          <div
            className="h-full w-full px-2 py-1 text-sm leading-5 break-words whitespace-normal"
            dangerouslySetInnerHTML={{ __html: String(params.data?.field03 ?? '') }}
          />
        );
      },
    },
    { 
      headerName: '기초서류', 
      field: 'field04', 
      width: 100, 
      cellClass: 'text-center flex! items-center justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        return (
          <div
            className="h-full w-full px-2 py-1 text-sm leading-5 break-words whitespace-normal"
            dangerouslySetInnerHTML={{ __html: String(params.data?.field04 ?? '') }}
          />
        );
      },
    },
    { 
      headerName: '상품정보', 
      field: 'field05', 
      width: 100, 
      cellClass: 'text-center flex! items-center justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        return (
          <div
            className="h-full w-full px-2 py-1 text-sm leading-5 break-words whitespace-normal"
            dangerouslySetInnerHTML={{ __html: String(params.data?.field05 ?? '') }}
          />
        );
      },
    },
    { 
      headerName: 'PV', 
      field: 'field06', 
      width: 100, 
      editable: true, 
      cellClass: 'text-center flex! items-center! justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        return (
          <div
            className="h-full w-full px-2 py-1 text-sm leading-5 break-words whitespace-normal"
            dangerouslySetInnerHTML={{ __html: String(params.data?.field06 ?? '') }}
          />
        );
      },
    },
    { 
      headerName: '만납기룰', 
      field: 'field07', 
      width: 100, 
      editable: true, 
      cellClass: 'text-center flex! items-center! justify-center!',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        return (
          <div
            className="h-full w-full px-2 py-1 text-sm leading-5 break-words whitespace-normal"
            dangerouslySetInnerHTML={{ __html: String(params.data?.field07 ?? '') }}
          />
        );
      },
    },
    { 
      headerName: '설계테스트', 
      field: 'field08', 
      width: 100, 
      editable: true, 
      cellClass: 'flex! items-center! justify-center!' 
    },
    { 
      headerName: '츨력물검수', 
      field: 'field09', 
      width: 100, 
      editable: true, 
      cellClass: 'flex! items-center! justify-center!' 
    },
    { 
      headerName: '판매준비', 
      field: 'field10', 
      width: 100, 
      editable: true, 
      cellClass: 'flex! items-center! justify-center!' 
    },
  ];
  const [rowData2] = React.useState<DummyDataType2[]>(isNoData ? [] : DummyData2);

  // form event
  const [form, setFormField] = useFormFields({ type01: '' });

  return (
    <Gcol className="w-full gap-[1.2rem]">
      <Grow className="w-full" variant="box-round" placement={'bwe'}>
        <FormTable variant={'none'}
          caption="입력장표 조회 테이블"
          cols={['w-[10rem]', 'min-w-[14rem] flex-1']}
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
      {/* 첫 번째 AgGrid */}
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-60! mb-8">
          <AgGridReact<DummyDataType1>
            getRowId={(params) => String(params.data.id)}
            rowData={rowData1}
            columnDefs={columnDefs1}
            noRowsOverlayComponent={AgGridEmptyComponent}
            defaultColDef={{ 
              sortable: false, 
              resizable: true,
            }}
            alwaysShowHorizontalScroll={true}
          />
        </div>
      </Grow>
      {/* 두 번째 AgGrid */}
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
            alwaysShowHorizontalScroll={true}
          />
        </div>
      </Grow>
    </Gcol>
  );
}

// (중복 정의 제거, 컴포넌트 종료)

type Story = StoryObj<typeof meta>;

export const LTPA3601Story: Story = {
  render: () => <LTPA360 />,
};