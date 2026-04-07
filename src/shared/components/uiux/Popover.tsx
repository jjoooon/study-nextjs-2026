'use client';

import { CloseIcon } from '@icons';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

interface PopoverProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {
  className?: string;
}

const Popover: React.FC<PopoverProps> = ({ className, children, ...props }) => (
  <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
);

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Trigger ref={ref} className={cn(className)} {...props}>
    {children}
  </PopoverPrimitive.Trigger>
));
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

const PopoverAnchor = PopoverPrimitive.Anchor;

type PopoverMotion = 'fade' | 'scale' | 'none';

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  variant?: string;
  variantStyles?: Record<string, string>;
  motion?: PopoverMotion;
  portalContainer?: HTMLElement | null;
  classWrap?: string;
  closeButton?: boolean;
}
// variant별 스타일 정의 (외부 확장 가능)
export const defaultPopoverVariantStyles: Record<string, string> = {
  default: 'bg-[#fff] text-popover-foreground',
  dark: 'bg-gray-900 text-white',
  light: 'bg-white text-gray-900',
};

const motionClassMap: Record<PopoverMotion, string> = {
  fade: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  scale:
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  none: '',
};

const PopoverContent = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(
  (props, ref) => {
    const {
      className,
      classWrap,
      align = 'center',
      sideOffset = 4,
      motion = 'fade',
      closeButton = false,
      portalContainer,
      variant = 'default',
      variantStyles = defaultPopoverVariantStyles,
      ...rest
    } = props;
    let motionClass = '';
    if (motion === 'fade') {
      motionClass = motionClassMap.fade;
    } else if (motion === 'scale') {
      motionClass = motionClassMap.scale;
    } else {
      motionClass = '';
    }
    React.useEffect(() => {
      // Inject style for data-radix-popper-content-wrapper only if portalContainer is set
      if (portalContainer) {
        const styleId = 'popover-content-wrapper-absolute-style';
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.innerHTML = '[data-radix-popper-content-wrapper]{position:absolute !important;}';
          document.head.appendChild(style);
        }
        // classWrap을 data-radix-popper-content-wrapper에 동적으로 추가
        const wrapper = portalContainer.querySelector('[data-radix-popper-content-wrapper]');
        if (wrapper && classWrap) {
          wrapper.classList.add(...classWrap.split(' '));
        }
      }
    }, [portalContainer, classWrap]);
    return (
      <PopoverPrimitive.Portal {...(portalContainer ? { container: portalContainer } : {})}>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            'z-50 w-auto border border-[var(--color-gray-10)] rounded-[.6rem] px-2.5 py-2 shadow-md outline-none',
            variantStyles[variant] ?? variantStyles.default,
            motionClass,
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]',
            className
          )}
          {...rest}
        >
          {closeButton && (
            <PopoverPrimitive.Close
              aria-label="Close"
              className="absolute -top-2 -right-2 p-1 rounded hover:bg-[var(--color-gray-90)] focus:outline-none w-[1.8rem] h-[1.8rem] flex items-center justify-center bg-[var(--color-gray-70)] rounded-full"
            >
              <CloseIcon color={'var(--color-gray-0)'} size={10} />
            </PopoverPrimitive.Close>
          )}
          {props.children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
