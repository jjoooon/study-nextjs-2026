'use client';

import { Grow, Gcol, Grid, Typo, ConTit, ConTitName } from '@atoms';
import { BulletItem } from '@common/BulletList';
import { Button } from '@uiux/Button';
import { Textarea } from '@uiux/Textarea';
import React from 'react';
import { CircleCheckStepIcon, ArrowIcon, TimeRecordIcon } from '@/shared/components/icons';

export interface ChatResultItem {
  name: string;
  title: string;
  content: string;
  date: string;
  uw_name: string;
  uw_title: string;
  uw_content: string;
  uw_state: string[];
  uw_date: string;
  uw_detail: string;
}

export interface ChatResultProps {
  chatData: ChatResultItem[];
}

export const ChatResult: React.FC<ChatResultProps> = ({ chatData }) => {
  return (
    <Grid className="h-full grid-rows-[auto_1fr_auto] gap-0">
      <Grow
        className="w-full h-[4.1rem] px-2.5 py-5 bg-[var(--color-secondary-50)] rounded-t-lg"
        placement="bwc"
        variant="default"
      >
        <strong className="text-[1.4rem] text-white">심사결과안내</strong>
        <Button
          variant={'outlined'}
          color={'secondary'}
          size={'md'}
          className="border-[var(--color-secondary-50)] text-black"
        >
          이력상세
        </Button>
      </Grow>

      <Gcol className="relative w-full tracking-[-0.13rem] border-l border-r border-[var(--color-gray-20)] gap-0 overflow-hidden">
        <Gcol className="absolute overflow-y-scroll w-full top-0 h-full" placement="ss">
          <Gcol className="py-2 gap-4">
            {chatData.map((item, idx) => (
              <React.Fragment key={idx}>
                {/* 심부산 */}
                <Gcol className="px-3 gap-2">
                  <Typo tag="strong" variant={'body-sm'} weight="bold" className="w-full flex justify-end">
                    {item.name}
                  </Typo>
                  <Gcol
                    className="w-[21rem] ml-auto rounded-lg bg-[var(--color-blue-gray-10)] py-2 px-3 align-start justify-start text-left"
                    gap="2"
                  >
                    <Gcol placement="ss">
                      <Typo variant="body-xs" className="justify-start text-[1.1rem]" weight="bold">
                        {item.title}
                      </Typo>
                      <BulletItem
                        before="ⓐ"
                        className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-50)]"
                        color="default"
                        onClick={() => {}}
                        size="md"
                        type="dash"
                      >
                        {item.content}
                      </BulletItem>
                    </Gcol>
                    <Typo
                      variant="body-xs"
                      className="w-full flex justify-start items-center text-[var(--color-gray-50)] align-left "
                    >
                      <TimeRecordIcon />
                      {item.date}
                    </Typo>
                  </Gcol>
                </Gcol>
                {/* UW심사팀 */}
                <Gcol className="px-3 gap-2">
                  <Typo tag="strong" variant={'body-sm'} weight="bold" className="w-full flex justify-start">
                    {item.uw_name}
                  </Typo>
                  <Gcol className="ml-auto rounded-lg bg-[var(--color-warning-10)] py-2 px-3 align-start justify-start text-left gap-2">
                    <Gcol>
                      <Grow className="w-full justify-between">
                        <Typo
                          variant="body-xs"
                          className="w-full justify-between align-center text-[1.1rem]"
                          weight="bold"
                        >
                          {item.uw_title}
                        </Typo>
                        <Button
                          color="primary"
                          onClick={() => {}}
                          only="default"
                          size="sm"
                          variant="outlined"
                          className="text-[1.1rem] leading-[2.2rem]"
                        >
                          상세보기
                        </Button>
                      </Grow>
                      <BulletItem
                        className="whitespace-spaces w-full text-[1.1rem] word-break break-all !text-[var(--color-gray-70)] leading-[1.7rem]"
                        color="default"
                        onClick={() => {}}
                        size="md"
                        type="dash"
                        before={undefined}
                      >
                        {item.uw_content}
                      </BulletItem>
                      <Gcol placement="ss" className="gap-0.5 pl-2">
                        {item.uw_state.map((state, sidx) => (
                          <Grow className="gap-0.5 aligin-center" key={sidx}>
                            <CircleCheckStepIcon />
                            <Typo className="text-[1.1rem] text-[var(--color-gray-70)] leading-[1.7rem]">{state}</Typo>
                          </Grow>
                        ))}
                      </Gcol>
                    </Gcol>
                    <Typo
                      variant="body-xs"
                      className="w-full flex justify-start items-center text-[var(--color-gray-50)] align-left"
                    >
                      <TimeRecordIcon />
                      {item.uw_date}
                    </Typo>
                  </Gcol>
                </Gcol>
              </React.Fragment>
            ))}
          </Gcol>
        </Gcol>
        {/* 페이지 버튼 */}
        <Gcol className="w-auto items-end gap-2 absolute bottom-2 right-3 z-50">
          <Button
            variant="outlined"
            color="link"
            only="icon"
            className="w-[4rem] h-[3.7rem] bg-[#EFF8FF] shadow-[0_2rem_4rem_0_rgba(0,0,0,0.1)]"
          >
            <Typo variant="body-lg">
              <b>1</b>/{chatData.length}
            </Typo>
          </Button>
          <Grow>
            <Button variant="outlined" color="gray" only="icon" size="md">
              <ArrowIcon className="rotate-90" />
            </Button>
            <Button variant="outlined" color="gray" only="icon" size="md">
              <ArrowIcon className="rotate-270" />
            </Button>
          </Grow>
        </Gcol>
      </Gcol>

      {/* 요청자 의견 */}
      <Gcol className="shrink-0 w-full h-[13.2rem] py-2.5 px-3 bg-[var(--color-gray-15)] border-t-1 border-[var(--color-gray-20)]">
        <Grow placement="bwc">
          <b className="text-[1.1rem]">요청자 의견</b>
          <Button>심사요청</Button>
        </Grow>
        <Textarea
          placeholder="계약자에게 보장제한 설정범위 및 사유(피보험자의 과거병력)을 설명해주시기 바랍니다."
          variant="default"
          className="w-full text-[1.1rem] !text-[var(--color-gray-50)]"
          resize={false}
        />
      </Gcol>
    </Grid>
  );
};
