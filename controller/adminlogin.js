const login = require('../models/adminlogin')

//validation for admin logins
exports.loginadmin = async (req, res) => {
  let { ausername, apassword } = req.body;
  ausername = ausername.trim();
  console.log("ausernametim", ausername);
  try {
    const admin = await login.findOne({ ausername });
    console.log("admin:", admin);
    if (!admin) return res.status(404).send("Invalid credentials");
    if (apassword !== "a123")
      return res.status(404).send("Invalid credentials..");
    return res.status(200).json({ ausername });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};