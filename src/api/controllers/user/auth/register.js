import { validateRegistration } from "../../../validators/user_validator.js";
import { User } from "../../../../models/index.js";
import {
  emailVerificationToken,
  errorHelper,
  generateRandomCode,
  getText,
  ipHelper,
  sendVerificaitonEmail,
  logger,
} from "../../../../utils/index.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import geoip from "geoip-lite";
const { lookup } = geoip;

export default async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    let code = "00025";
    if (error.details[0].message.includes("email")) code = "00026";
    else if (error.details[0].message.includes("password")) code = "00027";
    else if (error.details[0].message.includes("name")) code = "00028";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  const exists = await User.exists({ email: req.body.email }).catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  if (exists) {
    return res.status(409).json(errorHelper("00032", req));
  }
  // Everything fine

  const hashedPwd = await hash(req.body.password, 10);

  let username = "";
  let tempName = "";
  let existsUsername = true;
  let name = req.body.name;
  // let name = turkishToEnglish(req.body.name);
  if (name.includes(" ")) {
    tempName = name.trim().split(" ").slice(0, 1).join("").toLowerCase();
  } else {
    tempName = name.toLowerCase().trim();
  }
  do {
    username = tempName + generateRandomCode(4);
    existsUsername = await User.exists({ username: username }).catch((err) => {
      return res.status(500).json(errorHelper("00033", req, err.message));
    });
  } while (existsUsername);

  const geo = lookup(ipHelper(req));

  let user = new User({
    email: req.body.email,
    password: hashedPwd,
    name: name,
    username: username,
    language: req.body.language,
    isVerified: false,
    countryCode: geo == null ? "US" : geo.country,
    lastLogin: Date.now(),
    createdAt: Date.now(),
  });

  console.log(user);
  //Hash token
  let confirmToken = btoa(emailVerificationToken(user._id));

  //Verification email
  try {
    sendVerificaitonEmail(
      user.email,
      req.body.name,
      confirmToken,
      user.language,
      "register",
      req,
      res
    );
  } catch (err) {
    return res.status(500).json(errorHelper(""), req, err.message);
  }

  user = await user.save().catch((err) => {
    return res.status(500).json(errorHelper("00034", req, err.message));
  });

  user.password = null;
  logger("00035", user._id, getText("en", "00035"), "Info", req);
  return res.status(200).json({ ...errorHelper("00035", req), user });
};
