import useTranslation from 'next-translate/useTranslation';

import { HangarIcon, MapLocationIcon } from 'src/assets/icons';
import { UserIcon } from 'src/assets/icons';
import { Other } from 'src/assets/vehicleCategories';
import { DataTablesEbike } from 'src/modules/hangar/components/DataTablesEbike';
import { Description } from 'src/modules/hangar/components/Description';
import { VehicleSwiper } from 'src/modules/hangar/components/VehicleSwiper';
import { VehicleVeiwsCatLikes } from 'src/modules/hangar/components/VehicleVeiwsCatLikes';
import { vehicleCategories } from 'src/modules/hangar/store/vehicleCategories';
import { BtnLink } from 'src/modules/layout/components/BtnLink';
import { TitleBox } from 'src/modules/layout/components/TitleBox';
import { HangarVehiclePageProps } from 'src/pages/hangar/[vehicleId]';
import { getSelectedCategoryTreeInfo } from 'src/utils/common-functions';

import styles from './VehicleDetails.module.scss';

export const VehicleDetails: React.FC<HangarVehiclePageProps> = ({
  controllers,
  motors,
  vehicle,
}) => {
  const { t } = useTranslation();
  const unknownText = t('hangar:unknown');

  const selectedCategoryTreeInfo = getSelectedCategoryTreeInfo(
    vehicleCategories,
    vehicle?.category ?? ''
  );

  const categoryName =
    selectedCategoryTreeInfo?.categoryNames.map((name) => t(`hangar:${name}`)).join(' / ') ??
    'undefined';

  const categoryImage = [...(selectedCategoryTreeInfo?.categoryImages ?? [undefined])].pop();

  const motorType =
    [...(selectedCategoryTreeInfo?.categoryNames ?? ['undefined'])].pop() ?? 'undefined';

  return (
    <>
      <TitleBox>
        <div className={styles.title}>
          <h1 className='rebel-font' style={{ fontSize: '3rem' }}>
            {vehicle?.projectName ?? unknownText}
          </h1>
          <div className={styles.userWrapper}>
            <UserIcon height={20} />
            <p className={styles.user}>{vehicle?.userName ?? unknownText}</p>
            <MapLocationIcon height={20} />
            <p>{vehicle?.city ?? unknownText}</p>
          </div>
        </div>
      </TitleBox>
      <div className={styles.container}>
        <VehicleSwiper
          images={vehicle?.vehicleImages ?? []}
          projectName={vehicle?.projectName ?? unknownText}
        />
        <VehicleVeiwsCatLikes
          views={vehicle?.viewsCount ?? '0'}
          category={categoryName}
          CategoryImg={categoryImage ?? Other}
          likes={vehicle?.likesCount ?? '0'}
        />
        <DataTablesEbike
          vehicle={vehicle}
          motors={motors}
          controllers={controllers}
          motorType={motorType}
        />
        <Description description={vehicle?.description ?? ''} />
        <div data-testid='VehicleButtons' className={styles.buttonsWrapper}>
          <BtnLink
            href='/users/add'
            icon={UserIcon}
            text={t('hangar:seeOwnersProfile')}
            horizontal={true}
          />
          <BtnLink
            href='/users/add'
            icon={HangarIcon}
            text={t('hangar:seeSimilarVehicles')}
            horizontal={true}
          />
        </div>
      </div>
    </>
  );
};
