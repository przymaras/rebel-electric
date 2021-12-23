import useTranslation from "next-translate/useTranslation";

function NotFoundPage() {
  const { t } = useTranslation();
  return <h1>{t("common:404notFound")}🥵</h1>;
}

export default NotFoundPage;
