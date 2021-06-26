import { Link } from "react-router-dom";
function ReservationTableBody({ reservation }) {
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
              className="btn btn-primary ml-1 mt-2"
              to={`/reservations/${reservation.reservation_id}/seat`}
            >
              Seat
            </Link>
          )}
        </td>
        <td data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </td>
      </tr>
    </tbody>
  );
}
export default ReservationTableBody;
