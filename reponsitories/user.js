const User = require("../models/user");
const db = require("./index");

exports.findUserByUsername = async (username) => {
  const rawUser = await db.users.findOne({ username: username });
  if (!rawUser) {
    return null;
  }
  const user = new User(
    rawUser.username,
    rawUser.displayName,
    rawUser.photoUrl,
    rawUser.dob,
    rawUser.phone,
    rawUser.activated,
    rawUser.position,
    rawUser.matchDay,
    rawUser.desirableCapability,
    rawUser.node,
    rawUser.request,
  );
  user.password = rawUser.password;
  user.salt = rawUser.salt;
  return user;
};

exports.createUser = async (user) => {
  const dbResult = await db.users.insertOne({
    username: user.username,
    password: user.password,
    salt: user.salt,
    displayName: user.displayName,
    photoUrl: user.photoUrl,
    dob: user.dob,
    phone: user.phone,
    activated: user.activated,
    position: user.position,
    matchDay: user.matchDay,
    desirableCapability: user.desirableCapability,
    node: user.node,
    request: user.request,
  });

  const insertedRawUser = dbResult.ops[0];

  const savedUser = new User(
    insertedRawUser.username,
    insertedRawUser.displayName,
    insertedRawUser.photoUrl,
    insertedRawUser.dob,
    insertedRawUser.phone,
    insertedRawUser.activated,
    insertedRawUser.position,
    insertedRawUser.matchDay,
    insertedRawUser.desirableCapability,
    insertedRawUser.node,
    insertedRawUser.request,
  );
  return savedUser;
};

exports.updateUser = async (user) => {
  const dbResult = await db.users.findOneAndUpdate(
    { username: user.username },
    {
      $set: {
        photoUrl: user.photoUrl,
        displayName: user.displayName,
        dob: user.dob,
        phone: user.phone,
        activated: user.activated,
        position: user.position,
        matchDay: user.matchDay,
        desirableCapability: user.desirableCapability,
        node: user.node,
        request: user.request
      },
    },
    { returnOriginal: false }
  );
  return new User(
    dbResult.value.username,
    dbResult.value.displayName,
    dbResult.value.photoUrl,
    dbResult.value.dob,
    dbResult.value.phone,
    dbResult.value.activated,
    dbResult.value.position,
    dbResult.value.matchDay,
    dbResult.value.desirableCapability,
    dbResult.value.node,
    dbResult.value.request,
  );
};

exports.changePassword = async (user) => {
  await db.users.findOneAndUpdate(
    { username: user.username },
    {
      $set: {
        password: user.password,
        salt: user.salt,
      },
    },
    { returnOriginal: false }
  );
};
