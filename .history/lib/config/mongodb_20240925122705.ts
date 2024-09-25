import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
      console.log(process.env.MONGODB_URI);
    });

    mongoose.connection.on("error", (err) => {
      console.log(`MongoBD ${err}`);
      process.exit();
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
  }
}
