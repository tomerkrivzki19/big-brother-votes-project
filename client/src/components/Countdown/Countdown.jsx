// import React, { useRef, useEffect, useState, useContext } from "react";
// import { UserContext } from "../../middlewareAuth/UserConnected";

// export default function Countdown() {
//   const [num, setNum] = useState(100);
//   const { Loggedin, setLoggedin } = useContext(UserContext);

//   let intervalRef = useRef();

//   const decreaseNum = () => setNum((prev) => prev - 1);

//   useEffect(() => {
//     intervalRef.current = setInterval(decreaseNum, 1000);

//     return () => setLoggedin(true), clearInterval(intervalRef.current);
//   }, []);

//   return (
//     <>
//       <div>{num}</div>
//     </>
//   );
// }
import React, { useEffect, useState, memo } from "react";

function Countdown() {
  const [remainingTime, setRemainingTime] = useState(15 * 60); //15 min in seconds

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
