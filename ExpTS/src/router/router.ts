import { Router } from "express"

import mainController from "../controllers/main"
import majorControlller from "../controllers/major"
import authController from "../controllers/auth"

const router = Router()

//auth controller
router.get("/auth/signup", authController.signup);
router.post("/auth/signup", authController.signup);
router.get("/auth/login", authController.login);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);

//major controller
router.get("/major", majorControlller.index);
router.get("/major/create", majorControlller.create);
router.post("/major/create", majorControlller.create);
router.get("/major/read/:id", majorControlller.read);
router.get("/major/update", majorControlller.update);
router.post("/major/update", majorControlller.update);
router.post("/major/remove", majorControlller.remove);


// main controller
router.get("/test-cookie", mainController.testCookie)
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get("/hb3", mainController.hb3);
router.get("/hb4", mainController.hb4);
router.get("/bem-vindo/:nome", mainController.bemvindo);
router.get("/about", mainController.about);

export default router;