import { MongoClient } from "mongodb";
import Hangar from "../../components/hangar/Hangar";

function HangarPage(props) {
  return <Hangar vehicles={props.vehicles} />;
}

// export async function getServerSideProps() {
//   let hangarData = { vehicles: [] };
//   const url = `${process.env.API_URL}/vehicles/`;
//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(res.ok);
//     hangarData = { ...data };
//   } catch (err) {
//     console.log(err);
//   }

//   return {
//     props: {
//       hangarData,
//     },
//   };
// }

export async function getStaticProps() {
  const dbName = process.env.MONGODB_DB;
  const dbhost = process.env.MONGODB_HOST;
  const dbUser = process.env.MONGODB_USER;
  const dbPass = process.env.MONGODB_PASS;
  const connectString = `mongodb+srv://${dbUser}:${dbPass}@${dbhost}/${dbName}?retryWrites=true&w=majority`;

  let vehicles = { vehicles: [] };

  try {
    const client = await MongoClient.connect(connectString);
    const db = client.db();
    const vehiclesCollection = db.collection("vehicles");
    vehicles = await vehiclesCollection
      .aggregate([
        {
          $project: {
            ownerId: 0,
          },
        },
      ])

      .sort({ createdAt: -1 }) //sort from newest to oldest
      // .limit(3)
      .toArray();
    client.close();
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      vehicles: vehicles.map((vehicle) => ({
        ...vehicle,
        _id: vehicle._id.toString(),
      })),
    },
    revalidate: 20,
  };
}

export default HangarPage;
