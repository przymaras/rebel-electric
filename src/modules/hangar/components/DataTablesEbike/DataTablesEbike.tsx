import useTranslation from 'next-translate/useTranslation';

import { DataTable } from 'src/modules/hangar/components/DataTable';
import { ItemManufacturer } from 'src/modules/hangar/types/hangar';
import { HangarVehiclePageProps } from 'src/pages/hangar/[vehicleId]';
import { roundDec2, maybeOtherValue, maybeOtherValueOrT } from 'src/utils/common-functions';

import styles from './DataTablesEbike.module.scss';

interface DataTablesProps extends HangarVehiclePageProps {
  motorType: string;
}

export const DataTablesEbike: React.FC<DataTablesProps> = ({
  controllers,
  motors,
  motorType,
  vehicle,
}) => {
  const { t } = useTranslation();
  const unknownText = t('hangar:unknown');
  const { getMaybeOtherValue } = maybeOtherValue(unknownText);
  const { getMaybeOtherValueOrT } = maybeOtherValueOrT(unknownText, t);

  //TODO: Refactor definitions below to functions here and in VehicleBox

  let power: number | undefined =
    parseInt(
      (vehicle?.batVoltage ?? '') === 'other'
        ? vehicle?.batVoltageOther ?? ''
        : vehicle?.batVoltage ?? ''
    ) * parseInt(vehicle?.ctrlCurrent ?? '');

  power = power ? roundDec2(power) : undefined;

  const capacityUnit = vehicle?.capacityUnit;
  const capacity = roundDec2(vehicle?.capacity);
  const voltage = roundDec2(
    (vehicle?.batVoltage ?? '') === 'other'
      ? vehicle?.batVoltageOther ?? ''
      : vehicle?.batVoltage ?? ''
  );
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

  const getItemManufName = (
    itemManufId: string,
    iData: Partial<ItemManufacturer>[] | undefined
  ) => {
    let itemManufName = itemManufId;
    if (itemManufId !== 'other') {
      itemManufName =
        iData?.find((manufacturer) => manufacturer._id === itemManufId)?.manufacturer ?? '';
    }
    return itemManufName;
  };

  const getItemModelName = (
    itemManufId: string,
    itemModelId: string,
    iData: Partial<ItemManufacturer>[] | undefined
  ) => {
    let itemModelName = itemModelId;

    if (itemModelId !== 'other') {
      itemModelName =
        iData
          ?.find((manufacturer) => manufacturer._id === itemManufId)
          ?.models?.find((model) => model._id === itemModelId)?.model ?? '';
    }
    return itemModelName;
  };

  return (
    <div data-testid='DataTablesEbike' className={styles.container}>
      <DataTable
        tableStyle='base'
        title={t('hangar:base')}
        row1={
          <>
            <p>
              {`${t('hangar:base')}:`}
              <strong>{vehicle?.bikeBase ? vehicle.bikeBase : unknownText}</strong>
            </p>
            <p>
              {`${t('hangar:wheelSize')}:`}
              <strong>
                {getMaybeOtherValueOrT({
                  value: vehicle?.wheelSize,
                  otherValue: vehicle?.wheelOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:brakes')}:`}
              <strong>
                {getMaybeOtherValueOrT({
                  value: vehicle?.brakes,
                  otherValue: vehicle?.brakesOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:vMax')}:`}
              <strong>
                {vehicle?.vmax
                  ? `${roundDec2(vehicle.vmax)?.toString() ?? ''} ${t(
                      `hangar:${vehicle?.vmaxUnit ? vehicle.vmaxUnit : 'empty'}`
                    )}`
                  : unknownText}
              </strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              {`${t('hangar:weightAfter')}:`}
              <strong>
                {vehicle?.mass
                  ? `${roundDec2(vehicle.mass)?.toString() ?? ''}  ${vehicle?.massUnit ?? ''}`
                  : unknownText}
              </strong>
            </p>
            <p>
              {`${t('hangar:averageRange')}:`}
              <strong>
                {vehicle?.range
                  ? `${roundDec2(vehicle.range)?.toString() ?? ''}  ${vehicle?.rangeUnit ?? ''}`
                  : unknownText}
              </strong>
            </p>

            <p>
              {`${t('hangar:cost')}:`}
              <strong>{`${roundDec2(vehicle?.totalCost) ?? unknownText}  ${
                vehicle?.totalCostCurrency ?? ''
              }`}</strong>
            </p>
          </>
        }
      />
      <DataTable
        tableStyle='electrical'
        title={t('hangar:electrical')}
        row1={
          <>
            <p>
              {`${t('hangar:ctrlManufacturer')}:`}
              <strong>
                {getMaybeOtherValue({
                  value: getItemManufName(vehicle?.ctrlManuf ?? '', controllers),
                  otherValue: vehicle?.ctrlManufOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:ctrlModel')}:`}
              <strong>
                {getMaybeOtherValue({
                  value: getItemModelName(
                    vehicle?.ctrlManuf ?? '',
                    vehicle?.ctrlModel ?? '',
                    controllers
                  ),
                  otherValue: vehicle?.ctrlModelOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:ctrlMaxCurrent')}:`}
              <strong>
                {vehicle?.ctrlCurrent
                  ? `${roundDec2(vehicle.ctrlCurrent)?.toString() ?? ''} A`
                  : unknownText}
              </strong>
            </p>
            <p>
              {`${t('hangar:maxPower')}:`}
              <strong>{power ? `${roundDec2(power)?.toString() ?? ''} W` : unknownText}</strong>
            </p>
            <p>
              {`${t('hangar:energyConsumption')}:`}
              <strong>
                {energyConsumption
                  ? `${energyConsumption} Wh/${vehicle?.rangeUnit ?? '---'}`
                  : unknownText}
              </strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              {`${t('hangar:motorType')}:`}
              <strong>{t(`hangar:${motorType}`)}</strong>
            </p>
            <p>
              {`${t('hangar:motorManufacturer')}:`}
              <strong>
                {getMaybeOtherValue({
                  value: getItemManufName(vehicle?.motorManuf ?? '', motors),
                  otherValue: vehicle?.motorManufOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:motorModel')}:`}
              <strong>
                {getMaybeOtherValue({
                  value: getItemModelName(
                    vehicle?.motorManuf ?? '',
                    vehicle?.motorModel ?? '',
                    motors
                  ),
                  otherValue: vehicle?.motorModelOther,
                })}
              </strong>
            </p>
          </>
        }
      />
      <DataTable
        tableStyle='battery'
        title={t('hangar:battery')}
        row1={
          <>
            <p>
              {`${t('hangar:batteryCaseType')}:`}
              <strong>
                {getMaybeOtherValueOrT({
                  value: vehicle?.batteryCase,
                  otherValue: vehicle?.batteryCaseOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:cellsType')}:`}
              <strong>
                {getMaybeOtherValueOrT({
                  value: vehicle?.cellsType,
                  otherValue: vehicle?.cellsTypeOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:nominalVoltage')}:`}
              <strong>
                {getMaybeOtherValue({
                  value:
                    vehicle?.batVoltage && vehicle?.batVoltage !== 'other'
                      ? `${vehicle?.batVoltage} V`
                      : vehicle?.batVoltage,
                  otherValue: vehicle?.batVoltageOther && `${vehicle?.batVoltageOther} V`,
                })}
              </strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              {`${t('hangar:capacityWh')}:`}
              <strong>{capacityWh ? capacityWh : unknownText}</strong>
            </p>
            <p>
              {`${t('hangar:capacityAh')}:`}
              <strong>{capacityAh ? capacityAh : unknownText}</strong>
            </p>
          </>
        }
      />
    </div>
  );
};
