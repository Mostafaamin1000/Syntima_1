import { Question } from "../../../DB/models/question.schema.js";
import { catchError } from "../../middlewares/catchError.js";

// Add Question (Now supports multiple sign images)
const AddQuestions = catchError(async (req, res, next) => {
    if (req.files && req.files.sign_Url) {
        req.body.sign_Url = req.files.sign_Url.map(file => file.filename); // Ensure to use 'sign_Url' as per your upload config
    }

    let question = await Question.create(req.body);
    res.status(200).json({ message: "Created successfully!", question });
});



// Get All Questions
const getAllQuestions = catchError(async (req, res, next) => {
    let questions = await Question.find();
    res.status(200).json({ message: "All questions retrieved", questions });
});

// Get One Question by ID
const getOneQuestion = catchError(async (req, res, next) => {
    let question = await Question.findById(req.params.id);
    res.status(200).json({ message: "Question retrieved", question });
});

// Update Question
const updateQuestion = catchError(async (req, res, next) => {
    if (req.files && req.files.sign_Urls) {
        req.body.sign_Urls = req.files.sign_Urls.map(file => file.filename);
    }

    let question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Updated successfully", question });
});

// Delete Question
const deleteQuestion = catchError(async (req, res, next) => {
    let question = await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully", question });
});

export {
    AddQuestions,
    getAllQuestions,
    getOneQuestion,
    updateQuestion,
    deleteQuestion
};
