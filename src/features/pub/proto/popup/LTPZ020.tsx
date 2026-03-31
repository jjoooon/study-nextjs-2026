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
    { id: 1, name: '김한화', grade: '1', gender: '남자', age: 33 },
    { id: 2, name: '', grade: '', gender: '', age: 0 },
    { id: 3, name: '', grade: '', gender: '', age: 0 },
    { id: 4, name: '', grade: '', gender: '', age: 0 },
  ];
  
  const coverageListData: CoverageListRow[] = [
    { id: 1, coverageCode: 'CLA05417', coverageName: '보통약관(화재상해후유장해3)', insurancePeriod: '15년만기', paymentPeriod: '전기납', designCoverageCode: 'CLA05417', designCoverageName: '보통약관(화재상해후유장해)' },
    { id: 2, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 3, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 4, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
  ];
  
  const insuredListColumnDefs: ColDef<InsuredListRow>[] = [
    { field: 'name', headerName: '성명', width: 120, cellClass: 'text-center' },
    { field: 'grade', headerName: '급수', flex: 1,  cellClass: 'text-center' },
    { field: 'gender', headerName: '성별', width: 80, cellClass: 'text-center' },
    { field: 'age', headerName: '연령', width: 80, cellClass: 'text-center' },
  ];

  const coverageListColumnDefs: ColDef<CoverageListRow>[] = [
    { headerName: '담보코드', field: 'coverageCode', width: 80, cellClass: 'text-center' },
    { headerName: '담보명', field: 'coverageName', flex: 1 },
    { headerName: '보험기간', field: 'insurancePeriod', width: 80, cellClass: 'text-center' },
    { headerName: '납입기간', field: 'paymentPeriod', width: 80, cellClass: 'text-center' },
    { headerName: '설계담보코드', field: 'designCoverageCode', width: 100, cellClass: 'text-center' },
    { headerName: '설계담보명', field: 'designCoverageName', flex: 1 },
  ];
  
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);
  const { tabs: subTabs, active: subActive, setActive: setSubActive, handleRemove: handleSubRemove } = useTabs(DATA_SUB_TABS);
  const [copyValues, setCopyValues] = React.useState<string[]>(['coverage-copy']);
  const [policySearchPart, setPolicySearchPart] = React.useState('');
  const [expectedDelivery, setExpectedDelivery] = React.useState('2026-03');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'h2'} variant={'heading-lg'}>설계복사</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ020)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          <Grow placement='bwe' className="w-full" variant={'box-round'} gap={5}>
            <FormTable caption="증권번호" cols={['w-[14rem] min-w-[14rem]', 'w-auto']} variant={'head'}>
              <FormRow>
                <FormCell title={'증권번호'} className='w-full'>
                  <Grow className='w-full'>
                    <Grow>
                      <Input aria-label="증권번호 검색" width={'10rem'} value={policySearchPart} onChange={(e) => setPolicySearchPart(e.target.value)} />
                      <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                      <Input aria-label="" width={'30rem'} value={'한화 더 건강한 1040종합'} readOnly />
                    </Grow>
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
            <Button color="coolgray" onClick={() => { }} only="default" size="lg" variant="outlined" className='-translate-y-[0.4rem]!'>
              조회
            </Button>
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
                <div className="w-[40%]">
                   <TableFold variant={'accordion'}>
                      <TableFoldHead title="피보험자목록">
                      </TableFoldHead>
                      <TableFoldBody>
                        <div className="ag-theme-alpine">
                          <AgGridReact<InsuredListRow>
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
                          />
                        </div>
                      </TableFoldBody>
                    </TableFold>  
                </div>
                <div className="w-[60%]">
                  <TableFold variant={'accordion'}>
                      <TableFoldHead title="담보목록">
                      </TableFoldHead>
                      <TableFoldBody>
                        <div className="ag-theme-alpine">
                          <AgGridReact<CoverageListRow>
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={coverageListData}
                            columnDefs={coverageListColumnDefs}
                            defaultColDef={{ 
                              sortable: false, 
                              resizable: false,
                            }}
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
                  <div className="ag-theme-alpine pt-2">
                    <AgGridReact<CoverageListRow>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={coverageListData}
                      columnDefs={coverageListColumnDefs}
                      defaultColDef={{
                        sortable: false,
                        resizable: false,
                      }}
                      animateRows={false}
                      rowClassRules={{}}
                    />
                  </div>
                </TabPager>
              </div>
            )}
          </TabPager>
        </DialogSection>
        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <Grow placement={'ee'} gap={2} className="w-full pb-5 px-6">
              <Grow>
                <Button variant={'contained'} size={'xl'}>
                  확인
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
