import { Gcol } from '@/shared/components/atoms/Group';
import { BottomBar } from '@/shared/components/common/BottomBar';
import { RecommendCard } from '@/shared/components/common/RecommendCard';
import { PageID } from '@/shared/components/features/PageID';
import { LayoutFoot, LayoutHead } from '@/shared/components/layout';
import { LayoutTemplate } from '@/shared/components/layout/LayoutTemplate';

export default function Ltpa020Section() {
  return (
    <>
      <LayoutHead>
        <PageID
          data={{
            pageName: '상품플랜설계',
            pageId: 'LTPA020',
          }}
        />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <Gcol>
            <RecommendCard
              mode={'coverage-check'}
              title={'한화3N5 더간편건강보험(세만기형)'}
              plan={'기본형 · 납입면제운영형 · 3N5간편고간편고지형III'}
              term={'20년납/100세만기'}
              detail={'1형(355간편고지형)올인원플랜(1~4형)(15~89세)'}
              premium={'120,000원'}
            />
          </Gcol>
        }
      ></LayoutTemplate>
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
