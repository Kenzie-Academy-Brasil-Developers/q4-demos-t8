import { faker } from "@faker-js/faker";
import { hashSync } from "bcrypt";
import { v4 } from "uuid";

interface IUser {
  uuid: string;
  name: string;
  age: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const _firstName = faker.name.firstName();
const _pwd = faker.datatype.string(10);

/*
/ _ no começo da variável = variável privada
/ __ no começo da variável = variável global
*/

// "1" + 1 = 2

const USERS_DB: IUser[] = [
  {
    uuid: v4(),
    name: _firstName,
    age: faker.random.numeric(2),
    email: faker.internet.email(_firstName).toLowerCase(),
    password: hashSync(_pwd, 10),
    isAdmin: faker.datatype.boolean(),
  },
];

export { USERS_DB, IUser }; // db esta sendo exportado como uma constante
