/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import '@/shared/lib/agGridPub';
import type { Meta, StoryObj } from '@storybook/react';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent } from '@aggrid';

// 샘플 그리드 행 데이터 타입 정의
interface SampleCoverageRow {
  id: number;
  coverageCode: string;
  coverageName: string;
  insuredAmount: string;
  premium: string;
  period: string;
  status: string;
}

// 기본 샘플 데이터 (총 10건)
const MOCK_ROWS: SampleCoverageRow[] = [
  {
    id: 1,
    coverageCode: 'CV001',
    coverageName: '보통약관(상해사망)',
    insuredAmount: '5,000만',
    premium: '700',
    period: '100세만기 20년납',
    status: '정상',
  },
  {
    id: 2,
    coverageCode: 'CV002',
    coverageName: '보험료납입면제대상보장(6대사유Ⅱ)',
    insuredAmount: '10만',
    premium: '154',
    period: '100세만기 20년납',
    status: '정상',
  },
  {
    id: 3,
    coverageCode: 'CV003',
    coverageName: '보장보험료50%납입지원Ⅱ(4대유사암)',
    insuredAmount: '5만',
    premium: '2,769',
    period: '20년만기 전기납',
    status: '정상',
  },
  {
    id: 4,
    coverageCode: 'CV004',
    coverageName: '4대유사암진단비(기타피부암)',
    insuredAmount: '600만',
    premium: '240',
    period: '100세만기 20년납',
    status: '정상',
  },
  {
    id: 5,
    coverageCode: 'CV005',
    coverageName: '4대유사암진단비(갑상선암)',
    insuredAmount: '600만',
    premium: '1,416',
    period: '100세만기 20년납',
    status: '정상',
  },
  {
    id: 6,
    coverageCode: 'CV006',
    coverageName: '여성통합암(4대유사암제외)진단비Ⅱ',
    insuredAmount: '3,900만',
    premium: '31,440',
    period: '100세만기 20년납',
    status: '정상',
  },
  {
    id: 7,
    coverageCode: 'CV007',
    coverageName: '암(4대유사암제외)특정치료비(상급종합병원등)',
    insuredAmount: '9,000만',
    premium: '36,000',
    period: '100세만기 20년납',
    status: '정상',
  },
  {
    id: 8,
    coverageCode: 'CV008',
    coverageName: '뇌혈관질환진단비',
    insuredAmount: '1,000만',
    premium: '7,860',
    period: '100세만기 20년납',
    status: '정상',
  },
  {
    id: 9,
    coverageCode: 'CV009',
    coverageName: '허혈성심장질환진단비',
    insuredAmount: '1,000만',
    premium: '4,520',
    period: '100세만기 20년납',
    status: '정상',
  },
  {
    id: 10,
    coverageCode: 'CV010',
    coverageName: '질병입원일당(1일이상, 180일한도)',
    insuredAmount: '3만',
    premium: '6,200',
    period: '100세만기 20년납',
    status: '정상',
  },
];

// 컬럼 정의
const COLUMN_DEFS: ColDef<SampleCoverageRow>[] = [
  {
    headerName: 'No',
    field: 'id',
    width: 60,
    cellClass: 'text-center',
    suppressMovable: true,
  },
  {
    headerName: '코드',
    field: 'coverageCode',
    width: 90,
    cellClass: 'text-center',
  },
  {
    headerName: '담보명',
    field: 'coverageName',
    flex: 1,
    minWidth: 220,
  },
  {
    headerName: '가입금액',
    field: 'insuredAmount',
    width: 110,
    cellClass: 'text-right',
  },
  {
    headerName: '보험료(원)',
    field: 'premium',
    width: 100,
    cellClass: 'text-right',
  },
  {
    headerName: '납기/만기',
    field: 'period',
    width: 160,
    cellClass: 'text-center',
  },
];

/**
 * AG Grid InnerScroll 래퍼 컴포넌트 Props
 */
