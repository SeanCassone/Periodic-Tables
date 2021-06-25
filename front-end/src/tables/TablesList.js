function TablesList({ tables }) {
  const tablesTableBody = tables.map(
    ({ reservation_id, table_id, table_name, capacity }) => {
      return (
        <tbody key={table_id}>
          <tr>
            <th scope="row">{table_id}</th>
            <td>{reservation_id}</td>
            <td>{table_name}</td>
            <td>{capacity}</td>
            <td>
              <p data-table-id-status={tables.table_id}>
                {tables.reservation_id ? "Occupied" : "Free"}
              </p>
            </td>
          </tr>
        </tbody>
      );
    }
  );
  return (
    <div>
      <table className="table table-hover table-responsive">
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Res. ID</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {tablesTableBody}
      </table>
    </div>
  );
}
export default TablesList;
