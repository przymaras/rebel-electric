import useTranslation from "next-translate/useTranslation";

import { IconAcademy } from "../icons/IconAcademy";

import TitleBox from "../layout/TitleBox";
import InfoBox from "../layout/InfoBox";

import styles from "./Hangar.module.css";

function Hangar(props) {
  const { t } = useTranslation();
  return (
    <>
      <TitleBox>
        <div>
          <IconAcademy />
          <h1 className="rebel-font"> {t("hangar:header")} </h1>
        </div>
        <p>{t("hangar:header-info")}</p>
      </TitleBox>
      <h2 className={`rebel-font ${styles.selectCategory}`}>
        {t("hangar:select-category")}
      </h2>
      <InfoBox>
        <p>{t("hangar:select-category-info-1")}</p>
        <p>{t("hangar:select-category-info-2")}</p>
      </InfoBox>
    </>
  );
}

export default Hangar;
