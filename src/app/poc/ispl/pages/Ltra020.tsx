/**
 * Ltra020
 */

import InsPlanListBottom from '@/features/poc/ispl/components/InsPlanListBottom';
import Ltra020Section from '@/features/poc/ispl/sections/Ltra020Section';
import { LayoutDoc, LayoutMain } from '@/shared/components/layout';

export default function Ltra020() {
  return (
    <>
      <LayoutDoc className="grid-cols-[1fr]">
        <LayoutMain className="grid-cols-[1fr] gap-5">
          <Ltra020Section />
        </LayoutMain>
      </LayoutDoc>
      <InsPlanListBottom />
    </>
  );
}
