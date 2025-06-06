
import mongoose, { Schema, model } from 'mongoose'

const schema = new Schema ({
user:{
    type:mongoose.Types.ObjectId,
    ref:'User'
},
level:{
    type:mongoose.Types.ObjectId,
    ref:'Level'
},
startedAt:{type:Date},
completedAt:{type:Date},
totalPoints:{type:Number, default:0}
},{
    timestamps:true,
    versionKey:false
})

export const Process = model('Process',schema)

