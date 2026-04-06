import * as React from 'react';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react';

import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { editableSelectCellRenderer } from '@aggrid';
import { AG_GRID_LOCALE_KO } from '@/shared/constants/agGrid';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@uiux/Dialog';
import { SearchIcon } from '@icons';

ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

type RowKind = 'main' | 'sub';

interface AgGridInputRow {
  id: number;
  rowKind: RowKind;
  canEditExpiry?: boolean;
  name?: string;
  rrn?: string;
  phone1?: string;
  phone2?: string;
  phone3?: string;
  relation?: string;
  age?: string;
  injuryLevel?: string;
  occupation?: string;
  jobName?: string;
  industry?: string;
  jobDuty?: string;
  drivingType?: string;
  twoWheel?: string;
  disability?: string;
  notice?: string;
}

type EditableField = Exclude<keyof AgGridInputRow, 'id' | 'rowKind' | 'canEditExpiry'>;

interface AgGridInputProps {
  compactHeader?: boolean;
}

const AgGridInputComponent = (_props: AgGridInputProps) => null;

const meta: Meta<AgGridInputProps> = {
  title: 'Sample/Ha/전환_가입설계_0323/LTPZ064',
  id: 'sample-Ha-ltpz064',
  component: AgGridInputComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>P37</h2>
            <p>
              AgGrid를 사용해 가입설계 입력 테이블 형태를 구성한 스토리입니다.
              그룹 헤더, 편집 가능한 입력셀/선택셀 패턴을 한 화면에서 확인할 수 있습니다.
            </p>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <Markdown>
              {`
\`\`\`tsx
<div className="ag-theme-alpine h-[37.5vh]! w-full">
  <AgGridReact
    rowData={rowData}
    columnDefs={columnDefs}
    groupHeaderHeight={36}
    headerHeight={0}
  />
</div>
\`\`\`
              `}
            </Markdown>
          </>
        );
      },
    },
  },
  argTypes: {
    compactHeader: {
      control: 'boolean',
      description: '헤더 높이를 줄인 압축 레이아웃',
      table: { category: 'Layout' },
    },
  },
  args: {
    compactHeader: false,
  },
};

export default meta;

type Story = StoryObj<AgGridInputProps>;

const rowData: AgGridInputRow[] = [
  { id: 1, rowKind: 'main' },
  { id: 2, rowKind: 'sub' },
  { id: 3, rowKind: 'main' },
  { id: 4, rowKind: 'sub' },
  { id: 5, rowKind: 'main' },
  { id: 6, rowKind: 'sub' },
  { id: 7, rowKind: 'main' },
  { id: 8, rowKind: 'sub' },
  { id: 9, rowKind: 'main' },
];

const makeCellKey = (rowId: number, field: string): string => `${rowId}:${field}`;

const getInputAlignClass = (field: EditableField): 'text-left' | 'text-center' | 'text-right' => {
  if (field === 'name' || field === 'rrn') return 'text-center';
  if (field === 'phone1' || field === 'phone2' || field === 'phone3' || field === 'notice') return 'text-left';
  if (field === 'age' || field === 'injuryLevel') return 'text-right';
  return 'text-left';
};

const RequiredHeaderGroup = (props: any) => {
  return (
    <div className="ag-header-group-cell-label flex h-full w-full items-center justify-center">
      <span className="ag-header-group-text">{props.displayName}</span>
      <span className="ml-[2px] text-[#FB3F3F]">*</span>
    </div>
  );
};

const createSingleChildGroup = (
  headerName: string,
  child: ColDef<AgGridInputRow>
): ColGroupDef<AgGridInputRow> => {
  const isRequired = headerName.endsWith('*');
  const cleanName = isRequired ? headerName.slice(0, -1) : headerName;
  return {
    headerName: cleanName,
    headerGroupComponent: isRequired ? RequiredHeaderGroup : undefined,
    headerGroupComponentParams: isRequired ? { displayName: cleanName } : undefined,
    marryChildren: true,
    children: [child],
  };
};

