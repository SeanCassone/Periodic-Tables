import { Link, useHistory } from "react-router-dom";
import { updateStatus } from "../utils/api";
import {
  formatMobile,
  formatDate,
  formatTime,
} from "../utils/convertDateTimeTelephone";

function ReservationTableBody({ reservation }) {
  const history = useHistory();
  const {
    mobile_number,
    reservation_time,
    reservation_date,
    reservation_id,
    first_name,
    last_name,
    people,
    status,
  } = reservation;

  const reservationDate = new Date(`${reservation_date} ${reservation_time}`);

  function cancelReservation() {
    const abortController = new AbortController();
    const result = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (result) {
      const status = "cancelled";
      updateStatus(
        status,
        reservation.reservation_id,
        abortController.signal
      ).then(() => {
        history.push("/");
      });
    }
  }

  return (
    <tbody
      className={
        reservation.status === "seated"
          ? "bg-primary text-white text-center"
          : "bg-secondary text-white text-center"
      }
      key={reservation_id}
    >
      <tr>
        <th scope="row">{reservation_id}</th>
        <td>{reservation_date.toLocaleString()}</td>
        <td>{formatTime(reservationDate)}</td>
        <td>{`${first_name} ${last_name}`}</td>
        <td>{formatMobile(mobile_number)}</td>
        <td>{people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {status}
        </td>
        <td className="text-center">
          <Link
            className="btn btn-warning ml-1"
            to={`/reservations/${reservation_id}/edit`}
          >
            <i className="bi bi-pencil-square" />
            &nbsp;Edit
          </Link>
        </td>
        <td>
          <button
            onClick={cancelReservation}
            className="btn btn-danger ml-1"
            data-reservation-id-cancel={reservation.reservation_id}
          >
            <i className="bi bi-trash2" />
            &nbsp;Cancel
          </button>
        </td>

        <td className="text-center">
          {reservation.status === "booked" && (
            <Link
              className="btn btn-success ml-1"
              to={`/reservations/${reservation_id}/seat`}
            >
              <i className="bi bi-person-plus" />
              &nbsp;Seat
            </Link>
          )}
        </td>
      </tr>
    </tbody>
  );
}

export default ReservationTableBody;
