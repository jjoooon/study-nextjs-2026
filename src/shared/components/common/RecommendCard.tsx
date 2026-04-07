'use client';

import { Gcol, Grow, Grid, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { AiIcon } from '@icons';

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
          <AiIcon color={'#FFFFFF'} color2={'#FFFFFF'} />
          <Typo tag={'strong'} variant={'body-md'} weight={'bold'} className="text-white">
            AI 추천이유
          </Typo>
        </Grow>
      </Grid>
    </Gcol>
  );
}
