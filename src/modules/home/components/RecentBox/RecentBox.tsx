import useTranslation from 'next-translate/useTranslation';

import { Vehicle } from 'src/modules/hangar/types/hangar';
import { Recent } from 'src/modules/home/components/Recent';

import styles from './RecentBox.module.scss';

export const RecentBox: React.FC<{ vehicles: Vehicle[] }> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.recentlyAdded}>
      <h2 className={`${styles.recentTitle} rebel-font`}>{t('home:recently-added')}</h2>
      <div className={styles.container}>
        {props.vehicles.map((vehicle) => {
          return <Recent key={vehicle._id} vehicle={vehicle} />;
        })}
      </div>
    </div>
  );
};
