import * as React from 'react';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { AG_GRID_LOCALE_KO } from '@/shared/constants/agGrid';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

type ElapsedPeriod = 'immediate' | 'oneMonth' | 'oneYear' | null;
type ElapsedOption = Exclude<ElapsedPeriod, null>;

const isElapsedOption = (value: string): value is ElapsedOption =>
  value === 'immediate' || value === 'oneMonth' || value === 'oneYear';

interface DiseaseRow {
  id: number;
  diseaseName: string;
  diseaseNameHighlight?: boolean;
  admissionDays: string;
  hasSurgery: boolean | null;
  elapsed: ElapsedPeriod;
  hasOneYear?: boolean;
  relapse: string;
  note: string;
  checked?: boolean;
  disabled?: boolean;
}

interface CellCheckboxRadioProps {}

const CellCheckboxRadioComponent = (_props: CellCheckboxRadioProps) => null;

const meta: Meta<CellCheckboxRadioProps> = {
  title: 'Sample/Ha/인수지침심사_0316/LNIUW080',
  id: 'sample-Ha-lniuw080',
  component: CellCheckboxRadioComponent,
  tags: ['autodocs'],

  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>P11</h2>
          <div>
            <p>
              AG Grid에서 체크박스(rowSelection)와 라디오 버튼을 셀 안에서 함께 사용하는 패턴입니다.<br />
              네이티브 rowSelection으로 다중 행 선택을 지원하며, 완치 후 경과기간은 커스텀 라디오 셀 렌더러로 구현합니다.
            </p>
            <ul>
              <li>rowSelection: multiRow 모드로 헤더 체크박스 + 행별 체크박스 제공</li>
              <li>라디오 버튼: 경과기간 컬럼을 3개로 분리하여 각 셀에 라디오 1개씩 렌더링</li>
              <li>그룹 헤더(ColGroupDef): 경과기간 관련 컬럼을 하나의 헤더로 묶음</li>
              <li>ref 패턴: columnDefs 재생성 없이 최신 상태값 참조</li>
            </ul>
          </div>
          <Primary />

          <Markdown>
            {`
\`\`\`tsx
import * as React from 'react';

import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { AG_GRID_LOCALE_KO } from '@/shared/constants/agGrid';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

type ElapsedPeriod = 'immediate' | 'oneMonth' | 'oneYear' | null;
type ElapsedOption = Exclude<ElapsedPeriod, null>;

interface DiseaseRow {
  id: number;
  diseaseName: string;
  admissionDays: string;
  hasSurgery: boolean | null;
  elapsed: ElapsedPeriod;
  hasOneYear?: boolean;
  relapse: string;
  note: string;
  checked?: boolean;
  disabled?: boolean;
}

// 경과기간 개별 라디오 셀 — option을 받아 해당 라디오 1개만 렌더링
const makeElapsedRadioCell = (
  option: ElapsedOption,
  label: string,
  rowsRef: React.MutableRefObject<DiseaseRow[]>,
  onChangeRef: React.MutableRefObject<(id: number, val: ElapsedPeriod) => void>
) => {
  return (params: ICellRendererParams<DiseaseRow>) => {
    const row = params.data;
    if (!row) return null;
    if (option === 'oneYear' && !row.hasOneYear) return null;

    return (
      <ElapsedRadioItem
        rowId={row.id}
        option={option}
        label={label}
        initialElapsed={row.elapsed}
        rowsRef={rowsRef}
        onChangeRef={onChangeRef}
      />
    );
  };
};

// 개별 라디오 아이템 — localState로 독립 관리
const ElapsedRadioItem = ({ rowId, option, label, rowsRef, onChangeRef }) => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    const row = rowsRef.current.find(r => r.id === rowId);
    if (row) setChecked(row.elapsed === option);
  });

  return (
    <div
      className="flex h-full items-center justify-center"
      onMouseDown={e => e.stopPropagation()}
      onClick={e => e.stopPropagation()}
    >
      <RadioGroup
        value={checked ? option : ''}
        onValueChange={(val) => {
          setChecked(true);
          onChangeRef.current(rowId, val);
        }}
        width="auto"
      >
        <RadioGroupItem value={option} id={\`elapsed-\${rowId}-\${option}\`} size="md">
          {label}
        </RadioGroupItem>
      </RadioGroup>
    </div>
  );
};

// 컴포넌트 내부
const [rows, setRows] = React.useState<DiseaseRow[]>(initialRows);

const handleElapsedChange = React.useCallback((id: number, val: ElapsedPeriod) => {
  setRows(prev => prev.map(r => r.id === id ? { ...r, elapsed: val } : r));
}, []);

// ref 패턴 — columnDefs 재생성 없이 최신값 참조
const rowsRef = React.useRef(rows);
React.useEffect(() => { rowsRef.current = rows; }, [rows]);

const onChangeRef = React.useRef(handleElapsedChange);
React.useEffect(() => { onChangeRef.current = handleElapsedChange; }, [handleElapsedChange]);

const columnDefs = React.useMemo(() => [
  {
    headerName: '질병명',
    field: 'diseaseName',
    width: 280,
    cellClass: 'flex items-center justify-center',
    cellRenderer: DiseaseNameCell,
  },
  {
    headerName: '입원 일수',
    field: 'admissionDays',
    width: 160,
    cellClass: 'flex items-center justify-center',
  },
  {
    headerName: '수술 여부',
    field: 'hasSurgery',
    width: 90,
    cellClass: 'flex items-center justify-center',
    cellRenderer: SurgeryCell,
  },
  {
    headerName: '완치 후 경과기간',
    marryChildren: true,
    children: [
      {
        headerName: '즉시(1개월미만)',
        field: 'elapsed',
        colId: 'elapsed_immediate',
        width: 180,
        cellClass: 'p-0! flex items-center justify-center',
        cellRenderer: makeElapsedRadioCell('immediate', '즉시(1개월미만)', rowsRef, onChangeRef),
      },
      {
        headerName: '1개월이상',
        field: 'elapsed',
        colId: 'elapsed_oneMonth',
        width: 180,
        cellClass: 'p-0! flex items-center justify-center',
        cellRenderer: makeElapsedRadioCell('oneMonth', '1개월이상', rowsRef, onChangeRef),
      },
      {
        headerName: '1년이상',
        field: 'elapsed',
        colId: 'elapsed_oneYear',
        width: 180,
        cellClass: 'p-0! flex items-center justify-center',
        cellRenderer: makeElapsedRadioCell('oneYear', '1년이상', rowsRef, onChangeRef),
      },
    ],
  },
  {
    headerName: '재발 여부',
    field: 'relapse',
    width: 100,
    cellClass: 'flex items-center justify-center',
  },
  {
    headerName: '비고',
    field: 'note',
    width: 250,
    cellClass: 'text-left flex items-center',
    cellStyle: { fontSize: '1.2rem' },
  },
], []);

<div className="p-5">
  <div
    className="ag-theme-alpine aggrid-pagination-ko w-full"
    style={{ height: \`\${88 + rows.length * 42}px\` }}
  >
    <AgGridReact<DiseaseRow>
      rowData={rows}
      columnDefs={columnDefs}
      localeText={AG_GRID_LOCALE_KO}
      singleClickEdit={true}
      animateRows={false}
      getRowId={(params) => String(params.data.id)}
      rowSelection={{
        mode: 'multiRow',
        headerCheckbox: true,
        checkboxes: true,
        enableClickSelection: false,
        isRowSelectable: (params) => !params.data?.disabled,
      }}
      selectionColumnDef={{
        width: 60,
        cellClass: 'text-center p-0! flex items-center justify-center',
        headerName: '선택',
      }}
      rowClassRules={{
        'my-row-disabled': params => !!params.data?.disabled,
      }}
      onGridReady={(params) => {
        params.api.forEachNode((node) => {
          if (node.data?.checked) node.setSelected(true);
        });
      }}
    />
  </div>
</div>
\`\`\`
            `}
          </Markdown>

          <h2>주요 옵션</h2>
          <table style={{ minWidth: 600, borderCollapse: 'collapse', marginBottom: 24 }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: 8, background: '#f8f8f8' }}>옵션명</th>
                <th style={{ border: '1px solid #ddd', padding: 8, background: '#f8f8f8' }}>설명</th>
                <th style={{ border: '1px solid #ddd', padding: 8, background: '#f8f8f8' }}>타입</th>
                <th style={{ border: '1px solid #ddd', padding: 8, background: '#f8f8f8' }}>예시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>rowSelection.mode</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>행 선택 모드 (단일/다중)</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>'singleRow' | 'multiRow'</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>mode: 'multiRow'</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>rowSelection.headerCheckbox</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>헤더 전체 선택 체크박스 표시 여부</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>boolean</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>headerCheckbox: true</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>rowSelection.isRowSelectable</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>행별 선택 가능 여부 제어 함수</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>(params) =&gt; boolean</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>isRowSelectable: (p) =&gt; !p.data?.disabled</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>selectionColumnDef</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>체크박스 컬럼 커스터마이징</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>SelectionColumnDef</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>{'{ width: 60, headerName: "선택" }'}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>ColGroupDef</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>여러 컬럼을 하나의 그룹 헤더로 묶기</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>ColGroupDef</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>{'{ headerName: "그룹명", children: [...] }'}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>cellRenderer</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>셀 커스텀 렌더러 지정</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>React.Component</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>cellRenderer: MyRadioCell</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>getRowId</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>행 고유 ID 지정 (재렌더 최적화)</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>(params) =&gt; string</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>getRowId: (p) =&gt; String(p.data.id)</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>rowClassRules</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>조건부 행 클래스 지정</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>Record&lt;string, (params) =&gt; boolean&gt;</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>{'{ "my-row-disabled": p => !!p.data?.disabled }'}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>onGridReady</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>그리드 초기화 완료 시 콜백 (초기 선택 등)</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>(params) =&gt; void</td>
                <td style={{ border: '1px solid #ddd', padding: 8 }}>onGridReady: fn</td>
              </tr>
            </tbody>
          </table>

          <h2>라디오 셀 렌더러 패턴</h2>
          <p>
            경과기간처럼 하나의 필드를 여러 컬럼으로 분리해 라디오 버튼을 1개씩 배치할 때,<br />
            <code>makeElapsedRadioCell</code> 팩토리 함수로 각 옵션별 렌더러를 생성합니다.<br />
            상태 동기화는 <code>rowsRef</code> + <code>onChangeRef</code> ref 패턴으로 처리하여 columnDefs 재생성을 방지합니다.
          </p>
          <Markdown>
            {`
\`\`\`tsx
// 팩토리 함수로 옵션별 렌더러 생성
const makeElapsedRadioCell = (option, label, rowsRef, onChangeRef) => {
  return (params) => {
    const row = params.data;
    if (!row) return null;
    // hasOneYear가 false인 행은 빈 셀 처리
    if (option === 'oneYear' && !row.hasOneYear) return null;
    return <ElapsedRadioItem rowId={row.id} option={option} label={label} ... />;
  };
};

// 컬럼 정의에서 사용
{ colId: 'elapsed_immediate', cellRenderer: makeElapsedRadioCell('immediate', '즉시(1개월미만)', rowsRef, onChangeRef) }
{ colId: 'elapsed_oneMonth',  cellRenderer: makeElapsedRadioCell('oneMonth',  '1개월이상',       rowsRef, onChangeRef) }
{ colId: 'elapsed_oneYear',   cellRenderer: makeElapsedRadioCell('oneYear',   '1년이상',         rowsRef, onChangeRef) }
\`\`\`
            `}
          </Markdown>
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<CellCheckboxRadioProps>;

