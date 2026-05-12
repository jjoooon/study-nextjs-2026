/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo, Divider } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { CalendarIcon } from '@icons';
import { SpinnerBIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';

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
  data: TData | null;
  extraContent?: React.ReactNode;
}

export function InfoContract<TData extends InfoContractBaseData = InfoContractBaseData>({
  data,
  extraContent,
}: InfoContractProps<TData>) {
  if (extraContent) {
    return (
      <Gcol className="w-full" gap={2}>
        <Gcol>
          <Grow gap={1.5} placement={'bwc'} className="overflow-hidden">
            <Typo variant={'heading-md'}>심사진행현황</Typo>
          </Grow>
          <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)] gap-2" placement={'ss'}>
            <BulletList className="w-full" type={'dot'} size={'xs'}>
              <BulletListItem>
                설계심사 <Divider /> <b className="text-[var(--color-gray-100)]">특인심사</b>
              </BulletListItem>
              <BulletListItem>
                심사상태 <Divider /> <b className="text-[var(--color-gray-100)]">배정대기</b>
              </BulletListItem>
              <BulletListItem>
                [심사운용 시간 이후 요청]
                <br />
                심사 자배정대기 중입니다.
              </BulletListItem>
            </BulletList>
          </Gcol>
        </Gcol>
        <Gcol>
          <Grow gap={1.5} placement={'bwc'} className="overflow-hidden">
            <Typo variant={'heading-md'}>인수/심사공지</Typo>
          </Grow>
          <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)] gap-2" placement={'ss'}>
            <BulletList className="w-full" type={'dot'} size={'xs'}>
              <BulletListItem>
                3월 질병 심사기준 안내
                <br />
                두줄까지 공지사항제목 노출
              </BulletListItem>
            </BulletList>
          </Gcol>
        </Gcol>
      </Gcol>
    );
  }

  if (data === null) {
    return (
      <Gcol className="w-full">
        <Grow gap={2} placement={'bwc'}>
          <Grow gap={1.5} placement={'bwc'} className="overflow-hidden">
            <Typo variant={'heading-md'}>계약정보</Typo>
            <Grow className="gap-[0.2rem]" placement={'cc'}>
              <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">
                설계중
              </Typo>
              <SpinnerBIcon className="text-[var(--color-blue-gray-50)]" />
            </Grow>
          </Grow>
        </Grow>

        <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)] gap-2" placement={'ss'}>
          <Typo variant={'body-sm'} className="text-[var(--color-text-subtle)]">
            등록된 계약정보가 없습니다.
          </Typo>
        </Gcol>
      </Gcol>
    );
  }

  return (
    <Gcol className="w-full">
      <Grow gap={2} placement={'bwc'}>
        <Grow gap={1.5} placement={'bwc'} className="overflow-hidden">
          <Typo variant={'heading-md'}>계약정보</Typo>
          <Grow className="gap-[0.2rem]" placement={'cc'}>
            <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">
              설계중
            </Typo>
            <SpinnerBIcon className="text-[var(--color-blue-gray-50)]" />
          </Grow>
        </Grow>
      </Grow>

      <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)] gap-2" placement={'ss'}>
        <Gcol variant={'box-line'} className="w-full py-[0.6rem]! border-none! shadow-none!" placement={'ss'}>
          <Grow className="flex-1 text-[1.2rem] gap-[0.2rem]" placement={'bwc'}>
            <Grow>
              보험시기 {data.date} <CalendarIcon color={'var(--color-blue-gray-50)'} />
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
