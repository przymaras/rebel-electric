import type { FilePondFile, FilePondInitialFile } from 'filepond';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import { ErrorMessage, Form, FormikProps } from 'formik';
import type { ListFileResponse } from 'imagekit/dist/libs/interfaces';
import { nanoid } from 'nanoid';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useRef, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

import { useDataFetcher } from 'src/hooks/useDataFetcher/useDataFetcher';
import { AddVehicleDataGroup } from 'src/modules/hangar/components/AddVehicleDataGroup';
import { AddEbikeValues, ItemManufacturerObj } from 'src/modules/hangar/types/hangar';
import { FilePondStyles } from 'src/modules/layout/components/FilePondStyles';
import {
  TextInput,
  TextArea,
  Select,
  RadioInput,
  Fieldset,
  SubmitButton,
} from 'src/modules/layout/components/formInputs';
import { useStore } from 'src/store/useStore';
import { StoreState } from 'src/store/useStore';
import { getSelectedCategoryId } from 'src/utils/common-functions';
import { getServerSettings } from 'src/utils/filepond-functions';
import { Persist } from 'src/utils/formik-persist';

import styles from './AddEbikeForm.module.scss';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileRename,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType
);

let isRefreshRender = false;

interface AddEbikeFormProps {
  formik: FormikProps<AddEbikeValues>;
  setRemoveImages: (f: Function) => void;
  controllersData: ItemManufacturerObj[];
  motorsData: ItemManufacturerObj[];
}

const newCategoryChosenSelector = (state: StoreState) => state.newCategoryChosen;

