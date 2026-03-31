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
      className="toaster group [&>li]:bg-[var(--color-information-5)]! [&>li]:border! [&>li]:border-[var(--color-information-50)]! [&>li]:shadow-lg! [&>li]:text-[1.4rem]! [&>li]:py-2! [&>li]:px-2.5!" 
      closeButton={true}
      toastOptions={{
        classNames: {
          toast:
            'border bg-[var(--color-information-50)] group-[.toaster]:border-[var(--color-information-50)] bg-[var(--color-information-5)] group toast group-[.toaster]:bg-[var(--color-information-5)] group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          icon: 'mr-2',
          closeButton: 'absolute top-2 right-2 border-none bg-transparent shadow-none p-0 m-0 w-auto h-auto flex items-center justify-center text-gray-400 hover:text-gray-700 focus:outline-none',
        },
      }}
      icons={{
        info: <InfoToastIcon />,
        close: <CloseIcon className="w-[1.2rem] h-[1.2rem] hover:text-gray-700 transition" />,
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
