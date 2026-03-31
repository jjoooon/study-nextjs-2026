'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { SpinnerA } from '@common/Spinner';
import { CalendarIcon } from '@icons';
import Link from 'next/link';

import { Button } from '@uiux/Button';
import { Badge } from '@uiux/Badge';

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

export function InfoContract<TData extends InfoContractBaseData = InfoContractBaseData>({ data }: InfoContractProps<TData>) {
  return (
    <Gcol className="w-full">
      <Grow gap={2} placement={'bwc'}>
        <Grow gap={1.5} placement={'bwc'}>
          <Typo variant={'heading-md'}>계약정보</Typo>
          <Grow className="gap-[0.2rem]" placement={'cc'}>
            <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">설계중</Typo>
            <SpinnerA className="text-[var(--color-primary-50)]" />
          </Grow>
        </Grow>
      </Grow>

      <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)] gap-2" placement={'ss'}>
        <Gcol variant={'box-line'} className="w-full py-[0.6rem]! border-none! shadow-none!" placement={'ss'}>
          <BulletList className="pt-[0.4rem]">
            <BulletListItem type={'dot'} size={'sm'}>
              <Grow className="flex-1 text-[1.2rem] gap-[0.2rem]" placement={'bwc'}>
                <Grow>보험시기 {data.date} <CalendarIcon /></Grow>
                <Badge color={'red'} size={'sm'} className="shrink-0">경과</Badge>
              </Grow>
            </BulletListItem>
            <BulletListItem className="text-[1.2rem]" type={'dot'} size={'sm'}>
              {Array.isArray(data.info) ? data.info.join('/') : data.info}
            </BulletListItem>
          </BulletList>
        </Gcol>
        <Gcol className="w-full" placement={'ss'}>
          <Grow placement={'sc'}>
              <Badge className="bg-[var(--color-blue-gray-50)] text-[var(--color-gray-0)] font-bold text-[1.1rem] indent-[-0.1rem]">계</Badge>
              <Typo variant={'body-sm'} weight="bold">{data.polName}</Typo>
            </Grow>
            <Grow placement={'sc'}>
              <Badge className="bg-[var(--color-blue-gray-50)] text-[var(--color-gray-0)] font-bold text-[1.1rem] indent-[-0.1rem]">피</Badge>
              <Typo variant={'body-sm'} weight="bold">
                {data.insName} {data.insAge}세({data.insGender}) {data.insGrade}
              </Typo>
            </Grow>
          <BulletList className="w-full">
            <BulletListItem type={'dot'} size={'sm'} className="text-[var(--color-danger-50)] w-full">
              <Grow placement={'bwc'} className="w-full">
                <Grow placement={'sc'}>
                  설계유효기간
                  <span className="inline-block text-[var(--color-gray-15)] text-[0.8rem] px-[.4rem] -translate-y-[0.1rem]">|</span>
                  {data.quoteExpiryDate}
                </Grow>
                <Badge color={'red'} size={'sm'} className="shrink-0">임박</Badge>
              </Grow>
            </BulletListItem>
            <BulletListItem type={'dot'} size={'sm'} className="w-full">
              <Grow placement={'bwc'} className="w-full">
                <Grow placement={'sc'}>
                  <Button asChild variant="text" className="h-auto p-0 text-[#000] text-[1.1rem] underline" size={'sm'}>
                    <Link href="/">상령일</Link>
                  </Button>
                  <span className="inline-block text-[var(--color-gray-15)] text-[0.8rem] px-[.4rem] -translate-y-[0.1rem]">|</span>
                  {data.insuranceAgeDate}
                </Grow>
                <Badge color={'red'} size={'sm'}  className="shrink-0">임박</Badge>
              </Grow>
            </BulletListItem>
            <BulletListItem type={'dot'} size={'sm'} className="w-full">
              <Grow placement={'bwc'} className="w-full">
                <Grow placement={'sc'}>
                  <Button asChild variant="text" className="h-auto p-0 text-[#000] text-[1.1rem] underline" size={'sm'}>
                    <Link href="/">동의종료일</Link>
                  </Button>
                  <span className="inline-block text-[var(--color-gray-15)] text-[0.8rem] px-[.4rem] -translate-y-[0.1rem]">|</span>
                  {data.consentEndDate}
                </Grow>
                <Badge color={'red'} size={'sm'} className="shrink-0">임박</Badge>
              </Grow>
            </BulletListItem>
            <BulletListItem type={'dot'} size={'sm'}>{data.note}</BulletListItem>
          </BulletList>
        </Gcol>
      </Gcol>
    </Gcol>
  );
}
