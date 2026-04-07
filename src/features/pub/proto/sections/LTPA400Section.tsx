'use client';

// components - layout
import PageID from '@features/PageID';
import { LayoutTemplate } from '@layout/LayoutTemplate';
// components - features

// data
import { LTPA400Main } from '../components/LTPA400Main';

const data = {
  pageID: {
    pageName: '장기보험_가입설계요청',
    pageId: 'LTPA400',
  },
};

export default function LTPA400Section() {
  return (
    <LayoutTemplate
      // LayoutHead
      pageID={<PageID data={data.pageID} />}
      mainBody={<LTPA400Main />}
    />
  );
}
