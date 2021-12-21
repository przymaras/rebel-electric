import Link from "next/link";
import styles from "./NavLink.module.css";

function NavLink(props) {
  return (
    <div className={styles.linkContainer}>
      <Link href={`${props.href}`} passHref>
        <a>
          <div className={styles.icoBox}>{props.icon}</div>
          {props.name}
        </a>
      </Link>
    </div>
  );
}

export default NavLink;
