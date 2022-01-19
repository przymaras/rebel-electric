import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";

import VehicleDetails from "../../components/hangar/VehicleDetails";

function HangarVehiclePage(props) {
  const router = useRouter();
  // const { vehicleId } = router.query;
  return <VehicleDetails vehicleData={props.vehicleData} />;
}

export async function getStaticPaths() {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;
  let vehicles = [];
  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection("vehicles");
    vehicles = await vehiclesCollection
      .aggregate([{ $project: { _id: 1, createdAt: 1 } }])
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    client.close();
    console.log(vehicles);
  } catch (err) {
    console.log(err);
  }

  return {
    fallback: "blocking",
    // paths: [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
    paths: vehicles.map((vehicle) => ({
      params: { vehicleId: vehicle._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  const vehicleId = context.params.vehicleId;

  let vehicle = [{ _id: 0 }];
  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection("vehicles");
    vehicle = await vehiclesCollection
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
        ...vehicle[0],
        _id: vehicle[0]._id.toString(),
        ownerId: vehicle[0].ownerId ? vehicle[0].ownerId.toString() : "",
      },
    },
    revalidate: 60,
  };
}

export default HangarVehiclePage;
