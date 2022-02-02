import { Document, MongoClient } from "mongodb";
import { GetStaticProps } from "next";
import { ItemManufacturerObj } from "../../src/models/hangar";

import AddVehicle from "../../src/components/hangar/AddVehicle";

const HangarAddPage: React.FC<{
  controllersData: ItemManufacturerObj[];
  motorsData: ItemManufacturerObj[];
}> = (props) => {
  return (
    <AddVehicle
      controllersData={props.controllersData}
      motorsData={props.motorsData}
    />
  );
};

export const getStaticProps: GetStaticProps<{
  controllersData: Document[];
}> = async () => {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  let controllersArray: Document[] = [];
  let motorsArray: Document[] = [];

  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const controllersCollection = db.collection("controllers");
    controllersArray = await controllersCollection
      .aggregate([
        // {
        //   $project: {
        //     ownerId: 0,
        //   },
        // },
      ])

      .sort({ createdAt: -1 }) //sort from newest to oldest
      // .limit(3)
      .toArray();

    const motorsCollection = db.collection("motors");
    motorsArray = await motorsCollection
      .aggregate([
        // {
        //   $project: {
        //     ownerId: 0,
        //   },
        // },
      ])

      .sort({ createdAt: -1 }) //sort from newest to oldest
      // .limit(3)
      .toArray();
    client.close();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      controllersData: controllersArray.map((controller) => ({
        ...controller,
        _id: controller._id.toString(),
        models: controller.models.map((model: Document) => ({
          ...model,
          _id: model._id.toString(),
        })),
      })),
      motorsData: motorsArray.map((motor) => ({
        ...motor,
        _id: motor._id.toString(),
        models: motor.models.map((model: Document) => ({
          ...model,
          _id: model._id.toString(),
        })),
      })),
    },
    revalidate: 20,
  };
};

export default HangarAddPage;
