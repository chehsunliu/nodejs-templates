import { createApp } from "@demo/app";
import supertest from "supertest";
import * as Scenario from "./libs/scenario";
import * as path from "path";

beforeEach(async () => {
  const scenario = Scenario.get();
  await scenario.reset(path.join(__dirname, "data/users.json"));
});

test("health check should work", async () => {
  const resp = await supertest(createApp()).get("/");
  expect(resp.status).toBe(200);
  expect(resp.body).toStrictEqual({ status: "ok" });
});

const compare = (a: { name: string }, b: { name: string }) => (a.name < b.name ? -1 : 1);

test("listing users should work too", async () => {
  const resp = await supertest(createApp()).get("/users");
  expect(resp.status).toBe(200);
  expect(resp.body.data.slice().sort(compare)).toStrictEqual([
    { name: "alice", plan: "free" },
    { name: "bob", plan: "pro" },
  ]);
});
