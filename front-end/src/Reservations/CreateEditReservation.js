import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  createReservation,
  readReservation,
  updateReservation,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-time";

const DEFAULT_RESERVATION_STATE = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  reservation_date: "",
  reservation_time: "",
  people: "",
  status: "booked",
};

function CreateEditReservation() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState(DEFAULT_RESERVATION_STATE);
  const [error, setError] = useState(null);

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    if (reservation_id) {
      const abortController = new AbortController();
      setError(null);
      readReservation(reservation_id, abortController.signal)
        .then(formatReservationDate)
        .then(formatReservationTime)
        .then(setFormData)
        .catch(setError);
      return () => abortController.abort();
    }
  }

  function handleChange({ target: { name, value } }) {
    if (name === "people") {
      value = Number(value);
    }
    setFormData({ ...formData, [name]: value });
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    if (reservation_id) {
      updateReservation(formData, abortController.signal)
        .then(() => {
          history.push(`/dashboard/?date=${formData.reservation_date}`);
        })
        .catch(setError);
    } else {
      createReservation(formData, abortController.signal)
        .then(() => {
          history.push(`/dashboard/?date=${formData.reservation_date}`);
        })
        .catch(setError);
      return () => abortController.abort();
    }
  };

  function cancel() {
    history.goBack();
  }

  return (
    <div className="conatiner">
      <h4 className="mt-3">
        {reservation_id ? `Edit reservation` : `Make reservation`}
      </h4>
      <ErrorAlert error={error} />
      <ReservationForm
        submitHandler={submitHandler}
        formData={formData}
        handleChange={handleChange}
        cancel={cancel}
      />
    </div>
  );
}
export default CreateEditReservation;
