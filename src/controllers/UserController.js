const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const {
      profilePicture,
      clinicName,
      fullname,
      birthdate,
      assistantName,
      graduateSchool,
      address,
      contactNumber,
      gender,
      email,
      role,
      password,
    } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      profilePicture,
      clinicName,
      fullname,
      birthdate,
      assistantName,
      graduateSchool,
      address,
      contactNumber,
      gender,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (err) {
    console.log(err);
  }
};

const getSpecificUserByEmail = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUserList = async (req, res) => {
  try {
    const userList = await UserModel.find();
    res.status(200).json(userList);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const userList = await UserModel.findById(req.params.id);
    res.status(200).json(userList);
  } catch (error) {
    console.log(error);
  }
};

const updateUserByContactNumber = async (req, res) => {
  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await UserModel.findOneAndUpdate(
      { contactNumber: req.params.contactNumber },
      { password: hashedPassword }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const getUsersByRolePatient = async (req, res) => {
  try {
    const user = await UserModel.find({ role: "patient" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUserByRoleDoctor = async (req, res) => {
  try {
    const user = await UserModel.find({ role: "doctor" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerUser,
  loginUser,
  getSpecificUserByEmail,
  getUserList,
  getUserById,
  updateUserByContactNumber,
  getUsersByRolePatient,
  getUserByRoleDoctor,
  updateUserById,
  deleteUserById,
};
