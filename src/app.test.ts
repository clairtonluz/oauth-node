import req from "supertest";
import app from "./app";

test("[GET] /", async () => {
  const res = await req(app).get("/");
  expect(res.text).toBe("Hello ts-node!");
});
