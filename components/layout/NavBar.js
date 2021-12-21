import styles from "./NavBar.module.css";
import useTranslation from "next-translate/useTranslation";
import NavLink from "./NavLink";

import { IconAcademy } from "../icons/IconAcademy";

function NavBar(props) {
  const { t } = useTranslation();
  return (
    <>
      <NavLink
        href="/knowledge"
        icon={<IconAcademy />}
        name={t("common:navKnowledgeBase")}
      />
      <NavLink
        href="/hangar"
        icon={<IconAcademy />}
        name={t("common:navHangar")}
      />
      <NavLink
        href="/hangar/add"
        icon={<IconAcademy />}
        name={t("common:navAddNew")}
      />
      <NavLink
        href="/user/login"
        icon={<IconAcademy />}
        name={t("common:navLogin")}
      />
    </>
  );
}

export default NavBar;
