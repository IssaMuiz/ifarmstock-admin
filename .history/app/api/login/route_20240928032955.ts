/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/lib/config/mongodb";
import User from "@/lib/models/auth";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connect();

  try {
    const { email, password } = await req.json();

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const isMatch = await bcryptjs.compare(password, userExist.password);
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
