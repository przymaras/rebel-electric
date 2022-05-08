import Link from 'next/link';

import styles from './NavLink.module.scss';

interface NavLinkProps {
  closeNav: () => void;
  login?: boolean;
  href: string;
  icon: React.ReactNode;
  name: string;
}

export const NavLink: React.FC<NavLinkProps> = (props) => {
  return (
    <div
      onClick={props.closeNav}
      className={`${styles.linkContainer} ${props.login === true ? styles.loginContainer : ''}`}
    >
      <Link href={`${props.href}`} passHref>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a>
          <div className={`${styles.icoBox} ${props.login === true ? styles.loginIcoBox : ''}`}>
            {props.icon}
          </div>
          {props.name}
        </a>
      </Link>
    </div>
  );
};
