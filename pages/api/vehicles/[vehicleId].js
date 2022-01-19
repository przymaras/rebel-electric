import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  try {
    const { vehicleId } = req.query;
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection("vehicles");
    let vehicles = await vehiclesCollection
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
    res.status(200).json({ ...vehicles[0] });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export default handler;
