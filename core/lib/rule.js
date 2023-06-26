class Rule {
  constructor(src = {}) {
    if (!src.validator || typeof src.validator != "function") {
      throw new Error("Invalid validator type");
    }
    if (!src.desription || typeof src.desription !== "string") {
      throw new Error("Invalid rule description");
    }

    this.validator = src.validator;
    this.desrciption = src.description;
    this.example = src.example || undefined;
  }
}

module.exports = { Rule };
