import { Schema, model } from "mongoose";

const habitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startDate: {
    type: String,
    required: true
  },
  stopDate: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

habitSchema.virtual("currentDay").get(function() {
  const currentDay = new Date();
  return currentDay
})

const DBHabit = model("DBHabit", habitSchema);
export default DBHabit;
