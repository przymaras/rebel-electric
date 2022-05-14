import RebelLogo from 'src/assets/rebel-electric-logo.svg';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={`${styles.img} ${styles.logo}`}>
          <RebelLogo width={139} title='Rebel Electric Logo' />
        </div>
      </div>
    </div>
  );
};
