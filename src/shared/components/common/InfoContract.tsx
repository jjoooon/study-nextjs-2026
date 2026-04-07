'use client';

import { Gcol, Grow, Typo, Divider } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { SpinnerA } from '@common/Spinner';
import { CalendarIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import Link from 'next/link';

const Data = [
  {
    state: '공통',
    info: [
      { 설계유효기한: '2026-03-30', link: 'https://www.naver.com' },
      { 상령일: '2026-04-30(김한화)', link: 'https://www.naver.com' },
      { 동의종료일: '2026-04-30(김한화)', link: 'https://www.naver.com' },
      { 알림사항: '입력완료' },
    ],
  },
  {
    state: '간편설계',
    info: [
      { 설계유효기한: '2026-03-30', link: 'https://www.naver.com' },
      { 상령일: '2026-04-30(김한화)', link: 'https://www.naver.com' },
      { 동의종료일: '2026-04-30(김한화)', link: 'https://www.naver.com' },
      { 고지유형: '1형(일반고지형)' },
    ],
  },
  {
    state: '설계중',
    info: [
      { 설계유효기한: '2026-03-30', link: 'https://www.naver.com' },
      { 상령일: '2026-04-30' },
      { 동의종료일: '동의없음' },
      { 알림사항: '입력완료' },
      { 고지유형: '2형(3.10.5간편고지형(고혈압추가고지))' },
      { 모바일약관전송: 'X' },
      { 모바일약관수신: 'X' },
    ],
  },
];

export type InfoContractBaseData = {
  date: string;
  polName: string;
  insName: string;
  insAge: string;
  insGender: string;
  insGrade: string;
  info: string[];
  quoteExpiryDate: string;
  insuranceAgeDate: string;
  consentEndDate: string;
  note: string;
};

interface InfoContractProps<TData extends InfoContractBaseData = InfoContractBaseData> {
  data: TData;
}

export function InfoContract<TData extends InfoContractBaseData = InfoContractBaseData>({
  data,
}: InfoContractProps<TData>) {
  return (
    <Gcol className="w-full">
      <Grow gap={2} placement={'bwc'}>
        <Grow gap={1.5} placement={'bwc'} className="overflow-hidden">
          <Typo variant={'heading-md'}>계약정보</Typo>
          <Grow className="gap-[0.2rem]" placement={'cc'}>
            <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">
              설계중
            </Typo>
            <SpinnerA className="text-[var(--color-primary-50)]" />
          </Grow>
        </Grow>
      </Grow>

      <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)] gap-2" placement={'ss'}>
        <Gcol variant={'box-line'} className="w-full py-[0.6rem]! border-none! shadow-none!" placement={'ss'}>
          <Grow className="flex-1 text-[1.2rem] gap-[0.2rem]" placement={'bwc'}>
            <Grow>
              보험시기 {data.date} <CalendarIcon />
            </Grow>
            <Badge color={'red'} size={'md'} className="shrink-0">
              경과
            </Badge>
          </Grow>
          <div className="text-[1.2rem]">{Array.isArray(data.info) ? data.info.join('/') : data.info}</div>
        </Gcol>
        <Gcol className="w-full" placement={'ss'}>
          {/* 계약자,피보험자 */}
          <Grow placement={'sc'}>
            <Badge className="bg-[var(--color-blue-gray-50)] text-[var(--color-gray-0)] font-bold text-[1.1rem] indent-[-0.1rem]">
              계
            </Badge>
            <Typo variant={'body-sm'} weight="bold">
              {data.polName}
            </Typo>
          </Grow>
          <Grow placement={'sc'}>
            <Badge className="bg-[var(--color-blue-gray-50)] text-[var(--color-gray-0)] font-bold text-[1.1rem] indent-[-0.1rem]">
              피
            </Badge>
            <Typo variant={'body-sm'} weight="bold">
              {data.insName} {data.insAge}세({data.insGender}) {data.insGrade}
            </Typo>
          </Grow>

          {/* 계약 정보 */}
          <BulletList className="w-full" type={'dot'} size={'xs'}>
            <BulletListItem color={'warning'}>
              <Grow placement={'bwc'} className="w-full">
                <Grow placement={'sc'} className="text-[1.1rem]">
                  <Button variant="text" size={'xs'}>
                    설계유효기간
                  </Button>
                  <Divider />
                  2026-03-30
                </Grow>
                <Badge color={'red'} size={'md'} className="shrink-0">
                  임박
                </Badge>
              </Grow>
            </BulletListItem>
            <BulletListItem>
              <Grow placement={'bwc'} className="w-full">
                <Grow placement={'sc'} className="text-[1.1rem]">
                  <Button variant="text" size={'xs'} color={'gray'}>
                    상령일
                  </Button>
                  <Divider />
                  {data.insuranceAgeDate}
                </Grow>
                <Badge color={'red'} size={'md'} className="shrink-0">
                  임박
                </Badge>
              </Grow>
            </BulletListItem>
            <BulletListItem>
              <Grow placement={'bwc'} className="w-full">
                <Grow placement={'sc'} className="text-[1.1rem]">
                  <Button variant="text" size={'xs'} color={'gray'}>
                    동의종료일
                  </Button>
                  <Divider />
                  {data.consentEndDate}
                </Grow>
                <Badge color={'red'} size={'md'} className="shrink-0">
                  임박
                </Badge>
              </Grow>
            </BulletListItem>
            <BulletListItem>{data.note}</BulletListItem>
          </BulletList>
        </Gcol>
      </Gcol>
    </Gcol>
  );
}
