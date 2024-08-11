import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import LogOutButton from '@/components/Buttons/LogOutButton/LogOutButton';
import Container from '@/components/Container/Container';
import Profile from '@/components/Profile/Profile';
import Section from '@/components/Section/Section';
import SectionTitle from '@/components/Section/SectionTitle/SectionTitle';

function Page() {
  const links = [{ name: 'Особистий кабінет' }];
  return (
    <Container>
      <Breadcrumbs items={links} />
      <Section className="px-9">
        <div className=" flex justify-between mb-[19px]">
          <SectionTitle
            title="Особистий кабінет"
            className="before:content-['']"
          />
          {/* <Link
            className=" bg-primary_green flex justify-center items-center text-black px-[65.5px] py-[7.5px]"
            href="/"
          >
            Вийти
          </Link> */}
          <LogOutButton />
        </div>
        <Profile />
      </Section>
    </Container>
  );
}

export default Page;
