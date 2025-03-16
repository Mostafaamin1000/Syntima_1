import mongoose ,{Schema,model} from 'mongoose'

const schema = new Schema ({
    Url:String,
    title:String
},{
    timestamps:false,
    versionKey:false
})

schema.post('init',function(doc){
    if(doc.gif_Url) doc.gif_Url = process.env.BASE_URL+"dectionary/" + doc.gif_Url
})

export const Dectionary=model('Dectionary',schema)