const request = require("supertest");
const server = require("../api/server.js");

  describe("posts router", () => {
    it("should return 401", async () => {
      return request(server)
        .get("/api/posts")
        .expect(400)
        .expect('Content-Type', /json/);
    });
  }); 