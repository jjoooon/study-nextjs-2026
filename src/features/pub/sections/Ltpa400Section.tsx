'use client';

// components - layout
import PageID from '@features/PageID';
import { LayoutTemplate } from '@layout/LayoutTemplate';
// components - features

// data
import { Ltpa400Main } from '../components/Ltpa400Main';

const data = {
  pageID: {
    pageName: '장기보험_가입설계요청',
    pageId: 'LTPA400',
  },
};

export default function Ltpa400Section() {
  return (
    <LayoutTemplate
      // LayoutHead
      pageID={<PageID data={data.pageID} />}
      mainBody={<Ltpa400Main />}
    />
  );
}
