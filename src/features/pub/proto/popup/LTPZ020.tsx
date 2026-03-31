'use client';

import * as React from 'react';
import { useRef } from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

import { Input } from '@uiux/Input';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { amountUnitInputCellRenderer, AgGridEmptyComponent } from '@aggrid';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { SearchIcon } from '@/shared/components/icons/CommonIcons';
import { useTabs } from '@/shared/hooks/useTabs';
import { TabPager } from '@/shared/components/common/TabPager';
import { CheckboxGroup, CheckboxGroupItem } from '@/shared/components/uiux/Checkbox';
ModuleRegistry.registerModules([AllCommunityModule]);


export interface LTPZ020PProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LTPZ020P = ({ open, onOpenChange }: LTPZ020PProps) => {
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
  
  
  type InsuredListRow = {
    id: number;
    name: string;
    grade: string;
    choice: string;
    gender: string;
    age: number;
  };
  
  type CoverageListRow = {
    id: number;
    coverageCode: string;
    coverageName: string;
    insurancePeriod: string;
    paymentPeriod: string;
    designCoverageCode: string;
    designCoverageName: string;
  };

  const insuredListData: InsuredListRow[] = [
    { id: 1, choice:'', name: '', grade: '', gender: '', age: 0 },
    { id: 2, choice:'', name: '', grade: '', gender: '', age: 0 },
    { id: 3, choice:'', name: '', grade: '', gender: '', age: 0 },
    { id: 4, choice:'', name: '', grade: '', gender: '', age: 0 },
  ];
  
  const coverageListData: CoverageListRow[] = [
    { id: 1, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 2, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 3, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 4, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
  ];
  
  const insuredListColumnDefs: ColDef<InsuredListRow>[] = [
    { headerName: '선택', field: 'choice', width: 100, cellClass: 'text-center' },
    { headerName: '성명', field: 'name', flex: 1, cellClass: 'text-center' },
    { headerName: '급수', field: 'grade', width: 120, cellClass: 'text-center' },
    { headerName: '성별', field: 'gender', width: 80, cellClass: 'text-center' },
    { headerName: '연령', field: 'age', width: 80, cellClass: 'text-center' },
  ];

  const coverageListColumnDefs: ColDef<CoverageListRow>[] = [
    { headerName: '담보코드', field: 'coverageCode', width: 100, cellClass: 'text-center' },
    { headerName: '담보명', field: 'coverageName', flex: 1 },
    { headerName: '보험기간', field: 'insurancePeriod', width: 100, cellClass: 'text-center' },
    { headerName: '납입기간', field: 'paymentPeriod', width: 100, cellClass: 'text-center' },
    { headerName: '설계담보코드', field: 'designCoverageCode', width: 120, cellClass: 'text-center' },
    { headerName: '설계담보명', field: 'designCoverageName', flex: 1 },
  ];
  
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);
  const [copyValues, setCopyValues] = React.useState<string[]>(['coverage-copy']);
  const [policySearchPart, setPolicySearchPart] = React.useState('');
  const [expectedDelivery, setExpectedDelivery] = React.useState('2026-03');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'h2'} variant={'heading-lg'}>설계복사</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ020)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          <Grow placement='bwc' className="w-full" variant={'box'}>
            <FormTable caption="증권번호" cols={['w-[14rem] min-w-[14rem]', 'w-auto']} variant={'none'}>
              <FormRow>
                <FormCell title={'증권번호'}>
                  <Grow placement='bwc'>
                    <Grow>
                      <Input aria-label="증권번호 검색" width={'10rem'} value={policySearchPart} onChange={(e) => setPolicySearchPart(e.target.value)} />
                      <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                      <Input aria-label="" width={'30rem'} value={'한화 더 건강한 1040종합'} readOnly />
                    </Grow>
                    <Grow>
                      <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">
                        조회
                      </Button>
                    </Grow>
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
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
              <div className="w-full flex gap-2 pt-2">
                <div className="w-[30%]">
                   <TableFold variant={'accordion'}>
                      <TableFoldHead title="피보험자목록">
                      </TableFoldHead>
                      <TableFoldBody>
                        <div className="ag-theme-alpine">
                          <AgGridReact<InsuredListRow>
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={insuredListData}
                            columnDefs={insuredListColumnDefs}
                            defaultColDef={{ sortable: false }}
                            animateRows={false}
                            rowClassRules={{}}
                          />
                        </div>
                      </TableFoldBody>
                    </TableFold>  
                </div>
                <div className="w-[70%]">
                  <TableFold variant={'accordion'}>
                      <TableFoldHead title="담보목록">
                      </TableFoldHead>
                      <TableFoldBody>
                        <div className="ag-theme-alpine">
                          <AgGridReact<CoverageListRow>
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={coverageListData}
                            columnDefs={coverageListColumnDefs}
                            defaultColDef={{ sortable: false }}
                            animateRows={false}
                            rowClassRules={{}}
                          />
                        </div>
                      </TableFoldBody>
                  </TableFold>
                </div>
              </div>
            ) : (
              <div className="w-full pt-2">
                <Typo variant={'heading-sm'} className="mb-1">재물담보</Typo>
                <div className="ag-theme-alpine">
                  <AgGridReact<CoverageListRow>
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={coverageListData}
                    columnDefs={coverageListColumnDefs}
                    defaultColDef={{ sortable: false }}
                    animateRows={false}
                    rowClassRules={{}}
                  />
                </div>
              </div>
            )}
          </TabPager>
        </DialogSection>  
        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <Grow placement={'ee'} gap={2} className="w-full pb-5 px-6">
              <Grow>
                <Button color={'gray'} size={'xl'} variant={'outlined'}>
                  버튼
                </Button>
                <Button variant={'contained'} size={'xl'}>
                  저장
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'} onClick={onOpenChange ? () => onOpenChange(false) : undefined}>
                  닫기
                </Button>
              </Grow>
            </Grow>
            <DialogBottomInfo />
          </Gcol>
        </DialogFooter>
    </DialogContent>
  </Dialog>
  );
};

export default LTPZ020P;
