import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === "user@example.com" && password === "password") {
    const token = "dummy_token_" + Math.random().toString(36).substr(2);
    return NextResponse.json(
      { success: true, message: "Login successful", token },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
