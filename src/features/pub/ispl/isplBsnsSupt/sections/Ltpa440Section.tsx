/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

// M1. 팝업에서 화면으로 변경

import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useState } from 'react';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { BulletList, BulletListItem } from '@common/BulletList';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { SearchIcon } from '@icons';

import { LayoutHead, LayoutFoot } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import '@/shared/lib/agGridPub';

ModuleRegistry.registerModules([AllCommunityModule]);

type DummyDataType = {
  id: number;
  isCheck: boolean;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
  field6: string | number;
  field7: string | number;
  field8: string | number;
  field9: string | number;
  field10: string | number;
  field11: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: true,
    field1: 'LA260209313558',
    field2: '신부산GA지점',
    field3: '인카금융-다이',
    field4: '김*화',
    field5: '심사완료',
    field6: '한화 시그니처 여성 건강보험3.0 무배당',
    field7: '김*화',
    field8: '2026-07-02',
    field9: '전자서명(휴대폰)',
    field10: 'O',
    field11: '',
  },
  {
    id: 2,
    isCheck: true,
    field1: 'LA260209313558',
    field2: '신부산GA지점',
    field3: '인카금융-다이',
    field4: '김*화',
    field5: '심사완료',
    field6: '한화 시그니처 여성 건강보험3.0 무배당',
    field7: '김*화',
    field8: '2026-07-02',
    field9: '전자서명(휴대폰)',
    field10: '',
    field11: '',
  },
  {
    id: 3,
    isCheck: false,
    field1: 'LA260209313558',
    field2: '신부산GA지점',
    field3: '인카금융-다이',
    field4: '김*화',
    field5: '심사완료',
    field6: '한화 시그니처 여성 건강보험3.0 무배당',
    field7: '김*화',
    field8: '2026-07-02',
    field9: '전자서명(휴대폰)',
    field10: '',
    field11: '이관완료',
  },
  {
    id: 4,
    isCheck: false,
    field1: 'LA260209313558',
    field2: '신부산GA지점',
    field3: '인카금융-다이',
    field4: '김*화',
    field5: '심사완료',
    field6: '한화 시그니처 여성 건강보험3.0 무배당',
    field7: '김*화',
    field8: '2026-07-02',
    field9: '전자서명(휴대폰)',
    field10: '',
    field11: '이관완료',
  },
  {
    id: 5,
    isCheck: false,
    field1: 'LA260209313558',
    field2: '신부산GA지점',
    field3: '인카금융-다이',
    field4: '김*화',
    field5: '심사완료',
    field6: '한화 시그니처 여성 건강보험3.0 무배당',
    field7: '김*화',
    field8: '2026-07-02',
    field9: '전자서명(휴대폰)',
    field10: '',
    field11: '',
  },
  {
    id: 6,
    isCheck: false,
    field1: 'LA260209313558',
    field2: '신부산GA지점',
    field3: '인카금융-다이',
    field4: '김*화',
    field5: '심사완료',
    field6: '한화 시그니처 여성 건강보험3.0 무배당',
    field7: '김*화',
    field8: '2026-07-02',
    field9: '전자서명(휴대폰)',
    field10: '',
    field11: '',
  },
];
export default function Ltpa440Section() {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const [searchCategory, setSearchCategory] = useState('selection');

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '설계번호',
      field: 'field1',
      flex: 2,
      minWidth: attributeColumnWidth(50),
      cellClass: `text-center`,
    },
    {
      headerName: '(변경전)취급지점',
      field: 'field2',
      flex: 2,
      minWidth: attributeColumnWidth(50),
      cellClass: `text-center `,
    },
    {
      headerName: '(변경전)취급직원',
      field: 'field3',
      flex: 2,
      minWidth: attributeColumnWidth(50),
      cellClass: `text-center `,
    },
    {
      headerName: '사용인',
      field: 'field4',
      flex: 1,
      minWidth: attributeColumnWidth(30),
      cellClass: `text-center `,
    },
    {
      headerName: '설계상태',
      field: 'field5',
      flex: 1,
      minWidth: attributeColumnWidth(40),
      cellClass: `text-center`,
    },
    {
      headerName: '상품명',
      field: 'field6',
      flex: 4,
      minWidth: attributeColumnWidth(100),
      cellClass: `text-left`,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field6' }),
    },
    {
      headerName: '계약자',
      field: 'field7',
      flex: 1,
      minWidth: attributeColumnWidth(30),
      cellClass: `text-center`,
    },
    {
      headerName: '설계유효일자',
      field: 'field8',
      flex: 2,
      minWidth: attributeColumnWidth(40),
      cellClass: `text-center`,
    },
    {
      headerName: '서명방법',
      field: 'field9',
      flex: 2,
      minWidth: attributeColumnWidth(40),
      cellClass: `text-center`,
    },
    {
      headerName: '발행여부',
      field: 'field10',
      flex: 1,
      minWidth: attributeColumnWidth(40),
      cellClass: `text-center`,
    },
    {
      headerName: '처리결과',
      field: 'field11',
      flex: 1,
      minWidth: attributeColumnWidth(40),
      cellClass: `text-center`,
    },
  ];

  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '가입설계 이관',
            pageId: 'Ltpa440',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="grid-rows-[auto_1fr]" gap={3}>
            <Grow placement="bwc" className="w-full" variant={'box-round'} gap={6}>
              <FormTable className="flex" variant={'none'} lineTop={false} cols={['w-1', 'w-auto']}>
                <FormRow>
                  <FormCell title={'조회구분'}>
                    <NativeSelect
                      aria-label="설계조직 선택"
                      value={searchCategory}
                      width={100}
                      onChange={(event) => setSearchCategory(event.target.value)}
                      errorMsg={'설계조직을 선택해주세요.'}
                      errorPs={'bl'}
                      error={false}
                      required
                    >
                      {[
                        { value: 'selection1', label: '사용인' },
                        { value: 'selection2', label: '설계번호' },
                      ].map((option) => (
                        <NativeSelectOption key={option.value} value={option.value}>
                          {option.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                    <Input width={'quoteNo'} value={''} />
                    {searchCategory !== 'selection2' && (
                      <>
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input width={'12rem'} value={''} readOnly />
                      </>
                    )}
                  </FormCell>
                </FormRow>
              </FormTable>
              <Grow>
                <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                  조회
                </Button>
              </Grow>
            </Grow>
            <Grid placement="ss" className="w-full grid-rows-[1fr]" gap={3}>
              <div className="ag-theme-alpine inner-scroll" data-row={DummyData.length}>
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  defaultColDef={{ sortable: false }}
                  rowSelection={{
                    mode: 'multiRow',
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  selectionColumnDef={{
                    width: 30,
                    cellClass: 'editable-cell',
                  }}
                  tooltipShowMode="whenTruncated"
                  tooltipShowDelay={0}
                />
              </div>
              <TableFold>
                <TableFoldHead title="이관사항 및 결과"></TableFoldHead>
                <TableFoldBody>
                  <FormTable
                    caption="계약자 관련 정보 입력하세요."
                    cols={['w-[6%]', 'w-[6%]', 'w-auto', 'w-[6%]', 'w-[6%]', 'w-auto', 'w-[6%]', 'w-auto']}
                  >
                    <FormRow>
                      <FormCell title="변경전" titleRowSpan={2} tdNone />
                      <FormCell title="취급지점">
                        <Input width={100} value="" readOnly />
                        <Input width="full" value="" readOnly />
                      </FormCell>
                      <FormCell title="변경후" tdNone />
                      <FormCell title="취급지점" colSpan={1}>
                        <Input width={100} value="1231234" readOnly />
                        <Input width="full" value="" readOnly />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title="취급직원">
                        <Input width={100} value="1231234" readOnly />
                        <Input width="full" value="" readOnly />
                      </FormCell>
                      <FormCell
                        title={
                          <Button variant="outlined" size="sm" color={'gray'} className="w-full">
                            현소속확인
                          </Button>
                        }
                        tdNone
                      />
                      <FormCell title="취급직원">
                        <Input width={100} value="1231234" readOnly />
                        <Input width={'full'} value="" readOnly />
                      </FormCell>
                      <FormCell title="사용인">
                        <Input width={100} value="1231234" readOnly />
                        <Input width={'full'} value="" readOnly />
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
              <Gcol placement={'ss'} variant={'box-info'} className="w-full">
                <Typo variant={'body-md'} icon={'info'}>
                  <b>필수 확인 사항</b>
                </Typo>
                <BulletList color={'info'} size="md">
                  <BulletListItem>
                    청약완료, 수납완료인 건은 설계이관 불가. 그 외의 설계이관 불가한 건은 아래 내용 확인 바랍니다.{' '}
                    <em>(설계수정 또는 설계복사 추천)</em>
                    <BulletListItem before="1." type="symbols">
                      출력물(상품설명서/청약서) 출력 또는 이메일 발행한 경우 : <em>설계수정하여 순번 변경</em>한 이후
                      진행
                    </BulletListItem>
                    <BulletListItem before="2." type="symbols">
                      휴대폰 전자서명 발송한 경우 : <em>발송 취소</em> 후 진행
                    </BulletListItem>
                    <BulletListItem before="3." type="symbols">
                      TM상품의 QA요청 이후의 건 : 모집자 안내 정정 녹취 후 QA재요청 필요 (미러링인 경우, 미러링서식
                      재생성 진행 필요)
                    </BulletListItem>
                  </BulletListItem>
                  <BulletListItem>
                    설계이관 건의 청약 시, <em>최초설계자 확인</em>하시기 바랍니다. (필요 시, 설계복사하여 진행)
                  </BulletListItem>
                </BulletList>
              </Gcol>
            </Grid>
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem>
              <Grow gap={1} placement={'ec'} className="w-full">
                <Button variant={'contained'} color={'primary'} size={'xl'}>
                  설계이관
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
