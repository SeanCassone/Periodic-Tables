import { useState } from "react";
import { useHistory } from "react-router";
import createTable from "../utils/api";

const DEFAULT_TABLE_STATE = {
  table_name: "",
  capacity: "",
};

function CreateTable(params) {
  const history = useHistory;
  const [tablesError, setTablesError] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_TABLE_STATE);

  function handleChange({ target: { name, value } }) {
    setFormData({ ...formData, [name]: value });
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
    <form onSubmit={submitHandler}>
      <div className="row g-2">
        <div className="col-md">
          <label htmlFor="first_name">First Name</label>
          <input
            className="form-control"
            id="table_name"
            name="table_name"
            type="text"
            required={true}
            placeholder="table_name"
            aria-label="Table name"
            onChange={handleChange}
          />
        </div>
        {/* Form input */}

        <div className="col-md">
          <label htmlFor="capacity">Last Name</label>
          <input
            className="form-control"
            id="capacity"
            name="capacity"
            type="number"
            required={true}
            placeholder="capacity"
            aria-label="capacity"
            onChange={handleChange}
          />
        </div>
        {/* Form input */}
      </div>
    </form>
  );
}
export default CreateTable;
