import styles from "./Nav.module.scss";
import useTranslation from "next-translate/useTranslation";
import NavLink from "./NavLink";

import { IconAcademy } from "../icons/IconAcademy";
import { IconPowerOn } from "../icons/IconPowerOn";

interface NavProps {
  closeNav: () => void;
  isVisible: boolean;
}

const Nav: React.FC<NavProps> = (props) => {
  const { t } = useTranslation();
  return (
    <nav
      onClick={props.closeNav}
      className={`${styles.nav} ${!props.isVisible && styles.hidden}`}
    >
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
          icon={<IconPowerOn />}
          name={t("common:navLogin")}
          login={true}
          closeNav={props.closeNav}
        />
      </div>
    </nav>
  );
};

export default Nav;
