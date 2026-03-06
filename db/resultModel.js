// models/Result.ts
import mongoose, { Schema } from "mongoose";

// export interface IResult extends Document {
//   student: {
//     name: string;
//     class: string;
//     paperId: number;
//     paperTitle: string;
//   };
//   date: Date;
//   score: number;
//   totalQuestions: number;
//   questionWeight: number;
//   selectedQuestions: {
//     paperId: number;
//     question: string;
//     options: string[];
//     answer: string;
//     explanation: string;
//   }[];
//   selectedAnswers: Record<string, string>;
// }

const ResultSchema = new Schema(
  {
    student: {
      name: { type: String, required: true },
      class: { type: String, required: true },
      paperId: { type: Number, required: true },
      paperTitle: { type: String, required: true },
    },
    date: { type: Date, default: Date.now },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    questionWeight: { type: Number, required: true },
    selectedQuestions: [
      {
        paperId: { type: Number, required: true },
        question: { type: String, required: true },
        options: [{ type: String }],
        answer: { type: String, required: true },
        explanation: { type: String },
      },
    ],
    selectedAnswers: { type: Map, of: String },
  },
  { timestamps: true }
);

export default mongoose.models.Result || mongoose.model("Result", ResultSchema);
