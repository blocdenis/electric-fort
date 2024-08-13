'use client';
import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import LogOutButton from '@/components/Buttons/LogOutButton/LogOutButton';
import Container from '@/components/Container/Container';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import Profile from '@/components/Profile/Profile';
import Section from '@/components/Section/Section';
import styles from '@/components/Section/SectionTitle/SectionTitle.module.scss';
import { useAuth } from '@/context/AuthContext';

function Page() {
  const links = [{ name: 'Особистий кабінет' }];
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <PrivateRoute isAuth={isAuthenticated}>
      <Container>
        <Breadcrumbs items={links} />
        <Section className="px-9">
          <div className=" flex justify-between mb-[19px]">
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
