import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNav from "../nav-main/MainNav";

function CompleteVote() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4200);
  }, []);
  return (
    <div>
      <div className="main-page-wraper">
        <div className="main-page-container">
          <MainNav />

          <div className="RegisterMessage">
            <div className="alert-popup-container">
              <div className="success-checkmark">
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>
              <div className="alert-popup-title">Success!!!</div>
              <div className="alert-popup-message">הפרטים הוזנו במערכת</div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default CompleteVote;
