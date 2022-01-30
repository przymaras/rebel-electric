import { ifData } from "../../utils/common-functions";
import { Vehicle } from "../../models/hangar";

import styles from "./DataTables.module.scss";

import DataTable from "./DataTable";

interface DataTablesProps {
  vehicleData: Vehicle;
}

const DataTables: React.FC<DataTablesProps> = (props) => {
  const vData = props.vehicleData;
  let power =
    ifData(vData, "ctrlVoltage", "---") * ifData(vData, "ctrlCurrent", "---");
  power = power ? power : 0;
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
              <strong>{ifData(vData, "wheelSize", "unknown")}</strong>
            </p>
            <p>
              Hamulce: <strong>{ifData(vData, "brakes", "unknown")}</strong>
            </p>
            <p>
              V maks.: <strong>{`${ifData(vData, "vmax", "---")} km/h`}</strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              Masa po konwersji:
              <strong>{`${ifData(vData, "mass", "---")} kg`}</strong>
            </p>
            <p>
              Średni zasięg:{" "}
              <strong>{`${ifData(vData, "range", "---")} km`}</strong>
            </p>
            <p>
              Zużycie energii: <strong>{`przeliczyć Wh/km`}</strong>
            </p>
            <p>
              Koszt:
              <strong>{`${ifData(vData, "totalCost", "unknown")} zł`}</strong>
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
              <strong>{ifData(vData, "ctrlManuf", "unknown")}</strong>
            </p>
            <p>
              Model sterownika:
              <strong>{ifData(vData, "ctrlModel", "unknown")}</strong>
            </p>
            <p>
              Prąd maksymalny sterownika:
              <strong>{`${ifData(vData, "ctrlCurrent", "---")} A`}</strong>
            </p>
            <p>
              Moc maksymalna: <strong>{`obliczyć W`}</strong>
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
              <strong> {ifData(vData, "motorManuf", "unknown")}</strong>
            </p>
            <p>
              Model silnika:
              <strong> {ifData(vData, "motorModel", "unknown")}</strong>
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
              <strong>{ifData(vData, "batteryType", "unknown")}</strong>
            </p>
            <p>
              Typ akumulatora:
              <strong>{ifData(vData, "cellsType", "unknown")}</strong>
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
              Pojemność:
              <strong>{`${ifData(vData, "capacity", "unknown")} ${ifData(
                vData,
                "capacityUnit",
                "unknown"
              )}`}</strong>
            </p>
            <p>
              Pojemność:
              <strong>{`${ifData(
                vData,
                "capacityAh",
                "przeliczyć"
              )} Ah`}</strong>
            </p>
          </>
        }
      />
    </div>
  );
};

export default DataTables;
