import useTranslation from "next-translate/useTranslation";
import React from "react";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  return <h1> {t("contact:header")} </h1>;
};

export default Contact;
