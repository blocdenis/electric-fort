import Container from '@/components/Container/Container';
import ContentContainer from '@/components/Container/ContentContainer';
import Filters from '@/components/Filters/Filters';
import SidebarWithAttachments from '@/components/Sidebar/SidebarWithAttachments';
import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="flex">
      <SidebarWithAttachments />
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
}

export default Layout;
