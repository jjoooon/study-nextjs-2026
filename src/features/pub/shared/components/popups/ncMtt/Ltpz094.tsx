/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
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
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';

type DummyDataType = {
  id: number;
  field01: string;
  field02: string;
  field03: string;
  field04: string;
  field05: string;
  field06: string;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '자궁근종',
    field02: '2026-03-01~2026-03-16, 입원(2일)',
    field03:
      '수술/시술(봉합술), 추가질문답변: ①치료내용:하이푸, 색전술, 근종절제, 호르몬치료 등 ②출혈 및 크기변화여부:출혈 및 크기, 갯수 증가 없음 ③잔여병변유무 ④수술 예정:없음',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 2,
    field01: '척추염좌',
    field02: '2026-03-02~2026-03-06, 통원(1일)',
    field03:
      '약물치료(주사,연고,안약 등), 추가질문답변: ①발생부위:경추 ②척추질환(디스크,관절염,척추만곡 등)동반:없음 ③발생원인:교통사고 外원인',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 3,
    field01: '등통증',
    field02: '2026-03-03~2026-03-06, 통원(1일)',
    field03:
      '진단/검사/검진,추가질문답변: ①발생부위:목(경추) ②척추질환(디스크.관절염,척추만곡 등)동반:없음 ③추가검사/수술 예정(필요):없음 ④발생원인:교통사고 外원인',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 4,
    field01: '교통사고(상세불명의 염좌/손상)',
    field02: '2026-03-05~2026-03-17, 통원(2일)',
    field03:
      '진단/검사/검진,추가질문답변: ①동반진단명(염좌, 타박상, 뇌진탕 등):없음 ②영상검사결과(엑스레이, CT, MRI 등):이상소견 없음',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 5,
    field01: '척추 염좌',
    field02: '2026-03-02~2026-03-06, 통원(1일)',
    field03:
      '약물치료(주사,연고,안약 등), 추가질문답변: ①발생부위:경추 ②척추질환(디스크,관절염,척추만곡 등)동반:없음 ③발생원인:교통사고 外원인',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 6,
    field01: '등통증',
    field02: '2026-03-03~2026-03-06, 통원(1일)',
    field03:
      '진단/검사/검진,추가질문답변: ①발생부위:등(경추) ②척추질환(디스크,관절염,척추만곡 등)동반:없음 ③추가검사/수술 예정(필요):없음 ④발생원인:교통사고 外원인',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 7,
    field01: '교통사고(상세불명의 염좌/손상)',
    field02: '2026-03-05~2026-03-17, 통원(2일)',
    field03:
      '진단/검사/검진,추가질문답변: ①동반진단명(염좌, 타박상, 뇌진탕 등):없음 ②영상검사결과(엑스레이, CT, MRI 등):이상소견 없음',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
];

const Ltpz094 = () => {
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '병명',
      field: 'field01',
      width: 150,
      autoHeight: true,
      wrapText: true,
      cellClass: 'text-center !leading-[1.4] !py-1',
      suppressMovable: true,
    },
    {
      headerName: '치료기간',
      field: 'field02',
      width: 200,
      autoHeight: true,
      wrapText: true,
      cellClass: 'text-center !leading-[1.4] !py-1',
      filter: false,
      suppressMovable: true,
    },
    {
      headerName: '치료내용',
      field: 'field03',
      flex: 1,
      autoHeight: true,
      wrapText: true,
      cellClass: 'text-left !leading-[1.4] !py-1',
      suppressMovable: true,
    },
    {
      headerName: '치료병원',
      field: 'field04',
      width: 80,
      autoHeight: true,
      wrapText: true,
      cellClass: 'text-center !leading-[1.4] !py-1',
      filter: false,
      suppressMovable: true,
    },
    {
      headerName: '완치여부',
      field: 'field05',
      width: 80,
      autoHeight: true,
      cellClass: 'text-center',
      suppressMovable: true,
    },
    {
      headerName: '재발유무',
      field: 'field06',
      width: 80,
      autoHeight: true,
      cellClass: 'text-center',
      suppressMovable: true,
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              질병 상세내용
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz094)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <div className="ag-theme-alpine w-full min-h-[24.4rem]">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={DummyData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: false,
                resizable: false,
              }}
              enableCellSpan={true}
              domLayout="normal"
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
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

export default Ltpz094;
