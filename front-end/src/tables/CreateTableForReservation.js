import { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

const DEFAULT_TABLE_STATE = {
  table_name: "",
  capacity: 1,
};

function CreateTableForReservation(params) {
  const history = useHistory();
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
      <div className="card mt-3" style={{ width: "25rem" }}>
        <div className="card-body text-white bg-secondary">
          <h5 className="card-title">Create New Table</h5>
          <form className="mb-3" onSubmit={submitHandler}>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="table_name">
                Name
              </label>
              <input
                className="form-control"
                id="table_name"
                name="table_name"
                type="text"
                placeholder=""
                aria-label="table-name"
                aria-describedby="table-name"
                required={true}
                onChange={handleChange}
              />
            </div>
            {/* Form Group */}
            <div className="input-group mb-3">
              <span className="input-group-text" id="capacity">
                Capacity
              </span>
              <input
                className="form-control"
                id="capacity"
                name="capacity"
                type="number"
                placeholder=""
                aria-label="capacity"
                aria-describedby="capacity"
                required={true}
                min="1"
                max="50"
                onChange={handleChange}
              />
            </div>
            {/* Form Group */}
            <div className="d-flex">
              <button type="submit" className="btn btn-primary mt-1">
                <i className="bi bi-file-plus mr-2" />
                Submit
              </button>
              <button
                type="submit"
                className="btn btn-danger ml-2 mt-1"
                onClick={cancel}
              >
                <i className="bi bi-trash2 mr-2"></i>
                Cancel
              </button>
            </div>
            {/* Button Group */}
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateTableForReservation;
