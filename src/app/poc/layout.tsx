import { ZoomControl } from '@/shared/components/common/ZoomControl';
import UserSearch from '@/shared/components/features/UserSearch';
import { LayoutBody, LayoutFolder } from '@/shared/components/layout/Cabinet';

const PageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <LayoutBody>
      <LayoutFolder>
        <UserSearch />
        {children}
        <ZoomControl />
      </LayoutFolder>
    </LayoutBody>
  );
};

export default PageLayout;
