import Head from "next/head";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { IconAcademy } from "../components/icons/IconAcademy";

import Main from "../components/rebel/Main";

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Rebel Electric</title>
        <meta name="description" content={t("common:description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  );
}

export default HomePage;
