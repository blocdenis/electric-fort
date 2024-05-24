import React from 'react';
import Breadcramb from './Breadcramb';

function PageBredcramb() {
  const links = [
    { name: 'Доставка і оплата', href: 'delivery' },
    { name: 'Умови повернення та обміну', href: 'return_policy' },
    { name: 'Політика конфіденційності', href: 'policy' },
    { name: 'Співпраця', href: 'cooperation' },
    { name: 'Категорії', href: 'categories' },
    { name: 'Публічна оферта', href: 'oferta' },
  ];
  return (
    <Breadcramb
      homeElement={<span className="pl-3">Головна</span>}
      separator={<span>/</span>}
      linksСorrespondence={links}
    />
  );
}

export default PageBredcramb;
