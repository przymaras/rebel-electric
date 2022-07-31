import { MongoClient } from 'mongodb';
import { GetStaticProps } from 'next';

import { ItemManufacturer } from 'src/modules/hangar/types/hangar';
import { AddVehicle } from 'src/modules/hangar/views/AddVehicle';

type HangarAddPageItem = Partial<ItemManufacturer>;
export interface HangarAddPageProps {
  controllers?: HangarAddPageItem[];
  motors?: HangarAddPageItem[];
}

const HangarAddPage: React.FC<HangarAddPageProps> = ({ controllers, motors }) => {
  return <AddVehicle controllers={controllers} motors={motors} />;
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

    const controllersCollection = db.collection('controllers');
    const controllers = await controllersCollection.aggregate<HangarAddPageItem>([]).toArray();

    const motorsCollection = db.collection('motors');
    const motors = await motorsCollection.aggregate<HangarAddPageItem>([]).toArray();

    await client.close();

    return {
      props: {
        controllers: controllers.map((controller) => ({
          ...controller,
          _id: (controller?._id ?? '').toString(),
          models: (controller?.models ?? []).map((model) => ({
            ...model,
            _id: model?._id.toString(),
          })),
        })),
        motors: motors.map((motor) => ({
          ...motor,
          _id: (motor?._id ?? '').toString(),
          models: (motor?.models ?? []).map((model) => ({
            ...model,
            _id: model?._id.toString(),
          })),
        })),
      },
      revalidate: 20,
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        controllers: undefined,
        motors: undefined,
      },
      revalidate: 20,
    };
  }
};

export default HangarAddPage;
