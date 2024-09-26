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

    const salt = await bcryptjs.getSalt("10");

    if (typeof password !== "string" || password.length === 0) {
      throw new Error("Password must not be a non-empty string");
    }

    const hashedPassword = await bcryptjs.hash(password, salt);
    console.log("hashed password:", hashedPassword);
    console.log("hanshed password length:", hashedPassword.length);

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
