import useTranslation from "next-translate/useTranslation";

import Recent from "./Recent";

import styles from "./RecentBox.module.css";

function RecentBox(props) {
  const { t } = useTranslation();

  return (
    <div className={styles.recentlyAdded}>
      <h2 className={`${styles.recentTitle} rebel-font`}>
        {t("home:recently-added")}
      </h2>
      <div className={styles.container}>
        {props.recentVehicles.map((vehicle) => {
          return (
            <Recent
              key={vehicle.id}
              src={vehicle.src}
              alt={vehicle.name}
              name={vehicle.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RecentBox;
