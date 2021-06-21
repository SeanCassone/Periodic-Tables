import { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

const DEFAULT_TABLE_STATE = {
  table_name: "",
  capacity: 1,
};

function CreateTableForReservation(params) {
  const history = useHistory;
  const [tablesError, setTablesError] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_TABLE_STATE);

  function handleChange({ target: { name, value } }) {
    if (name === "capacity") {
      value = Number(value);
    }
    setFormData({ ...formData, [name]: value });
  }

  function cancel() {
    history.goBack();
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createTable(formData, abortController.signal)
      .then(() => {
        history.push(`/dashboard/`);
      })
      .catch(setTablesError);
    return () => abortController.abort();
  };

  return (
    <div>
      <ErrorAlert error={tablesError} />
      <form onSubmit={submitHandler}>
        <div className="row g-2">
          <div className="col-md">
            <label htmlFor="first_name">Table Name</label>
            <input
              className="form-control"
              id="table_name"
              name="table_name"
              type="text"
              required={true}
              placeholder="Table Name"
              aria-label="Table name"
              onChange={handleChange}
            />
          </div>
          {/* Form input */}

          <div className="col-md">
            <label htmlFor="capacity">Capacity</label>
            <input
              className="form-control"
              id="capacity"
              name="capacity"
              type="number"
              required={true}
              placeholder="capacity"
              aria-label="capacity"
              min="1"
              max="50"
              onChange={handleChange}
            />
          </div>
          {/* Form input */}
        </div>
        <div className="d-flex">
          <button type="submit" className="btn btn-primary ml-1 mt-2">
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-danger ml-1 mt-2"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
        {/* Button Group */}
      </form>
    </div>
  );
}
export default CreateTableForReservation;
