import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

import Home from "../components/home/Home";

function HomePage(props) {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Rebel Electric</title>
        <meta name="description" content={t("common:metaDescription")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home recentVehicles={props.recentVehicles} />
    </>
  );
}

export function getStaticProps() {
  const recent = [
    {
      id: 1,
      name: "pojazdator one",
      src: "https://rebel-electric.com/new/full/2079",
    },
    {
      id: 2,
      name: "pojazdator two",
      src: "https://rebel-electric.com/new/full/2076",
    },
    {
      id: 3,
      name: "pojazdator three",
      src: "https://rebel-electric.com/new/full/1517",
    },
  ];
  return {
    props: {
      recentVehicles: recent,
    },
  };
}

export default HomePage;
