import { Router } from "express";
import verifyAdmin from "../middleware/verify-admin";
import verifyUser from "../middleware/verify-user";
import { validateRequestSchema } from "../middleware/validate-request";
import getPaginateSchema from "../schema/get-paginate-validation";
import postMahasiswaSchema from "../schema/post-mahasiswa-validation";
import putMahasiswaSchema from "../schema/put-mahasiswa-validation";
import patchMahasiswaSchema from "../schema/patch-mahasiswa-validation";
import idSchema from "../schema/id-validation";
import idMahasiswaSchema from "../schema/id_mahasiswa-validation";
import { MahasiswaController } from "../controller/mahasiswaController/mahasiswaController";

const ROUTER = Router();

ROUTER.get(
  "/mahasiswa/",
  verifyAdmin,
  getPaginateSchema,
  validateRequestSchema,
  MahasiswaController.get
);

// get by id
ROUTER.get(
  "/mahasiswa/:id_mahasiswa",
  verifyUser,
  idMahasiswaSchema.schemaParam,
  validateRequestSchema,
  MahasiswaController.getById
);

ROUTER.post(
  "/mahasiswa/",
  verifyAdmin,
  postMahasiswaSchema,
  validateRequestSchema,
  MahasiswaController.post
);

ROUTER.put(
  "/mahasiswa/",
  verifyAdmin,
  putMahasiswaSchema,
  validateRequestSchema,
  MahasiswaController.put
);

ROUTER.patch(
  "/mahasiswa/",
  verifyUser,
  patchMahasiswaSchema,
  validateRequestSchema,
  MahasiswaController.patch
);

ROUTER.delete(
  "/mahasiswa",
  verifyAdmin,
  idSchema.schemaQuery,
  validateRequestSchema,
  MahasiswaController.delete
);

export default ROUTER;
