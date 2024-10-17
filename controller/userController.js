require('dotenv').config();
const {User} = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema,loginSchema} = require('../validations/validation');
//Registration API
const userRegister = async (req, res) => {
    try{
        const { error } = registerSchema.validate(req.body); 
        if (error) {
          return res.status(400).json({ status: false, message: error.details[0].message });
        }
        let { username,email, password} = req.body;
        email=email.toLowerCase()
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ status:false,message: "This Email is already exists!" });
        }  
        const user = new User({
            username,
            email,
            password:hashedPassword,
            
        });
        const data = await user.save();
        res.status(201).json({
            status: true,
            message: "User registered successfully!",
            user: data
        });
    } catch (error) {
        res.status(500).json({ status: false,
            message: error.message || "Some error occurred while creating user"
        });
    }
};
//Single Device Login API
const userlogin = async (req, res) => {
    try {
      const { error } = loginSchema.validate(req.body); 
      if (error) {
        return res.status(400).json({ status: false, message: error.details[0].message });
      }
      let { email, password } = req.body;
      email=email.toLowerCase()
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({status:false, message: "Invalid Credential:User not found." });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({status:false, message: "Invalid Credential:Incorrect password. Please try again." });
      }
      user.currentToken = null;
      user.refreshToken = null;
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      user.currentToken = token;
      user.refreshToken = refreshToken;
      res.status(200).json({
        status:true,
        message: "Login successful!",
        user:user
      });
  
      await user.save();
    } catch (error) {
      res.status(500).json({
        status:false,
        message: error.message || "Some error occurred while logging in."
      });
    }
};
function generateToken(user) {
      const payload = {
        userId: user._id,
        email: user.email
      };
      const secretKey = process.env.JWT_SECRET; 
      const options = {
        expiresIn: '3d'
      };
      return jwt.sign(payload, secretKey, options);
    }
function generateRefreshToken(user){
      const refreshPayload = {
        userId: user._id,
        email: user.email,
      };
      const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET;
      const refreshOptions = {
        expiresIn: '7d', 
      };
      return jwt.sign(refreshPayload, refreshSecretKey, refreshOptions);
};
//Profile Fetch API
const userProfile = async (req, res) => {
  const userId = req.user._id; 
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status:false,
        message: 'User not found.',
      });
    } else {
      res.status(200).json({status:true, message: 'User Details.', user });
    }}
    catch(err){
      res.status(500).json({
        status:false,
        message: err.message || 'Some error occurred while getting the user.',
      });
}};
module.exports ={ userRegister,userlogin,userProfile };