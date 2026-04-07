'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import { BulletItem, BulletList, BulletListItem } from '@/shared/components/common/BulletList';
import { Badge } from '@/shared/components/uiux/Badge';
import { Input } from '@/shared/components/uiux/Input';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { Gcol, Grow, Typo } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { QuestionMark, SearchIcon } from '@icons';
import { InfoBox } from '@common/InfoBox';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { TooltipQ } from '@common/TooltipQ';
import { Button } from '@uiux/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
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

  // const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
  const [checked, setChecked] = React.useState<string[]>(['b']);

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
        <DialogSection className="w-full">
          <Grow className="grid w-full grid-cols-[24.7rem_minmax(0,1fr)] gap-5" placement="ss">
            <Gcol placement="ss" className="w-[24.7rem] shrink-0 overflow-hidden" gap={5}>
              <Gcol className="w-full" placement="ss" gap={2}>
                <Typo variant="heading-md">많이 찾는 질병</Typo>
                <Grow variant="box-round" placement="bwc">
                  <CheckboxGroup
                    className="gap-1"
                    color="primary"
                    minSelected={2}
                    value={checked}
                    onValueChange={setChecked}
                    size="lg"
                    variant="button"
                  >
                    <CheckboxGroupItem value="chk01_01">대장·직장용종</CheckboxGroupItem>
                    <CheckboxGroupItem value="chk01_02">척주염좌</CheckboxGroupItem>
                    <CheckboxGroupItem value="chk01_03">등통증</CheckboxGroupItem>
                    <CheckboxGroupItem value="chk01_04">후천성 백내장</CheckboxGroupItem>
                    <CheckboxGroupItem value="chk01_05">열상·표재성손상</CheckboxGroupItem>
                    <CheckboxGroupItem value="chk01_06">추간판장애</CheckboxGroupItem>
                    <CheckboxGroupItem value="chk01_07">금성 비인두염</CheckboxGroupItem>
                    <CheckboxGroupItem value="chk01_08">교통사고</CheckboxGroupItem>
                    <CheckboxGroupItem value="chk01_09">치액/치질</CheckboxGroupItem>
                    <CheckboxGroupItem value="chk01_10">자궁근종</CheckboxGroupItem>
                  </CheckboxGroup>
                </Grow>
              </Gcol>
              <Gcol className="w-full" placement="ss" gap={2}>
                <Grow placement="bwe">
                  <Typo variant="heading-md">질병검색</Typo>
                  <Badge color="blue" size="md" variant="contained" className="">
                    입력된 질병 6건
                  </Badge>
                </Grow>
                <Gcol variant="box-round" className="bg-[var(--color-blue-gray-15)]">
                  <Grow className="w-full">
                    <Input
                      placeholder="병명 또는 코드 입력"
                      value={form.type01}
                      onChange={(e) => setFormField('type01', e.target.value)}
                    />
                    <Button aria-label="검색" variant={'outlined'} size={'lg'} color="gray-light" only="icon">
                      <SearchIcon color="{'var(--color-primary-50)'}" />
                    </Button>
                  </Grow>
                  <Grow>
                    <Typo>
                      총 <b className="text-[var(--color-primary-50)]">18건</b>
                    </Typo>
                  </Grow>
                  <Table variant="default">
                    <caption className="a11y-hidden">테이블 소개글</caption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>KCD코드</TableHead>
                        <TableHead>질병명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="text-center">
                        <TableCell>M48.0</TableCell>
                        <TableCell>
                          <b className="text-[var(--color-primary-50)]">척추</b>관협착증
                        </TableCell>
                      </TableRow>
                      <TableRow className="text-center">
                        <TableCell>M48.1</TableCell>
                        <TableCell>
                          <b className="text-[var(--color-primary-50)]">척추</b>만곡증
                        </TableCell>
                      </TableRow>
                      <TableRow className="text-center">
                        <TableCell>M48.2</TableCell>
                        <TableCell>
                          <b className="text-[var(--color-primary-50)]">척추</b>분리증
                        </TableCell>
                      </TableRow>
                      <TableRow className="text-center">
                        <TableCell>M48.3</TableCell>
                        <TableCell>
                          <b className="text-[var(--color-primary-50)]">척추</b>전방전위증
                        </TableCell>
                      </TableRow>
                      <TableRow className="text-center">
                        <TableCell>M48.4</TableCell>
                        <TableCell>
                          <b className="text-[var(--color-primary-50)]">척추</b>증,{' '}
                          <b className="text-[var(--color-primary-50)]">척추</b>병증
                        </TableCell>
                      </TableRow>
                      <TableRow className="text-center">
                        <TableCell>M48.5</TableCell>
                        <TableCell>
                          강직성<b className="text-[var(--color-primary-50)]">척추</b>염
                        </TableCell>
                      </TableRow>
                      <TableRow className="text-center">
                        <TableCell>M48.6</TableCell>
                        <TableCell>
                          염증성<b className="text-[var(--color-primary-50)]">척추</b>병증
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Gcol>
              </Gcol>
            </Gcol>

            {/* Tab */}
            <Grow placement="ss" className="w-full min-w-0" gap={2}>
              <Grow className="w-full min-w-0">
                <Gcol className="w-full min-w-0" placement="ss">
                  {(() => {
                    const [tabActive, setTabActive] = React.useState('TAB1');
                    const tabData = [
                      { label: '척추염좌', value: 'TAB1' },
                      { label: '자궁근종', value: 'TAB2' },
                      { label: '대장·직장용종', value: 'TAB3' },
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
                                <FormTable caption="기본질문 항목" cols={['w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
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
                                              align="start"
                                              side="bottom"
                                              sideOffset={0}
                                              variant="default"
                                              className="z-[60] w-[22.1rem] block"
                                            >
                                              <Gcol placement="ss" gap={1.5}>
                                                <Typo className="body-md font-bold">척추염좌</Typo>
                                                <Grow>
                                                  <Badge color="primary" size="md" variant="contained">
                                                    할증
                                                  </Badge>
                                                  <Badge color="green" size="md" variant="contained">
                                                    부담보
                                                  </Badge>
                                                  <Badge color="blue" size="md" variant="contained">
                                                    SI경증
                                                  </Badge>
                                                </Grow>
                                                <Typo className="text-wrap">
                                                  경추염좌, 요추염좌, 흉추염좌, 목염좌, 등염좌, 허리염좌, 강추의 염좌 및
                                                  간장, 흉추의 염좌 및 긴장, 요추의 염좌 및 긴장
                                                </Typo>
                                              </Gcol>
                                            </TooltipContent>
                                          </Tooltip>
                                          {/* <TooltipQ className="z-[60]">
                                            {`문서서명/IM은 청약서상 고객이 청약서로 [전자적 방법의 안내동의여부]에 기재한 내용을 화면에서 선택하시면 됩니다.<br /> 전자서명/전자청약은 전자적 안내동의가 필수사항입니다.`}
                                          </TooltipQ> */}
                                        </Grow>
                                        <Badge color="green" size="md" variant="contained" className="">
                                          자동완성
                                        </Badge>
                                      </Grow>
                                    </FormCell>
                                    <FormCell title={'의료기관명'}>
                                      <Input
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
                                      <RadioGroup className="gap-3" onValueChange={() => {}} width="full" required>
                                        <RadioGroupItem
                                          color="primary"
                                          id="d1"
                                          size="lg"
                                          value="option1_1"
                                          variant="default"
                                        >
                                          예
                                        </RadioGroupItem>
                                        <RadioGroupItem
                                          color="primary"
                                          id="d2"
                                          size="lg"
                                          value="option1_2"
                                          variant="default"
                                        >
                                          아니오
                                        </RadioGroupItem>
                                      </RadioGroup>
                                    </FormCell>
                                  </FormRow>
                                  <FormRow vertical={false}>
                                    <FormCell title={'치료일수'} titleRowSpan={2}>
                                      <Grow gap={3}>
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                          required
                                        >
                                          입원
                                        </Checkbox>
                                        <Grow>
                                          <Input
                                            commaAmount={true}
                                            value={form.type04}
                                            onChange={(e) => setFormField('type04', e.target.value)}
                                            width="3rem"
                                            required
                                          />
                                          일
                                        </Grow>
                                      </Grow>
                                    </FormCell>
                                    <FormCell title={'완치여부'}>
                                      <RadioGroup className="gap-3" onValueChange={() => {}} width="full" required>
                                        <RadioGroupItem
                                          color="primary"
                                          id="d1"
                                          size="lg"
                                          value="option2_1"
                                          variant="default"
                                        >
                                          예
                                        </RadioGroupItem>
                                        <RadioGroupItem
                                          color="primary"
                                          id="d2"
                                          size="lg"
                                          value="option2_2"
                                          variant="default"
                                        >
                                          아니오
                                        </RadioGroupItem>
                                      </RadioGroup>
                                    </FormCell>
                                  </FormRow>
                                  <FormRow vertical={false}>
                                    <FormCell title={null}>
                                      <Grow gap={3}>
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                          required
                                        >
                                          통원
                                        </Checkbox>
                                        <Grow>
                                          <Input
                                            commaAmount={true}
                                            value={form.type06}
                                            onChange={(e) => setFormField('type06', e.target.value)}
                                            required
                                            width="3rem"
                                          />
                                          회
                                        </Grow>
                                      </Grow>
                                    </FormCell>
                                    <FormCell title={'재발유무'}>
                                      <RadioGroup
                                        className="gap-3"
                                        errorMsg="하나를 선택해주세요."
                                        errorPs="bl"
                                        onValueChange={() => {}}
                                        width="auto"
                                        required
                                      >
                                        <RadioGroupItem
                                          color="primary"
                                          id="d1"
                                          size="lg"
                                          value="option3_1"
                                          variant="default"
                                        >
                                          없음
                                        </RadioGroupItem>
                                        <RadioGroupItem
                                          color="primary"
                                          id="d2"
                                          size="lg"
                                          value="option3_2"
                                          variant="default"
                                        >
                                          있음
                                        </RadioGroupItem>
                                      </RadioGroup>
                                      <Grow>
                                        <Input
                                          commaAmount={true}
                                          value={form.type07}
                                          onChange={(e) => setFormField('type07', e.target.value)}
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
                                      <TableCell className="border-x-0">
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                        >
                                          진단/검사/검진
                                        </Checkbox>
                                      </TableCell>
                                      <TableCell className="border-x-0">
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                        >
                                          약처방/투약(주사,연고,안약 등)
                                        </Checkbox>
                                      </TableCell>
                                      <TableCell className="border-x-0">
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
                                      <TableCell className="border-x-0">
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                        >
                                          상담/언어치료
                                        </Checkbox>
                                      </TableCell>
                                      <TableCell className="border-x-0">
                                        <Checkbox
                                          color="primary"
                                          onCheckedChange={() => {}}
                                          size="lg"
                                          variant="default"
                                        >
                                          치과치료
                                        </Checkbox>
                                      </TableCell>
                                      <TableCell className="border-x-0">
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
                            <TableFold>
                              <TableFoldHead title="추가질문" />
                              <TableFoldBody>
                                <FormTable cols={['w-[8rem]', 'w-auto']}>
                                  <FormRow vertical={false}>
                                    <FormCell title={'발생부위'}>
                                      <Grow className="w-full">
                                        <RadioGroup
                                          className="gap-2"
                                          errorMsg="하나를 선택해주세요."
                                          errorPs="bl"
                                          onValueChange={() => {}}
                                        >
                                          <RadioGroupItem
                                            color="primary"
                                            id="d1"
                                            size="lg"
                                            value="option1"
                                            variant="default"
                                          >
                                            경추
                                          </RadioGroupItem>
                                          <RadioGroupItem
                                            color="primary"
                                            id="d2"
                                            size="lg"
                                            value="option2"
                                            variant="default"
                                          >
                                            흉추
                                          </RadioGroupItem>
                                          <RadioGroupItem
                                            color="primary"
                                            id="d3"
                                            size="lg"
                                            value="option3"
                                            variant="default"
                                          >
                                            요추
                                          </RadioGroupItem>
                                          <Grow gap={1}>
                                            <RadioGroupItem
                                              color="primary"
                                              id="d3"
                                              size="lg"
                                              value="option3"
                                              variant="default"
                                            >
                                              그외 부위 또는 여러부위
                                            </RadioGroupItem>
                                            <Input
                                              value={form.type08}
                                              placeholder="직접 입력"
                                              onChange={(e) => setFormField('type08', e.target.value)}
                                              className="w-full border-2"
                                              readOnly
                                            />
                                          </Grow>
                                        </RadioGroup>
                                      </Grow>
                                    </FormCell>
                                  </FormRow>
                                  <FormRow>
                                    <FormCell title={'발생원인'}>
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
                                          교통사고 外원인
                                        </RadioGroupItem>
                                        <RadioGroupItem
                                          color="primary"
                                          id="d2"
                                          size="lg"
                                          value="option2"
                                          variant="default"
                                        >
                                          교통사고 원인
                                        </RadioGroupItem>
                                      </RadioGroup>
                                    </FormCell>
                                  </FormRow>
                                </FormTable>
                              </TableFoldBody>
                            </TableFold>
                            <TableFold>
                              <TableFoldHead title="질병별 사전심사 안내">
                                <Grow>
                                  <BulletItem
                                    // before="ⓐ"
                                    className="text-right w-full break-words whitespace-pre-line"
                                    color="default"
                                    onClick={() => {}}
                                    size="md"
                                    type="dot"
                                  >
                                    공통심사기준으로 실제 심사결과는 상품/치료 내용/동반질환 등에 따라 달라질 수
                                    있습니다.
                                  </BulletItem>
                                </Grow>
                              </TableFoldHead>
                              <TableFoldBody>
                                <Grow gap={3} placement="bws">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>척추 염좌 심사기준</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>
                                          <Typo>[일반고지형 심사가이드라인]</Typo>
                                          <br />
                                          <Typo>▶ 상해: 완치 1개월 경과 후 심사(치료기간별 심사)</Typo>
                                          <br />
                                          <Typo>▶ 질병: 수술없는 경우 치료내용별 심사(수술력 원인질환 확인)</Typo>
                                          <br />
                                          <Typo>교통사고 원인</Typo>
                                          <br />
                                          <BulletList position="col">
                                            <BulletListItem
                                              before="▶"
                                              className="whitespace-nowrap"
                                              color="default"
                                              size="md"
                                              type="dash"
                                            >
                                              31일미만 입통원: 경과1개월이상 인수(실손3개월후)
                                            </BulletListItem>
                                          </BulletList>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>척추 염좌 필요서류</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>
                                          <Typo>[일반고지형 심사가이드라인]</Typo>
                                          <BulletList position="col">
                                            <BulletListItem
                                              before="①"
                                              className="whitespace-nowrap"
                                              color="default"
                                              size="md"
                                              type="symbols"
                                            >
                                              소견서(진단명, 치료기간, 치료내용, 현재상태 등)
                                            </BulletListItem>
                                            <BulletListItem
                                              before="②"
                                              className="whitespace-nowrap"
                                              color="default"
                                              onClick={() => {}}
                                              size="md"
                                              type="symbols"
                                            >
                                              필요시 의사경과기록지
                                            </BulletListItem>
                                            <BulletListItem
                                              before="③"
                                              className="whitespace-nowrap"
                                              color="default"
                                              onClick={() => {}}
                                              size="md"
                                              type="symbols"
                                            >
                                              수술치료를 받은 경우에는 수술기록지
                                            </BulletListItem>
                                          </BulletList>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </Grow>
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
                                    <FormCell title={'병명'}>대장·직장용종</FormCell>
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
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                알릴사항FAQ
              </Button>
            </Grow>
            <Grow>
              <Button color={'gray'} size={'xl'} variant={'outlined'}>
                자동고지(ICIS)
              </Button>
              <Button color={'gray'} size={'xl'} variant={'outlined'}>
                자동고지(심평원)
              </Button>
              <Button color={'gray'} size={'xl'} variant={'outlined'}>
                질병 가져오기
              </Button>
              <Button variant={'contained'} size={'xl'}>
                알릴사항 저장하기
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
