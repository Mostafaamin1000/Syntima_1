import mongoose, { Schema, Types, model } from 'mongoose';
const schema = new Schema({
    level: { type: Types.ObjectId, ref: "Level" },
    sign_Urls: { type: [String], default: [] }, // Allow multiple URLs
    sign_Texts: { type: [String], default: [] }, // Allow multiple texts
    type: {
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
    correctOptions: { type: [String], default: [] } // Store multiple correct options
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
schema.post('init', function (doc) {
    if (doc.sign_Urls.length > 0) {
        doc.sign_Urls = doc.sign_Urls.map(url => process.env.BASE_URL + "questions/" + url);
    }
});

export const Question = model('Question', schema);
