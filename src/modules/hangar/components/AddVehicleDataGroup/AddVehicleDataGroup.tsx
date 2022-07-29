import { BatteryIcon, LightningIcon, StarIcon } from 'src/assets/icons';
import type { IconType } from 'src/assets/icons';

import styles from './AddVehicleDataGroup.module.scss';

interface AddVehicleDataGroupProps {
  groupStyle: string;
  name: string;
}

export const AddVehicleDataGroup: React.FC<AddVehicleDataGroupProps> = (props) => {
  let cssStyle;
  let Icon: IconType = StarIcon;

  switch (props.groupStyle) {
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
    <div
      data-testid={`AddEbikeForm${props.groupStyle}`}
      className={`${styles.container} ${cssStyle}`}
    >
      <div className={styles.heading}>
        <Icon height={18} />
        <h2 className='rebel-font'>{props.name}</h2>
      </div>
      <div className={styles.wrapper}>{props.children}</div>
    </div>
  );
};
