import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String
}, {
  timestamps: true
});

const DBUser = models.DBUser ?? model("DBUser", userSchema);
export default DBUser;
