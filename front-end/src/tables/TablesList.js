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
      <tbody
        className={
          table.reservation_id
            ? "bg-warning text-center"
            : "bg-success text-center"
        }
        key={table.table_id}
      >
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
                className="btn btn-danger ml-1"
                id={table.table_id}
                data-table-id-finish={table.table_id}
                value={table.reservation_id}
                onClick={handleFinishTable}
              >
                <i className="bi bi-trash2" />
                &nbsp;Finish
              </button>
            )}
          </td>
        </tr>
      </tbody>
    );
  });
  return (
    <div className="row justify-content-center">
      <div className="col-auto">
        <table className="table table-sm table-hover table-responsive">
          <thead className="thead-dark text-center">
            <tr>
              <th scope="col">Table Id</th>
              <th scope="col">Reservation Id</th>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>

          {tablesTableBody}
        </table>
      </div>
    </div>
  );
}
export default TablesList;
