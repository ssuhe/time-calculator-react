import "./App.css";
import { useEffect } from "react";
import useTime from "./hooks/useTime";
import useJob from "./hooks/useJob";
import Button from "./components/button";
import Table from "./components/table";
import {
  getJobTableHeader,
  getReportTableHeader,
  getTimeTableHeader,
} from "./utils";
import Title from "./components/title";
import Section from "./components/section";

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
    jobTypes: jobState.types,
  });

  const saveInStore = () => {
    timeState.saveInStorage();
    jobState.saveInStorage();
  };

  const clearFromStore = () => {
    timeState.clearStorage();
    jobState.clearStorage();
  };

  const summaryCount = timeState.totalTimeByJobType.length;
  const jobTypeCount = jobState.types.length;
  const timeTableCount = timeState.time.length;

  useEffect(() => {
    timeState.initializeFromStorage();
    jobState.initializeFromStorage();
    nofifyThis();
  }, []);

  const nofifyThis = () => {
    console.log("is it working?");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b p-3 gap-4 pb-4 overflow-auto">
        <h1 className="me-3 text-3xl">Total: {timeState.totalTime}</h1>
        <Button type="success" onClick={saveInStore}>
          Save
        </Button>
        <Button type="warning" onClick={clearFromStore}>
          Clean
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row flex-1 h-0 overflow-auto">
        <Section>
          <Section.Head>
            <Title>Summary {summaryCount !== 0 && <>({summaryCount})</>}</Title>
          </Section.Head>
          <Section.Body>
            <Table
              header={reportTableHeader}
              rows={timeState.totalTimeByJobType}
            />
          </Section.Body>
        </Section>
        <Section>
          <Section.Head>
            <Title>Job Types</Title>
            <Button onClick={jobState.addAtTheEnd}>
              Add{jobTypeCount !== 0 && <> ({jobTypeCount})</>}
            </Button>
            <Button
              disabled={!jobState.isChanged}
              type="warning"
              onClick={jobState.initializeFromStorage}
            >
              Reload
            </Button>
          </Section.Head>
          <Section.Body>
            <Table header={jobTableHeader} rows={jobState.types} />
          </Section.Body>
        </Section>
        <Section>
          <Section.Head>
            <Title>Time Table</Title>
            <Button onClick={timeState.addAtTheEnd}>
              Add{timeTableCount !== 0 && <> ({timeTableCount})</>}
            </Button>
            <Button
              disabled={!timeState.isChanged}
              type="warning"
              onClick={timeState.initializeFromStorage}
            >
              Reload
            </Button>
          </Section.Head>
          <Section.Body>
            <Table header={timeTableHeader} rows={timeState.time} />
          </Section.Body>
        </Section>
      </div>
      <div className="p-3">
        Source:{" "}
        <a
          className="text-blue-500 hover:underline"
          href="https://github.com/ssuhe/time-calculator-react"
          target="_blank"
        >
          https://github.com/ssuhe/time-calculator-react
        </a>
      </div>
    </div>
  );
}
