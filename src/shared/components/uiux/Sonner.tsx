/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast } from 'sonner';
import { InfoToastIcon, CloseIcon } from '@icons';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="cp-sonner toaster group pointer-events-auto gap-1 [&>li]:!min-w-[32.6rem] [&>li]:!w-full [&>li]:!max-2-[50rem] [&>li]:tracking-[-0.13rem] [&>li]:bg-[var(--color-information-5)]! [&>li]:border! [&>li]:border-[var(--color-information-50)]! [&>li]:shadow-lg! [&>li]:text-[1.4rem]! [&>li]:py-2! [&>li]:px-2.5! [&_[data-sonner-toast]]:relative [&_[data-close-button]]:!absolute [&_[data-close-button]]:!right-[0] [&_[data-close-button]]:!left-auto [&_[data-close-button]]:!top-[2.5rem] [&_[data-close-button]]:bg-transparent! [&_[data-close-button]]:border-0! [&_[data-close-button]]:text-[var(--color-information-50)]! [&>li]:flex [&>li]:items-start! [&_[data-icon]]:!ml-0 [&_[data-icon]]:!mt-[0.5rem]! [&>li]:pr-[3rem]!"
      closeButton={true}
      toastOptions={{
        duration: 1000000,
        classNames: {
          toast:
            'border bg-[var(--color-information-50)] group-[.toaster]:border-[var(--color-information-50)] bg-[var(--color-information-5)] group toast group-[.toaster]:bg-[var(--color-information-5)] group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg [&[data-visible=true]]:[animation:sonner-toast-in_220ms_ease-out] [&[data-removed=true]]:[animation:sonner-toast-out_180ms_ease-in_forwards]',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          icon: 'translate-y-[0.2rem] w-[2rem] h-[2rem]',
          closeButton:
            'absolute top-1/2 right-2 -translate-y-1/2 border-none bg-transparent shadow-none p-0 m-0 w-auto h-auto flex items-center justify-center text-gray-400 hover:text-gray-700 focus:outline-none',
        },
      }}
      icons={{
        info: <InfoToastIcon color="var(--color-information-60)" />,
        close: <CloseIcon className="w-[1.2rem] h-[1.2rem] transition" color="var(--color-information-60)" />,
      }}
      {...props}
      duration={1000000}
    />
  );
};

export { Toaster, toast };
