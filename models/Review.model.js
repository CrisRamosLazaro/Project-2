const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        comment: {
            type: String,
        },

        rating: {
            type: Number,
            min: 1,
            max: 5
        }

    },
    {
        timestamps: true
    }
);


const Review = model("Review", reviewSchema);

module.exports = Review;
