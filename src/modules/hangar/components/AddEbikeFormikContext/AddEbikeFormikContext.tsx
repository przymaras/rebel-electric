import { Formik, ErrorMessage } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useRef } from 'react';
import * as Yup from 'yup';

import { AddEbikeForm } from 'src/modules/hangar/components/AddEbikeForm';
import { ItemManufacturerObj, AddEbikeValues } from 'src/modules/hangar/types/hangar';

interface AddEbikeFormikContextProps {
  onAddVehicle: (enteredData: AddEbikeValues) => void;
  controllersData: ItemManufacturerObj[];
  motorsData: ItemManufacturerObj[];
}

export const AddEbikeFormikContext: React.FC<AddEbikeFormikContextProps> = (props) => {
  const removeImagesRef = useRef<Function>(() => {});
  const { t } = useTranslation();

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
          projectName: Yup.string()
            .max(30, `${t('hangar:errorLength')} 30`)
            .required(t('hangar:errorRequired')),
          video: Yup.string().url(t('hangar:errorUrl')),
          description: Yup.string().max(1000, `${t('hangar:errorLength')} 1000`),
          bikeBase: Yup.string().max(30, `${t('hangar:errorLength')} 30`),
          wheelOther: Yup.string().when('wheelSize', {
            is: 'other',
            then: Yup.string()
              .max(30, `${t('hangar:errorLength')} 30`)
              .required(t('hangar:errorRequired')),
          }),
          brakesOther: Yup.string().when('brakes', {
            is: 'other',
            then: Yup.string()
              .max(30, `${t('hangar:errorLength')} 30`)
              .required(t('hangar:errorRequired')),
          }),
          batVoltageOther: Yup.number().when('batVoltage', {
            is: 'other',
            then: Yup.number()
              .typeError(t('hangar:errorNumber'))
              .test(
                'maxDigits',
                `${t('hangar:errorLength')} 10`,
                (number) => String(number).length <= 10
              )
              .required(t('hangar:errorRequired')),
          }),
          mass: Yup.number()
            .typeError(t('hangar:errorNumber'))
            .test(
              'maxDigits',
              `${t('hangar:errorLength')} 10`,
              (number) => String(number).length <= 10
            ),
          vmax: Yup.number()
            .typeError(t('hangar:errorNumber'))
            .test(
              'maxDigits',
              `${t('hangar:errorLength')} 10`,
              (number) => String(number).length <= 10
            ),
          range: Yup.number()
            .typeError(t('hangar:errorNumber'))
            .test(
              'maxDigits',
              `${t('hangar:errorLength')} 10`,
              (number) => String(number).length <= 10
            ),
          totalCost: Yup.number()
            .typeError(t('hangar:errorNumber'))
            .test(
              'maxDigits',
              `${t('hangar:errorLength')} 10`,
              (number) => String(number).length <= 10
            ),
          ctrlCurrent: Yup.number()
            .typeError(t('hangar:errorNumber'))
            .test(
              'maxDigits',
              `${t('hangar:errorLength')} 10`,
              (number) => String(number).length <= 10
            ),
          capacity: Yup.number()
            .typeError(t('hangar:errorNumber'))
            .test(
              'maxDigits',
              `${t('hangar:errorLength')} 10`,
              (number) => String(number).length <= 10
            ),
          ctrlManufOther: Yup.string().when('ctrlManuf', {
            is: 'other',
            then: Yup.string()
              .max(30, `${t('hangar:errorLength')} 30`)
              .required(t('hangar:errorRequired')),
          }),
          ctrlModelOther: Yup.string().when('ctrlModel', {
            is: 'other',
            then: Yup.string()
              .max(30, `${t('hangar:errorLength')} 30`)
              .required(t('hangar:errorRequired')),
          }),
          motorManufOther: Yup.string().when('motorManuf', {
            is: 'other',
            then: Yup.string()
              .max(30, `${t('hangar:errorLength')} 30`)
              .required(t('hangar:errorRequired')),
          }),
          motorModelOther: Yup.string().when('motorModel', {
            is: 'other',
            then: Yup.string()
              .max(30, `${t('hangar:errorLength')} 30`)
              .required(t('hangar:errorRequired')),
          }),
          batteryCaseOther: Yup.string().when('batteryCase', {
            is: 'other',
            then: Yup.string()
              .max(30, `${t('hangar:errorLength')} 30`)
              .required(t('hangar:errorRequired')),
          }),
          cellsTypeOther: Yup.string().when('cellsType', {
            is: 'other',
            then: Yup.string()
              .max(30, `${t('hangar:errorLength')} 30`)
              .required(t('hangar:errorRequired')),
          }),
          massUnit: Yup.string().when('mass', {
            is: (value: string) => value,
            then: Yup.string().required(t('hangar:errorUnit')),
          }),
          vmaxUnit: Yup.string().when('vmax', {
            is: (value: string) => value,
            then: Yup.string().required(t('hangar:errorUnit')),
          }),
          rangeUnit: Yup.string().when('range', {
            is: (value: string) => value,
            then: Yup.string().required(t('hangar:errorUnit')),
          }),
          capacityUnit: Yup.string().when('capacity', {
            is: (value: string) => value,
            then: Yup.string().required(t('hangar:errorUnit')),
          }),
          totalCostCurrency: Yup.string().when('totalCost', {
            is: (value: string) => value,
            then: Yup.string().required(t('hangar:errorCurrency')),
          }),
          vehicleImages: Yup.array().test({
            message: t('hangar:errorOneImage'),
            test: (arr) => (arr ?? []).length >= 1 && (arr ?? [])[0] !== null,
          }),
          category: Yup.string().required(t('hangar:errorCategory')),
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
