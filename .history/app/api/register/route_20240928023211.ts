/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/lib/config/mongodb";
import User from "@/lib/models/auth";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

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

    const savedUser = await new User({
      name,
      email,
      password: hashedPassword,
    });

    await savedUser.save().then(() => {
      return NextResponse.json({
        message: "User created Succefully",
        success: true,
        savedUser,
      });
    });
    const isMatch = await bcryptjs.compare(password, User.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
