import { useField } from "formik";

import styles from "./formInputs.module.css";

export const TextInput = ({ label, description, rebelHeading, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className={styles.container}>
      {rebelHeading === true ? (
        <label className={styles.label} htmlFor={props.id || props.name}>
          <h2 className="rebel-font">{label}</h2>
        </label>
      ) : (
        <label className={styles.label} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}

      <input className={styles.textInput} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
      {description ? <p>{description}</p> : null}
    </div>
  );
};

export const TextArea = ({ label, description, rebelHeading, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className={styles.container}>
      {rebelHeading === true ? (
        <label className={styles.label} htmlFor={props.id || props.name}>
          <h2 className="rebel-font">{label}</h2>
        </label>
      ) : (
        <label className={styles.label} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <textarea className={styles.textArea} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
      {description ? <p>{description}</p> : null}
    </div>
  );
};

export const Select = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <select className={styles.select} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const RadioInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField({ ...props, type: "radio" });
  return (
    <>
      <label className={styles.radioLabel}>
        <input className={styles.radio} {...field} {...props} />
        {label}
      </label>
      {/* {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null} */}
    </>
  );
};

export const Fieldset = ({ legend, ...props }) => {
  return (
    <div>
      <fieldset className={styles.fieldset}>
        <legend>{legend}</legend>

        {props.children}
      </fieldset>
    </div>
  );
};

export const SubmitButton = ({ formik, text, errorMsg, ...props }) => {
  const isDisabled = formik.isSubmitting;
  return (
    <div className={styles.container}>
      <button className={styles.submitBtn} type="submit" disabled={isDisabled}>
        {text}
      </button>
      {!formik.isValid && formik.submitCount > 0 && (
        <p className={styles.error}>{errorMsg}</p>
      )}
      {formik.isSubmitting && <p>Wysyłam!</p>}
    </div>
  );
};
