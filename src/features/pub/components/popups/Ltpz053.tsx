'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef, GridApi } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz053 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [form, setFormField] = useFormFields({
    type01: '',
  });
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    field01: string | number;
    field02: string | number;
    field03: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: true, field01: '김한화', field02: '911212-1111111', field03: '010-1234-5678' },
    { id: 2, isCheck: true, field01: '김한화', field02: '911212-1111111', field03: '010-1234-5678' },
    { id: 3, isCheck: true, field01: '김한화', field02: '911212-1111111', field03: '010-1234-5678' },
  ];
  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '고객명',
      width: 100,
      field: 'field01',
      cellClass: 'text-left flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '실명증표진위여부 확인서',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '타인사망피보험자 동의확인서',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              원클릭스캔
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ053)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwe" className="w-full" variant={'box-round'} gap={5}>
            <FormTable caption="설계번호" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']} variant={'head'}>
              <FormRow>
                <FormCell title={'설계번호'} className="w-full">
                  <Grow>
                    <Input
                      aria-label="설계번호 검색"
                      width={'10rem'}
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                </FormCell>
                <FormCell title={'상품명'} className="w-full">
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">
                    한화 더건강한 한아름종합보험2601
                  </Typo>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <div className="ag-theme-alpine">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={rowData}
              columnDefs={columnDefs}
              noRowsOverlayComponent={AgGridEmptyComponent}
              defaultColDef={{
                sortable: false,
                resizable: false,
              }}
              animateRows={false}
              alwaysShowHorizontalScroll={true}
              rowClassRules={{}}
              domLayout="autoHeight"
              // 체크박스 시
              rowSelection={{
                mode: 'multiRow',
                headerCheckbox: false,
                checkboxes: true,
                enableClickSelection: true,
              }}
              selectionColumnDef={{
                headerName: '선택',
              }}
              onGridReady={(params) => {
                gridApiRef.current = params.api;
                params.api.forEachNode((node) => {
                  if (node.data?.isCheck) {
                    node.setSelected(true);
                  }
                });
              }}
            />
          </div>
          <TableFold variant="accordion">
            <TableFoldHead title="조회항목"></TableFoldHead>
            <TableFoldBody>
              <FormTable
                caption="월클릭스켄"
                cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'구분'} colSpan={5}>
                    <RadioGroup
                      className="gap-2"
                      errorMsg="하나를 선택해주세요."
                      errorPs="bl"
                      onValueChange={() => {}}
                      width="full"
                    >
                      <RadioGroupItem color="primary" id="d1" size="lg" value="option1" variant="default">
                        주민등록증
                      </RadioGroupItem>
                      <RadioGroupItem color="primary" id="d2" size="lg" value="option2" variant="default">
                        운전면허증
                      </RadioGroupItem>
                      <RadioGroupItem color="primary" id="d3" size="lg" value="option3" variant="default">
                        외국인등록증
                      </RadioGroupItem>
                      <RadioGroupItem color="primary" id="d4" size="lg" value="option4" variant="default">
                        사업자등록번호
                      </RadioGroupItem>
                    </RadioGroup>
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'취급자 연락처'}>
                    <Input aria-label="" width={'16rem'} value={'12345678'} required readOnly />
                  </FormCell>
                  <FormCell title={'주민등록번호'}>
                    <Input aria-label="" width={'16rem'} value={'12345678'} required readOnly />
                  </FormCell>
                  <FormCell title={'발급일자'}>
                    <Input aria-label="" width={'16rem'} value={'12345678'} required readOnly />
                    <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                      신원확인
                    </Button>
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>
          <TableFold variant="accordion">
            <TableFoldHead title="신원확인결과"></TableFoldHead>
            <TableFoldBody>
              <FormTable caption="월클릭스켄" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}>
                <FormRow>
                  <FormCell title={'진위여부'}>
                    <Input aria-label="" width={'16rem'} value={'12345678'} readOnly />
                  </FormCell>
                  <FormCell title={'사유'}>
                    <Input aria-label="" width={'30rem'} value={'12345678'} readOnly />
                    <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                      확인서발행
                    </Button>
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                이미지조회
              </Button>
            </Grow>
            <Grow>
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

export default LTPZ053;
