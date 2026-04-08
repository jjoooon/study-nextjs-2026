'use client';

import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
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

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpz03201 = ({ open, onOpenChange }: PopupBaseProps) => {
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
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '병명',
      field: 'field01',
      width: 150,
      autoHeight: true,
      wrapText: true,
      cellClass: 'whitespace-normal break-words text-center',
      suppressMovable: true,
    },
    {
      headerName: '치료기간',
      field: 'field02',
      width: 200,
      autoHeight: true,
      wrapText: true,
      cellClass: 'whitespace-normal break-words text-center',
      filter: false,
      suppressMovable: true,
    },
    {
      headerName: '치료내용',
      field: 'field03',
      flex: 1,
      autoHeight: true,
      wrapText: true,
      cellClass: 'whitespace-normal break-words text-left leading-5',
      suppressMovable: true,
    },
    {
      headerName: '치료병원',
      field: 'field04',
      width: 80,
      autoHeight: true,
      wrapText: true,
      cellClass: 'whitespace-normal break-words text-center',
      filter: false,
      suppressMovable: true,
    },
    {
      headerName: '완치여부',
      field: 'field05',
      width: 80,
      autoHeight: true,
      suppressMovable: true,
    },
    {
      headerName: '재발유무',
      field: 'field06',
      width: 80,
      autoHeight: true,
      suppressMovable: true,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              질병 상세내용
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz03201)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          {/* 조회 정보 */}
          <Gcol placement="ss" className="w-full" gap={5}>
            <div className="ag-theme-alpine">
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                rowData={DummyData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: false,
                  resizable: false,
                  cellStyle: {
                    whiteSpace: 'normal',
                    overflowWrap: 'anywhere',
                    // lineHeight: '2rem',
                  },
                }}
                enableCellSpan={true}
                domLayout="autoHeight"
                className="text-center"
              />
            </div>
          </Gcol>
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
