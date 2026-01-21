import { Router } from "express";
import { getSignUpForm, signUp} from "../controllers/auth.controller.js";
import { loginForm, loginMember } from "../controllers/login/auth.login.controller.js";

const router = Router();

router.get("/signup", getSignUpForm);  
router.post("/signup", signUp);

router.get("/login", loginForm);        
router.post("/member-portal", loginMember);

export default router;
