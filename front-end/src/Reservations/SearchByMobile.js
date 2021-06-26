import { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationList from "./ReservationList";
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
    <div>
      <ErrorAlert error={searchError} />
      <h4 className="mt-3">Search by mobile number.</h4>
      <form className="my-3" onSubmit={submitHandler}>
        <div className="input-group">
          <button
            type="submit"
            className="btn btn-primary active ml-1 input-group-text"
            htmlFor="mobile_number"
          >
            Find
          </button>
          <input
            name="mobile_number"
            className="form-control"
            id="mobile_number"
            type="tel"
            placeholder="Enter a customer's phone number"
            required={true}
            onChange={handleChange}
          />
        </div>
      </form>
      {reservations.length ? (
        <ReservationList reservations={reservations} />
      ) : (
        <h4>No reservations found</h4>
      )}
    </div>
  );
}

export default SearchByMobile;
