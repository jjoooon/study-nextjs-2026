/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */ import { Controls, Markdown, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AllCommunityModule, CellSpanModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-enterprise';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

ModuleRegistry.registerModules([AllCommunityModule, CellSpanModule, ClientSideRowModelModule]);

type AsGridCellMergingProps = unknown;

const AgGridCellMergingComponent = (_props: AsGridCellMergingProps) => null;

const meta: Meta<AsGridCellMergingProps> = {
  title: 'Components/Tables/AgGrid/RowSpan',
  component: AgGridCellMergingComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <br />
          <br />
          <h2>Overview</h2>
          <p>AG Grid의 셀 병합 기능으로 심사 대상, 인수제한 분류, 위배내용을 세로 병합한 스토리입니다.</p>
          <Primary />
          <Controls />
          <h2>Usage</h2>
          <Markdown>{`
\`\`\`tsx
<AgGridReact enableCellSpan={true} />
\`\`\`
          `}</Markdown>
        </>
      ),
    },
  },
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<AsGridCellMergingProps>;

interface UnderwritingViolationRow {
  id: number;
  target: React.ReactNode;
  criteria: string;
  details: React.ReactNode; // DetailLine[] 대신 ReactNode로 변경
}
const rowData: UnderwritingViolationRow[] = [
  {
    id: 1,
    target: '홍길순',
    criteria: '인수기준',
    details:
      '시그니처여성 올인원플랜은 <b class="text-[var(--color-primary-50)]">[상해사망 1.5억]</b> 또는 <b className="text-[var(--color-primary-50)]">[상해사망 5천만 + 상해/질병중환자실입원비 각 20만]</b> 가입이 필수입니다.',
  },
  {
    id: 2,
    target: '홍길순',
    criteria: '인수기준',
    details:
      '[암(유사암제외)진단비(암진단비 I)표준권누적 한도초과]<br />[인수한도: 10000 만원] [초과금액: 20,000 만원]',
  },
  {
    id: 3,
    target: '홍길순',
    criteria: '인수기준',
    details:
      '[암진단비 I + II + III(암)(재진단비포함)표준권누적 한도초과]<br/>[인수한도: 10000 만원] [초과금액: 20,000 만원]',
  },
  {
    id: 4,
    target: '홍길순',
    criteria: '인수기준',
    details:
      '[유사암진단비/기타피부암][전체누적 한도초과] [가입금액 2.5배 적용]<br/>[인수한도: 3000 만원] [초과금액: 1,300 만원]',
  },
  {
    id: 5,
    target: '홍길순',
    criteria: '청약완료불가<br/>(정액)',
    details:
      '[뇌졸중외부기공통기준암(유사암제외)진단비(암진단비 I)][전체누적 한도초과]<br/>[인수한도: 20000 만원] [초과금액: 13,100 만원]',
  },
  {
    id: 6,
    target: '홍길순',
    criteria: '청약완료불가<br/>(정액)',
    details: '[암(유사암제외)진단비(암진단비 I)] 전체누적 한도초과<br/>[인수한도: 10000 만원] [초과금액: 23,100 만원]',
  },
  {
    id: 7,
    target: '홍길순',
    criteria: '청약완료불가<br/>(정액)',
    details:
      '[암진단비 I + II + III(합)(재진단미포함)][전체누적 한도초과]<br/>[인수한도: 10000 만원] [초과금액: 25,100 만원]',
  },
  {
    id: 8,
    target: '홍길순',
    criteria: '청약완료불가<br/>(업계누적)',
    details:
      '[업계가입금액 초과 수납불가 당사+타사 암진단비 <b>3억원</b> 초과시(업계 정액보상담보 포함) 가입이 불가합니다.<br>[당사: 33100만원 / 타사: 1600만원]',
  },
  {
    id: 9,
    target: '홍길순',
    criteria: '참고사항',
    details: '[한화NEWRICH간병입원플랜]',
  },
];

const defaultColDef: ColDef<UnderwritingViolationRow> = {
  sortable: false,
  filter: false,
  resizable: false,
  suppressMovable: true,
  headerClass: 'ag-header-center',
};

export const Default: Story = {
  render: () => {
    const gridRef = React.useRef<AgGridReact<UnderwritingViolationRow>>(null);
    const columnDefs = React.useMemo<ColDef<UnderwritingViolationRow>[]>(
      () => [
        {
          headerName: '대상',
          field: 'target',
          width: 110,
          spanRows: true,
          cellClass: 'flex! items-center! justify-center! text-center',
        },
        {
          headerName: '인수제한',
          field: 'criteria',
          width: 140,
          spanRows: true,
          cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center`,
          cellRenderer: (params: ICellRendererParams<UnderwritingViolationRow>) => {
            return (
              <div
                className="w-full leading-[1.3]"
                dangerouslySetInnerHTML={{ __html: String(params.data?.criteria ?? '') }}
              />
            );
          },
        },
        {
          headerName: '위배내용',
          field: 'details',
          wrapText: true,
          autoHeight: true,
          flex: 1,
          cellStyle: {
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          },
          cellRenderer: (params: ICellRendererParams<UnderwritingViolationRow>) => {
            return (
              <div
                className="h-full w-full py-1.5 leading-[1.3] whitespace-normal"
                dangerouslySetInnerHTML={{ __html: String(params.data?.details ?? '') }}
              />
            );
          },
          cellClassRules: {
            'ag-row-odd': (params) => {
              const rowIndex = params.node.rowIndex ?? -1;
              return rowIndex % 2 !== 0;
            },
          },
        },
      ],
      [rowData]
    );

    return (
      <div className="p-5">
        <div className="overflow-x-auto">
          <div className="ag-theme-alpine top-noline">
            <AgGridReact<UnderwritingViolationRow>
              getRowId={(params) => String(params.data.id)}
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef} //모든 컬럼에 공통으로 적용할 기본 설정을 정의하는 객체
              domLayout="autoHeight" //그리드 높이를 자동으로 조정하여 스크롤바 제거
              enableCellSpan={true} //셀 병합 활성화
              // onRowClicked={(params) => {
              //   if (params.data?.id !== undefined) setSelectedId(params.data.id);
              // }}
            />
          </div>
        </div>
      </div>
    );
  },
};
