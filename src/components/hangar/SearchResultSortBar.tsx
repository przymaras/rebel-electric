import useTranslation from "next-translate/useTranslation";
import styles from "./SearchResultSortBar.module.scss";

interface SearchResultSortBarProps {
  found: number;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResultSortBar: React.FC<SearchResultSortBarProps> = ({
  found,
  sortBy,
  setSortBy,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <p>
        {t("hangar:searched-label")}: {found}
      </p>
      <select
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
        name="sortBy"
        value={sortBy}
      >
        <option value="createdAt">{t("hangar:sort-newest")}</option>
        <option value="viewsCount">{t("hangar:sort-popularity")}</option>
        <option value="likesCount">{t("hangar:sort-likes")}</option>
      </select>
    </div>
  );
};

export default SearchResultSortBar;
