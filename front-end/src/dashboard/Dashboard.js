import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import ReservationTable from "../Reservations/ReservationTable";
import TablesList from "../tables/TablesList";
import ControlButtons from "./ControlButtons";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const query = useQuery().get("date");
  if (query) date = query;

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <h4>Reservations for: {date}</h4>
        <ErrorAlert error={reservationsError} />
        <ControlButtons date={date} />
        <ReservationTable date={date} reservations={reservations} />
        <h4>Tables</h4>
        <ErrorAlert error={tablesError} />
        <TablesList tables={tables} />
      </div>
    </main>
  );
}

export default Dashboard;
