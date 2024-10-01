/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/lib/config/mongodb";
import User from "@/lib/models/auth";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";

export async function POST(req: NextRequest) {
  await connect();

  try {
    const { name, email, password } = await req.json();

    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const verificationToken = uuidv4();

    const savedUser = await new User({
      name,
      email,
      password: hashedPassword,
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
