import React from "react";
import NavVotes from "./nav-main/NavVotes";

function VotesPage() {
  return (
    <>
      <div className="main-page-wraper">
        <div className="main-page-container">
          <NavVotes />
          <div className="main-content-header">
            <h2>מי יהיה המנצח של העונה?</h2>
            <h3>נותרו 0 הצבעות</h3>
          </div>
          <div className="select-celebrity-options">
            <div className="option">
              <img
                src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                alt=""
              />
              <div className="vote-container">
                <button>-</button>
                <input type="button" placeholder="מספר הצבעות" />
                <button>+</button>
              </div>
            </div>
            <div className="option">
              <img
                src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                alt=""
              />
              <div className="vote-container">
                <button>-</button>
                <input type="button" placeholder="מספר הצבעות" />
                <button>+</button>
              </div>
            </div>
            <div className="option">
              <img
                src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                alt=""
              />
              <div className="vote-container">
                <button>-</button>
                <input type="button" placeholder="מספר הצבעות" />
                <button>+</button>
              </div>
            </div>
            <div className="option">
              <img
                src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                alt=""
              />
              <div className="vote-container">
                <button>-</button>
                <input type="button" placeholder="מספר הצבעות" />
                <button>+</button>
              </div>
            </div>
            <div className="option">
              <img
                src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                alt=""
              />
              <div className="vote-container">
                <button>-</button>
                <input type="button" placeholder="מספר הצבעות" />
                <button>+</button>
              </div>
            </div>
          </div>
          <div className="send-container">
            <button className="button-54">שלח/י</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VotesPage;
