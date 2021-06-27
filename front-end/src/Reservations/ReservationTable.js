import ReservationTableBody from "./ReservationTableBody";

function ReservationList({ reservations }) {
  const currentReservations = reservations.map((reservation) => {
    return (
      <ReservationTableBody
        reservation={reservation}
        key={reservation.reservation_id}
      />
    );
  });

  return (
    <div>
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
            <th scope="col">Edit</th>
            <th scope="col">Cancel</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {reservations.length ? currentReservations : null}
      </table>
      {!reservations.length ? <h5>No reservations found.</h5> : null}
    </div>
  );
}

export default ReservationList;
