import * as React from 'react';
import { Gcol, Typo } from '@atoms';

export const LoadingBar = () => {
  return (
    <Gcol className="flex items-center justify-center min-h-screen gap-6">
      {/* 로더 컨테이너 (회전 애니메이션 담당) */}
      <div className="relative w-[4rem] h-[4rem] flex items-center justify-center animate-gather-rotate">
        {/* 1번 원: 빨간색 (가장 뒤) */}
        <div
          className="absolute w-[4rem] h-[4rem]  bg-[var(--color-danger-50)] rounded-full z-10 animate-gather-move"
          style={{ '--tx': '0px', '--ty': '-1.5rem' } as React.CSSProperties}
        />

        {/* 2번 원: 노란색 (중간) */}
        <div
          className="absolute w-[4rem] h-[4rem] bg-[var(--color-warning-40)] rounded-full z-20 animate-gather-move"
          style={{ '--tx': '-1.3rem', '--ty': '0.75rem' } as React.CSSProperties}
        />

        {/* 3번 원: 오렌지색 (가장 앞) */}
        <div
          className="absolute w-[4rem] h-[4rem] bg-[var(--color-primary-50)] rounded-full z-30 animate-gather-move"
          style={{ '--tx': '1.3rem', '--ty': '0.75rem' } as React.CSSProperties}
        />
      </div>
      <Typo variant={'body-md'}>로딩중입니다.</Typo>
    </Gcol>
  );
};
