import { Link, useHistory } from "react-router-dom";

import { updateStatus } from "../utils/api";
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
    <tbody key={reservation.reservation_id}>
      <tr>
        <th scope="row">{reservation.reservation_id}</th>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.first_name}</td>
        <td> {reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.people}</td>
        <td className="text-center">
          {reservation.status === "booked" && (
            <Link
              className="btn btn-primary ml-1"
              to={`/reservations/${reservation.reservation_id}/seat`}
            >
              Seat
            </Link>
          )}
        </td>
        <td className="text-center">
          <Link
            className="btn btn-primary ml-1"
            to={`/reservations/${reservation.reservation_id}/edit`}
          >
            Seat
          </Link>
        </td>
        <td>
          <button
            onClick={cancelReservation}
            className="btn btn-primary"
            data-reservation-id-cancel={reservation.reservation_id}
          >
            Cancel
          </button>
        </td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
      </tr>
    </tbody>
  );
}
export default ReservationTableBody;
