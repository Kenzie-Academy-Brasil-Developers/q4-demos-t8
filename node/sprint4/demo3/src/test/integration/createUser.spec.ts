import supertest from "supertest";
import { Connection, generateUser } from "..";
import app from "../../app";
import { User } from "../../entities";
import { validate } from "uuid";

describe("Create user route | Integration Test", () => {
  const dbConnection = new Connection();

  beforeAll(async () => {
    await dbConnection.create();
  });

  afterAll(async () => {
    await dbConnection.clear();
    await dbConnection.close();
  });

  afterEach(async () => {
    await dbConnection.clear();
  });

  it("Return: User as JSON response | Status code: 201", async () => {
    const user: Partial<User> = {
      email: "email@test.com",
      password: "1234",
    };

    const response = await supertest(app)
      .post("/register")
      .send({ ...user });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toStrictEqual(user.email);
    expect(validate(response.body.userUuid)).toBeTruthy();
  });

  it("Return: Body error, missing password | Status code: 400", async () => {
    const { password, ...user } = generateUser();
    const response = await supertest(app)
      .post("/register")
      .send({ ...user });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toStrictEqual({
      message: ["password is a required field"],
    });
  });
});
