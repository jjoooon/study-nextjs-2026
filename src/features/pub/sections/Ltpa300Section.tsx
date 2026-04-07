'use client';

import PageID from '@features/PageID';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Ltpa300Main } from '../components/LTPA300Main';

const data = {
  pageID: {
    pageName: '정액담보점검목록 조회',
    pageId: 'LTPA300',
  },
};
export default function Ltpa300Section() {
  return (
    <LayoutTemplate
      // LayoutHead
      pageID={<PageID data={data.pageID} />}
      // LayoutBody: main
      mainBody={<Ltpa300Main />}
    />
  );
}
