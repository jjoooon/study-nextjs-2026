/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

// React
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
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

const Ltpz057 = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              업종선택
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ057)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          {/* 2026-05-21 */}
          <TableFold variant="accordion" className="grid grid-rows-[auto_1fr]">
            <TableFoldHead title={'업종선택'}>
              <Grow>
                <Button color="gray" onClick={() => {}} variant="outlined">
                  업종선택가이드
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <FormTable cols={['w-[15rem]', 'w-auto']}>
                <FormRow>
                  <FormCell
                    title={
                      <Gcol className="items-start">
                        <b>가입업종</b>
                        <span className="font-normal">실제가입하는 업종 입력</span>
                      </Gcol>
                    }
                  >
                    <Gcol placement="ss" gap={2}>
                      <Grid className="grid-cols-[auto_auto_1fr] w-full">
                        <Input aria-label="가입업종" width={160} value={''} />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                        <Input aria-label="" value={'상품명 text'} readOnly />
                      </Grid>
                      <Grow>
                        <Checkbox>가입업종 외 건물 내 다른업종 없음</Checkbox>
                      </Grow>
                    </Gcol>
                  </FormCell>
                </FormRow>
              </FormTable>
              <FormTable cols={['w-[15rem]', 'w-auto']}>
                <FormRow>
                  <FormCell
                    title={
                      <Gcol className="items-start">
                        <b>주변업종</b>
                        <span className="font-normal">건물내 입주한 업종 모두 선택</span>
                      </Gcol>
                    }
                  >
                    <CheckboxGroup
                      errorMsg="2개 이상 선택해 주세요."
                      errorPs="bl"
                      minSelected={2}
                      defaultValue={['Industry2', 'Industry4']}
                    >
                      <Grid className="grid-cols-[1.2fr_1fr_1fr_1fr_1fr] gap-x-4 gap-y-2 w-full">
                        {[
                          { value: 'Industry1', label: '이용원, 미용원, 기타미용실' },
                          { value: 'Industry2', label: '학원(기관 및 교육목적)' },
                          { value: 'Industry3', label: '소형판매시설' },
                          { value: 'Industry4', label: '대형판매시설' },
                          { value: 'Industry5', label: '목욕탕' },
                          { value: 'Industry6', label: '여관, 여인숙, 유스호스텔' },
                          { value: 'Industry7', label: '금융업소, 부동산' },
                          { value: 'Industry8', label: '휴게음식점' },
                          { value: 'Industry9', label: '일반음식점' },
                          { value: 'Industry10', label: '오피스텔' },
                          { value: 'Industry11', label: '금속기계기구제조(금속가공)' },
                          { value: 'Industry12', label: '예식장, 장례식장' },
                          { value: 'Industry13', label: '공연장(극장, 영화관)' },
                          { value: 'Industry14', label: '사찰' },
                          { value: 'Industry15', label: '교회, 성당' },
                          { value: 'Industry16', label: '창고시설(보통품)' },
                          { value: 'Industry17', label: '목공, 목재가공' },
                          { value: 'Industry18', label: '비디오감상실 전화방' },
                          { value: 'Industry19', label: '단란주점' },
                          { value: 'Industry20', label: '유흥주점' },
                          { value: 'Industry21', label: '컴퓨터 게임장(전자오락실)' },
                          { value: 'Industry22', label: '직물재단 및 재봉' },
                          { value: 'Industry23', label: '세탁소(드라이클리닝)' },
                          { value: 'Industry24', label: '시장' },
                          { value: 'Industry25', label: '의원, 병원' },
                        ].map((item) => (
                          <CheckboxGroupItem value={item.value} key={item.value}>
                            {item.label}
                          </CheckboxGroupItem>
                        ))}
                      </Grid>
                    </CheckboxGroup>
                  </FormCell>
                </FormRow>
              </FormTable>
              <FormTable cols={['w-[15rem]', 'w-auto']}>
                <FormRow>
                  <FormCell
                    title={
                      <Gcol className="items-start">
                        <b>주변업종 지접 찾기</b>
                        <span className="font-normal">주변업종 직접 검색 후 선택</span>
                      </Gcol>
                    }
                  >
                    <Grid className="grid-cols-[1fr_1fr_1fr] gap-x-6 gap-y-2 w-full">
                      <Grid className="grid-cols-[auto_1fr_auto]">
                        <Checkbox aria-label="주변업종 선택"></Checkbox>
                        <Input aria-label="주변업종 직접 검색" />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </Grid>
                      <Grid className="grid-cols-[auto_1fr_auto]">
                        <Checkbox aria-label="주변업종 선택"></Checkbox>
                        <Input aria-label="주변업종 직접 검색" />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </Grid>
                      <Grid className="grid-cols-[auto_1fr_auto]">
                        <Checkbox aria-label="주변업종 선택"></Checkbox>
                        <Input aria-label="주변업종 직접 검색" />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </Grid>
                      <Grid className="grid-cols-[auto_1fr_auto]">
                        <Checkbox aria-label="주변업종 선택"></Checkbox>
                        <Input aria-label="주변업종 직접 검색" />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </Grid>
                      <Grid className="grid-cols-[auto_1fr_auto]">
                        <Checkbox aria-label="주변업종 선택"></Checkbox>
                        <Input aria-label="주변업종 직접 검색" />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </Grid>
                      <Grid className="grid-cols-[auto_1fr_auto]">
                        <Checkbox aria-label="주변업종 선택"></Checkbox>
                        <Input aria-label="주변업종 직접 검색" />
                        <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                          <SearchIcon color={'var(--color-primary-50)'} />
                        </Button>
                      </Grid>
                    </Grid>
                  </FormCell>
                </FormRow>
              </FormTable>
              <FormTable caption="월클릭스켄" cols={['w-[15rem]', 'w-auto']}>
                <FormRow>
                  <FormCell title="오율적용업종">
                    <Input />
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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

export default Ltpz057;
