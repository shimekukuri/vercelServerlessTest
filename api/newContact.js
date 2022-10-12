import db from "../utils/db";
import Contact from "../models/contactinfo";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, phone, company } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@")
  ) {
    res.status(422).json({
      message: "Validation error, missing required fields",
    });
    return;
  }
  await db.connect();

  const existingUser = await Contact.findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "Contact exists already! " });
    await db.disconnect();
    return;
  }

  const newUser = new Contact({
    name,
    email,
    phone,
    company,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  })
};

export default handler;