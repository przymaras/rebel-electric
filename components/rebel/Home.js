import useTranslation from "next-translate/useTranslation";

function Home(props) {
  const { t } = useTranslation();
  return (
    <>
      <h1> {t("home:header")} </h1>
      <h1> {t("home:header")} </h1>
      <h1> {t("home:header")} </h1>
      <h1> {t("home:header")} </h1>
      <h1> {t("home:header")} </h1>
      <h1> {t("home:header")} </h1>
      <h1> {t("home:header")} </h1>
      <h1> {t("home:header")} </h1>
      <h1> {t("home:header")} </h1>
      <h1> {t("home:header")} </h1>
      <h1> {t("home:header")} </h1>
    </>
  );
}

export default Home;