interface AgGridInnerScrollSampleProps {
  /** data-row 행 지정 (1 ~ 6) */
  dataRow: 1 | 2 | 3 | 4 | 5 | 6;
  /** 그리드에 공급할 총 데이터 행 수 (기본: 10건) */
  totalRows?: number;
  /** 타이틀 표기 여부 */
  title?: string;
  /** 설명 표기 */
  description?: string;
}

/**
 * inner-scroll 및 data-row 속성이 적용된 단일 그리드 뷰
 */
export function AgGridInnerScrollSample({
  dataRow = 4,
  totalRows = 10,
  title,
  description,
}: AgGridInnerScrollSampleProps) {
  const rowData = React.useMemo(() => {
    return MOCK_ROWS.slice(0, totalRows);
  }, [totalRows]);

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-md border border-gray-200 shadow-xs">
      <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
        <div>
          <h4 className="text-[1.4rem] font-bold text-gray-900">
            {title ?? `data-row="${dataRow}" (고정 ${dataRow}행 높이)`}
          </h4>
          {description && <p className="text-[1.2rem] text-gray-500 mt-0.5">{description}</p>}
        </div>
        <div className="text-[1.2rem] text-gray-600 font-medium">
          현재 데이터: <span className="text-orange-600 font-bold">{rowData.length}건</span> / 표시 기준:{' '}
          <span className="font-bold">{dataRow}행</span>
          {rowData.length > dataRow && (
            <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-sm">
              내부 스크롤 발생
            </span>
          )}
        </div>
      </div>

      {/* 핵심: .ag-theme-alpine.inner-scroll 에 data-row 속성 적용 */}
      <div className="ag-theme-alpine inner-scroll" data-row={dataRow}>
        <AgGridReact<SampleCoverageRow>
          getRowId={(params) => String(params.data.id)}
          rowData={rowData}
          columnDefs={COLUMN_DEFS}
          noRowsOverlayComponent={AgGridEmptyComponent}
          noRowsOverlayComponentParams={{ message: '조회정보가 없습니다.' }}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          headerHeight={30}
          rowHeight={30}
          animateRows={false}
        />
      </div>
    </div>
  );
}

// Storybook 메타 설정
const meta: Meta<typeof AgGridInnerScrollSample> = {
  title: 'shared/AgGrid/InnerScroll',
  component: AgGridInnerScrollSample,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### AG Grid \`inner-scroll\` 및 \`data-row\` (1~6행) 제어 가이드

- \`.ag-theme-alpine.inner-scroll\` 클래스와 함께 \`data-row={1|2|3|4|5|6}\` 속성을 부여하면,
  헤더(3rem) + 데이터 행 수(N * 3rem)만큼의 고정 높이가 적용됩니다.
- 데이터 건수가 \`data-row\` 지정 수보다 많으면 **그리드 내부에서만 부드럽게 세로 스크롤(\`inner-scroll\`)**이 동작합니다.
- 데이터 건수가 지정 수 이하일 때는 고정된 규격 높이를 유지하여 레이아웃 흔들림(Layout Shift)을 방지합니다.
        `,
      },
    },
  },
  argTypes: {
    dataRow: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: '그리드에 적용할 data-row 행 기준값 (1~6)',
    },
    totalRows: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: '그리드에 렌더링할 데이터 건수 (0~10건)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AgGridInnerScrollSample>;

/**
 * 1. 전체 비교 뷰: data-row 1부터 6까지를 한 번에 비교
 */
