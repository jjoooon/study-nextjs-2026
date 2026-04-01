'use client';

import { LayoutTemplate } from '@layout/LayoutTemplate';
import PageID from '@features/PageID';
import { LTPA010Main } from '../components/LTPA010Main';

const data = {
  pageID: {
    pageName: '통합가입설계조회',
    pageId: 'LTPA010',
  },
}
export default function LTPA010Section() {
  return (
    <LayoutTemplate
      // LayoutHead
      pageID={<PageID data={data.pageID} />}
      // LayoutBody: main
      mainBody={<LTPA010Main />}
    />
  );
}
