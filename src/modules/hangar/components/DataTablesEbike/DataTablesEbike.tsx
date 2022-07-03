import useTranslation from 'next-translate/useTranslation';

import { DataTable } from 'src/modules/hangar/components/DataTable';
import { Vehicle } from 'src/modules/hangar/types/hangar';
import { ItemManufacturerObj } from 'src/modules/hangar/types/hangar';
import { dataOrOther, translateOrOther, roundNum } from 'src/utils/common-functions';

import styles from './DataTablesEbike.module.scss';

interface DataTablesProps {
  vehicleData?: Vehicle;
  controllersData?: ItemManufacturerObj[];
  motorsData?: ItemManufacturerObj[];
  motorType: string;
}

export const DataTablesEbike: React.FC<DataTablesProps> = (props) => {
  const { t } = useTranslation();
  const unknownText = t('hangar:unknown');
  const vData = props.vehicleData;
  const cData = props.controllersData;
  const mData = props.motorsData;

  //TODO: Refactor definitions below to functions here and in VehicleBox

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

  const getItemManufName = (itemManufId: string, iData: ItemManufacturerObj[] | undefined) => {
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
    iData: ItemManufacturerObj[] | undefined
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
              <strong>{translateOrOther(vData?.wheelSize, vData?.wheelOther, t)}</strong>
            </p>
            <p>
              {`${t('hangar:brakes')}:`}
              <strong>{translateOrOther(vData?.brakes, vData?.brakesOther, t)}</strong>
            </p>
            <p>
              {`${t('hangar:vMax')}:`}
              <strong>
                {vData?.vmax
                  ? `${roundNum(vData.vmax)?.toString() ?? ''} ${t(
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
                  ? `${roundNum(vData.mass)?.toString() ?? ''}  ${vData?.massUnit ?? ''}`
                  : unknownText}
              </strong>
            </p>
            <p>
              {`${t('hangar:averageRange')}:`}
              <strong>
                {vData?.range
                  ? `${roundNum(vData.range)?.toString() ?? ''}  ${vData?.rangeUnit ?? ''}`
                  : unknownText}
              </strong>
            </p>

            <p>
              {`${t('hangar:cost')}:`}
              <strong>{`${roundNum(vData?.totalCost) ?? unknownText}  ${
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
                {dataOrOther(
                  getItemManufName(vData?.ctrlManuf ?? '', cData),
                  vData?.ctrlManufOther,
                  t
                )}
              </strong>
            </p>
            <p>
              {`${t('hangar:ctrlModel')}:`}
              <strong>
                {dataOrOther(
                  getItemModelName(vData?.ctrlManuf ?? '', vData?.ctrlModel ?? '', cData),
                  vData?.ctrlModelOther,
                  t
                )}
              </strong>
            </p>
            <p>
              {`${t('hangar:ctrlMaxCurrent')}:`}
              <strong>
                {vData?.ctrlCurrent
                  ? `${roundNum(vData.ctrlCurrent)?.toString() ?? ''} A`
                  : unknownText}
              </strong>
            </p>
            <p>
              {`${t('hangar:maxPower')}:`}
              <strong>{power ? `${roundNum(power)?.toString() ?? ''} W` : unknownText}</strong>
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
                {dataOrOther(
                  getItemManufName(vData?.motorManuf ?? '', mData),
                  vData?.motorManufOther,
                  t
                )}
              </strong>
            </p>
            <p>
              {`${t('hangar:motorModel')}:`}
              <strong>
                {dataOrOther(
                  getItemModelName(vData?.motorManuf ?? '', vData?.motorModel ?? '', mData),
                  vData?.motorModelOther,
                  t
                )}
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
              <strong>{translateOrOther(vData?.batteryCase, vData?.batteryCaseOther, t)}</strong>
            </p>
            <p>
              {`${t('hangar:cellsType')}:`}
              <strong>{translateOrOther(vData?.cellsType, vData?.cellsTypeOther, t)}</strong>
            </p>
            <p>
              {`${t('hangar:nominalVoltage')}:`}
              <strong>
                {dataOrOther(
                  vData?.batVoltage && vData?.batVoltage !== 'other'
                    ? `${vData?.batVoltage} V`
                    : vData?.batVoltage,
                  vData?.batVoltageOther && `${vData?.batVoltageOther} V`,
                  t
                )}
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
