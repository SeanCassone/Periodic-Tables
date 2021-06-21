const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const VALID_FIELDS = ["table_name", "capacity"];

async function hasValidFields(req, res, next) {
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

async function hasValidTableName(req, res, next) {
  const { table_name } = req.body.data;
  //returns 400 if table name is one character
  if (table_name.length <= 1) {
    return next({
      status: 400,
      message: `The table_name must be more than one character`,
    });
  }
  next();
}

async function hasValidCapacity(req, res, next) {
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

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasValidFields),
    asyncErrorBoundary(hasValidTableName),
    asyncErrorBoundary(hasValidCapacity),
    asyncErrorBoundary(create),
  ],
};
