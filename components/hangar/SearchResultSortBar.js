import useTranslation from "next-translate/useTranslation";
import styles from "./SearchResultSortBar.module.css";

function SearchResultSortBar(props) {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <p>
        {t("hangar:searched-label")}: {props.found}
      </p>
      <select>
        <option>{t("hangar:sort-newest")}</option>
        <option>{t("hangar:sort-popularity")}</option>
        <option>{t("hangar:sort-likes")}</option>
        <option>{t("hangar:sort-power")}</option>
        <option>{t("hangar:sort-capacity")}</option>
      </select>
    </div>
  );
}

export default SearchResultSortBar;
