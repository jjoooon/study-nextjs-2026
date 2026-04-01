'use client';

// components - layout
import { LayoutTemplate } from '@layout/LayoutTemplate';
// components - features
import PageID from '@features/PageID';

// data
import { LTPA400Data } from '../data/LTPA400Data';
import { LTPA400Main } from '../components/LTPA400Main';


export default function LTPA400Section() {
  return (
    <LayoutTemplate
      // LayoutHead
      pageID={<PageID data={LTPA400Data.head.pageID} />}
      // LayoutBody: main
      mainBody={<LTPA400Main />}
    />
  );
}
