import Link from 'next/link';

import styles from './BtnLink.module.scss';

interface BtnLinkProps {
  href: string;
  horizontal?: boolean;
  icon: React.ReactNode;
  text: string;
}
//TODO: use classNames
export const BtnLink: React.FC<BtnLinkProps> = (props) => {
  return (
    <Link href={props.href} passHref>
      <a className={`${styles.a} ${props.horizontal === true ? styles.horizontal : ''}`}>
        <div className={styles.icoBox}>{props.icon}</div>
        <p className={styles.p}>{props.text}</p>
      </a>
    </Link>
  );
};
