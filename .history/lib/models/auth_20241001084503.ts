import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
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
  resetToken: {
    type: String,
  },
  tokenExpiry: {
    type: Date,
  },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpiry: { type: Date },
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
