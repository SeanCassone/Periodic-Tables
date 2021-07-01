import { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationTable from "./ReservationTable";
import ErrorAlert from "../layout/ErrorAlert";

function SearchByMobile() {
  const [reservations, setReservations] = useState({});
  const [searchError, setSearchError] = useState(null);
  const [formData, setFormData] = useState({ mobile_number: "" });

  const abortController = new AbortController();
  function submitHandler(event) {
    event.preventDefault();
    listReservations(formData, abortController.signal)
      .then(setReservations)
      .catch(setSearchError);
    return () => abortController.abort();
  }

  function handleChange({ target: { name, value } }) {
    setFormData((previousSearch) => ({
      ...previousSearch,
      [name]: value,
    }));
  }

  return (
    <>
      <ErrorAlert error={searchError} />
      <div className="card mt-3 mx-auto" style={{ width: "22rem" }}>
        <div className="card-body text-white bg-secondary">
          <h5 className="card-title text-center">Search by mobile number.</h5>
          <form onSubmit={submitHandler}>
            <input
              name="mobile_number"
              className="form-control"
              id="mobile_number"
              type="tel"
              placeholder="Enter a customer's phone number"
              required={true}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-primary active mt-2"
              htmlFor="mobile_number"
            >
              <i className="bi bi-search mr-2" />
              Find
            </button>
          </form>
        </div>
      </div>
      <div>
        {reservations.length ? (
          <ReservationTable reservations={reservations} />
        ) : (
          <h6 className="text-center">No reservations found from Search.</h6>
        )}
      </div>
    </>
  );
}

export default SearchByMobile;
