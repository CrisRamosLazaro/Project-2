const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String, default: 'https://i.stack.imgur.com/l60Hf.png'
    },

    description: {
      type: String,
      default: "Third extra form the right"
    },

    role: {
      type: String,
      enum: ['CINEPHILE', 'ADMIN'],
      default: 'CINEPHILE'
    },

    myGenres: [{
      type: String,
      enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Western'],
    }],

    favMovies: [{
      type: String
    }],
    myEvents: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }],
  },

  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;