import { BatteryIcon, StarIcon } from 'src/assets/icons';
import type { IconType } from 'src/assets/icons';
import { LightningIcon } from 'src/assets/icons';

import styles from './DataTable.module.scss';

interface DataTableProps {
  tableStyle: string;
  title: string;
  // col1Title: string;
  // col1Value: string;
  // col2Title: string;
  // col2Value: string;
  // col3Title: string;
  // col3Value: string;
  row1: React.ReactNode;
  row2: React.ReactNode;
}

export const DataTable: React.FC<DataTableProps> = (props) => {
  let cssStyle = '';
  let cssStyleLight = '';
  let Icon: IconType = StarIcon;
  //TODO: change to classNames lib
  switch (props.tableStyle) {
    case 'base':
      cssStyle = styles.base;
      cssStyleLight = styles.baseLight;
      Icon = StarIcon;
      break;
    case 'electrical':
      cssStyle = styles.electrical;
      cssStyleLight = styles.electricalLight;
      Icon = LightningIcon;
      break;
    case 'battery':
      cssStyle = styles.battery;
      cssStyleLight = styles.batteryLight;
      Icon = BatteryIcon;
      break;

    default:
      cssStyle = '';
      break;
  }
  return (
    <div className={`${styles.container}  ${cssStyleLight}`}>
      <div className={`${styles.headingRow}  ${cssStyle} rebel-font`}>
        <Icon height={16} />
        <p>
          <strong>{props.title}</strong>
        </p>
        {/* <div className={styles.headingInfo}>
          <p>{props.col1Title}</p>
          <p>
            <strong>{props.col1Value}</strong>
          </p>
        </div>
        <div className={styles.headingInfo}>
          <p>{props.col2Title}</p>
          <p>
            <strong>{props.col2Value}</strong>
          </p>
        </div>
        <div className={styles.headingInfo}>
          <p>{props.col3Title}</p>
          <p>
            <strong>{props.col3Value}</strong>
          </p>
        </div> */}
      </div>
      <div className={styles.details}>
        <div className={`${styles.detailsRow}  ${cssStyleLight}`}>{props.row1}</div>
        <div className={`${styles.detailsRow}  ${cssStyleLight}`}>{props.row2}</div>
      </div>
    </div>
  );
};
