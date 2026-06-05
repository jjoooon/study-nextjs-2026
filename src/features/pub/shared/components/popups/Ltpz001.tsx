/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Divider, Gcol, Grid, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { Textarea } from '@uiux/Textarea';
import type { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';

type DummyDataType = {
  id: number;
  filePath: string[];
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  isCheck: boolean;
  checked?: boolean;
  disabled?: boolean;
  allDisabled?: boolean;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    filePath: ['folderA'],
    field1:
      '가입제안서 가입제안서가입제안서 가입제안서가입제안서 가입제안서가입제안서 가입제안서가입제안서 가입제안서가입제안서 가입제안서가입제안서 가입제안서가입제안서 가입제안서가입제안서 가입제안서가입제안서 가입제안서가입제안서 가입제안서',
    field2: '미리보기',
    field3: '고객용',
    field4: '미출력',
    field5: '비대상',
    field6: 'Y',
    field7: 'Y',
    field8: 'Y',
    isCheck: true,
    checked: false,
    disabled: false,
    allDisabled: false,
  },
  {
    id: 2,
    filePath: ['folderA', 'folderA-1'],
    field1:
      '가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa가입제안서 adddfa',
    field2: '미리보기',
    field3: '고객용',
    field4: '미출력',
    field5: '비대상',
    field6: 'Y',
    field7: 'Y',
    field8: 'Y',
    isCheck: false,
    checked: false,
    disabled: false,
    allDisabled: false,
  },
  {
    id: 3,
    filePath: ['folderB'],
    field1: '장기보험 가입설계서',
    field2: '미리보기',
    field3: '고객용',
    field4: '미출력',
    field5: '비대상',
    field6: 'Y',
    field7: 'Y',
    field8: 'Y',
    isCheck: false,
    checked: false,
    disabled: false,
    allDisabled: false,
  },
  {
    id: 4,
    filePath: ['folderB', 'folderB-1'],
    field1: '장기보험 가입설계서 - 234234',
    field2: '미리보기',
    field3: '고객용',
    field4: '미출력',
    field5: '비대상',
    field6: 'Y',
    field7: 'Y',
    field8: 'Y',
    isCheck: false,
    checked: false,
    disabled: false, // 선택 불가 예시
    allDisabled: false,
  },
  {
    id: 5,
    filePath: ['folderC'],
    field1: '장기보험 가입설계서 - 234234',
    field2: '미리보기',
    field3: '고객용',
    field4: '미출력',
    field5: '비대상',
    field6: 'Y',
    field7: 'Y',
    field8: 'Y',
    isCheck: false,
    checked: false,
    disabled: false,
    allDisabled: false, // 선택 불가 예시
  },
  {
    id: 6,
    filePath: ['folderD'],
    field1: '장기보험 가입설계서 - 234234',
    field2: '미리보기',
    field3: '고객용',
    field4: '미출력',
    field5: '비대상',
    field6: 'Y',
    field7: 'Y',
    field8: 'Y',
    isCheck: false,
    checked: false,
    disabled: false,
    allDisabled: false,
  },
  {
    id: 7,
    filePath: ['folderD', 'folderD-1'],
    field1: '장기보험 가입설계서 - 234234',
    field2: '미리보기',
    field3: '고객용',
    field4: '미출력',
    field5: '비대상',
    field6: 'Y',
    field7: 'Y',
    field8: 'Y',
    isCheck: false,
    checked: false,
    disabled: false,
    allDisabled: false,
  },
];

