import { describe, test, expect } from "vitest";
import request from "supertest";
import { app } from "../server";

describe("Login Authentication", () => {
  test("given correct login credentials", async () => {
    const email = process.env.TEST_USER_EMAIL;
    const password = process.env.TEST_USER_PASSWORD;

    const response = await request(app).post("/api/auth/login").send({
      email,
      password,
    });
    expect(response.statusCode).toBe(200);
  });

  test("incorrect login credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "",
      password: "",
    });
    expect(response.statusCode).toBe(400);
  });
});
