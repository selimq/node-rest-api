import Joi from "joi";

const emailSchema = Joi.string().email().min(3).required();
const passwordSchema = Joi.string().min(6).max(20).required();
const nameSchema = Joi.string().min(2).max(20).required();
const languageSchema = Joi.string().valid("tr", "en").required();

export function validateRegistration(body) {
  const schema = Joi.object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
    language: languageSchema,
  });
  return schema.validate(body);
}

export function validateSendVerificationEmail(body) {
  const schema = Joi.object({
    email: emailSchema,
  });
  return schema.validate(body);
}

export function validateLogin(body) {
  const schema = Joi.object({
    email: emailSchema,
    password: passwordSchema,
  });
  return schema.validate(body);
}
