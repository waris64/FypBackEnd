import mongoose from "mongoose";

const userRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'New'
    },
    diseasePrediction: {
      type: String,
    },
    diseaseConfidence: {
      type: String,
    },
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", userRecordSchema);

export default Record;
