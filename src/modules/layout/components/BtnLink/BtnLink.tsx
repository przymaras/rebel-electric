import Link from 'next/link';

import styles from './BtnLink.module.scss';

interface BtnLinkProps {
  horizontal?: boolean;
  href: string;
  icon: React.ReactNode;
  testId?: string;
  text: string;
}
//TODO: use classNames
export const BtnLink: React.FC<BtnLinkProps> = ({ horizontal, href, icon, testId = '', text }) => {
  return (
    <Link href={href}>
      <a
        data-testid={`BtnLink${testId}`}
        className={`${styles.a} ${horizontal === true ? styles.horizontal : ''}`}
      >
        <div className={styles.icoBox}>{icon}</div>
        <p className={styles.p}>{text}</p>
      </a>
    </Link>
  );
};
