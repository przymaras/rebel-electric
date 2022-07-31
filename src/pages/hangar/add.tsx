import { MongoClient } from 'mongodb';
import { GetStaticProps } from 'next';

import { ItemManufacturer } from 'src/modules/hangar/types/hangar';
import { AddVehicle } from 'src/modules/hangar/views/AddVehicle';

const HangarAddPage: React.FC<{
  controllersData: ItemManufacturer[];
  motorsData: ItemManufacturer[];
}> = (props) => {
  return <AddVehicle controllersData={props.controllersData} motorsData={props.motorsData} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;

  if (!dbName || !dbhost || !dbUser || !dbPass) return { props: {} };
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  let controllersArray: ItemManufacturer[] = [];
  let motorsArray: ItemManufacturer[] = [];

  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();

    const controllersCollection = db.collection('controllers');
    controllersArray = (await controllersCollection.aggregate([]).toArray()) as ItemManufacturer[];

    const motorsCollection = db.collection('motors');
    motorsArray = (await motorsCollection.aggregate([]).toArray()) as ItemManufacturer[];

    await client.close();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      controllersData: controllersArray.map((controller) => ({
        ...controller,
        _id: controller._id.toString(),
        models: controller.models.map((model) => ({
          ...model,
          _id: model._id.toString(),
        })),
      })),
      motorsData: motorsArray.map((motor) => ({
        ...motor,
        _id: motor._id.toString(),
        models: motor.models.map((model) => ({
          ...model,
          _id: model._id.toString(),
        })),
      })),
    },
    revalidate: 20,
  };
};

export default HangarAddPage;
