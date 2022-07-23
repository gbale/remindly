import { User } from "@prisma/client";
import { prisma } from "..";

export enum Role {
  User = 1,
  Admin,
}

export const userModel = {
  add: async (data: User): Promise<User> => {
    const user = await prisma.user.create({ data });
    return user;
  },
  findByEmail: async (email: string): Promise<User> => {
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: async (id: string): Promise<User> => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};
