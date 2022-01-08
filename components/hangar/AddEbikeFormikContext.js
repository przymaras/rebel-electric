import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { useRef } from "react";
import * as Yup from "yup";

import CategorySelector from "./CategorySelector";
import AddEbikeForm from "./AddEbikeForm";

function AddEbikeFormikContext(props) {
  const removeImagesRef = useRef();

  function setRemoveImages(fn) {
    removeImagesRef.current = fn;
  }

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
          vehicleImages: [""],
          category: [-1],
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
            props.onAddVehicle(values);
            setSubmitting(false);
            resetForm();
            removeImagesRef.current();
          }, 400);
          removeImagesRef.current(); //fix me - when restored and deleted - there is one more xhr request send and red frame left
        }}
      >
        {(formik) => {
          return (
            <>
              <CategorySelector
                formikCategoryValue={formik.values.category}
                formikSetFieldValue={formik.setFieldValue}
              />
              <AddEbikeForm setRemoveImages={setRemoveImages} formik={formik} />
            </>
          );
        }}
      </Formik>
    </>
  );
}

export default AddEbikeFormikContext;
