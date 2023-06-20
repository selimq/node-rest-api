import { Router } from "express";
import user from "./user.js";

const router = Router();

router.use("/user", user);
router.get("/test", (_req, res) => {
  return res
    .status(200)
    .json({
      resultMessage: {
        en: "Project is successfully working...",
        tr: "Proje başarılı bir şekilde çalışıyor...",
      },
      resultCode: "00004",
    })
    .end();
});
export default router;
