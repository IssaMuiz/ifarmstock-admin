/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import User from "../../../lib/models/auth";
import { connect } from "../../../lib/config/mongodb";

export async function GET(req: NextRequest) {
  await connect();
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: "Token is required" });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Email successfully verified" });
  } catch (error: any) {
    return NextResponse.json({ message: "Internal server error", error });
  }
}
