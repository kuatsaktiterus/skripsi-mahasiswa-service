import { body } from "express-validator";

const schema = [
  body("id")
    .isString()
    .withMessage("id must be a string")
    .notEmpty()
    .withMessage("id must not be empty"),
  body("nim")
    .isString()
    .withMessage("nim must be a string")
    .notEmpty()
    .withMessage("nim must not be empty"),
  body("nama")
    .isString()
    .withMessage("nama must be a string")
    .notEmpty()
    .withMessage("nama must not be empty"),
  body("email")
    .isEmail()
    .withMessage("not an email")
    .notEmpty()
    .withMessage("email must not be empty"),
  body("status_pembayaran")
    .isBoolean({ strict: true })
    .withMessage("status_pembayaran must be a boolean")
    .notEmpty()
    .withMessage("status_pembayaran must not be empty"),
  body("id_semester")
    .isString()
    .withMessage("id_semester must be an string")
    .notEmpty()
    .withMessage("id_semester must not be empty"),
  body("id_status")
    .isString()
    .withMessage("status must be a string")
    .notEmpty()
    .withMessage("status must not be empty"),
  body("id_jurusan")
    .isString()
    .withMessage("id_jurusan must be an string")
    .notEmpty()
    .withMessage("id_jurusan must not be empty"),
];

export default schema;
