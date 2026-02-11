/**
 * Ltra020
 */

import InsPlanListBottom from '@/features/poc/ispl/components/InsPlanListBottom';
import Ltra020Section from '@/features/poc/ispl/sections/Ltra020Section';
import { LayoutDocument, LayoutMain } from '@/shared/components/layout/Cabinet';

export default function Ltra020() {
  return (
    <>
      <LayoutDocument className="grid-cols-[1fr]">
        <LayoutMain className="grid-cols-[1fr] gap-5">
          <Ltra020Section />
        </LayoutMain>
      </LayoutDocument>
      <InsPlanListBottom />
    </>
  );
}
