import useTranslation from "next-translate/useTranslation";

function Main(props) {
  const { t } = useTranslation();
  return <h1> {t("home:header")} </h1>;
}

export default Main;
