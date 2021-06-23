const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const {
  read: readReservation,
} = require("../reservations/reservations.service");

const VALID_FIELDS = ["table_name", "capacity"];
// const bodyHasRequiredProperties = hasProperties(VALID_FIELDS);
// const bodyHasRequiredUpdateProperties = hasProperties();

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

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  // returns 400 if data is missing
  if (!data) {
    return next({
      status: 400,
      message: "request recieved is empty.",
    });
  }
  const invalidFields = Object.keys(data).filter((field) => {
    !VALID_PROPERTIES.includes(field);
  });
  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(",")}`,
    });
  next();
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (!table) {
    next({
      status: 404,
      message: `table_id ${table_id} not found.`,
    });
  }
  res.locals.table = table;
  return next();
}

function tableOccupied(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (!reservation_id) {
    return next({
      status: 400,
      message: "Table is not occupied.",
    });
  }
  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.body.data;

  // console.log(reservation_id);
  const reservation = await readReservation(reservation_id);
  if (!reservation) {
    return next({
      status: 404,
      message: `reservation_id ${reservation_id} not found.`,
    });
  }
  res.locals.reservation = reservation;
  next();
}

function hasValidTableName(req, res, next) {
  const { table_name } = req.body.data;
  //returns 400 if table name is one character
  if (table_name.length < 2) {
    return next({
      status: 400,
      message: `The table_name must be more than one character`,
    });
  }
  next();
}

function hasValidCapacity(req, res, next) {
  const { capacity } = req.body.data;
  //returns 400 if capacity is not a number
  if (capacity !== Number(capacity)) {
    return next({
      status: 400,
      message: `capacity must be a number`,
    });
  }
  //returns 400 if capacity is equal to zero
  if (capacity === 0) {
    return next({
      status: 400,
      message: `capacity must be greater than 0`,
    });
  }
  next();
}
// Create handler for reservation resources
async function create(req, res) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({ data: newTable });
}

async function update(req, res) {
  const { table_id } = req.params;
  const updatedTable = {
    ...req.body.data,
    table_id: table_id,
  };
  const data = await service.update(updatedTable);
  res.status(200).json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasValidFields,
    hasValidCapacity,
    hasValidTableName,
    asyncErrorBoundary(create),
  ],
  update: [
    // asyncErrorBoundary(tableExists),
    // asyncErrorBoundary(reservationExists),
    hasValidCapacity,
    tableOccupied,
  ],
};
