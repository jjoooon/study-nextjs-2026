/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo, Divider } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { SpinnerBIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';

export type InfoContractBaseData = {
  FP: boolean;
  name: string;
  consentEndDate: string;
  noticeType: string;
  diseaseCount: number;
  reviewers: Array<[string, string]>;
  systems: number;
};

interface InfoContractProps<TData extends InfoContractBaseData = InfoContractBaseData> {
  info: TData | null;
}

export function Ltpa35003Side<TData extends InfoContractBaseData = InfoContractBaseData>({
  info,
}: InfoContractProps<TData>) {
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
    <Gcol gap={3}>
      <Gcol>
        <Grow gap={2} placement={'bwc'}>
          <Grow gap={1.5} placement={'bwc'} className="overflow-hidden">
            <Typo variant={'heading-md'}>FP질병제공동의</Typo>
            <Grow className="gap-[0.2rem]" placement={'ec'}>
              {info.FP ? (
                <Badge color="green" size="md">
                  Y
                </Badge>
              ) : (
                <Badge color="red" size="md">
                  N
                </Badge>
              )}
            </Grow>
          </Grow>
        </Grow>
        <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)] gap-2" placement={'ss'}>
          <Gcol placement={'ss'}>
            <BulletList className="w-full" type={'dot'} size={'xs'}>
              <BulletListItem color={'warning'}>
                <Grow placement={'bwc'} className="w-full">
                  <Grow placement={'sc'} className="text-[1.1rem]">
                    <Typo variant="body-xs" color={'danger'}>
                      동의종료일
                    </Typo>
                    <Divider />
                    {info.consentEndDate}
                  </Grow>
                  <Badge color={'red'} size={'md'} className="shrink-0">
                    임박
                  </Badge>
                </Grow>
              </BulletListItem>
            </BulletList>
            <Button variant={'outlined'} size={'sm'} className="w-full">
              동의 알림톡 보내기
            </Button>
          </Gcol>
        </Gcol>
      </Gcol>

      <Gcol>
        <Typo className="w-full" tag="div" variant={'heading-md'}>
          {info.name}님 알릴사항 요약
        </Typo>
        <Gcol variant={'box-line'} className="w-full bg-[var(--color-blue-gray-10)] gap-2" placement={'ss'}>
          <Gcol className="w-full" placement={'ss'}>
            <BulletList className="w-full" type={'dot'} size={'xs'}>
              <BulletListItem>
                <Grow placement={'sc'}>
                  <Typo variant="body-xs">고지유형</Typo>
                  <Divider />
                  <b>{info.noticeType}</b>
                </Grow>
              </BulletListItem>
              <BulletListItem>
                <Grow placement={'sc'}>
                  <Typo variant="body-xs">입력된 질병</Typo>
                  <Divider />
                  <b>{info.diseaseCount}건</b>
                </Grow>
              </BulletListItem>
            </BulletList>
            <Button variant={'outlined'} size={'sm'} color={'gray'} className="w-full">
              보완 필요 질병력 확인
            </Button>

            <Divider dir="row" className="w-full my-[0.6rem]" />

            {info.reviewers.length > 0 && (
              <>
                <BulletList className="w-full" type={'dot'} size={'xs'}>
                  <BulletListItem>
                    <Grow placement={'sc'}>
                      <Typo variant="body-xs">심사자</Typo>
                      <Divider />
                      <b>{info.reviewers.length}건</b>
                    </Grow>
                  </BulletListItem>
                </BulletList>
                <Gcol variant={'box-line'} className="w-full py-[0.6rem]! border-none! shadow-none!" placement={'ss'}>
                  <BulletList className="w-full" type={'dash'} size={'xs'}>
                    {info.reviewers.map((reviewer, index) => (
                      <BulletListItem key={`${reviewer[0]}-${index}`}>
                        <Grow placement={'bwc'} className="w-full text-[1.1rem]">
                          {reviewer[0]}, {reviewer[1]}
                        </Grow>
                      </BulletListItem>
                    ))}
                  </BulletList>
                </Gcol>
              </>
            )}
            <BulletList className="w-full" type={'dot'} size={'xs'}>
              <BulletListItem>
                <Grow placement={'sc'}>
                  <Typo variant="body-xs">시스템</Typo>
                  <Divider />
                  <b>{info.systems}건</b>
                </Grow>
              </BulletListItem>
            </BulletList>
          </Gcol>
        </Gcol>
      </Gcol>
    </Gcol>
  );
}
