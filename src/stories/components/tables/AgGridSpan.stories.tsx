import * as React from 'react';
import { Controls, Markdown, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import {
  AllCommunityModule,
  CellSpanModule,
  ClientSideRowModelModule,
  ModuleRegistry,
} from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { AG_GRID_LOCALE_KO } from '@/shared/constants/agGrid';

ModuleRegistry.registerModules([AllCommunityModule, CellSpanModule, ClientSideRowModelModule]);


interface AsGridCellMergingProps {}

const AgGridCellMergingComponent = (_props: AsGridCellMergingProps) => null;

const meta: Meta<AsGridCellMergingProps> = {
  title: 'Components/Tables/AgGrid/CellEditor Span',
  component: AgGridCellMergingComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title /><br /><br />
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
  detailsLines?: number; // 추가된 속성
}
const rowData: UnderwritingViolationRow[] = [
  {
    id: 1,
    target: '홍길순',
    criteria: '인수기준',
    details:
      '시그니처여성 올인원플랜은 <b class="text-[var(--color-primary-50)]">[상해사망 1.5억]</b> 또는 <b className="text-[var(--color-primary-50)]">[상해사망 5천만 + 상해/질병중환자실입원비 각 20만]</b> 가입이 필수입니다.',
    detailsLines: 1,
  },
  {
    id: 2,
    target: '홍길순',
    criteria: '인수기준',
    details: 
      '[암(유사암제외)진단비(암진단비 I)표준권누적 한도초과]<br />[인수한도: 10000 만원] [초과금액: 20,000 만원]',
     detailsLines: 2,
  },
  {
    id: 3,
    target: '홍길순',
    criteria: '인수기준',
    details: 
      '[암진단비 I + II + III(암)(재진단비포함)표준권누적 한도초과]<br/>[인수한도: 10000 만원] [초과금액: 20,000 만원]',
    detailsLines: 2,
  },
  {
    id: 4,
    target: '홍길순',
    criteria: '인수기준',
    details: 
      '[유사암진단비/기타피부암][전체누적 한도초과] [가입금액 2.5배 적용]<br/>[인수한도: 3000 만원] [초과금액: 1,300 만원]',
    detailsLines: 2,
  },
  {
    id: 5,
    target: '홍길순',
    criteria: '청약완료불가<br/>(정액)',
    details: 
      '[뇌졸중외부기공통기준암(유사암제외)진단비(암진단비 I)][전체누적 한도초과]<br/>[인수한도: 20000 만원] [초과금액: 13,100 만원]',
    detailsLines: 2,
  },
  {
    id: 6,
    target: '홍길순',
    criteria: '청약완료불가<br/>(정액)',
    details: 
      '[암(유사암제외)진단비(암진단비 I)] 전체누적 한도초과<br/>[인수한도: 10000 만원] [초과금액: 23,100 만원]',
    detailsLines: 2,
  },
  {
    id: 7,
    target: '홍길순',
    criteria: '청약완료불가<br/>(정액)',
    details: 
      '[암진단비 I + II + III(합)(재진단미포함)][전체누적 한도초과]<br/>[인수한도: 10000 만원] [초과금액: 25,100 만원]',
    detailsLines: 2,
  },
  {
    id: 8,
    target: '홍길순',
    criteria: '청약완료불가<br/>(업계누적)',
    details: 
      '[업계가입금액 초과 수납불가 당사+타사 암진단비 <b>3억원</b> 초과시(업계 정액보상담보 포함) 가입이 불가합니다.<br>[당사: 33100만원 / 타사: 1600만원]',
      detailsLines: 2,
  },
  {
    id: 9,
    target: '홍길순',
    criteria: '참고사항',
    details: 
      '[한화NEWRICH간병입원플랜]',
    detailsLines: 1,
  },
];

// 연속된 criteria 그룹 (모듈 레벨에서 한 번만 계산)
const criteriaGroups: number[][] = (() => {
  const groups: number[][] = [];
  let i = 0;
  while (i < rowData.length) {
    let span = 1;
    while (i + span < rowData.length && rowData[i + span].criteria === rowData[i].criteria) span++;
    groups.push(rowData.slice(i, i + span).map(r => r.id));
    i += span;
  }
  return groups;
})();

const defaultColDef: ColDef<UnderwritingViolationRow> = {
  sortable: false,
  filter: false,
  resizable: false,
  suppressMovable: true,
  headerClass: 'ag-header-center',
};

export const Default: Story = {
  render: (args) => {
    const [selectedId, setSelectedId] = React.useState<number>(1);
    // React 19: ref는 반드시 useRef/forwardRef로만 접근해야 하며, JSX element의 .ref 직접 접근은 금지됩니다.
    // 아래처럼 ref 객체를 직접 생성/전달해서만 사용하세요.
    const gridRef = React.useRef<AgGridReact<UnderwritingViolationRow>>(null);
    // 예시: <AgGridReact ref={gridRef} ... />
    // 잘못된 예시: element.ref (React 19에서 금지)

    const selectedGroup = React.useMemo(
      () => criteriaGroups.find(g => g.includes(selectedId)) ?? [],
      [selectedId]
    );

    // selectedId 변경 시 전체 컬럼 강제 갱신
    React.useEffect(() => {
      gridRef.current?.api?.refreshCells({ columns: ['target', 'criteria', 'details'], force: true });
    }, [selectedId]);

    const columnDefs = React.useMemo<ColDef<UnderwritingViolationRow>[]>(() => [
      {
        headerName: '대상',
        field: 'target',
        width: 110,
        spanRows: true,
        cellClass: 'flex! items-center! justify-center! text-center bg-white!',
       
        // 항상 흰색 고정 — 선택/hover 등 어떤 상태에서도 배경색 변경 없음
      },
      {
        headerName: '인수제한',
        field: 'criteria',
        width: 140,
        spanRows: true,
        cellClass: `flex! items-center! justify-center! whitespace-pre-line text-center bg-white!`,
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
        flex: 1,
        cellRenderer: (params: ICellRendererParams<UnderwritingViolationRow>) => {
          return (
            <div
              className="h-full w-full px-4 py-3 leading-[1.3]"
              dangerouslySetInnerHTML={{ __html: String(params.data?.details ?? '') }}
            />
          );
        },
        cellClassRules: {
          'ag-row-odd': (params) => {
            const rowIndex = params.node.rowIndex ?? -1;
            return rowIndex % 2 !== 0;
          }, // 0부터 시작하므로 홀수 인덱스가 짝수행
        },
      },
    ], [selectedId, selectedGroup]);

    return (
      <div className="p-5">
        <div className="overflow-x-auto">
          <div className="ag-theme-alpine top-noline min-w-[980px] h-[30rem]!">
            <AgGridReact<UnderwritingViolationRow>
              getRowId={(params) => String(params.data.id)}
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              
              defaultColDef={defaultColDef} //모든 컬럼에 공통으로 적용할 기본 설정을 정의하는 객체


              enableCellSpan={true} //셀 병합 활성화
              getRowHeight={(params) => Math.max(42, (params.data?.detailsLines ?? 1) * 28 + 6)}

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