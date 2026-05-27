/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo, Divider } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { SpinnerBIcon } from '@icons';

export type InfoContractBaseData = {
  date?: string;
  polName?: string;
  info?: string[];
  insName?: string;
  insAge?: string;
  insGender?: string;
  insGrade?: string;
  insuranceAgeDate?: string;
  consentEndDate?: string;
  note?: string;
  reviewType?: string;
  reviewStatus?: string;
  msg: string;
  notice: string;
};

interface InfoContractProps {
  info: InfoContractBaseData | null;
}

export function Ltpa35004Side({ info }: InfoContractProps) {
  if (info === null) {
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
      </Gcol>
    );
  }

  return (
    <Gcol className="w-full" gap={2}>
      <Gcol>
        <Grow gap={1.5} placement={'bwc'} className="overflow-hidden">
          <Typo variant={'heading-md'}>심사진행현황</Typo>
        </Grow>
        <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)] gap-2" placement={'ss'}>
          <BulletList className="w-full" type={'dot'} size={'xs'}>
            <BulletListItem>
              <Grow placement={'sc'}>
                <Typo variant="body-xs">설계심사</Typo>
                <Divider />
                <b className="text-[var(--color-gray-100)]">{info?.reviewType ?? '특인심사'}</b>
              </Grow>
            </BulletListItem>
            <BulletListItem>
              <Grow placement={'sc'}>
                <Typo variant="body-xs">심사상태</Typo>
                <Divider />
                <b className="text-[var(--color-gray-100)]">{info?.reviewStatus ?? '배정대기'}</b>
              </Grow>
            </BulletListItem>
            <BulletListItem>
              {(info?.msg ?? '[심사운용 시간 이후 요청]\n심사 자배정대기 중입니다.').split('\n').map((line, index) => (
                <span key={line + index}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
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
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  console.log('click');
                }}
                className="line-clamp-2 break-all cursor-pointer hover:underline"
              >
                {info?.notice}
              </div>
            </BulletListItem>
          </BulletList>
        </Gcol>
      </Gcol>
    </Gcol>
  );
}
