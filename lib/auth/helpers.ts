import { hash } from "bcrypt";
import { prisma } from "@/lib/db/prisma";
import { Role } from "@prisma/client";

const SALT_ROUNDS = 12;

export async function createUser(data: {
  email: string;
  password: string;
  name?: string;
  role?: Role;
}) {
  const hashedPassword = await hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: data.email.toLowerCase(),
      password: hashedPassword,
      name: data.name,
      role: data.role || "CLIENT",
    },
  });

  // Don't return password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function updatePassword(userId: string, newPassword: string) {
  const hashedPassword = await hash(newPassword, SALT_ROUNDS);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}

