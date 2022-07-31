import useTranslation from 'next-translate/useTranslation';

import { HangarIcon, MapLocationIcon } from 'src/assets/icons';
import { UserIcon } from 'src/assets/icons';
import { DataTablesEbike } from 'src/modules/hangar/components/DataTablesEbike';
import { Description } from 'src/modules/hangar/components/Description';
import { VehicleSwiper } from 'src/modules/hangar/components/VehicleSwiper';
import { VehicleVeiwsCatLikes } from 'src/modules/hangar/components/VehicleVeiwsCatLikes';
import { vehicleCategories } from 'src/modules/hangar/store/vehicleCategories';
import { IVehicle } from 'src/modules/hangar/types/hangar';
import { ItemManufacturer } from 'src/modules/hangar/types/hangar';
import { BtnLink } from 'src/modules/layout/components/BtnLink';
import { TitleBox } from 'src/modules/layout/components/TitleBox';
import { getSelectedCategoryTreeInfo } from 'src/utils/common-functions';

import styles from './VehicleDetails.module.scss';

interface VehicleDetailsProps {
  vehicleData?: IVehicle;
  controllersData?: ItemManufacturer[];
  motorsData?: ItemManufacturer[];
}

export const VehicleDetails: React.FC<VehicleDetailsProps> = (props) => {
  const { t } = useTranslation();
  const unknownText = t('hangar:unknown');

  const vData = props.vehicleData;
  const cData = props.controllersData;
  const mData = props.motorsData;

  const selectedCategoryTreeInfo = getSelectedCategoryTreeInfo(
    vehicleCategories,
    vData?.category ?? ''
  );

  const categoryName =
    selectedCategoryTreeInfo?.categoryNames.map((name) => t(`hangar:${name}`)).join(' / ') ??
    'undefined';

  const categoryImage =
    [...(selectedCategoryTreeInfo?.categoryImages ?? ['undefined'])].pop() ?? 'undefined';

  const motorType =
    [...(selectedCategoryTreeInfo?.categoryNames ?? ['undefined'])].pop() ?? 'undefined';

  return (
    <>
      <TitleBox>
        <div className={styles.title}>
          <h1 className='rebel-font' style={{ fontSize: '3rem' }}>
            {vData?.projectName ?? unknownText}
          </h1>
          <div className={styles.userWrapper}>
            <UserIcon height={20} />
            <p className={styles.user}>{vData?.userName ?? unknownText}</p>
            <MapLocationIcon height={20} />
            <p>{vData?.city ?? unknownText}</p>
          </div>
        </div>
      </TitleBox>
      <div className={styles.container}>
        <VehicleSwiper
          images={vData?.vehicleImages ?? []}
          projectName={vData?.projectName ?? unknownText}
        />
        <VehicleVeiwsCatLikes
          views={vData?.viewsCount ?? '0'}
          category={categoryName}
          categoryImg={categoryImage}
          likes={vData?.likesCount ?? '0'}
        />
        <DataTablesEbike
          vehicleData={vData}
          motorsData={mData}
          controllersData={cData}
          motorType={motorType}
        />
        <Description description={vData?.description ?? ''} />
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
