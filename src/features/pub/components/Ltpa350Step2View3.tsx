'use client';

import type { CellClassParams, ColDef, ICellRendererParams, GridReadyEvent, IRowNode } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { TooltipQ } from '@/shared/components/common/TooltipQ';
import { useTabs } from '@/shared/hooks/useTabs';
import {
  editableSelectCellRenderer,
  numberValueFormatter,
  createTooltipValueGetter,
  createEditableCallback,
  useDynamicPx,
} from '@aggrid';
import { Grow, Typo, Divider, Grid } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormRow, FormTable, FormCell } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { ResetIcon, SearchIcon } from '@icons';
import { LayoutMainBody, LayoutMainFoot, LayoutMain } from '@layout/BaseLayout';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

ModuleRegistry.registerModules([AllCommunityModule]);

interface TabDataType {
  id: string | number;
  name?: string;
  age?: string | number;
  gender?: string;
  value: string;
  error?: boolean;
  info: string[];
}
const TabData: TabDataType[] = [
  {
    id: 1,
    name: '홍길동',
    age: '1',
    gender: '여',
    value: 'tab1',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3', '추가정보4', '추가정보5'],
  },
  {
    id: 2,
    name: '목적물',
    value: 'tab2',
    error: true,
    info: ['추가정보1', '추가정보2', '추가정보3'],
  },
  {
    id: 3,
    name: '반짝빛나리반짝빛나리',
    age: '3',
    gender: '여',
    value: 'tab3',
    error: false,
    info: ['추가정보1', '추가정보2'],
  },
];

interface DummyDataType {
  id: number;
  isChecked?: boolean;
  field1?: string | number | boolean;
  field2?: string | number | boolean;
  field3?: string | number | boolean;
  field4?: string | number | boolean;
  field5?: string | number | boolean;
  field6?: string | number | boolean;
  field7?: string | number | boolean;
  field8?: string | number | boolean;
  [key: string]: unknown;
}
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field1: '건물(실손)',
    field2: 0,
    field3: 0,
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: '',
  },
  {
    id: 2,
    isChecked: false,
    field1: '가재(실손)',
    field2: 0,
    field3: 0,
    field4: '',
    field5: '일체',
    field6: '건물내',
    field7: '아니오',
    field8: '가연성',
  },
];

interface DummyData2Type {
  id: number;
  isChecked?: boolean;
  field1?: string | number | boolean;
  field2?: string | number | boolean;
  field3?: string | number | boolean;
  field4?: string | number | boolean;
  field5?: string | number | boolean;
  field6?: string | number | boolean;
  field7?: string | number | boolean;
  field8?: string | number | boolean;
}
const DummyData2: DummyData2Type[] = [
  {
    id: 1,
    isChecked: true,
    field1: '배상책임',
    field2: '보통약관(화재배상책임)',
    field3: false,
    field4: 100,
    field5: '20년',
    field6: '전기납',
    field7: 0,
  },
  {
    id: 2,
    isChecked: false,
    field1: '배상책임',
    field2:
      '보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)보통약관(화재배상책임, 무과실)',
    field3: true,
    field4: 100,
    field5: '20년',
    field6: '전기납',
    field7: 0,
  },
  {
    id: 1,
    isChecked: false,
    field1: '배상책임',
    field2: '보통약관(화재배상책임)',
    field3: false,
    field4: 100,
    field5: '20년',
    field6: '전기납',
    field7: 0,
  },
  {
    id: 2,
    isChecked: true,
    field1: '화재기타',
    field2: '보통약관(화재배상책임, 무과실)',
    field3: true,
    field4: 100,
    field5: '20년',
    field6: '전기납',
    field7: 0,
  },
];

type AgGridRow = DummyDataType & {
  isDuplicate?: boolean;
  displayNo?: number;
  badge?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
};

type AgGridRow2 = DummyData2Type & {
  isDuplicate?: boolean;
  displayNo?: number;
  badge?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
};

