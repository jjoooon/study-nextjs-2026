import InsPlanListBottom from '@/features/pub/poc/components/InsPlanListBottom';
import Page1Section from '@/features/pub/poc/sections/Page1Section';
import { LayoutDocument, LayoutMain } from '@/shared/components/layout/Cabinet';

export default function Page() {
  return (
    <>
      <LayoutDocument className="grid-cols-[1fr]">
        <LayoutMain className="grid-cols-[1fr] gap-5">
          <Page1Section />
        </LayoutMain>
      </LayoutDocument>
      <InsPlanListBottom />
    </>
  );
}
