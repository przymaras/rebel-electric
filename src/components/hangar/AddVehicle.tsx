import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { ItemManufacturerObj } from "../../../src/models/hangar";

import styles from "./Hangar.module.scss";

import { IconAcademy } from "../icons/IconAcademy";
import TitleBox from "../layout/TitleBox";
import InfoBox from "../layout/InfoBox";
import AddEbikeFormikContext from "./AddEbikeFormikContext";
import { AddEbikeValues } from "../../models/hangar";

const AddVehicle: React.FC<{
  controllersData: ItemManufacturerObj[];
  motorsData: ItemManufacturerObj[];
}> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();

  function onAddVehicle(enteredData: AddEbikeValues) {
    //POST request with body equal on data in JSON format
    // console.log(enteredData);
    fetch("/api/vehicles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredData),
    })
      .then((response) => response.ok)
      //Then with the data from the response in JSON...
      .then((data) => {
        console.log("Success:", data);
        router.replace("/hangar");
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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

      <AddEbikeFormikContext
        onAddVehicle={onAddVehicle}
        controllersData={props.controllersData}
        motorsData={props.motorsData}
      />
    </>
  );
};

export default AddVehicle;
