import useTranslation from "next-translate/useTranslation";
import {
  dataOrOther,
  translateOrOther,
  roundNum,
} from "../../utils/common-functions";
import { Vehicle } from "../../models/hangar";
import { ItemManufacturerObj } from "../../models/hangar";

import styles from "./DataTables.module.scss";

import DataTable from "./DataTable";

interface DataTablesProps {
  vehicleData?: Vehicle;
  controllersData?: ItemManufacturerObj[];
  motorsData?: ItemManufacturerObj[];
  motorType: string;
}

const DataTables: React.FC<DataTablesProps> = (props) => {
  const { t } = useTranslation();
  const unknownText = t("hangar:unknown");
  const vData = props.vehicleData;
  const cData = props.controllersData;
  const mData = props.motorsData;

  //TODO: Refactor definitions below to functions

  let power: number | undefined =
    parseInt(vData?.batVoltage ?? "") * parseInt(vData?.ctrlCurrent ?? "");

  power = power ? roundNum(power) : undefined;

  const capacityUnit = vData?.capacityUnit;
  const capacity = roundNum(vData?.capacity);
  const voltage = roundNum(vData?.batVoltage);
  let capacityWh: number | undefined;
  let capacityAh: number | undefined;

  if (capacityUnit === "Wh") {
    capacityWh = capacity;
    if (voltage) {
      capacityAh = roundNum((capacity ?? 0) / voltage);
    }
  } else if (capacityUnit === "Ah") {
    capacityAh = capacity;
    if (voltage) {
      capacityWh = roundNum((capacity ?? 0) * voltage);
    }
  }

  const range = parseInt(vData?.range ?? "---");
  let energyConsumption: number | undefined;

  if (capacityWh && range) {
    energyConsumption = roundNum(capacityWh / range);
  }

  const getItemManufName = (
    itemManufId: string,
    iData: ItemManufacturerObj[] | undefined
  ) => {
    let itemManufName = itemManufId;
    if (itemManufId !== "other") {
      itemManufName =
        iData?.find((manufacturer) => manufacturer._id === itemManufId)
          ?.manufacturer ?? "";
    }
    return itemManufName;
  };

  const getItemModelName = (
    itemManufId: string,
    itemModelId: string,
    iData: ItemManufacturerObj[] | undefined
  ) => {
    let itemModelName = itemModelId;

    if (itemModelId !== "other") {
      itemModelName =
        iData
          ?.find((manufacturer) => manufacturer._id === itemManufId)
          ?.models.find((model) => model._id === itemModelId)?.model ?? "";
    }
    return itemModelName;
  };

  return (
    <div className={styles.container}>
      <DataTable
        style="base"
        title="Baza"
        // col1Title="V maks."
        // col1Value={`${ifData(vData, "vmax", "---")} km/h`}
        // col2Title="Masa"
        // col2Value={`${ifData(vData, "mass", "---")} kg`}
        // col3Title="Zasięg"
        // col3Value={`${ifData(vData, "range", "---")} km`}
        row1={
          <>
            <p>
              Baza: <strong>{vData?.bikeBase ?? unknownText}</strong>
            </p>
            <p>
              Rozmiar kół:
              <strong>
                {translateOrOther(vData?.wheelSize, vData?.wheelOther, t)}
              </strong>
            </p>
            <p>
              Hamulce:
              <strong>
                {translateOrOther(vData?.brakes, vData?.brakesOther, t)}
              </strong>
            </p>
            <p>
              V maks.:
              <strong>{`${roundNum(vData?.vmax) ?? unknownText} ${t(
                `hangar:${vData?.vmaxUnit ?? "empty"}`
              )}`}</strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              Masa po konwersji:
              <strong>{`${roundNum(vData?.mass) ?? "---"}  ${
                vData?.massUnit ?? ""
              }`}</strong>
            </p>
            <p>
              Średni zasięg:
              <strong>{`${roundNum(vData?.range) ?? "---"}  ${
                vData?.rangeUnit ?? ""
              }`}</strong>
            </p>
            <p>
              Zużycie energii:
              <strong>{`${energyConsumption ?? "---"} Wh/${
                vData?.rangeUnit ?? "---"
              }`}</strong>
            </p>
            <p>
              Koszt:
              <strong>{`${roundNum(vData?.totalCost) ?? unknownText}  ${
                vData?.totalCostCurrency ?? ""
              }`}</strong>
            </p>
          </>
        }
      />
      <DataTable
        style="electrical"
        title="Elektryka"
        // col1Title="Moc maks."
        // col1Value={`${power} W`}
        // col2Title="Napięcie"
        // col2Value={`${ifData(vData, "ctrlVoltage", "---")} V`}
        // col3Title="Prąd"
        // col3Value={`${ifData(vData, "ctrlCurrent", "---")} A`}
        row1={
          <>
            <p>
              Producent sterownika:
              <strong>
                {dataOrOther(
                  getItemManufName(vData?.ctrlManuf ?? "", cData),
                  vData?.ctrlManufOther,
                  t
                )}
              </strong>
            </p>
            <p>
              Model sterownika:
              <strong>
                {dataOrOther(
                  getItemModelName(
                    vData?.ctrlManuf ?? "",
                    vData?.ctrlModel ?? "",
                    cData
                  ),
                  vData?.ctrlModelOther,
                  t
                )}
              </strong>
            </p>
            <p>
              Prąd maksymalny sterownika:
              <strong>{`${roundNum(vData?.ctrlCurrent) ?? "---"} A`}</strong>
            </p>
            <p>
              Moc maksymalna:<strong>{`${roundNum(power) ?? "---"} W`}</strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              Rodzaj silnika:<strong>{props.motorType}</strong>
            </p>
            <p>
              Marka silnika:
              <strong>
                {dataOrOther(
                  getItemManufName(vData?.motorManuf ?? "", mData),
                  vData?.motorManufOther,
                  t
                )}
              </strong>
            </p>
            <p>
              Model silnika:
              <strong>
                {dataOrOther(
                  getItemModelName(
                    vData?.motorManuf ?? "",
                    vData?.motorModel ?? "",
                    mData
                  ),
                  vData?.motorModelOther,
                  t
                )}
              </strong>
            </p>
          </>
        }
      />
      <DataTable
        style="battery"
        title="Bateria"
        // col1Title="Napięcie"
        // col1Value={`${ifData(vData, "batVoltage", "---")} V`}
        // col2Title="Poj. Wh"
        // col2Value={`${ifData(vData, "capacityWh", "---")} Wh`}
        // col3Title="Poj. Ah"
        // col3Value={`${ifData(vData, "capacityAh", "---")} Ah`}
        row1={
          <>
            <p>
              Sposób montazu baterii:
              <strong>
                {translateOrOther(
                  vData?.batteryCase,
                  vData?.batteryCaseOther,
                  t
                )}
              </strong>
            </p>
            <p>
              Typ akumulatora:
              <strong>
                {translateOrOther(vData?.cellsType, vData?.cellsTypeOther, t)}
              </strong>
            </p>
            <p>
              Napięcie nominalne:
              <strong>{`${
                roundNum(vData?.batVoltage) ?? unknownText
              } V`}</strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              Pojemność [Wh]:
              <strong>{capacityWh ?? "---"}</strong>
            </p>
            <p>
              Pojemność [Ah]:
              <strong>{capacityAh ?? "---"}</strong>
            </p>
          </>
        }
      />
    </div>
  );
};

export default DataTables;
