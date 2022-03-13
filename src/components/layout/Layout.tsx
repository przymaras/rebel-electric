import Footer from './Footer';
import Header from './Header';
import styles from './Layout.module.scss';

const Layout: React.FC = (props) => {
  return (
    <>
      <Header />
      <div className={styles.container}>{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
