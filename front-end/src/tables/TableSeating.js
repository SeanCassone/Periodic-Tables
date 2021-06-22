function TableSeating(params) {
  /**
   *
   * get reservation id from params
   *
   * set state for form data, tables, errors
   * need useEffect call to:
   *    get the list of tables and set the tables state - catch errors
   *
   * filter tables by revervation id of null and capacity greater or equal to people
   *
   * create Submit button that, when clicked, assigns the table to the reservation then
   * displays the /dashboard page,
   * 1. PUT to /tables/:table_id/seat/ in order to save the table assignment.
   * 2. The body of the request must be { data: { reservation_id: x } } where X is
   *      the reservation_id of the reservation being seated
   *
   *  display a Cancel button that, when clicked, returns the user to the previous page
   */
  return <h2>Seating</h2>;
}
export default TableSeating;
