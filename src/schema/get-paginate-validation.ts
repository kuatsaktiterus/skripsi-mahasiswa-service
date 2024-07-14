import { query } from "express-validator";

const schema = [
  query("per_page")
    .isInt({ gt: 0 })
    .withMessage("per_page must be an integer")
    .notEmpty()
    .withMessage("per_page must not be empty"),
  query("current_page")
    .isInt({ gt: 0 })
    .withMessage("current_page must be an integer")
    .notEmpty()
    .withMessage("current_page must not be empty"),
];

export default schema;
