import useTranslation from 'next-translate/useTranslation';

import { IVehicle } from 'src/modules/hangar/types/hangar';
import { Recent } from 'src/modules/home/components/Recent';

import styles from './RecentBox.module.scss';

export const RecentBox: React.FC<{ vehicles: IVehicle[] }> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.recentlyAdded} data-testid='RecentBox'>
      <h2 className={`${styles.recentTitle} rebel-font`}>{t('home:recently-added')}</h2>
      <div className={styles.container}>
        {props.vehicles.map((vehicle) => {
          return <Recent key={vehicle._id} vehicle={vehicle} />;
        })}
      </div>
    </div>
  );
};
