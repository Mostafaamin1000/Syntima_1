import {Schema , model} from 'mongoose'


const schema = new Schema ({
name:String
},{
    timestamps:false,
    versionKey:false,
    toJSON:{virtuals:true}
})

schema.virtual('Questions', {
    ref:"Question",
    localField:"_id",
    foreignField:"category"
})

schema.pre(/^findOne/,function (){
    this.populate('Questions')
    })

export const Category = model('Category',schema)

