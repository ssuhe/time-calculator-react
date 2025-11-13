import { useEffect, useRef, useState, useContext, createContext } from "react";
import "./App.css";

const TimeContext = createContext();

const time = {
  key: "time-data",

  get value() {
    const prev = localStorage.getItem(this.key);
    let result = null;

    if (prev) {
      result = JSON.parse(prev);
    } else {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      result = [{ startTime: `${h}:${m}`, endTime: `${h}:${m}` }];
    }
    return result;
  },

  set value(times) {
    if (!Array.isArray(times)) return;
    const timesStr = JSON.stringify(times);
    localStorage.setItem(this.key, timesStr);
  },
};

function App() {
  const totalRef = useRef([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [timeCount, setTimeCount] = useState(1);

  useEffect(() => {
    totalRef.current = time.value;
  }, []);

  function calculateTime() {}
  function addTime() {
    setTimeCount(timeCount + 1);
  }
  function showJobList() {}

  return (
    <div>
      <TimeContext.Provider value={totalRef}>
        <button onClick={calculateTime}>Calculate</button>
        <button onClick={addTime}>Add</button>
        <button onClick={showJobList}>Show Job List</button>
        <TimeList count={timeCount} />
      </TimeContext.Provider>
    </div>
  );
}

function TimeList({ count }) {
  return Array(count)
    .fill("")
    .map((_, key) => <Time key={key} index={key} />);
}

function Time({ index }) {
  const totalRef = useContext(TimeContext)
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleTimeChanges = (event) => {
    const key = event.target.id;
    const value = event.target.value;
    ({
      startTime: setStartTime,
      endTime: setEndTime,
    })[key](value);
  };

  useEffect(() => {
    if (totalRef && totalRef.current && Array.isArray(totalRef.current)) {
      const timeValue = totalRef.current[index]
      console.log(timeValue)
    }
    console.log(totalRef.current[index])
  }, []);

  return (
    <div className="time">
      <label htmlFor="startTime">Start Time</label>
      <input
        type="time"
        id="startTime"
        value={startTime}
        onChange={handleTimeChanges}
      />
      <span>~</span>
      <label htmlFor="endTime">End Time</label>
      <input
        type="time"
        id="endTime"
        value={endTime}
        onChange={handleTimeChanges}
      />
    </div>
  );
}

export default App;
