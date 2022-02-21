import styles from "./SearchBar.module.scss";
import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, useState } from "react";

interface SearchBar {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

let timer: ReturnType<typeof setTimeout>;

const SearchBar: React.FC<SearchBar> = ({ setSearchValue }) => {
  const { t } = useTranslation();
  const [localSearchValue, setLocalSearchValue] = useState<string>("");

  const updateSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value);

    clearTimeout(timer);

    timer = setTimeout(() => {
      setSearchValue(e.target.value);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <input
        onChange={updateSearchValue}
        value={localSearchValue}
        type="search"
        placeholder={t("hangar:search-placeholder")}
      />
    </div>
  );
};

export default SearchBar;
