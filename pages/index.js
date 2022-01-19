import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import { MongoClient } from "mongodb";

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
      <Home vehicles={props.vehicles} />
    </>
  );
}

export async function getStaticProps() {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  let vehicles = { vehicles: [] };

  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection("vehicles");
    vehicles = await vehiclesCollection
      .aggregate([
        {
          $project: {
            projectName: 1,
            vehicleImages: 1,
            createdAt: 1,
          },
        },
      ])
      .sort({ createdAt: -1 }) //sort from newest to oldest
      .limit(3)
      .toArray();
    client.close();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      vehicles: vehicles.map((vehicle) => ({
        ...vehicle,
        _id: vehicle._id.toString(),
      })),
    },
    revalidate: 20,
  };
}

export default HomePage;
