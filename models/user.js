const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const subSchema = Schema({
  subscribed: Boolean,
  expiration: Date,
});

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 6,
    maxlength: 30,
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email!"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email!",
    },
  },

  password: {
    type: String,
    required: [true, "Please provide password!"],
    validate: {
      validator: validator.isStrongPassword,
      message:
        "Password should contain atleast 8 letters with 1 uppercase, 1 lowercase, 1 number and 1 symbol",
    },
  },

  phone: {
    type: String,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, "en-IN");
      },
      message: "Please provide a valid phone number!.",
    },
    unique: true,
  },

  role: {
    type: String,
    default: "user",
  },

  // isVerified: {
  //   type: Boolean,
  //   default: false,
  // },

  state: {
    type: String,
  },

  subscription: {
    type: [subSchema],
    default: [{ subscribed: false, expiration: "" }],
  },

  verificationToken: String,

  verified: Date,

  passwordToken: String,

  passTokenExpDate: Date,
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model("User", userSchema);
