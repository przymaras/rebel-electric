import { MongoClient, ObjectId } from 'mongodb';
import { GetStaticProps, GetStaticPaths } from 'next';

import { Vehicle, ItemManufacturerObj } from 'src/modules/hangar/types/hangar';
import { VehicleDetails } from 'src/modules/hangar/views/VehicleDetails';

const HangarVehiclePage: React.FC<{
  vehicleData: Vehicle;
  controllersData: ItemManufacturerObj[];
  motorsData: ItemManufacturerObj[];
}> = (props) => {
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
  if (!dbName || !dbhost || !dbUser || !dbPass) return { paths: [], fallback: false };
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  let vehiclesArray: Vehicle[] = [];

  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection('vehicles');
    vehiclesArray = (await vehiclesCollection
      .aggregate([{ $project: { _id: 1, createdAt: 1 } }])
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray()) as Vehicle[];

    await client.close();
    console.log(vehiclesArray);
  } catch (err) {
    console.log(err);
  }

  return {
    fallback: 'blocking',
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
  if (!dbName || !dbhost || !dbUser || !dbPass) return { props: {} };
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  const vehicleId = context.params?.vehicleId;

  let vehiclesArray: Vehicle[] = [];
  let controllersArray: ItemManufacturerObj[] = [];
  let motorsArray: ItemManufacturerObj[] = [];

  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    if (typeof vehicleId !== 'string') return { props: {} };
    const vehiclesCollection = db.collection('vehicles');
    vehiclesArray = (await vehiclesCollection
      .aggregate([
        {
          $match: {
            _id: new ObjectId(`${vehicleId}`),
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'ownerId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                {
                  $arrayElemAt: ['$user', 0],
                },
                '$$ROOT',
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
            batVoltageOther: 1,
            capacity: 1,
            capacityUnit: 1,
            vehicleImages: 1,
            category: 1,
            createdAt: 1,
            ownerId: 1,
            totalCost: 1,
            totalCostCurrency: 1,
            likesCount: 1,
            viewsCount: 1,
          },
        },
      ])
      .toArray()) as Vehicle[];

    const controllersCollection = db.collection('controllers');
    controllersArray = (await controllersCollection
      .aggregate([])
      .toArray()) as ItemManufacturerObj[];

    const motorsCollection = db.collection('motors');
    motorsArray = (await motorsCollection.aggregate([]).toArray()) as ItemManufacturerObj[];

    await client.close();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      vehicleData: {
        ...vehiclesArray[0],
        _id: vehiclesArray[0]._id.toString(),
        ownerId: vehiclesArray[0].ownerId ? vehiclesArray[0].ownerId.toString() : '',
      },
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
    revalidate: 60,
  };
};

export default HangarVehiclePage;
