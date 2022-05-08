import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, useEffect, useState } from 'react';

import { useStore } from 'src/store/useStore';

import styles from './SearchBar.module.scss';

let timer: ReturnType<typeof setTimeout>;

export const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const [localSearchValue, setLocalSearchValue] = useState<string>('');
  const setSearchValue = useStore((state) => state.setSearchValue);
  const searchValue = useStore((state) => state.searchValue);

  useEffect(() => {
    setLocalSearchValue(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        type='search'
        placeholder={t('hangar:search-placeholder')}
      />
    </div>
  );
};
