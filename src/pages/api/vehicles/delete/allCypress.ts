import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { IVehicle } from 'src/modules/hangar/types/hangar';
import { deleteImage } from 'src/utils/imageKit-functions';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  if (!dbName || !dbhost || !dbUser || !dbPass) return;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection<Omit<IVehicle, '_id'>>('vehicles');

    const vehicles = await vehiclesCollection
      .find({
        projectName: 'CypressProject',
      })
      .toArray();
    const imageNames: string[] = [];
    vehicles.forEach((vehicle) =>
      vehicle.vehicleImages.forEach((imageName) => imageNames.push(imageName))
    );

    await Promise.all(
      imageNames.map((imageName) => {
        return deleteImage(imageName);
      })
    );

    const result = await vehiclesCollection.deleteMany({
      projectName: 'CypressProject',
    });

    await client.close();
    res.status(200).json({ deleteAllCypress: 'success', result });
  } catch (err) {
    let message = 'unknown error';
    if (err instanceof Error) message = err.message;
    res.status(500).json({ deleteAllCypress: 'error', error: message });
  }
}

export default handler;
