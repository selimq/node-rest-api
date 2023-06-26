import { verify } from "jsonwebtoken";
import { jwtSecretKey } from "../../../../config/index.js";
import { Token, User } from "../../../../models/index.js";
import {
  errorHelper,
  getText,
  ipHelper,
  signAccessToken,
  signRefreshToken,
} from "../../../../utils/index.js";

export default async (req, res) => {
  let token = req.query["token"];

  if (token == undefined) return res.status(400);

  try {
    req.user = verify(atob(token), jwtSecretKey);
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: err,
    });
  }

  const exists = await User.exists({
    _id: req.user._id,
    isActivated: true,
    isVerified: false,
  }).catch((err) => {
    return res.status(500).json(errorHelper("00051", req, err.message));
  });

  if (!exists) return res.status(400).json(errorHelper("00052", req));

  await User.updateOne(
    { _id: req.user._id },
    { $set: { isVerified: true } }
  ).catch((err) => {
    return res.status(500).json(errorHelper("00056", req, err.message));
  });

  const accessToken = signAccessToken(req.user._id);
  const refreshToken = signRefreshToken(req.user._id);

  await Token.updateOne(
    { userId: req.user._id },
    {
      $set: {
        userId: req.user._id,
        refreshToken: refreshToken,
        status: true,
        expires: Date.now() + 604800000,
        createdAt: Date.now(),
        createdByIp: ipHelper(req),
      },
    },
    {
      upsert: true,
    }
  ).catch((err) => {
    return res.status(500).json(errorHelper("00057", req, err.message));
  });

  return res.status(200).json({
    resultMessage: { en: getText("en", "00058"), tr: getText("tr", "00058") },
    resultCode: "00058",
    accessToken,
    refreshToken,
  });
};
