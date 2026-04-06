'use client';

import * as React from 'react';
import { useRef } from 'react';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea, DialogClose } from '@uiux/Dialog';

import { Input } from '@uiux/Input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';


import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { amountUnitInputCellRenderer, AgGridEmptyComponent, createCellValueChangedHandler } from '@/shared/components/agGridUtils';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon, ResetIcon } from '@icons';
import { useTabs } from '@/shared/hooks/useTabs';
import { TabPager } from '@common/TabPager';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import type { PopupBaseProps } from './types';
ModuleRegistry.registerModules([AllCommunityModule]);


export const LTPZ020 = ({ open, onOpenChange }: PopupBaseProps) => {
  type LTPZ020TabType = {
    name: string;
    value: string;
    label: string;
  };
  
  const DATA_TABS: LTPZ020TabType[] = [
    {
      name: '인담보',
      value: 'humanCoverage',
      label: '인담보',
    },
    {
      name: '재물담보',
      value: 'propertyCoverage',
      label: '재물담보',
    },
  ];

  const DATA_SUB_TABS: LTPZ020TabType[] = [
    {
      name: '화재담보',
      value: 'fireCoverage',
      label: '화재담보',
    },
    {
      name: '화재기타',
      value: 'fireEtcCoverage',
      label: '화재기타',
    },
  ];
  
  type InsuredListRow = {
    id: number;
    name: string;
    grade: string;
    gender: string;
    age: number;
  };
  
  //피보험자
  const insuredListData: InsuredListRow[] = [
    { id: 1, name: '김한화', grade: '1', gender: '남자', age: 33 },
    { id: 2, name: '', grade: '', gender: '', age: 0 },
    { id: 3, name: '', grade: '', gender: '', age: 0 },
    { id: 4, name: '', grade: '', gender: '', age: 0 },
  ];
  
  const insuredListColumnDefs: ColDef<InsuredListRow>[] = [
    { field: 'name', headerName: '성명', width: 120, cellClass: 'text-center' },
    { field: 'grade', headerName: '급수', flex: 1,  cellClass: 'text-center' },
    { field: 'gender', headerName: '성별', width: 80, cellClass: 'text-center' },
    { field: 'age', headerName: '연령', width: 80, cellClass: 'text-center' },
  ];
  
  type CoverageListRow = {
    id: number;
    coverageCode: string;
    coverageName: string;
    insurancePeriod: string;
    paymentPeriod: string;
    designCoverageCode: string;
    designCoverageName: string;
  };

  //담보목록
  const coverageListData: CoverageListRow[] = [
    { id: 1, coverageCode: 'CLA05417', coverageName: '보통약관(화재상해후유장해3)', insurancePeriod: '15년만기', paymentPeriod: '전기납', designCoverageCode: 'CLA05417', designCoverageName: '보통약관(화재상해후유장해)' },
    { id: 2, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 3, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 4, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
  ];
  const coverageListColumnDefs: ColDef<CoverageListRow>[] = [
    { headerName: '담보코드', field: 'coverageCode', width: 80, cellClass: 'text-center' },
    { headerName: '담보명', field: 'coverageName', flex: 1 },
    { headerName: '보험기간', field: 'insurancePeriod', width: 80, cellClass: 'text-center' },
    { headerName: '납입기간', field: 'paymentPeriod', width: 80, cellClass: 'text-center' },
    { headerName: '설계담보코드', field: 'designCoverageCode', width: 100, cellClass: 'text-center' },
    { headerName: '설계담보명', field: 'designCoverageName', flex: 1 },
  ];
  
  //목적물 소유자 및 소재지
  type PropertyListRow = {
    isCheck: boolean;
    id: number;
    owner: string;
    ownerNo: string;
    location: string;
    businessType: string;
    appliedRate: string;
    marketCode : string;
    specialBuilding : string;
  };
  const propertyListData: PropertyListRow[] = [
    { isCheck: false, id: 1, owner: '김한화', ownerNo: '901231-1111111', location: '서울시 강남구 역삼동', businessType: '아파트', appliedRate: '아파트', marketCode: '123', specialBuilding: '1231' },
    { isCheck: false, id: 2, owner: '김한화', ownerNo: '901231-1111111', location: '서울시 강남구 역삼동', businessType: '아파트', appliedRate: '아파트', marketCode: '123', specialBuilding: '1231' },
  ];  

  const propertyListDataColumnDefs: ColDef<PropertyListRow>[] = [
    {
      headerName: '순번',
      field: 'id',
      width: 50,
      cellClass: 'text-center',
    },
    {
      headerName: '소유자',
      field: 'owner',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '소유자번호',
      field: 'ownerNo',
      width: 150,
      cellClass: 'text-center',
    },
    { 
      headerName: '소재지',
      field: 'location',
      flex: 1 
    },
    { 
      headerName: '영위업종', 
      field: 'businessType', 
      width: 100, 
      cellClass: 'text-center' },
    { 
      headerName: '적용요율', 
      field: 'appliedRate', 
      width: 100, 
      cellClass: 'text-center' },
    { 
      headerName: '시장코드', 
      field: 'marketCode', 
      width: 100, 
      cellClass: 'text-center' },
    { 
      headerName: '특수건물', 
      field: 'specialBuilding', 
      width: 100, 
      cellClass: 'text-center' },
  ];  


  //소재지 별 건물(수용장소)의 목록
  type BuildingByLocationRow = {
    id: number;
    columnType: string;
    outerWall: string;
    aboveGroundFloors: number;
    belowGroundFloors: number;
    grossFloorArea: number;
    etcStructure: string;
    accommodationPlace: string;
  };

  const buildingByLocationData: BuildingByLocationRow[] = [
    {
      id: 1,
      columnType: '철골철근콘크리트',
      outerWall: '콘크리트벽',
      aboveGroundFloors: 18,
      belowGroundFloors: 3,
      grossFloorArea: 322,
      etcStructure: '철골철근콘크리트',
      accommodationPlace: '02',
    },
     {
      id: 2,
      columnType: '철골철근콘크리트',
      outerWall: '콘크리트벽',
      aboveGroundFloors: 18,
      belowGroundFloors: 3,
      grossFloorArea: 322,
      etcStructure: '철골철근콘크리트',
      accommodationPlace: '02',
    },
     {
      id: 3,
      columnType: '철골철근콘크리트',
      outerWall: '콘크리트벽',
      aboveGroundFloors: 18,
      belowGroundFloors: 3,
      grossFloorArea: 322,
      etcStructure: '철골철근콘크리트',
      accommodationPlace: '02',
    },
     {
      id: 4,
      columnType: '철골철근콘크리트',
      outerWall: '콘크리트벽',
      aboveGroundFloors: 18,
      belowGroundFloors: 3,
      grossFloorArea: 322,
      etcStructure: '철골철근콘크리트',
      accommodationPlace: '02',
    },
  ];

  const buildingByLocationColumnDefs: Array<ColDef<BuildingByLocationRow> | ColGroupDef<BuildingByLocationRow>> = [
    { 
      headerName: '기둥',
      field: 'columnType', 
      flex: 1, 
      cellClass: 'text-center',
    },
    { 
      headerName: '외벽', 
      field: 'outerWall', 
      flex: 1,
      cellClass: 'text-center',
    },
    { 
      headerName: '건물규모', 
      flex: 1,
      cellClass: 'text-center',
      children: [
        { 
          headerName: '지상(층)', 
          field: 'aboveGroundFloors', 
          width: 100, 
          cellClass: 'text-center' 
        },
        { 
          headerName: '지하(층)', 
          field: 'belowGroundFloors', 
          width: 100, 
          cellClass: 'text-center' 
        },
        {
          headerName: '연 면적(㎡)',
          field: 'grossFloorArea',
          width: 120,
          cellClass: 'text-center',
          valueFormatter: (params) => params.value?.toLocaleString() ?? '',
        },
      ]
    },
    { 
      headerName: '기타구조', 
      field: 'etcStructure',
      cellClass: 'text-center border-l border-[#e5e5e5]',
    },
    { 
      headerName: '수용장소',
      field: 'accommodationPlace', 
      width: 200,
      cellClass: 'text-center' },
  ];

  //보험목적물
  type InsuranceObjectRow = {
    id: number;
    category: string;
    grade: string;
    insurancePeriod: string;
    subscriptionAmount: number;
    insuranceObject: string;
    accommodationPlace: string;
  };

  const insuranceObjectData: InsuranceObjectRow[] = [
    {
      id: 1,
      category: '건물(특수)',
      grade: '1급',
      insurancePeriod: '15년만기',
      subscriptionAmount: 999999,
      insuranceObject: '1층 독수리약국 면적 6021㎡',
      accommodationPlace: '02',
    },
  ];

  const insuranceObjectColumnDefs: ColDef<InsuranceObjectRow>[] = [
    { 
      headerName: '구분', 
      field: 'category', 
      width: 140 
    },
    { 
      headerName: '급수',
      field: 'grade', 
      width: 100, 
      cellClass: 'text-center' 
    },
    { 
      headerName: '보험기간', 
      field: 'insurancePeriod', 
      width: 120, 
      cellClass: 'text-center' 
    },
    {
      headerName: '가입금액(원)',
      field: 'subscriptionAmount',
      width: 140,
      cellClass: 'text-right',
      valueFormatter: (params) => params.value?.toLocaleString() ?? '',
    },
    { 
      headerName: '보험목적물', 
      field: 'insuranceObject', 
      flex: 1 
    },
    { 
      headerName: '수용장소', 
      field: 'accommodationPlace', 
      width: 120, 
      cellClass: 'text-center' 
    },
  ];

  //담보 상세 정보
  type CoverageDetailRow = {
    id: number;
    coverageCode: string;
    coverageName: string;
    insuranceStartDate: string;
    insuranceEndDate: string;
    insurancePeriod: string;
    paymentPeriod: string;
    subscriptionAmount: number;
    designCoverageCode: string;
    designCoverageName: string;
  };

  const coverageDetailData: CoverageDetailRow[] = [
    {
      id: 1,
      coverageCode: 'CLA05417',
      coverageName: '보통약관(화재상해후유장해3)',
      insuranceStartDate: '2026-01-01',
      insuranceEndDate: '2041-01-01',
      insurancePeriod: '15년만기',
      paymentPeriod: '전기납',
      subscriptionAmount: 1000000,
      designCoverageCode: 'CLA05417',
      designCoverageName: '보통약관(화재상해후유장해)',
    },
  ];

  const coverageDetailColumnDefs: ColDef<CoverageDetailRow>[] = [
    {
      headerName: '담보명(담보코드)',
      flex: 1,
      cellClass: 'text-left',
      valueGetter: (params) => `${params.data?.coverageName} (${params.data?.coverageCode})`,
    },
    {
      headerName: '보험시기',
      field: 'insuranceStartDate',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '보험종기',
      field: 'insuranceEndDate',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '보험기간',
      field: 'insurancePeriod',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '납입기간',
      field: 'paymentPeriod',
      width: 80,
      cellClass: 'text-center',
    },
    {
      headerName: '가입금액(원)',
      field: 'subscriptionAmount',
      width: 120,
      cellClass: 'text-center',
      valueFormatter: (params) => params.value?.toLocaleString() ?? '',
    },
    {
      headerName: '설계담보코드',
      field: 'designCoverageCode',
      width: 120,
      cellClass: 'text-center',
    },
    {
      headerName: '설계담보명',
      field: 'designCoverageName',
      flex: 1,
      cellClass: 'text-left',
    },
  ];

const [rowData, setRowData] = React.useState<PropertyListRow[]>(propertyListData);
  const [errorRows, setErrorRows] = React.useState<number[]>(
    propertyListData.filter(row => !row.isCheck).map(row => row.id)
  );

  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<PropertyListRow, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);
  const { tabs: subTabs, active: subActive, setActive: setSubActive, handleRemove: handleSubRemove } = useTabs(DATA_SUB_TABS);
  const [copyValues, setCopyValues] = React.useState<string[]>(['coverage-copy']);
  const [policySearchPart, setPolicySearchPart] = React.useState('');
  const [expectedDelivery, setExpectedDelivery] = React.useState('2026-03');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>설계복사</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ020)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          
          <Grow placement='bwe' className="w-full" variant={'box-round'} gap={5}>
            <FormTable caption="증권번호" cols={['w-[14rem]', 'w-auto']} variant={'head'}>
              <FormRow>
                <FormCell title={'증권번호'} className='w-full'>
                  <Grow>
                    <Input aria-label="증권번호 검색" width={'10rem'} value={policySearchPart} onChange={(e) => setPolicySearchPart(e.target.value)} />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={'30rem'} value={'한화 더 건강한 1040종합'} readOnly />
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
            <Grow>
              <Button color="coolgray" onClick={() => { }} only="default" size="lg" variant="contained">
                조회
              </Button>
            </Grow>
          </Grow>

          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            removable={false}
            onRemove={handleRemove}
            visibleCount={4}
            variant="default"
            hasTableBelow={true}
            error={false}
            errorMsg="에러 메시지 예시"
            renderButtons={
              <CheckboxGroup
                className="gap-3"
                color="primary"
                errorMsg="2개 이상 선택해 주세요."
                errorPs="bl"
                minSelected={0}
                onValueChange={setCopyValues}
                size="lg"
                value={copyValues}
                variant="default"
                width="auto"
              >
                <CheckboxGroupItem value="insured-copy" >
                  피보험자복사
                </CheckboxGroupItem>
                <CheckboxGroupItem value="coverage-copy" disabled>
                  담보복사
                </CheckboxGroupItem>
              </CheckboxGroup>
            }
            getValue={tab => String(tab.value)}
            renderTab={tab => <span>{tab.label}</span>}
            renderDropdownItem={false}
          >
            {active === 'humanCoverage' ? (
              <ResizablePanelGroup
                orientation="horizontal"
                className="w-full"
              >
                <ResizablePanel defaultSize={30}>
                  <TableFold variant={'accordion'}>
                      <TableFoldHead title="피보험자목록"/>
                      <TableFoldBody>
                        <div className="ag-theme-alpine">
                          <AgGridReact<InsuredListRow>
                            getRowId={params => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={insuredListData}
                            columnDefs={insuredListColumnDefs}
                             defaultColDef={{ 
                              sortable: false, 
                              resizable: false,
                            }}
                            animateRows={false}
                            rowClassRules={{}}
                            rowSelection={{
                              mode: 'multiRow',
                              checkboxes: true,
                              enableClickSelection: false,
                            }}
                            selectionColumnDef={{
                              headerName: '선택',
                              cellClass: 'text-center editable-cell',
                            }}
                            domLayout={'autoHeight'}
                          />
                        </div>
                      </TableFoldBody>
                    </TableFold>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={70}>
                   <TableFold variant={'accordion'}>
                      <TableFoldHead title="담보목록"/>
                      <TableFoldBody>
                        <div className="ag-theme-alpine">
                          <AgGridReact<CoverageListRow>
                            getRowId={params => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={coverageListData}
                            columnDefs={coverageListColumnDefs}
                            defaultColDef={{ 
                              sortable: false, 
                              resizable: false,
                            }}
                            animateRows={false}
                            rowClassRules={{}}
                            domLayout={'autoHeight'}
                          />
                        </div>
                      </TableFoldBody>
                  </TableFold>
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <Grid className="w-full pt-2 grid-rows-[auto_1fr]" gap={5}>
                <TableFold>
                  <TableFoldHead title="목적물 소유자 및 소재지"/>
                  <TableFoldBody>
                    <div className="ag-theme-alpine">
                      <AgGridReact<PropertyListRow>
                        getRowId={params => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={rowData}
                        columnDefs={propertyListDataColumnDefs}
                        defaultColDef={{ 
                          sortable: false, 
                          resizable: false,
                          cellClass: 'p-0', 
                          cellStyle: { padding: 0 },
                        }}
                        singleClickEdit={true}
                        onCellValueChanged={onCellValueChanged}
                        rowSelection={{
                          mode: 'singleRow',
                          checkboxes: true,
                          enableClickSelection: false,
                        }}
                        selectionColumnDef={{
                          headerName: '선택',
                          cellClass: 'text-center editable-cell',
                        }}
                        domLayout="autoHeight" 
                        onGridReady={(params) => {
                          params.api.forEachNode((node) => {
                            if (node.data?.isCheck) {
                              node.setSelected(true);
                            }
                          });
                        }}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                {/* 소재지별건물(수용장소)의 목록 */}
                {/* 보험목적물 */}
                <TabPager
                  data={subTabs}
                  active={subActive}
                  setActive={setSubActive}
                  removable={false}
                  onRemove={handleSubRemove}
                  visibleCount={4}
                  variant="default"
                  hasTableBelow={true}
                  error={false}
                  errorMsg="에러 메시지 예시"
                  getValue={tab => String(tab.value)}
                  renderTab={tab => <span>{tab.label}</span>}
                  renderDropdownItem={false}
                >
                  {subActive === 'fireCoverage' ? (
                    <Gcol className="pt-2 w-full" placement='ss' gap={2}>
                      <TableFold>
                        <TableFoldHead title="소재지별 건물(수용장소)의 목록" />
                        <TableFoldBody>
                          <div className="ag-theme-alpine">
                            <AgGridReact<BuildingByLocationRow>
                              getRowId={params => String(params.data.id)}
                              noRowsOverlayComponent={AgGridEmptyComponent}
                              rowData={buildingByLocationData}
                              columnDefs={buildingByLocationColumnDefs}
                              defaultColDef={{
                                sortable: false,
                                resizable: false,
                              }}
                              animateRows={false}
                              domLayout='autoHeight'
                            />
                          </div>
                        </TableFoldBody>
                      </TableFold>

                      <TableFold>
                        <TableFoldHead title="보험목적물" />
                        <TableFoldBody>
                          <div className="ag-theme-alpine">
                            <AgGridReact<InsuranceObjectRow>
                              getRowId={params => String(params.data.id)}
                              noRowsOverlayComponent={AgGridEmptyComponent}
                              rowData={insuranceObjectData}
                              columnDefs={insuranceObjectColumnDefs}
                              defaultColDef={{
                                sortable: false,
                                resizable: false,
                              }}
                              animateRows={false}
                              domLayout='autoHeight'
                            />
                          </div>
                        </TableFoldBody>
                      </TableFold>
                    </Gcol>
                  ) : null}
                </TabPager>
              </Grid>
            )}
          </TabPager>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
