import styles from "./Nav.module.scss";
import useTranslation from "next-translate/useTranslation";
import NavLink from "./NavLink";

import { IconAcademy } from "../icons/IconAcademy";
import { IconHangar } from "../icons/IconHangar";
import { IconPowerOn } from "../icons/IconPowerOn";
import { IconCirclePlus } from "../icons/IconCirclePlus";
import { IconRebel } from "../icons/IconRebel";

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
          icon={<IconRebel />}
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
          icon={<IconHangar />}
          name={t("common:navHangar")}
          closeNav={props.closeNav}
        />
        <NavLink
          href="/hangar/add"
          icon={<IconCirclePlus />}
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
