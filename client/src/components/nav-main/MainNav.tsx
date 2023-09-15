import React from "react";
import { BiImport } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";

function MainNav() {
  return (
    <>
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
          <img
            src="https://media.reshet.tv/image/upload/f_auto,q_auto:best/v1684835752/assets/2023/Logo.png"
            alt=""
          />
          <span>
            <RxHamburgerMenu />
          </span>
        </div>
      </div>
    </>
  );
}

export default MainNav;
