/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { Gcol, Grow, Divider, Grid } from '@atoms';

import { BottomBar } from '@common/BottomBar';
import { DatePickerInput } from '@common/DatePicker';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputCombo } from '@common/InputCombo';
import { KeyValueItem } from '@common/KeyValueList';
import { ViewMode } from '@common/ViewMode';
import AIChatBot from '@features/AIChatBot';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { Ai2Icon, SearchIcon, ArrowNext, ZoomInIcon, AiIcon } from '@icons';
import { LayoutFoot, LayoutHead } from '@layout/BaseLayout';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { useCallback, useState } from 'react';
import * as React from 'react';

import { Ltpa02001 } from '../components/Ltpa02001';
import { Ltpa02002 } from '../components/Ltpa02002';

export default function Ltpa020Section() {
  const [tabSelectValue, setTabSelectValue] = useState('tabPage1');
  const [customerType, setCustomerType] = React.useState('recent');
  const [analysisScore, setAnalysisScore] = React.useState<number | null>(null);
  const [historyScore, setHistoryScore] = React.useState<number | null>(null);
  type ComboFieldKey = 'policyNumber';
  const [comboValues, setComboValues] = useState<Record<ComboFieldKey, string>>({
    policyNumber: '',
  });
  const handleComboValueChange = useCallback(
    <TField extends ComboFieldKey>(field: TField) =>
      (nextValue: string) => {
        setComboValues((prev) => ({
          ...prev,
          [field]: nextValue,
        }));
      },
    []
  );
  // 고객정보 등록/미등록
  const [dataNone, setDataNone] = useState<boolean>(true);

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '상품플랜설계', pageId: 'LTPA020' }} />
        <Grow placement={'bwc'} gap={3} className="w-full pt-1 pb-1">
          <RadioGroup
            value={tabSelectValue}
            onValueChange={(value) => setTabSelectValue(value)}
            className="bg-[#fff] gap-[0.2rem] rounded-2 relative after:content-[''] after:absolute after:block after:w-full after:h-full after:border after:border-[var(--color-secondary-15)] after:rounded-[0.8rem] after:z-0"
          >
            <RadioGroupItem
              variant={'button'}
              value="tabPage1"
              className="relative z-1 [&>div]:hidden w-[24rem] h-[3.6rem] bg-[transparent] border-0! flex items-center gap-1 justify-center rounded-2 text-[1.4rem] text-[var(--color-secondary-70)] font-bold data-[state=checked]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] data-[state=checked]:text-white"
            >
              상품선택
            </RadioGroupItem>
            <RadioGroupItem
              variant={'button'}
              value="tabPage2"
              className="relative z-1 [&>div]:hidden w-[24rem] h-[3.6rem] bg-[transparent] border-0! flex items-center gap-1 justify-center rounded-2 text-[1.4rem] text-[var(--color-secondary-70)] font-bold data-[state=checked]:bg-[linear-gradient(328deg,#FF5C2E_9.4%,#FF8D02_97.24%)] data-[state=checked]:text-white"
            >
              추천설계
              <AiIcon
                size={24}
                color={tabSelectValue === 'tabPage2' ? '#ffffff' : '#006FF2'}
                color2={tabSelectValue === 'tabPage2' ? '#ffffff' : '#A683FF'}
                className="absolute right-2 top-[0.6rem]"
              />
            </RadioGroupItem>
          </RadioGroup>
          <Grow className="gap-1 shrink-0" placement={'ec'}>
            <Input aria-label="계약자명 입력" type="text" value={'6012345 박하늘별님달'} width={'full'} />
            <Button variant={'outlined'} color={'gray-light'} aria-label="계약자 추가" only={'icon'} size={'lg'}>
              <SearchIcon color="var(--color-primary-50)" />
            </Button>
          </Grow>
        </Grow>
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Grid className="w-full h-full grid-rows-[auto_1fr]" gap={4} placement="ss">
            {/* 검색 */}
            <Gcol placement="ss" className="bg-[var(--color-blue-gray-70)] rounded-[0.8rem] p-[1rem]">
              <FormTable caption="" cols={['w-[6rem]', 'w-auto']} variant={'none'}>
                <FormRow className="items-start!">
                  <FormCell title={'고객정보'} className="align-top [&>span]:block [&>span]:pt-1">
                    <Grow placement="ss" gap={5}>
                      <ViewMode
                        label={['등록', '미등록']}
                        state={customerType === 'recent'}
                        onChange={(value) => setCustomerType(value ? 'recent' : 'new')}
                      />

                      {/* <RadioGroup
                        value={customerType}
                        onValueChange={setCustomerType}
                        className="gap-[0.4rem] shrink-0 flex-nowrap"
                      >
                        <RadioGroupItem value="recent" variant="button" size="md">
                          최근등록고객
                        </RadioGroupItem>
                        <RadioGroupItem value="new" variant="button" size="md">
                          미등록고객
                        </RadioGroupItem>
                      </RadioGroup> */}

                      <Gcol placement="ss" gap={2}>
                        {customerType === 'recent' && (
                          <Grow placement="sc" className="flex-1 min-w-0 flex-wrap gap-x-5 gap-y-1">
                            <Grow placement="sc">
                              <InputCombo
                                aria-label="고객 검색"
                                width={110}
                                col={2}
                                options={[
                                  { value: '홍길순 32세(여)', label: <td>홍길순</td> },
                                  { value: '홍길동 32세(여)', label: <td>홍길동</td> },
                                  { value: '김한화 32세(여)', label: <td>김한화</td> },
                                ]}
                                value={comboValues.policyNumber}
                                onChange={handleComboValueChange('policyNumber')}
                                placeholder="고객 검색"
                              />
                              <Button variant={'outlined'} color={'gray-light'} size={'lg'} only="icon">
                                <SearchIcon size={14} color="var(--color-primary-50)" />
                              </Button>
                            </Grow>

                            <Grow placement="sc" gap={3}>
                              <KeyValueItem label={'직업'} variant="info">
                                (1급)회사 사무직 종사자
                              </KeyValueItem>
                              <Divider />

                              <KeyValueItem label={'보장분석'} variant="info" className="gap-2">
                                2026-01-01
                                <Button
                                  variant={'contained'}
                                  size={'sm'}
                                  color={'coolgray-light'}
                                  onClick={() => setAnalysisScore(280)}
                                >
                                  조회
                                </Button>
                                {analysisScore !== null && (
                                  <span className="inline-flex h-[2.2rem] min-w-[3rem] items-center justify-center rounded-full bg-[#ff5c2e] px-[0.6rem] text-[1.2rem] font-bold text-white">
                                    {analysisScore}
                                  </span>
                                )}
                              </KeyValueItem>
                              <Divider />

                              <KeyValueItem label={'보험금지급 이력정보'} variant="info" className="gap-2">
                                2026-01-01
                                <Button
                                  variant={'contained'}
                                  size={'sm'}
                                  color={'coolgray-light'}
                                  onClick={() => setHistoryScore(190)}
                                >
                                  조회
                                </Button>
                                {historyScore !== null && (
                                  <span className="inline-flex h-[2.2rem] min-w-[3rem] items-center justify-center rounded-full bg-[#e43939] px-[0.6rem] text-[1.2rem] font-bold text-white">
                                    {historyScore}
                                  </span>
                                )}
                              </KeyValueItem>
                            </Grow>
                          </Grow>
                        )}
                        {customerType === 'new' && (
                          <Grow placement="sc" gap={3}>
                            <KeyValueItem label={'나이'} variant="info">
                              <Input size="sm" value={'42세'} width={48} />
                              <DatePickerInput value="1994-05-10" />
                            </KeyValueItem>
                            <Divider />

                            <KeyValueItem label={'성별'} variant="info">
                              <RadioGroup className="gap-1" defaultValue="남">
                                {[
                                  { value: '남', label: '남' },
                                  { value: '여', label: '여' },
                                ].map((tag) => (
                                  <RadioGroupItem key={tag.value} value={tag.value}>
                                    {tag.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </KeyValueItem>
                            <Divider />

                            <KeyValueItem label={'직업'} variant="info">
                              <RadioGroup className="gap-1" defaultValue="1급">
                                {[
                                  { value: '1급', label: '1급' },
                                  { value: '2급', label: '2급' },
                                  { value: '3급', label: '3급' },
                                ].map((tag) => (
                                  <RadioGroupItem key={tag.value} value={tag.value}>
                                    {tag.label}
                                  </RadioGroupItem>
                                ))}
                              </RadioGroup>
                            </KeyValueItem>

                            <Button variant="contained" size="md" color="gray" className="gap-1" onClick={() => {}}>
                              고객등록
                              <ZoomInIcon size={16} />
                            </Button>
                          </Grow>
                        )}

                        <Grow>
                          {customerType === 'recent' ? (
                            <RadioGroup className="gap-1" defaultValue="홍길동">
                              {[
                                { value: '홍길동', age: 42, level: 1, gender: '남', name: '홍길동' },
                                {
                                  value: '반짝반짝빛반짝반짝빛',
                                  age: 42,
                                  level: 2,
                                  gender: '남',
                                  name: '반짝반짝빛반짝반짝빛',
                                },
                                { value: '김한화', age: 55, level: 3, gender: '남', name: '김한화' },
                                { value: '피보험자', age: 63, level: 4, gender: '여', name: '피보험자' },
                                { value: '피보험자2', age: 63, level: 4, gender: '여', name: '피보험자2' },
                              ].map((tag) => (
                                <RadioGroupItem
                                  key={tag.value}
                                  value={tag.value}
                                  variant="chipBox"
                                  size="md"
                                  className="flex items-center"
                                >
                                  <b>#</b>
                                  <b className="max-w-[7rem] truncate block">{tag.name}</b>
                                  {tag.age}세 ({tag.gender})
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          ) : (
                            <RadioGroup className="gap-1" defaultValue="홍길동">
                              {[
                                { value: '홍길동', age: 42, level: 1, gender: '남', name: '홍길동' },
                                {
                                  value: '반짝반짝빛반짝반짝빛',
                                  age: 42,
                                  level: 2,
                                  gender: '남',
                                  name: '반짝반짝빛반짝반짝빛',
                                },
                                { value: '김한화', age: 55, level: 3, gender: '남', name: '김한화' },
                                { value: '피보험자2', age: 63, level: 4, gender: '여', name: '피보험자2' },
                                { value: '피보험자3', age: 63, level: 4, gender: '여', name: '피보험자3' },
                              ].map((tag) => (
                                <RadioGroupItem key={tag.value} value={tag.value} variant="chipBox" size="md">
                                  <b>#</b>
                                  <b>{tag.name}</b>
                                  {tag.level}급
                                </RadioGroupItem>
                              ))}
                            </RadioGroup>
                          )}
                          {customerType === 'new' && (
                            <Button variant="outlined" size="md" color="gray-light" onClick={() => {}}>
                              # 편집
                            </Button>
                          )}
                        </Grow>
                      </Gcol>
                    </Grow>
                  </FormCell>
                </FormRow>
              </FormTable>
            </Gcol>

            {tabSelectValue === 'tabPage1' ? (
              <Ltpa02001 />
            ) : (
              <Ltpa02002 dataNone={dataNone} setDataNone={setDataNone} userType={customerType} />
            )}
          </Grid>
        }
        mainFoot={
          <MainBottom>
            <MainBottomItem className="justify-end">
              {dataNone ? (
                <Grow gap={1}>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    <Ai2Icon />
                    추천설계
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                    설계시작
                    <ArrowNext size={16} />
                  </Button>
                </Grow>
              ) : (
                <Grow gap={1}>
                  <Button variant={'outlined'} color={'gray'} size={'xl'}>
                    <Ai2Icon />
                    추천설계비교
                  </Button>
                  <Button type="submit" form={'page2-MainForm'} variant={'contained'} color={'primary'} size={'xl'}>
                    설계생성(2)
                    <ArrowNext size={16} />
                  </Button>
                  <AIChatBot />
                </Grow>
              )}
            </MainBottomItem>
          </MainBottom>
        }
      ></LayoutTemplate>
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
