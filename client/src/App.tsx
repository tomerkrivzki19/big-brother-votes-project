import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import VotesPage from "./components/VotesPage";
import CompleteVote from "./components/messages/CompleteVote";
import ErorPage from "./components/404/ErorPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<ErorPage />} />
          <Route path="/" element={<Main />} />
          <Route path="/resehet-13/votes-page" element={<VotesPage />} />
          <Route
            path="/resehet-13/votes-page/order-compelete-message"
            element={<CompleteVote />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
