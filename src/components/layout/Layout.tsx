import styles from "./Layout.module.scss";

import Header from "./Header";
import Footer from "./Footer";

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
