import { useEffect, useState } from "react";
import { calculateTotalTime } from "../utils";
const useTime = (params) => {
  let args = params || {};
  const STORE_KEY = args.STORE_KEY || "time";
  const INITIAL = args.INITIAL || [];

  const [time, setTime] = useState(INITIAL);
  const [totalH, setTotalH] = useState(0);
  const [totalM, setTotalM] = useState(0);
  const [totalTimeByJobType, setTotalTimeByJobType] = useState([]);

  const [isChanged, setIsChanged] = useState(false);

  const totalTime = `${totalH}:${totalM}`;

  const handlers = {
    add: () => setTime([...time, {}]),
    delete: (idx) => () => setTime(time.filter((_, i) => i !== idx)),
    changeTime: (index, key) => {
      return ({ target: { value } }) => {
        const newTime = time.map((t, i) =>
          i === index ? { ...t, [key]: value } : t
        );
        setTime(newTime);
      };
    },
    changeJob:
      (index) =>
      ({ target: { value } }) => {
        const newTime = time.map((t, idx) =>
          idx === index ? { ...t, jobType: value } : t
        );
        setTime(newTime);
      },
  };

  const store = {
    init: () => {
      const item = store.get();
      if (item) {
        setTime(JSON.parse(item));
      } else {
        store.clear()
      }
    },
    get: () => localStorage.getItem(STORE_KEY),
    clear: () => {
      localStorage.setItem(STORE_KEY, JSON.stringify(INITIAL));
      setTime(INITIAL);
    },
    save: () => {
      const value = JSON.stringify(time);
      localStorage.setItem(STORE_KEY, value);
      effect.isChanged();
    },
  };

  const effect = {
    calcTotalTime: () => {
      const [hour, minute] = calculateTotalTime(
        time.map(({ startTime, endTime }) => [startTime, endTime])
      );
      setTotalH(hour);
      setTotalM(minute);
    },
    calcJobTime: () => {
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
    },
    isChanged: () => {
      const storedItem = store.get();
      const currentItem = JSON.stringify(time);
      setIsChanged(storedItem !== currentItem);
    },
  };

  useEffect(() => {
    effect.calcJobTime();
    effect.calcTotalTime();
    effect.isChanged();
  }, [time]);

  return {
    time,
    totalTime,
    totalTimeByJobType,
    isChanged,
    addAtTheEnd: handlers.add,
    deleteIdxOf: handlers.delete,
    changeIdxOfTime: handlers.changeTime,
    changeIdxOfJobType: handlers.changeJob,
    initializeFromStorage: store.init,
    clearStorage: store.clear,
    saveInStorage: store.save,
  };
};

export default  useTime ;
