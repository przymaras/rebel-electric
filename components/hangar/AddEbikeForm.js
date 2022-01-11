import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { Persist } from "../tools/formik-persist";
import {
  TextInput,
  TextArea,
  Select,
  RadioInput,
  Fieldset,
  SubmitButton,
} from "../layout/formInputs";

// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import styles from "./AddEbikeForm.module.css";

import AddVehicleDataGroup from "./AddVehicleDataGroup";
import { useEffect, useRef, useState } from "react";
import FilePondStyles from "../layout/FilePondStyles";
import { IKUpload } from "imagekitio-react";
import { useDataFetcher } from "../../hooks/useDataFetcher";

let firstRun = true;

function AddEbikeForm(props) {
  let ebikeform = { values: { filePond: [""] } };

  if (typeof window !== "undefined") {
    ebikeform = JSON.parse(localStorage.getItem("addEbikeForm"));
  }

  const [imgDetails, isImgDetailsAvailable] = useDataFetcher(
    ebikeform.values.filePond[0]
      ? `/api/img/${ebikeform.values.filePond[0]}`
      : ""
  );

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (isImgDetailsAvailable) {
      setFiles([
        {
          // the server file reference
          source: imgDetails.name,

          // set type to limbo to tell FilePond this is a temp file
          options: {
            type: "local",
          },
        },
      ]);
      console.log(imgDetails);
    }
  }, [isImgDetailsAvailable, imgDetails]);

  const filePondRef = useRef();

  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
  };

  return (
    <>
      <FilePondStyles />
      <Formik
        initialValues={{
          projectName: "",
          video: "",
          description: "",
          manufacturer: "",
          model: "",
          year: "",
          wheelSize: "",
          brakes: "",
          mass: "",
          vmax: "",
          range: "",
          controller: "",
          ctrlVoltage: "",
          ctrlCurrent: "",
          motor: "",
          motorModel: "",
          batteryType: "",
          cellsType: "",
          batVoltage: "",
          batSeries: "",
          batParallels: "",
          cellsManuf: "",
          cellsModel: "",
          capacityWh: "",
          capacityAh: "",
          filePond: "",
        }}
        validationSchema={Yup.object({
          projectName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          video: Yup.string().url("Must be valid URL"),
          description: Yup.string(),
          year: Yup.number()
            .typeError("Must be a year")
            .min(1900, "Must be a year")
            .max(2100, "Must be a year"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
      >
        {(formik) => {
          return (
            <div className={styles.container}>
              <Form>
                <TextInput
                  label="Nazwa Projektu:"
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
                  <IKUpload
                    // fileName="test-upload.png"
                    onError={onError}
                    onSuccess={onSuccess}
                    publicKey="public_h821WuPXEZBS6QvIimCu4L2vFt8="
                    urlEndpoint="https://ik.imagekit.io/rebelelectric/"
                    authenticationEndpoint="/api/img"
                  />
                  <div className={styles.file}>
                    <FilePond
                      ref={filePondRef}
                      name="filePond"
                      files={files}
                      allowReorder={true}
                      allowMultiple={true}
                      maxFiles={10}
                      onupdatefiles={setFiles}
                      labelIdle="Przeciągnij zdjęcia na tę ramkę lub kliknij w nią, aby wyświetlić eksplorator plików."
                      // oninit={}
                      onreorderfiles={() => {
                        const filesIds = filePondRef.current
                          .getFiles()
                          .map((file) => file.serverId);
                        formik.setFieldValue("filePond", filesIds);
                      }}
                      onprocessfiles={() => {
                        const filesIds = filePondRef.current
                          .getFiles()
                          .map((file) => file.serverId);
                        formik.setFieldValue("filePond", filesIds);
                      }}
                      server={{
                        process: async (
                          fieldName,
                          file,
                          metadata,
                          load,
                          error,
                          progress,
                          abort
                        ) => {
                          // fieldName is the name of the input field
                          // file is the actual file object to send

                          const res = await fetch("/api/img/");
                          const imgAuth = await res.json();

                          const formData = new FormData();
                          formData.append("file", file);
                          formData.append("fileName", file.name);
                          formData.append("folder", "/tmp/");
                          formData.append("signature", imgAuth.signature);
                          formData.append("token", imgAuth.token);
                          formData.append("expire", imgAuth.expire);
                          formData.append(
                            "publicKey",
                            "public_h821WuPXEZBS6QvIimCu4L2vFt8="
                          );

                          const request = new XMLHttpRequest();
                          request.open(
                            "POST",
                            "https://upload.imagekit.io/api/v1/files/upload"
                          );

                          // Should call the progress method to update the progress to 100% before calling load
                          // Setting computable to false switches the loading indicator to infinite mode
                          request.upload.onprogress = (e) => {
                            progress(e.lengthComputable, e.loaded, e.total);
                          };

                          // Should call the load method when done and pass the returned server file id
                          // this server file id is then used later on when reverting or restoring a file
                          // so your server knows which file to return without exposing that info to the client
                          request.onload = function () {
                            if (request.status >= 200 && request.status < 300) {
                              // the load method accepts either a string (id) or an object
                              load(JSON.parse(request.responseText).fileId);
                              console.log(JSON.parse(request.responseText));
                              console.log(
                                JSON.parse(request.responseText).fileId
                              );
                            } else {
                              // Can call the error method if something is wrong, should exit after
                              error("oh no");
                            }
                          };

                          request.send(formData);

                          // Should expose an abort method so the request can be cancelled
                          return {
                            abort: () => {
                              // This function is entered if the user has tapped the cancel button
                              request.abort();

                              // Let FilePond know the request has been cancelled
                              abort();
                            },
                          };
                        },
                        load: `https://ik.imagekit.io/rebelelectric/tmp/`,
                        // restore: async (
                        //   uniqueFileId,
                        //   load,
                        //   error,
                        //   progress,
                        //   abort,
                        //   headers
                        // ) => {
                        //   // Should get the temporary file object from the server
                        //   // ...
                        //   const res = fetch(
                        //     "https://ik.imagekit.io/rebelelectric/tmp/20210915_140642_3sD_615T0f.jpg"
                        //   );
                        //   const fileBlob = await res;
                        //   console.log(fileBlob);
                        //   // Can call the error method if something is wrong, should exit after
                        //   error("oh my goodness");

                        //   // Can call the header method to supply FilePond with early response header string
                        //   // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
                        //   //headers(headersString);

                        //   // Should call the progress method to update the progress to 100% before calling load
                        //   // (computable, loadedSize, totalSize)
                        //   progress(true, 0, 1024);

                        //   // Should call the load method with a file object when done
                        //   load(fileBlob);

                        //   // Should expose an abort method so the request can be cancelled
                        //   return {
                        //     abort: () => {
                        //       // User tapped abort, cancel our ongoing actions here

                        //       // Let FilePond know the request has been cancelled
                        //       abort();
                        //     },
                        //   };
                        // },
                      }}
                    />
                  </div>
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
                  label="Dodaj opis:"
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
                  poznania Twojej maszyny! Nie rezygnuj z nich lub uzupelnij je
                  w późniejszym czasie! Możesz uzupełnić tylko niektóre z nich,
                  a pozostałe zostawić puste ...
                </p>
                <div className={styles.data}>
                  <AddVehicleDataGroup style="base" name="baza">
                    <Select label="Marka" name="manufacturer">
                      <option value="">Marka</option>
                      <option value="manufacturer1">Marka1</option>
                      <option value="manufacturer2">Marka2</option>
                    </Select>

                    <Select label="Model" name="model">
                      <option value="">Model</option>
                      <option value="model1">Model1</option>
                      <option value="model2">Model2</option>
                    </Select>

                    <TextInput
                      label="Rok produkcji bazy"
                      name="year"
                      type="text"
                      placeholder=""
                      description=""
                    />

                    <Fieldset legend="Rozmiar kół">
                      <RadioInput
                        label="20''"
                        type="radio"
                        name="wheelSize"
                        value="20"
                      />
                      <RadioInput
                        label="24''"
                        type="radio"
                        name="wheelSize"
                        value="24"
                      />
                      <RadioInput
                        label="26''"
                        type="radio"
                        name="wheelSize"
                        value="26"
                      />
                      <RadioInput
                        label="27,5''"
                        type="radio"
                        name="wheelSize"
                        value="27.5"
                      />
                      <RadioInput
                        label="28/29''"
                        type="radio"
                        name="wheelSize"
                        value="28"
                      />
                      <RadioInput
                        label="18'' moto"
                        type="radio"
                        name="wheelSize"
                        value="18"
                      />
                      <RadioInput
                        label="19'' moto"
                        type="radio"
                        name="wheelSize"
                        value="19"
                      />
                      <RadioInput
                        label="Inne"
                        type="radio"
                        name="wheelSize"
                        value="other"
                      />
                    </Fieldset>

                    <Select label="Rodzaj hamulców" name="brakes">
                      <option value="">Rodzaj hamulców</option>
                      <option value="brakes1">Rodzaj hamulców1</option>
                      <option value="brakes2">Rodzaj hamulców2</option>
                    </Select>

                    <TextInput
                      label="Masa [kg]"
                      name="mass"
                      type="text"
                      placeholder=""
                      description=""
                    />

                    <TextInput
                      label="Prędkość maksymalna [km/h]"
                      name="vmax"
                      type="text"
                      placeholder=""
                      description=""
                    />

                    <TextInput
                      label="Zasięg roweru [km]"
                      name="range"
                      type="text"
                      placeholder=""
                      description=""
                    />
                  </AddVehicleDataGroup>
                  <AddVehicleDataGroup style="electrical" name="elektryka">
                    <Select label="Sterownik" name="controller">
                      <option value="">Wybierz sterownik</option>
                      <option value="controller1">Sterownik1</option>
                      <option value="controller2">Sterownik2</option>
                    </Select>

                    <TextInput
                      label="Napięcie nominalne sterownika [V]"
                      name="ctrlVoltage"
                      type="text"
                      placeholder=""
                      description=""
                    />

                    <TextInput
                      label="Prąd maksymalny pobierany z baterii [A]"
                      name="ctrlCurrent"
                      type="text"
                      placeholder=""
                      description=""
                    />

                    <Select label="Marka silnika" name="motor">
                      <option value="">Wybierz markę</option>
                      <option value="motor1">Silnik1</option>
                      <option value="motor2">Silnik2</option>
                    </Select>

                    <Select label="Model silnika" name="motorModel">
                      <option value="">Wybierz model</option>
                      <option value="motorModel1">Model1</option>
                      <option value="motorModel2">Model2</option>
                    </Select>
                  </AddVehicleDataGroup>

                  <AddVehicleDataGroup style="battery" name="bateria">
                    <Select label="Sposób montażu baterii" name="batteryType">
                      <option value="">Wybierz typ</option>
                      <option value="batteryType1">Typ1</option>
                      <option value="batteryType2">Typ2</option>
                    </Select>

                    <Select label="Typ ogniw" name="cellsType">
                      <option value="">Wybierz typ</option>
                      <option value="cellsType1">Typ1</option>
                      <option value="cellsType2">Typ2</option>
                    </Select>

                    <TextInput
                      label="Napięcie nominalne [V]"
                      name="batVoltage"
                      type="text"
                      placeholder=""
                      description=""
                    />

                    <TextInput
                      label="Il. połączeń szeregowych / S"
                      name="batSeries"
                      type="text"
                      placeholder=""
                      description=""
                    />

                    <TextInput
                      label="Il. połączeń równoległych / P"
                      name="batParallels"
                      type="text"
                      placeholder=""
                      description=""
                    />

                    <Select label="Marka ogniw" name="cellsManuf">
                      <option value="">Wybierz markę</option>
                      <option value="cellsManuf1">Marka1</option>
                      <option value="cellsManuf2">Marka2</option>
                    </Select>

                    <Select label="Model ogniw" name="cellsModel">
                      <option value="">Wybierz model</option>
                      <option value="cellsModel1">Model1</option>
                      <option value="cellsModel2">Model2</option>
                    </Select>

                    <TextInput
                      label="Pojemność w watogodzinach [Wh]"
                      name="capacityWh"
                      type="text"
                      placeholder=""
                      description=""
                    />

                    <TextInput
                      label="Pojemność w amperogodzinach [Ah]"
                      name="capacityAh"
                      type="text"
                      placeholder=""
                      description=""
                    />
                  </AddVehicleDataGroup>
                </div>

                <SubmitButton
                  formik={formik}
                  text="Dodaj"
                  errorMsg=" Uzupełnij wszystkie wymagane pola!"
                />
                <Persist name="addEbikeForm" />
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}

export default AddEbikeForm;
