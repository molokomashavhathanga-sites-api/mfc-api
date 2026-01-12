import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import logger from "./middleware/logger.middleware.js";
import landingPageRoutes from "./routes/landingPageRoutes.js";
import dashboardPageRoutes from "./routes/dashboardPageRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// ----- middlewares ---- //
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve /assets
app.use("/assets", express.static(path.join(__dirname, "views", "assets")));


// ----- routes ---- //
app.use("", authRoutes);
app.use("", landingPageRoutes);
app.use("", dashboardPageRoutes);


// 404 fallback 
app.use((req, res) => res.status(404).send("404 Not Found"));

export default app;