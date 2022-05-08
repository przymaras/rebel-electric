import Image from 'next/image';

import Logo from 'public/img/rebel-electric-logo.svg';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={`${styles.img} ${styles.logo}`}>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <Image src={Logo} alt='Rebel Electric Logo' />
        </div>
      </div>
    </div>
  );
};
