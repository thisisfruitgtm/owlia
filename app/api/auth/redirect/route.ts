import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { redirectUrl: "/auth/login" },
        { status: 200 }
      );
    }

    if (session.user.role === "ADMIN") {
      return NextResponse.json(
        { redirectUrl: "/admin" },
        { status: 200 }
      );
    }

    if (session.user.role === "CLIENT" && session.user.clientId) {
      return NextResponse.json(
        { redirectUrl: `/client/${session.user.clientId}` },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { redirectUrl: "/" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Redirect error:", error);
    return NextResponse.json(
      { redirectUrl: "/auth/login" },
      { status: 200 }
    );
  }
}

