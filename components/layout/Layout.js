import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";

function Layout(props) {
  return (
    <>
      <Header />
      <div className={styles.container}>{props.children}</div>
      <Footer />
    </>
  );
}

export default Layout;
