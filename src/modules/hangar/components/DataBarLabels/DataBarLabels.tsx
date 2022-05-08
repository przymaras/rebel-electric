import useTranslation from 'next-translate/useTranslation';

import { IconBattery } from 'src/assets/icons/IconBattery';
import { IconLightning } from 'src/assets/icons/IconLightning';
import { IconStar } from 'src/assets/icons/IconStar';

import styles from './DataBarLabels.module.scss';

export const DataBarLabels: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <IconStar />
        <p>{t('hangar:label-base')}</p>
      </div>
      <div className={styles.label}>
        <IconLightning />
        <p>{t('hangar:label-drive')}</p>
      </div>
      <div className={styles.label}>
        <IconBattery />
        <p>{t('hangar:label-battery')}</p>
      </div>
    </div>
  );
};
