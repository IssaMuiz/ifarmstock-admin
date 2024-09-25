import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing enviroment varibles: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI as string;

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global.mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

const checkMongoDB = async () => {
  const client = await clientPromise;
  const db = client.db("iFarmstockDB");
  const collections = await db.collections();
  console.log(collections);
};

checkMongoDB();

export default clientPromise;
