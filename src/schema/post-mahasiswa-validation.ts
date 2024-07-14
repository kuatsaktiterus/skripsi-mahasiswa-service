import { body } from "express-validator";

const schema = [
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
  body("id_status")
    .isString()
    .withMessage("id_status must be an string")
    .notEmpty()
    .withMessage("id_status must not be empty"),
  body("id_jurusan")
    .isString()
    .withMessage("id_jurusan must be an string")
    .notEmpty()
    .withMessage("id_jurusan must not be empty"),
  body("id_semester")
    .isString()
    .withMessage("id_semester must be an string")
    .notEmpty()
    .withMessage("id_semester must not be empty"),
  body("email")
    .isEmail()
    .withMessage("not an email")
    .notEmpty()
    .withMessage("email must not be empty"),
];

export default schema;
