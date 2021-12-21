import useTranslation from "next-translate/useTranslation";

function Hangar(props) {
  const { t } = useTranslation();
  return <h1> {t("hangar:header")} </h1>;
}

export default Hangar;
