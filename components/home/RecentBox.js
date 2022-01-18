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
        {props.vehicles.map((vehicle) => {
          console.log(vehicle.createdAt);
          return (
            <Recent
              key={vehicle._id}
              src={vehicle.vehicleImages[0]}
              alt={vehicle.projectName}
              name={vehicle.projectName}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RecentBox;
