import Joi from "joi";

export function validateRegistration(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(20).required(),
    name: Joi.string().min(2).max(20).required(),
    language: Joi.string().valid("tr", "en").required(),
  });
  return schema.validate(body);
}

export function validateSendVerificationEmail(body) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
  });
  return schema.validate(body);
}
