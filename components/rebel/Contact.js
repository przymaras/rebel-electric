import useTranslation from "next-translate/useTranslation";

function Contact(props) {
  const { t } = useTranslation();
  return <h1> {t("contact:header")} </h1>;
}

export default Contact;
