'use client';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import LogOutButton from '@/components/Buttons/LogOutButton/LogOutButton';
import Container from '@/components/Container/Container';
import Loading from '@/components/Loading/Loading';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import Profile from '@/components/Profile/Profile';
import Section from '@/components/Section/Section';
import styles from '@/components/Section/SectionTitle/SectionTitle.module.scss';
import { useAuth } from '@/context/AuthContext';

function Page() {
  const links = [{ name: 'Особистий кабінет' }];
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PrivateRoute isAuth={isAuthenticated}>
      <Container>
        <Breadcrumbs items={links} />
        <Section className="px-4 laptop:px-9">
          <div className=" flex justify-between laptop:mb-[19px] laptop:mt-0 mb-2 mt-2">
            <h2 className={styles.section_heading_profile}>
              Особистий кабінет
            </h2>
            <div className=" hidden laptop:block">
              <LogOutButton />
            </div>
          </div>
          <Profile />
        </Section>
      </Container>
    </PrivateRoute>
  );
}

export default Page;
