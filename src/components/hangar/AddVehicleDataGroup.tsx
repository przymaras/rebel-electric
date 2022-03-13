import { IconBattery } from '../icons/IconBattery';
import { IconLightning } from '../icons/IconLightning';
import { IconStar } from '../icons/IconStar';
import styles from './AddVehicleDataGroup.module.scss';

interface AddVehicleDataGroupProps {
  groupStyle: string;
  name: string;
}

const AddVehicleDataGroup: React.FC<AddVehicleDataGroupProps> = (props) => {
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

export default AddVehicleDataGroup;
