import mongoose, { Schema, Document, Model} from "mongoose";
import bcryptjs from 'bcryptjs'


export interface IUser extends Document {
  name: string
  email: string
  password: string
  resetToken?: string
  tokenExpiry?: Date

  comparePassword(candidatePassword: string): Promise<boolean>
  generateResetToken(): Promise<string>

}

const userSchema: Schema<IUser> = new mongoose.Schema({
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
// hash password before saving
userSchema.pre('save', async function(next)){
  if (!this.isModified('password'))
    return next()
  const salt = await bcryptjs.genSalt(10)
  this.password = await bcryptjs.hash(this.password, salt)
  next()
}

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcryptjs.compare(candidatePassword, this.password)
}

// method to generate reset token
userSchema.method.generateResetToken = async function (): Promise<string> {
  const token = crypto.randomBytes(20).toString('hex')
  this.resetToken = token
  this.tokenExpiry = new Date(Date.now() + 36000000)
  await this.save()
  return token
}


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User, userSchema)

export default User