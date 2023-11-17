import express from "express";

export const createApp = () => {
  const app = express();

  app.get("/", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/error", (req, res) => {
    throw new Error("zz");
  });

  return app;
};