// 주민등록번호 유효성 검사
const validateRrn = (rrn: string): { valid: boolean; message: string } => {
  if (!/^\d+$/.test(rrn)) return { valid: false, message: '주민등록번호는 숫자만 입력 가능합니다.' };
  if (rrn.length !== 13) return { valid: false, message: '주민등록번호는 13자리여야 합니다.' };
  const month = parseInt(rrn.slice(2, 4), 10);
  const day = parseInt(rrn.slice(4, 6), 10);
  if (month < 1 || month > 12) return { valid: false, message: '주민등록번호의 월이 올바르지 않습니다.' };
  if (day < 1 || day > 31) return { valid: false, message: '주민등록번호의 일이 올바르지 않습니다.' };
  const genderCode = parseInt(rrn[6], 10);
  if (genderCode < 1 || genderCode > 4) return { valid: false, message: '주민등록번호의 성별코드가 올바르지 않습니다. (1~4)' };
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
  const sum = weights.reduce((acc, w, i) => acc + w * parseInt(rrn[i], 10), 0);
  const checkDigit = (11 - (sum % 11)) % 10;
  if (checkDigit !== parseInt(rrn[12], 10)) return { valid: false, message: '주민등록번호 형식이 올바르지 않습니다.' };
  return { valid: true, message: '' };
};

// 모든 input 셀에 공통으로 쓰는 컴포넌트 — localValue로 독립 관리해 리렌더 시 포커스 유지
const StableInputCell = ({
  rowId,
  field,
  maxLength,
  valuesRef,
  onChangeRef,
}: {
  rowId: number;
  field: EditableField;
  maxLength?: number;
  valuesRef: React.MutableRefObject<Record<string, string>>;
  onChangeRef: React.MutableRefObject<(rowId: number, field: string, value: string) => void>;
}) => {
  const key = makeCellKey(rowId, field);
  const [localValue, setLocalValue] = React.useState(() => valuesRef.current[key] ?? '');
  const alertShownRef = React.useRef(false);
  const alignClass = getInputAlignClass(field);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // 주민등록번호: 숫자 외 문자 차단
    if (field === 'rrn' && val !== '' && !/^\d+$/.test(val)) {
      if (!alertShownRef.current) {
        alertShownRef.current = true;
        setTimeout(() => {
          alert('주민등록번호는 숫자만 입력 가능합니다.');
          alertShownRef.current = false;
        }, 0);
      }
      return;
    }

    setLocalValue(val);
    onChangeRef.current(rowId, field, val);

    // 주민등록번호: 13자리 완성 시 유효성 검사
    if (field === 'rrn' && val.length === 13) {
      const { valid, message } = validateRrn(val);
      if (!valid) setTimeout(() => alert(message), 0);
    }
  };

  return (
    <input
      type="text"
      maxLength={maxLength}
      value={localValue}
      onChange={handleChange}
      onMouseDown={(e) => e.stopPropagation()}
      className={`h-full w-full bg-transparent px-2 text-[1.2rem] outline-none cursor-text ${alignClass}`}
    />
  );
};

// 이름/직업 검색 가능한 input 셀 — ref 패턴으로 리렌더 시 포커스 유지
const SearchableInputCell = ({
  rowId,
  field,
  valuesRef,
  onChangeRef,
  onSearchClick,
}: {
  rowId: number;
  field: Extract<EditableField, 'name' | 'occupation'>;
  valuesRef: React.MutableRefObject<Record<string, string>>;
  onChangeRef: React.MutableRefObject<(rowId: number, field: string, value: string) => void>;
  onSearchClick?: (rowId: number) => void;
}) => {
  const key = makeCellKey(rowId, field);
  const [localValue, setLocalValue] = React.useState(() => valuesRef.current[key] ?? '');
  const alignClass = getInputAlignClass(field);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    onChangeRef.current(rowId, field, val);
  };

  return (
    <div className="flex h-full items-center gap-1">
      <input
        aria-label={`${field} 입력`}
        type="text"
        value={localValue}
        onChange={handleChange}
        onMouseDown={(e) => e.stopPropagation()}
        className={`h-[2.3rem] w-full rounded border border-[var(--color-gray-20)] bg-transparent px-2 text-[1.2rem] outline-none cursor-text ${alignClass}`}
      />
      <button
        type="button"
        aria-label={`${field} 검색`}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onSearchClick?.(rowId);
        }}
        className="flex h-[2.3rem] w-[2.3rem] shrink-0 items-center justify-center rounded border border-[var(--color-gray-20)] bg-transparent"
      >
        <SearchIcon color="var(--color-primary-50)" />
      </button>
    </div>
  );
};

