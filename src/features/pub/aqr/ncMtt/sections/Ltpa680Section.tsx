'use client';

import '@/shared/lib/agGridPub';

import { BottomBar } from '@common/BottomBar';

import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';

import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import React, { useState } from 'react';

import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { AgGridEmptyComponent, createTooltipValueGetter } from '@aggrid';

import { Grow, Grid, Gcol, Typo } from '@atoms';
import { Input } from '@uiux/Input';
import { ChevronDownIcon, QuestionMark, SearchIcon } from '@icons';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Tooltip, TooltipTrigger } from '@/shared/components/uiux/Tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { Badge } from '@/shared/components/uiux/Badge';


type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: 'M48.0M48.0M48.0',
    field02: '척추관협착증척추관협착증척추관협착증',
  },
  {
    id: 2,
    field01: 'M48.0',
    field02: '척추만곡증',
  },
  {
    id: 3,
    field01: 'M48.0',
    field02: '척추분리증',
  },

  {
    id: 4,
    field01: 'M48.0',
    field02: '척추전방전위증',
  },

  {
    id: 5,
    field01: 'M48.0',
    field02: '척추증, 척추병증',
  },

  {
    id: 6,
    field01: 'M48.0',
    field02: '강직성척추염',
  },

  {
    id: 7,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  
  {
    id: 8,
    field01: 'M48.0',
    field02: '척추전방전위증',
  },
  
  {
    id: 9,
    field01: 'M48.0',
    field02: '척추증, 척추병증',
  },

  {
    id: 10,
    field01: 'M48.0',
    field02: '강직성척추염',
  },
  {
    id: 11,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 12,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 13,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 14,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 15,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 16,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 17,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 18,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 19,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
  {
    id: 20,
    field01: 'M48.0',
    field02: '염증성척추병증',
  },
];

type DummyDataType2 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    field01: '통합심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 2,
    field01: '간편고지형 상품 심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 3,
    field01: '더건강한 암플랜 심사가이드라인',
    field02: '2026-01-01',
  },
];

type DummyDataType3 = {
  id: number;
  field01: string | number;
  field02: string | number;
};

const DummyData3: DummyDataType3[] = [
  {
    id: 1,
    field01: '통합심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 2,
    field01: '간편고지형 상품 심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 3,
    field01: '더건강한 암플랜 심사가이드라인',
    field02: '2026-01-01',
  },
];

type DummyDataType4 = {
  id: number;
  field01: string | number;
  field02: string | number;
};
const DummyData4: DummyDataType4[] = [
  {
    id: 1,
    field01: '통합심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 2,
    field01: '간편고지형 상품 심사가이드라인',
    field02: '2026-01-01',
  },
  {
    id: 3,
    field01: '더건강한 암플랜 심사가이드라인',
    field02: '2026-01-01',
  },
];

