const { generateToken } = require("../utils/generateToken.js");
const { User, validate } = require("../models/userModel");
const bcrypt = require("bcrypt");

// @route   POST /api/users/login
// @access  Public
loginUser = async (req, res) => {
  const { email, password } = req.body; // take the values from request body

    const user = await User.findOne({ email }); // find the user by email from DB
    if (!user) return res.status(400).json({"Error": "Email and/or password is wrong"}); // if user is not found, return 404 and message

    const validPassword = await bcrypt.compare(password, user.password); // compare password to the one stored in DB
    if (!validPassword){
      return res.status(400).json({"Error": "Email and/or password is wrong"}); // if password is wrong -> send message
    }
    if (user && validPassword){ // if both checks are true -> return user
      return res.status(200).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id), // generate user token for session on frontend
      })
    } else {
      res.status(401).json({"Error": "Invalid user data"});
    }
};

// @route   POST /api/users/register
// @access  Public
registerUser = async (req, res) => {
  /* FIXME: Error handling */
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { firstName, lastName, email, password } = req.body; // take values from request body

  const userExists = await User.findOne({ email }); // check if this email already has been registered

  if (userExists) { // if the email already exists -> dont allow the user to log in and throw error
    res.status(400).json({"Error": "User already exists"});
    throw new Error("User already exists");
  }

  const newUser = new User({ firstName, lastName, email, password }); // create new user in DB with the new values

  try {
    const user = await newUser.save(); // try to save new user 
    if (!user) throw new Error("Something went wrong, please, try again");

    if (user) { // if creation successful -> return user data
      // 201 - successful creation which led to creation of a resource
      res.status(201).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json("Invalid user data", error);
    throw new Error("Invalid user data");
  }
};

module.exports = {
  loginUser,
  registerUser,
};
