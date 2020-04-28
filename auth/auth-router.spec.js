const auth = require("./auth-router");

describe("auth-router suite", function () {
  describe("gen token function test", function () {
    it("should throw error when the func is not given an id or username", function () {
      broken = {
        name: "na",
        user: "na",
      };
      expect(() => auth.gentoken(broken)).toThrow();
    });
  });
});
