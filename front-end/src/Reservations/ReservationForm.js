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
    <form onSubmit={submitHandler}>
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
        </div>
        {/* Form input Last Name */}
      </div>
      {/* Form Group */}
      <div className="row g-2">
        <div className="col-md">
          <label htmlFor="last_name">Mobile number</label>
          <input
            className="form-control"
            name="mobile_number"
            type="tel"
            required={true}
            onChange={handleChange}
            defaultValue={mobile_number}
          />
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
        </div>
        {/* Form input Number of people*/}
      </div>
      {/* Form Group */}
      <div className="row g-2">
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
        </div>
        {/* Form input Reservation Time*/}
      </div>
      {/* Form Group */}
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
  );
}

export default Form;
