'use client';
// 권오택
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { AgGridEmptyComponent, useToggleTopRows } from '@/shared/components/agGridUtils';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Badge } from '@uiux/Badge';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz019 = ({ open, onOpenChange }: PopupBaseProps) => {
  type DummyDataType = {
    id: number;
    field1: string | number;
    field2: string | number;
    field3: string | number;
    field4: string | number;
    field5: string | number;
    field6: boolean;
  };

  const dummyData: DummyDataType[] = [
    {
      id: 1,
      field1: '2026-02-24',
      field2: 80939583,
      field3: '홍길순1',
      field4: '여의도 GA 지점',
      field5: '메모 테스트 글입니다.',
      field6: false,
    },
    {
      id: 2,
      field1: '2026-02-24',
      field2: 80939583,
      field3: '홍길순2',
      field4: '여의도 GA 지점',
      field5: '메모 테스트 글입니다.',
      field6: false,
    },
    {
      id: 3,
      field1: '2026-02-24',
      field2: 80939583,
      field3: '홍길순3',
      field4: '여의도 GA 지점',
      field5: '메모 테스트 글입니다.',
      field6: false,
    },
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '입력일', 
      field: 'field1',
      width: 100,
    },
    {
      headerName: '입력자사번',
      field: 'field2',
      width: 100,
    },
    {
      headerName: '입력자명',
      field: 'field3',
      width: 100,
    },
  ];

  type DummyDataType2 = {
    id: number;
    field1: string | number;
    field2: string | number;
    field3: string | number;
    field4: string | number;
    field5: string | number;
    field6: boolean;
  };

  const dummyData2: DummyDataType2[] = [
    {
      id: 1,
      field1: '2026-02-24',
      field2: 80939583,
      field3: '홍길순1',
      field4: '여의도 GA 지점',
      field5: '메모 테스트 글입니다.',
      field6: false,
    },
    {
      id: 2,
      field1: '2026-02-24',
      field2: 80939583,
      field3: '홍길순2',
      field4: '여의도 GA 지점',
      field5: '메모 테스트 글입니다.',
      field6: false,
    },
    {
      id: 3,
      field1: '2026-02-24',
      field2: 80939583,
      field3: '홍길순3',
      field4: '여의도 GA 지점',
      field5: '메모 테스트 글입니다.',
      field6: false,
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '상', 
      field: 'field1',
      width: 100,
    },
    {
      headerName: '입력자사번',
      field: 'field2',
      width: 100,
    },
    {
      headerName: '입력자명',
      field: 'field3',
      width: 100,
    },
  ];

  type DummyDataType3 = {
    id: number;
    field1: string | number;
    field2: string | number;
    field3: string | number;
    field4: string | number;
    field5: string | number;
    field6: boolean;
  };

  const dummyData3: DummyDataType3[] = [
    {
      id: 1,
      field1: '2026-02-24',
      field2: 80939583,
      field3: '홍길순1',
      field4: '여의도 GA 지점',
      field5: '메모 테스트 글입니다.',
      field6: false,
    },
    {
      id: 2,
      field1: '2026-02-24',
      field2: 80939583,
      field3: '홍길순2',
      field4: '여의도 GA 지점',
      field5: '메모 테스트 글입니다.',
      field6: false,
    },
    {
      id: 3,
      field1: '2026-02-24',
      field2: 80939583,
      field3: '홍길순3',
      field4: '여의도 GA 지점',
      field5: '메모 테스트 글입니다.',
      field6: false,
    },
  ];

  const columnDefs3: ColDef<DummyDataType3>[] = [
    {
      headerName: '입력일', 
      field: 'field1',
      width: 100,
    },
    {
      headerName: '입력자사번',
      field: 'field2',
      width: 100,
    },
    {
      headerName: '입력자명',
      field: 'field3',
      width: 100,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
             다른상품설계
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ019)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="현재 상품" cols={['w-1', 'w-auto','w-1', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'현재 상품'}>
                  <Typo variant={'body-lg'} weight={'bold'}>(LTPZ019)한화 시그니처 여성 건강보험40 2504</Typo>
                </FormCell>
                <FormCell title={'현재 고객'}>
                  <Typo variant={'body-lg'} weight={'bold'}>홍길순 외 0명</Typo>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol placement={'ss'} className="w-full" gap={5}>       
            <Gcol placement={'ss'} className="w-full">
              <Typo variant={'body-lg'} weight={'bold'} className='flex items-center gap-[0.6rem]'>
                <Badge color="secondary" size="md" variant="contained" className='w-[1.8rem] h-[1.8rem]'>1</Badge>
                현재 고객을 대상으로 다른 상품을 설계하시겠어요?
              </Typo>
              <RadioGroup
                className="gap-2 ml-[1rem]"
                errorMsg="하나를 선택해주세요."
                errorPs="bl"
                onValueChange={() => {}}
                width="full"
              >
                <RadioGroupItem
                  color="primary"
                  id="d1"
                  size="lg"
                  value="option1"
                  variant="default"
                >
                  네, 현재 고객으로 상세설계할게요.
                </RadioGroupItem>
                <RadioGroupItem
                  color="primary"
                  id="d2"
                  size="lg"
                  value="option2"
                  variant="default"
                >
                  아니오, 신규 고객으로 간편설계할게요.
                </RadioGroupItem>
              </RadioGroup>
            </Gcol>

            <Gcol placement={'ss'} className="w-full">
              <Typo variant={'body-lg'} weight={'bold'} className='flex items-center gap-[0.6rem]'>
                <Badge color="secondary" size="md" variant="contained" className='w-[1.8rem] h-[1.8rem]'>2</Badge>
                상품을 선택해주세요.
              </Typo>


              <Grow placement={'ss'} className="w-full gap-6">
                <Grow className='w-full'>
                  <TableFold>
                    <TableFoldHead title="상품정보"></TableFoldHead>
                    <TableFoldBody>
                      <div className="ag-theme-alpine">
                        <AgGridReact<DummyDataType>
                          getRowId={(params) => String(params.data.id)}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          rowData={dummyData}
                          columnDefs={columnDefs}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                          }}
                          domLayout="autoHeight"
                        />
                      </div>
                    </TableFoldBody>
                  </TableFold>
                  <TableFold>
                    <TableFoldHead title="종 정보"></TableFoldHead>
                    <TableFoldBody>
                      <Gcol className='w-full'>
                        <div className="ag-theme-alpine">
                          <AgGridReact<DummyDataType2>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={dummyData2}
                            columnDefs={columnDefs2}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                            }}
                            domLayout="autoHeight"
                          />
                        </div>
                      </Gcol>
                      <Gcol className='w-full'>
                         <div className="ag-theme-alpine">
                          <AgGridReact<DummyDataType3>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={dummyData3}
                            columnDefs={columnDefs3}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                            }}
                            domLayout="autoHeight"
                          />
                        </div>   
                      </Gcol>
                    </TableFoldBody>
                  </TableFold>
                </Grow>
              </Grow>
            </Gcol>

          </Gcol> 
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                 선택
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
