import mongoose from "mongoose";
import Products from "@/lib/models/product";

const MONGODB_URI =
  "mongodb+srv://muizbabatunde:Muiztun1%23@issamuizcluster.i3zv3ar.mongodb.net/ifarmstockDB?retryWrites=true&w=majority&appName=IssamuizCluster";

const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to DB");
    }
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

const fetchProductById = async (id: string) => {
  try {
    const product = await Products.findById(id);
    if (!product) {
      console.log("Product not found");
    } else {
      console.log("Product fetched successfully:", product);
    }
  } catch (error) {
    console.error("Error fetching products", error);
  }
};

(async () => {
  await connectToDB();

  const productId = "670c42c795ebe1222d251fc2";

  await fetchProductById(productId);

  mongoose.connection.close();
})();
