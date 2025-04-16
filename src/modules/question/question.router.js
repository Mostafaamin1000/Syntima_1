import { Router } from "express";
import {
    AddQuestions,
    deleteQuestion,
    getAllQuestions,
    getOneQuestion,
    updateQuestion
} from "./question.controller.js";
import { uploadMixOFFiles } from "../../fileUpload/fileUpload.js";

const QuestionRouter = Router();

const uploadFields = [
    { name: "sign_Url", maxCount: 2 } // Allows uploading up to 2 sign images
];

// Route to Add or Get All Questions
QuestionRouter.route('/')
    .post(uploadMixOFFiles([{ name: "sign_Url", maxCount: 2 }], "questions"), AddQuestions)
    .get(getAllQuestions);


// Routes for Individual Question Operations
QuestionRouter.route("/:id")
    .delete(deleteQuestion)
    .put(uploadMixOFFiles(uploadFields, "questions"), updateQuestion)
    .get(getOneQuestion);

export default QuestionRouter;
