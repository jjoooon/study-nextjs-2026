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
import { useAgGridPagination } from '@/shared/components/agGridUtils';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA090_02',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 상품개정검수관리 LTPA090_02</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA090_02Props = {
  isNoData?: boolean;
};

const LTPA090_02 = ({ isNoData = false }: LTPA090_02Props) => {

  // dummy data
  type DummyDataType = {
    id: number;
    field01: string | number;
    isCheck: boolean;
  };
  const DummyData: DummyDataType[] = [
    {
      id: 1,
      field01: '상품/담보명의 형태 및 위치 등은 적정한지(약관상 명칭 사용 여부)',  
      isCheck: false,
    },
    {
      id: 2,
      field01: '기본계약과 특별약관의 보장내용이 명확하게 구분되어 있는지 확인',
      isCheck: false,
    },
    {
      id: 3,
      field01: '보험료 관련 내용의 정확한 기재',
      isCheck: false,
    },
    {
      id: 4,
      field01: '해약환급금 관련 내용의 정확한 기재',
      isCheck: false,
    },
    {
      id: 5,
      field01: '보험금 관련 내용의 정확한 기재 등',
      isCheck: false,
    },
    {
      id: 6,
      field01: '객관적 기준 또는 근거 제시 없이 극단적이고 단정적인 표현 사용여부',
      isCheck: false,
    },
    {
      id: 7,
      field01: '보장내용을 과장하거나 허위로 표현하고 있지 않은지',
      isCheck: false,
    },
    {
      id: 8,
      field01: '기타, 장애인 및 고령 금융소비자를 오인하게 하는 표현은 없는지',
      isCheck: false,
    },
    {
      id: 9,
      field01: '보험계약 체결 전 상품설명서와 약관 정독 권유하는 내용',
      isCheck: false,
    },
    {
      id: 10,
      field01: '(자필서명의 중요성 기재, 법적인 효력 포함)',  
      isCheck: false,
    },
    {
      id: 11,
      field01: '청약철회 방법과 계약 취소기간 기재',  
      isCheck: false,
    },
    {
      id: 12,
      field01: '예금자보호법에 따른 사항',  
      isCheck: false,
    },
    {
      id: 13,
      field01: '(보호 1종 상품, 보호 2종 상품, 비보호상품에 맞게 표현되어 있는지)',  
      isCheck: false,
    },
    {
      id: 14,
      field01: '회사명의 형태 및 위치 등은 적정한지(브랜드제작가이드 준수 여부)',  
      isCheck: false,
    },
    {
      id: 15,
      field01: '광고심의(CI규정, 디자인, 경고문구 작성 등)에 대한 검토관련',  
      isCheck: false,
    },
    {
      id: 16,
      field01: '보험금 지급제한 내용 등 보험금 지급 관련 유의사항 등',  
      isCheck: false,
    },
    {
      id: 17,
      field01: '제작부서는 심사 부서의 내용을 충분히 검토 후 안내자료 제작 여부',  
      isCheck: false,
    },
    {
      id: 18,
      field01: '관리번호 부여원칙 및 사용원칙 관련 준수여부 및 이행여부',  
      isCheck: false,
    },
  ];

  // AgGrid Column 
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '필수점검사항',
      field: 'field01',
      flex: 2.5,
      // cellClass: 'text-left flex! items-center! justify-start!',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Grow className="w-full px-1 justify-start" >
          <BulletItem
            className="whitespace-nowrap"
            color="default"
            data-before="ⓐ"
            size="md"
            type="dot"
          >
            { params.data?.field01 ?? '' }
          </BulletItem>
          
        </Grow>
      ),
    },
    {
      headerName: '이행여부',
      field: 'isCheck',
      width: 150, // 원하는 가로값으로 조정
      checkboxSelection: true,
      headerCheckboxSelection: false,
      cellClass: 'flex! items-center! justify-center!'
    },
  ];

  // rowSelection 사용시
  const [rowData] = React.useState<DummyDataType[]>(isNoData ? [] : DummyData);
  
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
          caption="최종제작본 결재 대상 상품 코드 조회 테이블"
          cols={[
            'w-[10rem]', 'min-w-[12rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'상품코드'}>
              LA02830
            </FormCell>
          </FormRow>
        </FormTable>
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
              headerCheckbox: false,
              checkboxes: false, // 체크박스는 columnDefs에서 처리
              enableClickSelection: false,
            }}
            // selectionColumnDef 제거: columnDefs에서 직접 처리
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

export const LTPA090_02Story: Story = {
  render: () => <LTPA090_02 />,
};