/* eslint-disable @next/next/no-img-element */
import useTranslation from 'next-translate/useTranslation';

import styles from './VehicleVeiwsCatLikes.module.scss';

interface VehicleVeiwsCatLikesProps {
  views: string;
  category: string;
  categoryImg: string;
  likes: string;
}

export const VehicleVeiwsCatLikes: React.FC<VehicleVeiwsCatLikesProps> = ({
  views,
  category,
  categoryImg,
  likes,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.views}>
        <img src='/img/fa-ico/eye-solid.svg' alt='Views' />
        <p>{views}</p>
        <p className={styles.uppercase}>{t('hangar:views')}</p>
      </div>
      <div className={styles.category}>
        <img src={categoryImg} alt='Category' />
        <p>{category}</p>
      </div>
      <div className={styles.likes}>
        <img src='/img/fa-ico/thumbs-up-solid.svg' alt='Thumb up' />
        <p>{likes}</p>
        <p className={styles.uppercase}>{t('hangar:likes')}</p>
      </div>
    </div>
  );
};
