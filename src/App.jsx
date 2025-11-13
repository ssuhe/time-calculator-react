import "./App.css";
import { useEffect } from "react";
import { useJob, useTime } from "./hooks";
import Button from "./components/button";
import Table from "./components/table";
import { getJobTableHeader, getReportTableHeader, getTimeTableHeader } from "./utils";

export default function App() {
  const timeState = useTime();
  const jobState = useJob();

  const jobTableHeader = getJobTableHeader({
    handleJobChanges: jobState.changeIdxOf,
    deleteJob: jobState.deleteIdxOf,
  });

  const timeTableHeader = getTimeTableHeader({
    jobTypes: jobState.types,
    handleJobChanges: timeState.changeIdxOfJobType,
    handleTimeChanges: timeState.changeIdxOfTime,
    deleteTime: timeState.deleteIdxOf,
  });
  const reportTableHeader = getReportTableHeader({
    jobTypes: jobState.types
  })

  const saveInStore = () => {
    timeState.saveInStorage();
    jobState.saveInStorage();
  };

  const clearFromStore = () => {
    timeState.clearStorage();
    jobState.clearStorage();
  };

  useEffect(() => {
    timeState.initializeFromStorage();
    jobState.initializeFromStorage();
  }, []);

  return (
    <>
      <div className="head">
        <h1 className="total-time">Total: {timeState.totalTime}</h1>
        <Button type="success" className="ms-5 me-1 mb-1" onClick={saveInStore}>
          Save
        </Button>
        <Button type="warning" className="mb-1" onClick={clearFromStore}>
          Clean
        </Button>
      </div>
      <div className="body">
        <div>
          <Button className="me-1 mb-1" onClick={timeState.addAtTheEnd}>
            Add
          </Button>
          <Table header={timeTableHeader} rows={timeState.time} />
        </div>
        <div>
          <Button className="mb-1" onClick={jobState.addAtTheEnd}>
            Add
          </Button>
          <Table header={jobTableHeader} rows={jobState.types} />
        </div>
      </div>
      <div>
        <p>Report:</p>
        <Table header={reportTableHeader} rows={timeState.totalTimeByJobType}/>
      </div>
    </>
  );
}
