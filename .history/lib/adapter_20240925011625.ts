import { MongoClient } from "mongodb";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapMongoUserToAdapterUser(user: any): AdapterUser {
  return {
    id: user._id.toString(),
    name: user.name || "",
    email: user.email || "",
    emailVerified: user.emailVerified || null,
    image: user.image || null,
  };
}
export function MongoDBAdapter(clientPromise: Promise<MongoClient>): Adapter {
  return {
    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      const client = await clientPromise;
      const db = client.db();
      const newUser: AdapterUser = {
        ...user,
        id: uuidv4(),
      };

      await db.collection("users").insertOne(newUser);
      return mapMongoUserToAdapterUser(newUser);
    },
    async getUser(id: string): Promise<AdapterUser | null> {
      const client = await clientPromise;
      const db = client.db();

      const user = await db.collection("users").findOne({ id });
      return user ? mapMongoUserToAdapterUser(user) : null;
    },
  };
}
