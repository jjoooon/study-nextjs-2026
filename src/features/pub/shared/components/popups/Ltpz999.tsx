/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { ArrowIcon, ErrorIcon, QueryIcon, NotiIcon } from '@icons';

import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogSection,
  DialogFooterArea,
  DialogClose,
  DialogTitle,
  DialogHeader,
} from '@uiux/Dialog';

// Ltpz999 컴포넌트 Props 타입 정의
type Ltpz999Props = {
  errorType: string; // 오류, 질의, 알림 중 하나의 상태를 받음
};

/**
 * Ltpz999: 시스템 오류 및 업무 처리 방안을 안내하는 공통 팝업 컴포넌트
 */
const Ltpz999: React.FC<Ltpz999Props> = ({ errorType = '오류' }) => {
  const [solutionOpen, setSolutionOpen] = React.useState(false); // '처리방안' 섹션의 확장 상태 관리
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null); // 내부 메시지 스크롤 컨테이너 참조
  const solutionButtonWrapRef = React.useRef<HTMLDivElement | null>(null); // 처리방안 버튼 영역 참조

  // '처리방안' 클릭 시 해당 버튼이 스크롤뷰 상단에 오도록 부드럽게 스크롤하는 함수
  const scrollSolutionButtonToTop = React.useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    const solutionButtonWrap = solutionButtonWrapRef.current;

    if (!scrollContainer || !solutionButtonWrap) {
      return;
    }

    // 컨테이너와 버튼의 위치를 계산하여 스크롤 위치 보정
    const containerRect = scrollContainer.getBoundingClientRect();
    const buttonRect = solutionButtonWrap.getBoundingClientRect();
    const nextScrollTop = scrollContainer.scrollTop + (buttonRect.top - containerRect.top - 5);

    scrollContainer.scrollTo({ top: nextScrollTop, behavior: 'smooth' });
  }, []);

  // 처리방안 섹션이 열릴 때 스크롤 애니메이션 실행
  React.useEffect(() => {
    if (!solutionOpen) {
      return;
    }

    // 브라우저 렌더링 프레임에 맞춰 스크롤 함수 호출
    const frameId = window.requestAnimationFrame(() => {
      scrollSolutionButtonToTop();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [scrollSolutionButtonToTop, solutionOpen]);

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        resizable={false}
        size={'sm'}
        className="grid-rows-[auto_1fr_auto] !max-h-[42.2rem] ltpz999"
      >
        {/* 접근성을 위한 숨김 처리된 타이틀 */}
        <DialogHeader>
          <VisuallyHidden.Root>
            <DialogTitle>
              <Typo tag={'strong'} variant={'heading-lg'}>
                시스템 오류 안내
              </Typo>
              <Typo tag={'p'} variant={'body-xl'}>
                (LTPZ999)
              </Typo>
            </DialogTitle>
          </VisuallyHidden.Root>
        </DialogHeader>

        <DialogSection className="gap-5 grid-rows-[auto_auto_minmax(0,1fr)] overflow-y-hidden">
          {/* 상단: 코드 표시 */}
          <Grow placement="ec" className="text-[var(--color-gray-70)]">
            코드 LTRE006(trandZomH110)
          </Grow>

          {/* 중간: 타입별 아이콘 및 텍스트(오류/질의/알림) */}
          <Gcol gap={2}>
            <Grow className="w-[4.4rem] h-[4.4rem] bg-[var(--color-gray-5)] rounded-3xl">
              {errorType === '오류' && <ErrorIcon />}
              {errorType === '질의' && <QueryIcon />}
              {errorType === '알림' && <NotiIcon />}
            </Grow>
            <Typo variant={'body-lg'} className="font-bold">
              {errorType}
            </Typo>
          </Gcol>

          {/* 본문: 시스템 메시지 리스트 및 처리방안 아코디언 */}
          <div ref={scrollContainerRef} className="overflow-y-auto [&_div]:!text-[1.4rem]">
            <Gcol placement="cc">
              <BulletItem type="dot">시스템 오류가 발생했습니다.</BulletItem>
              {/* <BulletItem type="dot">시스템 문구가 더 길어질수 있습니다.</BulletItem>
              <BulletItem type="dot">시스템 메시지는 기본 90자까지 이내를 권장합니다.</BulletItem>
              <BulletItem type="dot">최대한 90자 이내로 정의 부탁드립니다.</BulletItem>
              <BulletItem type="dot">시스템 오류가 발행했습니다.</BulletItem> */}

              {/* 상세 처리방안 (클릭 시 확장) */}
              <Gcol
                className="rounded-[0.6rem] bg-[var(--color-gray-5)] px-2 py-[0.25rem] gap-2 border border-[var(--color-gray-15)] max-w-[36rem]"
                placement="ss"
              >
                <div ref={solutionButtonWrapRef} className={'w-full'}>
                  <Button
                    variant={'none'}
                    className="!justify-between w-full font-bold px-0"
                    onClick={() => setSolutionOpen(!solutionOpen)}
                  >
                    처리방안
                    {/* 상태에 따라 화살표 회전 */}
                    <ArrowIcon className={`${solutionOpen ? 'rotate-[90deg]' : 'rotate-[-90deg]'}`} size={16} />
                  </Button>
                </div>

                {solutionOpen && (
                  // 처리방안 내용 영역
                  <div className="">
                    오류가 났을 경우 해소는 이렇게 해주세요.
                    <br />
                    [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                    <br />
                    [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                    <br />
                    [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                    <br />
                    [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                    <br />
                    [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                    <br />
                    [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                    <br />
                    [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                    <br />
                    [가입설계] 버튼을 클릭 후 담보 해소를 해주세요.
                  </div>
                )}
              </Gcol>
            </Gcol>
          </div>
        </DialogSection>

        {/* 하단 푸터: 제안/닫기 및 연계 버튼 영역 */}
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                메시지 개선요청
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                알림상세설명
              </Button>
            </Grow>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                연계버튼
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz999;
