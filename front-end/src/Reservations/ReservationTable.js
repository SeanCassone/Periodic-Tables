import ReservationTableBody from "./ReservationTableBody";

function ReservationList({ reservations }) {
  const currentReservations = reservations
    .filter((reservation) => reservation.status !== "cancelled")
    .map((reservation) => {
      return (
        <ReservationTableBody
          reservation={reservation}
          key={reservation.reservation_id}
        />
      );
    });

  return (
    <div className="row justify-content-center">
      <div className="col-auto">
        <table className="table table-sm table-hover table-responsive mt-2">
          <thead className="thead-dark text-center">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">First name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Party of</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          {reservations.length ? currentReservations : null}
        </table>
        {!reservations.length ? <h5>No reservations found.</h5> : null}
      </div>
    </div>
  );
}

export default ReservationList;
