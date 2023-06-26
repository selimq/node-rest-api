const { AssertionError } = require("./assertion_error.js");
const { Rule } = require("../rule.js");
const { Validator } = require("../validator/validator.js");

const util = require("util");
const { Stream } = require("stream");

const validTypes = [Number, String, Object, Array, Boolean, Function];

class Assert {
  static fail(actual, expected, message) {
    throw new AssertionError(
      message ||
        `Failed value: ${util.inspect(actual)}; ${
          expected !== undefined
            ? `Expect: ${util.inspect(expected.name || expected)}`
            : ""
        }`
    );
  }
  static instanceOf(value, type, { message = "" } = {}) {
    if (!(value instanceof type)) {
      Assert.fail(
        value,
        type,
        message ||
          `Failed instance: ${util.inspect(
            value
          )}; Expect instance of ${util.inspect(type.name || type)} class`
      );
    }
  }
  static defined(value, { message = "" } = {}) {
    if (!Validator.isDefined(value))
      Assert.fail(value, "No undefined values", message);
  }
  static ok(value, { message = "", required = false } = {}) {
    if (!value && required) Assert.fail(value, "Truthful value", message);
    if (Validator.isDefined(value) && !value)
      Assert.fail(value, "Truthful value", message);
  }
  static typeOf(value, type, message) {
    if (!validTypes.includes(type)) {
      Assert.fail(
        value,
        type,
        message ||
          `Assert.typeOf accept one of [${validTypes.map(
            (t) => t.name
          )}] types. Use another method to validate "${type}"`
      );
    }

    if (type === Number && Validator.isNumber(value)) return;
    if (type === String && Validator.isString(value)) return;
    if (type === Object && Validator.isObject(value)) return;
    if (type === Array && Validator.isArray(value)) return;
    if (type === Boolean && Validator.isBoolean(value)) return;
    if (type === Function && Validator.isFunc(value)) return;

    Assert.fail(value, type, message);
  }

  static array(
    value,
    { required = false, notEmpty = false, message = "" } = {}
  ) {
    if (required || notEmpty) Assert.typeOf(value, Array, message);
    if (Validator.isDefined(value)) Assert.typeOf(value, Array, message);
    if (value && !value.length && notEmpty)
      Assert.fail(value, "Not empty array");
  }

  static arrayOf(
    value,
    of = [],
    { required = false, notEmpty = false, message = "" } = {}
  ) {
    Assert.array(value, { required, notEmpty, message });

    if (!Array.isArray(of)) Assert.fail(of, "of option expect an Array type");
    if (!of.every((i) => validTypes.includes(i))) {
      Assert.fail(
        value,
        of,
        message ||
          `Assert.array 'of' option accept only one of [${validTypes.map(
            (t) => t.name
          )}] types`
      );
    }
    if (
      value &&
      value.length &&
      of.length &&
      !value.every((i) => i && of.includes(i.constructor))
    )
      Assert.fail(
        value,
        `Array one of [${of.map((t) => t.name)}] types`,
        message
      );
  }

  static object(
    value,
    { required = false, notEmpty = false, message = "" } = {}
  ) {
    if (required || notEmpty) Assert.typeOf(value, Object, message);
    if (Validator.isDefined(value)) Assert.typeOf(value, Object, message);
    if (notEmpty && !Object.keys(value).length)
      Assert.fail(value, "Not empty object", message);
  }

  static number(value, { required = false, message = "" } = {}) {
    if (required) Assert.typeOf(value, Number, message);
    if (Validator.isDefined(value)) Assert.typeOf(value, Number, message);
  }

  static integer(value, { required = false, min, max, message = "" } = {}) {
    const isInteger = Validator.isInt(value);

    if (required && !isInteger) Assert.fail(value, "Integer", message);
    if (Validator.isDefined(value) && !isInteger)
      Assert.fail(value, "Integer", message);

    if (Validator.isNumber(min)) {
      if (Validator.isDefined(value) && isInteger && value < min)
        Assert.fail(value, `Minimal value: ${min}`, message);
    }
    if (Validator.isNumber(max)) {
      if (Validator.isDefined(value) && isInteger && value > max)
        Assert.fail(value, `Maximum value: ${max}`, message);
    }
  }

  static string(
    value,
    { required = false, notEmpty = false, message = "" } = {}
  ) {
    if (required || notEmpty) Assert.typeOf(value, String, message);
    if (Validator.isDefined(value)) Assert.typeOf(value, String, message);
    if (Validator.isDefined(value) && !value.trim().length && notEmpty)
      Assert.fail(value, "Not empty string", message);
  }

  static boolean(value, { required = false, message = "" } = {}) {
    if (required) Assert.typeOf(value, Boolean, message);
    if (Validator.isDefined(value)) Assert.typeOf(value, Boolean, message);
  }

  static buffer(
    value,
    { required = false, notEmpty = false, message = "" } = {}
  ) {
    if (required && !Buffer.isBuffer(value))
      Assert.fail(value, "Buffer", message);
    if (Validator.isDefined(value) && !Buffer.isBuffer(value))
      Assert.fail(value, "Buffer", message);
    if (!value.length && notEmpty)
      Assert.fail(value, "Not empty buffer", message);
  }

  static date(value, { required = false, message = "" } = {}) {
    if (required) Assert.instanceOf(value, Date, message);
    if (Validator.isDefined(value)) Assert.instanceOf(value, Date, message);
  }

  static func(value, { required = false, message = "" } = {}) {
    if (required) Assert.typeOf(value, Function, message);
    if (Validator.isDefined(value)) Assert.instanceOf(value, Function, message);
  }

  static stream(value, { required = false, message = "" } = {}) {
    if (required) Assert.instanceOf(value, Stream, message);
    if (Validator.isDefined(value)) Assert.instanceOf(value, Stream, message);
  }

  static id(value, { required = false, message = "" } = {}) {
    const int = Number(value);
    const isPositiveInteger = Validator.isInt(int) && int >= 1;
    const isUiid = Validator.isUuid(value);
    const isValidId = isPositiveInteger || isUiid;
    if (!isValidId && required) Assert.fail(value, "UUID or Number", message);
    if (Validator.isDefined(value) && !isValidId)
      Assert.fail(value, "UUID or Number", message);
  }

  static uuid(value, { required = false, message = "" } = {}) {
    Assert.string(value, { required, message });
    if (value && !Validator.isUuid(value)) Assert.fail(value, "UUID", message);
  }

  static url(value, { required = false, message = "" } = {}) {
    Assert.string(value, { required, message });
    if (value && !Validator.isUrl(value)) Assert.fail(value, "URL", message);
  }

  static validate(value, rule, { required = false, allowed = [] } = {}) {
    Assert.instanceOf(rule, Rule);

    if (allowed.includes(value)) return;

    const validationResult = rule.validator(value);
    if (!["boolean", "string"].includes(typeof validationResult)) {
      Assert.fail(
        validationResult,
        null,
        "Validation result error. Validator should return string or boolean. Please check validation function"
      );
    }

    if (required) {
      if (Validator.isString(validationResult))
        Assert.fail(value, validationResult);
      if (validationResult === false) Assert.fail(value, rule.description);
    }

    if (Validator.isDefined(value) && !required) {
      if (Validator.isString(validationResult))
        Assert.fail(value, validationResult);
      if (validationResult === false) Assert.fail(value, rule.description);
    }
  }
}
if (process.env.NODE_NOASSERT) {
  Object.getOwnPropertyNames(Assert).forEach(
    (key) => (Assert[key] = function noAssert() {})
  );
}
module.exports = { Assert };
