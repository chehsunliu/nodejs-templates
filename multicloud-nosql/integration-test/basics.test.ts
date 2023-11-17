import { createApp } from "@demo/app";
import supertest from "supertest";

test("health check should work", async () => {
  const resp = await supertest(createApp()).get("/");
  expect(resp.status).toBe(200);
  expect(resp.body).toStrictEqual({ status: "ok" });
});
