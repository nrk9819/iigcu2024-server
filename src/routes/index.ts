import express from "express";
import registerRoute from "./register";
import getFileRoute from "./get-file";

const router = express.Router();

router.use("/register", registerRoute);
router.use("/get-file", getFileRoute);

export default router;
