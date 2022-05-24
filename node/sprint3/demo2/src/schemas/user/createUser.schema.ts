import * as yup from "yup";

const createUserSchema = yup.object().shape({
  email: yup.string().email().lowercase().required(),
  isAdmin: yup.boolean().default(false).optional(),
  password: yup.string().required(),
});

const serializedCreateUserSchema = yup.object().shape({
  userUuid: yup.string().uuid().required(),
  email: yup.string().email().required(),
  isAdmin: yup.boolean().required(),
});

export { createUserSchema, serializedCreateUserSchema };
