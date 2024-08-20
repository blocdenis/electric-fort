import Container from '@/components/Container/Container';

import Section from '@/components/Section/Section';

import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
// import Link from 'next/link';
import styles from './styles.module.scss';
import SuccessPayment from '@/components/icons/SuccessPayment';
import { Link } from '@/navigation';
function Page() {
  const breadcrambsItens = [{ name: 'Оформлення замовлення' }];
  return (
    <Container className="flex flex-col">
      <Breadcrumbs items={breadcrambsItens} />
      <Section>
        <div className={styles.container}>
          <SuccessPayment />
          <h1>Дякуємо!</h1>
          <h3>Платіж успішно проведено</h3>
          <button className={styles.submit_button}>
            <Link href={'/'}>На головну</Link>
          </button>
        </div>
      </Section>
    </Container>
  );
}

export default Page;
