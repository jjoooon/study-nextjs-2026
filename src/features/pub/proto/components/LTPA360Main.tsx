import { useTabs } from '@/shared/hooks/useTabs';
import { TabPager } from '@common/TabPager';

import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';

// Layout Components
import { LayoutMain, LayoutMainBody, LayoutMainFoot } from '@layout/BaseLayout';
import { LayoutScrollWrap, LayoutScrollItem } from '@common/LayoutScroll';


import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { SearchIcon, ResetIcon, FileExportIcon, FileImportIcon } from '@icons';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridEmptyComponent, DatePickerCellEditor } from '@aggrid';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { DatePickerInput } from '@common/DatePicker';
import { useFormFields } from '@hooks/useFormFields';
import { LTPA360DummyData1, type LTPA360DummyDataRow1, LTPA360DummyData1_1, type LTPA360DummyDataRow1_1, LTPA360DummyData2, type LTPA360DummyDataRow2, LTPA360DummyData3, type LTPA360DummyDataRow3, LTPA360DummyData4, type LTPA360DummyDataRow4 } from '../data/LTPA360Data';
import { MainBottom, MainBottomItem } from '@/shared/components/features/MainFoot';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPA360Main = () => {
  // Tab 정의
  type LTPA360TabType = { name: string; value: string; label: string };
  const DATA_TABS: LTPA360TabType[] = [
    { name: '총괄장표', value: 'tab1', label: '총괄장표' },
    { name: '입력장표', value: 'tab2', label: '입력장표' },
    { name: '담보코드요청', value: 'tab3', label: '담보코드요청' },
    { name: '사고담보코드요청', value: 'tab4', label: '사고담보코드요청' },
  ];
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);
  
  const handlePreviewClick = (row: LTPA360DummyDataRow2) => {
    // TODO: 실제 미리보기 팝업/라우팅 연동
    // eslint-disable-next-line no-console
  console.log('[LTPZ001] 미리보기 클릭', row);
  };

  // Tab1 AGGrid Column
  const columnDefs1: (ColDef<LTPA360DummyDataRow1>)[] = [
    { 
      headerName: '단계별 진행현황', 
      field: 'field01', 
      width: 180, 
      cellEditorParams: { values: ['선택', ''] } 
    },
    { 
      headerName: '세부내용', 
      field: 'field02', 
      width: 400, 
    },
    { 
      headerName: '계획일정', 
      field: 'field03', 
      width: 90, 
    },
    { 
      headerName: '완료일자', 
      field: 'field04', 
      width: 90, 
    },
    { 
      headerName: '완료/대상', 
      field: 'field05', 
      width: 80, 
    },
    { 
      headerName: '진행율', 
      field: 'field06', 
      flex: 1, 
      editable: true, 
    },
  ];

  // Tab1_1 AGGrid Column
  const columnDefs1_1: (ColDef<LTPA360DummyDataRow1_1>)[] = [
    { 
      headerName: '판매일자', 
      field: 'field01', 
      width: 120, 
      cellClassRules: {
        'font-bold': params => Object.values(params.data ?? {}).some(
          v => typeof v === 'string' && v.includes('지연')
        ),
      },
    },
    { 
      headerName: '보종코드', 
      field: 'field02', 
      width: 100, 
      cellClassRules: {
        'font-bold': params => Object.values(params.data ?? {}).some(
          v => typeof v === 'string' && v.includes('지연')
        ),
      },
    },
    { 
      headerName: '보종명', 
      field: 'field03', 
      flex: 1,
      cellClassRules: {
        'font-bold': params => Object.values(params.data ?? {}).some(
          v => typeof v === 'string' && v.includes('지연')
        ),
      },
    },
    { 
      headerName: '기초서류', 
      field: 'field04', 
      width: 100, 
      cellClassRules: {
        'font-bold': params => Object.values(params.data ?? {}).some(
          v => typeof v === 'string' && v.includes('지연')
        ),
      },
    },
    { 
      headerName: '상품정보', 
      field: 'field05', 
      width: 100, 
      cellClassRules: {
        'font-bold': params => Object.values(params.data ?? {}).some(
          v => typeof v === 'string' && v.includes('지연')
        ),
      },
    },
    { 
      headerName: 'PV', 
      field: 'field06', 
      width: 100, 
      editable: false, 
      cellClassRules: {
        'font-bold': params => Object.values(params.data ?? {}).some(
          v => typeof v === 'string' && v.includes('지연')
        ),
      },
    },
    { 
      headerName: '만납기룰', 
      field: 'field07', 
      width: 100, 
      editable: false, 
      cellClassRules: {
        'font-bold': params => Object.values(params.data ?? {}).some(
          v => typeof v === 'string' && v.includes('지연')
        ),
      },
    },
    { 
      headerName: '설계테스트', 
      field: 'field08', 
      width: 100, 
      editable: false, 
      cellClassRules: {
        'font-bold': params => Object.values(params.data ?? {}).some(
          v => typeof v === 'string' && v.includes('지연')
        ),
      },
    },
    { 
      headerName: '츨력물검수', 
      field: 'field09', 
      width: 100, 
      editable: false, 
      cellClassRules: {
        'font-bold': params => Object.values(params.data ?? {}).some(
          v => typeof v === 'string' && v.includes('지연')
        ),
      },
    },
    { 
      headerName: '판매준비', 
      field: 'field10', 
      width: 100, 
      editable: false, 
      cellClassRules: {
        'font-bold': params => Object.values(params.data ?? {}).some(
          v => typeof v === 'string' && v.includes('지연')
        ),
      },
    },
  ];
  // 행 isSelect 토글 함수 예시 (UI에서 호출 필요)
  // const handleToggleIsSelect = (rowId: number) => {
  //   setLTPA360DummyData1_1(prev => prev.map(row => row.id === rowId ? { ...row, isSelect: !row.isSelect } : row));
  // };
  
  // Tab2 AGGrid Column
  const columnDefs2: (ColDef<LTPA360DummyDataRow2> | ColGroupDef<LTPA360DummyDataRow2>)[] = [
    {
      headerName: '상품코드',
      field: 'field01',
      width: 100,
      editable: true,
      pinned: 'left',
      cellEditorParams: { values: ['선택', ''] },
    },
    {
      headerName: '상품명',
      field: 'field02',
      width: 230,
      editable: true,
      pinned: 'left',
      cellClass: 'truncate'
    },
    {
      headerName: '판매일자',
      field: 'field03',
      width: 130,
      editable: true,
      cellEditor: DatePickerCellEditor,
    },
    {
      headerName: '계획/실적 구분',
      field: 'field04',
      width: 120,
      editable: true,
      headerComponent: () => (
        <div className="w-full h-full flex items-center justify-center text-center whitespace-normal leading-5">
          계획/<br />실적 구분
        </div>
      ),
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '실적', ''] },
    },
    {
      headerName: '담당자',
      children: [
        {
          headerName: '개발(정)',
          field: 'field05',
          width: 120,
          editable: true,
          cellRenderer: (params: ICellRendererParams<LTPA360DummyDataRow2>) => (
            <Grow className="w-full px-1" >
              <Input aria-label="" width={'100%'} size="sm" value={'박한화'} readOnly />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                <SearchIcon  color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
          ),
        },
        {
          headerName: '개발(부)',
          field: 'field06',
          width: 120,
          editable: true,
          cellRenderer: (params: ICellRendererParams<LTPA360DummyDataRow2>) => (
            <Grow className="w-full px-1" >
              <Input aria-label="" width={'100%'} size="sm" value={'박한화'} readOnly />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                <SearchIcon  color={'var(--color-primary-50)'} />
              </Button>
            </Grow>
          ),
        },
        {
          headerName: '지원',
          field: 'field07',
          width: 120,
          editable: true,
          cellRenderer: (params: ICellRendererParams<LTPA360DummyDataRow2>) => (
          <Grow className="w-full px-1" >
            <Input aria-label="" width={'100%'} size="sm" value={'박한화'} readOnly />
            <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
              <SearchIcon  color={'var(--color-primary-50)'} />
            </Button>
          </Grow>
          ),
        },
        {
          headerName: 'IT',
          field: 'field08',
          width: 120,
          editable: true,
          cellRenderer: (params: ICellRendererParams<LTPA360DummyDataRow2>) => (
          <Grow className="w-full px-1" >
            <Input aria-label="" width={'100%'} size="sm" value={'박한화'} readOnly />
            <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
              <SearchIcon  color={'var(--color-primary-50)'} />
            </Button>
          </Grow>
          ),
        },
      ],
    },
    {
      headerName: '메모',
      children: [
        {
          headerName: '질문',
          field: 'field09',
          width: 60,
          editable: true,
        },
        {
          headerName: '답변',
          field: 'field10',
          width: 60,
          editable: false,
          cellRenderer: (params: ICellRendererParams<LTPA360DummyDataRow2>) => (
          <Grow className="w-full px-1" >
            <Button aria-label="숫자" variant={'none'} size={'md'} color={'gray-light'}>
              0
            </Button>
          </Grow>
          ),
        },
      ],
    },
    {
      headerName: '체크 리스트',
      field: 'isCheck',
      width: 60,
      cellClass: 'text-center flex! items-center justify-center!',
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      editable: params => !params.node.isSelected(),
      cellRendererParams: (params: { data: LTPA360DummyDataRow2 }) => ({
        disabled: false,
      }),
      cellEditorParams: (params: { data: LTPA360DummyDataRow2 }) => ({
        disabled: false,
      }),
      cellClassRules: {},
      wrapText: true,
      headerComponent: () => (
        <div className="w-full h-full flex items-center justify-center text-center whitespace-normal leading-5">
          체크/<br />리스트
        </div>
      ),
    },
    {
      headerName: '준비일정',
      children: [
        {
          headerName: '기초서류 송부',
          field: 'field12',
          width: 130,
          editable: true,
          cellEditor: DatePickerCellEditor,
        },
        {
          headerName: '상품정보 시스템',
          field: 'field13',
          width: 130,
          editable: true,
          cellEditor: DatePickerCellEditor,
        },
        {
          headerName: 'PV',
          field: 'field14',
          width: 130,
          editable: true,
          cellClass: 'text-center',
          autoHeight: true,
          cellEditor: DatePickerCellEditor,
        },
        {
          headerName: '룰',
          field: 'field15',
          width: 130,
          editable: true,
          cellClass: 'text-center',
          autoHeight: true,
          cellEditor: DatePickerCellEditor,
        },
      ],
    },
    {
      headerName: '테스트진행',
      children: [
        {
          headerName: '설계번호',
          field: 'field16',
          width: 90,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellEditor: 'agInputCellEditor',
          cellEditorParams: { values: ['선택', '', ''] },
        },
        {
          headerName: '테스트 결과',
          field: 'field17',
          width: 90,
          editable: true,
          cellClass: 'text-center flex! items-center justify-center!',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: ['선택', '정상', '수납완료', '청약중', '설계중', '보험료계산오류', '환급금오류', '출력물오류', '기타오류'] },
        },
        {
          headerName: '청약서류 검수',
          field: 'field18',
          width: 90,
          editable: false,
          cellClass: 'text-center flex! items-center justify-center!',
          cellRenderer: (params: ICellRendererParams<LTPA360DummyDataRow2>) => (
            <Button
              variant={'text'}
              size={'lg'}
              color={'link'}
              onClick={e => {
                e.stopPropagation();
                if (params.data) {
                  handlePreviewClick(params.data);
                }
              }}
            >
              개발중
            </Button>
          ),
        },
      ]
    },
    {
      headerName: '판매준비 완료여부',
      field: 'field19',
      width: 80,
      editable: true,
      cellClass: 'text-center',
      headerComponent: () => (
        <div className="w-full flex items-center justify-center text-center whitespace-normal leading-5">
          판매준비/<br />완료여부
        </div>
      ),
    },
    {
      headerName: '개정 전 상품코드',
      field: 'field20',
      width: 90,
      editable: true,
      cellClass: 'text-center',
      cellEditor: 'agInputCellEditor',
      headerComponent: () => (
        <div className="w-full flex items-center justify-center text-center whitespace-normal leading-5">
          개정 전/<br />상품코드
        </div>
      ),
    },
    {
      headerName: '개정 전 상품명',
      field: 'field21',
      width: 180,
      editable: true,
      cellEditor: 'agInputCellEditor',
    }
  ];

  // Tab3 AGGrid Column
  const columnDefs3: (ColDef<LTPA360DummyDataRow3>)[] = [
    {
      headerName: '담보코드',
      field: 'field01',
      width: 90,
      // autoHeight: true,
      editable: false,
    },
    {
      headerName: '담보명',
      field: 'field02',
      width: 170,
      editable: true,
      cellClass: 'truncate justify-start!'
    },
    {
      headerName: '면책(일수)',
      field: 'field03',
      width: 80,
      editable: true,
    },
    {
      headerName: '감액(일수)',
      field: 'field04',
      width: 80,
      editable: true,
    },
    {
      headerName: '감액(비율)',
      field: 'field05',
      width: 80,
      editable: true,
    },
    {
      headerName: '면책감액기타',
      field: 'field06',
      width: 140,
      editable: true,
    },
    {
      headerName: '보장내용',
      field: 'field07',
      flex: 1,
      editable: true,
      autoHeight: true,
      cellClass: 'break-all! whitespace-pre-line!',
    },
    {
      headerName: '비고',
      field: 'field08',
      width: 140,
      editable: true,
      cellClass: 'truncate' ,
    },
    {
      headerName: '요청일자',
      field: 'field09',
      width: 100,
      editable: false,
    },
    {
      headerName: '요청자',
      field: 'field10',
      width: 120,
      editable: false,
      cellRenderer: (params: ICellRendererParams<LTPA360DummyDataRow2>) => (
        <Grow className="w-full px-1" >
          <Input aria-label="" value={'박한화'} readOnly />
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon />
          </Button>
        </Grow>
      ),
    },
    {
      headerName: '상품판매일자',
      field: 'field11',
      width: 100,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['선택', '2025-10-13', '2025-10-14'] },
    },
  ]

  // Tab4 AGGrid Column
  const columnDefs4: (ColDef<LTPA360DummyDataRow4>)[] = [
    {
      headerName: '사고담보코드',
      field: 'field01',
      width: 100,
      autoHeight: true,
      editable: true,
    },
    {
      headerName: '사고담보명(100byte초과금지)',
      field: 'field02',
      flex: 1,
      editable: false,
      cellClass: 'truncate'
    },
    {
      headerName: '대유형구분',
      field: 'field03',
      width: 100,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['99:기타', ''] },
    },
    {
      headerName: '보상구분',
      field: 'field04',
      width: 100,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['99:기타', ''] },
    },
    {
      headerName: '표준체사고코드',
      field: 'field05',
      width: 110,
      editable: true,
    },
    {
      headerName: 'SI계수코드(대표)',
      field: 'field06',
      width: 110,
      editable: true,
    },
    {
      headerName: 'SI계수정보',
      field: 'field07',
      width: 110,
      editable: true,
    },
    {
      headerName: '비고',
      field: 'field08',
      width: 110,
      editable: true,
      cellClass: 'truncate' ,
    },
    {
      headerName: '요청일자',
      field: 'field09',
      width: 100,
      editable: false,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['2025-09-11', ''] },
    },
    {
      headerName: '요청자',
      field: 'field10',
      width: 120,
      editable: false,
      cellRenderer: (params: ICellRendererParams<LTPA360DummyDataRow4>) => (
        <Grow className="w-full px-1" >
          <Input aria-label="" width={'100%'} value={'박한화'} readOnly />
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon />
          </Button>
        </Grow>
      ),
    },
    {
      headerName: '상품판매일자',
      field: 'field11',
      width: 100,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['2025-10-13', ''] },
    },
  ]

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '',
    type09: '',
    type10: '',
    type11: '',
    type12: '',
    type13: '',
    type14: '',
    type15: '',
    type16: '',
    type17: '', 
    type18: '',
  });

  return (
    <LayoutMain className="grid grid-rows-[1fr_auto] gap-[1rem]">
      <LayoutMainBody>
        <LayoutScrollWrap>
          <LayoutScrollItem>
            <Gcol className="w-full" placement='ss'>
              <TabPager
                data={tabs}
                active={active}
                setActive={setActive}
                removable={false}
                onRemove={handleRemove}
                visibleCount={10}
                variant="default"
                hasTableBelow={true}
                error={false}
                errorMsg="에러 메시지 예시"
                getValue={tab => String(tab.value)}
                renderTab={tab => <span>{tab.label}</span>}
                renderDropdownItem={false}
              >
                {/* TAB1 */}
                {active === 'tab1' && (
                  <Gcol placement="ss" className="ag-theme-alpine w-full" gap={5}>
                    <Grow className="w-full" variant="box-round" placement={'bwe'}>
                      <FormTable 
                        variant={'none'} 
                        lineTop={false}
                        caption="총괄장표 조회 테이블"
                        cols={['w-[10rem]', 'flex-1']}
                      >
                        <FormRow>
                          <FormCell title={'상품판매일자'}>
                            <NativeSelect
                              aria-label="상품판매일자 선택"
                              width="12rem"
                              value={form.type01}
                              onChange={(e) => setFormField('type01', e.target.value)}
                            >
                              {[
                                { value: 'selection', id: 'type01-1', label: '2025-10-13' },
                                { value: 'selection2', id: 'type01-2', label: '2025-10-13' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      <Grow>
                        <Button color="coolgray" onClick={() => { }} only="default" size="lg" variant="contained">
                            조회
                        </Button>
                        <Button color={'gray'} only={'icon'} size={'lg'} variant={'outlined'} onClick={() => {}} aria-label="새로고침">
                          <ResetIcon />
                        </Button>
                      </Grow>
                    </Grow>
                    <TableFold variant={'accordion'}>
                      <TableFoldHead title="전체현황"/>
                      <TableFoldBody>
                        <Gcol placement="ss" className="w-full" gap={5}>
                          <Grow className="w-full">
                            <div className="ag-theme-alpine w-full">
                              <AgGridReact<LTPA360DummyDataRow1>
                                noRowsOverlayComponent={AgGridEmptyComponent}
                                getRowId={params => String(params.data.id)}
                                rowData={LTPA360DummyData1}
                                columnDefs={columnDefs1}
                                defaultColDef={{ 
                                  sortable: false,
                                  resizable: false,
                                  cellClass: 'text-center p-0! flex',
                                }}
                                singleClickEdit={true}
                                onCellValueChanged={() => {}}
                                domLayout='autoHeight'
                              />
                            </div>
                          </Grow>
                        </Gcol>
                      </TableFoldBody>
                    </TableFold>
                    {/* TAB1_1 */}
                    <TableFold variant={'accordion'}>
                      <TableFoldHead title="세부현황"/>
                      <TableFoldBody>
                        <Gcol placement="ss" className="w-full" gap={5}>
                          <Grow className="w-full">
                            <div className="ag-theme-alpine w-full">
                              <AgGridReact<LTPA360DummyDataRow1_1>
                                noRowsOverlayComponent={AgGridEmptyComponent}
                                getRowId={params => String(params.data.id)}
                                rowData={LTPA360DummyData1_1}
                                columnDefs={columnDefs1_1}
                                defaultColDef={{ 
                                  sortable: false,
                                  resizable: false,
                                  cellClass:"text-center"
                                }}
                                singleClickEdit={true}
                                onCellValueChanged={() => {}}
                                domLayout='autoHeight'
                                selectionColumnDef={{
                                  cellClass: 'text-center p-0!',
                                }}
                              />
                            </div>
                          </Grow>
                        </Gcol>
                      </TableFoldBody>
                    </TableFold>
                  </Gcol>
                )}
                {/* TAB2 */}
                {active === 'tab2' && (
                  <Gcol placement="ss" className="ag-theme-alpine w-full" gap={4}>
                    <TableFold variant={'accordion'}>
                      <TableFoldHead title="입력장표">
                        <Grow className="justify-end" placement='ee'>
                          <Button variant={'outlined'} color={'success'}>
                            엑셀가져오기
                            <FileImportIcon />
                          </Button>
                          <Button color="success" variant="outlined">
                            엑셀내보내기
                            <FileExportIcon />
                          </Button>
                          <Button color="gray" variant="outlined">
                            행추가
                          </Button>
                          <Button color="gray" variant="outlined">
                            행삭제
                          </Button>
                          <Button color="gray" variant="outlined">
                            파일등록
                          </Button>
                          <Button color="gray" variant="outlined">
                            메모
                          </Button>
                        </Grow>
                      </TableFoldHead>
                      <TableFoldBody>
                        <Gcol gap={4}>
                          <Grow className="w-full" variant="box-round" placement={'bwe'}>
                            <FormTable variant={'none'}
                              caption="입력장표 조회 테이블"
                              cols={[
                                'w-[10rem]', 'flex-1',
                                'w-[10rem]', 'flex-1',
                              ]}
                            >
                              <FormRow>
                                <FormCell title={'상품판매일자'}>
                                  <NativeSelect
                                    aria-label="상품판매일자 선택"
                                    width="12rem"
                                    value={form.type02}
                                    onChange={(e) => setFormField('type02', e.target.value)}
                                  >
                                    {[
                                      { value: 'selection', id: 'type02-1', label: '2025-10-13' },
                                      { value: 'selection2', id: 'type02-2', label: '2025-10-14' },
                                    ].map((option) => (
                                      <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                                    ))}
                                  </NativeSelect>
                                </FormCell>
                                <FormCell title={'조회구분'}>
                                  <NativeSelect
                                    aria-label="조회구분 선택"
                                    width="9rem"
                                    value={form.type03}
                                    onChange={(e) => setFormField('type03', e.target.value)}
                                  >
                                    {[
                                      { value: 'selection', id: 'type03-1', label: '상품명' },
                                      { value: 'selection2', id: 'type03-2', label: '상품코드' },
                                    ].map((option) => (
                                      <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                                    ))}
                                  </NativeSelect>
                                  <Input
                                    aria-label=""
                                    width={'12rem'}
                                    size={'sm'}
                                    value={form.type04 || '12345678'}
                                    isFocused
                                    onChange={e => setFormField('type04', e.target.value)}
                                  />
                                  <NativeSelect
                                    aria-label="조회구분 선택"
                                    width="9rem"
                                    size={'md'}
                                    value={form.type05}
                                    onChange={(e) => setFormField('type05', e.target.value)}
                                  >
                                    {[
                                      { value: 'selection', id: 'type05-1', label: '선택' },
                                      { value: 'selection2', id: 'type05-2', label: '담당자' },
                                      { value: 'selection3', id: 'type04-3', label: '담당부서' },
                                    ].map((option) => (
                                      <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                                    ))}
                                  </NativeSelect>
                                  <Input
                                    aria-label=""
                                    width={'12rem'}
                                    size={'sm'}
                                    value={form.type06 || '12345678'}
                                    isFocused
                                    onChange={e => setFormField('type06', e.target.value)}
                                  />
                                  <Button aria-label="검색" variant={'outlined'}  only="icon" size={'md'} color={'gray-light'}>
                                    <SearchIcon color={'var(--color-primary-50)'} />
                                  </Button>
                                  <Input
                                    aria-label=""
                                    width={'15rem'}
                                    size={'sm'}
                                    value={'신부산GA지점'}
                                    readOnly
                                  />
                                </FormCell>
                              </FormRow>
                            </FormTable>
                            <Grow>
                              <Button color="coolgray" onClick={() => { }} only="default" size="lg" variant="contained">
                                  조회
                              </Button>
                              <Button color={'gray'} only={'icon'} size={'lg'} variant={'outlined'} onClick={() => {}} aria-label="새로고침">
                                <ResetIcon />
                              </Button>
                            </Grow>
                          </Grow>
                          <div className="ag-theme-alpine">
                            <AgGridReact<LTPA360DummyDataRow2>
                              noRowsOverlayComponent={AgGridEmptyComponent}
                              getRowId={params => String(params.data.id)}
                              rowData={LTPA360DummyData2}
                              columnDefs={columnDefs2}
                              defaultColDef={{
                                sortable: false,
                                resizable: false,
                                cellClass:"text-center p-0!",
                              }}
                              singleClickEdit={true}
                              onCellValueChanged={() => {}}
                              rowSelection={{
                                mode: 'singleRow',
                                checkboxes: true,
                                enableClickSelection: false,
                              }}
                              selectionColumnDef={{
                                width: 40,
                                pinned: 'left',
                                cellClass: 'text-center p-0!',
                                cellClassRules: {
                                  'pointer-events-none': params => !!params.data?.locked,
                                },
                              }}
                              domLayout='autoHeight'
                            />
                          </div>
                        </Gcol>
                      </TableFoldBody>
                    </TableFold>
                  </Gcol>
                )}
                {/* TAB3 */}
                {active === 'tab3' && (
                  <Gcol placement="ss" className="ag-theme-alpine w-full" gap={4}>
                    <Grow className="w-full" variant="box-round" placement={'bwe'}>
                      <FormTable variant={'none'}
                        caption="사고담보코드 조회 테이블"
                        cols={[
                          'w-[10rem]', 'flex-1',
                          'w-[10rem]', 'flex-1',
                          'w-[10rem]', 'flex-1',
                        ]}
                      >
                        <FormRow>
                          <FormCell title={'상품판매일자'}>
                            <NativeSelect
                              aria-label="상품판매일자 선택"
                              width="12rem"
                              value={form.type07}
                              onChange={(e) => setFormField('type07', e.target.value)}
                            >
                              {[
                                { value: 'selection', id: 'type07-1', label: '2025-10-13' },
                                { value: 'selection2', id: 'type07-2', label: '2025-10-13' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title={'조회구분'}>
                            <NativeSelect
                              aria-label="조회구분 선택"
                              width="17rem"
                              value={form.type08}
                              onChange={(e) => setFormField('type08', e.target.value)}
                            >
                              {[
                                { value: 'selection', id: 'type08-1', label: '선택' },
                                { value: 'selection2', id: 'type08-2', label: '신규' },
                                { value: 'selection3', id: 'type08-3', label: '제도성' },
                                { value: 'selection4', id: 'type08-4', label: '담보일반' },
                                { value: 'selection5', id: 'type08-5', label: '모담보' },
                                { value: 'selection6', id: 'type08-6', label: '독립특약' },
                                { value: 'selection7', id: 'type08-7', label: '판매취소' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                          <FormCell title={'담보구분'}>
                            <NativeSelect
                              aria-label="담보구분 선택"
                              width="15rem"
                              value={form.type09}
                              onChange={(e) => setFormField('type09', e.target.value)}
                            >
                              {[
                                { value: 'selection', id: 'type09-1', label: '담보코드' },
                                { value: 'selection2', id: 'type09-2', label: '담보명' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                            <Input
                              aria-label=""
                              width={'15rem'}
                              value={form.type10 || 'CLA23429'}
                              onChange={e => setFormField('type10', e.target.value)}
                            />
                          </FormCell>
                        </FormRow>
                        <FormRow>
                          <FormCell title={'요청자'}>
                            <Input
                              aria-label=""
                              width={'10rem'}
                              value={form.type11 || '12345678'}
                              onChange={e => setFormField('type11', e.target.value)}
                            />
                            <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                              <SearchIcon color={'var(--color-primary-50)'} />
                            </Button>
                            <Input
                              aria-label=""
                              width={'15rem'}
                              value={'신부산GA지점'}
                              readOnly
                            />
                          </FormCell>
                          <FormCell title={'요청일자'} colSpan={3}>
                            <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-02', to: '2026-03' }} size="lg" width="sm" readOnly />
                            <NativeSelect
                              aria-label="요청일자 선택"
                              width="10rem"
                              value={form.type12}
                              onChange={(e) => setFormField('type12', e.target.value)}
                            >
                              {[
                                { value: 'selection', id: 'type12-1', label: '전체' },
                                { value: 'selection2', id: 'type12-2', label: '' },
                              ].map((option) => (
                                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      <Grow>
                        <Button color="coolgray" onClick={() => { }} only="default" size="lg" variant="contained">
                            조회
                        </Button>
                        <Button color={'gray'} only={'icon'} size={'lg'} variant={'outlined'} onClick={() => {}} aria-label="새로고침">
                          <ResetIcon />
                        </Button>
                      </Grow>
                    </Grow>
                    <Gcol>
                      <Grow className="w-full justify-end">
                        <Button color="success" variant="outlined">
                          엑셀내보내기
                          <FileExportIcon />
                        </Button>
                        <Button color="gray" variant="outlined">
                          초기화
                        </Button>
                        <Button color="gray" variant="outlined">
                          행추가
                        </Button>
                        <Button color="gray" variant="outlined">
                          행삭제
                        </Button>
                      </Grow>
                      <div className="ag-theme-alpine">
                        <AgGridReact<LTPA360DummyDataRow3>
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          getRowId={params => String(params.data.id)}
                          rowData={LTPA360DummyData3}
                          columnDefs={columnDefs3}
                          defaultColDef={{
                            sortable: false,
                            resizable: false,
                            cellClass: 'text-center p-0!',
                          }}
                          singleClickEdit={true}
                          onCellValueChanged={() => {}}
                          rowSelection={{
                            mode: 'singleRow',
                            checkboxes: true,
                            enableClickSelection: false,
                          }}
                          selectionColumnDef={{ headerName: '선택' }}
                          onGridReady={params => {
                            params.api.forEachNode(node => {
                              if (node.data?.isCheck) {
                                node.setSelected(true);
                              }
                            });
                          }}
                          domLayout='autoHeight'
                        />
                      </div>
                    </Gcol>
                  </Gcol>
                )}
                {/* TAB4 */}
                {active === 'tab4' && (
                  <Gcol placement="ss" className="ag-theme-alpine w-full" gap={4}>
                    <Gcol className="w-full gap-[1.2rem]">
                      <Grow className="w-full" variant="box-round" placement={'bwe'}>
                        <FormTable variant={'none'}
                          caption="사고담보코드 조회 테이블"
                          cols={[
                            'w-[10rem]', 'flex-1',
                            'w-[10rem]', 'flex-1',
                            'w-[10rem]', 'flex-1',
                          ]}
                        >
                          <FormRow>
                            <FormCell title={'상품판매일자'}>
                              <NativeSelect
                                aria-label="상품판매일자 선택"
                                width="12rem"
                                value={form.type01}
                                onChange={(e) => setFormField('type01', e.target.value)}
                              >
                                {[
                                  { value: 'selection', id: 'type01-1', label: '2025-10-13' },
                                  { value: 'selection2', id: 'type01-2', label: '2025-10-13' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                            <FormCell title={'조회구분'}>
                              <NativeSelect
                                aria-label="조회구분 선택"
                                width="17rem"
                                value={form.type02}
                                onChange={(e) => setFormField('type02', e.target.value)}
                              >
                                {[
                                  { value: 'selection', id: 'type02-1', label: '선택' },
                                  { value: 'selection2', id: 'type02-2', label: '신규' },
                                  { value: 'selection3', id: 'type02-3', label: '판매취소' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                            <FormCell title={'담보구분'}>
                              <NativeSelect
                                aria-label="담보구분 선택"
                                width="15rem"
                                value={form.type03}
                                onChange={(e) => setFormField('type03', e.target.value)}
                              >
                                {[
                                  { value: 'selection', id: 'type03-1', label: '사고담보명' },
                                  { value: 'selection2', id: 'type03-2', label: '사고담보코드' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                                ))}
                              </NativeSelect>
                              <Input
                                aria-label=""
                                width={'15rem'}
                                value={form.type04 || 'CLA23429'}
                                onChange={e => setFormField('type04', e.target.value)}
                              />
                            </FormCell>
                          </FormRow>
                          <FormRow>
                            <FormCell title={'요청자'}>
                              <Input
                                aria-label=""
                                width={'10rem'}
                                value={form.type05 || '12345678'}
                                onChange={e => setFormField('type05', e.target.value)}
                              />
                              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                                <SearchIcon color={'var(--color-primary-50)'} />
                              </Button>
                              <Input
                                aria-label=""
                                width={'15rem'}
                                value={'신부산GA지점'}
                                readOnly
                              />
                            </FormCell>
                            <FormCell title={'요청일자'} colSpan={3}>
                              <DatePickerInput mode="range" onChange={() => {}} rangeValue={{ from: '2026-02', to: '2026-03' }} size="lg" width="sm"  readOnly />
                              <NativeSelect
                                aria-label="요청일자 선택"
                                width="10rem"
                                value={form.type02}
                                onChange={(e) => setFormField('type02', e.target.value)}
                              >
                                {[
                                  { value: 'selection', id: 'type02-1', label: '전체' },
                                  { value: 'selection2', id: 'type02-2', label: '' },
                                ].map((option) => (
                                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </FormCell>
                          </FormRow>
                        </FormTable>
                        <Grow>
                          <Button color="coolgray" onClick={() => { }} only="default" size="lg" variant="contained">
                              조회
                          </Button>
                          <Button color={'gray'} only={'icon'} size={'lg'} variant={'outlined'} onClick={() => {}} aria-label="새로고침">
                            <ResetIcon />
                          </Button>
                        </Grow>
                      </Grow>
                    </Gcol>
                    <Gcol>
                      <Grow className="w-full justify-end">
                        <Button color="gray" variant="outlined">
                          초기화
                        </Button>
                        <Button color="gray" variant="outlined">
                          행추가
                        </Button>
                        <Button color="gray" variant="outlined">
                          행삭제
                        </Button>
                      </Grow>
                      <Grow className="w-full">
                        <div className="ag-theme-alpine">
                          <AgGridReact<LTPA360DummyDataRow4>
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            getRowId={params => String(params.data.id)}
                            rowData={LTPA360DummyData4}
                            columnDefs={columnDefs4}
                            defaultColDef={{
                              sortable: false,
                              resizable: false,
                              cellClass: 'text-center p-0! ',
                            }}
                            alwaysShowHorizontalScroll={true}
                            singleClickEdit={true}

                            // 체크박스 시
                            rowSelection={{
                              mode: 'multiRow',
                              checkboxes: true,
                              headerCheckbox: true,
                              enableClickSelection: false,
                            }}
                            selectionColumnDef={{ headerName: '' }}
                            onGridReady={params => {
                              params.api.forEachNode(node => {
                                if (node.data?.isCheck) {
                                  node.setSelected(true);
                                }
                              });
                            }}
                            domLayout='autoHeight'
                          />
                        </div>
                      </Grow>
                    </Gcol>
                  </Gcol>
                )}
              </TabPager>
            </Gcol>
          </LayoutScrollItem>
        </LayoutScrollWrap>
      </LayoutMainBody>
      <LayoutMainFoot>
        <MainBottom>
          {active === 'tab1' && (  
            <MainBottomItem>
              <Grow gap={1} placement={'ee'} className="w-full">
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'outlined'}
                  color={'gray'}
                  size={'xl'}
                  onClick={() => console.log('초기화')}
                >
                  초기화
                </Button>
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'outlined'}
                  color={'gray'}
                  size={'xl'}
                  onClick={() => console.log('삭제')}
                >
                  삭제
                </Button>
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'contained'}
                  color={'primary'}
                  size={'xl'}
                  onClick={() => console.log('저장')}
                >
                  저장
                </Button>
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'outlined'}
                  color={'gray-light'}
                  size={'xl'}
                  onClick={() => console.log('닫기')}
                >
                  닫기
                </Button>
              </Grow>
            </MainBottomItem>
          )}
          {active === 'tab2' && (
            <MainBottomItem>
              <Grow gap={1} placement={'ee'} className="w-full">
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'outlined'}
                  color={'gray'}
                  size={'xl'}
                  onClick={() => console.log('초기화')}
                >
                  초기화
                </Button>
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'outlined'}
                  color={'gray'}
                  size={'xl'}
                  onClick={() => console.log('삭제')}
                >
                  삭제
                </Button>
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'contained'}
                  color={'primary'}
                  size={'xl'}
                  onClick={() => console.log('저장')}
                >
                  저장
                </Button>
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'outlined'}
                  color={'gray-light'}
                  size={'xl'}
                  onClick={() => console.log('닫기')}
                >
                  닫기
                </Button>
              </Grow>
            </MainBottomItem>
          )}
          {active === 'tab3' && (
            <MainBottomItem>
              <Grow gap={1} placement={'ee'} className="w-full">
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'contained'}
                  color={'primary'}
                  size={'xl'}
                  onClick={() => console.log('저장')}
                >
                  저장
                </Button>
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'outlined'}
                  color={'gray-light'}
                  size={'xl'}
                  onClick={() => console.log('닫기')}
                >
                  닫기
                </Button>
              </Grow>
            </MainBottomItem>
          )}
          {active === 'tab4' && (
            <MainBottomItem>
              <Grow gap={1} placement={'ee'} className="w-full">
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'contained'}
                  color={'primary'}
                  size={'xl'}
                  onClick={() => console.log('저장')}
                >
                  저장
                </Button>
                <Button
                  type="submit"
                  form={'page2-MainForm'}
                  variant={'outlined'}
                  color={'gray-light'}
                  size={'xl'}
                  onClick={() => console.log('닫기')}
                >
                  닫기
                </Button>
              </Grow>
            </MainBottomItem>
          )}
          
        </MainBottom>
      </LayoutMainFoot>
    </LayoutMain>  

  )
}

