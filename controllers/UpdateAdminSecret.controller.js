const AdminSecret = require("../models/adminSecrets.model.js");
const User = require("../models/users.model.js");
const bcrypt = require("bcrypt");

module.exports.updateAdminInfo = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized!",success:false });
    }

    const { name, emailId, oldPassword,newPassword, newSecret } = req.body;
    console.log("old password : ",oldPassword);
    console.log("new password :" .newPassword);
    // Case 1: Sirf ek password diya (incomplete input)
   if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
       return res.status(400).json({ message: "Both old and new passwords are required!", success: false });
   }

   // Case 2: Same old and new password (no change)
   if (oldPassword && newPassword && oldPassword === newPassword) {
      return res.status(400).json({ message: "New password must be different from old password!", success: false });
    }


   // If nothing provided
   if (!name && !emailId && !newSecret && !newPassword) {
       return res.status(400).json({ message: "Please provide at least one field to update!", success: false });
    }
 
    // ✅ Update AdminSecret
    if (newSecret) {
      let currentSecret = await AdminSecret.findOne();
      if (!currentSecret) {
        await AdminSecret.create({ secret: newSecret });
      } else {
        currentSecret.secret = newSecret;
        await currentSecret.save();
      }
      console.log("✅ Admin secret updated");
    }

    // ✅ Update Admin user info
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" ,success:false});
    }

    // If password provided, verify old password before update
    if (oldPassword) {
      const isMatch = await bcrypt.compare(oldPassword, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect old password!",success:false });
      }
    }

    if (name) admin.name = name;
    if (emailId) admin.emailId = emailId;
    if (newPassword) {
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();
    
    return res.status(200).json({
      message: "Admin info updated successfully!",
      success: true,
    });

  } catch (err) {
    console.log("❌ Error updating admin info:", err);
    res.status(500).json({ message: "Server error occurred!",success:false });
  }
};