export function Ltpa350Step2View3() {
  // 1) INLINED STATE (default)
  const [checkedMap, setCheckedMap] = useState({ selected: true, unselected: false });
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const [, setGridKey] = useState<number>(0);
  const handleActionButtonClick = useCallback(() => {}, []);
  const handleCheckedChange = (key: string) => (checked: boolean | 'indeterminate') => {
    setCheckedMap((map) => ({ ...map, [key]: !!checked }));
  };

  // Dynamic widths based on zoom scale
  const colWidth40 = useDynamicPx(40);
  const colWidth60 = useDynamicPx(60);
  const colWidth80 = useDynamicPx(80);
  const colWidth100 = useDynamicPx(100);
  const colWidth120 = useDynamicPx(120);
  const colWidth140 = useDynamicPx(140);
  const colWidth160 = useDynamicPx(160);
  const colWidth180 = useDynamicPx(180);
  const attributeColumnWidth = useMemo(
    () => [colWidth40, colWidth60, colWidth80, colWidth100, colWidth120, colWidth140, colWidth160, colWidth180],
    [colWidth40, colWidth60, colWidth80, colWidth100, colWidth120, colWidth140, colWidth160, colWidth180]
  );

  // 2) Tabs/rowData 분기
  const tabListData = TabData;
  const stringifiedTabs: TabDataType[] = tabListData.map((item) => ({
    ...item,
    value: String(item.id),
  }));
  const {
    tabs: Tabs,
    active: TabActive,
    setActive: TabSetActive,
    handleRemove,
  } = useTabs<TabDataType>(stringifiedTabs);

  // 3) Grid data
  const [rowData] = useState<AgGridRow[]>(DummyData);
  const [rowData2] = useState<AgGridRow2[]>(DummyData2);

  // rowData의 isChecked가 true인 row를 자동 선택
  const gridRef = useRef<AgGridReact<AgGridRow>>(null);
  const gridRef2 = useRef<AgGridReact<AgGridRow2>>(null);
  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.forEachNode((node) => {
        if (node.data && node.data.isChecked) {
          node.setSelected(true);
        }
      });
    }
    if (gridRef2.current && gridRef2.current.api) {
      gridRef2.current.api.forEachNode((node) => {
        if (node.data && node.data.isChecked) {
          node.setSelected(true);
        }
      });
    }
  }, [rowData, rowData2]);

  // ag-Grid가 완전히 준비된 후에도 체크박스 선택 보장
  const handleGridReady = (params: GridReadyEvent) => {
    params.api.forEachNode((node: IRowNode<AgGridRow>) => {
      if (node.data && node.data.isChecked) {
        node.setSelected(true);
      }
    });
  };

  // rowData의 isChecked가 true인 row를 자동 선택
  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.forEachNode((node) => {
        if (node.data && node.data.isChecked) {
          node.setSelected(true);
        }
      });
    }
  }, [rowData]);

  const [coverageName, setCoverageName] = useState('');
  const productNameHeader = useCallback(() => {
    const handleTooltipCheck = (checked: boolean | 'indeterminate') => {
      setShowProductNameTooltip(!!checked);
      if (!checked) setGridKey((key: number) => key + 1);
    };
    return (
      <Grow className="w-full px-[0.6rem]" placement={'cc'} gap={4}>
        <Grow gap={1.5} placement={'sc'}>
          <Checkbox variant={'text'} checked={checkedMap.selected} onCheckedChange={handleCheckedChange('selected')}>
            선택 24건
          </Checkbox>
          <Divider />
          <Checkbox
            variant={'text'}
            checked={checkedMap.unselected}
            onCheckedChange={handleCheckedChange('unselected')}
          >
            미선택
          </Checkbox>
        </Grow>
        <Grow>
          <Input
            aria-label="담보명"
            placeholder="담보명 입력"
            type="text"
            width={'full'}
            size={'sm'}
            clear={true}
            value={coverageName}
            onChange={(e) => setCoverageName(e.target.value)}
          />
          <Button aria-label="담보명 검색" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
          <Button
            aria-label="담보명 초기화"
            variant={'outlined'}
            color={'gray-light'}
            only={'icon'}
            size={'md'}
            onClick={() => setCoverageName('')}
          >
            <ResetIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grow>
        <Grow placement={'sc'}>
          <Checkbox size={'md'} checked={showProductNameTooltip} onCheckedChange={handleTooltipCheck}>
            담보명 말풍선
          </Checkbox>
        </Grow>
      </Grow>
    );
  }, [checkedMap, coverageName, showProductNameTooltip, setGridKey]);

  const editableCellClassRules = useMemo(
    () => ({
      'editable-cell': (params: CellClassParams<AgGridRow>) => {
        const isRowChecked = params.node?.isSelected?.() ?? false;
        return isRowChecked;
      },
    }),
    []
  );
  const getEditableCallback = useCallback(
    (mode: 'always' | 'whenSelected') => createEditableCallback<AgGridRow>(mode),
    []
  );
  // AgGridRow2용 콜백
  const getEditableCallback2 = useCallback(
    (mode: 'always' | 'whenSelected') => createEditableCallback<AgGridRow2>(mode),
    []
  );
  // align 값을 받아 동적으로 정렬 지정
  const expiryCellRenderer = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<AgGridRow>) =>
        editableSelectCellRenderer<AgGridRow>({ ...params, align }),
    []
  );
  // AgGridRow2용 cellRenderer
  const expiryCellRenderer2 = useCallback(
    (align: 'left' | 'center' | 'right' = 'right') =>
      (params: ICellRendererParams<AgGridRow2>) =>
        editableSelectCellRenderer<AgGridRow2>({ ...params, align }),
    []
  );
  const attributeRenderer = (params: ICellRendererParams<AgGridRow>) => {
    if (!params.value) return null;
    return (
      <div className="flex flex-wrap gap-1 justify-center items-center w-full h-full">
        <Button
          only={'icon'}
          variant={'none'}
          size={'sm'}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => event.stopPropagation()}
        >
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </div>
    );
  };

  // 재물
  const columnDefs: ColDef<AgGridRow>[] = useMemo(
    () => [
      {
        headerName: '부호',
        field: 'id',
        cellClass: 'text-center',
        width: attributeColumnWidth[1],
      },
      {
        headerName: '구분',
        field: 'field1',
        flex: 1,
        cellClass: 'text-left',
        width: attributeColumnWidth[2],
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field2' }),
      },
      {
        headerName: '가입금액(만원)',
        field: 'field2',
        width: attributeColumnWidth[4],
        headerClass: 'px-0!',
        cellClass: () => 'text-right editable-cell [&_input]:text-right',
        editable: true,
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '보험료(원)',
        field: 'field3',
        width: attributeColumnWidth[2],
        cellClass: 'text-right editable-cell [&_input]:text-right',
        headerClass: 'px-0!',
        editable: true,
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '목적물상세',
        field: 'field4',
        width: attributeColumnWidth[3],
        cellClass: 'editable-cell',
        cellClassRules: editableCellClassRules,
        editable: true,
      },
      {
        headerName: '수용장소상세',
        field: 'field5',
        width: attributeColumnWidth[3],
        cellClassRules: editableCellClassRules,
        cellClass: 'editable-cell',
        editable: true,
      },
      {
        headerName: '건물내/외',
        field: 'field6',
        width: attributeColumnWidth[3],
        cellClass: 'editable-cell',
        cellClassRules: editableCellClassRules,
        editable: getEditableCallback('whenSelected'),
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['건물내', '건물밖야적'],
        },
        cellRenderer: expiryCellRenderer('left'),
      },
      {
        headerName: '지하수용',
        field: 'field7',
        width: attributeColumnWidth[2],
        cellClass: 'editable-cell',
        editable: getEditableCallback('whenSelected'),
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['예', '아니오'],
        },
        cellRenderer: expiryCellRenderer('left'),
      },
      {
        headerName: '야적물건',
        field: 'field8',
        width: attributeColumnWidth[3],
        cellClass: 'editable-cell',
        editable: getEditableCallback('whenSelected'),
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['가연성', '가연성2'],
        },
        cellRenderer: expiryCellRenderer('left'),
      },
    ],
    [attributeColumnWidth, productNameHeader, editableCellClassRules, expiryCellRenderer, getEditableCallback]
  );
  const columnDefs2: ColDef<AgGridRow2>[] = useMemo(
    () => [
      {
        headerName: '',
        field: 'field1',
        width: attributeColumnWidth[6],
        headerClass: 'px-0!',
        spanRows: true,
        cellClass: 'flex! items-center! justify-center! text-center',
      },
      {
        headerName: '',
        field: 'field2',
        flex: 1,
        cellClass: 'text-left',
        suppressMovable: true, // 이동 방지
        headerComponent: productNameHeader,
      },

      {
        headerName: '속성',
        field: 'field3',
        width: attributeColumnWidth[0],
        cellClass: 'text-center',
        headerClass: 'px-0!',
        cellRenderer: attributeRenderer as any, // AgGridRow2에도 재사용, 타입 충돌시 as any
      },
      {
        headerName: '가입금액(만원)',
        field: 'field4',
        width: attributeColumnWidth[4],
        headerClass: 'px-0!',
        cellClass: () => 'text-right editable-cell [&_input]:text-right',
        valueParser: (params) => Number(params.newValue) || 0,
        valueFormatter: numberValueFormatter,
      },
      {
        headerName: '만기',
        field: 'field5',
        width: attributeColumnWidth[3],
        cellClass: 'text-center',
        headerClass: 'px-0!',
      },
      {
        headerName: '납기',
        field: 'field6',
        width: attributeColumnWidth[3],
        cellClass: 'editable-cell',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['5년', '10년', '15년', '20년', '25년', '30년', '35년', '전기납'],
        },
        editable: getEditableCallback2('whenSelected'),
        cellRenderer: expiryCellRenderer2('left'),
      },
      {
        headerName: '보험료(원)',
        field: 'field7',
        width: attributeColumnWidth[3],
        cellClass: 'text-right ',
        cellEditor: 'agSelectCellEditor',
      },
    ],
    [attributeColumnWidth, productNameHeader, getEditableCallback2, expiryCellRenderer2]
  );

  const [amount, setAmount] = useState('0');
  const [refundRate, setRefundRate] = useState('39.4');
  const [testError, setTestError] = useState(false);

  return (
    <LayoutMainBody>
      <form
        id="page2-MainForm"
        className="w-full h-full"
        onSubmit={(event) => {
          event.preventDefault();
          setTestError(!testError);
        }}
        noValidate
      >
        <LayoutMain className="grid grid-rows-[auto_1fr_auto] gap-[1rem] h-full">
          <TabPager
            data={Tabs}
            active={TabActive}
            setActive={TabSetActive}
            visibleCount={5}
            removable={true}
            onRemove={handleRemove}
            error={testError}
            errorMsg="입력하세요."
            getValue={(tab) => String(tab.id)}
            renderTab={(tab) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center">
                    <span className="max-w-20 truncate block">{tab.name}</span>
                    {tab.age && tab.gender && <span className="block">{`${tab.age}세(${tab.gender})`}</span>}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  <BulletList className="gap-[0.5rem]">
                    {(tab.info ?? []).map((info: string, index: number) => (
                      <BulletListItem key={index} type="dot">
                        {info}
                      </BulletListItem>
                    ))}
                  </BulletList>
                </TooltipContent>
              </Tooltip>
            )}
            renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (
              <Button
                variant={'none'}
                key={String(tab.id)}
                onClick={() => {
                  setActive(String(tab.id));
                  const idx = data.findIndex((t) => String(t.id) === String(tab.id));
                  if (idx !== -1) {
                    const page = Math.floor(idx / visibleCount);
                    setVisibleStart(page * visibleCount);
                  }
                }}
              >
                <span className="flex items-start gap-2 w-full">
                  <span className="block">{tab.name}</span>
                  <span className="block">{`${tab.age}세(${tab.gender})`}</span>
                </span>
              </Button>
            )}
          />

          <LayoutMainBody>
            <ResizablePanelGroup orientation="vertical" className="w-full">
              <ResizablePanel defaultSize={50}>
                <Grid className="w-full grid grid-rows-[auto_1fr] h-full">
                  <Grow placement={'bwc'} className="gap-1 w-full pb-1">
                    <Grow className="gap-1.5">
                      <Typo variant="heading-sm">화재기본담보</Typo>
                      <Typo variant="body-md">(060400, (1))</Typo>
                    </Grow>
                    <Grow className="gap-2.5">
                      <Grow className="gap-1">
                        <NativeSelect
                          aria-label="실손전부보상"
                          width={140}
                          size={'sm'}
                          readOnly={false}
                          required={false}
                        >
                          {[
                            { label: '실손전부보상', value: '실손전부보상' },
                            { label: '실손전부보상2', value: '실손전부보상2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.value} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                        <Button variant={'outlined'} color={'gray'} size={'md'}>
                          가입설계도우미 알림톡발송
                        </Button>
                      </Grow>
                    </Grow>
                  </Grow>

                  <div className="ag-theme-alpine">
                    <AgGridReact<AgGridRow>
                      ref={gridRef}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      getRowId={(params) => String(params.data.id)}
                      singleClickEdit={true}
                      rowSelection={{
                        mode: 'multiRow' as const,
                        checkboxes: true,
                        headerCheckbox: true,
                        enableClickSelection: false,
                        enableSelectionWithoutKeys: true,
                      }}
                      selectionColumnDef={{
                        width: 30,
                        cellClass: 'text-center p-0!',
                        cellClassRules: {
                          'pointer-events-none': (params) => !!params.data?.locked,
                        },
                      }}
                      suppressRowHoverHighlight={false}
                      domLayout="normal"
                      tooltipShowDelay={showProductNameTooltip ? 0 : undefined}
                      tooltipHideDelay={showProductNameTooltip ? 9999 : undefined}
                      tooltipMouseTrack={showProductNameTooltip ? true : undefined}
                      onGridReady={handleGridReady}
                    />
                  </div>
                </Grid>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <Grid className="w-full grid grid-rows-[auto_1fr] h-full">
                  <Grow placement={'bwc'} className="gap-1 w-full pb-1">
                    <Grow className="gap-1.5">
                      <Typo variant="heading-sm">화재특약담보</Typo>
                    </Grow>
                    <Grow className="gap-2.5">
                      <Button color="gray" onClick={() => {}} only="default" size="md" variant="contained">
                        질권설정
                      </Button>
                      <TooltipQ>
                        {`질권설정이란 채권자가 채무자 등이 제공한 재산이나 재산권에 대해 다른 채권자보다 우선변제를 받을 수 있도록 하는 담보권입니다. 목적물 질권 설정 버튼은 청약진행 후 활성화 됩니다.`}
                      </TooltipQ>
                    </Grow>
                  </Grow>
                  <div className="ag-theme-alpine h-80">
                    <AgGridReact<AgGridRow2>
                      ref={gridRef2}
                      rowData={DummyData2}
                      columnDefs={columnDefs2}
                      getRowId={(params) => String(params.data.id)}
                      singleClickEdit={true} // 한 번의 클릭으로 편집 활성화
                      rowSelection={{
                        mode: 'multiRow' as const,
                        checkboxes: true,
                        headerCheckbox: false,
                        enableClickSelection: false,
                        enableSelectionWithoutKeys: true,
                      }}
                      enableCellSpan={true}
                      selectionColumnDef={{
                        width: 30,
                        // pinned: 'left',
                        cellClass: 'text-center p-0!',
                        cellClassRules: {
                          'pointer-events-none': (params) => !!params.data?.locked,
                        },
                      }}
                      domLayout="normal"
                      suppressRowHoverHighlight={false}
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      onGridReady={handleGridReady}
                    />
                  </div>
                </Grid>
              </ResizablePanel>
            </ResizablePanelGroup>
          </LayoutMainBody>
          <LayoutMainFoot>
            <MainBottom>
              <MainBottomItem>
                <FormTable
                  className="w-full! [&_tr]:justify-between"
                  lineTop={false}
                  variant={'none'}
                  cols={[
                    'w-[9rem]',
                    'w-[auto]',
                    'w-[8rem]',
                    'w-[auto]',
                    'w-[8rem]',
                    'w-[auto]',
                    'w-[8rem]',
                    'w-[auto]',
                  ]}
                >
                  <FormRow>
                    <FormCell title="만기금(환급률)" style={{ borderBottom: '0.1rem solid #ccc' }}>
                      <Button variant={'outlined'} color={'gray'} size={'sm'}>
                        예상
                      </Button>
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={100000}
                        width={'full'}
                        readOnly={true}
                        className="[&_input]:text-right [&_input]:tracking-[-0.03rem] [&_input]:color-[#000]!"
                      />
                      <Input
                        type="text"
                        commaAmount={true}
                        value={refundRate}
                        onChange={(e) => setRefundRate(e.target.value)}
                        width={60}
                        className="[&_input]:text-right shrink-0"
                      />
                      %
                    </FormCell>
                    <FormCell title="보장보험료">
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={100000}
                        width={'full'}
                        readOnly={true}
                        className="[&_input]:text-right"
                      />
                    </FormCell>
                    <FormCell title="적립보험료">
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={100000}
                        width={'full'}
                        readOnly={true}
                        className="text-right"
                      />
                    </FormCell>

                    <FormCell title="합계보험료">
                      <Input
                        type="tel"
                        commaAmount={true}
                        value={amount}
                        clear={true}
                        width={'full'}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setTestError(!e.target.value);
                        }}
                        required={true}
                        error={testError}
                        errorMsg={'계약자 입력은 필수입니다.'}
                        errorPs={'tr'}
                        className="text-right font-bold"
                      />
                    </FormCell>
                  </FormRow>
                </FormTable>
              </MainBottomItem>
              <MainBottomItem className="justify-end">
                <Grow className="gap-1">
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={handleActionButtonClick}>
                    상품비교설계
                  </Button>
                  <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={handleActionButtonClick}>
                    동일상품복사
                  </Button>
                  <Button
                    type="submit"
                    form={'page2-MainForm'}
                    variant={'contained'}
                    color={'primary'}
                    size={'xl'}
                    // onClick={onCalcGuidelineClick}
                  >
                    보험료계산(지침)
                  </Button>
                </Grow>
              </MainBottomItem>
            </MainBottom>
          </LayoutMainFoot>
        </LayoutMain>
      </form>
    </LayoutMainBody>
  );
}
