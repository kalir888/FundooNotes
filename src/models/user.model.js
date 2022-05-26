import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    userId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
