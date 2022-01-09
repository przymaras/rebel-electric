import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import {
  TextInput,
  TextArea,
  Select,
  RadioInput,
  Fieldset,
  SubmitButton,
} from "../layout/formInputs";

import AddVehicleDataGroup from "./AddVehicleDataGroup";
import styles from "./AddEbikeForm.module.css";

function AddEbikeForm(props) {
  return (
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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
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
                <h2 className="rebel-font">Dodaj zdjęcia:</h2>
                <div>
                  <div>Foto 1</div>
                  <div>Foto 2</div>
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
                poznania Twojej maszyny! Nie rezygnuj z nich lub uzupelnij je w
                późniejszym czasie! Możesz uzupełnić tylko niektóre z nich, a
                pozostałe zostawić puste ...
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
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default AddEbikeForm;
