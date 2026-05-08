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
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { BulletList, BulletListItem } from '@/shared/components/common/BulletList';

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

const Ltpz006 = () => {
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
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가족연계할인 안내 및 기계약 찾기
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol placement="ss" gap={3}>
            <Typo tag={'strong'}>
              주피보험자의 ‘가족’이 당사 ‘한화 시그니처 여성 건강보험’의 피보험자인 경우 체결완료 계약 또는 체결
              진행중인 설계를 연결하여 할인적용 가능합니다.
            </Typo>
            <BulletList position="col">
              <BulletListItem type="dash">가족의 범위 : 주피보험자의 모(母)</BulletListItem>
              <BulletListItem type="dash">
                제출서류 : 가족관계가 정확히 표기된 주민등록등본 또는 가족관계증명서(태아제외)
              </BulletListItem>
              <BulletListItem type="dash">
                할인 적용가능 상품 (아래 상품명을 포함한 경우 모두 해당) : 한화 시그니처 여성 건강(3종(추가가입용)제외)
                / 한화 다이렉트 시그니처 여성 건강 / 한화 시그니처 여성 3N5 / 한화 시그니처 여성 355
              </BulletListItem>
            </BulletList>
            <Gcol placement={'ss'} variant={'box-detail'}>
              <Typo variant={'body-sm'} icon={'detail'}>
                <b>유의사항</b>
              </Typo>
              <BulletList position="col">
                <BulletListItem before="1." type="symbols">
                  기계약의 상태가 정상이 아닌 경우 청약(수납)완료 불가
                </BulletListItem>
                <BulletListItem before="2." type="symbols">
                  할인관련 자세한 사항은 상품별 사업방법서를 확인 하시기 바랍니다.
                </BulletListItem>
              </BulletList>
            </Gcol>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                체결완료 계약 찾기
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                체결중 설계 찾기
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

export default Ltpz006;
