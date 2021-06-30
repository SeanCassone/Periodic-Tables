import { Link, useHistory } from "react-router-dom";
import { updateStatus } from "../utils/api";
import { formatAsTime } from "../utils/date-time";

function ReservationTableBody({ reservation }) {
  const history = useHistory();

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
      key={reservation.reservation_id}
    >
      <tr>
        <th scope="row">{reservation.reservation_id}</th>
        <td>{reservation.reservation_date}</td>
        <td>{formatAsTime(reservation.reservation_time)}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.people}</td>

        <td className="text-center">
          <Link
            className="btn btn-warning"
            to={`/reservations/${reservation.reservation_id}/edit`}
          >
            <i className="bi bi-pencil-square" />
            &nbsp;Edit
          </Link>
        </td>
        <td>
          <button
            onClick={cancelReservation}
            className="btn btn-danger"
            data-reservation-id-cancel={reservation.reservation_id}
          >
            <i className="bi bi-trash2" />
            &nbsp;Cancel
          </button>
        </td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
        <td className="text-center">
          {reservation.status === "booked" && (
            <Link
              className="btn btn-success ml-1"
              to={`/reservations/${reservation.reservation_id}/seat`}
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
