import useTranslation from 'next-translate/useTranslation';

const Login: React.FC = () => {
  const { t } = useTranslation();
  return <h1> {t('user:headerLogin')} </h1>;
};

export default Login;
