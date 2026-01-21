import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const signToken = (user) =>
  jwt.sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );





export const loginForm = (req, res) => {
  return res.status(200).sendFile(
    path.join(req.app.get("views"), "landing", "partials", "login-form.html")
  );
};



export const loginMember = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const result = await db.query(
      `SELECT id, firstname, lastname, email, role, password
       FROM public.users
       WHERE email = $1
       LIMIT 1`,
      [email.toLowerCase()]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // If admin created user without password yet
    if (!user.password) {
      return res.status(403).json({ message: "Account not activated. Please set a password first." });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);

    // never return password hash
    delete user.password;

    res.sendFile(path.join(req.app.get("views"), "dashboard", "member-portal.html"));
      return res.status(200);
    
    // return res.json({ token, user });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
