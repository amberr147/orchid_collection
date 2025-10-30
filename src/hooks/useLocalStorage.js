import { useState } from "react";

//key: name of the localStarage item
//initialValue: default value if no value in localStorage
export const useLocalStorage = (key, initialValue) => {
  //stae to store value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log('Error reading localStorage key "' + key + '": ', error);
      return initialValue;
    }
  });

  //function to update value both in state and local storaage
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save to state and local storage
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log('Error setting localStorage key "' + key + '": ', error);
    }
  };

  return [storedValue, setValue];
};
