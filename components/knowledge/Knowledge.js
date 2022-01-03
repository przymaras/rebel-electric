import useTranslation from "next-translate/useTranslation";

function Knowledge(props) {
  const { t } = useTranslation();
  return <h1> {t("knowledge:header")} </h1>;
}

export default Knowledge;
