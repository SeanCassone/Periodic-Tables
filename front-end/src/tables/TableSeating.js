import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  readReservation,
  listTables,
  updateTable,
  updateStatus,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TableSeating() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [formData, setFormData] = useState({ table_id: "" });
  const [reservation, setReservation] = useState({});
  const [table, setTable] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      setError(null);
      readReservation(reservation_id, abortController.signal)
        .then(setReservation)
        .catch(setError);
      listTables(abortController.signal).then(setTable).catch(setError);
      return () => abortController.abort();
    }
    loadTables();
  }, [reservation_id]);

  const openTables = table.filter(
    (table) =>
      table.reservation_id === null && table.capacity >= reservation.people
  );

  const listOptionForOpenTables = openTables.map((table) => {
    return (
      <option
        key={table.table_id}
        name={table.table_name}
        value={table.table_id}
      >
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  function handleChange({ target }) {
    setFormData({ [target.name]: target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.table_id !== "x") {
      const abortController = new AbortController();
      const status = "seated";
      updateStatus(status, reservation_id, abortController.signal);
      updateTable(
        formData.table_id,
        reservation.reservation_id,
        abortController.signal
      ).then(() => {
        history.push("/dashboard");
      });
    }
  }

  function cancel() {
    history.goBack();
  }
  return (
    <div>
      <ErrorAlert error={error} />
      <div className="card mt-3">
        <div className="card-body">
          <form className="form-inline" onSubmit={handleSubmit}>
            <label className="my-1 mr-2" htmlFor="table_id">
              Select Table
            </label>
            <select
              className="input-group-text my-1 mr-sm-2"
              name="table_id"
              id="table_id"
              onChange={handleChange}
            >
              <option value="x">Choose a table...</option>
              {listOptionForOpenTables}
            </select>
            <button type="submit" className="btn btn-primary my-1">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={cancel}
            >
              Cancel
            </button>
          </form>
        </div>
        {/* Card Body */}
      </div>
      {/* Card */}
    </div>
  );
}
export default TableSeating;
