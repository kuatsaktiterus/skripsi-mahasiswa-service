import { PrismaClient } from "@prisma/client";

export default async (prisma: PrismaClient) => {
  const semester1 = await prisma.semester.upsert({
    where: { semester: "1" },
    update: {},
    create: {
      semester: "1",
    },
  });

  const semester2 = await prisma.semester.upsert({
    where: { semester: "Semester Pendek" },
    update: {},
    create: {
      semester: "Semester Pendek",
    },
  });

  const semester3 = await prisma.semester.upsert({
    where: { semester: "2" },
    update: {},
    create: {
      semester: "2",
    },
  });
  console.log(semester1, semester2, semester3);
  return semester1;
};
