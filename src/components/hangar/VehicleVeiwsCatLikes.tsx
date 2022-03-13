/* eslint-disable @next/next/no-img-element */

import styles from './VehicleVeiwsCatLikes.module.scss';

interface VehicleVeiwsCatLikesProps {
  views: string;
  category: string;
  categoryImg: string;
  likes: string;
}

const VehicleVeiwsCatLikes: React.FC<VehicleVeiwsCatLikesProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.views}>
        <img src='/img/fa-ico/eye-solid.svg' alt='Views' />
        <p>{props.views}</p>
        <p>WYŚWIETLEŃ</p>
      </div>
      <div className={styles.category}>
        <img src={props.categoryImg} alt='Category' />
        <p>{props.category}</p>
      </div>
      <div className={styles.likes}>
        <img src='/img/fa-ico/thumbs-up-solid.svg' alt='Thumb up' />
        <p>{props.likes}</p>
        <p>POLUBIENIE</p>
      </div>
    </div>
  );
};

export default VehicleVeiwsCatLikes;
