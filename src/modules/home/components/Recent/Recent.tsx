/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { Vehicle } from 'src/modules/hangar/types/hangar';
import { getBigThumbSrc } from 'src/utils/common-functions';

import styles from './Recent.module.scss';

interface RecentProps {
  vehicle: Vehicle;
}

export const Recent: React.FC<RecentProps> = ({ vehicle: { vehicleImages, projectName, _id } }) => {
  const imageName = vehicleImages[0];
  return (
    <div className={styles.container} data-testid={`Recent_${_id}`}>
      <Link href={`/hangar/${_id}`}>
        <a>
          <div className={styles.recentImgContainer}>
            <img
              src={getBigThumbSrc({ imageName, seoName: projectName })}
              alt='Cube Ams 100 TSDZ2'
              className={styles.img}
            />
          </div>
        </a>
      </Link>
      <h2 className={styles.recentName}>{projectName}</h2>
    </div>
  );
};