const initialRows: DiseaseRow[] = [
  { id: 1, diseaseName: '척추 염좌', admissionDays: '15일이하', hasSurgery: false, elapsed: 'oneMonth', hasOneYear: false, relapse: '', note: '', checked: true },
  { id: 2, diseaseName: '교통사고(상세불명의 염좌/손상)', diseaseNameHighlight: true, admissionDays: '15일이하', hasSurgery: null, elapsed: 'oneMonth', hasOneYear: true, relapse: '', note: '진단명 고지 대상', checked: true },
  { id: 3, diseaseName: '미끄러짐·낙상(상세불명의 염좌/손상)', diseaseNameHighlight: true, admissionDays: '15일이하', hasSurgery: null, elapsed: 'oneMonth', hasOneYear: false, relapse: '', note: '진단명 고지 대상', checked: true },
  { id: 4, diseaseName: '무릎 염좌', diseaseNameHighlight: true, admissionDays: '15일이하', hasSurgery: false, elapsed: 'oneMonth', hasOneYear: false, relapse: '', note: '', checked: true },
  { id: 5, diseaseName: '발목 염좌', diseaseNameHighlight: true, admissionDays: '15일이하', hasSurgery: false, elapsed: null, hasOneYear: false, relapse: '', note: '', checked: false },
];

