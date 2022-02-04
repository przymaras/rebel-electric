import { useRouter } from "next/router";
import { Document, MongoClient, ObjectId } from "mongodb";
import { GetStaticProps, GetStaticPaths } from "next";
import { Vehicle } from "../../src/models/hangar";
import { ItemManufacturerObj } from "../../src/models/hangar";

import VehicleDetails from "../../src/components/hangar/VehicleDetails";

const HangarVehiclePage: React.FC<{
  vehicleData: Vehicle;
  controllersData: ItemManufacturerObj[];
  motorsData: ItemManufacturerObj[];
}> = (props) => {
  const router = useRouter();
  // const { vehicleId } = router.query;
  return (
    <VehicleDetails
      vehicleData={props.vehicleData}
      controllersData={props.controllersData}
      motorsData={props.motorsData}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  let vehiclesArray: Document[] = [];

  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection("vehicles");
    vehiclesArray = await vehiclesCollection
      .aggregate([{ $project: { _id: 1, createdAt: 1 } }])
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    client.close();
    console.log(vehiclesArray);
  } catch (err) {
    console.log(err);
  }

  return {
    fallback: "blocking",
    // paths: [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
    paths: vehiclesArray.map((vehicle) => ({
      params: { vehicleId: vehicle._id.toString() },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  const vehicleId = context.params!.vehicleId;

  let vehiclesArray: Document[] = [{ _id: 0 }];
  let controllersArray: Document[] = [];
  let motorsArray: Document[] = [];

  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection("vehicles");
    vehiclesArray = await vehiclesCollection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(`${vehicleId}`),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "ownerId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  $arrayElemAt: ["$user", 0],
                },
                "$$ROOT",
              ],
            },
          },
        },
        {
          $project: {
            userName: 1,
            firstName: 1,
            city: 1,
            country: 1,
            location: 1,
            description: 1,
            avatarImage: 1,
            projectName: 1,
            video: 1,
            bikeBase: 1,
            wheelSize: 1,
            wheelOther: 1,
            brakes: 1,
            brakesOther: 1,
            mass: 1,
            massUnit: 1,
            vmax: 1,
            vmaxUnit: 1,
            range: 1,
            rangeUnit: 1,
            ctrlManuf: 1,
            ctrlManufOther: 1,
            ctrlModel: 1,
            ctrlModelOther: 1,
            ctrlVoltage: 1,
            ctrlCurrent: 1,
            motorManuf: 1,
            motorManufOther: 1,
            motorModel: 1,
            motorModelOther: 1,
            batteryCase: 1,
            batteryCaseOther: 1,
            cellsType: 1,
            cellsTypeOther: 1,
            batVoltage: 1,
            capacity: 1,
            capacityUnit: 1,
            vehicleImages: 1,
            category: 1,
            createdAt: 1,
            ownerId: 1,
            totalCost: 1,
            totalCostCurrency: 1,
          },
        },
      ])
      .toArray();

    const controllersCollection = db.collection("controllers");
    controllersArray = await controllersCollection.aggregate([]).toArray();

    const motorsCollection = db.collection("motors");
    motorsArray = await motorsCollection.aggregate([]).toArray();

    client.close();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      vehicleData: {
        ...vehiclesArray[0],
        _id: vehiclesArray[0]._id.toString(),
        ownerId: vehiclesArray[0].ownerId
          ? vehiclesArray[0].ownerId.toString()
          : "",
      },
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
    revalidate: 60,
  };
};

export default HangarVehiclePage;
