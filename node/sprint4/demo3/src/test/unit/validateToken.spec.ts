import { validateToken } from "../../middlewares";
import { config } from "dotenv";
import { ErrorHandler } from "../../errors";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";

config();

describe("validateToken Middleware Tests", () => {
  const mockReq: Partial<Request> = {};
  const _: Partial<Response> = {};
  const nextFunc: NextFunction = jest.fn();

  it("Error: Missing authorization token. | Status code: 400", async () => {
    mockReq.headers = {};

    try {
      validateToken(mockReq as Request, _ as Response, nextFunc);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe("Missing authorization token.");
      expect(error.statusCode).toBe(400);
    }
  });

  it("Error: jwt malformed | Status code: 401", () => {
    mockReq.headers = {
      authorization: "Token asejui4hui1213s",
    };

    try {
      validateToken(mockReq as Request, _ as Response, nextFunc);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorHandler);
      expect(error.message).toBe("jwt malformed");
      expect(error.statusCode).toBe(401);
    }
  });

  it("Will call next function and add 'decoded' key on mockReq object.", () => {
    const emailTest = "emailTest@test.com.br";
    const token = sign({ email: emailTest }, process.env.SECRET_KEY);

    mockReq.headers = {
      authorization: `Token ${token}`,
    };

    validateToken(mockReq as Request, _ as Response, nextFunc);

    expect(nextFunc).toBeCalled();
    expect(nextFunc).toBeCalledTimes(1);

    expect(mockReq).toHaveProperty("decoded");
    expect(mockReq.decoded.email).toStrictEqual(emailTest);
  });
});
