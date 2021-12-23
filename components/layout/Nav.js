import styles from "./Nav.module.css";
import useTranslation from "next-translate/useTranslation";
import NavLink from "./NavLink";

import { IconAcademy } from "../icons/IconAcademy";

function Nav(props) {
  const { t } = useTranslation();
  return (
    <nav className={`${styles.nav} ${!props.isVisible && styles.hidden}`}>
      <div className={styles.container}>
        <NavLink
          href="/"
          icon={<IconAcademy />}
          name={t("common:navHome")}
          closeNav={props.closeNav}
        />
        <NavLink
          href="/knowledge"
          icon={<IconAcademy />}
          name={t("common:navKnowledgeBase")}
          closeNav={props.closeNav}
        />
        <NavLink
          href="/hangar"
          icon={<IconAcademy />}
          name={t("common:navHangar")}
          closeNav={props.closeNav}
        />
        <NavLink
          href="/hangar/add"
          icon={<IconAcademy />}
          name={t("common:navAddNew")}
          closeNav={props.closeNav}
        />

        <NavLink
          href="/users/login"
          icon={<IconAcademy />}
          name={t("common:navLogin")}
          login={true}
          closeNav={props.closeNav}
        />
      </div>
    </nav>
  );
}

export default Nav;
