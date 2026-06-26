/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
// M1. 팝업에서 화면으로, 전체 수정
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import {
  AgGridEmptyComponent,
  createCellValueChangedHandler,
  useDynamicColumnWidths,
  createTooltipValueGetter,
} from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';

/**
 * LTPA060 섹션 컴포넌트
 * 자동고지(ICIS/심평원) 질병정보 관리 화면
 * - Tab1: 자동고지(ICIS) - 필수고지/고지확인대상
 * - Tab2: 자동고지(심평원) - 필수고지/고지확인대상
 */

// ===== Tab 정의 =====
type LTPZ060TabType = {
  name: string;
  value: string;
  label: string;
};

const DATA_TABS: LTPZ060TabType[] = [
  {
    name: '자동고지(ICIS)',
    value: 'tab1',
    label: '자동고지(ICIS)',
  },
  {
    name: '자동고지(심평원)',
    value: 'tab2',
    label: '자동고지(심평원)',
  },
];

// ===== 데이터 타입 정의 =====
// 자동고지(ICIS) 테이블 데이터 타입
type DummyDataType = {
  id: number;
  isChecked: boolean;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
};
// 자동고지(심평원) 테이블 데이터 타입
type DummyDataType2 = {
  id: number;
  isChecked: boolean;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
};

// ===== 샘플 데이터 =====
// Tab1: 자동고지(ICIS) 샘플 데이터
const dummyData: DummyDataType[] = [
  {
    id: 1,
    isChecked: true,
    field1: 'S92',
    field2: '발등 골절 발등 골절 발등 골절 발등 골절 발등 골절 발등 골절 발등 골절 발등 골절 발등 골절 발등 골절',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '120',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 2,
    isChecked: false,
    field1: 'M51',
    field2: '추간판장애',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '1000',
    field7: 'N',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 3,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'N',
    field8: '미고지',
    field9: '',
  },
  {
    id: 4,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 5,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '고지',
    field9: '',
  },
  {
    id: 6,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '',
    field7: 'Y',
    field8: '고지',
    field9: '',
  },
];
// Tab2: 자동고지(심평원) 샘플 데이터
const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    isChecked: true,
    field1: 'S92',
    field2: '발등 골절 발등 골절 발등 골절 발등 골절 발등 골절 발등 골절 발등 골절 발등 골절',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '200',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 2,
    isChecked: false,
    field1: 'M51',
    field2: '추간판장애 추간판장애 추간판장애 추간판장애 추간판장애 추간판장애 추간판장애 추간판장애',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '',
    field6: '',
    field7: 'Y',
    field8: '미고지',
    field9: '고지필요',
  },
  {
    id: 3,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '3',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 4,
    isChecked: false,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '3',
    field7: 'Y',
    field8: '미고지',
    field9: '',
  },
  {
    id: 5,
    isChecked: true,
    field1: 'M54',
    field2: '요통',
    field3: '2025-12-01',
    field4: '2021-03-02',
    field5: '22(2025-12-01~2027-12-01)',
    field6: '3',
    field7: 'Y',
    field8: '고지',
    field9: '',
  },
];

