const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { httpError, asyncWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const singup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 20);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw httpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.json({ email, name });
};

const changeSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findByIdAnd(_id, { subscription }, { new: true });

  if (!user) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(user);
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndRemove(_id, { token: null });

  res.status(204).json();
};

module.exports = {
  singup: asyncWrapper(singup),
  login: asyncWrapper(login),
  getCurrent: asyncWrapper(getCurrent),
  changeSubscription: asyncWrapper(changeSubscription),
  logout: asyncWrapper(logout),
};