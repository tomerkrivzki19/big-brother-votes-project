import React, { useState, useContext } from "react";
import Countdown from "./Countdown";
import { UserContext } from "../../middlewareAuth/UserConnected";

function Timer() {
  const [numberOfVotes, setNumberOfVotes] = useState(10);
  const { setShowTimer, showTimer } = useContext(UserContext);
  return (
    <div className="global-timer-container" style={{ display: "none" }}>
      {showTimer === true ? (
        <h5>
          <Countdown
            setNumberOfVotes={setNumberOfVotes}
            setShowTimer={setShowTimer}
          />
        </h5>
      ) : null}
    </div>
  );
}

export default Timer;
