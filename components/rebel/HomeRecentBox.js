import HomeRecent from "./HomeRecent";
import styles from "./HomeRecentBox.module.css";
import useTranslation from "next-translate/useTranslation";

function HomeRecentBox(props) {
  const { t } = useTranslation();

  return (
    <div className={styles.recentlyAdded}>
      <h2 className={`${styles.recentTitle} rebel-font`}>
        {t("home:recently-added")}
      </h2>
      <div className={styles.container}>
        {props.recentVehicles.map((vehicle) => {
          return (
            <HomeRecent
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

export default HomeRecentBox;
