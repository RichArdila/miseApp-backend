import request from "supertest";
import app from "../index.js";

let tokenAdmin;
let tokenUser;

beforeAll(async () => {
  const adminRes = await request(app).post("/auth/login").send({
    username: "Richard Ardila",
    password: "0526",
  });
  tokenAdmin = adminRes.body.token;

  const userRes = await request(app).post("/auth/login").send({
    username: "Alexis Lopez",
    password: "1111",
  });
  tokenUser = userRes.body.token;
});

describe("POST /items", () => {
  it("should create a new item if user is admin", async () => {
    const timestamp = Date.now();
    const res = await request(app)
      .post("/items")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        name: `Celery-${timestamp}`,
        type: "Food",
        rotation_days: 3,
        image_URL:
          "https://dojiw2m9tvv09.cloudfront.net/82906/product/celery-sticks-on-white-2022-08-16-00-57-10-utc0258.jpg",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(`Celery-${timestamp}`);
  });
});

describe("GET /items", () => {
  it("should return the items if user is authenticated", async () => {
    const res = await request(app)
      .get("/items")
      .set("Authorization", `Bearer ${tokenUser}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should fail if I don't send a token ", async () => {
    const res = await request(app).get("/items");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Require Token");
  });
});
