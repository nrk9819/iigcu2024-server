import express from "express";
import registerRoute from "./register";

const router = express.Router();

router.use("/register", registerRoute);

export default router;
