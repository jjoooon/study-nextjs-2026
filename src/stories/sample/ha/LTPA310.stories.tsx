import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipTrigger, TooltipContent } from '@uiux/Tooltip';
import { Input } from '@uiux/Input';
import { Button } from '@uiux/Button';
import { SearchIcon } from '@icons';
import { DatePickerInput } from '@common/DatePicker';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { CellClassParams, CellStyle, ColDef, ColGroupDef, ICellRendererParams, RowSpanParams } from 'ag-grid-community';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
import { useFormFields } from '@hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0323/LTPA310',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계관리 &gt; 실손 재가입대상계약현황 P144</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

// ─────────────────────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────────────────────
/**
 * 계약 1건을 2개의 FlatRow로 펼침
 * subRow: false → 증권번호 / 계약자 / 취급지점 / 완납여부 행  (row1)
 * subRow: true  → 상품명   / 피보험자명 / 취급자 / 1회보험료 행 (row2)
 *
 * 선택 / 재가입일 / 처리상태 컬럼은 subRow=false 에서 rowSpan=2
 */
type FlatRow = {
  rowId: string;
  contractId: number;
  subRow: boolean;      // false=row1, true=row2

  // row1 표시값
  securitiesNo: string;
  contractor: string;
  branch: string;
  isPaidFull: string;

  // row2 표시값
  productName: string;
  insuredName: string;
  handler: string;
  firstPremium: string;

  // rowSpan=2 컬럼 (row1에만 렌더, row2는 null)
  rejoinDate: string;
  processStatus: string;

  // 재가입 신청 (row1/row2 쌍)
  planNo: string;
  rejoinSecuritiesNo: string;
  planStatus: string;
  planFirstPremium: string;
  issueStatus: string;
  issueDeadline: string;
  scanStatus: string;
  scanDeadline: string;
  receiptStatus: string;
  receiptDeadline: string;
  rejectIssueStatus: string;
  rejectIssueDeadline: string;
  rejectScanStatus: string;
  rejectScanDeadline: string;
};

// ─────────────────────────────────────────────────────────────
// 원본 계약 데이터 → FlatRow 2개로 펼치기
// ─────────────────────────────────────────────────────────────
type Contract = {
  id: number;
  securitiesNo: string; productName: string;
  contractor: string;   insuredName: string;
  branch: string;       handler: string;
  isPaidFull: string;   firstPremium: string;
  rejoinDate: string;   processStatus: string;
  planNo: string;            rejoinSecuritiesNo: string;
  planStatus: string;        planFirstPremium: string;
  issueStatus: string;       issueDeadline: string;
  scanStatus: string;        scanDeadline: string;
  receiptStatus: string;      receiptDeadline: string;
  rejectIssueStatus: string;  rejectIssueDeadline: string;
  rejectScanStatus: string;   rejectScanDeadline: string;
};

const contracts: Contract[] = [
  {
    id: 1,
    securitiesNo: 'LA20233591906000', productName: '한화 더건강한 한아름...',
    contractor: '김한화',             insuredName: '김한화',
    branch: '신부산GA지점',           handler: '박한화',
    isPaidFull: 'TEXT',               firstPremium: '9,999,999',
    rejoinDate: 'YYYY-MM-DD',         processStatus: 'TEXT',
    planNo: 'LA250826291588',         rejoinSecuritiesNo: 'LA20233591906000',
    planStatus: 'TEXT',               planFirstPremium: '9,999,999',
    issueStatus: 'TEXT',              issueDeadline: 'YYYY-MM-DD',
    scanStatus: 'TEXT',               scanDeadline: 'YYYY-MM-DD',
    receiptStatus: 'TEXT',            receiptDeadline: 'YYYY-MM-DD',
    rejectIssueStatus: 'TEXT',        rejectIssueDeadline: 'YYYY-MM-DD',
    rejectScanStatus: 'TEXT',         rejectScanDeadline: 'YYYY-MM-DD',
  },
  {
    id: 2,
    securitiesNo: 'LA20233591906001', productName: '한화 더건강한 한아름2...',
    contractor: '이한화',             insuredName: '이한화',
    branch: 'A지점',                  handler: '최한화',
    isPaidFull: 'TEXT',               firstPremium: '8,888,888',
    rejoinDate: 'YYYY-MM-DD',         processStatus: 'TEXT',
    planNo: 'LA250826291589',         rejoinSecuritiesNo: 'LA20233591906001',
    planStatus: 'TEXT',               planFirstPremium: '8,888,888',
    issueStatus: 'TEXT',              issueDeadline: 'YYYY-MM-DD',
    scanStatus: 'TEXT',               scanDeadline: 'YYYY-MM-DD',
    receiptStatus: 'TEXT',            receiptDeadline: 'YYYY-MM-DD',
    rejectIssueStatus: 'TEXT',        rejectIssueDeadline: 'YYYY-MM-DD',
    rejectScanStatus: 'TEXT',         rejectScanDeadline: 'YYYY-MM-DD',
  },
];

