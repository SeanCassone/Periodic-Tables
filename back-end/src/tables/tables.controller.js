const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const reservationService = require("../reservations/reservations.service");

// ********* Middleware Functions ******************
const hasRequiredUpdateProperties = hasProperties("reservation_id");
const VALID_FIELDS = ["table_name", "capacity"];

function hasValidFields(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({
      status: 400,
      message: `Request recieved is empty.`,
    });
  }
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

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
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
  const { reservation_id } = req.body.data;
  const reservation = await reservationService.read(reservation_id);
  if (!reservation) {
    return next({
      status: 404,
      message: `Reserveration ${reservation_id} cannot be found.`,
    });
  }
  res.locals.reservation = reservation;
  next();
}

function hasValidCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (typeof capacity !== "number" || capacity === 0) {
    return next({
      status: 400,
      message: `capacity must be a number and greater than 0`,
    });
  }
  next();
}

function hasValidTableName(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length < 2) {
    return next({
      status: 400,
      message: `The table_name must be more than one character`,
    });
  }
  next();
}

function hasTableCapacity(req, res, next) {
  const { people } = res.locals.reservation;
  const { capacity } = res.locals.table;
  if (people > capacity) {
    return next({
      status: 400,
      message: `table does not have sufficient capacity`,
    });
  }
  next();
}

function isResvervationSeated(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "seated") {
    return next({
      status: 400,
      message: `Reservation is already seated`,
    });
  }
  next();
}

function tableNotOccupied(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (reservation_id) {
    return next({
      status: 400,
      message: `table is occupied`,
    });
  }
  next();
}

function tableHasReservation(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (!reservation_id) {
    return next({
      status: 400,
      message: `table is not occupied`,
    });
  }
  next();
}

// ********* Handlers for tables resources *************

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

async function update(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = req.body.data;
  const updatedTable = {
    reservation_id,
    table_id,
  };
  res.json({ data: await service.update(updatedTable) });
}

async function destroy(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = res.locals.table;
  res.json({ data: await service.destroy(table_id, reservation_id) });
}

async function list(req, res) {
  res.json({ data: await service.list() });
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
    asyncErrorBoundary(hasRequiredUpdateProperties),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(tableExists),
    isResvervationSeated,
    hasTableCapacity,
    tableNotOccupied,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    tableHasReservation,
    asyncErrorBoundary(destroy),
  ],
};
