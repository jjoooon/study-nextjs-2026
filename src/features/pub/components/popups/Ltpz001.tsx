'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { TreeDataModule } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent } from '@aggrid';
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

ModuleRegistry.registerModules([AllCommunityModule, TreeDataModule]);

export const Ltpz001 = ({ open, onOpenChange }: PopupBaseProps) => {
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
      field1: '가입제안서',
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
      field1: '가입제안서 adddfa',
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

  const handlePreviewClick = (row: DummyDataType) => {
    // TODO: 실제 미리보기 팝업/라우팅 연동
    // eslint-disable-next-line no-console
    console.log('[LTPZ001] 미리보기 클릭', row);
  };

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '미리보기',
      field: 'field2',
      width: 80,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
        <Button
          variant={'text'}
          size={'lg'}
          color={'link'}
          onClick={(e) => {
            e.stopPropagation();
            if (params.data) {
              handlePreviewClick(params.data);
            }
          }}
        >
          미리보기
        </Button>
      ),
    },
    {
      headerName: '출력방식',
      field: 'field3',
      width: 80,
    },
    {
      headerName: '출력여부',
      field: 'field4',
      width: 80,
    },
    {
      headerName: '스캔대상',
      field: 'field5',
      width: 80,
    },
    {
      headerName: '이메일',
      field: 'field6',
      width: 60,
    },
    {
      headerName: '팩스',
      field: 'field7',
      width: 60,
    },
    {
      headerName: '모바일',
      field: 'field8',
      width: 60,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Gcol gap={5} placement={'ss'} className="overflow-y-auto">
            {/* 1 */}
            <Gcol gap={2} placement={'ss'}>
              <Grow variant={'box-info-line'} className="w-full">
                <FormTable variant={'head'} cols={['w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'설계번호'}>
                      <Typo tag={'b'} variant={'body-lg'}>
                        LA26029313558
                      </Typo>
                    </FormCell>
                    <FormCell title={'계약자명'}>
                      <Typo tag={'b'} variant={'body-lg'}>
                        김한화
                      </Typo>
                    </FormCell>
                    <FormCell title={'상품명'}>
                      <Typo tag={'b'} variant={'body-lg'}>
                        한화시그니처여성 건강 보험 3.0 무배당{' '}
                      </Typo>
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
                    sortable: true,
                    resizable: true,
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
                    flex: 1,
                  }}
                  // selection 설정
                  rowSelection={{
                    mode: 'multiRow',
                    groupSelects: 'descendants', // 상위 체크 → 하위 전체 체크 / 하위 하나 해제 → 상위 indeterminate
                    headerCheckbox: true, // 헤더(전체 선택) 체크박스 표시
                    checkboxes: true, // 각 행에 체크박스 표시
                    enableClickSelection: false, // 셀 클릭 시 selection 변경 비활성화(오직 체크박스 클릭만 허용)
                    isRowSelectable: (params) => !params.data?.disabled && !params.data?.allDisabled, // disabled/allDisabled 행은 선택 불가
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
                />
              </div>
            </Gcol>

            {/* 2 */}
            <Gcol gap={2} placement={'ss'}>
              <Grow variant={'box-info-line'} className="w-full">
                <FormTable variant={'head'} cols={['w-1', 'w-1', 'w-1', 'w-1', 'w-1', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'설계번호'}>
                      <Typo tag={'b'} variant={'body-lg'}>
                        LA26029313558
                      </Typo>
                    </FormCell>
                    <FormCell title={'계약자명'}>
                      <Typo tag={'b'} variant={'body-lg'}>
                        김한화
                      </Typo>
                    </FormCell>
                    <FormCell title={'상품명'}>
                      <Typo tag={'b'} variant={'body-lg'}>
                        한화시그니처여성 건강 보험 3.0 무배당{' '}
                      </Typo>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Grow>
              <div className="ag-theme-alpine">
                <AgGridReact<DummyDataType>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    cellClass: 'text-center',
                  }}
                  domLayout="autoHeight"
                  treeData={true}
                  getDataPath={(row) => row.filePath}
                  groupDefaultExpanded={-1}
                  autoGroupColumnDef={{
                    headerName: '출력물',
                    field: 'field1',
                    flex: 1,
                  }}
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
                />
              </div>
            </Gcol>
          </Gcol>

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
              contentClass="overflow-y-auto relative bg-[var(--color-blue-gray-10)]"
              renderTab={(tab) => <span>{tab.label}</span>}
            >
              <Gcol className="h-full absolute px-2.5 py-3" placement={'ss'}>
                {/* 프린트 */}
                {tabActive === 'tab1' && (
                  <Gcol placement={'ss'} gap={4} className="w-full pb-[3.5rem]">
                    <Gcol placement={'ss'} gap={2} className="w-full">
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        인쇄타입
                      </Typo>
                      <RadioGroup className="gap-[1.2rem]">
                        <RadioGroupItem value="단면">단면</RadioGroupItem>
                        <RadioGroupItem value="양면">양면</RadioGroupItem>
                      </RadioGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2} className="w-full">
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        일괄출력
                      </Typo>
                      <CheckboxGroup className="gap-3">
                        <CheckboxGroupItem value="고객용">고객용</CheckboxGroupItem>
                        <CheckboxGroupItem value="회사용">회사용</CheckboxGroupItem>
                      </CheckboxGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2} className="w-full">
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        계약체결동의서 유형
                      </Typo>
                      <CheckboxGroup className="gap-3">
                        <CheckboxGroupItem value="요약">요약</CheckboxGroupItem>
                        <CheckboxGroupItem value="상세">상세</CheckboxGroupItem>
                      </CheckboxGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2} className="w-full">
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        마케팅 동의서 유형
                      </Typo>
                      <RadioGroup className="gap-[1.2rem]">
                        <RadioGroupItem value="요약">요약</RadioGroupItem>
                        <RadioGroupItem value="상세">상세</RadioGroupItem>
                      </RadioGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2} className="w-full">
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
                  </Gcol>
                )}
                {/* 이메일 */}
                {tabActive === 'tab2' && (
                  <Gcol placement={'ss'} gap={4} className="w-full pb-[3.5rem] ">
                    <Gcol placement={'ss'} gap={2} className="w-full">
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        제목
                      </Typo>
                      <Textarea placeholder="제목을 입력해주세요." maxLength={1000} resize={false} />
                    </Gcol>
                    <Gcol placement={'ss'} gap={2} className="w-full">
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        내용
                      </Typo>
                      <Textarea placeholder="내용을 입력해주세요." maxLength={1000} resize={false} />
                    </Gcol>
                    <Gcol placement={'ss'} gap={2} className="w-full">
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
                  </Gcol>
                )}
                {/* 팩스 */}
                {tabActive === 'tab3' && (
                  <Gcol placement={'ss'} gap={4} className="w-full pb-[3.5rem] ">
                    <Gcol placement={'ss'} gap={2} className="w-full">
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
                  </Gcol>
                )}
                {/* 모바일 */}
                {tabActive === 'tab4' && (
                  <Gcol placement={'ss'} gap={4} className="w-full pb-[3.5rem]">
                    <Gcol placement={'ss'} gap={2} className="w-full">
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        전송대상
                      </Typo>
                      <RadioGroup className="gap-[0.6rem] flex flex-col items-start">
                        <RadioGroupItem value="고객(계약자)전송">고객(계약자)전송</RadioGroupItem>
                        <RadioGroupItem value="고객(피보험자)전송">고객(피보험자)전송</RadioGroupItem>
                        <RadioGroupItem value="모집자 전송">모집자 전송</RadioGroupItem>
                        <RadioGroupItem value="접속자(현재 로그인 기준)전송">
                          접속자(현재 로그인 기준)전송
                        </RadioGroupItem>
                      </RadioGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2} className="w-full">
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        전송대상
                      </Typo>
                      <RadioGroup className="gap-[0.6rem] flex flex-col items-start">
                        <RadioGroupItem value="알림톡(실패시 LMS)">알림톡(실패시 LMS)</RadioGroupItem>
                        <RadioGroupItem value="한손愛">한손愛</RadioGroupItem>
                      </RadioGroup>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2} className="w-full">
                      <Typo tag={'h3'} variant={'heading-sm'}>
                        수신자명
                      </Typo>
                      <Grow>
                        <Input value={'홍길동'} readOnly />
                      </Grow>
                    </Gcol>

                    <Gcol placement={'ss'} gap={2} className="w-full">
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
                  </Gcol>
                )}
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
