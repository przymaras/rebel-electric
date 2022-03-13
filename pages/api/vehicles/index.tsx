import { MongoClient, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { AddEbikeValues } from 'src/models/hangar';

import { getImageDetailsByName, moveImage } from '../../../src/utils/imageKit-functions';

interface ExtendedAddEbikeValues extends AddEbikeValues {
  createdAt: string;
  ownerId: ObjectId;
}
interface ExtendedNextApiRequest extends NextApiRequest {
  body: ExtendedAddEbikeValues;
  //FIXME: This method of extending in not suggested https://stackoverflow.com/questions/69893369/how-to-add-typescript-types-to-request-body-in-next-js-api-route
}

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  if (!dbName || !dbhost || !dbUser || !dbPass) return;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  if (req.method === 'POST') {
    try {
      let data = req.body;
      const now = new Date();
      data = {
        //TODO: add TS model to incoming data
        ...data,
        createdAt: now.toISOString(),
        ownerId: new ObjectId('61e6b8ba4be8810e0ae949c8'), //temporary add default user (me)
      };
      //   const { title, image, address, description } = data;

      //TODO: add user authentication verification

      //TODO: verify somehow incoming data structure before submitting it to database !!!!!!!!!!!!!!!

      //copy images from temp to actual folder because temp will be deleted soon

      const images = await getImageDetailsByName(data.vehicleImages);
      await Promise.all(
        images.map(async (image: { filePath: string }) => moveImage(image.filePath, '/hangar/'))
      );
      const client = await MongoClient.connect(connectString);
      const db = client.db();
      const vehiclesCollection = db.collection('vehicles');
      const result = await vehiclesCollection.insertOne(data);

      await client.close();

      return res.status(201).json({ message: 'Vehicle inserted', result });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  } else if (req.method === 'GET') {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection('vehicles');
    const vehicles = await vehiclesCollection
      .find()
      .sort({ createdAt: -1 }) //sort from newest to oldest
      .toArray();
    await client.close();
    // console.log(vehicles);
    const length = vehicles.length;
    return res.status(200).json({ message: 'All vehicles', vehicles, lenght: length });
  }
}

export default handler;
