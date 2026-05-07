import { LayoutDoc } from '@layout/BaseLayout';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <LayoutDoc>{children}</LayoutDoc>;
}
