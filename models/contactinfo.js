import mongoose from "mongoose";
import { stringify } from "querystring";

const contactschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    company: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactschema);
export default Contact;
