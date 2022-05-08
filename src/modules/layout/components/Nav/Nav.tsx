import useTranslation from 'next-translate/useTranslation';

import { IconAcademy } from 'src/assets/icons/IconAcademy';
import { IconCirclePlus } from 'src/assets/icons/IconCirclePlus';
import { IconHangar } from 'src/assets/icons/IconHangar';
import { IconPowerOn } from 'src/assets/icons/IconPowerOn';
import { IconRebel } from 'src/assets/icons/IconRebel';
import { NavLink } from 'src/modules/layout/components/NavLink';

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
    >
      <div className={styles.container}>
        <NavLink
          href='/'
          icon={<IconRebel />}
          name={t('common:navHome')}
          closeNav={props.closeNav}
        />
        <NavLink
          href='/knowledge'
          icon={<IconAcademy />}
          name={t('common:navKnowledgeBase')}
          closeNav={props.closeNav}
        />
        <NavLink
          href='/hangar'
          icon={<IconHangar />}
          name={t('common:navHangar')}
          closeNav={props.closeNav}
        />
        <NavLink
          href='/hangar/add'
          icon={<IconCirclePlus />}
          name={t('common:navAddNew')}
          closeNav={props.closeNav}
        />

        <NavLink
          href='/users/login'
          icon={<IconPowerOn />}
          name={t('common:navLogin')}
          login={true}
          closeNav={props.closeNav}
        />
      </div>
    </nav>
  );
};
