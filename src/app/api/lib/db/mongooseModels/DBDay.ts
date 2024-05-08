import { Schema, model, models } from "mongoose";

const daySchema = new Schema({
  habitID: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  isPerformed: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true
})

const DBDay = models.DBDay ?? model("DBDay", daySchema);
export default DBDay;
