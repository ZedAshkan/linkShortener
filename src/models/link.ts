import mongoose, { Schema } from "mongoose";

const linkSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
  },
  { timestamps: true, collection: "Links", versionKey: false }
);

const Link = mongoose.model("Link", linkSchema);

export default Link;
