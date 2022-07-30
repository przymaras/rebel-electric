/* eslint-disable @next/next/no-img-element */
import useTranslation from 'next-translate/useTranslation';

import { EyeSolidIcon, ThumbsUpSolidIcon } from 'src/assets/icons';
import type { SvgComponentType } from 'src/types';

import styles from './VehicleVeiwsCatLikes.module.scss';

interface VehicleVeiwsCatLikesProps {
  views: string;
  category: string;
  CategoryImg: SvgComponentType;
  likes: string;
}

export const VehicleVeiwsCatLikes: React.FC<VehicleVeiwsCatLikesProps> = ({
  views,
  category,
  CategoryImg,
  likes,
}) => {
  const { t } = useTranslation();
  return (
    <div data-testid='VehicleVeiwsCatLikes' className={styles.container}>
      <div className={styles.views}>
        <EyeSolidIcon title='Views' height={40} />
        <p>{views}</p>
        <p className={styles.uppercase}>{t('hangar:views')}</p>
      </div>
      <div className={styles.category}>
        <CategoryImg title='Category' height={113} />
        <p>{category}</p>
      </div>
      <div className={styles.likes}>
        <ThumbsUpSolidIcon title='Thumb up' height={45} />
        <p>{likes}</p>
        <p className={styles.uppercase}>{t('hangar:likes')}</p>
      </div>
    </div>
  );
};
