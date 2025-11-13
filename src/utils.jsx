import Button from "./components/button";
import { Input, TimeInput } from "./components/input";
import JobSelect from "./components/select";

const timeRegex = new RegExp("^([0-9][0-9]):([0-9][0-9])$");

const formatTime = (number) => {
  if (typeof number !== "number") return;
  return String(number).padStart(2, "0");
};

const getTimeTableHeader = ({
  jobTypes,
  handleJobChanges,
  handleTimeChanges,
  deleteTime,
}) => [
  { label: "#", key: "index", render: (_, ridx) => ridx + 1, className: "text-center" },
  {
    label: "Job Type",
    key: "jobType",
    render: ({ jobType }, ridx) => (
      <JobSelect
        value={jobType}
        onChange={handleJobChanges(ridx)}
        options={["--", ...jobTypes]}
      />
    ),
  },
  {
    label: "Start Time",
    key: "startTime",
    render: ({ startTime, endTime }, ridx) => (
      <TimeInput
        value={startTime}
        onChange={handleTimeChanges(ridx, "startTime")}
        max={endTime}
      />
    ),
  },
  {
    label: "End Time",
    key: "endTime",
    render: ({ endTime, startTime }, ridx) => (
      <TimeInput
        min={startTime}
        value={endTime}
        onChange={handleTimeChanges(ridx, "endTime")}
      />
    ),
  },
  {
    label: "",
    key: "delete",
    render: (_, ridx) => (
      <Button type="danger" onClick={deleteTime(ridx)}>
        Remove
      </Button>
    ),
  },
];

const getJobTableHeader = ({ handleJobChanges, deleteJob }) => [
  { label: "#", key: "index", render: (_, ridx) => ridx + 1 , className: "text-center" },
  {
    label: "Job Type",
    key: "jobType",
    render: (value, ridx) => (
      <Input value={value} onChange={handleJobChanges(ridx)} />
    ),
  },
  {
    label: "",
    key: "delete",
    render: (_, ridx) => (
      <Button type="danger" onClick={deleteJob(ridx)}>
        Remove
      </Button>
    ),
  },
];

const getReportTableHeader = ({ jobTypes }) => [
  {
    label: "#",
    render: (_, ridx) => ridx + 1,
    className: "text-center" 
  },
  {
    label: "Job Type",
    render: ({ jobType }) => jobTypes[Number(jobType)-1],
  },
  {
    label: "Time",
    render: ({ hour, minute }) => `${hour}:${minute}`,
  },
];

const parseTime = (timeStr) => {
  const valid = `${timeStr}`.match(timeRegex);
  if (valid) {
    const h = Number(valid[1]);
    const m = Number(valid[2]);
    return [h, m];
  }
  return [0, 0];
};

const resolveTime = (h, m) => {
  let hour = h;
  let minute = m;
  hour += parseInt(minute / 60);
  minute = minute % 60;
  return [hour, minute];
};

const calculateDifference = (time1, time2) => {
  const [H1, M1] = parseTime(time1);
  const [H2, M2] = parseTime(time2);

  const time1M = H1 * 60 + M1;
  const time2M = H2 * 60 + M2;

  const diff = time2M - time1M;

  return diff < 0 ? 0 : diff;
};

const calculateTotalTime = (timeList = []) => {
  const [hour, minute] = resolveTime(
    0,
    timeList.reduce((a, c) => (a += calculateDifference(...c)), 0)
  );

  return [formatTime(hour), formatTime(minute)];
};

export {
  formatTime,
  getTimeTableHeader,
  getJobTableHeader,
  getReportTableHeader,
  calculateDifference,
  calculateTotalTime,
};
