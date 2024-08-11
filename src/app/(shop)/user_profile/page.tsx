import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import LogOutButton from '@/components/Buttons/LogOutButton/LogOutButton';
import Container from '@/components/Container/Container';
import Profile from '@/components/Profile/Profile';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';
import styles from '@/components/Section/SectionTitle/SectionTitle.module.scss';

function Page() {
  const links = [{ name: 'Особистий кабінет' }];
  return (
    <Container>
      <Breadcrumbs items={links} />
      <Section className="px-9">
        <div className=" flex justify-between mb-[19px]">
          <h2 className={styles.section_heading_profile}>Особистий кабінет</h2>
          <LogOutButton />
        </div>
        <Profile />
      </Section>
    </Container>
  );
}

export default Page;
