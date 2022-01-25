import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { useRef } from "react";
import * as Yup from "yup";

import { AddEbikeValues } from "../../models/hangar";

import CategorySelector from "./CategorySelector";
import AddEbikeForm from "./AddEbikeForm";

interface AddEbikeFormikContextProps {
  onAddVehicle: (enteredData: AddEbikeValues) => void;
}

const AddEbikeFormikContext: React.FC<AddEbikeFormikContextProps> = (props) => {
  const removeImagesRef = useRef<Function>(() => {});

  function setRemoveImages(fn: Function) {
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
          vehicleImages: [],
          category: [-1],
        }}
        validationSchema={Yup.object({
          projectName: Yup.string()
            .max(30, "Must be max. 30 characters long")
            .required("Required"),
          video: Yup.string().url("Must be valid URL"),
          description: Yup.string(),
          year: Yup.number()
            .typeError("Must be a year")
            .min(1900, "Must be a year")
            .max(2100, "Must be a year"),
          vehicleImages: Yup.array().test({
            message: "Add at least one image",
            test: (arr) => arr!.length >= 1 && arr![0] !== null,
          }),
          category: Yup.array().test({
            message: "Select category",
            test: (arr) => arr![0] !== -1,
          }),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            props.onAddVehicle(values);
            resetForm();
            setSubmitting(true);
            removeImagesRef.current();
          }, 400);
          removeImagesRef.current(); //fix me - when restored and deleted - there is one more xhr request send and red frame left
        }}
      >
        {(formik) => {
          return (
            <>
              <CategorySelector
                formik={formik}
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
};

export default AddEbikeFormikContext;
