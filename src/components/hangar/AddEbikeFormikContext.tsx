import { Formik, ErrorMessage } from 'formik';
import { useRef } from 'react';
import * as Yup from 'yup';

import { ItemManufacturerObj } from '../../../src/models/hangar';
import { AddEbikeValues } from '../../models/hangar';
import AddEbikeForm from './AddEbikeForm';

interface AddEbikeFormikContextProps {
  onAddVehicle: (enteredData: AddEbikeValues) => void;
  controllersData: ItemManufacturerObj[];
  motorsData: ItemManufacturerObj[];
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
          projectName: '',
          video: '',
          description: '',
          bikeBase: '',
          wheelSize: '',
          wheelOther: '',
          brakes: '',
          brakesOther: '',
          mass: '',
          massUnit: '',
          vmax: '',
          vmaxUnit: '',
          range: '',
          rangeUnit: '',
          totalCost: '',
          totalCostCurrency: '',
          ctrlManuf: '',
          ctrlManufOther: '',
          ctrlModel: '',
          ctrlModelOther: '',
          ctrlCurrent: '',
          motorManuf: '',
          motorManufOther: '',
          motorModel: '',
          motorModelOther: '',
          batteryCase: '',
          batteryCaseOther: '',
          cellsType: '',
          cellsTypeOther: '',
          batVoltage: '',
          batVoltageOther: '',
          capacity: '',
          capacityUnit: '',
          vehicleImages: [] as string[],
          category: '',
        }}
        validationSchema={Yup.object({
          projectName: Yup.string().max(30, 'Must be max. 30 characters long').required('Required'),
          video: Yup.string().url('Must be valid URL'),
          description: Yup.string().max(1000, 'Must be max. 1000 characters long'),
          bikeBase: Yup.string().max(30, 'Must be max. 30 characters long'),
          wheelOther: Yup.string().when('wheelSize', {
            is: 'other',
            then: Yup.string().max(30, 'Must be max. 30 characters long').required('Required'),
          }),
          brakesOther: Yup.string().when('brakes', {
            is: 'other',
            then: Yup.string().max(30, 'Must be max. 30 characters long').required('Required'),
          }),
          batVoltageOther: Yup.number().when('batVoltage', {
            is: 'other',
            then: Yup.number()
              .typeError('Must be a number')
              .test(
                'maxDigits',
                'number field must have 10 digits or less',
                (number) => String(number).length <= 10
              )
              .required('Required'),
          }),
          mass: Yup.number()
            .typeError('Must be a number')
            .test(
              'maxDigits',
              'number field must have 10 digits or less',
              (number) => String(number).length <= 10
            ),
          vmax: Yup.number()
            .typeError('Must be a number')
            .test(
              'maxDigits',
              'number field must have 10 digits or less',
              (number) => String(number).length <= 10
            ),
          range: Yup.number()
            .typeError('Must be a number')
            .test(
              'maxDigits',
              'number field must have 10 digits or less',
              (number) => String(number).length <= 10
            ),
          totalCost: Yup.number()
            .typeError('Must be a number')
            .test(
              'maxDigits',
              'number field must have 10 digits or less',
              (number) => String(number).length <= 10
            ),
          ctrlCurrent: Yup.number()
            .typeError('Must be a number')
            .test(
              'maxDigits',
              'number field must have 10 digits or less',
              (number) => String(number).length <= 10
            ),
          capacity: Yup.number()
            .typeError('Must be a number')
            .test(
              'maxDigits',
              'number field must have 10 digits or less',
              (number) => String(number).length <= 10
            ),
          ctrlManufOther: Yup.string().when('ctrlManuf', {
            is: 'other',
            then: Yup.string().max(30, 'Must be max. 30 characters long').required('Required'),
          }),
          ctrlModelOther: Yup.string().when('ctrlModel', {
            is: 'other',
            then: Yup.string().max(30, 'Must be max. 30 characters long').required('Required'),
          }),
          motorManufOther: Yup.string().when('motorManuf', {
            is: 'other',
            then: Yup.string().max(30, 'Must be max. 30 characters long').required('Required'),
          }),
          motorModelOther: Yup.string().when('motorModel', {
            is: 'other',
            then: Yup.string().max(30, 'Must be max. 30 characters long').required('Required'),
          }),
          batteryCaseOther: Yup.string().when('batteryCase', {
            is: 'other',
            then: Yup.string().max(30, 'Must be max. 30 characters long').required('Required'),
          }),
          cellsTypeOther: Yup.string().when('cellsType', {
            is: 'other',
            then: Yup.string().max(30, 'Must be max. 30 characters long').required('Required'),
          }),
          massUnit: Yup.string().when('mass', {
            is: (value: string) => value,
            then: Yup.string().required('Unit required'),
          }),
          vmaxUnit: Yup.string().when('vmax', {
            is: (value: string) => value,
            then: Yup.string().required('Unit required'),
          }),
          rangeUnit: Yup.string().when('range', {
            is: (value: string) => value,
            then: Yup.string().required('Unit required'),
          }),
          capacityUnit: Yup.string().when('capacity', {
            is: (value: string) => value,
            then: Yup.string().required('Unit required'),
          }),
          totalCostCurrency: Yup.string().when('totalCost', {
            is: (value: string) => value,
            then: Yup.string().required('Currency required'),
          }),
          vehicleImages: Yup.array().test({
            message: 'Add at least one image',
            test: (arr) => (arr ?? []).length >= 1 && (arr ?? [])[0] !== null,
          }),
          category: Yup.string().required('Select category to the end of category tree'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            props.onAddVehicle(values);
            resetForm();
            setSubmitting(true);
            removeImagesRef.current();
          }, 400);
          removeImagesRef.current(); //FIXME: - when restored and deleted - there is one more xhr request send and red frame left
        }}
      >
        {(formik) => {
          return (
            <>
              <ErrorMessage name='category'>
                {(msg) => <div style={{ color: 'tomato' }}>{msg}</div>}
              </ErrorMessage>
              <AddEbikeForm
                setRemoveImages={setRemoveImages}
                formik={formik}
                controllersData={props.controllersData}
                motorsData={props.motorsData}
              />
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default AddEbikeFormikContext;
