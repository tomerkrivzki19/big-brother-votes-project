import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import VotesPage from "./components/VotesPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/resehet-13/votes-page" element={<VotesPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
