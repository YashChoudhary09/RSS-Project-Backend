const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AdminSecret = require("./models/adminSecrets.model.js");
const User = require("./models/users.model.js");
require("dotenv").config();

// 🔌 Connect to DB
main()
  .then(() => {
    console.log("✅ DB Connected Successfully");
    seedEverything(); // Start seeding after connection
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

// 👨‍💼 Seed admin user
const createAdmin = async () => {
  const exists = await User.findOne({ emailId: "yash@gmail.com" });
   const currentSecret = await AdminSecret.findOne();
  if (!exists) {
    const hashed = await bcrypt.hash("12345", 10); // ✅ FIXED
    const newAdmin = new User({
      name: "yash",
      emailId: "yash@gmail.com",
      password: hashed,
      role: "admin",
       regSecret:currentSecret.secret,
    });
    await newAdmin.save();
    console.log("✅ Admin user created");
  } else {
    console.log("ℹ️ Admin user already exists");
  }
};

// 🔐 Seed admin regKey
const seedAdminPass = async () => {
  const exists = await AdminSecret.findOne();
  if (!exists) {
    await AdminSecret.create({ secret: "admin" });
    console.log("✅ Admin regKey seeded");
  } else {
    console.log("ℹ️ Admin regKey already exists");
  }
};

// 🪄 Seed both
const seedEverything = async () => {
   await seedAdminPass();
  await createAdmin();
  mongoose.disconnect(); // 🔌 Disconnect after work
};
