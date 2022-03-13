import useTranslation from 'next-translate/useTranslation';

const Knowledge: React.FC = () => {
  const { t } = useTranslation();
  return <h1> {t('knowledge:header')} </h1>;
};

export default Knowledge;
