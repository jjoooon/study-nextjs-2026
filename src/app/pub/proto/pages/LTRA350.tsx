'use client';

import LTRA350Section from '@/features/pub/proto/sections/LTRA350Section';
import { DUMMY_LTRA350_DATA } from '@/features/pub/proto/data/LTRA350Data';

export default function Page() {
  return (
    <LTRA350Section data={DUMMY_LTRA350_DATA}/>
  );
}
 