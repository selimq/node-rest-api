const { Writable } = require("stream");
const { expect } = require("chai");
const { Validator } = require("../../lib/validator/validator");

describe("Validator", function () {
  describe("Validator.isDefined", () => {
    it("it should return true", () => {
      expect(Validator.isDefined("")).to.be.true;
      expect(Validator.isDefined("hello")).to.be.true;
      expect(Validator.isDefined(true)).to.be.true;
      expect(Validator.isDefined(false)).to.be.true;
      expect(Validator.isDefined(null)).to.be.true;
      expect(Validator.isDefined(NaN)).to.be.true;
      expect(Validator.isDefined(0)).to.be.true;
      expect(Validator.isDefined({})).to.be.true;
      expect(Validator.isDefined([])).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isDefined(undefined)).to.be.false;
    });
  });

  describe("Validator.isInstanceOf", () => {
    it("it should return true", () => {
      expect(Validator.isInstanceOf(new Date(), Date)).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isInstanceOf("hello", Date)).to.be.false;
    });
  });

  describe("Validator.isArray", () => {
    it("it should return true", () => {
      expect(Validator.isArray([])).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isArray(undefined)).to.be.false;
      expect(Validator.isArray({})).to.be.false;
    });
  });

  describe("Validator.isArrayNotEmpty", () => {
    it("it should return true", () => {
      expect(Validator.isArrayNotEmpty([1])).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isArrayNotEmpty([])).to.be.false;
      expect(Validator.isArrayNotEmpty({})).to.be.false;
      expect(Validator.isArrayNotEmpty(undefined)).to.be.false;
    });
  });

  describe("Validator.isArrayOf", () => {
    it("it should return true", () => {
      expect(Validator.isArrayOf([], [Number])).to.be.true;
      expect(Validator.isArrayOf([{}], [Object])).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isArrayOf(undefined, [Object])).to.be.false;
      expect(Validator.isArrayOf({}, [Object])).to.be.false;
      expect(Validator.isArrayOf([1], [String])).to.be.false;
    });
  });

  describe("Validator.isObject", () => {
    it("it should return true", () => {
      expect(Validator.isObject({})).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isObject([])).to.be.false;
    });
  });

  describe("Validator.isNumber", () => {
    it("it should return true", () => {
      expect(Validator.isNumber(0)).to.be.true;
      expect(Validator.isNumber(1)).to.be.true;
      expect(Validator.isNumber(1.1)).to.be.true;
      expect(Validator.isNumber(-1)).to.be.true;
      expect(Validator.isNumber(-1.1)).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isNumber("1")).to.be.false;
      expect(Validator.isNumber([])).to.be.false;
      expect(Validator.isNumber(NaN)).to.be.false;
    });
  });

  describe("Validator.isStringNumber", () => {
    it("it should return true", () => {
      expect(Validator.isStringNumber("0")).to.be.true;
      expect(Validator.isStringNumber("1")).to.be.true;
      expect(Validator.isStringNumber("1.1")).to.be.true;
      expect(Validator.isStringNumber("-1.1")).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isStringNumber([])).to.be.false;
      expect(Validator.isStringNumber({})).to.be.false;
      expect(Validator.isStringNumber(NaN)).to.be.false;
      expect(Validator.isStringNumber(1.1)).to.be.false;
      expect(Validator.isStringNumber(-1.1)).to.be.false;
    });
  });

  describe("Validator.isInt", () => {
    it("it should return true", () => {
      expect(Validator.isInt(0)).to.be.true;
      expect(Validator.isInt(1)).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isInt([])).to.be.false;
      expect(Validator.isInt(NaN)).to.be.false;
      expect(Validator.isInt("10")).to.be.false;
      expect(Validator.isInt("10.1")).to.be.false;
      expect(Validator.isInt(1.1)).to.be.false;
      expect(Validator.isInt(-1.1)).to.be.false;
    });
  });

  describe("Validator.isUint", () => {
    it("it should return true", () => {
      expect(Validator.isUint(0)).to.be.true;
      expect(Validator.isUint(1)).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isUint([])).to.be.false;
      expect(Validator.isUint(NaN)).to.be.false;
      expect(Validator.isUint("-10")).to.be.false;
      expect(Validator.isUint("10")).to.be.false;
      expect(Validator.isUint("10.1")).to.be.false;
      expect(Validator.isUint(-10)).to.be.false;
      expect(Validator.isUint(1.1)).to.be.false;
      expect(Validator.isUint(-1.1)).to.be.false;
    });
  });

  describe("Validator.isStringInt", () => {
    it("it should return true", () => {
      expect(Validator.isStringInt("0")).to.be.true;
      expect(Validator.isStringInt("1")).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isStringInt([])).to.be.false;
      expect(Validator.isStringInt({})).to.be.false;
      expect(Validator.isStringInt(NaN)).to.be.false;
      expect(Validator.isStringInt("10.1")).to.be.false;
      expect(Validator.isStringInt(1.1)).to.be.false;
      expect(Validator.isStringInt(-1.1)).to.be.false;
    });
  });

  describe("Validator.isString", () => {
    it("it should return true", () => {
      expect(Validator.isString("hello")).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isString(100)).to.be.false;
    });
  });

  describe("Validator.isBoolean", () => {
    it("it should return true", () => {
      expect(Validator.isBoolean(true)).to.be.true;
      expect(Validator.isBoolean(false)).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isString(100)).to.be.false;
    });
  });

  describe("Validator.isBuffer", () => {
    const buffer = Buffer.from([1, 2, 3]);
    const emptyBuffer = Buffer.from("");

    it("it should return true", () => {
      expect(Validator.isBuffer(buffer)).to.be.true;
      expect(Validator.isBuffer(emptyBuffer)).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isBuffer(100)).to.be.false;
    });
  });

  describe("Validator.isDate", () => {
    it("it should return true", () => {
      expect(Validator.isDate(new Date())).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isDate(100)).to.be.false;
    });
  });

  describe("Validator.isFunc", () => {
    it("it should return true", () => {
      expect(Validator.isFunc(() => {})).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isFunc(100)).to.be.false;
    });
  });

  describe("Validator.isStream", () => {
    it("it should return true", () => {
      expect(Validator.isStream(new Writable())).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isStream(100)).to.be.false;
    });
  });

  describe("Validator.isId", () => {
    it("it should return true", () => {
      expect(Validator.isId(100)).to.be.true;
      expect(Validator.isId("100")).to.be.true;
      expect(Validator.isId("58fd9f49-825e-4f20-880d-496795560dfb")).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isId(0)).to.be.false;
      expect(Validator.isId(-100)).to.be.false;
      expect(Validator.isId(100.1)).to.be.false;
      expect(Validator.isId("100.1")).to.be.false;
    });
  });

  describe("Validator.isUuid", () => {
    it("it should return true", () => {
      expect(Validator.isUuid("58fd9f49-825e-4f20-880d-496795560dfb")).to.be
        .true;
    });
    it("it should return false", () => {
      expect(Validator.isUuid(NaN)).to.be.false;
      expect(Validator.isUuid({})).to.be.false;
      expect(Validator.isUuid(-100)).to.be.false;
      expect(Validator.isUuid(100.1)).to.be.false;
      expect(Validator.isUuid("100.1")).to.be.false;
      expect(Validator.isUuid("58fd9f49-825e-4f20-880d")).to.be.false;
    });
  });

  describe("Validator.isUrl", () => {
    it("it should return true", () => {
      expect(Validator.isUrl("http://google.com/")).to.be.true;
      expect(Validator.isUrl("http://go")).to.be.true;
      expect(Validator.isUrl("http://localhost")).to.be.true;
      expect(Validator.isUrl("http://192.168.0.1")).to.be.true;
      expect(Validator.isUrl("https://google.com/")).to.be.true;
      expect(Validator.isUrl("ftp://google.com/")).to.be.true;
      expect(Validator.isUrl("ftps://google.com/")).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isUrl({})).to.be.false;
      expect(Validator.isUrl("")).to.be.false;
      expect(Validator.isUrl("h")).to.be.false;
      expect(Validator.isUrl("https")).to.be.false;
      expect(Validator.isUrl("https://")).to.be.false;
    });
  });

  describe("Validator.isIP", () => {
    it("it should return true", () => {
      expect(Validator.isIP("128.0.0.1")).to.be.true;
      expect(Validator.isIP("192.168.1.1")).to.be.true;
      expect(Validator.isIP("192.168.1.255")).to.be.true;
      expect(Validator.isIP("255.255.255.255")).to.be.true;
      expect(Validator.isIP("0.0.0.0")).to.be.true;
      expect(Validator.isIP("1.1.1.01")).to.be.true;
    });
    it("it should return false", () => {
      expect(Validator.isIP("https://192.168.1.255")).to.be.false;
      expect(Validator.isIP("192.168.1.256")).to.be.false;
      expect(Validator.isIP("255.255.255.256")).to.be.false;
      expect(Validator.isIP("0.0.0.256")).to.be.false;
    });
  });
});
