import { PrismaClient } from "@prisma/client";
import userSeeder from "./seeder/user-seeder";
import jurusanSeeder from "./seeder/jurusan-seeder";
import semesterSeeder from "./seeder/semester-seeder";
import mataKuliahSeeder from "./seeder/mata_kuliah-seeder";
import nilaiSeeder from "./seeder/nilai-seeder";
import semesterJurusanMkSeeder from "./seeder/semesterJurusan_mk-seeder";
import krsSeeder from "./seeder/krs-seeder";
import statusKrsSeeder from "./seeder/status_krs-seeder";
import statusMhsSeeder from "./seeder/status_mhs-seeder";

const prisma = new PrismaClient();

async function main() {
  const jurusan = await jurusanSeeder(prisma);
  const statusMhs = await statusMhsSeeder(prisma);
  const user = await userSeeder(prisma, jurusan.id, statusMhs.id);
  const semester = await semesterSeeder(prisma);
  const mataKuliah = await mataKuliahSeeder(prisma);
  await semesterJurusanMkSeeder(prisma, jurusan.id, semester.id, mataKuliah.id);
  await nilaiSeeder(prisma);
  await krsSeeder(prisma, user.Mahasiswa?.id ?? "", mataKuliah.id);
  await statusKrsSeeder(prisma);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
