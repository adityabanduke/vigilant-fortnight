import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

const register = async (req, res) => {
  const { username,email, password } = req.body;
  console.log(req.file);
  try {
    if (req.file) {
      const imagePath = req.file.path;
      cloudinary.uploader.upload(imagePath, async (err, result) => {
        if (err) {
            console.log("could not upload image");
          return res.status(500).json({ error: err.message });
        }
        console.log("image uploaded");
        console.log(result.secure_url);
        const user = await User.create({
          username,
          email,
          password,
          imagePath: result.secure_url,
        });
        console.log('cannot save user successfully')
        res.status(201).json({ user });
      });
    }

    else{const user = await User.create({ username, email, password });
    res.status(201).json({ user });}
  } catch (error) {
    console.log("coming in catch")
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).select("username password");
    if (!user) {
      return res.status(404).json({ error: "Invalid username" });
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    req.session.user = user;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login };
