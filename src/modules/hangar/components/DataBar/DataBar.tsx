import { BatteryIcon, LightningIcon, StarIcon } from 'src/assets/icons';
import type { IconType } from 'src/assets/icons';

import styles from './DataBar.module.scss';

interface DataBarProps {
  barStyle: string;
  col1: string;
  col2: string;
  col3: string;
}

export const DataBar: React.FC<DataBarProps> = (props) => {
  let cssStyle;
  let Icon: IconType = StarIcon;

  switch (props.barStyle) {
    case 'base':
      cssStyle = styles.base;
      Icon = StarIcon;
      break;
    case 'electrical':
      cssStyle = styles.electrical;
      Icon = LightningIcon;
      break;
    case 'battery':
      cssStyle = styles.battery;
      Icon = BatteryIcon;
      break;

    default:
      cssStyle = '';
      break;
  }
  return (
    <div className={`${styles.container} ${cssStyle}`}>
      <Icon height={18} />
      <p>{props.col1}</p>
      <p>{props.col2}</p>
      <p>{props.col3}</p>
    </div>
  );
};
