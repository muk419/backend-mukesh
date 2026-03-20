import { Router } from "express";
import { registerUser } from "../controllers/user.controler.js";
import { upload } from "../middlewares/multer.middlewaer.js";

const router = Router()

router.route("/register").post(registerUser)

export default router