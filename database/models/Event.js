const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// const product = await Product.findOne({
//     name: req.name
//   });
//   if (product) {
//     res.status(400).json({
//       success: false,
//       message: "Product Name Is Not Unique"
//     });
//     return;
//   } values: ['Event', 'event'], message: '{VALUE} is not supported'

const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const setMin = (value) => {
    setSeats(value);
    return 5;
};

const setSeats = (max) => {
    return max
};

let bookedmax = setSeats();

const EventSchema = new Schema({

    organizer: { type: String, required: true, maxlength: [20, 'Should Not Exceed 20 Characters'], unique: true },
    name: { type: String, required: true, validate: { validator(value) {return !value.includes("event")}, message: "Event Name Should Not Include the word event" } },
    email: { 
        type: String, required: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    image: { type: String, required: true },
    numOfSeats: { type: Number, required: true, default: 5, min: 5 },
    bookedSeats: { type: Number, required: true, default: 0, validate: { validator(value) {return value <= this.numOfSeats}, message: "Booked Seats Should Be Less than or Equal Number of seats" } },
    startDate: { type: Date, default: Date.now  },
    endDate: { type: Date, default: Date.now, validate: { validator(value) {return value > this.startDate}, message: "Your End Date Should Be After The Start Date" }  },
});

module.exports = model("Event", EventSchema);

// validate: [validateName, 'Event Name Should Not Include the word Event/event']