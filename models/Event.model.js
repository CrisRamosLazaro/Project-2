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
            start: {
                type: Date,
                required: true,
            },
            end: {
                type: Date,
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
            total: Number,
            available: Number
        },

        host: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }],

        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]

    },
    {
        timestamps: true
    }
);


const Event = model("Event", eventSchema);

module.exports = Event;
