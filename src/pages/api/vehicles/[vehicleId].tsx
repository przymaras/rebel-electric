import { MongoClient, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { IVehicle } from 'src/modules/hangar/types/hangar';
import type { IUser } from 'src/modules/user/types/user';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  if (!dbName || !dbhost || !dbUser || !dbPass) return;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  try {
    const { vehicleId } = req.query;
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection('vehicles');
    if (typeof vehicleId !== 'string') return;
    const vehicles = await vehiclesCollection
      .aggregate<Partial<IVehicle & IUser>>([
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
      .toArray();
    await client.close();
    res.status(200).json({ ...vehicles[0] });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export default handler;
