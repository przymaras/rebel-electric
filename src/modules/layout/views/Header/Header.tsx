import { useEffect, useState } from 'react';

import { NavBarsIcon } from 'src/assets/icons';
import RebelLogo from 'src/assets/rebel-electric-logo.svg';
import { Nav } from 'src/modules/layout/components/Nav';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isVisibleNav, setIsVisibleNav] = useState<boolean>(false);

  function toggleNav() {
    setIsVisibleNav((prevState) => !prevState);
  }

  function closeNav() {
    setTimeout(() => {
      setIsVisibleNav(false);
    }, 150);
  }

  useEffect(() => {
    document.body.style.overflow = isVisibleNav ? 'hidden' : '';
  }, [isVisibleNav]);

  return (
    <div className={styles.container} data-testid='Header'>
      <div className={styles.header}>
        <button onClick={toggleNav} className={styles.btn} data-testid='ToggleNavButton'>
          <NavBarsIcon height={40} />
        </button>
        <h2 className={`${styles.title} rebel-font`} data-testid='HeaderText'>
          REBEL
          <br /> ELECTRIC
        </h2>
        <div className={styles.img}>
          <RebelLogo title='Rebel Electric Logo' width={115} data-testid='HeaderLogo' />
        </div>
        <Nav isVisible={isVisibleNav} closeNav={closeNav} />
      </div>
    </div>
  );
};
