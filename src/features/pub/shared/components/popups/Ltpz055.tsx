/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';
import '@/shared/lib/agGridPub';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletListItem } from '@common/BulletList';
import { BulletList } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
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
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

type SendRowData = {
  id: string;
  category: string;
  oldPhone: string;
  newPhoneKey: 'number1' | 'number2' | 'number3';
};

const defaultRowData: SendRowData[] = [
  { id: '1', category: '모집자', oldPhone: '010-****-0000', newPhoneKey: 'number1' },
  { id: '2', category: '계약자', oldPhone: '010-****-5678', newPhoneKey: 'number2' },
  { id: '3', category: '피보험자', oldPhone: '010-****-9876', newPhoneKey: 'number3' },
];

const Ltpz055 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [sendType, setSendType] = useState<string>('option1');
  const [number1, setNumber1] = useState<string>('');
  const [number2, setNumber2] = useState<string>('');
  const [number3, setNumber3] = useState<string>('');

  const [rowData] = useState<SendRowData[]>(defaultRowData);

  const SendTypeHeader = () => (
    <RadioGroup className="gap-2 flex justify-center px-2" onValueChange={setSendType} value={sendType} width="full">
      {[
        { value: 'option1', label: '알림톡' },
        { value: 'option2', label: 'LMS' },
      ].map((option) => (
        <RadioGroupItem
          key={option.value}
          color="primary"
          id={option.value}
          size="lg"
          value={option.value}
          variant="default"
        >
          {option.label}
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );

  const columnDefs: ColDef<SendRowData>[] = [
    {
      headerName: '구분',
      field: 'category',
      minWidth: attributeColumnWidth(90),
      flex: 1,
      cellClass: 'text-center bg-[var(--color-gray-5)] font-bold ',
    },
    {
      headerName: '기존발송번호',
      field: 'oldPhone',
      minWidth: attributeColumnWidth(120),
      flex: 1,
      cellClass: 'text-center flex! items-center',
      cellRenderer: (params: ICellRendererParams<SendRowData>) => (
        <Input
          errorMsg="입력은 필수입니다."
          errorPs="bl"
          onChange={() => {}}
          size="md"
          value={params.value || ''}
          variant="default"
          width="full"
          readOnly
        />
      ),
    },
    {
      headerName: '신규발송번호',
      field: 'newPhoneKey',
      minWidth: attributeColumnWidth(120),
      flex: 1,
      cellClass: 'text-center flex! items-center',
      cellRenderer: (params: ICellRendererParams<SendRowData>) => {
        const key = params.data?.newPhoneKey;
        const value = key === 'number1' ? number1 : key === 'number2' ? number2 : number3;
        const setValue = key === 'number1' ? setNumber1 : key === 'number2' ? setNumber2 : setNumber3;

        return (
          <Input
            errorMsg="입력은 필수입니다."
            errorPs="bl"
            onChange={(e) => setValue(e.target.value)}
            size="md"
            value={value}
            variant="default"
            width="full"
          />
        );
      },
    },
    {
      headerComponent: SendTypeHeader,
      flex: 10,
      cellClass: 'text-center flex! items-center justify-center',
      cellRenderer: () => (
        <Button color="secondary" onClick={() => {}} only="default" size="md" variant="outlined">
          발송
        </Button>
      ),
    },
  ];

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              휴대폰 전자서명 알림톡 발송
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ055)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwc" className="w-full" variant={'box-round'}>
            <FormTable caption="보험정보" cols={['w-auto', 'w-auto']} variant="head">
              <FormRow>
                <FormCell title={'발송대상 설계번호'}>
                  <Input value={'LA123456789012'} readOnly variant="info" size="lg" width="full" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol className="gap-2" placement="ss">
            <div className="ag-theme-alpine inner-scroll" data-row={rowData.length}>
              <AgGridReact<SendRowData>
                getRowId={(params) => String(params.data.id)}
                rowData={rowData}
                columnDefs={columnDefs}
                noRowsOverlayComponent={AgGridEmptyComponent}
                defaultColDef={{
                  sortable: false,
                  resizable: true,
                }}
                domLayout="normal"
              />
            </div>
            <Gcol className="w-full" placement="ss" variant="box-info">
              <Typo icon="info" variant="body-sm">
                <b>알림톡/LMS 발송을 위한 팝업 입니다.</b>
              </Typo>
              <BulletList>
                <BulletListItem size="sm">기존 번호로 발송 : 발송버튼 클릭</BulletListItem>
                <BulletListItem size="sm">새로운 번호로 발송 : 신규발송번호 기재 후 발송버튼 클릭</BulletListItem>
              </BulletList>
            </Gcol>
            {/* 2026-05-27 스타일 변경 */}
            <Gcol className="w-full gap-2" placement="ss" variant="box-info">
              <BulletList className="w-full [&>li>div:first-child]:h-full">
                <BulletListItem size="sm">
                  <Grow placement="ss" className="gap-1 flex items-center justify-between">
                    <span className="w-[6.8rem] shrink-0">모집자URL :</span>
                    <Input
                      className="inline-block w-[calc(100%-6rem)]!"
                      readOnly
                      value={'https://hanwha.com/****'}
                      variant="default"
                      size="sm"
                    />
                  </Grow>
                </BulletListItem>
              </BulletList>
              <BulletList className="w-full [&>li>div:first-child]:h-full">
                <BulletListItem size="sm">
                  <Grow placement="ss" className="gap-1 flex items-center justify-between">
                    <span className="w-[6.8rem] shrink-0">계약자URL :</span>
                    <Input
                      className="inline-block w-[calc(100%-6rem)]!"
                      readOnly
                      value={'https://hanwha.com/****'}
                      variant="default"
                      size="sm"
                    />
                  </Grow>
                </BulletListItem>
              </BulletList>
              <BulletList className="w-full [&>li>div:first-child]:h-full">
                <BulletListItem size="sm">
                  <Grow placement="ss" className="gap-1 flex items-center justify-between">
                    <span className="w-[6.8rem] shrink-0">피보험자URL :</span>
                    <Input
                      className="inline-block w-[calc(100%-6rem)]!"
                      readOnly
                      value={'https://hanwha.com/****'}
                      variant="default"
                      size="sm"
                    />
                  </Grow>
                </BulletListItem>
              </BulletList>
            </Gcol>
          </Gcol>
        </DialogSection>
        {/* 2026-05-21 수정 */}
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

export default Ltpz055;
