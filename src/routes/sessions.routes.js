import { Router } from "express";
//import { usersModel } from "../dao/models/user.model.js";
import { SessionController } from "../controllers/sessions.controller.js";


const router = Router();

router.post("/signup",SessionController.renderRegister);

router.post("/login",SessionController.renderLogin);

router.get("/logout",SessionController.renderLogout);

export { router as sessionsRouter}