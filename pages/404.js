import useTranslation from "next-translate/useTranslation";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return <h1>{t("common:404notFound")}🥵</h1>;
  // return <h1>Page not found 🥵</h1>;
};

export default NotFoundPage;
