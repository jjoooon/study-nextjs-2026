'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, useToggleTopRows, ToggleTopRow } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { CheckIcon } from '@icons';
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
import { Textarea } from '@uiux/Textarea';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

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

const Ltpz009 = () => {
  const { rowData, toggleById } = useToggleTopRows({
    rows: dummyData,
    idKey: 'id',
    toggleKey: 'field6',
  });

  const columnDefs: ColDef<ToggleTopRow<DummyDataType>>[] = [
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
    {
      headerName: '소속기관',
      field: 'field4',
      width: 150,
    },
    {
      headerName: '내용',
      field: 'field5',
      flex: 1,
    },
    {
      headerName: '노출여부',
      field: 'field6',
      width: 100,
      cellRenderer: (params: ICellRendererParams<ToggleTopRow<DummyDataType>>) => {
        return (
          <Button
            variant={'outlined'}
            className="w-[7rem]"
            color={params.data?.field6 ? 'primary' : 'gray'}
            onClick={(event) => {
              event.stopPropagation();

              if (params.data) {
                toggleById(params.data.id);
              }
            }}
          >
            {params.data?.field6 ? <CheckIcon /> : null}
            {params.data?.field6 ? '노출' : '미노출'}
          </Button>
        );
      },
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계 메모
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ009)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="보험정보" cols={['w-1', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" value={'LA26020945959594'} readOnly variant="info" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <Gcol placement={'ss'} className="w-full gap-4">
            <div className="ag-theme-alpine min-h-[12.4rem]">
              <AgGridReact<ToggleTopRow<DummyDataType>>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                  cellClass: 'text-center',
                }}
                domLayout="normal"
              />
            </div>

            <Gcol placement={'ss'} gap={2} className="w-full [&>div]:w-full">
              <Typo tag={'h3'} variant={'heading-sm'}>
                메모 입력
              </Typo>
              <Textarea className="w-full" placeholder="제목을 입력해주세요." maxLength={4000} resize={false} />
              <Gcol placement={'ss'} variant={'box-warning'}>
                <Typo variant={'body-sm'} icon={'warning'}>
                  정보보안을 위하여 <em>개인정보를 입력할 수 없음.</em> (예: 주민등록번호, 성별, 주소, 휴대폰)
                </Typo>
              </Gcol>
            </Gcol>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                삭제
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                초기화
              </Button>
              <Button variant={'contained'} size={'xl'}>
                저장
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

export default Ltpz009;
