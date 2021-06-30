function Form({ formData, handleChange, submitHandler, cancel }) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = formData;
  return (
    <form className="was-validated" noValidate onSubmit={submitHandler}>
      <div className="row g-2">
        <div className="col-md">
          <label htmlFor="first_name">First Name</label>
          <input
            className="form-control"
            name="first_name"
            type="text"
            required={true}
            onChange={handleChange}
            defaultValue={first_name}
          />
          <div className="invalid-feedback">
            Please provide a valid first name.
          </div>
        </div>
        {/* Form input First Name*/}

        <div className="col-md">
          <label htmlFor="last_name">Last Name</label>
          <input
            className="form-control"
            name="last_name"
            type="text"
            required={true}
            onChange={handleChange}
            defaultValue={last_name}
          />
          <div className="invalid-feedback">
            Please provide a valid last name.
          </div>
        </div>
        {/* Form input Last Name */}
      </div>
      {/* Form Group */}
      <div className="row g-2">
        <div className="col-md">
          <label htmlFor="mobile_number">Mobile number</label>
          <input
            className="form-control"
            name="mobile_number"
            type="tel"
            required={true}
            onChange={handleChange}
            defaultValue={mobile_number}
          />
          <small className="invalid-feedback">
            Please provide a valid mobile number.
          </small>
        </div>
        {/* Form input */}
        <div className="col-md">
          <label htmlFor="people">Number of people</label>
          <input
            className="form-control"
            name="people"
            type="number"
            required={true}
            onChange={handleChange}
            defaultValue={people}
          />
          <div className="invalid-feedback">
            Number of people must be at least 1.
          </div>
        </div>
        {/* Form input Number of people*/}

        <div className="col-md">
          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            className="form-control"
            name="reservation_date"
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            required={true}
            onChange={handleChange}
            defaultValue={reservation_date}
          />
          <div className="invalid-feedback">
            Only future reservations are allowed.
          </div>
          <div className="invalid-feedback">
            The restaurant is closed on Tuesdays.
          </div>
        </div>
        {/* Form input Reservation Date*/}
        <div className="col-md">
          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            className="form-control"
            name="reservation_time"
            type="time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            required={true}
            onChange={handleChange}
            defaultValue={reservation_time}
          />
          <div className="invalid-feedback">
            The reservation time must be between 10:30AM and 9:30PM.
          </div>
        </div>
        {/* Form input Reservation Time*/}
      </div>
      {/* Form Group */}
      <div className="d-flex">
        <button type="submit" className="btn btn-primary ml-1 mt-2">
          <span className="oi oi-plus" />
          &nbsp;Submit
        </button>
        <button
          type="submit"
          className="btn btn-danger ml-1 mt-2"
          onClick={cancel}
        >
          <span className="oi oi-trash" />
          &nbsp;Cancel
        </button>
      </div>
      {/* Button Group */}
    </form>
  );
}

export default Form;
