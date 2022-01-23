import styles from "./SearchBar.module.scss";
import useTranslation from "next-translate/useTranslation";

const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <form className={styles.form}>
      <input type="search" placeholder={t("hangar:search-placeholder")} />
    </form>
  );
};

export default SearchBar;
