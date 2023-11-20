import React, { useState, useEffect, memo, useContext } from "react";
import MainNav from "./nav-main/MainNav";
import { Link } from "react-router-dom";
import VoteChart from "./charts/VoteChart";
import AxiosClient from "../axios/CreateAxios";
import { BsArrow90DegDown } from "react-icons/bs";
import { UserContext } from "../middlewareAuth/UserConnected";
import ImagesCarousel from "./carousel/ImagesCarousel";
import Countdown from "./Countdown/Countdown";
import Timer from "./Countdown/Timer";

function Main() {
  const [votesData, setVoteData]: any = useState([]);
  const { Loggedin, setLoggedin, setShowTimer, showTimer } =
    useContext(UserContext);
  console.log(Loggedin);
  console.log(showTimer);

  useEffect(() => {
    const getAllVotes = async () => {
      try {
        if (Loggedin === true) {
          const response = await AxiosClient.get(
            "http://localhost:8080/getVotes"
          );
          if (response && response.status && response.status === 200) {
            console.log("sucess while geting the data");
            const { data } = response;
            setVoteData(data);
            return;
          } else {
            console.log("eror while geting data");
            alert("cannot get data");
            return;
          }
        } else {
          console.log("no data");
          return;
        }
      } catch (error) {
        alert("err" + error);
        return;
      }
    };

    getAllVotes();
  }, [Loggedin]);

  // Recursive function to combine numbers by name
  function combineNumbers(obj: any, combinedNumbers: any) {
    for (const key in obj) {
      if (typeof obj[key] === "number") {
        if (!combinedNumbers[key]) {
          combinedNumbers[key] = 0;
        }
        combinedNumbers[key] += obj[key];
      } else if (typeof obj[key] === "object") {
        combineNumbers(obj[key], combinedNumbers);
      }
    }
  }
  // Initialize an object to store combined numbers by name
  const combinedNumbersByName = {};
  // Combine numbers by name
  votesData.forEach((obj: any) => {
    combineNumbers(obj, combinedNumbersByName);
  });
  // Extract combined numbers as an array
  const combinedNumbers = Object.values(combinedNumbersByName);

  return (
    <>
      <div className="main-page-wraper">
        <div className="main-page-container">
          <MainNav />
          {/* {showTimer === false ? null : (
            <div className="countdown-container-wraper-main">
              <div className="countdown-container-main">
                <span> מספר הזמן שנותר להצבעה חדשה :</span>
                <h5>
                  <Countdown
                    setNumberOfVotes={undefined}
                    setShowTimer={setShowTimer}
                  />
                </h5>
              </div>
            </div>
          )} */}
          <div className="commercial-container">
            <img
              src="https://media.reshet.tv/image/upload/t_main_large/v1641909105/uploads/2022/902809449.jpg"
              alt=""
            />
          </div>
          <Link to={"/resehet-13/votes-page"}>
            <div className="main-link-toVotes">
              <div className="link-votes-header-container">
                <h1>הצביעו עכשיו</h1>
                <p className="P1">
                  <BsArrow90DegDown />
                </p>
              </div>
              <img
                src="https://media.reshet.tv/image/upload/t_image_article_800/v1694032211/uploads/2023/903702715.webp"
                alt=""
              />
            </div>
          </Link>
          <div className="contenders-images-container">
            <ImagesCarousel />
          </div>
          {Loggedin == false ? (
            <div className="votes-status-false">
              <h3>!הירשמו והצביעו על מנת לעקוב אחרי כמות ההצבעות </h3>
            </div>
          ) : (
            <div className="check-the-votes-status">
              <h3>אחוזי ההצבעה עד כה: </h3>
              <VoteChart
                votesData={{
                  labels: [
                    "יובל מעתוק",
                    "סתיו קצין",
                    "שניר בורגיל",
                    "ליאל קוצרי",
                    "יענקי גולדהבר",
                  ],
                  datasets: [
                    {
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(75, 192, 192)",
                        "rgb(255, 205, 86)",
                        "rgb(201, 203, 207)",
                        "rgb(54, 162, 235)",
                      ],
                      label: "מספר הצבעות",
                      data: combinedNumbers.slice(0, 5),
                      borderColor: "black",
                      borderWidth: 2,
                    },
                  ],
                }}
              />
            </div>
          )}
        </div>
      </div>
      <Timer />
    </>
  );
}

export default memo(Main);
