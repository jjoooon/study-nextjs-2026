'use client';

import { BulletList, BulletListItem, Gcol, Grow, Typo, SpinnerA } from '@/shared/components/common';
import type { LTRA350DataType } from '@/features/pub/proto/data/LTRA350Data';
import { NewPopupIcon, CalendarIcon } from '@/shared/components/icons';
import { Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/uiux';
import { LayoutScrollWrap, LayoutScrollItem } from '../layout';
import { QuickLinks } from './QuickLinks';
import Link from "next/link"

export default function AsideBody({ data }: { data: LTRA350DataType['aside'] }) {
  const info = data?.simpleContractInfo;
  return (
    <LayoutScrollWrap>
      <LayoutScrollItem>
        <Gcol className="gap-2 w-full pb-[4.9rem]" placement="ss">
          <Grow className="gap-2" placement="bwc">
            <Button variant="banner" className="w-full justify-between!">
              인수지침 점검
              <NewPopupIcon />
            </Button>
          </Grow>

          <Gcol className="w-full gap-1">
            <Grow className="gap-2" placement="bwc">
              <Typo variant="heading-md">설계정보</Typo>
              <Grow className="gap-[0.2rem]" placement="cc">
                  <SpinnerA className="text-[var(--color-primary-50)]" />
                  <Typo variant="body-md" className="text-[var(--color-danger-40)]">설계중</Typo>
              </Grow>
            </Grow>
            <Gcol variant="box-line" className="w-full bg-[var(--color-coolgray-10)] gap-2" placement="ss">
              <Gcol variant="box-line" className="w-full gap-1 py-[0.6rem]! border-none! shadow-none!" placement="ss">
                <BulletList className="pt-[0.4rem]">
                  <BulletListItem type="dot" size="sm">
                    <Grow className="flex-1 text-[1.2rem] gap-[0.2rem]" placement="bwc">
                      <Grow className="gap-1">보험시기 {info?.date} <CalendarIcon /></Grow>
                      <Badge color="red" size="sm" className="shrink-0">경과</Badge>
                    </Grow>
                  </BulletListItem>
                  <BulletListItem className="text-[1.2rem]" type="dot" size="sm">{Array.isArray(info?.info) ? info.info.join('/') : info?.info}</BulletListItem>
                </BulletList>
              </Gcol>
              <Gcol className="gap-1 w-full" placement="ss">
                <Grow className="gap-1" placement="sc">
                    <Badge className="bg-[var(--color-coolgray-50)] text-[var(--color-gray-0)] font-bold text-[1.1rem] indent-[-0.1rem]">계</Badge>
                    <Typo variant="body-sm" weight="bold">{info?.polName}</Typo>
                  </Grow>
                  <Grow className="gap-1" placement="sc">
                    <Badge className="bg-[var(--color-coolgray-50)] text-[var(--color-gray-0)] font-bold text-[1.1rem] indent-[-0.1rem]">피</Badge>
                    <Typo variant="body-sm" weight="bold">{info?.insName} {info?.insAge}세({info?.insGender}) {info?.insGrade}</Typo>
                  </Grow>
                <BulletList className="w-full">
                  <BulletListItem type="dot" size="sm" className="text-[var(--color-danger-50)] w-full">
                    <Grow placement="bwc" className="gap-1 w-full">
                      <Grow placement="sc">
                        설계유효기간
                        <span className="inline-block text-[var(--color-gray-15)] text-[0.8rem] px-[.4rem] -translate-y-[0.1rem]">|</span>
                        {info?.quoteExpiryDate}
                      </Grow>
                      <Badge color="red" size="sm" className="shrink-0">임박</Badge>
                    </Grow>
                  </BulletListItem>
                  <BulletListItem type="dot" size="sm" className="w-full">
                    <Grow placement="bwc" className="gap-1 w-full">
                      <Grow placement="sc">
                        <Button asChild variant="text" className="h-auto p-0 text-[#000] text-[1.1rem] underline" size="sm">
                          <Link href="/">상령일</Link>
                        </Button>
                        <span className="inline-block text-[var(--color-gray-15)] text-[0.8rem] px-[.4rem] -translate-y-[0.1rem]">|</span>
                        {info?.insuranceAgeDate}
                      </Grow>
                      <Badge color="red" size="sm"  className="shrink-0">임박</Badge>
                    </Grow>
                  </BulletListItem>
                  <BulletListItem type="dot" size="sm" className="w-full">
                    <Grow placement="bwc" className="gap-1 w-full">
                      <Grow placement="sc">
                        <Button asChild variant="text" className="h-auto p-0 text-[#000] text-[1.1rem] underline" size="sm">
                          <Link href="/">동의종료일</Link>
                        </Button>
                        <span className="inline-block text-[var(--color-gray-15)] text-[0.8rem] px-[.4rem] -translate-y-[0.1rem]">|</span>
                        {info?.consentEndDate}
                      </Grow>
                      <Badge color="red" size="sm" className="shrink-0">임박</Badge>
                    </Grow>
                  </BulletListItem>
                  <BulletListItem type="dot" size="sm">{info?.note}</BulletListItem>
                </BulletList>
              </Gcol>
            </Gcol>
          </Gcol>

          <QuickLinks />
        </Gcol>
      </LayoutScrollItem>
    </LayoutScrollWrap>
  );
}
