
import express from "express";

import { viewDashboard } from "../controllers/admin/dashboardController.js";
import { viewMemberPortal } from "../controllers/member/portal.controller.js";
import { viewMemberActivities } from "../controllers/member/activities.controller.js";
import { viewMemberNutrition } from "../controllers/member/nutrition.controller.js";
import { viewMemberPersonalDetails } from "../controllers/member/personalDetails.controller.js";
import { viewEditProfile } from "../controllers/member/editProfile.controller.js";
import { viewMemberBlling } from "../controllers/member/billing.controller.js";
import { viewMemberReports } from "../controllers/member/reports.controller.js";

const router = express.Router();

// admin dashboard

router.get("/admin/dashboard", viewDashboard);

// member dashboard/portals

router.get("/member/portal", viewMemberPortal);
router.get("/member/activities", viewMemberActivities);
router.get("/member/nutrition", viewMemberNutrition);
router.get("/member/personal-details", viewMemberPersonalDetails);
router.get("/member/edit-profile", viewEditProfile);
router.get("/member/billing", viewMemberBlling);
router.get("/member/reports", viewMemberReports);

export default router;