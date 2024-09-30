/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "../../../lib/models/auth";
import { connect } from "../../../lib/config/mongodb";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connect();

  try {
    const { token, newPassword, confirmPassword } = await req.json();

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      resetToken: token,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 404 }
      );
    }

    const currentTime = Date.now();
    if (user.tokenExpiry < currentTime) {
      return NextResponse.json({ error: "Token has expired" }, { status: 403 });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
