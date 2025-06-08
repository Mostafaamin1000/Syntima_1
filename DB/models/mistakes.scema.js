
import mongoose, { Schema, model } from 'mongoose'


const schema = new Schema ({
user:{
    type:mongoose.Types.ObjectId,
    ref:'User'
},
question:{
    type:mongoose.Types.ObjectId,
    ref:'Question'
}

},{
    timestamps:true,
    versionKey:false
})

export const Mistake = model('Mistake',schema)