// 질병명 셀
const DiseaseNameCell = (params: ICellRendererParams<DiseaseRow>) => {
  const row = params.data;
  if (!row) return null;
  return (
    <span style={{ color: '#2f2417', fontSize: '1.2rem' }}>
      {row.diseaseName}
    </span>
  );
};

// 수술 여부 셀
const SurgeryCell = (params: ICellRendererParams<DiseaseRow>) => {
  const row = params.data;
  if (!row) return null;
  if (row.hasSurgery === false) return <span style={{ fontSize: '1.2rem' }}>N</span>;
  return null;
};

// 경과기간 개별 라디오 셀 — option을 받아 해당 라디오 1개만 렌더링
const makeElapsedRadioCell = (
  option: ElapsedOption,
  label: string,
  rowsRef: React.MutableRefObject<DiseaseRow[]>,
  onChangeRef: React.MutableRefObject<(id: number, val: ElapsedPeriod) => void>
) => {
  return (params: ICellRendererParams<DiseaseRow>) => {
    const row = params.data;
    if (!row) return null;
    // 1년이상 컬럼은 hasOneYear가 false인 행에서는 빈 셀
    if (option === 'oneYear' && !row.hasOneYear) return null;

    return (
      <ElapsedRadioItem
        rowId={row.id}
        option={option}
        label={label}
        initialElapsed={row.elapsed}
        rowsRef={rowsRef}
        onChangeRef={onChangeRef}
      />
    );
  };
};

