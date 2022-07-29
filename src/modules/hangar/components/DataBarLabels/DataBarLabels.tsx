import useTranslation from 'next-translate/useTranslation';

import { BatteryIcon, LightningIcon, StarIcon } from 'src/assets/icons';

import styles from './DataBarLabels.module.scss';

export const DataBarLabels: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div data-testid='DataBarLabels' className={styles.container}>
      <div className={styles.label}>
        <StarIcon height={15} />
        <p>{t('hangar:label-base')}</p>
      </div>
      <div className={styles.label}>
        <LightningIcon height={15} />
        <p>{t('hangar:label-drive')}</p>
      </div>
      <div className={styles.label}>
        <BatteryIcon height={15} />
        <p>{t('hangar:label-battery')}</p>
      </div>
    </div>
  );
};
