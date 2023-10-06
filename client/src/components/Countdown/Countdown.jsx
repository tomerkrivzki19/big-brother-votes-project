import React, { useEffect, useState, memo, useCallback } from "react";

function Countdown({ Loggedin }) {
  const initialRemainingTime = localStorage.getItem("remainingTime") || 15 * 60;
  const [remainingTime, setRemainingTime] = useState(
    Number(initialRemainingTime)
  ); //15 min in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  // Store the remaining time in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("remainingTime", remainingTime);
  }, [remainingTime]);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
    <>
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </>
  );
}

export default memo(Countdown);