export default function Ltpa680Section() {
  const [searchWord] = useState('척추');
  const [selectedDisease, setSelectedDisease] = useState('');
  
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: 'KCD코드',
      width: 70,
      field: 'field01',
      cellClass: 'text-center px-0!',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
    },
    {
      headerName: '질병명',
      flex: 1,
      field: 'field02',
      cellClass: 'text-left',
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
      // cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
      // if (!params.data) return null;
      // const { field02 } = params.data;
      // const text = String(field02);
      // const parts = text.split(new RegExp(`(${searchWord})`, 'g'));
      // return (
      //   <div className="truncate-no cursor-pointer">
      //     {parts.map((part: string, idx: number) =>
      //       part === searchWord ? (
      //         <b key={idx} style={{ fontWeight: 'bold', color: '#ff5c2e' }}>
      //           {part}
      //         </b>
      //       ) : (
      //         <React.Fragment key={idx}>{part}</React.Fragment>
      //       )
      //     )}
      //   </div>
      // );
      // }
    },
  ];

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      flex: 1,
      field: 'field01',
      cellClass: 'text-left border-r-0!',
    },
    {
      width: 70,
      field: 'field02',
      cellClass: 'text-center px-0!',
    },
  ];

  const columnDefs3: ColDef<DummyDataType3>[] = [
    {
      flex: 1,
      field: 'field01',
      cellClass: 'text-left border-r-0!',
    },
    {
      width: 70,
      field: 'field02',
      cellClass: 'text-center px-0!',
    },
  ];

  const columnDefs4: ColDef<DummyDataType4>[] = [
    {
      flex: 1,
      field: 'field01',
      cellClass: 'text-left border-r-0!',
    },
    {
      width: 70,
      field: 'field02',
      cellClass: 'text-center px-0!',
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  const [rowData2] = React.useState<DummyDataType2[]>(DummyData2);

  const [rowData3] = React.useState<DummyDataType3[]>(DummyData3);

  const [rowData4] = React.useState<DummyDataType4[]>(DummyData4);

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '장기심사가이드',
            pageId: 'LTPA680',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-cols-[24.7rem_1fr] h-full" placement='ss' gap={3}>
            <Grid className='w-full gap-[1.2rem] grid-rows-[1fr_auto]' placement='ss'>
              <Grid className='h-full grid-rows-[auto_1fr]' variant={'box-round'} placement='ss' gap={2}>
                <Grow>
                  <Input width={195} placeholder='병명 또는 코드 입력'/>
                   <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                </Grow>
                <Gcol placement='ss'>
                  {/* 검색결과가 없을때 */}
                  {/* <Typo className='text-center'>심사 기준이 궁금한 질병을<br></br> KCD코드 또는 질병명으로 검색해보세요.</Typo> */}
                  <Grow>
                    <Typo variant={'body-md'}>총</Typo>
                    <Typo variant={'body-md'} weight={'bold'} color={'primary'}>{rowData.length}건</Typo>
                  </Grow>
                  <div className="ag-theme-alpine min-h-144 " >
                    <AgGridReact<DummyDataType>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData}
                      columnDefs={columnDefs}
                      domLayout="normal"
                      tooltipShowDelay={0}
                      tooltipMouseTrack={true}
                    />
                  </div>
                </Gcol>
              </Grid>
              <Gcol className='w-full' placement='ss' gap={2}>
                <Typo variant={'body-lg'} weight={'bold'}>많이 찾는 질병</Typo>
                <Gcol variant={'box-round'} placement={'bwc'}>
                  <RadioGroup
                    className="gap-1"
                    onValueChange={setSelectedDisease}
                    value={selectedDisease}
                    width="full"
                  >
                    {[
                      { value: '대장·직장용종', label: '대장·직장용종' },
                      { value: '척주염좌', label: '척주염좌' },
                      { value: '등통증', label: '등통증' },
                      { value: '후천성 백내장', label: '후천성 백내장' },
                      { value: '열상·표재성손상', label: '열상·표재성손상' },
                      { value: '추간판장애', label: '추간판장애' },
                      { value: '금성 비인두염', label: '금성 비인두염' },
                      { value: '교통사고', label: '교통사고' },
                      { value: '치액/치질', label: '치액/치질' },
                      { value: '자궁근종', label: '자궁근종' },
                    ].map((option) => (
                      <RadioGroupItem key={option.value} value={option.value} color="primary" size="lg" variant="button">
                        {option.label}
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                </Gcol>  
              </Gcol>
            </Grid>
            <Gcol placement='ss'>
              <Grid className='grid-cols-[1fr_1fr_1fr] w-full' placement='ss' gap={3}>
                <Gcol className='w-full' placement='ss'>
                  <Grow className='w-full' placement='bwc'>
                    <Typo variant={'body-lg'} weight={'bold'}>공지사항</Typo>
                    <Button variant={'outlined'} color={'gray'} size={'sm'} >
                      더보기 <ChevronDownIcon size={14} color='#545454' className='-rotate-90' />
                    </Button>  
                  </Grow>
                  <div className="ag-theme-alpine no-header"
                   style={{ borderTop: '0.2rem solid #000' }}
                   >
                    <AgGridReact<DummyDataType2>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData2}
                      columnDefs={columnDefs2}
                      domLayout="autoHeight"
                      headerHeight={0}
                      groupHeaderHeight={0}
                    />
                  </div>
                </Gcol>
                <Gcol>
                  <Grow className='w-full' placement='bwc'>
                    <Typo variant={'body-lg'} weight={'bold'}>상품별 심사가이드라인</Typo>
                    <Button variant={'outlined'} color={'gray'} size={'sm'} >
                      더보기 <ChevronDownIcon size={14} color='#545454' className='-rotate-90' />
                    </Button>  
                  </Grow>
                  <div className="ag-theme-alpine no-header"
                   style={{ borderTop: '0.2rem solid #000' }}
                   >
                    <AgGridReact<DummyDataType3>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData3}
                      columnDefs={columnDefs3}
                      domLayout="autoHeight"
                      headerHeight={0}
                      groupHeaderHeight={0}
                    />
                  </div>
                </Gcol>
                <Gcol>
                  <Grow className='w-full' placement='bwc'>
                    <Typo variant={'body-lg'} weight={'bold'}>UW정보</Typo>
                    <Button variant={'outlined'} color={'gray'} size={'sm'} >
                      더보기 <ChevronDownIcon size={14} color='#545454' className='-rotate-90' />
                    </Button>  
                  </Grow>
                  <div className="ag-theme-alpine no-header"
                   style={{ borderTop: '0.2rem solid #000' }}
                   >
                    <AgGridReact<DummyDataType4>
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      getRowId={(params) => String(params.data.id)}
                      rowData={rowData4}
                      columnDefs={columnDefs4}
                      domLayout="autoHeight"
                      headerHeight={0}
                      groupHeaderHeight={0}
                    />
                  </div>
                </Gcol>
              </Grid>
              <Grid className='w-full' variant={'box-line'} placement='ss' gap={2}>
                {selectedDisease && (
                  <Typo variant={'body-lg'} weight={'bold'} color={'primary'}>{selectedDisease}</Typo>
                )}
                
              </Grid>
            </Gcol>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1}>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  삭제설계 확인
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  출력물
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  완수수납
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  설계비교
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  알림톡발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  셀프고지
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  증권발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  계약자발송
                </Button>
                <Button variant={'outlined'} color={'gray'} size={'xl'}>
                  이미지조회
                </Button>
              </Grow>
              <Grow gap={1}>
                <Button variant={'contained'} size={'xl'} color={'gray-light'}>
                  설계예외처리
                </Button>
                <Button variant={'contained'} size={'xl'} color={'gray-light'}>
                  저장
                </Button>
                <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                  설계삭제
                </Button>
              </Grow>
            </MainBottomItem>
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
