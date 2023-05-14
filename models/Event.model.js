const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },

        eventImg: {
            type: String,
            default: 'https://offloadmedia.feverup.com/secretldn.com/wp-content/uploads/2021/05/21043812/Pop-Up-Screens-4.jpg'
        },

        date: {
            type: Date,
            required: true,
        },

        time: {
            start: {
                type: String,
                required: true,
            },
            end: {
                type: String,
                required: true,
            },
        },

        //integration with GoogleMaps api?
        location: {
            type: String,
            required: true,
        },

        description: {
            type: String,
        },

        tickets: {
            type: Number,
            default: 0,
        },

        host: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: 'ADMIN'
        },

        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }],

    },
    {
        timestamps: true
    }
);


const Event = model("Event", eventSchema);

module.exports = Event;
