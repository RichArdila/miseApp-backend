import request from "supertest";
import app from "../index.js";

let token;

beforeAll(async () => {
  const res = await request(app).post("/auth/login").send({
    username: "Richard Ardila",
    password: "0526",
  });

  token = res.body.token;
});

describe("POST /items", () => {
  it("should create a new item if user is admin", async () => {
    const timestamp = Date.now();
    const res = await request(app)
      .post("/items")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `celery-${timestamp}`,
        type: "Food",
        rotation_days: 3,
        image_URL:
          "https://dojiw2m9tvv09.cloudfront.net/82906/product/celery-sticks-on-white-2022-08-16-00-57-10-utc0258.jpg",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(`celery-${timestamp}`);
  });
});