function flattenContracts(data: Contract[]): FlatRow[] {
  return data.flatMap((c) => {
    const shared = {
      contractId: c.id,
      securitiesNo: c.securitiesNo,   productName: c.productName,
      contractor: c.contractor,       insuredName: c.insuredName,
      branch: c.branch,               handler: c.handler,
      isPaidFull: c.isPaidFull,       firstPremium: c.firstPremium,
      rejoinDate: c.rejoinDate,       processStatus: c.processStatus,
      planNo: c.planNo,               rejoinSecuritiesNo: c.rejoinSecuritiesNo,
      planStatus: c.planStatus,       planFirstPremium: c.planFirstPremium,
      issueStatus: c.issueStatus,     issueDeadline: c.issueDeadline,
      scanStatus: c.scanStatus,       scanDeadline: c.scanDeadline,
      receiptStatus: c.receiptStatus, receiptDeadline: c.receiptDeadline,
      rejectIssueStatus: c.rejectIssueStatus, rejectIssueDeadline: c.rejectIssueDeadline,
      rejectScanStatus: c.rejectScanStatus,   rejectScanDeadline: c.rejectScanDeadline,
    };
    return [
      { ...shared, rowId: `${c.id}-1`, subRow: false },
      { ...shared, rowId: `${c.id}-2`, subRow: true  },
    ];
  });
}

// ─────────────────────────────────────────────────────────────
// 스타일 상수 / 헬퍼
// ─────────────────────────────────────────────────────────────
const isLink = (v: unknown) => String(v).startsWith('LA');

const linkStyle = (v: unknown): React.CSSProperties =>
  isLink(v) ? { color: 'var(--color-primary-50)', textDecoration: 'underline', cursor: 'pointer' } : {};

/** 셀 내부 공통 wrapper */
const CellBox = ({ v, children }: { v?: unknown; children?: React.ReactNode }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '100%', width: '100%', padding: '0 6px',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    ...(v !== undefined ? linkStyle(v) : {}),
  }}>
    {children ?? String(v ?? '')}
  </div>
);

// ─────────────────────────────────────────────────────────────
// rowSpan 헬퍼 - subRow=false(row1) 에서만 2칸 차지
// ─────────────────────────────────────────────────────────────
const spanTwoOnRow1 = (params: RowSpanParams<FlatRow>) =>
  params.data?.subRow === false ? 2 : 1;

/**
 * rowSpan=2 컬럼을 위한 cellStyle (선택, 재가입일, 처리상태)
 *
 * subRow=false: 실제 span되는 셀. 하단 border를 그려 2줄 세트 경계를 표시.
 * subRow=true: 가려진 셀. 모든 border 제거.
 */
const spanCellStyle = (params: CellClassParams<FlatRow>, withRightBorder: boolean): CellStyle =>
  params.data?.subRow === false
    ? {
        borderBottom: '1px solid var(--ag-border-color, #d9d9d9)',
        boxShadow: 'inset 0 -1px 0 var(--ag-border-color, #d9d9d9)',
        ...(withRightBorder ? { borderRight: '1px solid var(--ag-border-color, #d9d9d9)' } : {}),
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--ag-background-color, #fff)',
      }
    : {
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
        padding: 0,
        background: 'var(--ag-background-color, #fff) !important',
      };

