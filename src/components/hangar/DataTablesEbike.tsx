import { ifData, ifDataOther } from "../../utils/common-functions";
import { Vehicle } from "../../models/hangar";

import styles from "./DataTables.module.scss";

import DataTable from "./DataTable";

interface DataTablesProps {
  vehicleData: Vehicle;
}

const DataTables: React.FC<DataTablesProps> = (props) => {
  const vData = props.vehicleData;

  let power =
    parseInt(ifData(vData, "batVoltage", "---")) *
    parseInt(ifData(vData, "ctrlCurrent", "---"));

  power = power ? power : 0;

  const capacityUnit = ifData(vData, "capacityUnit", "---");
  const capacity = parseInt(ifData(vData, "capacity", "---"));
  const voltage = parseInt(ifData(vData, "batVoltage", "---"));
  let capacityWh: number = 0;
  let capacityAh: number = 0;

  if (capacityUnit === "Wh") {
    capacityWh = capacity;
    if (voltage) {
      capacityAh = capacity / voltage;
    }
  } else if (capacityUnit === "Ah") {
    capacityAh = capacity;
    if (voltage) {
      capacityWh = capacity * voltage;
    }
  }

  const range = parseInt(ifData(vData, "range", "---"));
  let energyConsumption: number = 0;

  if (capacityWh && range) {
    energyConsumption = capacityWh / range;
  }

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
              Baza: <strong>{ifData(vData, "bikeBase", "unknown")}</strong>
            </p>
            <p>
              Rozmiar kół:
              <strong>
                {ifDataOther(vData, "wheelSize", "wheelOther", "unknown")}
              </strong>
            </p>
            <p>
              Hamulce:
              <strong>
                {ifDataOther(vData, "brakes", "brakesOther", "unknown")}
              </strong>
            </p>
            <p>
              V maks.:
              <strong>{`${ifData(vData, "vmax", "---")} ${ifData(
                vData,
                "vmaxUnit",
                "unit"
              )}`}</strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              Masa po konwersji:
              <strong>{`${ifData(vData, "mass", "---")}  ${ifData(
                vData,
                "massUnit",
                "unit"
              )}`}</strong>
            </p>
            <p>
              Średni zasięg:{" "}
              <strong>{`${ifData(vData, "range", "---")}  ${ifData(
                vData,
                "rangeUnit",
                "unit"
              )}`}</strong>
            </p>
            <p>
              Zużycie energii:{" "}
              <strong>{`${energyConsumption.toFixed(2)} Wh/${ifData(
                vData,
                "rangeUnit",
                "---"
              )}`}</strong>
            </p>
            <p>
              Koszt:
              <strong>{`${ifData(vData, "totalCost", "unknown")}  ${ifData(
                vData,
                "totalCostCurrency",
                "unit"
              )}`}</strong>
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
                {ifDataOther(vData, "ctrlManuf", "ctrlManufOther", "unknown")}
              </strong>
            </p>
            <p>
              Model sterownika:
              <strong>
                {ifDataOther(vData, "ctrlModel", "ctrlModelOther", "unknown")}
              </strong>
            </p>
            <p>
              Prąd maksymalny sterownika:
              <strong>{`${ifData(vData, "ctrlCurrent", "---")} A`}</strong>
            </p>
            <p>
              Moc maksymalna: <strong>{`${power} W`}</strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              Rodzaj silnika: <strong>pobrać z kategorii</strong>
            </p>
            <p>
              Marka silnika:
              <strong>
                {ifDataOther(vData, "motorManuf", "motorManufOther", "unknown")}
              </strong>
            </p>
            <p>
              Model silnika:
              <strong>
                {ifDataOther(vData, "motorModel", "motorModelOther", "unknown")}
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
                {ifDataOther(
                  vData,
                  "batteryType",
                  "batteryTypeOther",
                  "unknown"
                )}
              </strong>
            </p>
            <p>
              Typ akumulatora:
              <strong>
                {ifDataOther(vData, "cellsType", "cellsTypeOther", "unknown")}
              </strong>
            </p>
            <p>
              Napięcie nominalne:
              <strong>{`${ifData(vData, "batVoltage", "unknown")} V`}</strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              Pojemność [Wh]:
              <strong>{capacityWh.toFixed(1)}</strong>
            </p>
            <p>
              Pojemność [Ah]:
              <strong>{capacityAh.toFixed(1)}</strong>
            </p>
          </>
        }
      />
    </div>
  );
};

export default DataTables;
