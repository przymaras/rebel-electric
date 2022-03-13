import Image from 'next/image';
import styles from './Footer.module.scss';
import Logo from '../../../public/img/rebel-electric-logo.svg';

const Footer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={`${styles.img} ${styles.logo}`}>
          <Image src={Logo} alt='Rebel Electric Logo' />
        </div>
      </div>
    </div>
  );
};
export default Footer;
