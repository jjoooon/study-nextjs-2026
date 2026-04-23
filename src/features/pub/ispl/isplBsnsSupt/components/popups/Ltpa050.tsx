'use client';

import * as React from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon } from '@icons';
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

export const Ltpa050 = ({ open, onOpenChange }: PopupBaseProps) => {
  const insuranceTabs = [
    { label: '인보험', value: 'human' },
    { label: '물보험', value: 'property' },
  ];
  const [leftTabActive, setLeftTabActive] = React.useState('human');
  const [rightTabActive, setRightTabActive] = React.useState('human');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              설계비교
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA050)
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
              <TableFold variant="accordion">
                <TableFoldHead title="계약정보">
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
                </TableFoldHead>
                <TableFoldBody>
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
                  <FormTable
                    caption="포인트정보"
                    cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}
                  >
                    <FormRow vertical={true}>
                      <FormCell title={'보장P'} tdClassName="justify-center items-center">
                        99
                      </FormCell>
                      <FormCell title={'적립P'} tdClassName="justify-center items-center">
                        99
                      </FormCell>
                      <FormCell title={'입시납P'} tdClassName="justify-center items-center">
                        99
                      </FormCell>
                      <FormCell
                        title={
                          <span>
                            합계P <br /> (할인전)
                          </span>
                        }
                        tdClassName="justify-center items-center"
                      >
                        99
                      </FormCell>
                      <FormCell
                        title={
                          <span>
                            합계P <br /> (할인후)
                          </span>
                        }
                        tdClassName="justify-center items-center"
                      >
                        99
                      </FormCell>
                      <FormCell
                        title={
                          <span>
                            만기환급금 <br /> (예상)
                          </span>
                        }
                        tdClassName="justify-center items-center"
                      >
                        99
                      </FormCell>
                      <FormCell
                        title={
                          <span>
                            환급률 <br /> (예상)
                          </span>
                        }
                        tdClassName="justify-center items-center"
                      >
                        99
                      </FormCell>
                    </FormRow>
                  </FormTable>
                  <InfoBox
                    title="만기환급급은 예상금으로 공시이율의 변동, 중도인출금, 보험료 납입일자 등에 따라 금액이 달라질 수 있습니다."
                    variant={'info'}
                    bg={false}
                  ></InfoBox>
                </TableFoldBody>
              </TableFold>

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
              <FormTable
                caption="포인트정보"
                cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}
              >
                <FormRow vertical={true}>
                  <FormCell title={'보장P'} tdClassName="justify-center items-center">
                    99
                  </FormCell>
                  <FormCell title={'적립P'} tdClassName="justify-center items-center">
                    99
                  </FormCell>
                  <FormCell title={'입시납P'} tdClassName="justify-center items-center">
                    99
                  </FormCell>
                  <FormCell
                    title={
                      <span>
                        합계P <br /> (할인전)
                      </span>
                    }
                    tdClassName="justify-center items-center"
                  >
                    99
                  </FormCell>
                  <FormCell
                    title={
                      <span>
                        합계P <br /> (할인후)
                      </span>
                    }
                    tdClassName="justify-center items-center"
                  >
                    99
                  </FormCell>
                  <FormCell
                    title={
                      <span>
                        만기환급금 <br /> (예상)
                      </span>
                    }
                    tdClassName="justify-center items-center"
                  >
                    99
                  </FormCell>
                  <FormCell
                    title={
                      <span>
                        환급률 <br /> (예상)
                      </span>
                    }
                    tdClassName="justify-center items-center"
                  >
                    99
                  </FormCell>
                </FormRow>
              </FormTable>
              <InfoBox
                title="만기환급급은 예상금으로 공시이율의 변동, 중도인출금, 보험료 납입일자 등에 따라 금액이 달라질 수 있습니다."
                variant={'info'}
                bg={false}
              ></InfoBox>
            </Gcol>
            <Grow className="w-full" placement={'ss'} gap={5}>
              <Grow className="w-full" variant="box-round">
                <FormTable caption="설계번호" cols={['w-[14rem]', 'w-auto']} variant="none">
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
              <Grow placement="bwc" className="w-full"></Grow>
            </Grow>

            <Grow placement="ss" className="w-full" gap={2}>
              <Grow className="w-full">
                {/* 인보험/물보험 TabPager 예시 */}
                <Gcol className="w-full" placement="ss">
                  <Typo variant={'heading-sm'} className="mb-1">
                    피보험자정보
                  </Typo>
                  <TabPager
                    data={insuranceTabs}
                    active={leftTabActive}
                    setActive={setLeftTabActive}
                    getValue={(tab) => tab.value}
                    renderTab={(tab) => <span>{tab.label}</span>}
                    visibleCount={2}
                  >
                    {leftTabActive === 'human' ? (
                      <Gcol className="w-full">
                        <FormTable
                          caption="포인트정보"
                          lineTop={false}
                          cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}
                        >
                          <FormRow vertical={true}>
                            <FormCell title={'피보험자'}>김한화</FormCell>
                            <FormCell title={'연령'}>30</FormCell>
                            <FormCell title={'직업명'}>회사사무직종사자</FormCell>
                            <FormCell title={'급수'}>1급</FormCell>
                            <FormCell title={'보장P'} tdClassName="justify-end items-center">
                              0
                            </FormCell>
                          </FormRow>
                        </FormTable>
                        <FormTable
                          caption="담보"
                          lineTop={false}
                          cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}
                        >
                          <FormRow vertical={true}>
                            <FormCell title={'담보명'}></FormCell>
                            <FormCell title={'보험기간'}></FormCell>
                            <FormCell title={'납입기간'}></FormCell>
                            <FormCell title={'가입금액'}></FormCell>
                            <FormCell title={'보장P'} tdClassName="justify-end items-center"></FormCell>
                          </FormRow>
                        </FormTable>
                      </Gcol>
                    ) : (
                      <Gcol className="w-full">
                        <FormTable caption="포인트정보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto', 'w-auto']}>
                          <FormRow vertical={true}>
                            <FormCell title={'소유자'}>김한화</FormCell>
                            <FormCell title={'직업업종'}>30</FormCell>
                            <FormCell title={'급수'}>1급</FormCell>
                            <FormCell title={'보장P'} tdClassName="justify-end items-center">
                              0
                            </FormCell>
                          </FormRow>
                        </FormTable>
                        <FormTable caption="소재지" cols={['w-[14rem]', 'w-auto']}>
                          <FormRow>
                            <FormCell title={'소재지'}></FormCell>
                          </FormRow>
                        </FormTable>
                        <FormTable caption="담보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto']}>
                          <FormRow vertical={true}>
                            <FormCell title={'화재기본담보'}>김한화</FormCell>
                            <FormCell title={'가입금액'}>30</FormCell>
                            <FormCell title={'담보P'} tdClassName="justify-end items-center">
                              0
                            </FormCell>
                          </FormRow>
                        </FormTable>
                        <FormTable
                          caption="담보"
                          lineTop={false}
                          cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}
                        >
                          <FormRow vertical={true}>
                            <FormCell title={'화재특약담보'}>김한화</FormCell>
                            <FormCell title={'보험기간'}>30</FormCell>
                            <FormCell title={'납입기간'}></FormCell>
                            <FormCell title={'가입금액'}></FormCell>
                            <FormCell title={'담보P'} tdClassName="justify-end items-center">
                              0
                            </FormCell>
                          </FormRow>
                        </FormTable>
                      </Gcol>
                    )}
                  </TabPager>
                </Gcol>
              </Grow>
              <Grow className="w-full">
                {/* 인보험/물보험 TabPager 예시 */}
                <Gcol className="w-full" placement="ss">
                  <Typo variant={'heading-sm'} className="mb-1">
                    피보험자정보
                  </Typo>
                  <TabPager
                    data={insuranceTabs}
                    active={rightTabActive}
                    setActive={setRightTabActive}
                    getValue={(tab) => tab.value}
                    renderTab={(tab) => <span>{tab.label}</span>}
                    visibleCount={2}
                  >
                    {rightTabActive === 'human' ? (
                      <Gcol className="w-full">
                        <FormTable
                          caption="포인트정보"
                          lineTop={false}
                          cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}
                        >
                          <FormRow vertical={true}>
                            <FormCell title={'피보험자'}>김한화</FormCell>
                            <FormCell title={'연령'}>30</FormCell>
                            <FormCell title={'직업명'}>회사사무직종사자</FormCell>
                            <FormCell title={'급수'}>1급</FormCell>
                            <FormCell title={'보장P'} tdClassName="justify-end items-center">
                              0
                            </FormCell>
                          </FormRow>
                        </FormTable>
                        <FormTable
                          caption="담보"
                          lineTop={false}
                          cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}
                        >
                          <FormRow vertical={true}>
                            <FormCell title={'담보명'}></FormCell>
                            <FormCell title={'보험기간'}></FormCell>
                            <FormCell title={'납입기간'}></FormCell>
                            <FormCell title={'가입금액'}></FormCell>
                            <FormCell title={'보장P'} tdClassName="justify-end items-center"></FormCell>
                          </FormRow>
                        </FormTable>
                      </Gcol>
                    ) : (
                      <Gcol className="w-full">
                        <FormTable caption="포인트정보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto', 'w-auto']}>
                          <FormRow vertical={true}>
                            <FormCell title={'소유자'}>김한화</FormCell>
                            <FormCell title={'직업업종'}>30</FormCell>
                            <FormCell title={'급수'}>1급</FormCell>
                            <FormCell title={'보장P'} tdClassName="justify-end items-center">
                              0
                            </FormCell>
                          </FormRow>
                        </FormTable>
                        <FormTable caption="소재지" cols={['w-[14rem]', 'w-auto']}>
                          <FormRow>
                            <FormCell title={'소재지'}></FormCell>
                          </FormRow>
                        </FormTable>
                        <FormTable caption="담보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto']}>
                          <FormRow vertical={true}>
                            <FormCell title={'화재기본담보'}>김한화</FormCell>
                            <FormCell title={'가입금액'}>30</FormCell>
                            <FormCell title={'담보P'} tdClassName="justify-end items-center">
                              0
                            </FormCell>
                          </FormRow>
                        </FormTable>
                        <FormTable
                          caption="담보"
                          lineTop={false}
                          cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}
                        >
                          <FormRow vertical={true}>
                            <FormCell title={'화재특약담보'}>김한화</FormCell>
                            <FormCell title={'보험기간'}>30</FormCell>
                            <FormCell title={'납입기간'}></FormCell>
                            <FormCell title={'가입금액'}></FormCell>
                            <FormCell title={'담보P'} tdClassName="justify-end items-center">
                              0
                            </FormCell>
                          </FormRow>
                        </FormTable>
                      </Gcol>
                    )}
                  </TabPager>
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
