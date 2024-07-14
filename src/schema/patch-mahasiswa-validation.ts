import { body } from "express-validator";

const schema = [
  body("id_mahasiswa")
    .isString()
    .withMessage("id must be a string")
    .notEmpty()
    .withMessage("id must not be empty"),
  body("email")
    .isEmail()
    .withMessage("not an email")
    .notEmpty()
    .withMessage("email must not be empty"),
  /**
   * defaults to
   * {
   *    minLength: 8,
   *    minLowercase: 1,
   *    minUppercase: 1,
   *    minNumbers: 1,
   *    minSymbols: 1,
   *    returnScore: false,
   *    pointsPerUnique: 1,
   *    pointsPerRepeat: 0.5,
   *    pointsForContainingLower: 10,
   *    pointsForContainingUpper: 10,
   *    pointsForContainingNumber: 10,
   *    pointsForContainingSymbol: 10
   * }
   */
  body("new_password")
    .optional()
    .isStrongPassword()
    .withMessage(
      "new password must be a string, at least 8 characters long, and contain at least an uppercase, a lowercase, a number, and a symbol"
    )
    .notEmpty()
    .withMessage("new password must not be empty"),
  body("confirm_password")
    .optional()
    .isString()
    .withMessage("confirm_password must be a string")
    .notEmpty()
    .withMessage("confirm_password must not be empty"),
];

export default schema;
