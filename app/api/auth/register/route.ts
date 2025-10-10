import { NextResponse } from "next/server";
import { createUser } from "@/lib/auth/helpers";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Email invalid"),
  password: z.string().min(8, "Parola trebuie să aibă minim 8 caractere"),
  name: z.string().min(2, "Numele trebuie să aibă minim 2 caractere"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilizator cu acest email există deja" },
        { status: 400 }
      );
    }

    // Create user
    const user = await createUser({
      email: validatedData.email,
      password: validatedData.password,
      name: validatedData.name,
      role: "CLIENT",
    });

    return NextResponse.json(
      { message: "Cont creat cu succes", user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "A apărut o eroare la înregistrare" },
      { status: 500 }
    );
  }
}

