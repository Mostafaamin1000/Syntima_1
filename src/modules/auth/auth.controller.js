import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { catchError } from '../../middlewares/catchError.js'
import { AppError } from '../../utils/appError.js'
import { User } from '../../../DB/models/user.schema.js'
import sendEmail from '../../utils/sendEmail.js'
import { htmlTemplate } from '../../utils/htmlTemplate.js'

const signup =catchError( async(req,res,next)=>{    
    let user = new User(req.body)
    await user.save()
    res.status(201).json({message:"User Created .." , user})
})

const signin =catchError( async(req,res,next)=>{
    let user =await User.findOne({email : req.body.email})
    if(!user) return next(new AppError('Email or Password incorrect ..',404))

    let match = bcrypt.compareSync(req.body.password , user.password )
    if(!match) return next(new AppError('Email or Password incorrect ..',404))

jwt.sign({userId:user._id , name:user.name, role:user.role }, process.env.SECRET_KEY , (err,token)=>{
    res.status(200).json({message:"Login Successfully  ..", token, user }  )
})})
    
const changeUserPassword =catchError( async(req,res,next)=>{
    let user =await User.findOne({email : req.body.email})
    if(!user) return next(new AppError('Email or Password incorrect ..',404))
    let match = bcrypt.compareSync(req.body.oldPassword , user.password )
    if(!match) return next(new AppError('Email or Password incorrect ..',404))

    await User.findOneAndUpdate({email : req.body.email},{password: req.body.newPassword , passwordChangedAt:Date.now()})
    jwt.sign({userId:user._id , name:user.name, role:user.role }, process.env.SECRET_KEY , (err,token)=>{
            res.status(200).json({message:"Login Successfully  ..", token, user}  )
        })
    })
// 💡 Forgot Password
const forgetPassword = catchError(async (req,res,next)=>{
    const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return next(new AppError('User not found', 404));
        // إنشاء توكن مؤقت باستخدام JWT
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_RESET_SECRET,
          { expiresIn: '1h' }
        );
      await user.save();
      const resetLink = `http://localhost:3000/reset-password/${token}`;
     const isEmailSent = await sendEmail({
          to : user.email,
          subject : 'Password Reset',
          html: htmlTemplate().replace("{{resetLink}}", resetLink),
      });
      res.status(200).json({ msg: 'Password reset email sent' ,token });
})

// 🔄 Reset Password
const resetPassword = catchError(async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return next(new AppError('User not found', 404));
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({message: 'Password updated successfully',user });
})

const protectedRouter=catchError(async (req,res,next)=>{
    let {token}= req.headers
    let userPayload= null
    if(!token) return next(new AppError('Token not provided..',401))
        jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
    if(err) return next(new AppError(err,401))
        userPayload=payload
        })
let user = await User.findById(userPayload.userId)
if(!user) return next(new AppError('user not found..',401))

    if(user.passwordChangedAt){
    let time = parseInt(user.passwordChangedAt.getTime() /1000)
if(time > userPayload.iat) return next(new AppError('invalid token,signin again..',401))
}   
req.user=user
next()                          
})

const allowTo =(...roles)=>{
    return catchError((req,res,next)=>{
if(roles.includes(req.user.role)){
return next()
}
return next(new AppError('you are not authorized to access this endpoint..',401))
    })
}

    export {
        signin,
        signup,
        changeUserPassword,
        forgetPassword,
        resetPassword,
        protectedRouter,
        allowTo
    }