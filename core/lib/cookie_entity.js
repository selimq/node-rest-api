const { Assert: assert } = require("./assert");
const { Validator } = require("./validator/validator");
const validSameSiteValues = ["lax", "none", "strict", true, false];

class CookieEntity {
  constructor({
    name,
    value,
    maxAge,
    domain,
    path,
    httpOnly,
    signed,
    secure,
    sameSite,
  } = {}) {
    assert.string(name, { required: true });
    assert.defined(value, { required: true });
    assert.integer(maxAge);
    assert.string(domain);
    assert.boolean(httpOnly);
    assert.boolean(signed);
    assert.boolean(secure);
    if (
      Validator.isDefined(sameSite) &&
      !validSameSiteValues.includes(sameSite)
    ) {
      assert.fail(sameSite, validSameSiteValues);
    }

    this.name = name;
    this.value = value;
    this.options = {
      ...(Validator.isDefined(maxAge) && { maxAge }),
      domain: Validator.isDefined(domain) ? domain : "",
      path: Validator.isDefined(path) ? path : "/",
      httpOnly: Validator.isDefined(httpOnly) ? httpOnly : true,
      signed: Validator.isDefined(signed) ? signed : true,
      secure: Validator.isDefined(secure) ? secure : true,
      sameSite: Validator.isDefined(sameSite) ? sameSite : true,
    };
  }
}

module.exports = { CookieEntity };