import * as yup from "yup";

const createRestaurantSchema = yup.object().shape({
  name: yup.string().required(),
});

const serializedCreatedRestaurant = yup.object().shape({
  restaurantUuid: yup.string().uuid().required(),
  name: yup.string().required(),
  owner: yup.object().shape({
    userUuid: yup.string().required(),
    email: yup.string().email().required(),
    isAdmin: yup.bool().required(),
  }),
});

export { createRestaurantSchema, serializedCreatedRestaurant };
