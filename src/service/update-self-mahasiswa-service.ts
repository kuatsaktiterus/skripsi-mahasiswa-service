import { PrismaClient } from "@prisma/client";

const service = {
  update: async (prisma: PrismaClient, id: string, email: string) => {
    return await prisma.mahasiswa.update({
      where: {
        id: id,
      },
      data: {
        email,
      },
    });
  },

  updatePassword: async (
    prisma: PrismaClient,
    id: string,
    email: string,
    hash: string
  ) => {
    return await prisma.mahasiswa.update({
      where: {
        id: id,
      },
      data: {
        email,
        user: {
          update: {
            password: hash,
          },
        },
      },
    });
  },
};

export default service;
