import { query, param } from "express-validator";

const schemaQuery = [
  query("id_mahasiswa")
    .isString()
    .withMessage("id_mahasiswa must be an integer")
    .notEmpty()
    .withMessage("id_mahasiswa must not be empty"),
];

const schemaParam = [
  param("id_mahasiswa")
    .isString()
    .withMessage("id_mahasiswa must be an integer")
    .notEmpty()
    .withMessage("id_mahasiswa must not be empty"),
];

export default { schemaQuery, schemaParam };
