import { useHistory, Link } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";

function ReservationList({ date, reservations }) {
  const history = useHistory();

  const handleTodaysDate = () => {
    history.push(`dashboard?date=${today()}`);
  };
  const handlePreviousDate = () => {
    history.push(`dashboard?date=${previous(date)}`);
  };
  const handleNextDate = () => {
    history.push(`dashboard?date=${next(date)}`);
  };

  const controlButtons = () => {
    return (
      <div
        className="btn-group btn-group-lg btn-block"
        aria-label="Today next and previous day buttons"
      >
        <button
          type="submit"
          className="btn btn-info"
          onClick={handleTodaysDate}
        >
          Today
        </button>
        <button type="submit" className="btn btn-info" onClick={handleNextDate}>
          Next
        </button>
        <button
          type="submit"
          className="btn btn-info"
          onClick={handlePreviousDate}
        >
          Previous
        </button>
      </div>
    );
  };

  const ReservationsTableBody = reservations.map(
    ({
      reservation_id,
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    }) => {
      return (
        <tbody key={reservation_id}>
          <tr>
            <th scope="row">{reservation_id}</th>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{first_name}</td>
            <td> {last_name}</td>
            <td>{mobile_number}</td>
            <td>{people}</td>
            <td className="text-center">
              <Link
                className="btn btn-primary ml-1 mt-2"
                to={`/reservations/${reservation_id}/seat`}
              >
                Seat
              </Link>
            </td>
          </tr>
        </tbody>
      );
    }
  );
  return (
    <div>
      <div className="mb-3">{controlButtons()}</div>
      <table className="table table-hover table-responsive">
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">First name</th>
            <th scope="col">Last name</th>
            <th scope="col">Phone</th>
            <th scope="col">Party of</th>
            <th scope="col">Seating</th>
          </tr>
        </thead>
        {reservations.length ? ReservationsTableBody : null}
      </table>
    </div>
  );
}

export default ReservationList;
