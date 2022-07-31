import { MongoClient, ObjectId } from 'mongodb';
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
    const { vehicleId } = req.query;
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection<Omit<Partial<IVehicle>, '_id'>>('vehicles');
    if (typeof vehicleId !== 'string') return;

    const vehicle = await vehiclesCollection.findOne({ _id: new ObjectId(vehicleId) });

    const imageNames = vehicle?.vehicleImages ?? [];

    await Promise.all(
      imageNames.map((imageName) => {
        return deleteImage(imageName);
      })
    );

    const result = await vehiclesCollection.deleteOne({ _id: new ObjectId(vehicleId) });
    await client.close();
    res.status(200).json({ deleteVehicle: 'success', result });
  } catch (err) {
    let message = 'unknown error';
    if (err instanceof Error) message = err.message;
    res.status(500).json({ deleteVehicle: 'error', error: message });
  }
}

export default handler;
