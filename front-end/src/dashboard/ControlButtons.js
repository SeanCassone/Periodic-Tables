import { useHistory } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
function ControlButtons({ date }) {
  const history = useHistory();

  const handleTodaysDate = () => {
    history.push(`dashboard?date=${today()}`);
  };
  const handlePreviousDate = () => {
    history.push(`dashboard?date=${previous(date)}`);
  };
  const handleNextDate = () => {
    history.push(`dashboard?date=${next(date)}`);
  };

  return (
    <div
      className="btn-group btn-group-lg btn-block"
      aria-label="Today next and previous day buttons"
    >
      <button type="submit" className="btn btn-info" onClick={handleTodaysDate}>
        Today
      </button>
      <button type="submit" className="btn btn-info" onClick={handleNextDate}>
        Next
      </button>
      <button
        type="submit"
        className="btn btn-info"
        onClick={handlePreviousDate}
      >
        Previous
      </button>
    </div>
  );
}

export default ControlButtons;
