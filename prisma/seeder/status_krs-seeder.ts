import { PrismaClient } from "@prisma/client";

export default async (prisma: PrismaClient) => {
  const statusKrs = await prisma.statusKrs.upsert({
    where: { status: "genap" },
    update: {},
    create: {
      status: "genap",
    },
  });
  const statusKrs2 = await prisma.statusKrs.upsert({
    where: { status: "ganjil" },
    update: {},
    create: {
      status: "ganjil",
    },
  });
  const statusKrs3 = await prisma.statusKrs.upsert({
    where: { status: "pendek" },
    update: {},
    create: {
      status: "pendek",
    },
  });

  console.log(statusKrs, statusKrs2, statusKrs3);
};
