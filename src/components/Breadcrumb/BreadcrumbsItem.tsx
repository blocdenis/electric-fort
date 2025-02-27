import Link, { LinkProps } from 'next/link';

export type BreadcrambsItemProps = Omit<LinkProps, 'href'> & {
  href?: LinkProps['href'];
  name: string | undefined;
};

function BreadcrumbsItem({ name, href, ...props }: BreadcrambsItemProps) {
  return href ? (
    <Link title={name} href={href} {...props}>
      {name}
    </Link>
  ) : (
    <span title={name}>{name}</span>
  );
}

export default BreadcrumbsItem;
