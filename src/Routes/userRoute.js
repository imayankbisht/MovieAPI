const router = require("express").Router();
const User = require("../Models/userModel");

router.post("/register", async (req, res) => {
  try {
    let { name, password, email, phone, profession } = req.body;
    if (!name || !password || !email || !phone || !profession) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (password.length < 5)
      return res.status(400).json({
        msg: "The password needs to be atleast 5 characters long."
      });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({
        msg: "Account with this email is already exists."
      });
    const newUser = new User({
      name,
      password,
      email,
      phone,
      profession
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        msg: "No account with this email has been registered"
      });
    }
    const isMatch = await password.includes(user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "Invalid Credentials!"
      });
    res.json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
