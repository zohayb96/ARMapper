'use strict';
const crypto = require('crypto');
const { STRING, ARRAY, INTEGER, TEXT, BOOLEAN, VIRTUAL } = require('sequelize');
const db = require('../database');

const Users = db.define('users', {
  firstName: {
    type: STRING,
  },
  lastName: {
    type: STRING,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: STRING,
    get() {
      return () => this.getDataValue('salt');
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  picture: {
    type: TEXT,
  },
});

module.exports = Users;

/**
 * instanceMethods
 */
Users.prototype.correctPassword = function(candidatePwd) {
  return Users.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
Users.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

Users.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = Users.generateSalt();
    user.password = Users.encryptPassword(user.password(), user.salt());
  }
};

Users.beforeCreate(setSaltAndPassword);
Users.beforeUpdate(setSaltAndPassword);
