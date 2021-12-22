import Image from "next/image";
import Nav from "./Nav";
import styles from "./Header.module.css";
import Logo from "../../public/img/rebel-electric-logo.svg";
import { IconNavBars } from "../icons/IconNavBars";
import { useEffect, useState } from "react";

function Header(props) {
  const [isVisibleNav, setIsVisibleNav] = useState(false);

  function toggleNav() {
    setIsVisibleNav((prevState) => !prevState);
  }

  function closeNav() {
    setTimeout(() => {
      setIsVisibleNav(false);
    }, 500);
  }

  useEffect(() => {
    isVisibleNav
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
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
          <Image src={Logo} alt="Rebel Electric Logo" width={115} height={50} />
        </div>
        <Nav isVisible={isVisibleNav} closeNav={closeNav} />
      </div>
    </div>
  );
}
export default Header;
