'use client';

import { Gcol, Grow, Typo, Divider } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import {
  CalendarIcon,
  SpinnerBIcon,
  InputClearIcon,
  CircleCheckIcon,
  AppliedIcon,
  ApprovedIcon,
  PaidIcon,
} from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';

export type InfoContractBaseData = {
  date: string;
  polName: string;
  insName: string;
  insAge: string;
  insGender: string;
  insGrade: string;
  info?: string[];
  quoteExpiryDate: string;
  insuranceAgeDate: string;
  consentEndDate: string;
  note: string;
  docPrint: boolean;
  docScan: boolean;
  eGuideDiscount: number[];
  noticeType?: string;
  diseaseCount?: number;
  reviewers?: Array<[string, string]>;
  systemCount?: number;
};

interface InfoContractProps<TData extends InfoContractBaseData = InfoContractBaseData> {
  info: TData | null;
}

// Ltpa35001, Ltpa35002, Ltpa35005, Ltpa35006 공통으로 사용
export function Ltpa350Side<TData extends InfoContractBaseData = InfoContractBaseData>({
  info,
}: InfoContractProps<TData>) {
  // Ltpa35001
  if (info === null) {
    return (
      <Gcol>
        <Grow gap={2} placement={'bwc'}>
          <Grow gap={1.5} placement={'bwc'} className="overflow-hidden px-1">
            <Typo variant={'heading-md'}>계약정보</Typo>
            <Grow className="gap-[0.2rem]" placement={'cc'}>
              <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">
                설계중
              </Typo>
              <SpinnerBIcon className="text-[var(--color-blue-gray-50)]" />
            </Grow>
          </Grow>
        </Grow>
        <Grow gap={2} placement={'bwc'}>
          <Grow gap={1.5} placement={'bwc'} className="overflow-hidden px-1">
            <Typo variant={'heading-md'}>계약정보</Typo>
            <Grow className="gap-[0.2rem]" placement={'cc'}>
              <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">
                간편설계
              </Typo>
              <SpinnerBIcon className="text-[var(--color-blue-gray-50)]" />
            </Grow>
          </Grow>
        </Grow>
        <Grow gap={2} placement={'bwc'}>
          <Grow gap={1.5} placement={'bwc'} className="overflow-hidden px-1">
            <Typo variant={'heading-md'}>계약정보</Typo>
            <Grow className="gap-[0.2rem]" placement={'cc'}>
              <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">
                청약완료
              </Typo>
              <AppliedIcon className="text-[var(--color-blue-gray-50)]" />
            </Grow>
          </Grow>
        </Grow>
        <Grow gap={2} placement={'bwc'}>
          <Grow gap={1.5} placement={'bwc'} className="overflow-hidden px-1">
            <Typo variant={'heading-md'}>계약정보</Typo>
            <Grow className="gap-[0.2rem]" placement={'cc'}>
              <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">
                심사완료
              </Typo>
              <ApprovedIcon className="text-[var(--color-blue-gray-50)]" />
            </Grow>
          </Grow>
        </Grow>
        <Grow gap={2} placement={'bwc'}>
          <Grow gap={1.5} placement={'bwc'} className="overflow-hidden px-1">
            <Typo variant={'heading-md'}>계약정보</Typo>
            <Grow className="gap-[0.2rem]" placement={'cc'}>
              <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">
                수납완료
              </Typo>
              <PaidIcon className="text-[var(--color-blue-gray-50)]" />
            </Grow>
          </Grow>
        </Grow>
        <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)]" placement={'ss'}>
          <Typo variant={'body-sm'} className="text-[var(--color-text-subtle)]">
            등록된 계약정보가 없습니다.
          </Typo>
        </Gcol>
      </Gcol>
    );
  }
  return (
    <Gcol gap={2}>
      <Grow className="w-full px-1" placement={'bwc'}>
        <Button variant={'text'} color={'gray'} onClick={() => {}}>
          <Typo variant={'heading-md'}>누전사전예외</Typo>
        </Button>
        <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">
          {'12'}건
        </Typo>
      </Grow>

      <Gcol>
        <Grow gap={2} placement={'bwc'}>
          <Grow gap={1.5} placement={'bwc'} className="overflow-hidden px-1">
            <Typo variant={'heading-md'}>계약정보</Typo>
            <Grow className="gap-[0.2rem]" placement={'cc'}>
              <Typo variant={'body-sm'} className="font-bold text-[var(--color-blue-gray-50)]">
                설계중
              </Typo>
              <SpinnerBIcon className="text-[var(--color-blue-gray-50)]" />
            </Grow>
          </Grow>
        </Grow>
        <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)]" gap={2} placement={'ss'}>
          <Gcol variant={'box-line'} className="w-full py-[0.6rem]! border-none! shadow-none!" placement={'ss'}>
            <Grow className="flex-1 text-[1.2rem] gap-[0.2rem]" placement={'bwc'}>
              <Grow>
                보험시기 {info.date} <CalendarIcon color={'var(--color-blue-gray-50)'} />
              </Grow>
              {
                <Badge color="red" size="md" className="shrink-0">
                  경과
                </Badge>
              }
            </Grow>
            {/* <div className="text-[1.2rem]">{Array.isArray(data.info) ? data.info.join('/') : data.info}</div> */}
          </Gcol>
          <Gcol className="w-full" placement={'ss'}>
            {/* 계약자,피보험자 */}
            <Grow placement={'sc'}>
              <Badge className="bg-[var(--color-blue-gray-50)] text-[var(--color-gray-0)] font-bold text-[1.1rem] indent-[-0.1rem]">
                계
              </Badge>
              <Typo variant={'body-sm'} weight="bold">
                {info.polName}
              </Typo>
            </Grow>
            <Grow placement={'sc'}>
              <Badge className="bg-[var(--color-blue-gray-50)] text-[var(--color-gray-0)] font-bold text-[1.1rem] indent-[-0.1rem]">
                피
              </Badge>
              <Typo variant={'body-sm'} weight="bold">
                {info.insName} {info.insAge}세({info.insGender}) {info.insGrade}
              </Typo>
            </Grow>

            {/* 계약 정보 */}
            <BulletList className="w-full" type={'dot'} size={'xs'}>
              <BulletListItem color={'warning'}>
                <Grow placement={'bwc'} className="w-full">
                  <Grow placement={'sc'}>
                    <Button variant="text" size={'xs'}>
                      설계유효기간
                    </Button>
                    <Divider />
                    {info.quoteExpiryDate}
                  </Grow>
                  {
                    <Badge color="red" size="md" className="shrink-0">
                      임박
                    </Badge>
                  }
                </Grow>
              </BulletListItem>
              <BulletListItem>
                <Grow placement={'bwc'} className="w-full">
                  <Grow placement={'sc'}>
                    <Button variant="text" size={'xs'} color={'gray'}>
                      상령일
                    </Button>
                    <Divider />
                    {info.insuranceAgeDate}
                  </Grow>
                  {
                    <Badge color="red" size="md" className="shrink-0">
                      임박
                    </Badge>
                  }
                </Grow>
              </BulletListItem>
              <BulletListItem>
                <Grow placement={'bwc'} className="w-full">
                  <Grow placement={'sc'}>
                    <Button variant="text" size={'xs'} color={'gray'}>
                      동의종료일
                    </Button>
                    <Divider />
                    {info.consentEndDate}
                  </Grow>
                  {
                    <Badge color="red" size="md" className="shrink-0">
                      임박
                    </Badge>
                  }
                </Grow>
              </BulletListItem>
              <BulletListItem>알릴사항 비대상</BulletListItem>
            </BulletList>

            <Divider dir="row" className="w-full my-[0.6rem]" />
            <BulletList className="w-full" type={'dot'} size={'xs'}>
              <BulletListItem>
                <Grow placement={'bwc'} className="w-full">
                  <Grow placement={'sc'}>
                    <Typo variant={'body-xs'}>청약서류 출력</Typo>
                    <Divider />
                    {info.docPrint ? (
                      <CircleCheckIcon size={14} />
                    ) : (
                      <InputClearIcon color={'var(--color-danger-50)'} size={14} />
                    )}
                  </Grow>
                </Grow>
              </BulletListItem>
              <BulletListItem>
                <Grow placement={'bwc'} className="w-full">
                  <Grow placement={'sc'}>
                    <Typo variant={'body-xs'}>청약서류 스캔</Typo>
                    <Divider />
                    {info.docScan ? (
                      <CircleCheckIcon size={14} />
                    ) : (
                      <InputClearIcon color={'var(--color-danger-50)'} size={14} />
                    )}
                  </Grow>
                </Grow>
              </BulletListItem>
              <BulletListItem>
                <Grow placement={'ss'} className="w-full items-baseline">
                  <Typo tag="div" variant={'body-xs'} className="white-space-nowrap">
                    전자적안내동의할인
                  </Typo>
                  <Divider />
                  <Gcol className="w-auto" placement={'ss'}>
                    <Button variant="text" size={'xs'} color={'gray'}>
                      {info.eGuideDiscount[0].toLocaleString()}원
                    </Button>
                    <Button variant="text" size={'xs'} color={'gray'}>
                      {info.eGuideDiscount[1].toLocaleString()}원
                    </Button>
                  </Gcol>
                </Grow>
              </BulletListItem>
            </BulletList>
          </Gcol>
        </Gcol>
      </Gcol>
    </Gcol>
  );
}
