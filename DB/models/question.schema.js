import mongoose, { Schema, Types, model } from 'mongoose'


const schema = new Schema ({
    level:{type:mongoose.Types.ObjectId, ref:"Level"},
    category:{type:mongoose.Types.ObjectId, ref:"Category"},
    sign_Url:{type:[String]},
    sign_Text:{type:[String]}, 
    type: { // Question types
        type: String,
        required: true,
        enum: ['MCQ', 'T/F', 'drag_drop']
    },
    question: { type: String, required: true },
    options: [
        {
            text: String,
            score: { type: Number, min: 0, max: 10, default: 0 }
        }
    ],
    correctOptions: { type: [String] } // Store multiple correct options
}, {
    timestamps: true,
    versionKey: false
});


schema.pre('save', function (next) {
    // Filter options where score is 10 (or your threshold for "correct")
    this.correctOptions = this.options
      .filter(option => option.score === 10) // Adjust this condition based on your logic
      .map(option => option.text); // Store the text of correct options
    next();
  });


// Update URLs dynamically
schema.post('init', function (req, doc) {
    if (doc.sign_Url.length > 0) {
        doc.sign_Url = doc.sign_Url.map(url => `${req.protocol}://${req.headers.host}/uploads/questions/` + url);
    }
});

export const Question = model('Question', schema);
