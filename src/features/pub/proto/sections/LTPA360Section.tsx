'use client';

// components - layout
import PageID from '@features/PageID';
import { LayoutTemplate } from '@layout/LayoutTemplate';
// components - features

// data
import { LTPA360Main } from '../components/LTPA360Main';

const data = {
  pageID: {
    pageName: '상품판매준비프로세스',
    pageId: 'LTPA360',
  },
};

export default function LTPA360Section() {
  return (
    <LayoutTemplate
      // LayoutHead
      pageID={<PageID data={data.pageID} />}
      mainBody={<LTPA360Main />}
    />
  );
}
