import { viewDashboard } from "../controllers/dashboard/dashboardController.js";


import express from "express";

const router = express.Router();

router.get("/dashboard", viewDashboard);



export default router;