// 개별 라디오 아이템 컴포넌트 — localState로 독립 관리
const ElapsedRadioItem: React.FC<{
  rowId: number;
  option: ElapsedOption;
  label: string;
  initialElapsed: ElapsedPeriod;
  rowsRef: React.MutableRefObject<DiseaseRow[]>;
  onChangeRef: React.MutableRefObject<(id: number, val: ElapsedPeriod) => void>;
}> = ({ rowId, option, label, initialElapsed, rowsRef, onChangeRef }) => {
  const [checked, setChecked] = React.useState(initialElapsed === option);

  // rowsRef에서 최신 elapsed 반영
  React.useEffect(() => {
    const row = rowsRef.current.find(r => r.id === rowId);
    if (row) setChecked(row.elapsed === option);
  });

  const handleChange = (val: string) => {
    if (!isElapsedOption(val)) return;
    setChecked(true);
    onChangeRef.current(rowId, val);
  };

  return (
    <div
      className="flex h-full items-center justify-center"
      onMouseDown={e => e.stopPropagation()}
      onClick={e => e.stopPropagation()}
    >
      <RadioGroup
        value={checked ? option : ''}
        onValueChange={handleChange}
        width="auto"
      >
        <RadioGroupItem
          value={option}
          id={`elapsed-${rowId}-${option}`}
          size="md"
        >
          {label}
        </RadioGroupItem>
      </RadioGroup>
    </div>
  );
};

