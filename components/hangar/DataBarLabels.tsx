import useTranslation from "next-translate/useTranslation";

import { IconAcademy } from "../icons/IconAcademy";

import styles from "./DataBarLabels.module.css";

const DataBarLabels: React.FC = (props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <IconAcademy />
        <p>{t("hangar:label-base")}</p>
      </div>
      <div className={styles.label}>
        <IconAcademy />
        <p>{t("hangar:label-drive")}</p>
      </div>
      <div className={styles.label}>
        <IconAcademy />
        <p>{t("hangar:label-battery")}</p>
      </div>
    </div>
  );
};

export default DataBarLabels;
