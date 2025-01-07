import express from 'express';
import { login, register, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update-user/:id").put(updateUser);

export default router;