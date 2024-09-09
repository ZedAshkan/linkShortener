import { Schema, model, Model } from "mongoose";

interface IBase {
  id: string;
  open_count: number;
  url: string;
  ip: string;
  is_public: boolean;
  is_active: boolean;
}

interface INew extends Model<IBase> {
  createNew: (id: string, url: string, ip: string) => Promise<IBase>;
}

const linkSchema = new Schema<IBase, INew>(
  {
    id: { type: String, required: true, unique: true },
    open_count: { type: Number, default: 0 },
    url: { type: String, required: true },
    ip: { type: String, required: true },
    is_public: { type: Boolean, default: true },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "Links",
    versionKey: false,
  }
);

linkSchema.static(
  "createNew",
  async function createNew(id: string, url: string, ip: string) {
    const check = await this.findOne({ id });
    if (check) {
      throw new Error("Link already exists");
    } else {
      return this.create({ id, url, ip });
    }
  }
);

const Link = model<IBase, INew>("Link", linkSchema);

export default Link;
