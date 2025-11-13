import { useEffect, useState } from "react";

const useJob = (params) => {
  const args = params || {};
  const STORE_KEY = args.STORE_KEY || "jobs";
  const INITIAL = args.INITIAL || [];

  const [types, setTypes] = useState(INITIAL);
  const [isChanged, setIsChanged] = useState(false);

  const handlers = {
    add: () => setTypes([...types, ""]),
    change:
      (idx) =>
      ({ target: { value } }) =>
        setTypes(types.map((t, i) => (i === idx ? value : t))),
    delete: (idx) => () => setTypes(types.filter((t, i) => i !== idx)),
  };

  const store = {
    init() {
      const item = store.get();
      if (item) {
        setTypes(JSON.parse(item));
      } else {
        store.clear()
      }
    },
    get() {
      return localStorage.getItem(STORE_KEY);
    },
    clear() {
      localStorage.setItem(STORE_KEY, JSON.stringify(INITIAL));
      setTypes(INITIAL);
    },
    save() {
      const value = JSON.stringify(types);
      localStorage.setItem(STORE_KEY, value);
      effect.isChanged()
    },
  };

  const effect = {
    isChanged: () => {
      const storedItem = store.get();
      const currentItem = JSON.stringify(types);
      setIsChanged(storedItem !== currentItem)
    },
  };

  useEffect(() => {
    effect.isChanged();
  }, [types]);

  return {
    types,
    isChanged,
    addAtTheEnd: handlers.add,
    changeIdxOf: handlers.change,
    deleteIdxOf: handlers.delete,
    initializeFromStorage: store.init,
    clearStorage: store.clear,
    saveInStorage: store.save,
  };
};

export default useJob;
