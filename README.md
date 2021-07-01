# Periodic Tables

This is a reservation apllication that was designed for use with restaurants.

Live Application
[Periodic Tables](https://periodic-tables-client.herokuapp.com/)

## Use Summary:

This application is intended for those who work in a restaurant to create and keep track of reservations. Customer's cannot make reservations themselves, and it is intended for workers to take reservations over the phone or in person. Reservations can be created, cancelled, searched for, displayed by date, and assigned to specific tables. Restaurant workers can create new entries for however many tables there are in the restaurant and then assign reservations to specific tables. The reservations are color coded gray for booked or blue for seated. The Tables are color coded green are free and yellow are occupied.

## Technology Used:

- PostgreSQL
- Express
- React
- Node.js
- JavaScript
- Knex
- Cors
- Bootstrap

## Screenshots

### Dashbaord

![Dashboard](/screenshots/periodic-tables-dashboard.jpg)

### Search

![Search](/screenshots/periodic-tables-search.jpg)

### New Reservation

![New Reservation](/screenshots/periodic-tables-new-reservation.jpg)

### New Table

![New Table](/screenshots/periodic-tables-new-table.jpg)

## API Documentation

The table below describes the reservation resource

| Reservations API Available Paths & Methods  | Description                                                             |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| GET `/reservations`                         | Returns all reservations                                                |
| GET `/reservations?date={date} `            | Returns all reservations for that date in the format date=YYYY-MM-DD    |
| POST `/reservations`                        | Creates a new reservation with a unique `reservation_id`                |
| PUT `/reservations/{reservation_id}`        | Edits a specific reservation for the given `reservation_id`             |
| PUT `/reservations/{reservation_id}/status` | Updates status of a specific reservation for the given `reservation_id` |

The table below describes the tables resource

| Tables API Available Paths & Methods | Description                                                             |
| ------------------------------------ | ----------------------------------------------------------------------- |
| GET `/tables`                        | Returns all tables                                                      |
| POST `/tables`                       | Creates a new table with a unique `table_id`                            |
| PUT `/tables/{table_id}/seat`        | Assigns a reservation to the table by adding the `reservation_id`       |
| DELETE `/tables/{table_id}/seat`     | Updates status of a specific reservation for the given `reservation_id` |

The table below describes the folders in this repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./back-end`     | The backend project, which runs on `localhost:5000` by default.  |
| `./front-end`    | The frontend project, which runs on `localhost:3000` by default. |

### Knex

Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.
