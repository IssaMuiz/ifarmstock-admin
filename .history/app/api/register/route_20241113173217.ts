/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/config/mongodb";
import User from "@/lib/models/auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    const verificationToken = uuidv4();

    const savedUser = new User({
      name,
      email,
      password,
      isVerified: false,
      verificationToken,
      verificationTokenExpiry: Date.now() + 3600000,
    });

    await savedUser.save();

    await sendVerificationEmail(email, verificationToken);
    return NextResponse.json({
      message: "Registration Successful! Check your email for verification",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
