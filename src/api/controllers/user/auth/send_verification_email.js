import { validateSendVerificationEmail } from "../../../validators/user_validator.js";
import { User } from "../../../../models/index.js";
import {
  emailVerificationToken,
  errorHelper,
  getText,
  logger,
  sendVerificaitonEmail,
} from "../../../../utils/index.js";

export default async (req, res) => {
  const { error } = validateSendVerificationEmail(req.body);
  if (error)
    return res
      .status(400)
      .json(errorHelper("00029", req, error.details[0].message));

  const user = await User.findOne({
    email: req.body.email,
    isActivated: true,
    //isVerified:false
  }).catch((err) => {
    return res.status(500).json(errorHelper("00030", req, err.message));
  });
  if (!user) return res.status(404).json(errorHelper("00036", req));

  const confirmCodeToken = btoa(emailVerificationToken(user._id));

  //Verification email
  await sendVerificaitonEmail(
    req.body.email,
    user.name,
    confirmCodeToken,
    user.language,
    "newCode",
    req,
    res
  );

  user.isVerified = false;
  await user.save().catch((err) => {
    return res.status(500).json(errorHelper("00037", req, err.message));
  });

  logger("00048", user._id, getText("en", "00048"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00048"), tr: getText("tr", "00048") },
    resultCode: "00048",
  });
};
