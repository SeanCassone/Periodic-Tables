import { useHistory } from "react-router-dom";
import { finishTable } from "../utils/api";

function TablesList({ tables }) {
  const history = useHistory();
  function handleFinishTable({ target }) {
    const result = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (result) {
      const table_id = target.id;

      const abortController = new AbortController();

      finishTable(table_id, abortController.signal).then(() => {
        history.push("/");
      });
    }
  }

  const tablesTableBody = tables.map((table) => {
    return (
      <tbody key={table.table_id}>
        <tr>
          <th scope="row">{table.table_id}</th>
          <td>{table.reservation_id}</td>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td>
            <p data-table-id-status={table.table_id}>
              {table.reservation_id ? "Occupied" : "Free"}
            </p>
          </td>

          <td>
            {table.reservation_id && (
              <button
                className="btn btn-primary ml-1 mt-2"
                id={table.table_id}
                data-table-id-finish={table.table_id}
                value={table.reservation_id}
                onClick={handleFinishTable}
              >
                Finish
              </button>
            )}
          </td>
        </tr>
      </tbody>
    );
  });
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
            <th scope="col">Finish</th>
          </tr>
        </thead>
        {tablesTableBody}
      </table>
    </div>
  );
}
export default TablesList;
