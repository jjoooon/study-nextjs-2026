/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';

// Sheet 루트 컴포넌트: 전체 시트 다이얼로그의 상태를 관리합니다. (Radix UI Dialog Primitive 기반)
const Sheet = SheetPrimitive.Root;

// Sheet를 여는 트리거 컴포넌트입니다.
const SheetTrigger = SheetPrimitive.Trigger;

// Sheet를 닫는 버튼 컴포넌트입니다.
const SheetClose = SheetPrimitive.Close;

// Sheet 콘텐츠를 DOM의 다른 위치로 이동시키는 포털 컴포넌트입니다.
const SheetPortal = SheetPrimitive.Portal;

// Sheet가 열렸을 때 배경을 어둡게 처리하는 오버레이 컴포넌트입니다.
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      // Sheet 상태(열림/닫힘)에 따라 페이드인/아웃 애니메이션을 적용합니다.
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

// Sheet 콘텐츠의 위치(side) 및 애니메이션을 정의하는 스타일 변형입니다.
const sheetVariants = cva(
  // 공통 스타일: 고정 위치, z-index, 배경, 그림자, 전환 효과, 열림/닫힘 애니메이션
  'fixed z-50 gap-4 bg-background p-[0.6rem] shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        // 상단에서 나타나는 Sheet: 위에서 아래로 슬라이드
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        // 하단에서 나타나는 Sheet: 아래에서 위로 슬라이드
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        // 왼쪽에서 나타나는 Sheet: 왼쪽에서 오른쪽으로 슬라이드 (모바일 3/4 너비, sm 이상 최대 너비)
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        // 오른쪽에서 나타나는 Sheet: 오른쪽에서 왼쪽으로 슬라이드 (모바일 3/4 너비, sm 이상 최대 너비)
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

// SheetContent 컴포넌트의 Props 인터페이스입니다.
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {}

// Sheet의 실제 콘텐츠 영역을 렌더링하는 컴포넌트입니다.
const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = 'right', className, children, ...props }, ref) => (
    <SheetPortal>
      {/* Sheet가 열리면 오버레이를 표시합니다. */}
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {/* Sheet 닫기 버튼: 우측 상단에 위치하며 접근성을 위해 sr-only 텍스트를 포함합니다. */}
        <SheetPrimitive.Close className="absolute right-[0.4rem] top-[0.4rem] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-[0.4rem] w-[0.4rem]" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

// Sheet의 헤더 영역을 정의하는 컴포넌트입니다.
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

// Sheet의 푸터 영역을 정의하는 컴포넌트입니다.
const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

// Sheet의 제목을 정의하는 컴포넌트입니다.
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn('text-lg font-semibold text-foreground', className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

// Sheet의 설명을 정의하는 컴포넌트입니다.
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
