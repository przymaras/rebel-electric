import { Footer } from 'src/modules/layout/views/Footer';
import { Header } from 'src/modules/layout/views/Header';

import styles from './Layout.module.scss';

export const Layout: React.FC = (props) => {
  return (
    <>
      <Header />
      <div className={styles.container}>{props.children}</div>
      <Footer />
    </>
  );
};
