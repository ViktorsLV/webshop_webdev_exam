const { User, validate } = require("../models/userModel");

// @route   GET /api/users
// @access  Public 
getAllUsers = async (req, res) => {
  const query = req.query.new // creating optional query
  try {
    const allUsers = query ? await User.find().sort({_id: -1}).limit(3) : await User.find({}); // if there is a query ('api/users?new=true') then return last 3 users sorted, else all users
    res.status(200).json(allUsers);
    // res.status(200).json({
    //   id: allUsers._id,
    //   firstName: allUsers.firstName,
    //   lastName: allUsers.lastName,
    //   email: allUsers.email,
    // });
  } catch (err) {
    res.status(404).json(err)
  }
};

// @route   GET /api/users/count
// @access  Public 
getUsersCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments({}); // counts users in db 
    res.status(200).json({count: userCount});
  } catch (err) {
    res.status(404).send('No Users in DB')  
  }
};

// @route   GET /api/users/:id
// @access  Public 
getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // findById method mongoose | takes id from url params 
    if (user) {
      res.status(200).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

// @route   GET /api/users/me
// @access  Private - Get currently logged in user information 
getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // takes currently logged in user id 
    if (user) {
      res.status(200).json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

// @route   GET /api/users/deleteMe
// @access  Private - Delete currently logged in user information 
deleteMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); 

    if (user) {
      await user.remove()
      res.status(200).json({message: "User removed successfully"});

    } else {
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

// @route   GET /api/users/updateMe
// @access  Private - Update currently logged in user information 
updateMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // takes currently logged in user id 

    if (user) {
      user.firstName = req.body.firstName || user.firstName
      user.lastName = req.body.lastName || user.lastName
      user.email = req.body.email || user.email

      const updatedUser = await user.save()

      res.status(200).json({
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      });

    } else {
      res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
}

module.exports = {
  getAllUsers,
  getUsersCount,
  getUserById,
  updateMe,
  deleteMe,
  getMe
};
