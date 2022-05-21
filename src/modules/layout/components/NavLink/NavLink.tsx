import Link from 'next/link';

import styles from './NavLink.module.scss';

interface NavLinkProps {
  closeNav: () => void;
  href: string;
  icon: React.ReactNode;
  login?: boolean;
  text: string;
  testId?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  closeNav,
  href,
  icon,
  login,
  text,
  testId = '',
}) => {
  return (
    <div className={`${styles.linkContainer} ${login === true ? styles.loginContainer : ''}`}>
      <Link href={`${href}`}>
        <a onClick={closeNav} data-testid={`NavLink${testId}`}>
          <div className={`${styles.icoBox} ${login === true ? styles.loginIcoBox : ''}`}>
            {icon}
          </div>
          {text}
        </a>
      </Link>
    </div>
  );
};
