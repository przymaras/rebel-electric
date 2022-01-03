import DataTable from "./DataTable";
import styles from "./DataTables.module.css";

function DataTables(props) {
  return (
    <div className={styles.container}>
      <DataTable style="base" />
      <DataTable style="electrical" />
      <DataTable style="battery" />
    </div>
  );
}

export default DataTables;
