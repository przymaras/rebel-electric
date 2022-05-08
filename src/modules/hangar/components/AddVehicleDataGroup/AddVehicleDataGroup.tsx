import { IconBattery } from 'src/assets/icons/IconBattery';
import { IconLightning } from 'src/assets/icons/IconLightning';
import { IconStar } from 'src/assets/icons/IconStar';

import styles from './AddVehicleDataGroup.module.scss';

interface AddVehicleDataGroupProps {
  groupStyle: string;
  name: string;
}

export const AddVehicleDataGroup: React.FC<AddVehicleDataGroupProps> = (props) => {
  let cssStyle;
  let Icon = IconStar;

  switch (props.groupStyle) {
    case 'base':
      cssStyle = styles.base;
      Icon = IconStar;
      break;
    case 'electrical':
      cssStyle = styles.electrical;
      Icon = IconLightning;
      break;
    case 'battery':
      cssStyle = styles.battery;
      Icon = IconBattery;
      break;

    default:
      cssStyle = '';
      break;
  }
  return (
    <div className={`${styles.container} ${cssStyle}`}>
      <div className={styles.heading}>
        <Icon />
        <h2 className='rebel-font'>{props.name}</h2>
      </div>
      <div className={styles.wrapper}>{props.children}</div>
    </div>
  );
};