const renderGrid: Story['render'] = () => {
  const [rows, setRows] = React.useState<DiseaseRow[]>(initialRows);

  const handleElapsedChange = React.useCallback((id: number, val: ElapsedPeriod) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, elapsed: val } : r));
  }, []);

  const rowsRef = React.useRef(rows);
  React.useEffect(() => { rowsRef.current = rows; }, [rows]);

  const onChangeRef = React.useRef(handleElapsedChange);
  React.useEffect(() => { onChangeRef.current = handleElapsedChange; }, [handleElapsedChange]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnDefs = React.useMemo<(ColDef<DiseaseRow> | ColGroupDef<DiseaseRow>)[]>(() => [
    {
      headerName: '질병명',
      field: 'diseaseName',
      width: 280,
      sortable: false, filter: false, suppressMovable: true, resizable: false,
      cellClass: 'text-center flex items-center justify-center',
      cellRenderer: DiseaseNameCell,
    },
    {
      headerName: '입원 일수',
      field: 'admissionDays',
      width: 160,
      sortable: false, filter: false, suppressMovable: true, resizable: false,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '수술 여부',
      field: 'hasSurgery',
      width: 90,
      sortable: false, filter: false, suppressMovable: true, resizable: false,
      cellClass: 'text-center flex items-center justify-center',
      cellRenderer: SurgeryCell,
    },
    // 완치 후 경과기간 — 3개 자식 컬럼을 그룹 헤더로 묶음
    {
      headerName: '완치 후 경과기간',
      marryChildren: true,
      children: [
        {
          headerName: '즉시(1개월미만)',
          field: 'elapsed',
          colId: 'elapsed_immediate',
          width: 180,
          sortable: false, filter: false, suppressMovable: true, resizable: false,
          cellClass: 'p-0! flex items-center justify-center',
          cellRenderer: makeElapsedRadioCell('immediate', '즉시(1개월미만)', rowsRef, onChangeRef),
        },
        {
          headerName: '1개월이상',
          field: 'elapsed',
          colId: 'elapsed_oneMonth',
          width: 180,
          sortable: false, filter: false, suppressMovable: true, resizable: false,
          cellClass: 'p-0! flex items-center justify-center',
          cellRenderer: makeElapsedRadioCell('oneMonth', '1개월이상', rowsRef, onChangeRef),
        },
        {
          headerName: '1년이상',
          field: 'elapsed',
          colId: 'elapsed_oneYear',
          width: 180,
          sortable: false, filter: false, suppressMovable: true, resizable: false,
          cellClass: 'p-0! flex items-center justify-center',
          cellRenderer: makeElapsedRadioCell('oneYear', '1년이상', rowsRef, onChangeRef),
        },
      ],
    } as ColGroupDef<DiseaseRow>,
    {
      headerName: '재발 여부',
      field: 'relapse',
      width: 100,
      sortable: false, filter: false, suppressMovable: true, resizable: false,
      cellClass: 'text-center flex items-center justify-center',
    },
    {
      headerName: '비고',
      field: 'note',
      width: 250,
      sortable: false, filter: false, suppressMovable: true, resizable: false,
      cellClass: 'text-left flex items-center',
      cellStyle: { fontSize: '1.2rem' },
    },
  ], []); // 의존성 없음 — ref 패턴으로 최신값 참조

  return (
    <div className="p-5">
      <div
        className="ag-theme-alpine aggrid-pagination-ko w-full"
        style={{ height: `${88 + rows.length * 42}px` }}
      >
        <AgGridReact<DiseaseRow>
          rowData={rows}
          columnDefs={columnDefs}
          suppressRowHoverHighlight={false}
          suppressMovableColumns={true}
          suppressContextMenu={true}
          animateRows={false}
          singleClickEdit={true}
          localeText={AG_GRID_LOCALE_KO}
          defaultColDef={{
            resizable: false,
            sortable: false,
            filter: false,
          }}
          getRowId={(params) => String(params.data.id)}
          rowSelection={{
            mode: 'multiRow',
            headerCheckbox: true,
            checkboxes: true,
            enableClickSelection: false,
            isRowSelectable: (params) => !params.data?.disabled,
          }}
          selectionColumnDef={{
            width: 60,
            pinned: undefined,
            cellClass: 'text-center p-0! flex items-center justify-center',
            headerName: '선택',
          }}
          rowClassRules={{
            'my-row-disabled': params => !!params.data?.disabled,
          }}
          onGridReady={(params) => {
            params.api.forEachNode((node) => {
              if (node.data?.checked) node.setSelected(true);
            });
          }}
        />
      </div>
    </div>
  );
};

