import PageHead from '@/shared/components/features/PageHead';
import { LayoutDoc, LayoutHead, LayoutBody, LayoutProcess } from '@/shared/components/layout';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    // type1
    <LayoutDoc>
      <LayoutHead>
        <PageHead />
      </LayoutHead>
      <LayoutBody>
        <LayoutProcess>프로세스</LayoutProcess>
        {children}
      </LayoutBody>
    </LayoutDoc>
  );
}
