import { Schema, model, Model } from "mongoose";

interface IBase {
  id: string;
  url: string;
  // ip: string;
}

interface INew extends Model<IBase> {
  createNew: (id: string, url: string) => Promise<IBase>;
}

const linkSchema = new Schema<IBase, INew>(
  {
    id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    // ip: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "Links",
    versionKey: false,
  }
);

linkSchema.static(
  "createNew",
  async function createNew(id: string, url: string) {
    const check = await this.findOne({ id });
    if (check) {
      throw new Error("Link already exists");
    } else {
      return this.create({ id, url });
    }
  }
);

const Link = model<IBase, INew>("Link", linkSchema);

export default Link;
