const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_FIELDS = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

// ********* Middleware Functions ******************

function hasValidFields(req, res, next) {
  const { data } = req.body;
  // returns 400 if data is missing
  if (!data) {
    return next({
      status: 400,
      message: "request recieved is empty.",
    });
  }
  // returns 400 if any field is empty or missing
  for (const field of VALID_FIELDS) {
    if (!data[field]) {
      return next({
        status: 400,
        message: `reservation must include a ${field}`,
      });
    }
  }
  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (!reservation) {
    return next({
      status: 404,
      message: `Reservation ${reservation_id} cannot be found.`,
    });
  }
  res.locals.reservation = reservation;
  next();
}

function hasValidDateTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  // sets currentDate to today
  const currentDate = new Date();
  // returns a new date instance given the current reservation date and time
  const reservationDate = new Date(reservation_date + " " + reservation_time);
  // gets the day of the reservation as a number. Number 2 is equal to Tuesday
  const weekday = reservationDate.getDay();
  // gets the reservation hour
  const reservationHour = reservationDate.getHours();
  // gets the reservation minutes
  const reservationMinutes = reservationDate.getMinutes();
  // formats the hours and minutes in this shape 00:00
  const reservationTime = `${reservationHour}:${reservationMinutes}`;

  // validates reservation_time is in 00:00 format
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!reservation_time.match(regex)) {
    return next({
      status: 400,
      message: "reservation_time is not valid time.",
    });
  }
  // validates reservation_date is not a valid date
  if (isNaN(reservationDate)) {
    return next({
      status: 400,
      message: "reservation_date is not valid date.",
    });
  }
  // validates reservation is not prior to current date
  if (reservationDate < currentDate) {
    return next({
      status: 400,
      message: "Only future reservations are allowed.",
    });
  }
  // validates reservation is on a tuesday
  if (weekday === 2) {
    return next({
      status: 400,
      message:
        "Reservation day is Tuesday. The restaurant is closed on Tuesdays .",
    });
  }

  // Validates that reservation time is during buisness hours
  if (reservationTime < "10:30" || reservationTime > "21:30") {
    return next({
      status: 400,
      message: "The reservation time must be between 10:30AM and 10:30PM.",
    });
  }
  next();
}

function hasValidReservationStatus(req, res, next) {
  const { status } = req.body.data;
  const validStatus = ["booked", "seated", "finished", "cancelled"];
  if (!validStatus.includes(status)) {
    return next({
      status: 400,
      message: `Status ${status} is not valid.`,
    });
  }
  next();
}

function hasValidNumberOfPeople(req, res, next) {
  const { people } = req.body.data;
  if (typeof people !== "number" || people < 1) {
    return next({
      status: 400,
      message: "number of people is not a valid number.",
    });
  }
  next();
}

function hasBookedStatus(req, res, next) {
  const { status } = req.body.data;
  if (status === "seated" || status === "finished") {
    return next({
      status: 400,
      message: "Status must not be seated or finished.",
    });
  }
  next();
}

function hasFinishedStatus(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "finished") {
    return next({
      status: 400,
      message: `Status ${status} cannot be updated.`,
    });
  }
  next();
}

// ********* Handlers for Reservation resources *************

async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (date) {
    res.json({ data: await service.list(date) });
  } else if (mobile_number) {
    res.json({ data: await service.search(mobile_number) });
  }
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({ data: newReservation });
}

function read(req, res, next) {
  const data = res.locals.reservation;
  res.status(200).json({ data: data });
}

async function updateStatus(req, res) {
  const { reservation_id } = req.params;
  const updatedReservation = {
    ...req.body.data,
    reservation_id: reservation_id,
  };
  const updateStatus = await service.update(updatedReservation);
  res.json({ data: updateStatus });
}

async function updateReservation(req, res) {
  const { reservation_id } = req.params;
  const updatedReservation = {
    ...req.body.data,
    reservation_id: reservation_id,
  };
  const updateRes = await service.update(updatedReservation);
  res.json({ data: updateRes });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    hasFinishedStatus,
    hasValidReservationStatus,
    asyncErrorBoundary(updateStatus),
  ],
  updateReservation: [
    asyncErrorBoundary(reservationExists),
    hasValidFields,
    hasValidDateTime,
    hasValidNumberOfPeople,
    asyncErrorBoundary(updateReservation),
  ],
  create: [
    hasValidFields,
    hasValidNumberOfPeople,
    hasValidDateTime,
    hasBookedStatus,
    asyncErrorBoundary(create),
  ],
};
