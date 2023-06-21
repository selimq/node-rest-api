import { Router } from "express";
import {
  register,
  //   changePassword,
  //   deleteUser,
  //   editUser,
  //   forgotPassword,
  //   getUser,
  login,
  logout,
  //   refreshToken,
  sendVerificationEmail,
  verify,
} from "../controllers/user/index.js";
import { auth } from "../middlewares/index.js";

const router = Router();

// AUTH
router.post("/", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/verify", verify);
// router.post('/refresh-token', refreshToken);
// router.post('/forgot-password', auth, forgotPassword);
router.post("/send-verification-email", sendVerificationEmail);

// // EDIT
// router.post('/change-password', auth, changePassword);
// router.put('/', auth, imageUpload, editUser);

// router.get('/', auth, getUser);
// router.delete('/', auth, deleteUser);

export default router;