// ─────────────────────────────────────────────────────────────
// 컬럼 정의
// ─────────────────────────────────────────────────────────────
const columnDefs: Array<ColDef<FlatRow> | ColGroupDef<FlatRow>> = [

  // ── 선택 (rowSpan=2) ─────────────────────────────────────
  {
    headerName: '선택',
    field: 'contractId',
    width: 50,
    sortable: false, filter: false, suppressMovable: true, resizable: false,
    headerClass: 'ag-header-cell-center',
    rowSpan: spanTwoOnRow1,
    cellClassRules: {
      'ag-cell-span': (p) => p.data?.subRow === false,
      'ag-cell-span-hidden': (p) => p.data?.subRow === true,
    },
    cellStyle: (p) => spanCellStyle(p, true),
    checkboxSelection: (p) => p.data?.subRow === false,
    showDisabledCheckboxes: false,
  },

  // ── 계약정보 ─────────────────────────────────────────────
  {
    headerName: '계약정보',
    marryChildren: true,
    children: [
      {
        headerName: '증권번호',
        children: [{
          headerName: '상품명',
          field: 'securitiesNo',
          width: 170,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellStyle: { borderRight: '1px solid var(--ag-border-color, #d9d9d9)', borderBottom: '1px solid var(--ag-border-color, #d9d9d9)', padding: 0 },
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            // const v = p.data?.subRow === false ? p.data.securitiesNo : (p.data?.productName ?? '');
            // return <CellBox v={v} />;
             if (p.data?.subRow === false) {
              return (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      height: '100%', width: '100%', padding: '0 6px',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      color: 'var(--color-primary-50)', textDecoration: 'underline', cursor: 'pointer',
                    }}>
                      {p.data.securitiesNo}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent align="center" side="bottom" sideOffset={0} variant="default">
                    <Gcol>
                      <Button
                        color="primary"
                        only="default"
                        size="lg"
                        variant="contained"
                        className="w-full"
                      >
                        계약상세
                      </Button>
                      <Button
                        color="primary"
                        only="default"
                        size="lg"
                        variant="contained"
                        className="w-full"
                      >
                        메모장
                      </Button>
                    </Gcol>
                  </TooltipContent>
                </Tooltip>
              );
            }
            return <CellBox v={p.data?.productName ?? ''} />;
          },
        }],
      },
      {
        headerName: '계약자',
        children: [{
          headerName: '피보험자명',
          field: 'contractor',
          width: 125,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellStyle: { borderRight: '1px solid var(--ag-border-color, #d9d9d9)', borderBottom: '1px solid var(--ag-border-color, #d9d9d9)', padding: 0 },
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            const v = p.data?.subRow === false ? p.data.contractor : (p.data?.insuredName ?? '');
            return <CellBox v={v} />;
          },
        }],
      },
      {
        headerName: '취급지점',
        children: [{
          headerName: '취급자',
          field: 'branch',
          width: 110,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellStyle: { borderRight: '1px solid var(--ag-border-color, #d9d9d9)', borderBottom: '1px solid var(--ag-border-color, #d9d9d9)', padding: 0 },
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            const v = p.data?.subRow === false ? p.data.branch : (p.data?.handler ?? '');
            return <CellBox v={v} />;
          },
        }],
      },
      {
        headerName: '완납여부',
        children: [{
          headerName: '1회보험료',
          field: 'isPaidFull',
          width: 100,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellStyle: { borderRight: '1px solid var(--ag-border-color, #d9d9d9)', borderBottom: '1px solid var(--ag-border-color, #d9d9d9)', padding: 0 },
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            const v = p.data?.subRow === false ? p.data.isPaidFull : (p.data?.firstPremium ?? '');
            return <CellBox v={v} />;
          },
        }],
      },
    ],
  },

  // ── 재가입정보 (재가입일, 처리상태 → rowSpan=2) ──────────
  {
    headerName: '재가입정보',
    marryChildren: true,
    children: [
      {
        headerName: '재가입일',
        field: 'rejoinDate',
        width: 110,
        sortable: false, filter: false, suppressMovable: true, resizable: true,
        headerClass: 'ag-header-cell-center',
        rowSpan: spanTwoOnRow1,
        cellClassRules: {
          'ag-cell-span': (p) => p.data?.subRow === false,
          'ag-cell-span-hidden': (p) => p.data?.subRow === true,
        },
        cellStyle: (p) => spanCellStyle(p, true),
        cellRenderer: (p: ICellRendererParams<FlatRow>) =>
          p.data?.subRow === false ? <CellBox v={p.data.rejoinDate} /> : null,
      },
      {
        headerName: '처리상태',
        field: 'processStatus',
        width: 90,
        sortable: false, filter: false, suppressMovable: true, resizable: true,
        headerClass: 'ag-header-cell-center',
        rowSpan: spanTwoOnRow1,
        cellClassRules: {
          'ag-cell-span': (p) => p.data?.subRow === false,
          'ag-cell-span-hidden': (p) => p.data?.subRow === true,
        },
        cellStyle: (p) => spanCellStyle(p, false),
        cellRenderer: (p: ICellRendererParams<FlatRow>) =>
          p.data?.subRow === false ? <CellBox v={p.data.processStatus} /> : null,
      },
    ],
  },

  // ── 재가입 신청(현재 판매 상품) ──────────────────────────
  {
    headerName: '재가입 신청(현재 판매 상품)',
    marryChildren: true,
    children: [
      {
        headerName: '설계번호',
        children: [{
          headerName: '재가입증권번호',
          field: 'planNo',
          width: 160,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellStyle: { borderRight: '1px solid var(--ag-border-color, #d9d9d9)', borderBottom: '1px solid var(--ag-border-color, #d9d9d9)', padding: 0 },
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            const v = p.data?.subRow === false ? p.data.planNo : (p.data?.rejoinSecuritiesNo ?? '');
            return <CellBox v={v} />;
          },
        }],
      },
      {
        headerName: '설계상태',
        children: [{
          headerName: '1회보험료',
          field: 'planStatus',
          width: 100,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            const v = p.data?.subRow === false ? p.data.planStatus : (p.data?.planFirstPremium ?? '');
            return <CellBox v={v} />;
          },
        }],
      },
      {
        headerName: '1.발행',
        children: [{
          headerName: '처리기한',
          field: 'issueStatus',
          width: 100,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            const v = p.data?.subRow === false ? p.data.issueStatus : (p.data?.issueDeadline ?? '');
            return <CellBox v={v} />;
          },
        }],
      },
      {
        headerName: '2.스캔',
        children: [{
          headerName: '처리기한',
          field: 'scanStatus',
          width: 100,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            const v = p.data?.subRow === false ? p.data.scanStatus : (p.data?.scanDeadline ?? '');
            return <CellBox v={v} />;
          },
        }],
      },
      {
        headerName: '3.수납',
        children: [{
          headerName: '처리기한',
          field: 'receiptStatus',
          width: 100,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            const v = p.data?.subRow === false ? p.data.receiptStatus : (p.data?.receiptDeadline ?? '');
            return <CellBox v={v} />;
          },
        }],
      },
    ],
  },

  // ── 재가입거절신청 ───────────────────────────────────────
  {
    headerName: '재가입거절신청',
    marryChildren: true,
    children: [
      {
        headerName: '1.발행',
        children: [{
          headerName: '처리기한',
          field: 'rejectIssueStatus',
          width: 100,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            const v = p.data?.subRow === false ? p.data.rejectIssueStatus : (p.data?.rejectIssueDeadline ?? '');
            return <CellBox v={v} />;
          },
        }],
      },
      {
        headerName: '2.스캔',
        children: [{
          headerName: '처리기한',
          field: 'rejectScanStatus',
          width: 100,
          sortable: false, filter: false, suppressMovable: true, resizable: true,
          headerClass: 'ag-header-cell-center',
          cellRenderer: (p: ICellRendererParams<FlatRow>) => {
            const v = p.data?.subRow === false ? p.data.rejectScanStatus : (p.data?.rejectScanDeadline ?? '');
            return <CellBox v={v} />;
          },
        }],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// 컴포넌트
// ─────────────────────────────────────────────────────────────
const LTPA310 = () => {
  const rowData = React.useMemo(() => flattenContracts(contracts), []);

  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });
  
  return (
    <Gcol className="w-full gap-[1.2rem]">
      <Grow className="w-full" variant="box" placement={'bwe'}>
        <FormTable variant={'none'}
          caption="실손 재가입대상계약현황 테이블"
          cols={[
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
            'w-[10rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'조회구분'}>
              <NativeSelect
                aria-label="조회구분 선택"
                width="12rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '취급기관2' },
                  { value: 'selection2', id: 'type01-2', label: '취급기관2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input aria-label="" width={'8rem'} value={'12345678'} />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button> 
              <Input aria-label="" width={'12rem'} value={'신부산GA지점'} readOnly />
            </FormCell>
            <FormCell title={'모계약종류'}>
              <NativeSelect
                aria-label="모계약종류 선택"
                width="12rem"
                value={form.type02}
                onChange={(e) => setFormField('type02', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '유병자실손' },
                  { value: 'selection2', id: 'type02-2', label: '유병자실손2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'완납여부'}>
              <RadioGroup width="full" className="gap-2">
                <RadioGroupItem color="primary" id="pay_all"  size="lg" value="all"  variant="default" checked={true}>
                  전체
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="pay_done" size="lg" value="done" variant="default">
                  완납
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="pay_not"  size="lg" value="not"  variant="default">
                  미완납
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
            <FormCell title={'스캔여부'}>
              <RadioGroup width="full" className="gap-2">
                <RadioGroupItem color="primary"
                 id="scan_all"  size="lg" value="all"  variant="default" checked={true}>
                  전체
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="scan_done" size="lg" value="done" variant="default">
                  완료
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="scan_not"  size="lg" value="not"  variant="default">
                  미완료
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'재계약도래'}>
              <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-02', to: '2026-03' }} size="lg" width="sm" />
            </FormCell>
            <FormCell title={'처리상태'}>
              <NativeSelect
                aria-label="처리상태 선택"
                width="12rem"
                value={form.type03}
                onChange={(e) => setFormField('type03', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type03-1', label: '재가입거절완료' },
                  { value: 'selection2', id: 'type03-2', label: '재가입거절완료2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'발송여부'}>
              <RadioGroup width="full" className="gap-2">
                <RadioGroupItem color="primary" id="send_all"  size="lg" value="all"  variant="default" checked={true}>
                  전체
                  </RadioGroupItem>
                <RadioGroupItem color="primary" id="send_done" size="lg" value="done" variant="default">
                  발송
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="send_not"  size="lg" value="not"  variant="default">
                  미발송
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
            <FormCell title={'수납여부'}>
              <RadioGroup className="gap-2" width="full">
                <RadioGroupItem color="primary" id="receipt_all"  size="lg" value="all"  variant="default" checked={true}>
                  전체
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="receipt_done" size="lg" value="done" variant="default">
                  완납
                </RadioGroupItem>
                <RadioGroupItem color="primary" id="receipt_not"  size="lg" value="not"  variant="default">
                  미완납
                </RadioGroupItem>
              </RadioGroup>
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
        <FormTable
          caption="실손 재가입대상계약현황 테이블"
          cols={[
            'w-[14rem]', 'min-w-[14rem] flex-1',
            'w-[14rem]', 'min-w-[14rem] flex-1',
            'w-[14rem]', 'min-w-[14rem] flex-1',
            'w-[14rem]', 'min-w-[14rem] flex-1',
            'w-[14rem]', 'min-w-[14rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'전체대상'}>
              10건
            </FormCell>
            <FormCell title={'신청가능'}>
              10건
            </FormCell>
            <FormCell title={'신계약전환중'}>
              10건
            </FormCell>
            <FormCell title={'신계약전환완료'}>
              10건
            </FormCell>
            <FormCell title={'재가입거절완료'}>
              10건
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>

      <Grow className="w-full">
        {/* 수정된 부분: aggrid-span-fix 클래스 및STYLE_TAG 관련 주석 제거 */}
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<FlatRow>
            getRowId={(params) => params.data.rowId}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: false }}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            rowSelection={'multiple'}
            suppressRowClickSelection={true}
            /**
             * rowHeight: FlatRow 1줄 높이 (계약 1건 = 2줄 = 80px 시각적 높이)
             * suppressRowTransform: true → rowSpan 작동에 필수 옵션
             */
            rowHeight={40}
            headerHeight={32}
            groupHeaderHeight={32}
            suppressRowTransform={true}
          />
        </div>
      </Grow>
    </Gcol>

  );
};

type Story = StoryObj<typeof meta>;

export const Page144: Story = {
  render: () => <LTPA310 />,
};