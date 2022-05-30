const express = require('express');

const { createEvent, fetchEvent, detailEvent, updateEvent, deleteEvent, fullyBookedEvent, searchEvent } = require("./event.controllers");
const router = express.Router();

router.get("/fully-booked", fullyBookedEvent);

router.get("/search/:query", searchEvent);

router.post("/", createEvent);

router.get('/', fetchEvent);

router.get("/:eventId", detailEvent);

router.put("/:eventId", updateEvent);

router.delete("/:eventId", deleteEvent);


module.exports = router;