// ===== 컴포넌트 시작 =====
export default function Ltpa060Section() {
  // 테이블 데이터 상태 관리
  const [rowData, setRowData] = React.useState<DummyDataType[]>(dummyData);
  const [rowData2] = React.useState<DummyDataType2[]>(dummyData2);
  // 화면 크기에 따라 컬럼 너비를 동적으로 조정
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 에러 행 상태 관리 (체크박스 처리용)
  const setErrorRows = React.useCallback<React.Dispatch<React.SetStateAction<number[]>>>(() => {}, []);

  // ===== ag-Grid 컬럼 정의 =====
  // Tab1: 자동고지(ICIS) 테이블 컬럼
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '대표질병코드',
      field: 'field1',
      width: attributeColumnWidth(90),
    },
    {
      headerName: '질병명',
      field: 'field2',
      flex: 40,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field2' }),
    },
    {
      headerName: '원사고발생일',
      field: 'field3',
      width: attributeColumnWidth(90),
    },
    {
      headerName: '최종사고발생일',
      field: 'field4',
      width: attributeColumnWidth(90),
    },
    {
      headerName: '입원',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(180),
    },
    {
      headerName: '통원',
      field: 'field6',
      width: attributeColumnWidth(50),
    },
    {
      headerName: '수술',
      field: 'field7',
      width: attributeColumnWidth(50),
    },
    {
      headerName: '고지여부',
      field: 'field8',
      width: attributeColumnWidth(60),
    },
    {
      headerName: '체크',
      field: 'field9',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellRenderer: (params: { data: DummyDataType }) => (
        <Gcol placement="cc" className="h-full">
          <Typo tag={'span'} variant={'body-md'} className="text-[#006ff2]">
            {params.data.field9}
          </Typo>
        </Gcol>
      ),
    },
  ];

  // Tab2: 자동고지(심평원) 테이블 컬럼
  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '대표질병코드',
      field: 'field1',
      width: attributeColumnWidth(90),
    },
    {
      headerName: '질병명',
      field: 'field2',
      flex: 40,
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field2' }),
    },
    {
      headerName: '원사고발생일',
      field: 'field3',
      width: attributeColumnWidth(90),
    },
    {
      headerName: '최종사고발생일',
      field: 'field4',
      width: attributeColumnWidth(90),
    },
    {
      headerName: '입원',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(180),
    },
    {
      headerName: '통원',
      field: 'field6',
      width: attributeColumnWidth(50),
    },
    {
      // 수술 여부
      headerName: '수술',
      field: 'field7',
      width: attributeColumnWidth(50),
    },
    {
      headerName: '고지여부',
      field: 'field8',
      width: attributeColumnWidth(60),
    },
    {
      headerName: '체크',
      field: 'field9',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      cellRenderer: (params: { data: DummyDataType }) => (
        <Gcol placement="cc" className="h-full">
          <Typo tag={'span'} variant={'body-md'} className="text-[#006ff2]">
            {params.data.field9}
          </Typo>
        </Gcol>
      ),
    },
  ];

  // ===== 셀 값 변경 핸들러 =====
  // 체크박스 변경 시 데이터 업데이트 처리
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isChecked', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  // 탭 상태 관리 (ICIS / 심평원)
  const { tabs, active, setActive } = useTabs(DATA_TABS);

  // ===== 페이지 렌더링 =====
  // LTPA060 자동고지 관리 화면
  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '외부정보클렌징 결과 조회(사고력요약)',
            pageId: 'LTPA060',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          // 탭 페이저: Tab1(ICIS), Tab2(심평원)
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            visibleCount={6}
            variant="default"
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
          >
            {/* ===== Tab1: 자동고지(ICIS) ===== */}
            {active === 'tab1' && (
              <Gcol placement="ss" className="w-full" gap={3}>
                {/* FP정보제공 동의 및 조회 기간 입력 섹션 */}
                <Grow className="w-full" variant="box-round-b">
                  <FormTable variant={'head'} lineTop={false} caption="">
                    <FormRow>
                      <FormCell title={'FP정보제공동의(유효일자)'}>
                        <Input aria-label="FP정보제공동의 유효일자" width={90} value={'2026-03-01'} readOnly />
                      </FormCell>
                      <FormCell title={'전문호출기간'}>
                        <Input aria-label="전문호출기간 시작일" width={90} value={'2026-03-01'} readOnly />-
                        <Input aria-label="전문호출기간 종료일" width={90} value={'2026-03-01'} readOnly />
                      </FormCell>
                      <FormCell title={'최종적재일'}>
                        <Input aria-label="최종적재일" width={90} value={'2026-03-01'} readOnly />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
                <Gcol placement="ss" className="w-full" gap={3}>
                  {/* 펼침메뉴: 필수고지 */}
                  <TableFold>
                    <TableFoldHead title="필수고지" />
                    <TableFoldBody>
                      {/* ag-Grid 테이블: 필수고지 데이터 */}
                      <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                        <AgGridReact<DummyDataType>
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData}
                          columnDefs={columnDefs}
                          selectionColumnDef={{
                            width: 30,
                          }}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          onCellValueChanged={onCellValueChanged}
                          // ag-Grid 기본 설정
                          defaultColDef={{
                            sortable: true, // 컬럼 정렬 가능
                            resizable: true, // 컬럼 너비 조절 가능
                            cellClass: 'text-center', // 중앙 정렬
                          }}
                          // 다중행 선택 모드 (고지 상태 행 제외)
                          rowSelection={{
                            mode: 'multiRow',
                            isRowSelectable: (node) => node.data?.field8 !== '고지', // '고지' 상태 행은 선택 불가
                            checkboxes: true, // 체크박스 표시
                            enableClickSelection: false, // 행 클릭으로 선택 안됨
                          }}
                          // 그리드 초기화 후 체크 상태 복원
                          onGridReady={(params) => {
                            params.api.forEachNode((node) => {
                              if (node.data?.isChecked) {
                                node.setSelected(true);
                              }
                            });
                          }}
                          domLayout="normal"
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                  {/* 펼침메뉴: 고지확인대상 */}
                  <TableFold>
                    <TableFoldHead title="고지확인대상" />
                    <TableFoldBody>
                      {/* ag-Grid 테이블: 고지확인대상 데이터 */}
                      <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                        <AgGridReact<DummyDataType2>
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData2}
                          columnDefs={columnDefs2}
                          selectionColumnDef={{
                            width: 30,
                          }}
                          onCellValueChanged={onCellValueChanged}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                            cellClass: 'text-center',
                          }}
                          rowSelection={{
                            mode: 'multiRow',
                            isRowSelectable: (node) => node.data?.field8 !== '고지',
                            checkboxes: true,
                            enableClickSelection: false,
                          }}
                          onGridReady={(params) => {
                            params.api.forEachNode((node) => {
                              if (node.data?.isChecked) {
                                node.setSelected(true);
                              }
                            });
                          }}
                          tooltipShowMode="whenTruncated"
                          tooltipShowDelay={0}
                          domLayout="normal"
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                </Gcol>
              </Gcol>
            )}
            {/* ===== Tab2: 자동고지(심평원) ===== */}
            {active === 'tab2' && (
              <Gcol placement="ss" className="w-full h-full" gap={3}>
                {/* 정보제공 동의 및 조회 기간 입력 섹션 */}
                <Grow className="w-full" variant="box-round-b">
                  <FormTable variant={'head'} lineTop={false} caption="">
                    <FormRow>
                      <FormCell title={'정보제공동의(유효일자)'}>
                        <Input aria-label="FP정보제공동의 유효일자" width={90} value={'2026-03-01'} readOnly />
                      </FormCell>
                      <FormCell title={'전문호출기간'}>
                        <Input aria-label="전문호출기간 시작일" width={90} value={'2026-03-01'} readOnly />-
                        <Input aria-label="전문호출기간 종료일" width={90} value={'2026-03-01'} readOnly />
                      </FormCell>
                      <FormCell title={'최종적재일'}>
                        <Input aria-label="최종적재일" width={90} value={'2026-03-01'} readOnly />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Grow>
                {/* 펼침메뉴: 필수고지 */}
                <TableFold>
                  <TableFoldHead title="필수고지" />
                  <TableFoldBody>
                    {/* ag-Grid 테이블: 필수고지 데이터 */}
                    <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        selectionColumnDef={{
                          width: 30,
                        }}
                        onCellValueChanged={onCellValueChanged}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                          cellClass: 'text-center',
                        }}
                        rowSelection={{
                          mode: 'multiRow',
                          isRowSelectable: (node) => node.data?.field8 !== '고지',
                          checkboxes: true,
                          enableClickSelection: false,
                        }}
                        onGridReady={(params) => {
                          params.api.forEachNode((node) => {
                            if (node.data?.isChecked) {
                              node.setSelected(true);
                            }
                          });
                        }}
                        domLayout="normal"
                        alwaysShowVerticalScroll={true}
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                {/* 펼침메뉴: 고지확인대상 */}
                <TableFold>
                  <TableFoldHead title="고지확인대상" />
                  <TableFoldBody>
                    {/* ag-Grid 테이블: 고지확인대상 데이터 */}
                    <div className="ag-theme-alpine inner-scroll" data-row={rowData2.length}>
                      <AgGridReact<DummyDataType2>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData2}
                        columnDefs={columnDefs2}
                        selectionColumnDef={{
                          width: 30,
                        }}
                        onCellValueChanged={onCellValueChanged}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                          cellClass: 'text-center',
                        }}
                        rowSelection={{
                          mode: 'multiRow',
                          isRowSelectable: (node) => node.data?.field8 !== '고지',
                          checkboxes: true,
                          enableClickSelection: false,
                        }}
                        onGridReady={(params) => {
                          params.api.forEachNode((node) => {
                            if (node.data?.isChecked) {
                              node.setSelected(true);
                            }
                          });
                        }}
                        domLayout="normal"
                        alwaysShowVerticalScroll={true}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
              </Gcol>
            )}
          </TabPager>
        }
        mainFoot={
          // 하단 버튼: "알릴사항 반영하기"
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1} placement={'ee'} className="w-full">
                <Button type="submit" form={''} variant={'contained'} color={'primary'} size={'xl'}>
                  알릴사항 반영하기
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
