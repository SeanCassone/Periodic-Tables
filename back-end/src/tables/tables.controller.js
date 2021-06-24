const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const reservationService = require("../reservations/reservations.service");

const VALID_FIELDS = ["table_name", "capacity"];

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
        message: `Request must include a ${field}`,
      });
    }
  }
  next();
}

const hasRequiredProperties = hasProperties("table_name", "capacity");

const hasRequiredUpdateProperties = hasProperties("reservation_id");

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

async function tableExists(req, res, next) {
  const { table_id } = req.params;

  const table = await services.read(table_id);
  if (!table) {
    return next({
      status: 404,
      message: `Table ${table_id} cannot be found.`,
    });
  }
  res.locals.table = table;
  next();
}

async function reservationExists(req, res, next) {
  if (!req.body.data.reservation_id)
    return next({
      status: 404,
      message: "Form cannot be empty, must include reservation_id",
    });

  const { reservation_id } = req.body.data;
  const reservation = await reservationService.read(reservation_id);

  if (!reservation || reservation.length < 1) {
    return next({
      status: 404,
      message: `Reserveration ${reservation_id} cannot be found.`,
    });
  }
  res.locals.reservation = reservation;
  next();
}

function validCapacity(req, res, next) {
  const { people } = res.locals.reservation;
  const { capacity } = res.locals.table;
  console.log(people, capacity);
}

// Create handler for table resources
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
  res.json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasValidFields,
    hasRequiredProperties,
    hasValidTableName,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(hasRequiredUpdateProperties),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(update),
  ],
};
