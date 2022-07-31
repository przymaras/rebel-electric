import { MongoClient } from 'mongodb';
import type { GetStaticProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

import type { IVehicle } from 'src/modules/hangar/types/hangar';
import { Home } from 'src/modules/home/views/Home';

type HomePageVegiclesType = Partial<IVehicle>;
export interface HomePageProps {
  vehicles?: HomePageVegiclesType[];
}

const HomePage: React.FC<HomePageProps> = ({ vehicles }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Rebel Electric</title>
        <meta name='description' content={t('common:metaDescription')} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Home vehicles={vehicles} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  if (!dbName || !dbhost || !dbUser || !dbPass) return { props: {} };
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection('vehicles');
    const vehicles = await vehiclesCollection
      .aggregate<HomePageVegiclesType>([
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
    await client.close();

    return {
      props: {
        vehicles: vehicles?.map((vehicle) => ({
          ...vehicle,
          _id: (vehicle?._id ?? '').toString(),
        })),
      },
      revalidate: 20,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        vehicles: undefined,
      },
      revalidate: 20,
    };
  }
};

export default HomePage;
