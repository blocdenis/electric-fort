import Container from '@/components/Container/Container';

import Section from '@/components/Section/Section';

import Breadcrumbs from '@/components/Breadcrumb/Breadcrumbs';
import Success from '@/components/icons/Success';
// import Link from 'next/link';
import styles from './styles.module.scss';
import { Link } from '@/navigation';
function Page() {
  const breadcrambsItens = [{ name: 'Оформлення замовлення' }];
  return (
    <Container className="flex flex-col">
      <Breadcrumbs items={breadcrambsItens} />
      <Section>
        <div className={styles.container}>
          <Success />
          <h1>Дякуємо за ваше замовлення!</h1>
          <h3>Ви отримаєте e-mail із подробицями замовлення</h3>
          <button className={styles.submit_button}>
            <Link href={'/'}>На головну</Link>
          </button>
        </div>
      </Section>
    </Container>
  );
}

export default Page;
