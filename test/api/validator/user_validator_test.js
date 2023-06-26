import { expect } from "chai";
import { describe, test } from "mocha";
import {
  validateForgotPassword,
  validateLogin,
  validateRegistration,
  validateSendVerificationEmail,
} from "../../../src/api/validators/user_validator.js";

describe("[User Validator] send verification email schema test blocks ", () => {
  test("Should validate send verification email schema with correct body", () => {
    const body = {
      email: "selim@test.com",
    };

    expect(validateSendVerificationEmail(body).error).to.equal(undefined);
  });
  test("Should not validate send verification email schema with null body", () => {
    const emptyBody = {};
    expect(validateSendVerificationEmail(emptyBody).error).to.not.equal(
      undefined
    );
  });
  test("Should not validate send verification email schema with empty variable (email:'')", () => {
    const bodyWithNullValue = {
      email: "",
    };
    expect(validateSendVerificationEmail(bodyWithNullValue).error).to.not.equal(
      undefined
    );
  });
});

describe("[User Validator] register schema test blocks ", () => {
  test("Should validate register schema with correct body", () => {
    const body = {
      email: "selim@test.com",
      password: "123456",
      name: "Selim",
      language: "tr",
    };

    expect(validateRegistration(body).error).to.equal(undefined);
  });
  test("Should not register schema with null body", () => {
    const emptyBody = {};
    expect(validateRegistration(emptyBody).error).to.not.equal(undefined);
  });
  test("Should not validate register schema with empty variable (password:'')", () => {
    const bodyWithNullValue = {
      email: "selim@test.com",
      password: "",
      name: "Selim",
      language: "tr",
    };
    expect(validateRegistration(bodyWithNullValue).error).to.not.equal(
      undefined
    );
  });
  test("Should not validate register schema with one null variable", () => {
    const bodyWithNullValue = {
      email: "selim@test.com",
      name: "Selim",
      language: "tr",
    };
    expect(validateRegistration(bodyWithNullValue).error).to.not.equal(
      undefined
    );
  });
});

describe("[User Validator] login schema test blocks ", () => {
  test("Should validate login schema with correct body", () => {
    const body = {
      email: "selim@test.com",
      password: "123456",
    };

    expect(validateLogin(body).error).to.equal(undefined);
  });
  test("Should not login schema with null body", () => {
    const emptyBody = {};
    expect(validateLogin(emptyBody).error).to.not.equal(null);
  });
  test("Should not validate login schema with empty variable (password:'')", () => {
    const bodyWithNullValue = {
      email: "selim@test.com",
      password: "",
    };
    expect(validateLogin(bodyWithNullValue).error).to.not.equal(undefined);
  });
  test("Should not validate login schema with one null variable", () => {
    const bodyWithNullValue = {
      email: "selim@test.com",
    };
    expect(validateLogin(bodyWithNullValue).error).to.not.equal(undefined);
  });
});
describe("[User Validator] forgot password schema test blocks ", () => {
  test("Should validate forgot password schema with correct body", () => {
    const body = {
      password: "selim@test.com",
    };

    expect(validateForgotPassword(body).error).to.equal(undefined);
  });
  test("Should not validate forgot password schema with null body", () => {
    const emptyBody = {};
    expect(validateForgotPassword(emptyBody).error).to.not.equal(undefined);
  });
  test("Should not validate forgot password schema with empty variable (password:'')", () => {
    const bodyWithNullValue = {
      password: "",
    };
    expect(validateForgotPassword(bodyWithNullValue).error).to.not.equal(
      undefined
    );
  });
});
describe("[User Validator] refresh token schema test blocks ", () => {
  test("Should validate refresh token schema with correct body", () => {
    const body = {
      email: "selim@test.com",
    };

    expect(validateSendVerificationEmail(body).error).to.equal(undefined);
  });
  test("Should not validate refresh token schema with null body", () => {
    const emptyBody = {};
    expect(validateSendVerificationEmail(emptyBody).error).to.not.equal(
      undefined
    );
  });
  test("Should not validate refresh token schema with empty variable (email:'')", () => {
    const bodyWithNullValue = {
      email: "",
    };
    expect(validateSendVerificationEmail(bodyWithNullValue).error).to.not.equal(
      undefined
    );
  });
});
