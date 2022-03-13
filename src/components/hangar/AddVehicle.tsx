import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { ItemManufacturerObj } from '../../../src/models/hangar';

import styles from './AddVehicle.module.scss';

import { AddEbikeValues } from '../../models/hangar';

import { IconHangar } from '../icons/IconHangar';
import TitleBox from '../layout/TitleBox';
import InfoBox from '../layout/InfoBox';
import CategorySelector from './CategorySelector';
import AddEbikeFormikContext from './AddEbikeFormikContext';

import { useStore } from '../../store/useStore';
import { StoreState } from '../../store/useStore';

const newCategoryChosenSelector = (state: StoreState) => state.newCategoryChosen;

const vehiclesCategoriesSelector = (state: StoreState) => state.vehiclesCategories;

const AddVehicle: React.FC<{
  controllersData: ItemManufacturerObj[];
  motorsData: ItemManufacturerObj[];
}> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<number[]>([-1]);
  const newCategoryChosen = useStore(newCategoryChosenSelector);
  const vehiclesCategories = useStore(vehiclesCategoriesSelector);

  const VEHICLE_TYPE = 0;
  const NOT_SELECTED = -1;
  const EBIKE_TYPE = vehiclesCategories.categories
    .map((category) => category.name)
    .indexOf('eBike');

  const MONSTEREBIKE_TYPE = vehiclesCategories.categories
    .map((category) => category.name)
    .indexOf('MONSTER eBIKE');

  useEffect(() => {
    if (newCategoryChosen) {
      setSelectedCategory(useStore.getState().addVehicleCategory);

      useStore.getState().setNewCategoryChosen(false);
    }
  }, [newCategoryChosen]);

  function onAddVehicle(enteredData: AddEbikeValues) {
    //POST request with body equal on data in JSON format
    // console.log(enteredData);
    fetch('/api/vehicles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enteredData),
    })
      .then((response) => response.ok)
      //Then with the data from the response in JSON...
      .then((data) => {
        console.log('Success:', data);
        router.replace('/hangar');
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <TitleBox>
        <div className={styles.title}>
          <IconHangar />
          <h1 className='rebel-font' style={{ fontSize: '5rem' }}>
            {' '}
            {t('hangar:header')}{' '}
          </h1>
        </div>
        <p>{t('hangar:header-add-info')}</p>
      </TitleBox>
      <div className={styles.sectionWrapper}>
        <h2 className={`rebel-font ${styles.selectCategoryTitle}`}>
          {t('hangar:select-category')}
        </h2>

        <InfoBox>
          <p>{t('hangar:select-category-info-1')}</p>
        </InfoBox>
      </div>

      <CategorySelector addVehicle={true} />
      {selectedCategory[VEHICLE_TYPE] === EBIKE_TYPE ||
      selectedCategory[VEHICLE_TYPE] === MONSTEREBIKE_TYPE ? (
        <AddEbikeFormikContext
          onAddVehicle={onAddVehicle}
          controllersData={props.controllersData}
          motorsData={props.motorsData}
        />
      ) : selectedCategory[VEHICLE_TYPE] === NOT_SELECTED ? (
        <p className={styles.formInfo}>
          Wybierz kategorię pojazdu, aby wyświetić odpowiedni formularz dodawania.
        </p>
      ) : (
        <p className={styles.formInfo}>
          Formularz dodawania pojazdu dla tej kategorii jest jeszcze w trakcie przygotowania. W tej
          chwili nie jest możliwe dodanie pojazdu do tej kategorii. Przepraszamy za utrudnienia i
          zapraszamy ponownie w przyszłośći. Załoga Rebelelectric.com
        </p>
      )}
    </>
  );
};

export default AddVehicle;
