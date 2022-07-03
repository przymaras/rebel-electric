import useTranslation from 'next-translate/useTranslation';

import styles from './Description.module.scss';

interface DescriptionProps {
  description: string;
}

export const Description: React.FC<DescriptionProps> = (props) => {
  const { t } = useTranslation();
  const markupToRender = (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t('hangar:description')}</p>
      </div>
      <div className={styles.content}>
        <p>{props.description}</p>
      </div>
    </div>
  );

  return (
    <div data-testid='Description' className={styles.container}>
      {props.description && markupToRender}
    </div>
  );
};
