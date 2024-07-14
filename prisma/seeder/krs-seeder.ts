import { PrismaClient } from "@prisma/client";

export default async (
  prisma: PrismaClient,
  mahasiswa: string,
  mataKuliah: string
) => {
  const krs = await prisma.krs.upsert({
    where: { id: "1" },
    update: {},
    create: {
      mahasiswaId: mahasiswa,
      mataKuliahId: mataKuliah,
    },
  });

  console.log(krs);
};
