import * as yup from "yup";

const createProductsSchema = yup.object().shape({
  products: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          name: yup.string().lowercase().required(),
          description: yup.string().nullable().notRequired(),
          price: yup.number().positive().required(),
          available: yup.bool().default(true).optional(),
        })
        .required()
    )
    .required(),
});

const serializedCreatedProductsSchema = yup
  .array()
  .of(
    yup.object().shape({
      productUuid: yup.string().uuid().required(),
      name: yup.string().lowercase().required(),
      description: yup.string().nullable().notRequired(),
      price: yup.number().positive().required(),
      available: yup.bool(),
    })
  )
  .nullable();

export { createProductsSchema, serializedCreatedProductsSchema };