export const lniuw080: Story = {
  render: renderGrid,
  parameters: {
    docs: {
      source: {
        code: `
render: () => {
  const [rows, setRows] = React.useState<DiseaseRow[]>(initialRows);

const handleElapsedChange = React.useCallback((id: number, val: ElapsedPeriod) => {
  setRows(prev => prev.map(r => r.id === id ? { ...r, elapsed: val } : r));
}, []);

// ref 패턴 — columnDefs 재생성 없이 최신값 참조
const rowsRef = React.useRef(rows);
React.useEffect(() => { rowsRef.current = rows; }, [rows]);

const onChangeRef = React.useRef(handleElapsedChange);
React.useEffect(() => { onChangeRef.current = handleElapsedChange; }, [handleElapsedChange]);

// eslint-disable-next-line react-hooks/exhaustive-deps
const columnDefs = React.useMemo<(ColDef<DiseaseRow> | ColGroupDef<DiseaseRow>)[]>(() => [
  {
    headerName: '질병명',
    field: 'diseaseName',
    width: 280,
    sortable: false, filter: false, suppressMovable: true, resizable: false,
    cellClass: 'text-center flex items-center justify-center',
    cellRenderer: DiseaseNameCell,
  },
  {
    headerName: '입원 일수',
    field: 'admissionDays',
    width: 160,
    sortable: false, filter: false, suppressMovable: true, resizable: false,
    cellClass: 'text-center flex items-center justify-center',
  },
  {
    headerName: '수술 여부',
    field: 'hasSurgery',
    width: 90,
    sortable: false, filter: false, suppressMovable: true, resizable: false,
    cellClass: 'text-center flex items-center justify-center',
    cellRenderer: SurgeryCell,
  },
  {
    headerName: '완치 후 경과기간',
    marryChildren: true,
    children: [
      {
        headerName: '즉시(1개월미만)',
        field: 'elapsed',
        colId: 'elapsed_immediate',
        width: 180,
        sortable: false, filter: false, suppressMovable: true, resizable: false,
        cellClass: 'p-0! flex items-center justify-center',
        cellRenderer: makeElapsedRadioCell('immediate', '즉시(1개월미만)', rowsRef, onChangeRef),
      },
      {
        headerName: '1개월이상',
        field: 'elapsed',
        colId: 'elapsed_oneMonth',
        width: 180,
        sortable: false, filter: false, suppressMovable: true, resizable: false,
        cellClass: 'p-0! flex items-center justify-center',
        cellRenderer: makeElapsedRadioCell('oneMonth', '1개월이상', rowsRef, onChangeRef),
      },
      {
        headerName: '1년이상',
        field: 'elapsed',
        colId: 'elapsed_oneYear',
        width: 180,
        sortable: false, filter: false, suppressMovable: true, resizable: false,
        cellClass: 'p-0! flex items-center justify-center',
        cellRenderer: makeElapsedRadioCell('oneYear', '1년이상', rowsRef, onChangeRef),
      },
    ],
  } as ColGroupDef<DiseaseRow>,
  {
    headerName: '재발 여부',
    field: 'relapse',
    width: 100,
    sortable: false, filter: false, suppressMovable: true, resizable: false,
    cellClass: 'text-center flex items-center justify-center',
  },
  {
    headerName: '비고',
    field: 'note',
    width: 250,
    sortable: false, filter: false, suppressMovable: true, resizable: false,
    cellClass: 'text-left flex items-center',
    cellStyle: { fontSize: '1.2rem' },
  },
], []);

return (
  <div className="p-5">
    <div
      className="ag-theme-alpine aggrid-pagination-ko w-full"
      style={{ height: \`\${88 + rows.length * 42}px\` }}
    >
      <AgGridReact<DiseaseRow>
        rowData={rows}
        columnDefs={columnDefs}
        suppressRowHoverHighlight={false}
        suppressMovableColumns={true}
        suppressContextMenu={true}
        animateRows={false}
        singleClickEdit={true}
        localeText={AG_GRID_LOCALE_KO}
        defaultColDef={{ resizable: false, sortable: false, filter: false }}
        getRowId={(params) => String(params.data.id)}
        rowSelection={{
          mode: 'multiRow',
          headerCheckbox: true,
          checkboxes: true,
          enableClickSelection: false,
          isRowSelectable: (params) => !params.data?.disabled,
        }}
        selectionColumnDef={{
          width: 60,
          pinned: undefined,
          cellClass: 'text-center p-0! flex items-center justify-center',
          headerName: '선택',
        }}
        rowClassRules={{
          'my-row-disabled': params => !!params.data?.disabled,
        }}
        onGridReady={(params) => {
          params.api.forEachNode((node) => {
            if (node.data?.checked) node.setSelected(true);
          });
        }}
      />
    </div>
  </div>
);
}
`,
      },
    },
  },
};