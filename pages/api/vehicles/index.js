import { MongoClient } from "mongodb";
import {
  getImageDetailsByName,
  moveImage,
} from "../../../components/tools/imageKit-functions";

async function handler(req, res) {
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;

  if (req.method === "POST") {
    try {
      let data = req.body;
      const now = new Date();
      data = { ...data, createdAt: now.toISOString() };
      //   const { title, image, address, description } = data;

      //add user authentication verification

      //verify somehow incoming data structure before submitting it to database !!!!!!!!!!!!!!!

      //copy images from temp to actual folder becouse temp will be deleted soon
      let images = data.vehicleImages;
      images = await getImageDetailsByName(images);
      images = await Promise.all(
        images.map(async (image) => await moveImage(image.filePath, "/hangar/"))
      );
      const client = await MongoClient.connect(
        `mongodb+srv://${dbUser}:${dbPass}@cluster0.wrcp7.mongodb.net/rebel-electric?retryWrites=true&w=majority`
      );
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
    const client = await MongoClient.connect(
      `mongodb+srv://${dbUser}:${dbPass}@cluster0.wrcp7.mongodb.net/rebel-electric?retryWrites=true&w=majority`
    );
    const db = client.db();
    const vehiclesCollection = db.collection("vehicles");
    const vehicles = await vehiclesCollection.find().toArray();
    client.close();

    // console.log(vehicles);

    res
      .status(200)
      .json({ message: "Here goes list of all vehicles", vehicles });
  }
}

export default handler;
