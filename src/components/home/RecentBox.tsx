import useTranslation from 'next-translate/useTranslation';

import { Vehicle } from '../../models/hangar';
import Recent from './Recent';
import styles from './RecentBox.module.scss';

const RecentBox: React.FC<{ vehicles: Vehicle[] }> = (props) => {
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

export default RecentBox;