export const AddEbikeForm: React.FC<AddEbikeFormProps> = (props) => {
  const newCategoryChosen = useStore(newCategoryChosenSelector);
  const filePondRef = useRef<FilePond>(null);
  const { t } = useTranslation();

  const [imageFiles, setImageFiles] = useState<
    (string | FilePondInitialFile | Blob | File | FilePondFile)[] | undefined
  >([]);
  const [imagesToRestoreIDs, setImagesToRestoreIDs] = useState('');

  useEffect(() => {
    if (!isRefreshRender && props.formik.values?.vehicleImages?.length > 0) {
      setImagesToRestoreIDs(props.formik.values.vehicleImages.join('/'));
      console.log(props.formik.values.vehicleImages.join('/'), 'ue-1');
    }
  }, [props.formik.values.vehicleImages]);

  const apiUrl = imagesToRestoreIDs ? `/api/img/${imagesToRestoreIDs}` : '';
  const [imgsToRestoreDetails, isImgDetailsAvailable] = useDataFetcher<ListFileResponse>(apiUrl);

  useEffect(() => {
    if (isImgDetailsAvailable) {
      setImageFiles(
        imgsToRestoreDetails.map((img) => {
          return {
            source: img.name,
            options: {
              type: 'limbo', //limbo calls restore method in server settings
            },
          };
        })
      );
      console.log(imgsToRestoreDetails, 'ue-2');
    }
  }, [isImgDetailsAvailable, imgsToRestoreDetails]);

  useEffect(() => {
    if (newCategoryChosen) {
      props.formik.setFieldValue(
        'category',
        getSelectedCategoryId(
          useStore.getState().vehiclesCategories,
          useStore.getState().addVehicleCategory
        )
      );
      useStore.getState().setNewCategoryChosen(false);
    }
  }, [props.formik, newCategoryChosen]);

  function updateFormikImagesFieldValue() {
    isRefreshRender = true;
    if (!props.formik.isSubmitting) {
      if (filePondRef.current) {
        const filesIds = filePondRef.current.getFiles().map((file) => file.serverId);
        props.formik.setFieldValue('vehicleImages', filesIds);
      }
    }
  }

  function removeFileHandler() {
    isRefreshRender = true;
    if (!props.formik.isSubmitting) {
      if (filePondRef.current) {
        const filesIds = filePondRef.current.getFiles().map((file) => file.serverId);
        // props.formik.setFieldValue("vehicleImages", filesIds);
        props.formik.values.vehicleImages = filesIds; // FIXME: I'm mutating state directly because filepond goes mad when removing file and updating state of formik - I don't know why.. Maybe because of rerender forced by formik, while filepond's remove proomise isn't resolved?
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Form>
          <TextInput
            label={`${t('hangar:addProjectName')}: (${
              props.formik.values.projectName.length
            } / max. 30 ${t('hangar:addCharacters')})`}
            name='projectName'
            type='text'
            placeholder=''
            description={`(${t('hangar:addDisplayedAboveGallery')})`}
            rebelHeading={true}
          />
          <div>
            <h2 className={`${styles.addPhotosTitle} rebel-font`}>{t('hangar:addPhotos')}:</h2>
            <p>{t('hangar:addLeastOnePhoto')}</p>
            <div className={styles.file}>
              <FilePondStyles />
              <FilePond
                ref={filePondRef}
                name='vehicleImages'
                files={imageFiles as (string | FilePondInitialFile | Blob | File)[] | undefined} //FIXME: "as ... " shouldn't be hre, but there is lack of FilePondFile[] type here
                allowReorder={true}
                allowMultiple={true}
                maxFiles={10}
                imagePreviewMaxFileSize='10MB'
                acceptedFileTypes={['image/png', 'image/jpeg']}
                imageResizeTargetWidth={2000}
                imageResizeTargetHeight={2000}
                imageResizeMode='contain'
                fileRenameFunction={(file) => {
                  return `hangar_${nanoid(5)}${file.extension}`;
                }}
                onupdatefiles={(files) => {
                  setImageFiles(files);
                  if (filePondRef.current) {
                    props.setRemoveImages(filePondRef.current.removeFiles);
                  }
                }}
                labelIdle={t('hangar:addDragPhotoHere')}
                onreorderfiles={updateFormikImagesFieldValue}
                onprocessfiles={updateFormikImagesFieldValue}
                onremovefile={removeFileHandler}
                server={getServerSettings(imgsToRestoreDetails)}
              />
            </div>
            <ErrorMessage name='vehicleImages'>
              {(msg) => <div className={styles.error}>{msg}</div>}
            </ErrorMessage>
          </div>
          <TextInput
            label={t('hangar:addVideo')}
            name='video'
            type='text'
            placeholder=''
            description=''
            rebelHeading={true}
          />
          <TextArea
            label={`${t('hangar:addDescription')}: (${
              props.formik.values.description.length
            } / max. 1000 ${t('hangar:addCharacters')})`}
            name='description'
            type='text-area'
            placeholder=''
            rebelHeading={true}
            description={t('hangar:addDescriptionEncouragement')}
          />

          <p className={styles.info}>{t('hangar:addBelowOptional')}</p>
          <div className={styles.data}>
            <AddVehicleDataGroup groupStyle='base' name={t('hangar:label-base')}>
              <TextInput
                label={t('hangar:addBaseLabel')}
                name='bikeBase'
                type='text'
                placeholder=''
                description={t('hangar:addBaseDesc')}
              />

              <Select label={t('hangar:wheelSize')} name='wheelSize'>
                <option value=''>{t('hangar:wheelSize')}</option>
                <option value='20'>{t('hangar:20')}</option>
                <option value='24'>{t('hangar:24')}</option>
                <option value='26'>{t('hangar:26')}</option>
                <option value='27.5'>{t('hangar:27_5')}</option>
                <option value='28/29'>{t('hangar:28/29')}</option>
                <option value='18moto'>{t('hangar:18moto')}</option>
                <option value='19moto'>{t('hangar:19moto')}</option>
                <option value='other'>{t('hangar:other')}</option>
              </Select>

              <TextInput
                label={t('hangar:addEnterWheelSize')}
                name='wheelOther'
                type='text'
                placeholder=''
                description={t('hangar:addWhyVisible')}
                hidden={props.formik.values.wheelSize !== 'other'}
              />

              <Select label={t('hangar:addBrakesType')} name='brakes'>
                <option value=''>{t('hangar:addBrakesType')}</option>
                <option value='discHydraulic'>{t('hangar:discHydraulic')}</option>
                <option value='discMechanic'>{t('hangar:discMechanic')}</option>
                <option value='vBrake'>{t('hangar:vBrake')}</option>
                <option value='uBrake'>{t('hangar:uBrake')}</option>
                <option value='other'>{t('hangar:other')}</option>
              </Select>

              <TextInput
                label={t('hangar:addEnterBrakesType')}
                name='brakesOther'
                type='text'
                placeholder=''
                description={t('hangar:addWhyVisible')}
                hidden={props.formik.values.brakes !== 'other'}
              />

              <Fieldset name='massUnit' legend={t('hangar:addWeightLegend')}>
                <TextInput
                  label={t('hangar:addEnterWeight')}
                  name='mass'
                  type='text'
                  placeholder=''
                  description=''
                />

                <RadioInput
                  label={t('hangar:addWeightUnitKg')}
                  type='radio'
                  name='massUnit'
                  value='kg'
                />
                <RadioInput
                  label={t('hangar:addWeightUnitLbs')}
                  type='radio'
                  name='massUnit'
                  value='lbs'
                />
              </Fieldset>

              <Fieldset name='vmaxUnit' legend={t('hangar:addVmaxLegend')}>
                <TextInput
                  label={t('hangar:addEnterVmax')}
                  name='vmax'
                  type='text'
                  placeholder=''
                  description=''
                />

                <RadioInput
                  label={t('hangar:addVmaxUnitKph')}
                  type='radio'
                  name='vmaxUnit'
                  value='kph'
                />
                <RadioInput
                  label={t('hangar:addVmaxUnitMph')}
                  type='radio'
                  name='vmaxUnit'
                  value='mph'
                />
              </Fieldset>

              <Fieldset name='rangeUnit' legend={t('hangar:addAvgRangeLegend')}>
                <TextInput
                  label={t('hangar:addEnterAvgRange')}
                  name='range'
                  type='text'
                  placeholder=''
                  description=''
                />

                <RadioInput
                  label={t('hangar:addAvgRangeUnitKm')}
                  type='radio'
                  name='rangeUnit'
                  value='km'
                />
                <RadioInput
                  label={t('hangar:addAvgRangeUnitMi')}
                  type='radio'
                  name='rangeUnit'
                  value='mi'
                />
              </Fieldset>

              <Fieldset name='totalCostCurrency' legend={t('hangar:addAvgCostLegend')}>
                <TextInput
                  label={t('hangar:addEnterAvgCost')}
                  name='totalCost'
                  type='text'
                  placeholder=''
                  description=''
                />

                <RadioInput label='PLN' type='radio' name='totalCostCurrency' value='PLN' />
                <RadioInput label='USD' type='radio' name='totalCostCurrency' value='USD' />
                <RadioInput label='EUR' type='radio' name='totalCostCurrency' value='EUR' />
                <RadioInput label='GBP' type='radio' name='totalCostCurrency' value='GBP' />
              </Fieldset>
            </AddVehicleDataGroup>
            <AddVehicleDataGroup groupStyle='electrical' name={t('hangar:electrical')}>
              <Select label={t('hangar:ctrlManufacturer')} name='ctrlManuf'>
                <option value=''>{t('hangar:addSelect')}</option>
                {props.controllersData &&
                  props.controllersData.map((controller: ItemManufacturerObj) => {
                    const option = (
                      <option key={controller._id} value={controller._id}>
                        {controller.manufacturer}
                      </option>
                    );
                    return controller.validated ? option : null;
                  })}
                {/* <option value="ctrlManuf1">Producent1</option>
                <option value="ctrlManuf2">Producent2</option> */}
                <option value='other'>{t('hangar:other')}</option>
              </Select>

              <TextInput
                label={t('hangar:addEnterManufacturer')}
                name='ctrlManufOther'
                type='text'
                placeholder=''
                description={t('hangar:addWhyVisible')}
                hidden={props.formik.values.ctrlManuf !== 'other'}
              />

              <Select
                label={t('hangar:ctrlModel')}
                name='ctrlModel'
                disabled={!props.formik.values.ctrlManuf}
              >
                <option value=''>{t('hangar:addSelect')}</option>
                {props.controllersData &&
                  props.controllersData
                    .find((controller) => controller._id === props.formik.values.ctrlManuf)
                    ?.models.map((ctrlModel) => {
                      const option = (
                        <option key={ctrlModel._id} value={ctrlModel._id}>
                          {ctrlModel.model}
                        </option>
                      );
                      return ctrlModel.validated ? option : null;
                    })}
                {/* <option value="controller1">Sterownik1</option>
                <option value="controller2">Sterownik2</option> */}
                <option value='other'>{t('hangar:other')}</option>
              </Select>

              <TextInput
                label={t('hangar:addEnterModel')}
                name='ctrlModelOther'
                type='text'
                placeholder=''
                description={t('hangar:addWhyVisible')}
                hidden={props.formik.values.ctrlModel !== 'other'}
              />

              <TextInput
                label={t('hangar:addMaxCurrent')}
                name='ctrlCurrent'
                type='text'
                placeholder=''
                description=''
              />

              <Select label={t('hangar:addMotorManufacturer')} name='motorManuf'>
                <option value=''>{t('hangar:addSelect')}</option>
                {props.motorsData &&
                  props.motorsData.map((motor: ItemManufacturerObj) => {
                    return (
                      <option key={motor._id} value={motor._id}>
                        {motor.manufacturer}
                      </option>
                    );
                  })}
                {/* <option value="motor1">Silnik1</option>
                <option value="motor2">Silnik2</option> */}
                <option value='other'>{t('hangar:other')}</option>
              </Select>

              <TextInput
                label={t('hangar:addEnterManufacturer')}
                name='motorManufOther'
                type='text'
                placeholder=''
                description={t('hangar:addWhyVisible')}
                hidden={props.formik.values.motorManuf !== 'other'}
              />

              <Select
                label={t('hangar:addMotorModel')}
                name='motorModel'
                disabled={!props.formik.values.motorManuf}
              >
                <option value=''>{t('hangar:addSelect')}</option>
                {props.motorsData &&
                  props.motorsData
                    .find((motor) => motor._id === props.formik.values.motorManuf)
                    ?.models.map((motorModel) => {
                      return (
                        <option key={motorModel._id} value={motorModel._id}>
                          {motorModel.model}
                        </option>
                      );
                    })}
                {/* <option value="motorModel1">Model1</option>
                <option value="motorModel2">Model2</option> */}
                <option value='other'>{t('hangar:other')}</option>
              </Select>

              <TextInput
                label={t('hangar:addEnterModel')}
                name='motorModelOther'
                type='text'
                placeholder=''
                description={t('hangar:addWhyVisible')}
                hidden={props.formik.values.motorModel !== 'other'}
              />
            </AddVehicleDataGroup>

            <AddVehicleDataGroup groupStyle='battery' name={t('hangar:battery')}>
              <Select label={t('hangar:batteryCaseType')} name='batteryCase'>
                <option value=''>{t('hangar:addSelect')}</option>
                <option value='textileBag'>{t('hangar:textileBag')}</option>
                <option value='resinCase'>{t('hangar:resinCase')}</option>
                <option value='woddenCase'>{t('hangar:woddenCase')}</option>
                <option value='aluCase'>{t('hangar:aluCase')}</option>
                <option value='3dPrintCase'>{t('hangar:3dPrintCase')}</option>
                <option value='waterBottleCase'>{t('hangar:waterBottleCase')}</option>
                <option value='backpack'>{t('hangar:backpack')}</option>
                <option value='other'>{t('hangar:other')}</option>
              </Select>

              <TextInput
                label={t('hangar:addEnterType')}
                name='batteryCaseOther'
                type='text'
                placeholder=''
                description={t('hangar:addWhyVisible')}
                hidden={props.formik.values.batteryCase !== 'other'}
              />

              <Select label={t('hangar:cellsType')} name='cellsType'>
                <option value=''>{t('hangar:addSelect')}</option>
                <option value='liIon'>{t('hangar:liIon')}</option>
                <option value='liPo'>{t('hangar:liPo')}</option>
                <option value='liFePo4'>{t('hangar:liFePo4')}</option>
                <option value='leadAcid'>{t('hangar:leadAcid')}</option>
                <option value='leadGel'>{t('hangar:leadGel')}</option>
                <option value='leadAgm'>{t('hangar:leadAgm')}</option>
                <option value='other'>{t('hangar:other')}</option>
              </Select>

              <TextInput
                label={t('hangar:addEnterType')}
                name='cellsTypeOther'
                type='text'
                placeholder=''
                description={t('hangar:addWhyVisible')}
                hidden={props.formik.values.cellsType !== 'other'}
              />

              <Select label={t('hangar:label-voltage')} name='batVoltage'>
                <option value=''>{t('hangar:addSelect')}</option>
                <option value='24'>24 V</option>
                <option value='36'>36 V</option>
                <option value='48'>48 V</option>
                <option value='52'>52 V</option>
                <option value='60'>60 V</option>
                <option value='72'>72 V</option>
                <option value='other'>{t('hangar:other')}</option>
              </Select>

              <TextInput
                label={t('hangar:addEnterVoltage')}
                name='batVoltageOther'
                type='text'
                placeholder=''
                description={t('hangar:addWhyVisible')}
                hidden={props.formik.values.batVoltage !== 'other'}
              />

              <Fieldset name='capacityUnit' legend={t('hangar:addBatCapacityLegend')}>
                <TextInput
                  label={t('hangar:addEnterBatCapacity1')}
                  name='capacity'
                  type='text'
                  placeholder=''
                  description={t('hangar:addEnterBatCapacity2')}
                />

                <RadioInput label='Ah' type='radio' name='capacityUnit' value='Ah' />
                <RadioInput label='Wh' type='radio' name='capacityUnit' value='Wh' />
              </Fieldset>
            </AddVehicleDataGroup>
          </div>

          <SubmitButton
            formik={props.formik}
            text={t('hangar:addButtonText')}
            errorMsg={t('hangar:addFillAll')}
          />
          <Persist name='addEbikeForm' />
        </Form>
      </div>
    </>
  );
};
