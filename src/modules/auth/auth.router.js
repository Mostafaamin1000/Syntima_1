import { Router } from "express";
import { checkEmail } from "../../middlewares/checkemail.js";
import { Validate } from "../../middlewares/validate.js";
import { changePasswordVal, resetPasswordVal, signinVal, signupVal } from "../user/user.validation.js";
import { changeUserPassword, forgetPassword, resetPassword, signin, signup } from "./auth.controller.js";


const authRouter=Router()


authRouter.post('/signup',Validate(signupVal),checkEmail,signup)
authRouter.post('/signin',Validate(signinVal),signin)
authRouter.patch('/changepassword',Validate(changePasswordVal),changeUserPassword)
authRouter.post('/forget-password',forgetPassword)
authRouter.post('/reset-password',Validate(resetPasswordVal) , resetPassword)
    
export default authRouter   