import React, { useState, useEffect, memo, useContext } from "react";
import MainNav from "./nav-main/MainNav";
import { Link } from "react-router-dom";
import VoteChart from "./charts/VoteChart";
import AxiosClient from "../axios/CreateAxios";
import { BsArrow90DegDown } from "react-icons/bs";
import { UserContext } from "../middlewareAuth/UserConnected";

function Main() {
  const [votesData, setVoteData]: any = useState([]);
  const { Loggedin, setLoggedin } = useContext(UserContext);
  console.log(Loggedin);

  useEffect(() => {
    const getAllVotes = async () => {
      try {
        debugger;
        if (Loggedin == true) {
          const response = await AxiosClient.get(
            "http://localhost:8080/getVotes"
          );
          if (response?.status == 200) {
            debugger;
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
          debugger;
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
            <div className="contender-container">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
            <div className="contender-container">
              <img
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
          </div>
          {Loggedin == false ? (
            <div>
              <h3>הירשמו והצביעו על מנת לעקוב אחרי כמות ההצבעות </h3>
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
