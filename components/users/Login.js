import useTranslation from "next-translate/useTranslation";

function Login(props) {
  const { t } = useTranslation();
  return <h1> {t("user:headerLogin")} </h1>;
}

export default Login;
