import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please provide your fullname"],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email credential"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
