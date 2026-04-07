'use client';

// React
import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
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
                      aria-label=""
                      width={'16rem'}
                      onChange={(e) => setFormField('type01', e.target.value)}
                      value={form.type01}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={'20rem'} value={'상품명 text'} readOnly />
                  </Grow>
                  <Grow>
                    <Checkbox
                      color="primary"
                      errorMsg="선택은 필수입니다."
                      errorPs="bl"
                      onCheckedChange={() => {}}
                      size="md"
                      variant="default"
                    >
                      가입업종 외 건물 내 다른업종 없음{' '}
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
                <div className="grid grid-cols-5 gap-x-4 gap-y-2">
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    이용원, 미용원, 기타미용실
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    학원(기관 및 교육목적)
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    소형판매시설
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    대형판매시설
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    목욕탕
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    여관, 여인숙, 유스호스텔
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    금융업소, 부동산
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    휴게음식점
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    일반음식점
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    오피스텔
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    금속기계기구제조(금속가공)
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    예식장, 장례식장
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    공연장(극장, 영화관)
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    사찰
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    교회, 성당
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    창고시설(보통품)
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    목공, 목재가공
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    비디오감상실 전화방
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    단란주점
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    유흥주점
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    컴퓨터 게임장(전자오락실)
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    직물재단 및 재봉
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    세탁소(드라이클리닝)
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    시장
                  </Checkbox>
                  <Checkbox color="primary" onCheckedChange={() => {}} size="md" variant="default">
                    의원, 병원
                  </Checkbox>
                </div>
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
                <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                  <Grow>
                    <Checkbox
                      className=""
                      color="primary"
                      onCheckedChange={() => {}}
                      size="md"
                      variant="noneText"
                    ></Checkbox>
                    <Input
                      aria-label=""
                      width={'16rem'}
                      onChange={(e) => setFormField('type02', e.target.value)}
                      value={form.type02}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Grow>
                    <Checkbox
                      className=""
                      color="primary"
                      onCheckedChange={() => {}}
                      size="md"
                      variant="noneText"
                    ></Checkbox>
                    <Input
                      aria-label=""
                      width={'16rem'}
                      onChange={(e) => setFormField('type03', e.target.value)}
                      value={form.type03}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Grow>
                    <Checkbox
                      className=""
                      color="primary"
                      onCheckedChange={() => {}}
                      size="md"
                      variant="noneText"
                    ></Checkbox>
                    <Input
                      aria-label=""
                      width={'16rem'}
                      onChange={(e) => setFormField('type04', e.target.value)}
                      value={form.type04}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Grow>
                    <Checkbox
                      className=""
                      color="primary"
                      onCheckedChange={() => {}}
                      size="md"
                      variant="noneText"
                    ></Checkbox>
                    <Input
                      aria-label=""
                      width={'16rem'}
                      onChange={(e) => setFormField('type05', e.target.value)}
                      value={form.type05}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Grow>
                    <Checkbox
                      className=""
                      color="primary"
                      onCheckedChange={() => {}}
                      size="md"
                      variant="noneText"
                    ></Checkbox>
                    <Input
                      aria-label=""
                      width={'16rem'}
                      onChange={(e) => setFormField('type06', e.target.value)}
                      value={form.type06}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                  <Grow>
                    <Checkbox
                      className=""
                      color="primary"
                      onCheckedChange={() => {}}
                      size="md"
                      variant="noneText"
                    ></Checkbox>
                    <Input
                      aria-label=""
                      width={'16rem'}
                      onChange={(e) => setFormField('type07', e.target.value)}
                      value={form.type07}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                </div>
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

export default LTPZ057;
