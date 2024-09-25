/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/lib/config/mongodb";
import User from "@/lib/models/auth";
import bcrypt from "bcryptjs";
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

    const salt = await bcrypt.getSalt("10");
    const hashedPassword = await bcrypt.hash(password, salt, (err) => {
      if (err) {
        console.error("Error hashing password:", err);
      } else {
        console.log(hashedPassword);
      }
    });

    const savedUser = await new User({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "User created Succefully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
