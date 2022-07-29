import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HangarIcon } from 'src/assets/icons';
import { AddEbikeFormikContext } from 'src/modules/hangar/components/AddEbikeFormikContext';
import { CategorySelector } from 'src/modules/hangar/components/CategorySelector';
import { ItemManufacturer, IAddEbikeValues } from 'src/modules/hangar/types/hangar';
import { InfoBox } from 'src/modules/layout/components/InfoBox';
import { TitleBox } from 'src/modules/layout/components/TitleBox';
import { useStore, StoreState } from 'src/store/useStore';

import styles from './AddVehicle.module.scss';

const newCategoryChosenSelector = (state: StoreState) => state.newCategoryChosen;

const vehiclesCategoriesSelector = (state: StoreState) => state.vehicleCategories;

export const AddVehicle: React.FC<{
  controllersData: ItemManufacturer[];
  motorsData: ItemManufacturer[];
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
    .indexOf('catEbike');

  const MONSTEREBIKE_TYPE = vehiclesCategories.categories
    .map((category) => category.name)
    .indexOf('catMonster');

  useEffect(() => {
    if (newCategoryChosen) {
      setSelectedCategory(useStore.getState().addVehicleCategory);

      useStore.getState().setNewCategoryChosen(false);
    }
  }, [newCategoryChosen]);

  function onAddVehicle(enteredData: IAddEbikeValues) {
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
        void router.replace('/hangar');
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
          <HangarIcon height={40} />
          <h1 className='rebel-font' style={{ fontSize: '5rem' }}>
            {' '}
            {t('hangar:header')}{' '}
          </h1>
        </div>
        <p>{t('hangar:header-add-info')}</p>
      </TitleBox>
      <div data-testid='CategorySelectorIntro' className={styles.sectionWrapper}>
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
        <p data-testid='ChooseCategoryToGetForm' className={styles.formInfo}>
          {t('hangar:chooseCategoryToGetForm')}
        </p>
      ) : (
        <p data-testid='FormNotPrepared' className={styles.formInfo}>
          {t('hangar:formNotPrepared')}
        </p>
      )}
    </>
  );
};
