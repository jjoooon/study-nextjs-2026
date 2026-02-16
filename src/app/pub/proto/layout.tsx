import { LayoutDoc } from '@/shared/components/layout';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    // type1
    <LayoutDoc>{children}</LayoutDoc>
  );
}
