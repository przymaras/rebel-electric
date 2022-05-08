import { useField, FormikProps } from 'formik';

import { AddEbikeValues } from 'src/modules/hangar/types/hangar';

import styles from './formInputs.module.scss';

interface InputProps {
  id?: string;
  name: string;
  label?: string;
  description?: string;
  rebelHeading?: boolean;
  hidden?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

export const TextInput: React.FC<InputProps> = ({
  label,
  description,
  rebelHeading,
  hidden,
  ...props
}) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className={styles.container}>
      {label &&
        (rebelHeading === true ? (
          <label
            className={`${styles.label} ${hidden ? styles.hidden : ''}`}
            htmlFor={props.id || props.name}
          >
            <h2 className='rebel-font'>{label}</h2>
          </label>
        ) : (
          <label
            className={`${styles.label} ${hidden ? styles.hidden : ''}`}
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
        ))}

      <input
        className={`${styles.textInput} ${hidden ? styles.hidden : ''}`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className={styles.error}>{meta.error}</div> : null}
      {description ? <p className={`${hidden ? styles.hidden : ''}`}>{description}</p> : null}
    </div>
  );
};

export const TextArea: React.FC<InputProps> = ({ label, description, rebelHeading, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className={styles.container}>
      {rebelHeading === true ? (
        <label className={styles.label} htmlFor={props.id || props.name}>
          <h2 className='rebel-font'>{label}</h2>
        </label>
      ) : (
        <label className={styles.label} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <textarea className={styles.textArea} {...field} {...props} />
      {meta.touched && meta.error ? <div className={styles.error}>{meta.error}</div> : null}
      {description ? <p>{description}</p> : null}
    </div>
  );
};

export const Select: React.FC<InputProps> = ({ label, disabled, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <select className={styles.select} {...field} {...props} disabled={disabled} />
      {meta.touched && meta.error ? <div className={styles.error}>{meta.error}</div> : null}
    </div>
  );
};

export const RadioInput: React.FC<InputProps> = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const field = useField({ ...props, type: 'radio' })[0];
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

export const Fieldset: React.FC<InputProps & { legend: string }> = ({ legend, ...props }) => {
  const meta = useField(props.name)[1];
  return (
    <div>
      <fieldset className={styles.fieldset}>
        <legend>{legend}</legend>

        {props.children}
      </fieldset>
      {meta.touched && meta.error ? <div className={styles.error}>{meta.error}</div> : null}
    </div>
  );
};

interface SubmitButtonProps {
  formik: FormikProps<AddEbikeValues>;
  text: string;
  errorMsg: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ formik, text, errorMsg }) => {
  const isDisabled = formik.isSubmitting;
  return (
    <div className={styles.container}>
      <button className={styles.submitBtn} type='submit' disabled={isDisabled}>
        {text}
      </button>
      {!formik.isValid && formik.submitCount > 0 && <p className={styles.error}>{errorMsg}</p>}
      {formik.isSubmitting && <p>Wysyłam!</p>}
    </div>
  );
};
