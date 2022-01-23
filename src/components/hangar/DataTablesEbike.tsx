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
        col1Title="V maks."
        col1Value={`${ifData(vData, "vmax", "---")} km/h`}
        col2Title="Masa"
        col2Value={`${ifData(vData, "mass", "---")} kg`}
        col3Title="Zasięg"
        col3Value={`${ifData(vData, "range", "---")} km`}
        row1={
          <>
            <p>
              Marka: <strong>{ifData(vData, "manufacturer", "unknown")}</strong>
            </p>
            <p>
              Model: <strong>{ifData(vData, "model", "unknown")}</strong>
            </p>
            <p>
              Rok produkcji bazy:{" "}
              <strong>{ifData(vData, "year", "unknown")}</strong>
            </p>
            <p>
              Rozmiar kół:{" "}
              <strong>{ifData(vData, "wheelSize", "unknown")}</strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              Hamulce: <strong>{ifData(vData, "brakes", "unknown")}</strong>
            </p>
          </>
        }
      />
      <DataTable
        style="electrical"
        title="Elektryka"
        col1Title="Moc maks."
        col1Value={`${power} W`}
        col2Title="Napięcie"
        col2Value={`${ifData(vData, "ctrlVoltage", "---")} V`}
        col3Title="Prąd"
        col3Value={`${ifData(vData, "ctrlCurrent", "---")} A`}
        row1={
          <>
            <p>
              Sterownik:{" "}
              <strong>{ifData(vData, "controller", "unknown")}</strong>
            </p>
            <p>
              Napięcie nominalne sterownika:{" "}
              <strong>{ifData(vData, "ctrlVoltage", "unknown")}</strong>
            </p>
            <p>
              Prąd maksymalny sterownika:{" "}
              <strong>{ifData(vData, "ctrlCurrent", "unknown")}</strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              Rodzaj silnika: <strong>pobrać z kategorii</strong>
            </p>
            <p>
              Marka silnika:{" "}
              <strong> {ifData(vData, "motor", "unknown")}</strong>
            </p>
            <p>
              Model silnika:{" "}
              <strong> {ifData(vData, "motorModel", "unknown")}</strong>
            </p>
          </>
        }
      />
      <DataTable
        style="battery"
        title="Bateria"
        col1Title="Poj. Wh"
        col1Value={`${ifData(vData, "capacityWh", "---")} Wh`}
        col2Title="Poj. Ah"
        col2Value={`${ifData(vData, "capacityAh", "---")} Ah`}
        col3Title="Konfiguracja"
        col3Value={`${ifData(vData, "batSeries", "---")}s${ifData(
          vData,
          "batParallels",
          "---"
        )}p`}
        row1={
          <>
            <p>
              Sposób montazu baterii:{" "}
              <strong>{ifData(vData, "batteryType", "unknown")}</strong>
            </p>
            <p>
              Typ akumulatora:{" "}
              <strong>{ifData(vData, "cellsType", "unknown")}</strong>
            </p>
            <p>
              Napięcie nominalne:{" "}
              <strong>{ifData(vData, "batVoltage", "unknown")}</strong>
            </p>
            <p>
              Konfiguracja pakietu:{" "}
              <strong>{`${ifData(vData, "batSeries", "---")}s${ifData(
                vData,
                "batParallels",
                "---"
              )}p`}</strong>
            </p>
          </>
        }
        row2={
          <>
            <p>
              Marka ogniwa:{" "}
              <strong>{ifData(vData, "cellsManuf", "unknown")}</strong>
            </p>
            <p>
              Pojemność Wh:{" "}
              <strong>{ifData(vData, "capacityWh", "unknown")}</strong>
            </p>
            <p>
              Model ogniwa:{" "}
              <strong>{ifData(vData, "cellsModel", "unknown")}</strong>
            </p>
            <p>
              Pojemność Ah:{" "}
              <strong>{ifData(vData, "capacityAh", "unknown")}</strong>
            </p>
          </>
        }
      />
    </div>
  );
};

export default DataTables;
