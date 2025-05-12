import {Schema,model}from 'mongoose'
import bcrypt from'bcrypt'
const schema= new Schema({
name:String,
email:String,
password:String,
image:String ,
passwordChangedAt: Date ,
role:{
    type:String,
    enum:['admin','user'],
    default:'user'
},
user_points:{
    type:Number,
    default:0
},
isActive:{
    type:Boolean,
    default:false
},
level:{
    type:Schema.Types.ObjectId,
    ref:'Level'
}


},{
    timestamps:true,
    versionKey:false,
})  

// schema.pre('insertMany',function(){
//     this.password=bcrypt.hashSync(this.password,8)
// })

schema.post('init',function (req,doc){
    if(doc.image) doc.image = `${req.protocol}://${req.headers.host}/uploads/user/` + doc.image
    })

schema.pre('findOneAndUpdate',function(){
    if(this._update.password)  this._update.password =bcrypt.hashSync(this._update.password , 8)
    })

export const User =model('User',schema)