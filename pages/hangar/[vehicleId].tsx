import { useRouter } from "next/router";
import { Document, MongoClient, ObjectId } from "mongodb";
import { GetStaticProps, GetStaticPaths } from "next";
import { Vehicle } from "../../src/models/hangar";

import VehicleDetails from "../../src/components/hangar/VehicleDetails";

const HangarVehiclePage: React.FC<{ vehicleData: Vehicle }> = (props) => {
  const router = useRouter();
  // const { vehicleId } = router.query;
  return <VehicleDetails vehicleData={props.vehicleData} />;
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
            manufacturer: 1,
            model: 1,
            year: 1,
            wheelSize: 1,
            brakes: 1,
            mass: 1,
            vmax: 1,
            range: 1,
            controller: 1,
            ctrlVoltage: 1,
            ctrlCurrent: 1,
            motor: 1,
            motorModel: 1,
            batteryType: 1,
            cellsType: 1,
            batVoltage: 1,
            batSeries: 1,
            batParallels: 1,
            cellsManuf: 1,
            cellsModel: 1,
            capacityWh: 1,
            capacityAh: 1,
            vehicleImages: 1,
            category: 1,
            createdAt: 1,
            ownerId: 1,
          },
        },
      ])
      .toArray();
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
    },
    revalidate: 60,
  };
};

export default HangarVehiclePage;
