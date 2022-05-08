import { IconBattery } from 'src/assets/icons/IconBattery';
import { IconLightning } from 'src/assets/icons/IconLightning';
import { IconStar } from 'src/assets/icons/IconStar';

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
  let Icon = IconStar;
  //TODO: change to classNames lib
  switch (props.tableStyle) {
    case 'base':
      cssStyle = styles.base;
      cssStyleLight = styles.baseLight;
      Icon = IconStar;
      break;
    case 'electrical':
      cssStyle = styles.electrical;
      cssStyleLight = styles.electricalLight;
      Icon = IconLightning;
      break;
    case 'battery':
      cssStyle = styles.battery;
      cssStyleLight = styles.batteryLight;
      Icon = IconBattery;
      break;

    default:
      cssStyle = '';
      break;
  }
  return (
    <div className={`${styles.container}  ${cssStyleLight}`}>
      <div className={`${styles.headingRow}  ${cssStyle} rebel-font`}>
        <Icon />
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
