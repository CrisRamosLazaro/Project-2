const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        },

        //integration with GoogleMaps api?
        location: {
            type: String,
            required: true,
        },

        description: {
            type: String,
        },

        rating: {

        }
    },
    {
        timestamps: true
    }
);


const Review = model("Review", reviewSchema);

module.exports = Review;
