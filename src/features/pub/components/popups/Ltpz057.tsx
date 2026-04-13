'use client';

// React
import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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

export const Ltpz057 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

        <DialogSection className="grid-rows-[auto_1fr]">
          <FormTable caption="월클릭스켄" cols={['w-[16rem]', 'w-auto']}>
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
                  <Grow>
                    <Input
                      aria-label="가입업종"
                      width={160}
                      onChange={(e) => setFormField('type01', e.target.value)}
                      value={form.type01}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={200} value={'상품명 text'} readOnly />
                  </Grow>
                  <Grow>
                    <Checkbox size="md">
                      가입업종 외 건물 내 다른업종 없음
                    </Checkbox>
                  </Grow>
                </Gcol>
              </FormCell>
            </FormRow>
          </FormTable>

          <FormTable caption="월클릭스켄" cols={['w-[16rem]', 'w-auto']}>
            <FormRow>
              <FormCell
                title={
                  <Gcol className="items-start">
                    <b>주변업종</b>
                    <span className="font-normal">건물내 입주한 업종 모두 선택</span>
                  </Gcol>
                }
              >
                <Grid className="grid-cols-5 gap-x-4 gap-y-2">
                  <Checkbox size="md">
                    이용원, 미용원, 기타미용실
                  </Checkbox>
                  <Checkbox size="md">
                    학원(기관 및 교육목적)
                  </Checkbox>
                  <Checkbox size="md">
                    소형판매시설
                  </Checkbox>
                  <Checkbox size="md">
                    대형판매시설
                  </Checkbox>
                  <Checkbox size="md">
                    목욕탕
                  </Checkbox>
                  <Checkbox size="md">
                    여관, 여인숙, 유스호스텔
                  </Checkbox>
                  <Checkbox size="md">
                    금융업소, 부동산
                  </Checkbox>
                  <Checkbox size="md">
                    휴게음식점
                  </Checkbox>
                  <Checkbox size="md">
                    일반음식점
                  </Checkbox>
                  <Checkbox size="md">
                    오피스텔
                  </Checkbox>
                  <Checkbox size="md">
                    금속기계기구제조(금속가공)
                  </Checkbox>
                  <Checkbox size="md">
                    예식장, 장례식장
                  </Checkbox>
                  <Checkbox size="md">
                    공연장(극장, 영화관)
                  </Checkbox>
                  <Checkbox size="md">
                    사찰
                  </Checkbox>
                  <Checkbox size="md">
                    교회, 성당
                  </Checkbox>
                  <Checkbox size="md">
                    창고시설(보통품)
                  </Checkbox>
                  <Checkbox size="md">
                    목공, 목재가공
                  </Checkbox>
                  <Checkbox size="md">
                    비디오감상실 전화방
                  </Checkbox>
                  <Checkbox size="md">
                    단란주점
                  </Checkbox>
                  <Checkbox size="md">
                    유흥주점
                  </Checkbox>
                  <Checkbox size="md">
                    컴퓨터 게임장(전자오락실)
                  </Checkbox>
                  <Checkbox size="md">
                    직물재단 및 재봉
                  </Checkbox>
                  <Checkbox size="md">
                    세탁소(드라이클리닝)
                  </Checkbox>
                  <Checkbox size="md">
                    시장
                  </Checkbox>
                  <Checkbox size="md">
                    의원, 병원
                  </Checkbox>
                </Grid>
              </FormCell>
            </FormRow>
          </FormTable>
          <FormTable caption="월클릭스켄" cols={['w-[16rem]', 'w-auto']}>
            <FormRow>
              <FormCell
                title={
                  <Gcol className="items-start">
                    <b>주변업종 지접 찾기</b>
                    <span className="font-normal">주변업종 직접 검색 후 선택</span>
                  </Gcol>
                }
              >
                <Grid className="grid-cols-3 gap-x-6 gap-y-2">
                  <Grow>
                    <Checkbox size="md" aria-label="주변업종 선택"></Checkbox>
                    <Input
                      aria-label="주변업종 직접 검색"
                      width={160}
                      onChange={(e) => setFormField('type02', e.target.value)}
                      value={form.type02}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Grow>
                    <Checkbox size="md" aria-label="주변업종 선택"></Checkbox>
                    <Input
                      aria-label="주변업종 직접 검색"
                      width={160}
                      onChange={(e) => setFormField('type03', e.target.value)}
                      value={form.type03}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Grow>
                   <Checkbox size="md" aria-label="주변업종 선택"></Checkbox>
                    <Input
                      aria-label="주변업종 직접 검색"
                      width={160}
                      onChange={(e) => setFormField('type04', e.target.value)}
                      value={form.type04}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Grow>
                    <Checkbox size="md" aria-label="주변업종 선택"></Checkbox>
                    <Input
                      aria-label="주변업종 직접 검색"
                      width={160}
                      onChange={(e) => setFormField('type05', e.target.value)}
                      value={form.type05}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Grow>
                   <Checkbox size="md" aria-label="주변업종 선택"></Checkbox>
                    <Input
                      aria-label="주변업종 직접 검색"
                      width={160}
                      onChange={(e) => setFormField('type06', e.target.value)}
                      value={form.type06}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Grow>
                    <Checkbox size="md" aria-label="주변업종 선택"></Checkbox>
                    <Input
                      aria-label="주변업종 직접 검색"
                      width={160}
                      onChange={(e) => setFormField('type07', e.target.value)}
                      value={form.type07}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                </Grid>
              </FormCell>
            </FormRow>
          </FormTable>
          <FormTable caption="월클릭스켄" cols={['w-[16rem]', 'w-auto']}>
            <FormRow>
              <FormCell
                title={
                  <Gcol className="items-start">
                    <b>오율적용업종</b>
                  </Gcol>
                }
              >
                <Grow>
                  <Input
                    aria-label=""
                    width={'20rem'}
                    onChange={(e) => setFormField('type08', e.target.value)}
                    value={form.type08}
                  />
                </Grow>
              </FormCell>
            </FormRow>
          </FormTable>
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