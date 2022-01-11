import useTranslation from "next-translate/useTranslation";

import styles from "./Hangar.module.css";

import { IconAcademy } from "../icons/IconAcademy";
import TitleBox from "../layout/TitleBox";
import InfoBox from "../layout/InfoBox";
import CategorySelector from "./CategorySelector";
import AddEbikeFormikContext from "./AddEbikeFormikContext";

function AddVehicle(props) {
  const { t } = useTranslation();
  return (
    <>
      <TitleBox>
        <div className={styles.title}>
          <IconAcademy />
          <h1 className="rebel-font" style={{ fontSize: "5rem" }}>
            {" "}
            {t("hangar:header")}{" "}
          </h1>
        </div>
        <p>{t("hangar:header-add-info")}</p>
      </TitleBox>
      <div className={styles.sectionWrapper}>
        <h2 className={`rebel-font ${styles.selectCategoryTitle}`}>
          {t("hangar:select-category")}
        </h2>

        <InfoBox>
          <p>{t("hangar:select-category-info-1")}</p>
        </InfoBox>
      </div>

      <CategorySelector />
      <AddEbikeFormikContext />
    </>
  );
}

export default AddVehicle;
