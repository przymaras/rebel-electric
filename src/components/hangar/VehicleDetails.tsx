import useTranslation from 'next-translate/useTranslation';

import { ItemManufacturerObj } from '../../../src/models/hangar';
import { Vehicle } from '../../models/hangar';
import { useStore } from '../../store/useStore';
import { StoreState } from '../../store/useStore';
import { getSelectedCategoryTreeInfo } from '../../utils/common-functions';
import { IconHangar } from '../icons/IconHangar';
import { IconMapLocation } from '../icons/IconMapLocation';
import { IconUser } from '../icons/IconUser';
import BtnLink from '../layout/BtnLink';
import TitleBox from '../layout/TitleBox';
import DataTablesEbike from './DataTablesEbike';
import Description from './Description';
import styles from './VehicleDetails.module.scss';
import VehicleSwiper from './VehicleSwiper';
import VehicleVeiwsCatLikes from './VehicleVeiwsCatLikes';

interface VehicleDetailsProps {
  vehicleData?: Vehicle;
  controllersData?: ItemManufacturerObj[];
  motorsData?: ItemManufacturerObj[];
}

const vehiclesCategoriesSelector = (state: StoreState) => state.vehiclesCategories;

const VehicleDetails: React.FC<VehicleDetailsProps> = (props) => {
  const { t } = useTranslation();
  const unknownText = t('hangar:unknown');

  const vData = props.vehicleData;
  const cData = props.controllersData;
  const mData = props.motorsData;

  const vehiclesCategories = useStore(vehiclesCategoriesSelector);

  const selectedCategoryTreeInfo = getSelectedCategoryTreeInfo(
    vehiclesCategories,
    vData?.category ?? ''
  );

  const categoryName = selectedCategoryTreeInfo?.categoriesNames.join(' / ') ?? 'undefined';

  const categoryImage =
    [...(selectedCategoryTreeInfo?.categoriesImages ?? ['undefined'])].pop() ?? 'undefined';

  const motorType =
    [...(selectedCategoryTreeInfo?.categoriesNames ?? ['undefined'])].pop() ?? 'undefined';

  return (
    <>
      <TitleBox>
        <div className={styles.title}>
          <h1 className='rebel-font' style={{ fontSize: '3rem' }}>
            {vData?.projectName ?? unknownText}
          </h1>
          <div className={styles.userWrapper}>
            <IconUser />
            <p className={styles.user}>{vData?.userName ?? unknownText}</p>
            <IconMapLocation />
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
        <div className={styles.buttonsWrapper}>
          <BtnLink
            href='/users/add'
            icon={<IconUser />}
            text={'Zobacz profil właściciela'}
            horizontal={true}
          />
          <BtnLink
            href='/users/add'
            icon={<IconHangar />}
            text={'Zobacz podobne pojazdy'}
            horizontal={true}
          />
        </div>
      </div>
    </>
  );
};

export default VehicleDetails;
