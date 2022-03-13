import Image from 'next/image';
import { useEffect, useState } from 'react';

import Logo from '../../../public/img/rebel-electric-logo.svg';
import { IconNavBars } from '../icons/IconNavBars';
import styles from './Header.module.scss';
import Nav from './Nav';

const Header: React.FC = () => {
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
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={toggleNav} className={styles.btn}>
          <IconNavBars />
        </button>
        <h2 className={`${styles.title} rebel-font`}>
          REBEL
          <br /> ELECTRIC
        </h2>
        <div className={styles.img}>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image src={Logo} alt='Rebel Electric Logo' width={115} height={50} />
        </div>
        <Nav isVisible={isVisibleNav} closeNav={closeNav} />
      </div>
    </div>
  );
};
export default Header;
