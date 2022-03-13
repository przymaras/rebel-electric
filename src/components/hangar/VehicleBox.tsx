/* eslint-disable @next/next/no-img-element */
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { Vehicle } from '../../models/hangar';
import { getBigThumbSrc, roundNum } from '../../utils/common-functions';
import DataBar from './DataBar';
import styles from './VehicleBox.module.scss';

interface VehicleBoxProps {
  vehicleData: Vehicle;
}

const VehicleBox: React.FC<VehicleBoxProps> = (props) => {
  const vData = props.vehicleData;

  const imageName = vData.vehicleImages[0] ? vData.vehicleImages[0] : 'none.jpg';
  const projectName = vData.projectName;
  const vehicleId = vData._id;

  const { t } = useTranslation();

  //TODO: Refactor definitions below to functions here and in DataTablesEbike

  let power: number | undefined =
    parseInt(vData?.batVoltage ?? '') * parseInt(vData?.ctrlCurrent ?? '');

  power = power ? roundNum(power) : undefined;

  const capacityUnit = vData?.capacityUnit;
  const capacity = roundNum(vData?.capacity);
  const voltage = roundNum(vData?.batVoltage);
  let capacityWh: number | undefined;
  let capacityAh: number | undefined;

  if (capacityUnit === 'Wh') {
    capacityWh = capacity;
    if (voltage) {
      capacityAh = roundNum((capacity ?? 0) / voltage);
    }
  } else if (capacityUnit === 'Ah') {
    capacityAh = capacity;
    if (voltage) {
      capacityWh = roundNum((capacity ?? 0) * voltage);
    }
  }

  const range = parseInt(vData?.range ?? '---');
  let energyConsumption: number | undefined;

  if (capacityWh && range) {
    energyConsumption = roundNum(capacityWh / range);
  }

  return (
    <Link href={`/hangar/${vehicleId}`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <h2 className={`${styles.title} rebel-font`}>{vData.projectName}</h2>
          </div>
          <div className={styles.categoryImg}>
            <img src={getBigThumbSrc(imageName, projectName)} alt={projectName} loading='lazy' />
          </div>

          <DataBar
            barStyle='base'
            col1={`${vData?.vmax ? vData.vmax : '---'} ${
              vData?.vmaxUnit ? t(`hangar:${vData.vmaxUnit}`) : ''
            }`}
            col2={`${vData?.mass ? vData.mass : '---'} ${vData.massUnit ?? ''}`}
            col3={`${vData?.range ? vData.range : '---'} ${vData?.rangeUnit ?? ''}`}
          />
          <DataBar
            barStyle='electrical'
            col1={power ? `${power} W` : '---'}
            col2={vData?.ctrlCurrent ? `${vData.ctrlCurrent} A` : '---'}
            col3={
              energyConsumption ? `${energyConsumption} Wh/${vData?.rangeUnit ?? '---'}` : '---'
            }
          />
          <DataBar
            barStyle='battery'
            col1={capacityWh ? `${capacityWh} Wh` : '---'}
            col2={capacityAh ? `${capacityAh} Ah` : '---'}
            col3={
              vData?.batVoltage && vData?.batVoltage !== 'other'
                ? `${vData.batVoltage} V`
                : vData?.batVoltageOther
                ? `${vData.batVoltageOther} V`
                : '---'
            }
          />
        </div>
      </a>
    </Link>
  );
};

export default VehicleBox;
