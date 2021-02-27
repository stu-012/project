const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class User {
  username;
  password;
  salt;
  displayName;
  photoUrl;
  dob;
  phone;
  activated;
  position;
  matchDay;
  desirableCapability;
  node;
  request;


  constructor(username, displayName, photoUrl, dob, phone, activated, position, matchDay, desirableCapability, node, request) {
    this.username = username;
    this.displayName = displayName;
    this.photoUrl = photoUrl;
    this.dob = dob;
    this.phone = phone;
    this.activated = activated;
    this.position = position;
    this.matchDay = matchDay;
    this.desirableCapability = desirableCapability;
    this.node = node;
    this.request = request;
  }

  generatePassword(password) {
    this.salt = crypto.randomBytes(128).toString("base64");
    this.password = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
  }

  verifyPassword(password) {
    const hashedPassword = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
    return this.password === hashedPassword;
  }

  generateToken() {
    return jwt.sign({ username: this.username }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
  }

  toJson() {
    return {
      username: this.username,
      displayName: this.displayName,
      photoUrl: this.photoUrl,
      dob: this.dob,
      phone: this.phone,
      activated: this.activated,
      position: this.position,
      matchDay: this.matchDay,
      desirableCapability: this.desirableCapability,
      node: this.node,
      request: this.request,
    };
  }
}

module.exports = User;
