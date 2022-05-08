import useTranslation from 'next-translate/useTranslation';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  return <h1> {t('user:headerLogin')} </h1>;
};
