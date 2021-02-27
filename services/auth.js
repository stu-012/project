const UserRepo = require("../reponsitories/user");
const User = require("../models/user");

module.exports.signIn = async (username, password) => {
  const user = await UserRepo.findUserByUsername(username);
  if (!user) {
    throw new Error("Username not existed");
  }
  if (!user.verifyPassword(password)) {
    throw new Error("Wrong password");
  }
  const jwt = user.generateToken();
  return { jwt, user };
};

module.exports.signUp = async (username, password) => {
  const user = await UserRepo.findUserByUsername(username);
  if (user) {
    throw new Error("Username existed!");
  }
  const newUser = new User(username);
  newUser.generatePassword(password);
  const savedUser = await UserRepo.createUser(newUser);
  return savedUser;
};

module.exports.updateProfile = async (user, { displayName, photoUrl, dob, phone, activated, position, matchDay, desirableCapability, node, request }) => {
  user.displayName = displayName;
  user.photoUrl = photoUrl;
  user.dob = dob;
  user.phone = phone;
  user.activated = activated;
  user.position = position;
  user.matchDay = matchDay;
  user.desirableCapability = desirableCapability;
  user.node = node;
  user.request = request;
  return UserRepo.updateUser(user);
};

module.exports.updatePassword = async (
  user,
  { currentPassword, newPassword }
) => {
  if (!user.verifyPassword(currentPassword)) {
    throw new Error("Password not correct");
  }
  user.generatePassword(newPassword);
  await UserRepo.changePassword(user);
  return user;
};