const Ltpz001 = () => {
  // 2026-05-29 width 수정
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '미리보기',
      field: 'field2',
      minWidth: attributeColumnWidth(60),
      flex: 1,
      cellRenderer: () => (
        <Button variant={'text'} size={'lg'} color={'link'}>
          미리보기
        </Button>
      ),
    },
    {
      headerName: '출력방식',
      field: 'field3',
      minWidth: attributeColumnWidth(60),
      flex: 1,
    },
    {
      headerName: '출력여부',
      field: 'field4',
      minWidth: attributeColumnWidth(60),
      flex: 1,
    },
    {
      headerName: '스캔대상',
      field: 'field5',
      minWidth: attributeColumnWidth(60),
      flex: 1,
    },
    {
      headerName: '이메일',
      field: 'field6',
      minWidth: attributeColumnWidth(50),
      flex: 1,
    },
    {
      headerName: '팩스',
      field: 'field7',
      minWidth: attributeColumnWidth(50),
      flex: 1,
    },
    {
      headerName: '모바일',
      field: 'field8',
      minWidth: attributeColumnWidth(50),
      flex: 1,
    },
  ];

  const [rowData] = useState<DummyDataType[]>(DummyData);
  const [form, setFormField] = useFormFields({
    type01: '',
    emailId: '',
    emailDomain: 'hanhwa.com',
    faxArea: '02',
    faxMiddle: '',
    faxLast: '',
    mobileArea: '010',
    mobileMiddle: '',
    mobileLast: '',
  });
  const [tabActive, setTabActive] = useState('tab1');

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              장기출력물팝업
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ001)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-cols-[1fr_auto]">
          {/* M2. 구조 변경 수정 */}
          <Grid className="grid-rows-[1fr_auto] h-full gap-3">
            <div className=" w-full h-full relative min-h-[30rem] overflow-y-auto ">
              <Gcol gap={5} placement={'ss'} className="absolute">
                {[0, 1].map((idx) => (
                  <Gcol gap={2} placement={'ss'} key={idx}>
                    <Grow variant={'box-info-line'} className="w-full">
                      <FormTable variant={'head'} className="w-full">
                        <FormRow>
                          <FormCell title={'설계번호'}>
                            <Input value={'LA26029313558'} variant="info" readOnly />
                          </FormCell>
                          <FormCell title={'계약자명'}>
                            <Input value={'김한화'} readOnly variant="info" />
                          </FormCell>
                          <FormCell title={'상품명'}>
                            <Input value={'한화시그니처여성 건강 보험 3.0 무배당'} readOnly variant="info" />
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Grow>
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType>
                        // 필수 props
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{
                          cellClass: 'text-center',
                        }}
                        domLayout="autoHeight"
                        // tree data 설정
                        treeData={true}
                        getDataPath={(row) => row.filePath}
                        groupDefaultExpanded={-1}
                        autoGroupColumnDef={{
                          headerName: '출력물',
                          field: 'field1',
                          flex: 10,
                          tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field1' }),
                        }}
                        // selection 설정
                        rowSelection={{
                          mode: 'multiRow',
                          groupSelects: 'descendants',
                          headerCheckbox: true,
                          checkboxes: true,
                          enableClickSelection: false,
                          isRowSelectable: (params) => !params.data?.disabled && !params.data?.allDisabled,
                        }}
                        selectionColumnDef={{
                          width: 30,
                          cellClass: 'text-center editable-cell',
                        }}
                        onGridReady={(params) => {
                          params.api.forEachNode((node) => {
                            if (node.data?.isCheck) {
                              node.setSelected(true);
                            }
                          });
                        }}
                        tooltipShowMode="whenTruncated"
                        tooltipShowDelay={0}
                      />
                    </div>
                  </Gcol>
                ))}
              </Gcol>
            </div>
            <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
              <Typo variant={'body-sm'} icon={'warning'} weight={'bold'}>
                기타 필수 스캔 대상 서류안내
              </Typo>
              <Typo variant={'body-sm'} icon={'dot'}>
                실명증표사본, 실명증표진위여부확인서(법인), 실명증표진위여부확인서(법인대리인), 실소유자확인서류
              </Typo>
            </Gcol>
          </Grid>

          <Grid gap={2} placement={'ss'} className="w-[26.4rem] shrink-0 grid-rows-[auto_1fr] overflow-hidden">
            <Typo tag={'h3'} variant={'heading-lg'}>
              발행방법
            </Typo>
            <TabPager
              data={[
                { value: 'tab1', label: '프린트' },
                { value: 'tab2', label: '이메일' },
                { value: 'tab3', label: '팩스' },
                { value: 'tab4', label: '모바일' },
              ]}
              active={tabActive}
              setActive={setTabActive}
              visibleCount={4}
              getValue={(tab) => String(tab.value)}
              contentClass="overflow-y-auto relative bg-[var(--color-blue-gray-10)] rounded-b-[0.6rem]"
              renderTab={(tab) => <span>{tab.label}</span>}
            >
              <Gcol
                className="h-full absolute px-2.5 py-3  after:[content:''] after:block after:min-h-[0.1rem] after:border after:w-full after:border-[transparent]"
                gap={4}
                placement={'ss'}
              >
                {/* 프린트 */}
                {tabActive === 'tab1' && (
                  <>
                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        인쇄타입
                      </Typo>
                      <RadioGroup defaultValue="단면">
                        {[
                          { value: '단면', label: '단면' },
                          { value: '양면', label: '양면' },
                        ].map((option) => (
                          <RadioGroupItem key={option.value} value={option.value}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        일괄출력
                      </Typo>
                      <CheckboxGroup className="gap-3" defaultValue={['고객용']}>
                        {[
                          { value: '고객용', label: '고객용' },
                          { value: '회사용', label: '회사용' },
                        ].map((option) => (
                          <CheckboxGroupItem key={option.value} value={option.value}>
                            {option.label}
                          </CheckboxGroupItem>
                        ))}
                      </CheckboxGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        계약체결동의서 유형
                      </Typo>
                      <CheckboxGroup className="gap-3" defaultValue={['요약']}>
                        {[
                          { value: '요약', label: '요약' },
                          { value: '상세', label: '상세' },
                        ].map((option) => (
                          <CheckboxGroupItem key={option.value} value={option.value}>
                            {option.label}
                          </CheckboxGroupItem>
                        ))}
                      </CheckboxGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        마케팅 동의서 유형
                      </Typo>
                      <RadioGroup defaultValue="요약">
                        {[
                          { value: '요약', label: '요약' },
                          { value: '상세', label: '상세' },
                        ].map((option) => (
                          <RadioGroupItem key={option.value} value={option.value}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        필수 스캔문서 출력일시
                      </Typo>
                      <BulletList type={'dash'} size={'sm'}>
                        <BulletListItem>
                          상품설명서: 미출력{' '}
                          <Badge color={'red'} className="ml-1">
                            출력필요
                          </Badge>
                        </BulletListItem>
                        <BulletListItem>
                          청약서류: 미출력{' '}
                          <Badge color={'red'} className="ml-1">
                            출력필요
                          </Badge>
                        </BulletListItem>
                        <BulletListItem>
                          계약체결동의서: 출력{' '}
                          <Badge color={'red'} className="ml-1">
                            출력필요
                          </Badge>
                        </BulletListItem>
                        <BulletListItem>고객확인서: 미출력</BulletListItem>
                        <BulletListItem>본인확인서(FATCA/CRS): 미출력</BulletListItem>
                      </BulletList>
                    </Gcol>
                  </>
                )}
                {/* 이메일 */}
                {tabActive === 'tab2' && (
                  <>
                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        제목
                      </Typo>
                      <Textarea placeholder="제목을 입력해주세요." maxLength={1000} resize={false} />
                    </Gcol>
                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        내용
                      </Typo>
                      <Textarea placeholder="내용을 입력해주세요." maxLength={1000} resize={false} />
                    </Gcol>
                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        이메일
                      </Typo>
                      <Grow>
                        <Input
                          placeholder="이메일을 입력해주세요."
                          value={form.emailId}
                          onChange={(e) => setFormField('emailId', e.target.value)}
                        />
                        @
                        <NativeSelect
                          value={form.emailDomain}
                          onChange={(e) => setFormField('emailDomain', e.target.value)}
                        >
                          <NativeSelectOption value="">hanhwa.com</NativeSelectOption>
                          <NativeSelectOption value="gmail.com">gmail.com</NativeSelectOption>
                          <NativeSelectOption value="naver.com">naver.com</NativeSelectOption>
                        </NativeSelect>
                      </Grow>
                    </Gcol>
                    <Divider dir="row" className="w-full" />
                    <Gcol placement={'ss'}>
                      <Typo variant={'body-sm'} icon={'info'}>
                        <b>전송대상 출력물</b>
                      </Typo>
                      <BulletList size={'sm'}>
                        <BulletListItem>
                          LA26022432174_한화 운전자 상해 보험 무배당2601_가입제안서(상품설명요약)
                        </BulletListItem>
                      </BulletList>
                    </Gcol>
                  </>
                )}
                {/* 팩스 */}
                {tabActive === 'tab3' && (
                  <>
                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        팩스번호
                      </Typo>
                      <Grow>
                        <NativeSelect value={form.faxArea} onChange={(e) => setFormField('faxArea', e.target.value)}>
                          <NativeSelectOption value="">02</NativeSelectOption>
                          <NativeSelectOption value="031">031</NativeSelectOption>
                          <NativeSelectOption value="051">051</NativeSelectOption>
                        </NativeSelect>
                        -
                        <Input
                          maxLength={4}
                          value={form.faxMiddle}
                          onChange={(e) => setFormField('faxMiddle', e.target.value)}
                        />
                        -
                        <Input
                          maxLength={4}
                          value={form.faxLast}
                          onChange={(e) => setFormField('faxLast', e.target.value)}
                        />
                      </Grow>
                    </Gcol>
                    <Divider dir="row" className="w-full" />
                    <Gcol placement={'ss'}>
                      <Typo variant={'body-sm'} icon={'info'}>
                        <b>전송대상 출력물</b>
                      </Typo>
                      <BulletList size={'sm'}>
                        <BulletListItem>
                          LA26022432174_한화 운전자 상해 보험 무배당2601_가입제안서(상품설명요약)
                        </BulletListItem>
                      </BulletList>
                    </Gcol>
                  </>
                )}
                {/* 모바일 */}
                {tabActive === 'tab4' && (
                  <>
                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        전송대상
                      </Typo>
                      <RadioGroup className="gap-[0.6rem] flex flex-col items-start" defaultValue="고객(계약자)전송">
                        {[
                          { value: '고객(계약자)전송', label: '고객(계약자)전송' },
                          { value: '고객(피보험자)전송', label: '고객(피보험자)전송' },
                          { value: '모집자 전송', label: '모집자 전송' },
                          { value: '접속자(현재 로그인 기준)전송', label: '접속자(현재 로그인 기준)전송' },
                        ].map((option) => (
                          <RadioGroupItem key={option.value} value={option.value}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        전송대상
                      </Typo>
                      <RadioGroup className="gap-[0.6rem] flex flex-col items-start" defaultValue="한손愛">
                        {[
                          { value: '알림톡(실패시 LMS)', label: '알림톡(실패시 LMS)' },
                          { value: '한손愛', label: '한손愛' },
                        ].map((option) => (
                          <RadioGroupItem key={option.value} value={option.value}>
                            {option.label}
                          </RadioGroupItem>
                        ))}
                      </RadioGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        수신자명
                      </Typo>
                      <Grow>
                        <Input value={'홍길동'} readOnly />
                      </Grow>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2}>
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        휴대폰번호
                      </Typo>
                      <Grow>
                        <NativeSelect
                          value={form.mobileArea}
                          onChange={(e) => setFormField('mobileArea', e.target.value)}
                        >
                          <NativeSelectOption value="">010</NativeSelectOption>
                          <NativeSelectOption value="011">011</NativeSelectOption>
                          <NativeSelectOption value="016">016</NativeSelectOption>
                        </NativeSelect>
                        -
                        <Input
                          maxLength={4}
                          value={form.mobileMiddle}
                          onChange={(e) => setFormField('mobileMiddle', e.target.value)}
                        />
                        -
                        <Input
                          maxLength={4}
                          value={form.mobileLast}
                          onChange={(e) => setFormField('mobileLast', e.target.value)}
                        />
                      </Grow>
                    </Gcol>
                    <Divider dir="row" className="w-full" />
                    <Gcol placement={'ss'}>
                      <Typo variant={'body-sm'} icon={'info'}>
                        <b>전송대상 출력물</b>
                      </Typo>
                      <BulletList size={'sm'}>
                        <BulletListItem>
                          LA26022432174_한화 운전자 상해 보험 무배당2601_가입제안서(상품설명요약)
                        </BulletListItem>
                      </BulletList>
                    </Gcol>
                  </>
                )}

                {/* 리포트내용선택 */}
                <Divider dir="row" className="w-full" />
                <Gcol placement={'ss'} gap={2}>
                  <Typo tag={'h3'} variant={'heading-sm'}>
                    리포트내용선택
                  </Typo>
                  <CheckboxGroup className="gap-1.5" defaultValue={['']}>
                    {[
                      { value: '설계단계 안내', label: '설계단계 안내' },
                      { value: '고객 및 기계약 요약정보', label: '고객 및 기계약 요약정보' },
                      { value: '설계조건정보', label: '설계조건정보' },
                      { value: '발급서류 및 비발급서류 안내', label: '발급서류 및 비발급서류 안내' },
                      { value: '주요문의 FAQ 요약', label: '주요문의 FAQ 요약' },
                    ].map((option) => (
                      <CheckboxGroupItem key={option.value} value={option.value}>
                        {option.label}
                      </CheckboxGroupItem>
                    ))}
                  </CheckboxGroup>
                </Gcol>
              </Gcol>
            </TabPager>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                양식미리보기
              </Button>
              <Button variant={'contained'} size={'xl'}>
                발행
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

export default Ltpz001;
