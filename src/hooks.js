import { useEffect, useState } from "react";
import { calculateTotalTime } from "./utils";
const useTime = (params) => {
  let args = params || {};
  const STORE_KEY = args.STORE_KEY || "time";
  const INITIAL = args.INITIAL || [];

  const [time, setTime] = useState(INITIAL);
  const [totalH, setTotalH] = useState(0);
  const [totalM, setTotalM] = useState(0);
  const [totalTimeByJobType, setTotalTimeByJobType] = useState([]);
  const totalTime = `${totalH}:${totalM}`;

  const initializeFromStorage = () => {
    const storedTime = localStorage.getItem(STORE_KEY);
    if (storedTime) {
      setTime(JSON.parse(storedTime));
    }
  };

  const addAtTheEnd = () => {
    setTime([...time, {}]);
  };
  const deleteIdxOf = (idx) => () => setTime(time.filter((_, i) => i !== idx));
  const changeIdxOfTime = (index, key) => {
    return ({ target: { value } }) => {
      const newTime = time.map((t, i) =>
        i === index ? { ...t, [key]: value } : t
      );
      setTime(newTime);
    };
  };

  const changeIdxOfJobType =
    (index) =>
    ({ target: { value } }) => {
      const newTime = time.map((t, idx) =>
        idx === index ? { ...t, jobType: value } : t
      );
      setTime(newTime);
    };

  const clearStorage = () => {
    localStorage.removeItem(STORE_KEY);
    setTime(INITIAL);
  };

  const saveInStorage = () => {
    const value = JSON.stringify(time);
    localStorage.setItem(STORE_KEY, value);
  };

  const syncTotalTimeWithTime = () => {
    const [hour, minute] = calculateTotalTime(
      time.map(({ startTime, endTime }) => [startTime, endTime])
    );
    setTotalH(hour);
    setTotalM(minute);
  };

  const syncTotalTimeByJobTypeWithTime = () => {
    const jobTypes = [
      ...new Set(
        time.filter(({ jobType }) => jobType).map(({ jobType }) => jobType)
      ),
    ];
    const newTotalTimeByJobType = jobTypes.map((j) => {
      const timeListOfJob = time
        .filter(({ jobType }) => jobType === j)
        .map(({ startTime, endTime }) => [startTime, endTime]);
      const [hour, minute] = calculateTotalTime(timeListOfJob);
      return {
        jobType: j,
        hour,
        minute,
      };
    });
    setTotalTimeByJobType(newTotalTimeByJobType);
  };

  useEffect(() => {
    syncTotalTimeWithTime();
    syncTotalTimeByJobTypeWithTime();
  }, [time]);

  return {
    time,
    totalTime,
    totalTimeByJobType,
    initializeFromStorage,
    clearStorage,
    addAtTheEnd,
    deleteIdxOf,
    changeIdxOfJobType,
    changeIdxOfTime,
    saveInStorage,
  };
};

const useJob = (params) => {
  const args = params || {};
  const STORE_KEY = args.STORE_KEY || "jobs";
  const INITIAL = args.INITIAL || [];

  const [types, setTypes] = useState(INITIAL);

  const addAtTheEnd = () => setTypes([...types, ""]);
  const changeIdxOf =
    (idx) =>
    ({ target: { value } }) =>
      setTypes(types.map((t, i) => (i === idx ? value : t)));

  const deleteIdxOf = (idx) => () =>
    setTypes(types.filter((t, i) => i !== idx));
  const initializeFromStorage = () => {
    const item = localStorage.getItem(STORE_KEY);
    if (item) {
      setTypes(JSON.parse(item));
    }
  };
  const clearStorage = () => {
    localStorage.removeItem(STORE_KEY);
    setTypes(INITIAL);
  };
  const saveInStorage = () => {
    const value = JSON.stringify(types);
    localStorage.setItem(STORE_KEY, value);
  };

  return {
    types,
    addAtTheEnd,
    changeIdxOf,
    initializeFromStorage,
    clearStorage,
    saveInStorage,
    deleteIdxOf,
  };
};

export { useTime, useJob };
