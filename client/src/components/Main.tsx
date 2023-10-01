import React, { useState, useEffect, memo, useContext } from "react";
import MainNav from "./nav-main/MainNav";
import { Link } from "react-router-dom";
import VoteChart from "./charts/VoteChart";
import AxiosClient from "../axios/CreateAxios";
import { BsArrow90DegDown } from "react-icons/bs";
import { UserContext } from "../middlewareAuth/UserConnected";
import ImagesCarousel from "./carousel/ImagesCarousel";

function Main() {
  const [votesData, setVoteData]: any = useState([]);
  const { Loggedin, setLoggedin } = useContext(UserContext);
  console.log(Loggedin);

  useEffect(() => {
    const getAllVotes = async () => {
      try {
        if (Loggedin == true) {
          const response = await AxiosClient.get(
            "http://localhost:8080/getVotes"
          );
          if (response?.status == 200) {
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
          <div className="commercial-container">
            <img
              src="https://media.reshet.tv/image/upload/t_main_large/v1641909105/uploads/2022/902809449.jpg"
              alt=""
            />
          </div>
          <Link to={"/resehet-13/votes-page"}>
            <div className="main-link-toVotes">
              {/* <h3>מי יהיה המנצח הגדול של העונה?</h3> */}
              <p>הצביעו עכשיו</p>
              <span className="P1">
                <BsArrow90DegDown />
              </span>
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
    </>
  );
}

export default memo(Main);
