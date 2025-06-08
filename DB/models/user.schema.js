import mongoose, {Schema,model}from 'mongoose'
import bcrypt from'bcrypt'
const schema= new Schema({
name:String,
email:String,
password:String,
image: String,
passwordChangedAt: Date ,
role:{
    type:String,
    enum:['admin','user'],
    default:'user'
},
otpCode: String,
otpExpires: Date,
user_points:{
    type:Number,
    default:0
},
isActive:{
    type:Boolean,
    default:false
},
level:{
    type:mongoose.Types.ObjectId,
    ref:'Level'
}


},{
    timestamps:true,
    versionKey:false,
})  

// ${req.protocol}://${req.headers.host}

// schema.post('init',function (req,doc){
//     if(doc.image) doc.image = `${req.protocol}://${req.headers.host}/uploads/user/` + doc.image 
//  })

schema.pre('findOneAndUpdate',function(){
    if(this._update.password)  this._update.password =bcrypt.hashSync(this._update.password , 8)
    })

export const User =model('User',schema)