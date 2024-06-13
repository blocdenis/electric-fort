import Link, { LinkProps } from 'next/link';

export type BreadcrambsItemProps = Omit<LinkProps, 'href'> & {
  href?: LinkProps['href'];
  name: string | undefined;
};

function BreadcrumbsItem({ name, href, ...props }: BreadcrambsItemProps) {
  return href ? (
    <Link href={href} {...props}>
      {name}
    </Link>
  ) : (
    <span>{name}</span>
  );
}

export default BreadcrumbsItem;
