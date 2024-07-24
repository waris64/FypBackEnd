import express from "express";
import { signIn, register } from "../controller/authController.js";

const router = express.Router()

router.post('/register', register)
router.post('/signin', signIn)
export default router;