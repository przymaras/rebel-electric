import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { IconHangar } from 'src/assets/icons/IconHangar';
import { CategorySelector } from 'src/modules/hangar/components/CategorySelector';
import { DataBar } from 'src/modules/hangar/components/DataBar';
import { DataBarLabels } from 'src/modules/hangar/components/DataBarLabels';
import { DataBarsHeadingContainer } from 'src/modules/hangar/components/DataBarsHeadingContainer';
import { SearchBar } from 'src/modules/hangar/components/SearchBar';
import { SearchResultSortBar } from 'src/modules/hangar/components/SearchResultSortBar';
import { VehicleBox } from 'src/modules/hangar/components/VehicleBox';
import { IVehicle } from 'src/modules/hangar/types/hangar';
import { InfoBox } from 'src/modules/layout/components/InfoBox';
import { TitleBox } from 'src/modules/layout/components/TitleBox';
import { useStore } from 'src/store/useStore';
import { getSelectedCategoryId, getSelectedCategoryTreeInfo } from 'src/utils/common-functions';

import styles from './Hangar.module.scss';

interface HangarProps {
  vehicles: IVehicle[];
}

export const Hangar: React.FC<HangarProps> = (props) => {
  const { t } = useTranslation();
  const vehicles = props.vehicles;
  const newHangarCategoryChosen = useStore((state) => state.newHangarCategoryChosen);
  const [selectedCategoryInfo, setSelectedCategoryInfo] =
    useState<ReturnType<typeof getSelectedCategoryTreeInfo>>(undefined);

  const sortBy = useStore((state) => state.sortBy);

  const searchValue = useStore((state) => state.searchValue);

  useEffect(() => {
    if (newHangarCategoryChosen) {
      const selectedCategoryId = getSelectedCategoryId(
        useStore.getState().vehicleCategories,
        useStore.getState().hangarCategory,
        true
      );

      setSelectedCategoryInfo(
        getSelectedCategoryTreeInfo(useStore.getState().vehicleCategories, selectedCategoryId ?? '')
      );

      useStore.getState().setNewHangarCategoryChosen(false);
    }
  }, [newHangarCategoryChosen]);

  const vehiclesToDisplay = () => {
    let vehiclesToDisplay2: IVehicle[] = [...vehicles];

    if (selectedCategoryInfo) {
      vehiclesToDisplay2 = vehiclesToDisplay2.filter((vehicle) =>
        selectedCategoryInfo.restIDs.includes(vehicle.category)
      );
    }

    if (searchValue) {
      vehiclesToDisplay2 = vehiclesToDisplay2.filter((vehicle) =>
        vehicle.projectName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (sortBy === 'createdAt') {
      return vehiclesToDisplay2.sort(
        (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      );
    }
    if (sortBy === 'viewsCount') {
      return vehiclesToDisplay2.sort(
        (a, b) => Number(b.viewsCount ?? 0) - Number(a.viewsCount ?? 0)
      );
    }
    if (sortBy === 'likesCount') {
      return vehiclesToDisplay2.sort(
        (a, b) => Number(b.likesCount ?? 0) - Number(a.likesCount ?? 0)
      );
    }

    return vehiclesToDisplay2;
  };

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
        <p>{t('hangar:header-info')}</p>
      </TitleBox>
      <div data-testid='CategorySelectorIntro' className={styles.sectionWrapper}>
        <h2 className={`rebel-font ${styles.selectCategoryTitle}`}>
          {t('hangar:select-category')}
        </h2>

        <InfoBox>
          <p>{t('hangar:select-category-info-1')}</p>
        </InfoBox>
      </div>

      <CategorySelector />

      <SearchBar />

      <SearchResultSortBar found={vehiclesToDisplay().length} />

      <DataBarLabels />

      <DataBarsHeadingContainer>
        <DataBar
          barStyle='base'
          col1={t('hangar:label-vmax')}
          col2={t('hangar:label-mass')}
          col3={t('hangar:label-range')}
        />

        <DataBar
          barStyle='electrical'
          col1={t('hangar:label-pmax')}
          col2={t('hangar:label-imax')}
          col3={t('hangar:label-enCons')}
        />

        <DataBar
          barStyle='battery'
          col1={t('hangar:label-capwh')}
          col2={t('hangar:label-capah')}
          col3={t('hangar:label-voltage')}
        />
      </DataBarsHeadingContainer>
      <div data-testid='vehiclesWrapper' className={styles.vehiclesWrapper}>
        {vehiclesToDisplay().map((vehicle) => (
          <VehicleBox key={vehicle._id} vehicleData={vehicle} />
        ))}
      </div>
    </>
  );
};
