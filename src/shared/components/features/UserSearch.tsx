'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FormCell, FormItem, FormTable, Grow } from '@/shared/components/common';
import { AddIcon, CalendarIcon, SearchIcon } from '@/shared/components/icons';
import { LayoutLabel } from '@/shared/components/layout/Cabinet';
import { Button, Input, NativeSelect, NativeSelectOption, TableRow } from '@/shared/components/uiux';
import log from '@/shared/utils/logger';
import { popup } from '@/shared/utils/popup/popupApi';
import { registerDialog } from '@/shared/utils/popup/popupRegistry';
import { UserSearchResult } from '../popups/UserSearchDialog';

interface UserData {
  id: string;
  name: string;
  age: number;
  date: string;
  status: string;
  face: string;
  checked?: boolean;
  disabled?: boolean;
}

const MOCK_USERS: UserData[] = [
  {
    id: 'user1',
    name: '홍길동',
    age: 24,
    date: '2025.12.11',
    status: '설계',
    face: '/images/dummy/user-face1.png',
    checked: true,
    disabled: false,
  },
  {
    id: 'user2',
    name: '김철수',
    age: 45,
    date: '2025.12.10',
    status: '등록',
    face: '/images/dummy/user-face2.png',
    checked: false,
    disabled: false,
  },
  {
    id: 'user3',
    name: '이영희',
    age: 38,
    date: '2025.11.09',
    status: '정보 수정',
    face: '/images/dummy/user-face3.png',
    checked: false,
    disabled: false,
  },
  {
    id: 'user4',
    name: '박민수',
    age: 32,
    date: '2025.10.20',
    status: '등록',
    face: '/images/dummy/user-face4.png',
    checked: false,
    disabled: false,
  },
];

// 날짜 문자열(YYYY.MM.DD)을 받아서 오늘, 어제, N일 전으로 변환하는 함수
const getRelativeDate = (dateString: string): string => {
  const parts = dateString.split('.').map(Number);
  if (parts.length < 3 || parts.some(Number.isNaN)) return dateString;

  const [year, month, day] = parts as [number, number, number];
  const cardDate = new Date(year, month - 1, day);
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const timeDiff = todayStart.getTime() - cardDate.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (dayDiff === 0) return '오늘';
  if (dayDiff === 1) return '어제';
  return `${dayDiff}일 전`;
};

const logger = log.getLogger('Poc');

export const UserSearch = () => {
  const [selectedId, setSelectedId] = useState<string>('user1');
  // const [dialogOpen, setDialogOpen] = useState(false); // 모달 상태 추가
  const cards = MOCK_USERS;

  /**
   * 고객 검색 팝업 열기
   */
  const handleOpenUserSearch = async () => {
    // TODO: @YunJunmo types로 이동
    try {
      const result = await popup.open<UserSearchResult>('products/user-search', {
        title: '고객찾기',
      });

      if (result?.action === 'select' && result.customer) {
        // setSelectedCustomer({
        //   name: result.customer.name,
        //   customerNo: result.customer.customerNo,
        // });
        logger.log('선택된 고객:', result.customer);
      }
    } catch (error) {
      logger.error('팝업 오류:', error);
    }
  };

  // 컴포넌트 마운트 시 팝업 등록
  // TODO: @YunJunmo shared로 이동 검토
  useEffect(() => {
    registerDialog('products/user-search', () => import('../popups/UserSearchDialog'));
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  return (
    <>
      <LayoutLabel>
        <Grow variant="box" className="grid grid-cols-[24rem_1px_1fr_14rem] mb-[3.2rem] rounded-[1.6rem]">
          <FormTable
            variant="boxIn"
            caption="검색테이블입니다."
            cols={['w-[7rem] min-w-[7rem]', '']}
            className="[&_td]:py-[0.6rem]!"
          >
            <TableRow>
              <FormCell title="고객명">
                <FormItem>
                  <Input type="text" aria-label="고객명" />
                  <Button
                    aria-label="고객명 추가"
                    variant="icon"
                    onClick={handleOpenUserSearch} // 클릭 시 모달 오픈
                  >
                    <SearchIcon />
                  </Button>
                </FormItem>
              </FormCell>
            </TableRow>
            <TableRow>
              <FormCell title="고지질병">
                <FormItem>
                  <Input type="text" aria-label="질병검색" />
                  <Button
                    aria-label="고지질병 추가"
                    variant="icon"
                    onClick={handleOpenUserSearch} // 클릭 시 모달 오픈
                  >
                    <SearchIcon />
                  </Button>
                </FormItem>
              </FormCell>
            </TableRow>
          </FormTable>

          <hr className="m-0 w-px max-w-[1px] border-l border-l-[#CCCCCC] border-dashed h-[6.4rem]" />

          <div className="flex gap-3 items-center flex-1 flex-col md:flex-row w-full">
            <ul className="flex gap-4 max-w-[calc(100vw-53rem)] overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-rounded-md px-5 -ml-5">
              {cards.map(({ id, name, age, date, status, face, disabled }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => !disabled && handleSelect(id)}
                    disabled={disabled}
                    className={`inline-flex gap-3 p-4 bg-white rounded-2xl items-center focus:bg-orange-50 transition-all ${
                      disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : selectedId === id
                          ? 'bg-[#FFFCF9] shadow-[0.4rem_0.6rem_0.6rem_0_rgba(255,92,46,0.1)] outline-[0.2rem] outline-orange-500 -outlined-offset-[0.2rem]'
                          : ''
                    }`}
                  >
                    <span className="relative w-[4.6rem] h-[4.6rem] rounded-full overflow-hidden shrink-0">
                      {face && (
                        <Image src={face} alt={`${name}의 얼굴`} fill className="object-cover w-[4.6rem] h-[4.6rem]" />
                      )}
                    </span>
                    <span className="flex flex-col gap-2">
                      <span className="flex gap-2.5 items-center">
                        <b className="text-xs font-bold">{name}</b>
                        <span className="text-gray-400 text-xxs">{age || '-'}세</span>
                      </span>
                      <span className="text-gray-700 text-xxs flex items-center gap-1 whitespace-nowrap">
                        <CalendarIcon className="inline-block" />
                        {getRelativeDate(date)} {status}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              <li className="items-center flex shrink-0">
                <Button aria-label="고객 추가" variant="icon" color="transparent" onClick={() => alert('추가')}>
                  <AddIcon />
                </Button>
              </li>
            </ul>
          </div>
          <Grow className="self-start mt-2 flex-1 flex justify-end [&>div]:w-auto">
            <NativeSelect aria-label="고객정렬방식 선택" readOnly={false} required={false}>
              <NativeSelectOption value="1">최근 업데이트순</NativeSelectOption>
              <NativeSelectOption value="2">이름순</NativeSelectOption>
            </NativeSelect>
          </Grow>
        </Grow>
      </LayoutLabel>
    </>
  );
};
