import * as React from 'react';
import { Controls, Markdown, Primary, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { AG_GRID_LOCALE_KO } from '@/shared/constants/agGrid';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

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
	isFirstTarget?: boolean;
	targetRowSpan?: number;
	targetMergedHeight?: number;  // 병합된 셀 총 높이
	criteria: string;
	criteriaTone: CriteriaTone;
	isFirstCriteria?: boolean;
	criteriaRowSpan?: number;
	criteriaMergedHeight?: number; // 병합된 셀 총 높이
	details: DetailLine[];
}

interface AsGridCellMergingProps {
	compactHeader?: boolean;
}

const AsGridCellMergingComponent = (_props: AsGridCellMergingProps) => null;

const meta: Meta<AsGridCellMergingProps> = {
	title: 'Components/Tables/AsGridCellMerging',
	id: 'components-tables-asgridcellmerging',
	component: AsGridCellMergingComponent,
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
					<Markdown>{`\`\`\`tsx\n<AgGridReact suppressRowTransform={true} />\n\`\`\``}</Markdown>
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

// 행 높이 계산 함수 (getRowHeight와 동일 로직)
const calcRowHeight = (lineCount: number) => Math.max(52, 24 + lineCount * 22);

// 각 행 데이터 (높이 미포함)
const baseRows = [
	{ id: 1,  target: '홍길순', isFirstTarget: true,  targetRowSpan: 9,  criteria: '인수기준',             criteriaTone: 'danger'  as CriteriaTone, isFirstCriteria: true,  criteriaRowSpan: 4, details: [{ segments: [{ text: '시그니처여성 올인원플랜은 ' }, { text: '[상해사망 1.5억]', tone: 'blue' as DetailTone, strong: true }, { text: ' 또는 ' }, { text: '[상해사망 5천만 + 상해/질병중환자실입원비 각 20만]', tone: 'blue' as DetailTone, strong: true }, { text: ' 가입이 필수입니다.' }] }] },
	{ id: 2,  target: '홍길순', criteria: '인수기준',             criteriaTone: 'danger'  as CriteriaTone, details: [{ segments: [{ text: '[암(유사암제외)진단비(암진단비 I)표준권누적 한도초과]' }] }, { segments: [{ text: '[인수한도: 10000 만원] ', tone: 'blue' as DetailTone }, { text: '[초과금액: 20,000 만원]', tone: 'red' as DetailTone, strong: true }] }] },
	{ id: 3,  target: '홍길순', criteria: '인수기준',             criteriaTone: 'danger'  as CriteriaTone, details: [{ segments: [{ text: '[암진단비 I + II + III(암)(재진단비포함)표준권누적 한도초과]' }] }, { segments: [{ text: '[인수한도: 10000 만원] ', tone: 'blue' as DetailTone }, { text: '[초과금액: 20,000 만원]', tone: 'red' as DetailTone, strong: true }] }] },
	{ id: 4,  target: '홍길순', criteria: '인수기준',             criteriaTone: 'danger'  as CriteriaTone, details: [{ segments: [{ text: '[유사암진단비/기타피부암][전체누적 한도초과] ' }, { text: '[가입금액 2.5배 적용]', tone: 'green' as DetailTone, strong: true }] }, { segments: [{ text: '[인수한도: 3000 만원] ', tone: 'blue' as DetailTone }, { text: '[초과금액: 1,300 만원]', tone: 'red' as DetailTone, strong: true }] }] },
	{ id: 5,  target: '홍길순', criteria: '청약완료불가\n(정액)',  criteriaTone: 'success' as CriteriaTone, isFirstCriteria: true,  criteriaRowSpan: 3, details: [{ segments: [{ text: '[뇌졸중외부기공통기준암(유사암제외)진단비(암진단비 I)][전체누적 한도초과]' }] }, { segments: [{ text: '[인수한도: 20000 만원] ', tone: 'blue' as DetailTone }, { text: '[초과금액: 13,100 만원]', tone: 'red' as DetailTone, strong: true }] }] },
	{ id: 6,  target: '홍길순', criteria: '청약완료불가\n(정액)',  criteriaTone: 'success' as CriteriaTone, details: [{ segments: [{ text: '[암(유사암제외)진단비(암진단비 I)] 전체누적 한도초과' }] }, { segments: [{ text: '[인수한도: 10000 만원] ', tone: 'blue' as DetailTone }, { text: '[초과금액: 23,100 만원]', tone: 'red' as DetailTone, strong: true }] }] },
	{ id: 7,  target: '홍길순', criteria: '청약완료불가\n(정액)',  criteriaTone: 'success' as CriteriaTone, details: [{ segments: [{ text: '[암진단비 I + II + III(합)(재진단미포함)][전체누적 한도초과]' }] }, { segments: [{ text: '[인수한도: 10000 만원] ', tone: 'blue' as DetailTone }, { text: '[초과금액: 25,100 만원]', tone: 'red' as DetailTone, strong: true }] }] },
	{ id: 8,  target: '홍길순', criteria: '청약완료불가\n(업계누적)', criteriaTone: 'info' as CriteriaTone, isFirstCriteria: true, criteriaRowSpan: 1, details: [{ segments: [{ text: '[업계가입금액 초과 수납불가 당사+타사 암진단비 ' }, { text: '3억원', tone: 'red' as DetailTone, strong: true }, { text: ' 초과시(업계 정액보상담보 포함) 가입이 불가합니다.]' }] }, { segments: [{ text: '[당사: 33100만원 / 타사: 1600만원]', tone: 'red' as DetailTone, strong: true }] }] },
	{ id: 9,  target: '홍길순', criteria: '참고사항',              criteriaTone: 'neutral' as CriteriaTone, isFirstCriteria: true, criteriaRowSpan: 1, details: [{ segments: [{ text: '[한화NEWRICH간병입원플랜]' }] }] },
];

// 각 행의 높이를 미리 계산
const rowHeights = baseRows.map(r => calcRowHeight(r.details.length));

// 병합 셀 높이 = 해당 그룹 행들의 높이 합산
const rowData: UnderwritingViolationRow[] = baseRows.map((row, i) => {
	const result: UnderwritingViolationRow = { ...row };

	// target 병합 높이: id=1부터 9까지 전체 합산
	if (row.isFirstTarget && row.targetRowSpan) {
		result.targetMergedHeight = rowHeights.slice(i, i + row.targetRowSpan).reduce((a, b) => a + b, 0);
	}

	// criteria 병합 높이
	if (row.isFirstCriteria && row.criteriaRowSpan && row.criteriaRowSpan > 1) {
		result.criteriaMergedHeight = rowHeights.slice(i, i + row.criteriaRowSpan).reduce((a, b) => a + b, 0);
	}

	return result;
});

const detailToneClassMap: Record<DetailTone, string> = {
	default: 'text-[#2f2417]',
	blue: 'text-[#3d83d4]',
	red: 'text-[#c93d30]',
	green: 'text-[#2d9d68]',
};

const criteriaToneClassMap: Record<CriteriaTone, string> = {
	danger: 'text-[#bb4e42]',
	success: 'text-[#38996c]',
	info: 'text-[#2e63aa]',
	neutral: 'text-[#5d513f]',
};

const getDetailSegmentClassName = (segment: DetailSegment): string => {
	const base = detailToneClassMap[segment.tone ?? 'default'];
	return segment.strong ? `${base} font-semibold` : base;
};

const MergedTargetCell = (params: ICellRendererParams<UnderwritingViolationRow, string>) => {
	if (!params.data?.isFirstTarget) return null;
	const h = params.data.targetMergedHeight;
	return (
		<div
			style={{ height: h ? `${h}px` : '100%' }}
			className="flex w-full items-center justify-center px-3 text-center text-[1.3rem] font-semibold text-[#2f2417]"
		>
			{params.data.target}
		</div>
	);
};

const MergedCriteriaCell = (params: ICellRendererParams<UnderwritingViolationRow, string>) => {
	if (!params.data?.isFirstCriteria) return null;
	const criteriaTone = params.data?.criteriaTone ?? 'neutral';
	const h = params.data.criteriaMergedHeight;
	return (
		<div
			style={{ height: h ? `${h}px` : '100%' }}
			className={`flex w-full items-center justify-center whitespace-pre-line px-3 text-center text-[1.24rem] leading-[1.35] ${criteriaToneClassMap[criteriaTone]}`}
		>
			{params.data.criteria}
		</div>
	);
};

const DetailsCell = (params: ICellRendererParams<UnderwritingViolationRow, DetailLine[]>) => {
	const lines = params.value ?? [];
	return (
		<div className="flex h-full w-full flex-col justify-center gap-[0.4rem] px-4 py-3 text-[1.24rem] leading-[1.45] text-[#2f2417]">
			{lines.map((line, lineIndex) => (
				<p key={`${params.data?.id}-${lineIndex}`} className="whitespace-pre-wrap break-words">
					{line.segments.map((segment, segmentIndex) => (
						<span key={`${params.data?.id}-${lineIndex}-${segmentIndex}`} className={getDetailSegmentClassName(segment)}>
							{segment.text}
						</span>
					))}
				</p>
			))}
		</div>
	);
};

const columnDefs: ColDef<UnderwritingViolationRow>[] = [
	{
		headerName: '대상',
		field: 'target',
		width: 110,
		headerClass: 'ag-header-center',
		cellClass: 'p-0! overflow-visible!',
		rowSpan: (params) => params.data?.targetRowSpan ?? 1,
		cellStyle: (params) => ({
			borderColor: '#cfbea6',
			padding: 0,
			overflow: 'visible',
			zIndex: (params.data?.targetRowSpan ?? 1) > 1 ? 2 : 'auto',
			backgroundColor: 'white',
		}),
		cellRenderer: MergedTargetCell,
	},
	{
		headerName: '인수제한',
		field: 'criteria',
		width: 140,
		headerClass: 'ag-header-center',
		cellClass: 'p-0! overflow-visible!',
		rowSpan: (params) => params.data?.criteriaRowSpan ?? 1,
		cellStyle: (params) => ({
			backgroundColor: '#f1ece3',
			borderColor: '#cfbea6',
			padding: 0,
			overflow: 'visible',
			zIndex: (params.data?.criteriaRowSpan ?? 1) > 1 ? 2 : 'auto',
		}),
		cellRenderer: MergedCriteriaCell,
	},
	{
		headerName: '위배내용',
		field: 'details',
		flex: 1,
		minWidth: 700,
		headerClass: 'ag-header-center',
		cellClass: 'p-0!',
		cellStyle: { backgroundColor: '#f8f2e6', borderColor: '#cfbea6', padding: 0 },
		cellRenderer: DetailsCell,
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
	render: (args) => {
		return (
			<div className="p-5">
				<div className="overflow-x-auto">
					<div className="ag-theme-alpine top-noline min-w-[980px]">
						<AgGridReact<UnderwritingViolationRow>
							rowData={rowData}
							columnDefs={columnDefs}
							defaultColDef={defaultColDef}
							localeText={AG_GRID_LOCALE_KO}
							suppressRowTransform={true}
							suppressCellFocus={true}
							suppressContextMenu={true}
							suppressRowHoverHighlight={true}
							domLayout="autoHeight"
							headerHeight={args.compactHeader ? 34 : 40}
							getRowHeight={(params) => calcRowHeight(params.data?.details.length ?? 1)}
						/>
					</div>
				</div>
			</div>
		);
	},
};
