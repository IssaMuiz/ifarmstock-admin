import User from "../../../lib/models/auth";
import { connect } from "../../../lib/config/mongodb";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  await connect();

  try {
    const { token, password } = await req.json();

    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    await user.save();
    return NextResponse.json({ message: "Password reset successful" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
