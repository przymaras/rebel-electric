import Head from "next/head";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { IconAcademy } from "../components/icons/IconAcademy";

import Home from "../components/rebel/Home";

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
      src: "https://rebel-electric.com/new/thumb/2079.jpg",
    },
    {
      id: 2,
      name: "pojazdator two",
      src: "https://rebel-electric.com/new/thumb/2076.jpg",
    },
    {
      id: 3,
      name: "pojazdator three",
      src: "https://rebel-electric.com/new/thumb/1517.jpg",
    },
  ];
  return {
    props: {
      recentVehicles: recent,
    },
  };
}

export default HomePage;
