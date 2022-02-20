import { useEffect, useRef, useState } from "react";
import { useDataFetcher } from "../../hooks/useDataFetcher";
import { nanoid } from "nanoid";

import { ErrorMessage, Form, FormikProps } from "formik";
import { Persist } from "../../utils/formik-persist";
import {
  TextInput,
  TextArea,
  Select,
  RadioInput,
  Fieldset,
  SubmitButton,
} from "../layout/formInputs";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileRename from "filepond-plugin-file-rename";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import FilePondStyles from "../layout/FilePondStyles";
import { getServerSettings } from "../../utils/filepond-functions";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileRename,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType
);

import { ItemManufacturerObj } from "../../../src/models/hangar";
import { useStore } from "../../store/useStore";
import { StoreState } from "../../store/useStore";

import styles from "./AddEbikeForm.module.scss";

import AddVehicleDataGroup from "./AddVehicleDataGroup";
import { getSelectedCategoryId } from "../../utils/common-functions";

let isRefreshRender = false;

interface AddEbikeFormProps {
  formik: FormikProps<any>;
  setRemoveImages: (f: Function) => void;
  controllersData: ItemManufacturerObj[];
  motorsData: ItemManufacturerObj[];
}

const newCategoryChosenSelector = (state: StoreState) =>
  state.newCategoryChosen;

