import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

import AddEbikeDataGroup from "./AddEbikeDataGroup";
import styles from "./AddEbikeForm.module.css";

function HeadingTextInput({ label, description, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>
        <h2 className="rebel-font">{label}</h2>
      </label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function TextInput({ label, description, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function HeadingTextArea({ label, description, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>
        <h2 className="rebel-font">{label}</h2>
      </label>
      <textarea className="text-area" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
      {description ? <p>{description}</p> : null}
    </div>
  );
}

const Select = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

function RadioInput({ label, ...props }) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <input className="radio-input" {...field} {...props} />
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

function AddEbikeForm(props) {
  return (
    <Formik
      initialValues={{
        projectName: "",
        video: "",
        description: "",
        year: "",
      }}
      validationSchema={Yup.object({
        projectName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        video: Yup.string().url("Must be valid URL").required("Required"),
        description: Yup.string().required("Required"),
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
      <div className={styles.container}>
        <Form>
          <HeadingTextInput
            label="Nazwa Projektu:"
            name="projectName"
            type="text"
            placeholder=""
            description="(będzie wyświetlana nad galerią)"
          />
          <div>
            <h2 className="rebel-font">Dodaj zdjęcia:</h2>
            <div>
              <div>Foto 1</div>
              <div>Foto 2</div>
            </div>
          </div>
          <HeadingTextInput
            label="Dodaj prezentację video!"
            name="video"
            type="text"
            placeholder=""
            description=""
          />

          <HeadingTextArea
            label="Dodaj opis:"
            name="description"
            type="text-area"
            placeholder=""
            description="Dodaj opis: Napisz kilka słów o swoim pojeździe - pochwal się jego
            historią, osiągami i ile lat go użytkujesz. Jak zaczęła się Twoja
            historia z elektrykami? Użytkownicy Rebel-electric chętnie
            dowiedzą się więcej informacji o Tobie i Twoim e-bike'u!"
          />

          <div>
            <AddEbikeDataGroup type="baza">
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

              <div>
                <fieldset>
                  <legend>Rozmiar kół</legend>

                  <RadioInput
                    label="20 cali"
                    type="radio"
                    name="wheelSize"
                    value="20"
                  />
                  <RadioInput
                    label="24 cali"
                    type="radio"
                    name="wheelSize"
                    value="24"
                  />
                </fieldset>
              </div>

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
            </AddEbikeDataGroup>
          </div>
          <button type="submit">Dodaj</button>
        </Form>
      </div>
    </Formik>
  );
}

export default AddEbikeForm;
