import express from "express";
import { get } from "@demo/db";

export const createApp = () => {
  const app = express();
  const collection = get();

  app.get("/", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/users", async (req, res) => {
    res.json({
      data: await collection.fetchAll(),
    });
  });

  return app;
};
