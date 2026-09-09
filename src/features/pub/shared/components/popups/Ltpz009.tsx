/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import { toast } from '@uiux/Sonner';
import { Textarea } from '@uiux/Textarea';

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
    field1: '2024-11-05',
    field2: '12345',
    field3: '홍길동',
    field4: 'OO지점',
    field5: '메모 내용입니다.',
    field6: false,
  },
  {
    id: 2,
    field1: '2024-11-05',
    field2: '12345',
    field3: '홍길동',
    field4: 'OO지점',
    field5: '메모 내용입니다.',
    field6: false,
  },
  {
    id: 3,
    field1: '2024-11-05',
    field2: '12345',
    field3: '홍길동',
    field4: 'OO지점',
    field5: '메모 내용입니다.',
    field6: false,
  },
  {
    id: 4,
    field1: '2024-11-05',
    field2: '12345',
    field3: '홍길동',
    field4: 'OO지점',
    field5: '메모 내용입니다.',
    field6: false,
  },
  {
    id: 5,
    field1: '2024-11-05',
    field2: '12345',
    field3: '홍길동',
    field4: 'OO지점',
    field5: '메모 내용입니다.',
    field6: false,
  },
  {
    id: 6,
    field1: '2024-11-05',
    field2: '12345',
    field3: '홍길동',
    field4: 'OO지점',
    field5: '메모 내용입니다.',
    field6: false,
  },
  {
    id: 7,
    field1: '2024-11-05',
    field2: '12345',
    field3: '홍길동',
    field4: 'OO지점',
    field5: '메모 내용입니다.',
    field6: false,
  },
  {
    id: 8,
    field1: '2024-11-05',
    field2: '12345',
    field3: '홍길동',
    field4: 'OO지점',
    field5: '메모 내용입니다.',
    field6: false,
  },
];

const Ltpz009 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [memoContent, setMemoContent] = useState('');

  const showSelectionLimitToast = () => {
    if (memoContent.trim().length > 0) {
      return;
    }

    toast.info('메모 내용을 입력해주세요.', { duration: 3000 });
  };

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '입력일',
      field: 'field1',
      flex: 1,
      minWidth: attributeColumnWidth(90),
    },
    {
      headerName: '입력자사번',
      field: 'field2',
      flex: 1,
      minWidth: attributeColumnWidth(80),
    },
    {
      headerName: '입력자명',
      field: 'field3',
      flex: 1,
      minWidth: attributeColumnWidth(70),
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field3' }),
    },
    {
      headerName: '소속기관',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(150),
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field4' }),
    },
    {
      headerName: '내용',
      field: 'field5',
      cellClass: 'text-left',
      flex: 10,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field5' }),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl" className="ltpz009-popup">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계메모
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ009)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable caption="보험정보" cols={['w-1', 'w-auto']} variant="head">
              <FormRow className="grid grid-cols-[auto_1fr] w-full">
                <FormCell title={'설계번호'}>
                  <Input aria-label="" value={'LA123456789012'} readOnly variant="info" />
                </FormCell>
                <FormCell title={'설계별명'}>
                  <Input
                    width={280}
                    placeholder="한글 20자 이내로 등록가능"
                    value={'가나다라마가나다라마가나다라마가나다라마'}
                  />
                </FormCell>
              </FormRow>
            </FormTable>
            <Grow>
              <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                저장
              </Button>
            </Grow>
          </Grow>

          <Gcol placement={'ss'} className="w-full gap-4">
            <div className="ag-theme-alpine inner-scroll" data-row={dummyData.length}>
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={dummyData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                  cellClass: 'text-center',
                }}
                domLayout="normal"
                tooltipShowMode="whenTruncated"
                tooltipShowDelay={0}
              />
            </div>

            <Gcol placement={'ss'} gap={2} className="w-full [&>div]:w-full">
              <Typo tag={'h3'} variant={'heading-sm'}>
                메모 입력
              </Typo>
              <Textarea
                className="w-full"
                placeholder="제목을 입력해주세요."
                maxLength={4000}
                resize={false}
                value={memoContent}
                onChange={(event) => setMemoContent(event.target.value)}
              />
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
              <Button variant={'contained'} size={'xl'} onClick={showSelectionLimitToast}>
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
