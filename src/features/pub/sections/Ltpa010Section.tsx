'use client';

import PageID from '@features/PageID';
import { LayoutTemplate } from '@layout/LayoutTemplate';
import { Ltpa010Main } from '../components/LTPA010Main';

const data = {
  pageID: {
    pageName: '통합가입설계조회',
    pageId: 'LTPA010',
  },
};
export default function Ltpa010Section() {
  return (
    <LayoutTemplate
      // LayoutHead
      pageID={<PageID data={data.pageID} />}
      // LayoutBody: main
      mainBody={<Ltpa010Main />}
    />
  );
}
