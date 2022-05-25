import * as yup from "yup";

const createAddressSchema = yup.object().shape({
  street: yup.string().required(),
  houseNumber: yup.number().positive().required(),
  city: yup.string().required(),
});

const serializedCreateAddressSchema = yup.object().shape({
  addressUuid: yup.string().uuid().required(),
  street: yup.string().required(),
  houseNumber: yup.number().positive().required(),
  city: yup.string().required(),
  user: yup.object().shape({
    userUuid: yup.string().uuid().required(),
    email: yup.string().email().required(),
    isAdmin: yup.bool().required(),
  }),
});

export { createAddressSchema, serializedCreateAddressSchema };