const renderGrid: Story['render'] = (args) => {
  const initialValues: Record<string, string> = {
    '1:relation': '선택', '1:drivingType': '선택', '1:twoWheel': '선택', '1:disability': '선택',
    '2:relation': '선택', '2:drivingType': '선택', '2:twoWheel': '선택', '2:disability': '선택',
    '3:relation': '선택', '3:drivingType': '선택', '3:twoWheel': '선택', '3:disability': '선택',
    '4:relation': '선택', '4:drivingType': '선택', '4:twoWheel': '선택', '4:disability': '선택',
    '5:relation': '선택', '5:drivingType': '선택', '5:twoWheel': '선택', '5:disability': '선택',
    '6:relation': '선택', '6:drivingType': '선택', '6:twoWheel': '선택', '6:disability': '선택',
    '7:relation': '선택', '7:drivingType': '선택', '7:twoWheel': '선택', '7:disability': '선택',
    '8:relation': '선택', '8:drivingType': '선택', '8:twoWheel': '선택', '8:disability': '선택',
    '9:relation': '선택', '9:drivingType': '선택', '9:twoWheel': '선택', '9:disability': '선택',
  };

  const [values, setValues] = React.useState<Record<string, string>>(initialValues);
  const [isOccupationDialogOpen, setIsOccupationDialogOpen] = React.useState(false);
  const [occupationTargetRowId, setOccupationTargetRowId] = React.useState<number | null>(null);

  const occupationOptions = React.useMemo(
    () => ['사무직', '현장직', '운전직', '자영업', '학생', '무직'],
    []
  );

  // values와 handleChange를 ref로 관리 — columnDefs가 재생성되지 않도록
  const valuesRef = React.useRef(values);
  React.useEffect(() => { valuesRef.current = values; }, [values]);

  const handleChange = React.useCallback((rowId: number, field: string, value: string) => {
    setValues((prev) => ({ ...prev, [makeCellKey(rowId, field)]: value }));
  }, []);

  const onChangeRef = React.useRef(handleChange);
  React.useEffect(() => { onChangeRef.current = handleChange; }, [handleChange]);

  const getValue = React.useCallback(
    (rowId: number, field: string): string => values[makeCellKey(rowId, field)] ?? '',
    [values]
  );

  const onSearchOccupationRef = React.useRef((id: number) => {
    setOccupationTargetRowId(id);
    setIsOccupationDialogOpen(true);
  });

  const renderSearchableInputCell = React.useCallback(
    (params: ICellRendererParams<AgGridInputRow>, field: Extract<EditableField, 'name' | 'occupation'>): React.ReactNode => {
      const row = params.data;
      if (!row) return null;
      return (
        <SearchableInputCell
          rowId={row.id}
          field={field}
          valuesRef={valuesRef}
          onChangeRef={onChangeRef}
          onSearchClick={field === 'occupation' ? (id) => onSearchOccupationRef.current(id) : undefined}
        />
      );
    },
    [] // 의존성 없음 — ref 패턴 사용
  );

  const renderSelectCell = React.useCallback(
    (params: ICellRendererParams<AgGridInputRow>, field: EditableField): React.ReactNode => {
      const row = params.data;
      if (!row) return null;
      return editableSelectCellRenderer<AgGridInputRow>({
        ...params,
        value: getValue(row.id, field),
        data: { ...row, canEditExpiry: true },
      });
    },
    [getValue]
  );

  const createSelectEditorProps = React.useCallback(
    (field: EditableField, selectValues: string[]): Partial<ColDef<AgGridInputRow>> => ({
      field,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: selectValues },
      cellClass: `text-center`,
      valueGetter: (params) => {
        const rowId = params.data?.id;
        if (typeof rowId !== 'number') return '';
        return getValue(rowId, field);
      },
      valueSetter: (params) => {
        const rowId = params.data?.id;
        if (typeof rowId !== 'number') return false;
        handleChange(rowId, field, String(params.newValue ?? ''));
        return true;
      },
      cellRenderer: (params: ICellRendererParams<AgGridInputRow>) => renderSelectCell(params, field),
    }),
    [getValue, handleChange, renderSelectCell]
  );

  // StableInputCell을 쓰는 컬럼 생성 — valuesRef/onChangeRef 사용으로 columnDefs 재생성 없음
  const makeInputCol = (
    field: EditableField,
    maxLength?: number
  ): Partial<ColDef<AgGridInputRow>> => ({
    field,
    editable: false,
    cellClass: `${getInputAlignClass(field)} p-0!`,
    valueGetter: (params) => {
      const rowId = params.data?.id;
      if (typeof rowId !== 'number') return '';
      return valuesRef.current[makeCellKey(rowId, field)] ?? '';
    },
    cellRenderer: (params: ICellRendererParams<AgGridInputRow>) => {
      const row = params.data;
      if (!row) return null;
      return (
        <StableInputCell
          rowId={row.id}
          field={field}
          maxLength={maxLength}
          valuesRef={valuesRef}
          onChangeRef={onChangeRef}
        />
      );
    },
  });

  // columnDefs는 최초 1회만 생성 (의존성 없음)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnDefs = React.useMemo<Array<ColDef<AgGridInputRow> | ColGroupDef<AgGridInputRow>>>(
    () => [
      {
        headerName: '가입 설계동의 최소 필요 정보',
        marryChildren: true,
        children: [
          createSingleChildGroup('이름*', {
            headerName: '',
            width: 140,
            sortable: false,
            filter: false,
            suppressMovable: true,
            field: 'name',
            editable: false,
            cellRenderer: (params: ICellRendererParams<AgGridInputRow>) => renderSearchableInputCell(params, 'name'),
          }),
          createSingleChildGroup('주민등록번호*', {
            headerName: '',
            width: 130,
            sortable: false,
            filter: false,
            suppressMovable: true,
            ...makeInputCol('rrn', 13),
          }),
          {
            headerName: '전화번호(휴대폰)',
            marryChildren: true,
            children: [
              { headerName: '', width: 60, sortable: false, resizable: false, suppressMovable: true, ...makeInputCol('phone1', 3) },
              { headerName: '', width: 60, sortable: false, resizable: false, suppressMovable: true, ...makeInputCol('phone2', 4) },
              { headerName: '', width: 60, sortable: false, resizable: false, suppressMovable: true, ...makeInputCol('phone3', 4) },
            ],
          },
        ],
      },
      {
        headerName: '동의 여부 개별/단체',
        width: 120,
        sortable: false,
        filter: false,
        suppressMovable: true,
        suppressSpanHeaderHeight: false,
        cellClass: `align-middle`,
        cellRenderer: () => null,
      },
      {
        headerName: '고객 및 설계 기본 정보',
        marryChildren: true,
        children: [
          createSingleChildGroup('주피와의관계', { headerName: '', width: 100, sortable: false, filter: false, suppressMovable: true, ...createSelectEditorProps('relation', ['선택', '본인', '배우자', '자녀']) }),
          createSingleChildGroup('연령', { headerName: '', width: 70, sortable: false, filter: false, suppressMovable: true, ...makeInputCol('age', 3) }),
          createSingleChildGroup('상해급수', { headerName: '', width: 70, sortable: false, filter: false, suppressMovable: true, ...makeInputCol('injuryLevel', 2) }),
          createSingleChildGroup('직업', {
            headerName: '',
            width: 140,
            sortable: false,
            filter: false,
            suppressMovable: true,
            field: 'occupation',
            editable: false,
            cellRenderer: (params: ICellRendererParams<AgGridInputRow>) => renderSearchableInputCell(params, 'occupation'),
          }),
          createSingleChildGroup('직업명', { headerName: '', width: 110, sortable: false, filter: false, suppressMovable: true, ...makeInputCol('jobName') }),
          createSingleChildGroup('업종', { headerName: '', width: 110, sortable: false, filter: false, suppressMovable: true, ...makeInputCol('industry') }),
          createSingleChildGroup('직무', { headerName: '', width: 110, sortable: false, filter: false, suppressMovable: true, ...makeInputCol('jobDuty') }),
          createSingleChildGroup('운전형태', { headerName: '', width: 70, sortable: false, filter: false, suppressMovable: true, ...createSelectEditorProps('drivingType', ['선택', '자가', '업무']) }),
          createSingleChildGroup('이륜차', { headerName: '', width: 70, sortable: false, filter: false, suppressMovable: true, ...createSelectEditorProps('twoWheel', ['선택', '사용', '미사용']) }),
          createSingleChildGroup('병력여부', { headerName: '', width: 70, sortable: false, filter: false, suppressMovable: true, ...createSelectEditorProps('disability', ['선택', '해당', '비해당']) }),
          createSingleChildGroup('알림사항', { headerName: '', width: 100, sortable: false, filter: false, suppressMovable: true, ...makeInputCol('notice') }),
        ],
      },
    ],
    [] // 의존성 없음 — 최초 1회만 생성
  );

  const defaultColDef = React.useMemo<ColDef<AgGridInputRow>>(
    () => ({
      resizable: false,
      cellClassRules: {
        'bg-white!': (params) => ((params.node.rowIndex ?? 0) % 2 === 0),
        'bg-[var(--color-table-td-surface-gray)]!': (params) => ((params.node.rowIndex ?? 0) % 2 !== 0),
      },
    }),
    []
  );

  return (
    <div className="p-5">
      <div className="overflow-x-auto w-full">
        <style>{`
          .new-table-grid .ag-header-cell-resize::after {
            background: linear-gradient(90deg, transparent, #e0e0e0);
          }
        `}</style>
        <div className="new-table-grid ag-theme-alpine h-[37.5vh]! w-[1754px]">
          <AgGridReact<AgGridInputRow>
            // getRowId 적용: id 필드를 고유 식별자로 사용
            getRowId={(params) => String(params.data.id)}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableCellSpan={true}
            localeText={AG_GRID_LOCALE_KO}
            groupHeaderHeight={args.compactHeader ? 30 : 36}
            headerHeight={0}
            suppressRowTransform={true}
            suppressRowHoverHighlight={true}
            singleClickEdit={true}
            suppressMovableColumns={true}
            suppressContextMenu={true}
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: true,
              checkboxes: true,
              enableClickSelection: false,
            }}
            selectionColumnDef={{
              width: 40,
              cellClass: 'text-center p-0!',
            }}
          />
        </div>
      </div>

      <Dialog
        open={isOccupationDialogOpen}
        onOpenChange={(open) => {
          setIsOccupationDialogOpen(open);
          if (!open) setOccupationTargetRowId(null);
        }}
      >
        <DialogContent size="sm" showCloseButton={true}>
          <DialogHeader>
            <DialogTitle>직업 검색</DialogTitle>
            <DialogDescription>선택한 직업이 현재 행의 직업 입력값으로 반영됩니다.</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2 px-[2.4rem] py-[1.2rem]">
            {occupationOptions.map((option) => (
              <button
                key={option}
                type="button"
                className="h-[3.2rem] rounded border border-[var(--color-gray-20)] px-3 text-left text-[1.2rem] hover:bg-[var(--color-gray-5)]"
                onClick={() => {
                  if (occupationTargetRowId !== null) {
                    handleChange(occupationTargetRowId, 'occupation', option);
                  }
                  setIsOccupationDialogOpen(false);
                  setOccupationTargetRowId(null);
                }}
              >
                {option}
              </button>
            ))}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <button
                type="button"
                className="h-[3.2rem] rounded border border-[var(--color-gray-20)] px-4 text-[1.2rem]"
              >
                닫기
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const LTRZ298: Story = {
  render: renderGrid,
};