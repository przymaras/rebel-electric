import useTranslation from 'next-translate/useTranslation';

import { NavLink } from 'src/modules/layout/components/NavLink';
import { navItems } from 'src/modules/layout/navData';

import styles from './Nav.module.scss';

interface NavProps {
  closeNav: () => void;
  isVisible: boolean;
}

export const Nav: React.FC<NavProps> = (props) => {
  const { t } = useTranslation();
  return (
    <nav
      onClick={props.closeNav}
      className={`${styles.nav} ${!props.isVisible ? styles.hidden : ''}`}
      data-testid='Nav'
    >
      <div className={styles.container}>
        {navItems.map(({ name, href, text, icon: Icon }, i) => (
          <NavLink
            key={i}
            href={href}
            icon={<Icon height={20} />}
            text={t(text)}
            closeNav={props.closeNav}
            login={name.toLowerCase() === 'login'}
            testId={name}
          />
        ))}
      </div>
    </nav>
  );
};
