import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

import AddEbikeForm from "./AddEbikeForm";

function AddEbikeFormikContext(props) {
  return (
    <>
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
          filePond: [""],
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
          //   console.log(formik.status);
          return <AddEbikeForm formik={formik} />;
        }}
      </Formik>
    </>
  );
}

export default AddEbikeFormikContext;
