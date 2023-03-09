import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  let initial = saved;
  
  try {
    initial = JSON.parse(saved);
  } catch (error) {}

  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  const setLocalValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, newValue);
  }

  return [value, setLocalValue];
};