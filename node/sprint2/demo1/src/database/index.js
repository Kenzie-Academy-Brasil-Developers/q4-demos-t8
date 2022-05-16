import { faker } from "@faker-js/faker";
import { hashSync } from "bcrypt";
import { v4 } from "uuid";

const _firstName = faker.name.firstName();
const _pwd = faker.datatype.string(10);

/*
/ _ no começo da variável = variável privada
/ __ no começo da variável = variável global
*/

let USERS_DB = [
  {
    uuid: v4(),
    name: _firstName,
    age: faker.random.numeric(2),
    email: faker.internet.email(_firstName).toLowerCase(),
    password: hashSync(_pwd, 10),
    isAdmin: faker.datatype.boolean()
  },
];

export default USERS_DB; // db esta sendo exportado como uma constante