const AddEbikeForm: React.FC<AddEbikeFormProps> = (props) => {
  const newCategoryChosen = useStore(newCategoryChosenSelector);
  const filePondRef = useRef<FilePond>(null);

  const [imageFiles, setImageFiles] = useState<any[]>([]);
  const [imagesToRestoreIDs, setImagesToRestoreIDs] = useState("");

  useEffect(() => {
    if (!isRefreshRender && props.formik.values?.vehicleImages?.length > 0) {
      setImagesToRestoreIDs(props.formik.values.vehicleImages.join("/"));
      console.log(props.formik.values.vehicleImages.join("/"), "ue-1");
    }
  }, [props.formik.values.vehicleImages]);

  const apiUrl = imagesToRestoreIDs ? `/api/img/${imagesToRestoreIDs}` : "";
  const [imgsToRestoreDetails, isImgDetailsAvailable] = useDataFetcher(apiUrl);

  useEffect(() => {
    if (isImgDetailsAvailable) {
      setImageFiles(
        imgsToRestoreDetails.map((img) => {
          return {
            source: img.name,
            options: {
              type: "limbo", //limbo calls restore method in server settings
            },
          };
        })
      );
      console.log(imgsToRestoreDetails, "ue-2");
    }
  }, [isImgDetailsAvailable, imgsToRestoreDetails]);

  useEffect(() => {
    if (newCategoryChosen) {
      props.formik.setFieldValue(
        "category",
        getSelectedCategoryId(
          useStore.getState().vehiclesCategories,
          useStore.getState().addVehicleCategory
        )
      );
      useStore.getState().setNewCategoryChosen(false);
    }
  }, [props.formik, newCategoryChosen]);

  function updateFormikImagesFieldValue() {
    isRefreshRender = true;
    if (!props.formik.isSubmitting) {
      const filesIds = filePondRef
        .current!.getFiles()
        .map((file) => file.serverId);
      props.formik.setFieldValue("vehicleImages", filesIds);
    }
  }

  function removeFileHandler() {
    isRefreshRender = true;
    if (!props.formik.isSubmitting) {
      const filesIds = filePondRef
        .current!.getFiles()
        .map((file) => file.serverId);
      // props.formik.setFieldValue("vehicleImages", filesIds);
      props.formik.values.vehicleImages = filesIds; // FIXME: I'm mutating state directly because filepond goes mad when removing file and updating state of formik - I don't know why.. Maybe because of rerender forced by formik, while filepond's remove proomise isn't resolved?
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Form>
          <TextInput
            label={`Nazwa Projektu: (${props.formik.values.projectName.length} / max. 30 znaków)`}
            name="projectName"
            type="text"
            placeholder=""
            description="(będzie wyświetlana nad galerią)"
            rebelHeading={true}
          />
          <div>
            <h2 className={`${styles.addPhotosTitle} rebel-font`}>
              Dodaj zdjęcia:
            </h2>
            <p>
              Przynajmniej jedno zdjęcie jest wymagane, dodaj maksymalnie
              dziesięć.
            </p>
            <div className={styles.file}>
              <FilePondStyles />
              <FilePond
                ref={filePondRef}
                name="vehicleImages"
                files={imageFiles}
                allowReorder={true}
                allowMultiple={true}
                maxFiles={10}
                imagePreviewMaxFileSize="10MB"
                acceptedFileTypes={["image/png", "image/jpeg"]}
                imageResizeTargetWidth={2000}
                imageResizeTargetHeight={2000}
                imageResizeMode="contain"
                fileRenameFunction={(file) => {
                  return `hangar_${nanoid(5)}${file.extension}`;
                }}
                onupdatefiles={(files) => {
                  setImageFiles(files);
                  props.setRemoveImages(filePondRef.current!.removeFiles);
                }}
                // labelIdle="Przeciągnij zdjęcia na tę ramkę lub kliknij w nią, aby wyświetlić eksplorator plików."
                onreorderfiles={updateFormikImagesFieldValue}
                onprocessfiles={updateFormikImagesFieldValue}
                onremovefile={removeFileHandler}
                server={getServerSettings(imgsToRestoreDetails)}
              />
            </div>
            <ErrorMessage name="vehicleImages">
              {(msg) => <div className={styles.error}>{msg}</div>}
            </ErrorMessage>
          </div>
          <TextInput
            label="Dodaj prezentację video!"
            name="video"
            type="text"
            placeholder=""
            description=""
            rebelHeading={true}
          />
          <TextArea
            label={`Dodaj opis: (${props.formik.values.description.length} / max. 1000 znaków)`}
            name="description"
            type="text-area"
            placeholder=""
            rebelHeading={true}
            description="Napisz kilka słów o swoim pojeździe - pochwal się jego
            historią, osiągami i ile lat go użytkujesz. Jak zaczęła się Twoja
            historia z elektrykami? Użytkownicy Rebel-electric chętnie
            dowiedzą się więcej informacji o Tobie i Twoim e-bike'u!"
          />

          <p className={styles.info}>
            Poniższe pola są opcjonalne, jednak bardzo ważne dla lepszego
            poznania Twojej maszyny! Nie rezygnuj z nich lub uzupelnij je w
            późniejszym czasie! Możesz uzupełnić tylko niektóre z nich, a
            pozostałe zostawić puste ...
          </p>
          <div className={styles.data}>
            <AddVehicleDataGroup style="base" name="baza">
              <TextInput
                label="Baza: (marka / model / rok ) "
                name="bikeBase"
                type="text"
                placeholder=""
                description="np: Kona Stinky 2005r"
              />

              <Select label="Rozmiar kół" name="wheelSize">
                <option value="">Rozmiar kół</option>
                <option value="20">{"20''"}</option>
                <option value="24">{"24''"}</option>
                <option value="26">{"26''"}</option>
                <option value="27.5">{"27.5''"}</option>
                <option value="28/29">{"28/29''"}</option>
                <option value="18moto">{"18'' moto"}</option>
                <option value="19moto">{"19'' moto"}</option>
                <option value="other">{"Inny"}</option>
              </Select>

              <TextInput
                label="Podaj rozmiar kół: "
                name="wheelOther"
                type="text"
                placeholder=""
                description="To pole jest widoczne, ponieważ wybrałeś ''inny'' "
                hidden={props.formik.values.wheelSize !== "other"}
              />

              <Select label="Rodzaj hamulców" name="brakes">
                <option value="">Wybierz rodzaj</option>
                <option value="discHydraulic">Tarczowe mechaniczne</option>
                <option value="discMechanic">Tarczowe hydrauliczne</option>
                <option value="vBrake">V-brake</option>
                <option value="uBrake">U-brake</option>
                <option value="other">Inny</option>
              </Select>

              <TextInput
                label="Podaj rodzaj hamulców: "
                name="brakesOther"
                type="text"
                placeholder=""
                description="To pole jest widoczne, ponieważ wybrałeś ''inny'' "
                hidden={props.formik.values.brakes !== "other"}
              />

              <Fieldset name="massUnit" legend="Masa po konwersji na eBike">
                <TextInput
                  label="Podaj masę pojazdu i wybierz jednostkę, w której ją wpisałeś"
                  name="mass"
                  type="text"
                  placeholder=""
                  description=""
                />

                <RadioInput
                  label="kg"
                  type="radio"
                  name="massUnit"
                  value="kg"
                />
                <RadioInput
                  label="lbs"
                  type="radio"
                  name="massUnit"
                  value="lbs"
                />
              </Fieldset>

              <Fieldset name="vmaxUnit" legend="Prędkość maksymalna">
                <TextInput
                  label="Podaj prędkość maksymalną i wybierz jednostkę, w której ją wpisałeś"
                  name="vmax"
                  type="text"
                  placeholder=""
                  description=""
                />

                <RadioInput
                  label="km/h"
                  type="radio"
                  name="vmaxUnit"
                  value="kph"
                />
                <RadioInput
                  label="mil/h"
                  type="radio"
                  name="vmaxUnit"
                  value="mph"
                />
              </Fieldset>

              <Fieldset name="rangeUnit" legend="Średni zasięg:">
                <TextInput
                  label="Podaj zasięg na jednym ładowaniu i wybierz jednostkę, w której go wpisałeś"
                  name="range"
                  type="text"
                  placeholder=""
                  description=""
                />

                <RadioInput
                  label="km"
                  type="radio"
                  name="rangeUnit"
                  value="km"
                />
                <RadioInput
                  label="mil"
                  type="radio"
                  name="rangeUnit"
                  value="mi"
                />
              </Fieldset>

              <Fieldset
                name="totalCostCurrency"
                legend="Szacunkowy koszt projektu:"
              >
                <TextInput
                  label="Podaj koszt i wybierz walutę, w której go wpisałeś"
                  name="totalCost"
                  type="text"
                  placeholder=""
                  description=""
                />

                <RadioInput
                  label="PLN"
                  type="radio"
                  name="totalCostCurrency"
                  value="PLN"
                />
                <RadioInput
                  label="USD"
                  type="radio"
                  name="totalCostCurrency"
                  value="USD"
                />
                <RadioInput
                  label="EUR"
                  type="radio"
                  name="totalCostCurrency"
                  value="EUR"
                />
                <RadioInput
                  label="GBP"
                  type="radio"
                  name="totalCostCurrency"
                  value="GBP"
                />
              </Fieldset>
            </AddVehicleDataGroup>
            <AddVehicleDataGroup style="electrical" name="elektryka">
              <Select label="Producent sterownika" name="ctrlManuf">
                <option value="">Wybierz producenta</option>
                {props.controllersData &&
                  props.controllersData.map(
                    (controller: ItemManufacturerObj) => {
                      const option = (
                        <option key={controller._id} value={controller._id}>
                          {controller.manufacturer}
                        </option>
                      );
                      return controller.validated ? option : null;
                    }
                  )}
                {/* <option value="ctrlManuf1">Producent1</option>
                <option value="ctrlManuf2">Producent2</option> */}
                <option value="other">Inny</option>
              </Select>

              <TextInput
                label="Podaj producenta sterownika: "
                name="ctrlManufOther"
                type="text"
                placeholder=""
                description="To pole jest widoczne, ponieważ wybrałeś ''inny'' "
                hidden={props.formik.values.ctrlManuf !== "other"}
              />

              <Select
                label="Model sterownika"
                name="ctrlModel"
                disabled={!props.formik.values.ctrlManuf}
              >
                <option value="">Wybierz model</option>
                {props.controllersData &&
                  props.controllersData
                    .find(
                      (controller) =>
                        controller._id === props.formik.values.ctrlManuf
                    )
                    ?.models.map((ctrlModel) => {
                      const option = (
                        <option key={ctrlModel._id} value={ctrlModel._id}>
                          {ctrlModel.model}
                        </option>
                      );
                      return ctrlModel.validated ? option : null;
                    })}
                {/* <option value="controller1">Sterownik1</option>
                <option value="controller2">Sterownik2</option> */}
                <option value="other">Inny</option>
              </Select>

              <TextInput
                label="Podaj model sterownika: "
                name="ctrlModelOther"
                type="text"
                placeholder=""
                description="To pole jest widoczne, ponieważ wybrałeś ''inny'' "
                hidden={props.formik.values.ctrlModel !== "other"}
              />

              <TextInput
                label="Prąd maksymalny pobierany z baterii przez sterownik [A]"
                name="ctrlCurrent"
                type="text"
                placeholder=""
                description=""
              />

              <Select label="Marka silnika" name="motorManuf">
                <option value="">Wybierz markę</option>
                {props.motorsData &&
                  props.motorsData.map((motor: ItemManufacturerObj) => {
                    return (
                      <option key={motor._id} value={motor._id}>
                        {motor.manufacturer}
                      </option>
                    );
                  })}
                {/* <option value="motor1">Silnik1</option>
                <option value="motor2">Silnik2</option> */}
                <option value="other">Inny</option>
              </Select>

              <TextInput
                label="Podaj markę silnika: "
                name="motorManufOther"
                type="text"
                placeholder=""
                description="To pole jest widoczne, ponieważ wybrałeś ''inny'' "
                hidden={props.formik.values.motorManuf !== "other"}
              />

              <Select
                label="Model silnika"
                name="motorModel"
                disabled={!props.formik.values.motorManuf}
              >
                <option value="">Wybierz model</option>
                {props.motorsData &&
                  props.motorsData
                    .find(
                      (motor) => motor._id === props.formik.values.motorManuf
                    )
                    ?.models.map((motorModel) => {
                      return (
                        <option key={motorModel._id} value={motorModel._id}>
                          {motorModel.model}
                        </option>
                      );
                    })}
                {/* <option value="motorModel1">Model1</option>
                <option value="motorModel2">Model2</option> */}
                <option value="other">Inny</option>
              </Select>

              <TextInput
                label="Podaj model silnika: "
                name="motorModelOther"
                type="text"
                placeholder=""
                description="To pole jest widoczne, ponieważ wybrałeś ''inny'' "
                hidden={props.formik.values.motorModel !== "other"}
              />
            </AddVehicleDataGroup>

            <AddVehicleDataGroup style="battery" name="bateria">
              <Select label="Sposób montażu baterii" name="batteryCase">
                <option value="">Wybierz typ</option>
                <option value="textileBag">Torba</option>
                <option value="resinCase">Skrzynka z żywicy</option>
                <option value="woddenCase">Skrzynka z drewna</option>
                <option value="aluCase">Skrzynka z aluminium</option>
                <option value="3dPrintCase">Skrzynka z druku 3D</option>
                <option value="waterBottleCase">Bateria bidonowa</option>
                <option value="backpack">Plecak</option>
                <option value="other">Inny</option>
              </Select>

              <TextInput
                label="Podaj sposób montażu: "
                name="batteryCaseOther"
                type="text"
                placeholder=""
                description="To pole jest widoczne, ponieważ wybrałeś ''inny'' "
                hidden={props.formik.values.batteryCase !== "other"}
              />

              <Select label="Typ ogniw" name="cellsType">
                <option value="">Wybierz typ</option>
                <option value="liIon">Li-ion</option>
                <option value="liPo">Li-Po</option>
                <option value="liFePo4">LiFePo4</option>
                <option value="leadAcid">Ołowiowe - elektrolitowe</option>
                <option value="leadGel">Ołowiowe - Żelowe</option>
                <option value="leadAgm">Ołowiowe - AGM</option>
                <option value="other">Inny</option>
              </Select>

              <TextInput
                label="Podaj typ ogniw: "
                name="cellsTypeOther"
                type="text"
                placeholder=""
                description="To pole jest widoczne, ponieważ wybrałeś ''inny'' "
                hidden={props.formik.values.cellsType !== "other"}
              />

              <TextInput
                label="Napięcie nominalne [V]"
                name="batVoltage"
                type="text"
                placeholder=""
                description=""
              />

              <Fieldset name="capacityUnit" legend="Pojemność baterii">
                <TextInput
                  label="Podaj pojemność baterii i wybierz jednostkę, w której ją wpisałeś"
                  name="capacity"
                  type="text"
                  placeholder=""
                  description="(druga wartość zostanie wyliczona automatycznie)"
                />

                <RadioInput
                  label="Ah"
                  type="radio"
                  name="capacityUnit"
                  value="Ah"
                />
                <RadioInput
                  label="Wh"
                  type="radio"
                  name="capacityUnit"
                  value="Wh"
                />
              </Fieldset>
            </AddVehicleDataGroup>
          </div>

          <SubmitButton
            formik={props.formik}
            text="Dodaj"
            errorMsg=" Uzupełnij wszystkie wymagane pola!"
          />
          <Persist name="addEbikeForm" />
        </Form>
      </div>
    </>
  );
};

export default AddEbikeForm;
