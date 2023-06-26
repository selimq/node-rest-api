import { expect } from "chai";
import { before, describe, test } from "mocha";
import mongooseLoader from "../../../../../src/loaders/mongoose.js";

describe("[User Controller] register user test blocks", () => {
  before(async () => {
    await mongooseLoader();
  });
  test("Should user register and save record to MongoDB", () => {
    const registerUser = {
      email: "sselimq@gmail.com",
      password: "123456",
      name: "Selim",
      language: "en",
    };
  });
});
