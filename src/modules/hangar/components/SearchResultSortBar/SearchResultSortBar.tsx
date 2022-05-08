import useTranslation from 'next-translate/useTranslation';

import { useStore } from 'src/store/useStore';

import styles from './SearchResultSortBar.module.scss';

interface SearchResultSortBarProps {
  found: number;
}

export const SearchResultSortBar: React.FC<SearchResultSortBarProps> = ({ found }) => {
  const { t } = useTranslation();

  const sortBy = useStore((state) => state.sortBy);
  const setSortBy = useStore((state) => state.setSortBy);

  return (
    <div className={styles.container}>
      <p>
        {t('hangar:searched-label')}: {found}
      </p>
      <select
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
        name='sortBy'
        value={sortBy}
      >
        <option value='createdAt'>{t('hangar:sort-newest')}</option>
        <option value='viewsCount'>{t('hangar:sort-popularity')}</option>
        <option value='likesCount'>{t('hangar:sort-likes')}</option>
      </select>
    </div>
  );
};
