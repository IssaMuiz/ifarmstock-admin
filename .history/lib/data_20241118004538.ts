import User from "./models/auth";

export const fetchUser = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch User");
  }
};
