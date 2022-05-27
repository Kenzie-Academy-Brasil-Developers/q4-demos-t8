import * as yup from "yup";

const getAllRestaurantsSchema = yup
  .array()
  .of(
    yup.object().shape({
      restaurantUuid: yup.string(),
      name: yup.string(),
      owner: yup.object().shape({
        userUuid: yup.string(),
        email: yup.string(),
      }),
    })
  )
  .required();

export default getAllRestaurantsSchema;
