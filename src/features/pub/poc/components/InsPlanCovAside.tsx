'use client';

import { useState } from 'react';
import { Gcol, Grow, Grid, Typo } from '@/shared/components/common';
import { ArrowIcon } from '@/shared/components/icons';
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/uiux';

const invoices = [
  {
    number: 1,
    content: '[중복담보 조정]상해사망 담보군 중복 가입으로 한도 조정',
    limitExceeded: '한도초과 300만원',
    status: true,
  },
  {
    number: 2,
    content: '[중복담보 조정]상해사망 담보군 중복 가입으로 한도 조정',
    limitExceeded: '한도초과 300만원',
    status: false,
  },
  {
    number: 3,
    content: '[중복담보 조정]상해사망 담보군 중복 가입으로 한도 조정',
    limitExceeded: '한도초과 300만원',
    status: true,
  },
  {
    number: 4,
    content: '[중복담보 조정]상해사망 담보군 중복 가입으로 한도 조정',
    limitExceeded: '한도초과 300만원',
    status: false,
  },
  {
    number: 5,
    content: '[중복담보 조정]상해사망 담보군 중복 가입으로 한도 조정',
    limitExceeded: '한도초과 300만원',
    status: false,
  },
];
export default function InsPlanCovAside() {
  const [isExpanded, setIsExpanded] = useState(false);

  // 초기 상태: 2줄, 확장 상태: 모든 줄
  const displayedInvoices = isExpanded ? invoices : invoices.slice(0, 2);

  return (
    <Gcol placement="ss" className="gap-[3.2rem] h-[calc(100vh-32.2rem)] overflow-y-auto overflow-x-hidden pb-[3.2rem]">
      {/* 꼭 확인해야 할 일! */}
      <Gcol variant="box-line" placement="ss" className="w-full">
        <Grow placement="sc">
          <Typo variant="heading-lg" tag="h3">
            꼭 확인해야 할 일!
          </Typo>
        </Grow>
        <Grid className="gap-[1.2rem] grid-cols-[1fr_1fr] w-full" placement="sc">
          <Gcol placement="ss" variant="box" className="p-[1.6rem] gap-[1.2rem] rounded-[1.2rem] bg-[#00C7680F]">
            <Badge className="mb-2 rounded-full">
              GO
            </Badge>
            <Gcol placement="ss">
              <Button variant="text" className="gap-[.2rem] items-center">
                <Typo variant="button-md" weight="semibold" className="font-[#000] opacity-70">
                  계약자입력
                </Typo>
                <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
              </Button>
              <Typo tag="strong" weight="bold" className="font-[#000]">
                작업가능
              </Typo>
            </Gcol>
          </Gcol>
          <Gcol placement="ss" variant="box" className="p-[1.6rem] gap-[1.2rem] rounded-[1.2rem] bg-[#FFB82B1F]">
            <Badge className="mb-2 rounded-full">
              WAIT
            </Badge>
            <Gcol placement="ss">
              <Button variant="text" className="gap-[.2rem] items-center">
                <Typo variant="button-md" weight="semibold" className="font-[#000] opacity-70">
                  계약자입력
                </Typo>
                <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
              </Button>
              <Typo tag="strong" weight="bold" className="font-[#000]">
                확인필요
              </Typo>
            </Gcol>
          </Gcol>
          <Gcol
            placement="ss"
            variant="box"
            className="p-[1.6rem] gap-[1.2rem] rounded-[1.2rem] bg-[#FFF] border border-[#E5E5E5]"
          >
            <Badge className="mb-2 rounded-full">
              STOP
            </Badge>
            <Gcol placement="ss">
              <Button variant="text" className="gap-[.2rem] items-center">
                <Typo variant="button-md" weight="semibold" className="font-[#000] opacity-70">
                  계약자입력
                </Typo>
                <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
              </Button>
              <Typo tag="strong" weight="bold" className="font-[#000]">
                작업불가
              </Typo>
            </Gcol>
          </Gcol>
          <Gcol placement="ss" variant="box" className="p-[1.6rem] gap-[1.2rem] rounded-[1.2rem] bg-[#00C7680F]">
            <Badge className="mb-2 rounded-full">
              GO
            </Badge>
            <Gcol placement="ss">
              <Button variant="text" className="gap-[.2rem] items-center">
                <Typo variant="button-md" weight="semibold" className="font-[#000] opacity-70">
                  작업상이해소
                </Typo>
                <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
              </Button>
              <Typo tag="strong" weight="bold" className="font-[#000]">
                작업가능
              </Typo>
            </Gcol>
          </Gcol>
        </Grid>
      </Gcol>
      {/* 인수지침점검 */}
      <Gcol placement="ss" className="w-full gap-[1.2rem]">
        <Grow placement="bwc">
          <Typo variant="heading-lg" tag="h3">
            인수지침점검
          </Typo>
          <Button className="bg-[#000000D9]! border-[#000000D9] text-[#FFD12B]">AI 자동 해결</Button>
        </Grow>
        <Gcol variant="box-line" placement="ss" className="w-full">
          <Table>
            <TableCaption className="a11y-hidden">최근 인수지침점검 내역</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[5rem]">순번</TableHead>
                <TableHead className="w-auto">내용</TableHead>
                <TableHead className="w-[9rem]">해결</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedInvoices.map((invoice) => (
                <TableRow key={invoice.number}>
                  <TableCell className="font-medium text-center">{invoice.number}</TableCell>
                  <TableCell>
                    <Typo className="whitespace-normal text-[#000000B2]">{invoice.content}</Typo>
                    <br />
                    <Typo className="whitespace-normal font-bold">{invoice.limitExceeded}</Typo>
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {invoice.status ? <Badge color="green">해결</Badge> : <Badge color="red">미해결</Badge>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* 펼치기/접기 버튼 */}
          <div className="flex justify-center pt-2 w-full">
            <Button variant="text" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="gap-1">
              {isExpanded ? '접기' : '펼치기'}
              <ArrowIcon
                size={12}
                color="#000"
                className={`transition-transform ${isExpanded ? 'rotate-90' : 'rotate-270'}`}
              />
            </Button>
          </div>
        </Gcol>
      </Gcol>
      {/* 바로가기 */}
      <Gcol placement="ss" className="w-full gap-[1.2rem]">
        <Grow placement="sc">
          <Typo variant="heading-lg" tag="h3">
            바로가기
          </Typo>
        </Grow>
        <Grid className="gap-[.8rem] grid-cols-[1fr_1fr] w-full" placement="sc">
          <Button
            variant="none"
            className="px-[2rem] py-[1.2rem] border-none rounded-[1.2rem] bg-[#F8F8F8] justify-between h-auto"
          >
            <Typo variant="button-md" weight="semibold" className="font-[#000] opacity-70">
              설계메뉴얼
            </Typo>
            <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
          </Button>
          <Button
            variant="none"
            className="px-[2rem] py-[1.2rem] border-none rounded-[1.2rem] bg-[#F8F8F8] justify-between h-auto"
          >
            <Typo variant="button-md" weight="semibold" className="font-[#000] opacity-70">
              신정원조회
            </Typo>
            <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
          </Button>
          <Button
            variant="none"
            className="px-[2rem] py-[1.2rem] border-none rounded-[1.2rem] bg-[#F8F8F8] justify-between h-auto"
          >
            <Typo variant="button-md" weight="semibold" className="font-[#000] opacity-70">
              플랜조회/저장
            </Typo>
            <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
          </Button>
          <Button
            variant="none"
            className="px-[2rem] py-[1.2rem] border-none rounded-[1.2rem] bg-[#F8F8F8] justify-between h-auto"
          >
            <Typo variant="button-md" weight="semibold" className="font-[#000] opacity-70">
              실손정액조회
            </Typo>
            <ArrowIcon size={12} color="#000" className="rotate-180 opacity-60" />
          </Button>
        </Grid>
      </Gcol>

      <Grid placement="ss" className="w-full gap-[1.2rem] grid-cols-2">
        <Button variant="outlined" color="gray-light" className="py-6 font-bold gap-1">
          알릴사항
          <Badge color="red" className="rounded-full font-extrabold">
            N
          </Badge>
        </Button>
        <Button variant="outlined" color="gray-light" size="lg" className="py-6 font-bold gap-1">
          심사요청
          <Badge color="red" className="rounded-full font-extrabold">
            N
          </Badge>
        </Button>
      </Grid>
    </Gcol>
  );
}
