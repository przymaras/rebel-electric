import RebelLogo from 'src/assets/rebel-electric-logo.svg';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.container} data-testid='Footer'>
      <div className={styles.footer}>
        <div className={`${styles.img} ${styles.logo}`}>
          <RebelLogo width={139} title='Rebel Electric Logo' data-testid='FooterLogo' />
        </div>
      </div>
    </div>
  );
};
