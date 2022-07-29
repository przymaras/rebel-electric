import Link from 'next/link';

import { SvgComponentType } from 'src/types';

import styles from './BtnLink.module.scss';

interface BtnLinkProps {
  horizontal?: boolean;
  href: string;
  icon: SvgComponentType;
  testId?: string;
  text: string;
}
//TODO: use classNames
export const BtnLink: React.FC<BtnLinkProps> = ({
  horizontal,
  href,
  icon: Icon,
  testId = '',
  text,
}) => {
  return (
    <Link href={href}>
      <a
        data-testid={`BtnLink${testId}`}
        className={`${styles.a} ${horizontal === true ? styles.horizontal : ''}`}
      >
        <div className={styles.icoBox}>{<Icon height={50} />}</div>
        <p className={styles.p}>{text}</p>
      </a>
    </Link>
  );
};
