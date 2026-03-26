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

type CriteriaTone = 'danger' | 'success' | 'info' | 'neutral';
type DetailTone = 'default' | 'blue' | 'red' | 'green';

interface DetailSegment {
	text: string;
	tone?: DetailTone;
	strong?: boolean;
}

interface DetailLine {
	segments: DetailSegment[];
}

interface UnderwritingViolationRow {
	id: number;
	target: string;
	criteria: string;
	criteriaTone: CriteriaTone;
	details: DetailLine[];
}

interface AsGridCellMergingProps {
	compactHeader?: boolean;
}

const AgGridCellMergingComponent = (_props: AsGridCellMergingProps) => null;

const meta: Meta<AsGridCellMergingProps> = {
	title: 'Sample/Ha/인수지침심사_0316/LNIPLZ17',
	id: 'sample-Ha-lniplz17',
	component: AgGridCellMergingComponent,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			page: () => (
				<>
					<Title /><br /><br />
					<h2>P7</h2>
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
	argTypes: {
		compactHeader: {
			control: 'boolean',
			description: '헤더 높이를 줄여 이미지 비율에 가깝게 표시합니다.',
			table: { category: 'Layout' },
		},
	},
	args: { compactHeader: false },
};

export default meta;
type Story = StoryObj<AsGridCellMergingProps>;

const rowData: UnderwritingViolationRow[] = [
	{ id: 1, target: '홍길순', criteria: '인수기준',                criteriaTone: 'danger',  details: [{ segments: [{ text: '시그니처여성 올인원플랜은 ' }, { text: '[상해사망 1.5억]', tone: 'blue', strong: true }, { text: ' 또는 ' }, { text: '[상해사망 5천만 + 상해/질병중환자실입원비 각 20만]', tone: 'blue', strong: true }, { text: ' 가입이 필수입니다.' }] }] },
	{ id: 2, target: '홍길순', criteria: '인수기준',                criteriaTone: 'danger',  details: [{ segments: [{ text: '[암(유사암제외)진단비(암진단비 I)표준권누적 한도초과]' }] }, { segments: [{ text: '[인수한도: 10000 만원] ', tone: 'blue' }, { text: '[초과금액: 20,000 만원]', tone: 'red', strong: true }] }] },
	{ id: 3, target: '홍길순', criteria: '인수기준',                criteriaTone: 'danger',  details: [{ segments: [{ text: '[암진단비 I + II + III(암)(재진단비포함)표준권누적 한도초과]' }] }, { segments: [{ text: '[인수한도: 10000 만원] ', tone: 'blue' }, { text: '[초과금액: 20,000 만원]', tone: 'red', strong: true }] }] },
	{ id: 4, target: '홍길순', criteria: '인수기준',                criteriaTone: 'danger',  details: [{ segments: [{ text: '[유사암진단비/기타피부암][전체누적 한도초과] ' }, { text: '[가입금액 2.5배 적용]', tone: 'green', strong: true }] }, { segments: [{ text: '[인수한도: 3000 만원] ', tone: 'blue' }, { text: '[초과금액: 1,300 만원]', tone: 'red', strong: true }] }] },
	{ id: 5, target: '홍길순', criteria: '청약완료불가\n(정액)',     criteriaTone: 'success', details: [{ segments: [{ text: '[뇌졸중외부기공통기준암(유사암제외)진단비(암진단비 I)][전체누적 한도초과]' }] }, { segments: [{ text: '[인수한도: 20000 만원] ', tone: 'blue' }, { text: '[초과금액: 13,100 만원]', tone: 'red', strong: true }] }] },
	{ id: 6, target: '홍길순', criteria: '청약완료불가\n(정액)',     criteriaTone: 'success', details: [{ segments: [{ text: '[암(유사암제외)진단비(암진단비 I)] 전체누적 한도초과' }] }, { segments: [{ text: '[인수한도: 10000 만원] ', tone: 'blue' }, { text: '[초과금액: 23,100 만원]', tone: 'red', strong: true }] }] },
	{ id: 7, target: '홍길순', criteria: '청약완료불가\n(정액)',     criteriaTone: 'success', details: [{ segments: [{ text: '[암진단비 I + II + III(합)(재진단미포함)][전체누적 한도초과]' }] }, { segments: [{ text: '[인수한도: 10000 만원] ', tone: 'blue' }, { text: '[초과금액: 25,100 만원]', tone: 'red', strong: true }] }] },
	{ id: 8, target: '홍길순', criteria: '청약완료불가\n(업계누적)',  criteriaTone: 'info',    details: [{ segments: [{ text: '[업계가입금액 초과 수납불가 당사+타사 암진단비 ' }, { text: '3억원', tone: 'red', strong: true }, { text: ' 초과시(업계 정액보상담보 포함) 가입이 불가합니다.]' }] }, { segments: [{ text: '[당사: 33100만원 / 타사: 1600만원]', tone: 'red', strong: true }] }] },
	{ id: 9, target: '홍길순', criteria: '참고사항',                 criteriaTone: 'neutral', details: [{ segments: [{ text: '[한화NEWRICH간병입원플랜]' }] }] },
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

const detailToneClassMap: Record<DetailTone, string> = {
	default: 'text-[#2f2417]',
	blue:    'text-[#3d83d4]',
	red:     'text-[#c93d30]',
	green:   'text-[#2d9d68]',
};

const criteriaToneClassMap: Record<CriteriaTone, string> = {
	danger:  'text-[#bb4e42]',
	success: 'text-[#38996c]',
	info:    'text-[#2e63aa]',
	neutral: 'text-[#5d513f]',
};

const getDetailSegmentClassName = (segment: DetailSegment): string => {
	const base = detailToneClassMap[segment.tone ?? 'default'];
	return segment.strong ? `${base} font-semibold` : base;
};

const defaultColDef: ColDef<UnderwritingViolationRow> = {
	sortable: false,
	filter: false,
	resizable: false,
	suppressMovable: true,
	headerClass: 'ag-header-center',
};

export const Page7: Story = {
	name: 'LNIPLZ17',
	parameters: {
		docs: {
			source: {
				code: `
render: (args) => {
  const [selectedId, setSelectedId] = React.useState<number>(1);
  const gridRef = React.useRef<AgGridReact<UnderwritingViolationRow>>(null);

  const selectedGroup = React.useMemo(
    () => criteriaGroups.find(g => g.includes(selectedId)) ?? [],
    [selectedId]
  );

  // selectedId 변경 시 전체 컬럼 강제 갱신
  React.useEffect(() => {
    gridRef.current?.api?.refreshCells({ columns: ['target', 'criteria', 'details'], force: true });
  }, [selectedId]);

  const columnDefs = React.useMemo<(ColDef<UnderwritingViolationRow>)[]>(() => [
    {
      headerName: '대상',
      field: 'target',
      width: 110,
      spanRows: true,
      cellClass: 'flex items-center justify-center text-center text-[1.3rem] font-semibold text-[#2f2417]',
      // 항상 흰색 고정 — 선택/hover 등 어떤 상태에서도 배경색 변경 없음
      cellStyle: {
        borderColor: '#cfbea6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--ag-background-color, white)',
      },
    },
    {
      headerName: '인수제한',
      field: 'criteria',
      width: 140,
      spanRows: true,
      cellClass: (params) => {
        const tone = params.data?.criteriaTone ?? 'neutral';
        return \`flex items-center justify-center whitespace-pre-line text-center text-[1.24rem] leading-[1.35] \${criteriaToneClassMap[tone]}\`;
      },
      cellStyle: (params) => {
        const groupFirstId = criteriaGroups.find(g => g.includes(params.data?.id ?? -1))?.[0];
        const selectedGroupFirstId = criteriaGroups.find(g => g.includes(selectedId))?.[0];
        const isSelected = groupFirstId !== undefined && groupFirstId === selectedGroupFirstId;
        return {
          borderColor: '#cfbea6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected ? 'var(--color-table-td-surface-selected)' : undefined,
        };
      },
    },
    {
      headerName: '위배내용',
      field: 'details',
      flex: 1,
      minWidth: 700,
      cellClass: 'p-0!',
      cellStyle: (params) => ({
        backgroundColor: params.data?.id === selectedId ? 'var(--color-table-td-surface-selected)' : undefined,
        borderColor: '#cfbea6',
        padding: 0,
      }),
      cellRenderer: DetailsCell,
    },
  ], [selectedId, selectedGroup]);

  return (
    <div className="p-5">
      <div className="overflow-x-auto">
        <div className="ag-theme-alpine top-noline min-w-[980px]">
          <AgGridReact<UnderwritingViolationRow>
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            localeText={AG_GRID_LOCALE_KO}
            enableCellSpan={true}
            suppressCellFocus={true}
            suppressContextMenu={true}
            suppressRowHoverHighlight={true}
            suppressRowClickSelection={true}
            domLayout="autoHeight"
            headerHeight={args.compactHeader ? 34 : 40}
            rowHeight={42}
            getRowHeight={(params) => Math.max(42, (params.data?.details.length ?? 1) * 28 + 14)}
            onRowClicked={(params) => {
              const colId = params.column?.getColId();
              if (colId === 'target' || colId === 'criteria') return;
              if (params.data?.id !== undefined) setSelectedId(params.data.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
`,
			},
		},
	},
	render: (args) => {
		const [selectedId, setSelectedId] = React.useState<number>(1);
		const gridRef = React.useRef<AgGridReact<UnderwritingViolationRow>>(null);

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
				headerClass: 'ag-header-center',
				spanRows: true,
				cellClass: 'flex items-center justify-center text-center text-[1.3rem] font-semibold text-[#2f2417]',
				// 항상 흰색 고정 — 선택/hover 등 어떤 상태에서도 배경색 변경 없음
				cellStyle: {
					borderColor: '#cfbea6',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'var(--ag-background-color, white)',
				},
			},
			{
				headerName: '인수제한',
				field: 'criteria',
				width: 140,
				headerClass: 'ag-header-center',
				spanRows: true,
				cellClass: (params) => {
					const tone = params.data?.criteriaTone ?? 'neutral';
					return `flex items-center justify-center whitespace-pre-line text-center text-[1.24rem] leading-[1.35] ${criteriaToneClassMap[tone]}`;
				},
				cellStyle: (params) => {
					const groupFirstId = criteriaGroups.find(g => g.includes(params.data?.id ?? -1))?.[0];
					const selectedGroupFirstId = criteriaGroups.find(g => g.includes(selectedId))?.[0];
					const isSelected = groupFirstId !== undefined && groupFirstId === selectedGroupFirstId;
					return {
						borderColor: '#cfbea6',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: isSelected ? 'var(--color-table-td-surface-selected)' : undefined,
					};
				},
			},
			{
				headerName: '위배내용',
				field: 'details',
				flex: 1,
				minWidth: 700,
				headerClass: 'ag-header-center',
				cellClass: 'p-0!',
				cellStyle: (params) => ({
					backgroundColor: params.data?.id === selectedId ? 'var(--color-table-td-surface-selected)' : undefined,
					borderColor: '#cfbea6',
					padding: 0,
				}),
				cellRenderer: (params: ICellRendererParams<UnderwritingViolationRow>) => {
					const lines: DetailLine[] = params.value ?? [];
					return (
						<div className="flex h-full w-full flex-col justify-center gap-[0.4rem] px-4 py-3 text-[1.24rem] leading-[1.45] text-[#2f2417]">
							{lines.map((line, lineIndex) => (
								<p key={`${params.data?.id}-${lineIndex}`} className="whitespace-pre-wrap break-words">
									{line.segments.map((segment, segmentIndex) => (
										<span
											key={`${params.data?.id}-${lineIndex}-${segmentIndex}`}
											className={getDetailSegmentClassName(segment)}
										>
											{segment.text}
										</span>
									))}
								</p>
							))}
						</div>
					);
				},
			},
		], [selectedId, selectedGroup]);

		return (
			<div className="p-5">
				<div className="overflow-x-auto">
					<div className="ag-theme-alpine top-noline min-w-[980px]">
						<AgGridReact<UnderwritingViolationRow>
							ref={gridRef}
							rowData={rowData}
							columnDefs={columnDefs}
							defaultColDef={defaultColDef}
							localeText={AG_GRID_LOCALE_KO}
							enableCellSpan={true}
							suppressCellFocus={true}
							suppressContextMenu={true}
							suppressRowHoverHighlight={true}
							suppressRowClickSelection={true}
							domLayout="autoHeight"
							headerHeight={args.compactHeader ? 34 : 40}
							rowHeight={42}
							getRowHeight={(params) => Math.max(42, (params.data?.details.length ?? 1) * 28 + 14)}
							onRowClicked={(params) => {
								const colId = params.column?.getColId();
								if (colId === 'target' || colId === 'criteria') return;
								if (params.data?.id !== undefined) setSelectedId(params.data.id);
							}}
						/>
					</div>
				</div>
			</div>
		);
	},
};