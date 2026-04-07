'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { TooltipQ } from '@common/TooltipQ';
import { QuestionMark, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import * as React from 'react';
import { useRef } from 'react';
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

import type { PopupBaseProps } from './types';
import { BulletItem } from '@/shared/components/common/BulletList';
import { Badge } from '@/shared/components/uiux/Badge';
import { Input } from '@/shared/components/uiux/Input';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import { Checkbox } from '@uiux/Checkbox';

export const LTPZ031 = ({ open, onOpenChange }: PopupBaseProps) => {
  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '',
    type09: '',
    type10: '',
    type11: '',
    type12: '',
    type13: '',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              질병검색 및 입력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ031)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" placement="ss" gap={5}>
            <Gcol placement="ss" className="w-full" gap={5}>
              <Grow className="w-full" variant="box-round">
                <FormTable caption="설계번호" cols={['w-[14rem]', 'w-auto']} variant="head">
                  <FormRow>
                    <FormCell title={'설계번호'}>
                      <Button
                        color="link"
                        onClick={() => {}}
                        only="default"
                        size="lg"
                        variant="text"
                        value={'LA123123123'}
                      >
                        LA123123123
                      </Button>
                      <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                        <SearchIcon color={'var(--color-primary-50)'} />
                      </Button>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </Grow>

              <Grow placement="bwc" className="w-full">
                <Typo variant={'heading-sm'} className="mb-1">
                  계약정보
                </Typo>
                <Grow>
                  <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                    출생후보험료
                  </Button>
                  <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                    예상환급금조회
                  </Button>
                  <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                    영업수수료
                  </Button>
                </Grow>
              </Grow>
              <FormTable caption="계약정보" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}>
                <FormRow>
                  <FormCell title={'계약자'} colSpan={3}>
                    김한화
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'상품명'} colSpan={3}>
                    한화실손의료보험(갱신형) 무배당2601
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'가입플랜'} colSpan={3}>
                    자유설계
                  </FormCell>
                </FormRow>
                <FormRow>
                  <FormCell title={'보험기간'}>05년 만기</FormCell>
                  <FormCell title={'납입기간'}>월납/전기납</FormCell>
                </FormRow>
              </FormTable>
            </Gcol>

            {/* Tab */}
            <Grow placement="ss" className="w-full" gap={2}>
              <Grow className="w-full">
                {/* 인보험/물보험 TabPager 예시 */}
                <Gcol className="w-full" placement="ss">
                  {(() => {
                    const [tabActive, setTabActive] = React.useState('TAB1');
                    const tabData = [
                      { label: '척추염좌', value: 'TAB1' },
                      { label: '자궁근종', value: 'TAB2' },
                      { label: '대장직장용종', value: 'TAB3' },
                      { label: '추간판장애', value: 'TAB4' },
                      { label: '어깨병변', value: 'TAB5' },
                    ];
                    return (
                      <TabPager
                        data={tabData}
                        active={tabActive}
                        setActive={setTabActive}
                        getValue={(tab) => tab.value}
                        renderTab={(tab) => <span>{tab.label}</span>}
                        visibleCount={10}
                      >
                        {tabActive === 'TAB1' ? (
                          <Gcol placement="ss" className="w-full" gap={3}>
                            <TableFold>
                              <TableFoldHead title="기본질문">
                                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                                  초기화
                                </Button>
                              </TableFoldHead>
                              <TableFoldBody>
                                <FormTable caption="병명" cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
                                  <FormRow vertical={false}>
                                    <FormCell title={'병명'}>
                                      <Grow placement="bwe">
                                        <Grow>
                                          척추염좌
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button only="icon" size={'md'} variant="none">
                                                <QuestionMark color="var(--color-gray-500)" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent
                                              align="center"
                                              side="bottom"
                                              sideOffset={0}
                                              variant="default"
                                              className="w-[16rem]"
                                            >
                                              경추염좌, 요추염좌, 흉추염좌, 목염좌, 등염좌, 허리염좌, 강주의 염좌 및
                                              긴장, 흉추의 염좌 및 긴장, 요추의 염좌 및 긴장
                                            </TooltipContent>
                                          </Tooltip>
                                          <TooltipQ>
                                            {`문서서명/IM은 청약서상 고객이 청약서로 [전자적 방법의 안내동의여부]에 기재한 내용을 화면에서 선택하시면 됩니다.<br /> 전자서명/전자청약은 전자적 안내동의가 필수사항입니다.`}
                                          </TooltipQ>
                                        </Grow>
                                        <Badge color="green" size="md" variant="contained" className="">
                                          자동완성
                                        </Badge>
                                      </Grow>
                                    </FormCell>
                                    <FormCell title={'의료기관명'}>
                                      <Input
                                        commaAmount={true}
                                        value={form.type02}
                                        onChange={(e) => setFormField('type02', e.target.value)}
                                        required
                                      />
                                    </FormCell>
                                  </FormRow>
                                  <FormRow vertical={false}>
                                    <FormCell title={'치료기간'}>
                                      <DatePickerInput
                                        errorMsg=""
                                        errorPs="bl"
                                        mode="range"
                                        onChange={() => {}}
                                        rangeValue={{
                                          from: '2026-03-01',
                                          to: '2026-03-07',
                                        }}
                                        required
                                        size="lg"
                                        width="sm"
                                      />
                                    </FormCell>
                                    <FormCell title={'수술여부'}>
                                      <RadioGroup
                                        className="gap-2"
                                        errorMsg="하나를 선택해주세요."
                                        errorPs="bl"
                                        onValueChange={() => {}}
                                        width="full"
                                      >
                                        <RadioGroupItem
                                          color="primary"
                                          id="d1"
                                          size="lg"
                                          value="option1"
                                          variant="default"
                                        >
                                          예
                                        </RadioGroupItem>
                                        <RadioGroupItem
                                          color="primary"
                                          id="d2"
                                          size="lg"
                                          value="option2"
                                          variant="default"
                                        >
                                          아니오
                                        </RadioGroupItem>
                                      </RadioGroup>
                                    </FormCell>
                                  </FormRow>
                                  <FormRow vertical={false}>
                                    <FormCell title={'치료일수'} titleRowSpan={2}>
                                      <Input
                                        commaAmount={true}
                                        value={form.type03}
                                        onChange={(e) => setFormField('type03', e.target.value)}
                                        required
                                      />
                                      입원
                                      <Input
                                        commaAmount={true}
                                        value={form.type04}
                                        onChange={(e) => setFormField('type04', e.target.value)}
                                        required
                                      />
                                      일
                                    </FormCell>
                                    <FormCell title={'완치여부'}>
                                      <RadioGroup
                                        className="gap-2"
                                        errorMsg="하나를 선택해주세요."
                                        errorPs="bl"
                                        onValueChange={() => {}}
                                        width="full"
                                      >
                                        <RadioGroupItem
                                          color="primary"
                                          id="d1"
                                          size="lg"
                                          value="option1"
                                          variant="default"
                                        >
                                          예
                                        </RadioGroupItem>
                                        <RadioGroupItem
                                          color="primary"
                                          id="d2"
                                          size="lg"
                                          value="option2"
                                          variant="default"
                                        >
                                          아니오
                                        </RadioGroupItem>
                                      </RadioGroup>
                                    </FormCell>
                                  </FormRow>
                                  <FormRow vertical={false}>
                                    <FormCell title={null}>
                                      <Input
                                        commaAmount={true}
                                        value={form.type05}
                                        onChange={(e) => setFormField('type05', e.target.value)}
                                        required
                                      />
                                      통원
                                      <Input
                                        commaAmount={true}
                                        value={form.type06}
                                        onChange={(e) => setFormField('type06', e.target.value)}
                                        required
                                      />
                                      회
                                    </FormCell>
                                    <FormCell title={'재발유무'}>
                                      <RadioGroup
                                        className="gap-2"
                                        errorMsg="하나를 선택해주세요."
                                        errorPs="bl"
                                        onValueChange={() => {}}
                                        width="full"
                                      >
                                        <RadioGroupItem
                                          color="primary"
                                          id="d1"
                                          size="lg"
                                          value="option1"
                                          variant="default"
                                        >
                                          없음
                                        </RadioGroupItem>
                                        <RadioGroupItem
                                          color="primary"
                                          id="d2"
                                          size="lg"
                                          value="option2"
                                          variant="default"
                                        >
                                          있음
                                        </RadioGroupItem>
                                      </RadioGroup>
                                      <Grow>
                                        <Input
                                          commaAmount={true}
                                          value={form.type05}
                                          onChange={(e) => setFormField('type05', e.target.value)}
                                          width="4rem"
                                        />
                                        회
                                      </Grow>
                                    </FormCell>
                                  </FormRow>
                                </FormTable>
                              </TableFoldBody>
                            </TableFold>
                            <TableFold>
                              <TableFoldHead title="(선택)치료내용">
                                <Grow>
                                  <BulletItem
                                    // before="ⓐ"
                                    className="text-right w-full break-words whitespace-pre-line"
                                    color="default"
                                    onClick={() => {}}
                                    size="md"
                                    type="dot"
                                  >
                                    치료내용은 심사자 심사시 참고하는 항목으로 필요시 선택바랍니다.
                                  </BulletItem>
                                </Grow>
                              </TableFoldHead>
                              <TableFoldBody>
                                <Table>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                        >
                                          진단/검사/검진
                                        </Checkbox>
                                      </TableCell>
                                      <TableCell>
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                        >
                                          약처방/투약(주사,연고,안약 등)
                                        </Checkbox>
                                      </TableCell>
                                      <TableCell>
                                        <Grow placement="bwe">
                                          <Checkbox
                                            color="primary"
                                            onCheckedChange={() => {}}
                                            size="lg"
                                            variant="default"
                                          >
                                            물리치료
                                          </Checkbox>
                                          <Button variant={'outlined'} size={'md'} color={'gray'}>
                                            기타치료
                                          </Button>
                                        </Grow>
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                        >
                                          상담/언어치료
                                        </Checkbox>
                                      </TableCell>
                                      <TableCell>
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                        >
                                          치과치료
                                        </Checkbox>
                                      </TableCell>
                                      <TableCell>
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                        >
                                          한방치료
                                        </Checkbox>
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell colSpan={3}>
                                        <Grow gap={1}>
                                          <Checkbox
                                            color="primary"
                                            onCheckedChange={() => {}}
                                            size="lg"
                                            variant="default"
                                          >
                                            기타
                                          </Checkbox>
                                          <Input
                                            commaAmount={true}
                                            value={form.type06}
                                            onChange={(e) => setFormField('type06', e.target.value)}
                                          />
                                        </Grow>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableFoldBody>
                            </TableFold>
                          </Gcol>
                        ) : tabActive === 'TAB2' ? (
                          <Gcol placement="ss" className="w-full">
                            <TableFold>
                              <TableFoldHead title="기본질문"></TableFoldHead>
                              <TableFoldBody>
                                <FormTable caption="병명" cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
                                  <FormRow vertical={false}>
                                    <FormCell title={'병명'}>자궁근종</FormCell>
                                    <FormCell title={'의료기관명'}></FormCell>
                                  </FormRow>
                                </FormTable>
                              </TableFoldBody>
                            </TableFold>
                          </Gcol>
                        ) : tabActive === 'TAB3' ? ( // Missing Gcol component
                          <Gcol placement="ss" className="w-full">
                            <TableFold>
                              <TableFoldHead title="기본질문"></TableFoldHead>
                              <TableFoldBody>
                                <FormTable caption="병명" cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
                                  <FormRow vertical={false}>
                                    <FormCell title={'병명'}>대장직장용종</FormCell>
                                    <FormCell title={'의료기관명'}></FormCell>
                                  </FormRow>
                                </FormTable>
                              </TableFoldBody>
                            </TableFold>
                          </Gcol>
                        ) : tabActive === 'TAB4' ? ( // Missing Gcol component
                          <Gcol placement="ss" className="w-full">
                            <TableFold>
                              <TableFoldHead title="기본질문"></TableFoldHead>
                              <TableFoldBody>
                                <FormTable caption="병명" cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
                                  <FormRow vertical={false}>
                                    <FormCell title={'병명'}>추간판장애</FormCell>
                                    <FormCell title={'의료기관명'}></FormCell>
                                  </FormRow>
                                </FormTable>
                              </TableFoldBody>
                            </TableFold>
                          </Gcol>
                        ) : tabActive === 'TAB5' ? ( // Missing Gcol component
                          <Gcol placement="ss" className="w-full">
                            <TableFold>
                              <TableFoldHead title="기본질문"></TableFoldHead>
                              <TableFoldBody>
                                <FormTable caption="병명" cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
                                  <FormRow vertical={false}>
                                    <FormCell title={'병명'}>어깨병변</FormCell>
                                    <FormCell title={'의료기관명'}></FormCell>
                                  </FormRow>
                                </FormTable>
                              </TableFoldBody>
                            </TableFold>
                          </Gcol>
                        ) : null}
                      </TabPager>
                    );
                  })()}
                </Gcol>
              </Grow>
            </Grow>
          </Grow>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button color={'gray'} size={'xl'} variant={'outlined'}>
                버튼
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
