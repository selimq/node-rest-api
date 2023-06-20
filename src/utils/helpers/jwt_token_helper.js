import pkg from "jsonwebtoken";
const { sign } = pkg;
import { jwtSecretKey, refreshTokenSecretKey } from "../../config/index.js";

export function signAccessToken(userId) {
  const accessToken = sign({ _id: userId }, jwtSecretKey, {
    expiresIn: "1h",
  });
  return accessToken;
}
export function signRefreshToken(userId) {
  const refreshToken = sign({ _id: userId }, refreshTokenSecretKey, {
    expiresIn: "7d",
  });
  return refreshToken;
}
export function emailVerificationToken(userId) {
  const emailVerificationToken = sign({ _id: userId }, jwtSecretKey, {
    expiresIn: "15m",
  });
  return emailVerificationToken;
}
