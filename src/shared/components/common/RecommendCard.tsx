'use client';

import { Gcol, Grow, Grid, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { AiIcon } from '@icons';
import { Button } from '../uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogTrigger,
} from '../uiux/Dialog';

export interface RecommendCardProps {
  /** 카드 제목 (상품명 등) */
  title: string;
  /** 플랜 정보 */
  plan: string;
  /** 기간 정보 */
  term: string;
  /** 상세 내용 (BulletListItem에 표시) */
  detail: string;
}

export function RecommendCard({ title, plan, term, detail }: RecommendCardProps) {
  return (
    <Gcol className="relative p-px w-full rounded-[0.8rem] bg-linear-to-b from-[#E5E5E5] from-[47.33%] to-[#61554F] to-100%">
      <Grid className="bg-[#817772] rounded-[0.8rem] grid-rows-[1fr_auto] w-full">
        <Gcol
          className="bg-white rounded-[0.8rem] w-full h-[16.3rem] py-[2rem] px-[1.6rem] shadow-[-3px_4px_6px_0_rgba(0,0,0,0.20)]"
          placement="ss"
          gap={2}
        >
          <Gcol className="w-full" gap={0.5} placement={'ss'}>
            <Typo tag={'strong'} variant={'body-xl'}>
              {title}
            </Typo>
            <Typo tag={'p'} variant={'body-xs'} className="text-[#414141]">
              {plan}
            </Typo>
            <Typo tag={'p'} variant={'body-xs'} className="text-[#414141]">
              {term}
            </Typo>
          </Gcol>
          <Grow className="w-full rounded-[0.8rem] bg-[#F4F4F4] px-[1rem] py-[1rem]" placement="sc">
            <BulletList>
              <BulletListItem size={'sm'} type="dotBig">
                {detail}
              </BulletListItem>
            </BulletList>
          </Grow>
        </Gcol>
        <Grow className="w-full h-[3.7rem]" placement="cc">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                color="primary"
                className="text-white font-bold"
                onClick={() => {}}
                only="default"
                size="lg"
                variant="none"
              >
                <AiIcon color={'#FFFFFF'} color2={'#FFFFFF'} />
                AI 추천이유
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton resizable={false} size="md">
              <DialogHeader>
                <DialogTitle>제목</DialogTitle>
              </DialogHeader>

              <DialogSection className="p-0 flex items-center justify-center">
                <div className="relative w-[50rem] h-[19rem] bg-[url('/images/Ltpa005/ai_box_img.jpg')] bg-cover bg-center bg-no-repeat bg-[length:50.6rem_18.8rem]!">
                  <Typo tag={'p'} variant={'body-lg'} className="w-[33rem] absolute right-[1rem] top-[1rem]">
                    고객님의 보장 내용을 분석해보니 암, 뇌질환, 수술, 치료비 담보가 동일 연령대 대비 다소 부족한 것으로
                    확인됩니다.
                    <br />
                    <br /> 목표 보험료 범위 내에서 주요 담보를 평균 수준으로 보완해 설계를 조정했습니다.
                    <br />
                    <br /> 현재 조건에서 보장과 보험료 균형을 고려한 추천설계입니다.
                  </Typo>
                </div>
              </DialogSection>
              <DialogFooter>
                <Gcol className="w-full" gap={0}>
                  <Grow placement={'ec'} gap={2} className="w-full pb-5 px-6">
                    <Grow>
                      <DialogClose asChild>
                        <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                          닫기
                        </Button>
                      </DialogClose>
                    </Grow>
                  </Grow>
                </Gcol>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Grow>
      </Grid>
    </Gcol>
  );
}
