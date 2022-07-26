import useTranslation from 'next-translate/useTranslation';

import { DataTable } from 'src/modules/hangar/components/DataTable';
import { IVehicle } from 'src/modules/hangar/types/hangar';
import { ItemManufacturer } from 'src/modules/hangar/types/hangar';
import { roundDec2, maybeOtherValue, maybeOtherValueOrT } from 'src/utils/common-functions';

import styles from './DataTablesEbike.module.scss';

interface DataTablesProps {
  vehicleData?: IVehicle;
  controllersData?: ItemManufacturer[];
  motorsData?: ItemManufacturer[];
  motorType: string;
}

export const DataTablesEbike: React.FC<DataTablesProps> = (props) => {
  const { t } = useTranslation();
  const unknownText = t('hangar:unknown');
  const { getMaybeOtherValue } = maybeOtherValue(unknownText);
  const { getMaybeOtherValueOrT } = maybeOtherValueOrT(unknownText, t);
  const vData = props.vehicleData;
  const cData = props.controllersData;
  const mData = props.motorsData;

  //TODO: Refactor definitions below to functions here and in VehicleBox

  let power: number | undefined =
    parseInt(
      (vData?.batVoltage ?? '') === 'other' ? vData?.batVoltageOther ?? '' : vData?.batVoltage ?? ''
    ) * parseInt(vData?.ctrlCurrent ?? '');

  power = power ? roundDec2(power) : undefined;

  const capacityUnit = vData?.capacityUnit;
  const capacity = roundDec2(vData?.capacity);
  const voltage = roundDec2(
    (vData?.batVoltage ?? '') === 'other' ? vData?.batVoltageOther ?? '' : vData?.batVoltage ?? ''
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

  const range = parseInt(vData?.range ?? '---');
  let energyConsumption: number | undefined;

  if (capacityWh && range) {
    energyConsumption = roundDec2(capacityWh / range);
  }

  const getItemManufName = (itemManufId: string, iData: ItemManufacturer[] | undefined) => {
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
    iData: ItemManufacturer[] | undefined
  ) => {
    let itemModelName = itemModelId;

    if (itemModelId !== 'other') {
      itemModelName =
        iData
          ?.find((manufacturer) => manufacturer._id === itemManufId)
          ?.models.find((model) => model._id === itemModelId)?.model ?? '';
    }
    return itemModelName;
  };

  return (
    <div data-testid='DataTablesEbike' className={styles.container}>
      <DataTable
        tableStyle='base'
        title={t('hangar:base')}
        // col1Title="V maks."
        // col1Value={`${ifData(vData, "vmax", "---")} km/h`}
        // col2Title="Masa"
        // col2Value={`${ifData(vData, "mass", "---")} kg`}
        // col3Title="Zasięg"
        // col3Value={`${ifData(vData, "range", "---")} km`}
        row1={
          <>
            <p>
              {`${t('hangar:base')}:`}
              <strong>{vData?.bikeBase ? vData.bikeBase : unknownText}</strong>
            </p>
            <p>
              {`${t('hangar:wheelSize')}:`}
              <strong>
                {getMaybeOtherValueOrT({ value: vData?.wheelSize, otherValue: vData?.wheelOther })}
              </strong>
            </p>
            <p>
              {`${t('hangar:brakes')}:`}
              <strong>
                {getMaybeOtherValueOrT({ value: vData?.brakes, otherValue: vData?.brakesOther })}
              </strong>
            </p>
            <p>
              {`${t('hangar:vMax')}:`}
              <strong>
                {vData?.vmax
                  ? `${roundDec2(vData.vmax)?.toString() ?? ''} ${t(
                      `hangar:${vData?.vmaxUnit ? vData.vmaxUnit : 'empty'}`
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
                {vData?.mass
                  ? `${roundDec2(vData.mass)?.toString() ?? ''}  ${vData?.massUnit ?? ''}`
                  : unknownText}
              </strong>
            </p>
            <p>
              {`${t('hangar:averageRange')}:`}
              <strong>
                {vData?.range
                  ? `${roundDec2(vData.range)?.toString() ?? ''}  ${vData?.rangeUnit ?? ''}`
                  : unknownText}
              </strong>
            </p>

            <p>
              {`${t('hangar:cost')}:`}
              <strong>{`${roundDec2(vData?.totalCost) ?? unknownText}  ${
                vData?.totalCostCurrency ?? ''
              }`}</strong>
            </p>
          </>
        }
      />
      <DataTable
        tableStyle='electrical'
        title={t('hangar:electrical')}
        // col1Title="Moc maks."
        // col1Value={`${power} W`}
        // col2Title="Napięcie"
        // col2Value={`${ifData(vData, "ctrlVoltage", "---")} V`}
        // col3Title="Prąd"
        // col3Value={`${ifData(vData, "ctrlCurrent", "---")} A`}
        row1={
          <>
            <p>
              {`${t('hangar:ctrlManufacturer')}:`}
              <strong>
                {getMaybeOtherValue({
                  value: getItemManufName(vData?.ctrlManuf ?? '', cData),
                  otherValue: vData?.ctrlManufOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:ctrlModel')}:`}
              <strong>
                {getMaybeOtherValue({
                  value: getItemModelName(vData?.ctrlManuf ?? '', vData?.ctrlModel ?? '', cData),
                  otherValue: vData?.ctrlModelOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:ctrlMaxCurrent')}:`}
              <strong>
                {vData?.ctrlCurrent
                  ? `${roundDec2(vData.ctrlCurrent)?.toString() ?? ''} A`
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
                  ? `${energyConsumption} Wh/${vData?.rangeUnit ?? '---'}`
                  : unknownText}
              </strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              {`${t('hangar:motorType')}:`}
              <strong>{t(`hangar:${props.motorType}`)}</strong>
            </p>
            <p>
              {`${t('hangar:motorManufacturer')}:`}
              <strong>
                {getMaybeOtherValue({
                  value: getItemManufName(vData?.motorManuf ?? '', mData),
                  otherValue: vData?.motorManufOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:motorModel')}:`}
              <strong>
                {getMaybeOtherValue({
                  value: getItemModelName(vData?.motorManuf ?? '', vData?.motorModel ?? '', mData),
                  otherValue: vData?.motorModelOther,
                })}
              </strong>
            </p>
          </>
        }
      />
      <DataTable
        tableStyle='battery'
        title={t('hangar:battery')}
        // col1Title="Napięcie"
        // col1Value={`${ifData(vData, "batVoltage", "---")} V`}
        // col2Title="Poj. Wh"
        // col2Value={`${ifData(vData, "capacityWh", "---")} Wh`}
        // col3Title="Poj. Ah"
        // col3Value={`${ifData(vData, "capacityAh", "---")} Ah`}
        row1={
          <>
            <p>
              {`${t('hangar:batteryCaseType')}:`}
              <strong>
                {getMaybeOtherValueOrT({
                  value: vData?.batteryCase,
                  otherValue: vData?.batteryCaseOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:cellsType')}:`}
              <strong>
                {getMaybeOtherValueOrT({
                  value: vData?.cellsType,
                  otherValue: vData?.cellsTypeOther,
                })}
              </strong>
            </p>
            <p>
              {`${t('hangar:nominalVoltage')}:`}
              <strong>
                {getMaybeOtherValue({
                  value:
                    vData?.batVoltage && vData?.batVoltage !== 'other'
                      ? `${vData?.batVoltage} V`
                      : vData?.batVoltage,
                  otherValue: vData?.batVoltageOther && `${vData?.batVoltageOther} V`,
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
