'use client';
// 허승하
import * as React from 'react';
import { useRef, useState } from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

import { ResetIcon } from '@icons'
import { Input } from '@uiux/Input';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@uiux/Resizable';

import { AmountUnitInput } from '@features/AmountUnitInput';
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
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux/NativeSelect';
import { useFormFields } from '@/shared/hooks/useFormFields';
ModuleRegistry.registerModules([AllCommunityModule]);


export interface LTPA904PProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LTPA904P = ({ open, onOpenChange }: LTPA904PProps) => {
  type LTPA904TabType = {
    name: string;
    value: string;
    label: string;
  };
  
  const DATA_TABS: LTPA904TabType[] = [
    {
      name: '납입예정',
      value: 'tabs1',
      label: '납입예정',
    },
    {
      name: '담보',
      value: 'tabs2',
      label: '담보',
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
    { id: 1, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 2, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 3, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 4, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
  ];
  
  const insuredListColumnDefs: ColDef<InsuredListRow>[] = [
    { field: 'name', headerName: '성명', flex: 1, cellClass: 'text-center' },
    { field: 'grade', headerName: '급수', width: 120, cellClass: 'text-center' },
    { field: 'gender', headerName: '성별', width: 80, cellClass: 'text-center' },
    { field: 'age', headerName: '연령', width: 80, cellClass: 'text-center' },
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
    type19: '',
    type20: '',
    type21: '',
    type22: '',
    type23: '', 
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>납입예정리스트</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPA904)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          
          <Grow placement='bwe' className="w-full" variant={'box-round'} gap={5}>
            <FormTable caption="증권번호"  variant={'head'}>
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" 
                    width={'14rem'} 
                    value={form.type01} 
                    onChange={e => setFormField('type01', e.target.value)}
                  />
                </FormCell>
                <FormCell title={'발행후변경순번'}>
                  <Input aria-label="" 
                    width={'14rem'} 
                    value={form.type02} 
                    onChange={e => setFormField('type02', e.target.value)} 
                  />
                </FormCell>
                <FormCell title={'증권번호'}>
                  <Input aria-label="" 
                    width={'14rem'} 
                    value={form.type03} 
                    onChange={e => setFormField('type03', e.target.value)} 
                  />
                </FormCell>
                <FormCell title={'시작납입회차'}>
                  <Input aria-label="" 
                    width={'14rem'} 
                    value={form.type04} 
                    onChange={e => setFormField('type04', e.target.value)} 
                  />
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'업무구분1'}>
                  <NativeSelect
                    aria-label="업무구분1 선택"
                    width="14rem"
                    value={form.type05}
                    onChange={(e) => setFormField('type05', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type05-1', label: '(10)가입설계' },
                      { value: 'selection2', id: 'type05-2', label: '(20)변경설계' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                <FormCell title={'업무구분2'}>
                  <NativeSelect
                    aria-label="업무구분2 선택"
                    width="14rem"
                    value={form.type06}
                    onChange={(e) => setFormField('type06', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type06-1', label: '(11)예상만기' },
                      { value: 'selection2', id: 'type06-2', label: '(13)최소최대' },
                      { value: 'selection3', id: 'type06-3', label: '(21)추천' },
                      { value: 'selection4', id: 'type06-4', label: '(12)인수심사' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                <FormCell title={'환급률'}>
                  <Input aria-label="" 
                    width={'14rem'} 
                    value={form.type07} 
                    onChange={e => setFormField('type07', e.target.value)} 
                  />
                  
                </FormCell>
                <FormCell title={'환급금'}>
                  <Input aria-label="" 
                    width={'14rem'} 
                    value={form.type08} 
                    onChange={e => setFormField('type08', e.target.value)}
                  />
                </FormCell>
                <FormCell title={'추천구분'}>
                  <NativeSelect
                    aria-label="추천구분 선택"
                    width="14rem"
                    value={form.type09}
                    onChange={(e) => setFormField('type09', e.target.value)}
                  >
                    {[
                      { value: 'selection', id: 'type09-1', label: '(10)목표환급율' },
                      { value: 'selection2', id: 'type09-2', label: '(01)목표환급율' },
                      { value: 'selection3', id: 'type09-3', label: '(02)목표환급금' },
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
                        <div className="ag-theme-alpine min-h-[18rem]">
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
                              mode: 'singleRow',
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
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={70}>
                   <TableFold variant={'accordion'}>
                      <TableFoldHead title="담보목록"/>
                      <TableFoldBody>
                        <div className="ag-theme-alpine min-h-[18rem]">
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
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <div className="w-full pt-2">
                <Typo variant={'heading-sm'} className="mb-1">재물담보</Typo>
                <div className="ag-theme-alpine min-h-[18rem]">
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

export default LTPA904P;
