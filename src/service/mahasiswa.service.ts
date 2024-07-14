import { Response, Request } from "express";
import { prisma } from "../lib/prisma-client";
import { Mahasiswa } from "@prisma/client";
import { MahasiswaResponse, Paging } from "../../src/controller/controller";
import * as bcryptjs from "bcryptjs";

export class MahasiswaService {
  static async get(req: Request): Promise<[MahasiswaResponse[], Paging]> {
    const { current_page = 1, per_page = 2 } = req.query;

    const [totalMhs, mahasiswa] = await prisma.$transaction([
      prisma.mahasiswa.count(),
      prisma.mahasiswa.findMany({
        skip: Number(per_page) * (Number(current_page) - 1),
        take: Number(per_page),
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const resultMhs = mahasiswa.map(_ => this.toMahasiswaResponse(_));
    const paging = this.toPaging(current_page, per_page, totalMhs);

    return [resultMhs, {
      meta: paging
    }]

  }

  static toPaging(current_page: any, per_page: any, totalMhs: number) {
    return {
      current_page: current_page,
      last_page: Math.ceil(Number(totalMhs) / Number(per_page)),
      per_page: per_page,
      total: totalMhs,
    }
  }

  static async getById(req: Request): Promise<MahasiswaResponse> {
    const { id_mahasiswa } = req.params;
    const data = await prisma.mahasiswa.findUniqueOrThrow({
      where: {
        id: id_mahasiswa,
      },
    });
    if (!data) throw new Error("404");
    return this.toMahasiswaResponse(data)
  }

  static async post(req: Request): Promise<MahasiswaResponse> {
    let { nim, nama, id_jurusan, email, id_status, id_semester } = req.body;
    let hash = await bcryptjs.hash(nim, 8);
    let data = await prisma.mahasiswa.create({
      data: {
        nim,
        nama,
        email,
        semester: {
          connect: {
            id: id_semester,
          },
        },
        status: {
          connect: {
            id: id_status,
          },
        },
        jurusan: {
          connect: {
            id: id_jurusan,
          },
        },
        user: {
          create: {
            username: nim,
            password: hash,
            role: "USER",
          },
        },
      },
    });
    return data;
  }


  static async put(req: Request): Promise<MahasiswaResponse> {
    let {
      id,
      nim,
      nama,
      status_pembayaran,
      id_jurusan,
      email,
      id_semester,
      id_status,
    } = req.body;

    let data = await prisma.mahasiswa.update({
      where: {
        id,
      },
      data: {
        nim,
        nama,
        email,
        statusPembayaranSemester: status_pembayaran,
        semester: {
          connect: {
            id: id_semester,
          },
        },
        status: {
          connect: {
            id: id_status,
          },
        },
        jurusan: {
          connect: {
            id: id_jurusan,
          },
        },
      },
    });
    return data;
  }

  static async patch(req: Request, res: Response): Promise<MahasiswaResponse> {
    let { id_mahasiswa, email, new_password, confirm_password } = req.body;

    let data = await prisma.mahasiswa.findUniqueOrThrow({
      where: {
        id: id_mahasiswa,
      },
      include: {
        user: true,
      },
    });

    if (new_password) {
      let validatePassword = await bcryptjs.compare(
        confirm_password,
        data.user.password,
      );

      if (!validatePassword) {
        throw new Error("password");
      }

      let hash = await bcryptjs.hash(new_password, 8);
      return await prisma.mahasiswa.update({
        where: {
          id: id_mahasiswa,
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
    }

    return await prisma.mahasiswa.update({
      where: {
        id: id_mahasiswa,
      },
      data: {
        email,
      },
    });
  }

  static async delete(req: Request) {
    let { id } = req.query;
    await prisma.mahasiswa.delete({
      where: {
        id: String(id),
      },
    });
  }


  static toMahasiswaResponse(mahasiswa: Mahasiswa): MahasiswaResponse {
    return {
      id: mahasiswa.id,
      nim: mahasiswa.nim,
      nama: mahasiswa.nama,
      email: mahasiswa.email,
      jurusanId: mahasiswa.jurusanId,
      semesterId: mahasiswa.semesterId,
      statusId: mahasiswa.statusId,
      statusPembayaranSemester: mahasiswa.statusPembayaranSemester,
      userId: mahasiswa.userId,
      createdAt: mahasiswa.createdAt,
      updatedAt: mahasiswa.updatedAt,
    }
  }
}

