import { Schema, model, models } from "mongoose";

const habitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  stopDate: {
    type: String,
    required: true
  },
  ownerID: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// habitSchema.virtual("currentDay").get(function() {
//   const currentDay = new Date();
//   return currentDay
// })

const DBHabit = models.DBHabit ?? model("DBHabit", habitSchema);
export default DBHabit;