export const OverviewAllRows: Story = {
  name: '1. 전체 비교 (data-row 1 ~ 6)',
  render: () => (
    <div className="flex flex-col gap-6 p-4 bg-gray-50 max-w-5xl">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">AG Grid inner-scroll (data-row 1 ~ 6) 전체 비교</h3>
        <p className="text-sm text-gray-600 mt-1">
          모든 그리드에 10건의 데이터를 동일하게 제공했을 때, 각 <code>data-row</code>(1~6)별로 높이가 고정되고
          초과 행은 내부 세로 스크롤로 탐색되는 동작을 비교할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AgGridInnerScrollSample
          dataRow={1}
          totalRows={10}
          title="data-row=1 (1행 고정 높이)"
          description="헤더 3rem + 데이터 3rem = 총 6rem 높이"
        />
        <AgGridInnerScrollSample
          dataRow={2}
          totalRows={10}
          title="data-row=2 (2행 고정 높이)"
          description="헤더 3rem + 데이터 6rem = 총 9rem 높이"
        />
        <AgGridInnerScrollSample
          dataRow={3}
          totalRows={10}
          title="data-row=3 (3행 고정 높이)"
          description="헤더 3rem + 데이터 9rem = 총 12rem 높이"
        />
        <AgGridInnerScrollSample
          dataRow={4}
          totalRows={10}
          title="data-row=4 (4행 고정 높이)"
          description="헤더 3rem + 데이터 12rem = 총 15rem 높이"
        />
        <AgGridInnerScrollSample
          dataRow={5}
          totalRows={10}
          title="data-row=5 (5행 고정 높이)"
          description="헤더 3rem + 데이터 15rem = 총 18rem 높이"
        />
        <AgGridInnerScrollSample
          dataRow={6}
          totalRows={10}
          title="data-row=6 (6행 고정 높이)"
          description="헤더 3rem + 데이터 18rem = 총 21rem 높이"
        />
      </div>
    </div>
  ),
};

/**
 * 2. 인터랙티브 컨트롤: data-row 및 데이터 건수를 실시간 조절
 */
export const Interactive: Story = {
  name: '2. 대화형 컨트롤 (Interactive)',
  args: {
    dataRow: 4,
    totalRows: 8,
    title: 'data-row 실시간 테스트',
    description: '하단 Controls 패널에서 dataRow 및 totalRows를 변경해 보세요.',
  },
};

/**
 * 3. 개별 data-row=1 샘플
 */
export const DataRow1: Story = {
  name: '3. data-row=1 (1행)',
  args: {
    dataRow: 1,
    totalRows: 10,
    title: 'data-row="1" 샘플',
    description: '1건의 행만 보이며 나머지는 내부 스크롤로 탐색합니다.',
  },
};

/**
 * 4. 개별 data-row=2 샘플
 */
export const DataRow2: Story = {
  name: '4. data-row=2 (2행)',
  args: {
    dataRow: 2,
    totalRows: 10,
    title: 'data-row="2" 샘플',
    description: '2건의 행이 보이며 나머지는 내부 스크롤로 탐색합니다.',
  },
};

/**
 * 5. 개별 data-row=3 샘플
 */
export const DataRow3: Story = {
  name: '5. data-row=3 (3행)',
  args: {
    dataRow: 3,
    totalRows: 10,
    title: 'data-row="3" 샘플',
    description: '3건의 행이 보이며 나머지는 내부 스크롤로 탐색합니다.',
  },
};

/**
 * 6. 개별 data-row=4 샘플
 */
export const DataRow4: Story = {
  name: '6. data-row=4 (4행)',
  args: {
    dataRow: 4,
    totalRows: 10,
    title: 'data-row="4" 샘플',
    description: '4건의 행이 보이며 나머지는 내부 스크롤로 탐색합니다.',
  },
};

/**
 * 7. 개별 data-row=5 샘플
 */
export const DataRow5: Story = {
  name: '7. data-row=5 (5행)',
  args: {
    dataRow: 5,
    totalRows: 10,
    title: 'data-row="5" 샘플',
    description: '5건의 행이 보이며 나머지는 내부 스크롤로 탐색합니다.',
  },
};

/**
 * 8. 개별 data-row=6 샘플
 */
export const DataRow6: Story = {
  name: '8. data-row=6 (6행)',
  args: {
    dataRow: 6,
    totalRows: 10,
    title: 'data-row="6" 샘플',
    description: '6건의 행이 보이며 나머지는 내부 스크롤로 탐색합니다.',
  },
};

