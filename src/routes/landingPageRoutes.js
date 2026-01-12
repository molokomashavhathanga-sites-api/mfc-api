import { viewHomePage } from "../controllers/landing/home/homePageController.js";
import { viewAboutPage } from "../controllers/landing/about/aboutPageController.js";

import express from "express";

const router = express.Router();

router.get("/", viewHomePage);
router.get("/about", viewAboutPage);



export default router;