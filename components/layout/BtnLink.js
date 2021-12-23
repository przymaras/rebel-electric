import Link from "next/link";
import styles from "./BtnLink.module.css";

function BtnLink(props) {
  return (
    <Link href={props.href} passHref>
      <a className={styles.a}>
        <div className={styles.icoBox}>{props.icon}</div>
        <p className={styles.p}>{props.text}</p>
      </a>
    </Link>
  );
}

export default BtnLink;
