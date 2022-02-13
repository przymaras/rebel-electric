import useTranslation from "next-translate/useTranslation";

import { IconBattery } from "../icons/IconBattery";
import { IconLightning } from "../icons/IconLightning";
import { IconStar } from "../icons/IconStar";

import styles from "./DataBarLabels.module.scss";

const DataBarLabels: React.FC = (props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <IconStar />
        <p>{t("hangar:label-base")}</p>
      </div>
      <div className={styles.label}>
        <IconLightning />
        <p>{t("hangar:label-drive")}</p>
      </div>
      <div className={styles.label}>
        <IconBattery />
        <p>{t("hangar:label-battery")}</p>
      </div>
    </div>
  );
};

export default DataBarLabels;
