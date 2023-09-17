import React from "react";
import { BiImport } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

function NavVotes() {
  return (
    <div>
      <div className="main-nav-container">
        <div className="left-container">
          <div className="container-share">
            <BiImport />
          </div>
          <div className="container-live">
            <button>LIVE</button>
          </div>
          <div className="container-vod">
            <button>VOD</button>
          </div>
        </div>

        <div className="right-container">
          <Link id="vote-nav-link" to={"/"}>
            <img
              id="vote-nav-img"
              src="https://media.reshet.tv/image/upload/f_auto,q_auto:best/v1684835752/assets/2023/Logo.png"
              alt=""
            />
          </Link>
          <span>
            <RxHamburgerMenu />
          </span>
        </div>
      </div>
    </div>
  );
}
//
export default NavVotes;
