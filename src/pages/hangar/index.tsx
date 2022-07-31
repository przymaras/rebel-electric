import { MongoClient } from 'mongodb';
import type { GetStaticProps } from 'next';

import type { IVehicle } from 'src/modules/hangar/types/hangar';
import { Hangar } from 'src/modules/hangar/views/Hangar';

type HangarPageVehiclesType = Partial<IVehicle>;
export interface HangarPageProps {
  vehicles?: HangarPageVehiclesType[];
}

const HangarPage: React.FC<HangarPageProps> = ({ vehicles }) => {
  return <Hangar vehicles={vehicles} />;
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
      .aggregate<HangarPageVehiclesType>([
        {
          $project: {
            ownerId: 0,
          },
        },
      ])

      .sort({ createdAt: -1 }) //sort from newest to oldest
      .toArray();
    await client.close();

    return {
      props: {
        vehicles: vehicles?.map((vehicle) => ({
          ...vehicle,
          _id: (vehicle?._id ?? '').toString(),
          createdAt: (vehicle?.createdAt ?? '').toString(),
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
    };
  }
};

export default HangarPage;
