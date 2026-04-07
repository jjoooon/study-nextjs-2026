'use client';

import PageID from '@features/PageID';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { LTPA301Main } from '../components/LTPA301Main';

const data = {
  pageID: {
    pageName: '정액담보점검내역',
    pageId: 'LTPA301',
  },
};
export default function LTPA301Section() {
  return (
    <LayoutTemplate
      // LayoutHead
      pageID={<PageID data={data.pageID} />}
      // LayoutBody: main
      mainBody={<LTPA301Main />}
    />
  );
}
