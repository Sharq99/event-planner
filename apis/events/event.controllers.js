const Event = require('../../database/models/Event');

exports.createEvent = async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.fetchEvent = async (req, res) => {
    try {
        const events  = await Event.find({}, '-createdAt -updatedAt');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.detailEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const foundEvent = await Event.findById(eventId);
        if (foundEvent) {
            res.status(200).json(foundEvent);
        } else {
            res.status(404).json({ message: "Event not found" });
        }   
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const foundEvent = await Event.findById(eventId);
        if(foundEvent){
            updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {new:true});
            res.status(200).json(updatedEvent);
        } else{res.status(404).json({ message: "Event not found" });}
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const foundEvent = await Event.findById(eventId);
        if (foundEvent) {
            await foundEvent.remove();
            res.status(204).end();
        } else {
            res.status(404).json({ message: "Event not found" });
        }   
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.fullyBookedEvent = async (req, res) => {
    try {
        const events  = await Event.find({}, '-createdAt -updatedAt');

        const fBooked = events.filter(event => event.numOfSeats === event.bookedSeats)
        
        if (fBooked.length !== 0) { 
            res.status(200).json(fBooked);   
        } else {
            res.status(404).json({ message: "No Fully Booked Events" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.searchEvent = async (req, res) => {
    try {
        const events = await Event.find({name: { $regex: req.params.query, $options: "i" }, });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

exports.eventListFetch = async (req, res) => {
    try {
        const events = await Event.find( {},
            {
            __id: true,
            name: true,
            image: true,
            startDate: true,
            // numOfSeats: true,
            }, { sort: { startDate: "asc", name: "asc" }, });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};