import { MongoClient, ObjectId } from "mongodb";
import {
  getImageDetailsByName,
  moveImage,
} from "../../../components/tools/imageKit-functions";

async function handler(req, res) {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  if (req.method === "POST") {
    try {
      let data = req.body;
      const now = new Date();
      data = {
        ...data,
        createdAt: now.toISOString(),
        ownerId: ObjectId("61e6b8ba4be8810e0ae949c8"), //temporary add default user (me)
      };
      //   const { title, image, address, description } = data;

      //add user authentication verification

      //verify somehow incoming data structure before submitting it to database !!!!!!!!!!!!!!!

      //copy images from temp to actual folder because temp will be deleted soon
      let images = data.vehicleImages;
      images = await getImageDetailsByName(images);
      images = await Promise.all(
        images.map(async (image) => await moveImage(image.filePath, "/hangar/"))
      );
      const client = await MongoClient.connect(connectString);
      const db = client.db();
      const vehiclesCollection = db.collection("vehicles");
      const result = await vehiclesCollection.insertOne(data);

      //   console.log(result);

      client.close();

      return res.status(201).json({ message: "Vehicle inserted", result });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else if (req.method === "GET") {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection("vehicles");
    let vehicles = await vehiclesCollection
      .find()
      .sort({ createdAt: -1 }) //sort from newest to oldest
      .toArray();
    client.close();
    // console.log(vehicles);
    const length = vehicles.length;
    res.status(200).json({ message: "All vehicles", vehicles, lenght: length });
  }
}

export default handler;
