import { BiGhost } from "react-icons/bi";
import { Link } from "react-router-dom";
import NavVotes from "../nav-main/NavVotes";

function ErorPage() {
  return (
    <>
      <div className="main-page-wraper">
        <div className="main-page-container">
          <div className="nav">
            <NavVotes />
          </div>
          <div className="err-page">
            <main>
              <h1>
                4
                <span>
                  <i className="fa-solid fa-ghost">
                    <BiGhost />
                  </i>
                </span>
                4
              </h1>
              <h2>שגיאה 404 - הדף לא נמצא</h2>
              <p>מצטערים, לא ניתן לגשת לדף שאתה מחפש</p>
              <Link to={"/"}>
                {" "}
                <h4>חזרה לדף הבית</h4>{" "}
              </Link>
            </main>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default ErorPage;
