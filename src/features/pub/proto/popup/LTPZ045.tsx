'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { SearchIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import * as React from 'react';
import type { PopupBaseProps } from './types';
import { useFormFields } from '@/shared/hooks/useFormFields';

export const LTPZ045 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });
  const [cddEtcValue, setCddEtcValue] = React.useState('');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고객신원정보확인
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ045)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Gcol className="w-full" gap={5}>
            <Grow className="w-full" variant="box-round">
              <FormTable variant={'head'} lineTop={false} caption="">
                <FormRow>
                  <FormCell title={'설계번호'}>
                    <Input aria-label="" width={'15rem'} value={'LA260209313558'} readOnly />
                    -
                    <Input aria-label="" width={'3rem'} value={'1'} readOnly />
                  </FormCell>
                  <FormCell title={'계약자'}>김한화(901212-1234567)</FormCell>
                </FormRow>
              </FormTable>
            </Grow>
            <Gcol className="w-full" gap={4}>
              {/* 개인등록  */}
              <TableFold>
                <TableFoldHead title="고객정보(CDD 확인사항)"></TableFoldHead>
                <TableFoldBody>
                  <FormTable caption="고객정보" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'성명'}>김한화</FormCell>
                      <FormCell title={'영문명'}>Kim Hanhwa</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'주민번호(여권번호)'}>901212-1234567</FormCell>
                      <FormCell title={'국적'}>대한민국</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'주소'} colSpan={3}>
                        주소 값 전체 노출 영역
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'휴대폰'}>010-1234-5678</FormCell>
                      <FormCell title={'전화번호'}>02-123-4567</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'직업'}>TEXT</FormCell>
                      <FormCell title={'이메일'}>example@example.com</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'직장명'}>TEXT</FormCell>
                      <FormCell title={'직무'}>TEXT</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'주소'} colSpan={3}>
                        주소 값 전체 노출 영역
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
              {/* //개인등록  */}

              {/* 법인등록  */}
              <TableFold>
                <TableFoldHead title="고객정보(CDD 확인사항)"></TableFoldHead>
                <TableFoldBody>
                  <FormTable caption="고객정보" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'법인명'}>
                        <Input
                          aria-label="증권번호 검색"
                          size="md"
                          width={'10rem'}
                          value={''}
                          onChange={(e) => e.target.value}
                          readOnly
                        />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </FormCell>
                      <FormCell title={'영문명'}>Kim Hanhwa</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'사업자번호'}>901212-1234567</FormCell>
                      <FormCell title={'설립일'}>2025-01-01</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'대표전화번호'}>010-1234-5678</FormCell>
                      <FormCell title={'설립목적'}>02-123-4567</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'주소'} colSpan={3}>
                        주소 값 전체 노출 영역
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'대표자명'}>TEXT</FormCell>
                      <FormCell title={'국적'}>TEXT</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'생년월일'}>1990-01-01</FormCell>
                      <FormCell title={'표준산업분류'}>TEXT</FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
              {/* //법인등록  */}

              {/* 개인등록  */}
              <TableFold>
                <TableFoldHead title="실소유자 확인사항"></TableFoldHead>
                <TableFoldBody>
                  <FormTable caption="고객정보" cols={['w-[19rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'계약자가 실소유자가 맞습니까?'}>
                        <RadioGroup>
                          <RadioGroupItem value="option1" id="r1">
                            예
                          </RadioGroupItem>
                          <div className="px-[1rem]">/</div>
                          <RadioGroupItem value="option2" id="r2">
                            아니오
                          </RadioGroupItem>
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
              {/* //개인등록  */}

              {/* 법인등록  */}
              <TableFold>
                <TableFoldHead title="실소유자 확인사항"></TableFoldHead>
                <TableFoldBody>
                  <FormTable caption="고객정보" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'실소유자구분'} colSpan={3}>
                        <RadioGroup className="gap-1">
                          <RadioGroupItem value="optionA" id="a">
                            1단계: 25% 이상 지분증권 소유한 사람
                          </RadioGroupItem>
                          <RadioGroupItem value="optionB" id="b">
                            2-1단계: ① 대표자, 임원, 업무집행사원의 과반수를 선임한 주주
                          </RadioGroupItem>
                          <RadioGroupItem value="optionC" id="c">
                            2-2단계: ② 최대 지분증권을 소유한 사람
                          </RadioGroupItem>
                          <RadioGroupItem value="optionD" id="d">
                            2-3단계: ③, ①, ② 외에 법인, 단체를 사실상 지배하는 사람
                          </RadioGroupItem>
                          <RadioGroupItem value="optionE" id="e">
                            3단계: 법인 또는 단체의 대표자
                          </RadioGroupItem>
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'실소유자 이름'}>김한화</FormCell>
                      <FormCell title={'영문명'}>KIM HANHWA</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'생년월일'}>1990-01-01</FormCell>
                      <FormCell title={'국적'}>대한민국</FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
              {/* //법인등록  */}

              {/* 법인등록  */}
              <TableFold>
                <TableFoldHead title="대리인 확인사항(대리인 고객등록 필수)"></TableFoldHead>
                <TableFoldBody>
                  <FormTable caption="고객정보" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'성명'}>
                        <Input
                          aria-label="증권번호 검색"
                          size="md"
                          width={'10rem'}
                          value={''}
                          onChange={(e) => e.target.value}
                          readOnly
                        />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'md'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </FormCell>
                      <FormCell title={'영문명'}>KIM HANHWA</FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'계약자와 관계'} colSpan={3}>
                        <NativeSelect
                          aria-label="선택"
                          width="10rem"
                          value={form.type02}
                          onChange={(e) => setFormField('type02', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type02-1', label: '선택1' },
                            { value: 'selection2', id: 'type02-2', label: '선택2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>

              {/* //법인등록  */}

              {/* 개인등록  */}
              <TableFold>
                <TableFoldHead title="법정대리인 정보"></TableFoldHead>
                <TableFoldBody>
                  <FormTable caption="법정대리인 정보" cols={['w-[14rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'이름/주민번호'}>
                        박환화(900101-1234567)와의 관계
                        <NativeSelect
                          aria-label="선택"
                          width="10rem"
                          value={form.type01}
                          readOnly
                          onChange={(e) => setFormField('type01', e.target.value)}
                        >
                          {[
                            { value: 'selection', id: 'type01-1', label: '선택1' },
                            { value: 'selection2', id: 'type01-2', label: '선택2' },
                          ].map((option) => (
                            <NativeSelectOption key={option.id} value={option.value}>
                              {option.label}
                            </NativeSelectOption>
                          ))}
                        </NativeSelect>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
              {/* //개인등록  */}

              {/* 법인등록  */}
              <TableFold>
                <TableFoldHead title="CDD 검증정보"></TableFoldHead>
                <TableFoldBody>
                  <FormTable caption="" cols={['w-[19rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'실명확인증표'}>
                        <RadioGroup
                          className="gap-1"
                          value={form.type03}
                          onValueChange={(v) => setFormField('type03', v)}
                        >
                          <RadioGroupItem value="option1" id="a1">
                            사업자등록증
                          </RadioGroupItem>
                          <RadioGroupItem value="option2" id="a2">
                            기타
                          </RadioGroupItem>
                          <Input
                            aria-label=""
                            size="md"
                            width={'10rem'}
                            value={cddEtcValue}
                            onChange={(e) => setCddEtcValue(e.target.value)}
                            readOnly={form.type03 !== 'option2'}
                          />
                        </RadioGroup>
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
              {/* //법인등록  */}
            </Gcol>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
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
