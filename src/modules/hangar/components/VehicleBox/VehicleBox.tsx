/* eslint-disable @next/next/no-img-element */
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { DataBar } from 'src/modules/hangar/components/DataBar';
import { IVehicle } from 'src/modules/hangar/types/hangar';
import { getBigThumbSrc, roundDec2 } from 'src/utils/common-functions';

import styles from './VehicleBox.module.scss';

interface VehicleBoxProps {
  vehicle: Partial<IVehicle>;
}

export const VehicleBox: React.FC<VehicleBoxProps> = ({ vehicle }) => {
  const imageName = vehicle?.vehicleImages?.[0] ? vehicle.vehicleImages[0] : 'none.jpg';
  const projectName = vehicle.projectName;
  const vehicleId = vehicle._id;

  const { t } = useTranslation();

  //TODO: Refactor definitions below to functions here and in DataTablesEbike

  let power: number | undefined =
    parseInt(vehicle?.batVoltage ?? '') * parseInt(vehicle?.ctrlCurrent ?? '');

  power = power ? roundDec2(power) : undefined;

  const capacityUnit = vehicle?.capacityUnit;
  const capacity = roundDec2(vehicle?.capacity);
  const voltage = roundDec2(vehicle?.batVoltage);
  let capacityWh: number | undefined;
  let capacityAh: number | undefined;

  if (capacityUnit === 'Wh') {
    capacityWh = capacity;
    if (voltage) {
      capacityAh = roundDec2((capacity ?? 0) / voltage);
    }
  } else if (capacityUnit === 'Ah') {
    capacityAh = capacity;
    if (voltage) {
      capacityWh = roundDec2((capacity ?? 0) * voltage);
    }
  }

  const range = parseInt(vehicle?.range ?? '---');
  let energyConsumption: number | undefined;

  if (capacityWh && range) {
    energyConsumption = roundDec2(capacityWh / range);
  }

  return (
    <Link href={`/hangar/${vehicleId ?? ''}`} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <h2 className={`${styles.title} rebel-font`}>{vehicle.projectName}</h2>
          </div>
          <div className={styles.categoryImg}>
            <img
              src={getBigThumbSrc({ imageName, seoName: projectName ?? '' })}
              alt={projectName}
              loading='lazy'
            />
          </div>

          <DataBar
            barStyle='base'
            col1={`${vehicle?.vmax ? vehicle.vmax : '---'} ${
              vehicle?.vmaxUnit ? t(`hangar:${vehicle.vmaxUnit}`) : ''
            }`}
            col2={`${vehicle?.mass ? vehicle.mass : '---'} ${vehicle.massUnit ?? ''}`}
            col3={`${vehicle?.range ? vehicle.range : '---'} ${vehicle?.rangeUnit ?? ''}`}
          />
          <DataBar
            barStyle='electrical'
            col1={power ? `${power} W` : '---'}
            col2={vehicle?.ctrlCurrent ? `${vehicle.ctrlCurrent} A` : '---'}
            col3={
              energyConsumption ? `${energyConsumption} Wh/${vehicle?.rangeUnit ?? '---'}` : '---'
            }
          />
          <DataBar
            barStyle='battery'
            col1={capacityWh ? `${capacityWh} Wh` : '---'}
            col2={capacityAh ? `${capacityAh} Ah` : '---'}
            col3={
              vehicle?.batVoltage && vehicle?.batVoltage !== 'other'
                ? `${vehicle.batVoltage} V`
                : vehicle?.batVoltageOther
                ? `${vehicle.batVoltageOther} V`
                : '---'
            }
          />
        </div>
      </a>
    </Link>
  );
};
