import React, {
  useEffect,
  useState,
  memo,
  useContext,
  useCallback,
} from "react";
import NavVotes from "./nav-main/NavVotes";
import modalStyle from "./modal/modalStyle";
import Modal from "react-modal";
import AxiosClient from "../axios/CreateAxios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../middlewareAuth/UserConnected";
import Countdown from "./Countdown/Countdown";

function VotesPage() {
  const { Loggedin, setLoggedin, setShowTimer, showTimer } =
    useContext(UserContext);
  const [numberOfVotes, setNumberOfVotes] = useState(10);

  const [singIn, setSingIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [countdown, setCountdown] = useState(false);
  // const [showTimer, setShowTimer] = useState(false);

  const [closeModal, setCloseModal] = useState(false);

  const navigate = useNavigate();

  const style: any = modalStyle;
  const [disabled, setDisabled] = useState(false);

  // the counting of the votes proccess:
  const [votee, setVotee]: any = useState({
    matok: 0,
    stav: 0,
    snir: 0,
    liel: 0,
    yanki: 0,
    avi: 0,
  });

  // const totalMinutes = 15; // 15 minutes
  // const totalMilliseconds = totalMinutes * 60 * 1000; // Convert to milliseconds
  // const votesTimer = () => {
  //   console.log("timer started");
  //   const timer = setInterval(() => {
  //     setNumberOfVotes(10);
  //     localStorage.setItem("numberOfVotes", "10");
  //     setShowTimer(false);
  //     console.log("timer-of");
  //     console.log("timer finished and now need to clear iT self");
  //     clearInterval(timer);
  //     return;
  //   }, totalMilliseconds);
  // };

  useEffect(() => {
    const NUMBER_OF_VOTES = window.localStorage.getItem("numberOfVotes");
    if (Loggedin === true) {
      if (NUMBER_OF_VOTES == "0") {
        setNumberOfVotes(0);
        setShowTimer(true);
        // alert("ניצלת את כמות ההצבעות  😶");
        return;
      } else if (NUMBER_OF_VOTES !== "0") {
        // setShowTimer(false);
        // localStorage.setItem("numberOfVotes", "10");
        // setNumberOfVotes(10);
        return;
      }
    } else {
      return;
    }
  }, [Loggedin]);

  // votes system counting
  const setVote = (name: string, isAdd: boolean) => {
    const tempVote: any = { ...votee };
    if (isAdd && numberOfVotes > 0) {
      tempVote[name]++;
      setNumberOfVotes(numberOfVotes - 1);
    } else if (numberOfVotes < 10 && tempVote[name] > 0 && isAdd == false) {
      tempVote[name]--;
      setNumberOfVotes(numberOfVotes + 1);
    } else if (
      (numberOfVotes < 10 &&
        tempVote[name] == 0 &&
        isAdd == false &&
        numberOfVotes > 0) ||
      (numberOfVotes >= 0 && numberOfVotes !== 0)
    ) {
      return alert("הזן מחדש");
    } else {
      return alert("נגמרו ההצבעות");
    }

    setVotee(tempVote);
  };

  //events handalers
  async function handleOnSubmit(event: any) {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const firstName: any = formData.get("firstname");
      const lastName: any = formData.get("lastname");
      const tel: any = formData.get("tel");

      if (!firstName || !lastName || !tel) {
        alert("אנא השלם את הפרטים");
        return;
      }

      const response = await AxiosClient.put(
        "http://localhost:8080/user/singup",
        {
          firstName,
          lastName,
          tel,
        }
      );
      if (response.status === 200 && response.data.token) {
        window.sessionStorage.setItem("accessToken", response.data.token);
        alert("נרשם בהצלחה ");
        setLoggedin(true);
      } else {
        alert("req failed");
        // You can also handle specific error cases here if needed
      }
    } catch (error) {
      console.log(error);
      alert(error + "המשתמש קיים במערכת");
    }
  }
  async function handleOnSubmitSingIn(event: any) {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const firstName: any = formData.get("firstname");
      const tel: any = formData.get("tel");

      if (!firstName || !tel) {
        alert("אנא השלם את הפרטים");
        return;
      }

      const response = await AxiosClient.post(
        "http://localhost:8080/user/signIn",
        {
          firstName,
          tel,
        }
      );
      if (response.status === 200 && response.data.token) {
        window.sessionStorage.setItem("accessToken", response.data.token);
        alert("נכנס בהצלחה ");
        setLoggedin(true);
      } else {
        alert("req failed");
      }
    } catch (error) {
      console.log(error);
      alert(" המשתמש לא קיים במערכת ,אנא הירשם או התחבר מחדש");
    }
  }
  async function votesData() {
    try {
      const NUMBER_OF_VOTES: string | null =
        window.localStorage.getItem("numberOfVotes");
      if (numberOfVotes !== 0 && Loggedin == true) {
        alert("אנא השלם את ההצבעות");
        return;
      } else if (NUMBER_OF_VOTES === "0") {
        alert("ניצלת את כמות ההצבעות  😶");
        return;
      } else {
        const response = await AxiosClient.post(
          "http://localhost:8080/votesData",
          votee
        );

        if (response.status === 200) {
          navigate("/resehet-13/votes-page/order-compelete-message");
          localStorage.setItem("numberOfVotes", JSON.stringify(numberOfVotes));
          // const expirationTime: any = new Date().getTime() + totalMilliseconds;
          // localStorage.setItem("timeout", expirationTime);
          // const interval = setInterval(checkTimeout, 5000);

          return;
        } else {
          console.log("error while getting data from the server ");
          return;
        }
      }
    } catch (error) {
      alert("error while connecting" + error);
      return;
    }
  }

  // checkIfLoggedIn Function:
  const checkIfLoggedIn = () => {
    try {
      if (Loggedin === false) {
        alert("חייב להירשם על מנת לבחור");
        setShowModal(true);
      }
    } catch (error) {
      alert("cannot get data from the server " + error);
      console.log("cannot get data from the server ");
    }
  };

  return (
    <>
      {Loggedin === false ? (
        <div className="main-page-wraper">
          <div className="main-page-container">
            <NavVotes />
            <div className="main-content-header">
              <h2>מי יהיה המנצח של העונה?</h2>
              <h3>
                נותרו <b>{numberOfVotes}</b> הצבעות
              </h3>
            </div>
            <div className="select-celebrity-options">
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={checkIfLoggedIn}>-</button>
                  <input type="" placeholder={`${votee.matok}`} readOnly />
                  <button onClick={checkIfLoggedIn} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685470819/uploads/2023/903543593.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={checkIfLoggedIn}>-</button>
                  <input type="" placeholder={`${votee.yanki}`} readOnly />
                  <button onClick={checkIfLoggedIn} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1689446264/uploads/2023/903617842.png"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={checkIfLoggedIn}>-</button>
                  <input type="" placeholder={`${votee.liel}`} readOnly />
                  <button onClick={checkIfLoggedIn} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471796/uploads/2023/903543651.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={checkIfLoggedIn}>-</button>
                  <input type="" placeholder={`${votee.snir}`} readOnly />
                  <button onClick={checkIfLoggedIn} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685478146/uploads/2023/903544005.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={checkIfLoggedIn}>-</button>
                  <input type="" placeholder={`${votee.stav}`} readOnly />
                  <button onClick={checkIfLoggedIn} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="send-container">
              <button className="button-54">שלח/י</button>
            </div>
          </div>{" "}
          {showModal &&
            (singIn == false ? (
              <Modal
                isOpen={showModal}
                // onRequestClose={CloseModalF}
                style={style}
                ariaHideApp={false}
              >
                <form action="" onSubmit={(event) => handleOnSubmit(event)}>
                  <h3>הירשמו והצביעו</h3>
                  <label htmlFor="">שם פרטי</label>
                  <input type="text" name="firstname" />
                  <label htmlFor="">שם משפחה</label>
                  <input type="text" name="lastname" />

                  <label htmlFor="">מספר -פאלפון</label>
                  <input
                    type="tel"
                    // size={20}
                    //  maxLength={10}
                    required
                    name="tel"
                  />
                  <button>הירשמ/י</button>
                  <button id="close" onClick={() => setShowModal(!showModal)}>
                    close
                  </button>
                  <span>
                    כבר יש לך חשבון?{" "}
                    <b onClick={() => setSingIn(!singIn)} className="hoverMe">
                      כניסה
                    </b>
                  </span>
                </form>
              </Modal>
            ) : (
              <Modal
                isOpen={showModal}
                // onRequestClose={CloseModalF}
                style={style}
                ariaHideApp={false}
              >
                <form
                  action=""
                  onSubmit={(event) => handleOnSubmitSingIn(event)}
                >
                  <h3>כניסה</h3>
                  <label htmlFor="">שם פרטי</label>
                  <input type="text" name="firstname" />
                  <label htmlFor="">מספר -פאלפון</label>
                  <input
                    type="tel"
                    // size={20}
                    //  maxLength={10}
                    required
                    name="tel"
                  />
                  <button>היכנס/י</button>
                  <button id="close" onClick={() => setShowModal(!showModal)}>
                    close
                  </button>
                  <span className="hoverMeRegister">
                    אין לך חשבון?{" "}
                    <b onClick={() => setSingIn(!singIn)} className="hoverMe ">
                      המשך להרשמה
                    </b>
                  </span>
                </form>
              </Modal>
            ))}
        </div>
      ) : (
        <div className="main-page-wraper">
          <div className="main-page-container">
            <NavVotes />
            {showTimer === false ? null : (
              <div className="countdown-container-wraper-main">
                <div className="countdown-container-main">
                  <span> מספר הזמן שנותר להצבעה חדשה :</span>
                  <h5>
                    <Countdown
                      setNumberOfVotes={setNumberOfVotes}
                      setShowTimer={setShowTimer}
                    />
                  </h5>
                </div>
              </div>
            )}
            <div className="main-content-header">
              <h2>מי יהיה המנצח של העונה?</h2>
              <h3>
                נותרו <b>{numberOfVotes}</b> הצבעות
              </h3>
              {/* {showTimer === false ? null : (
                <div className="countdown-container-wraper">
                  <div className="countdown-container">
                    <span> מספר הזמן שנותר להצבעה חדשה :</span>
                    <h5>
                      {" "}
                      <Countdown
                        setNumberOfVotes={setNumberOfVotes}
                        setShowTimer={setShowTimer}
                      />{" "}
                    </h5>
                  </div>
                </div>
              )} */}
            </div>
            <div className="select-celebrity-options">
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button
                    onClick={() => {
                      setVote("matok", false);
                    }}
                  >
                    -
                  </button>
                  <input type="" placeholder={`${votee.matok}`} readOnly />
                  <button
                    onClick={() => {
                      setVote("matok", true);
                    }}
                    disabled={disabled}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685470819/uploads/2023/903543593.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button
                    onClick={() => {
                      setVote("yanki", false);
                    }}
                  >
                    -
                  </button>
                  <input type="" placeholder={`${votee.yanki}`} readOnly />
                  <button
                    onClick={() => {
                      setVote("yanki", true);
                    }}
                    disabled={disabled}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1689446264/uploads/2023/903617842.png"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={() => setVote("liel", false)}>-</button>
                  <input type="" placeholder={`${votee.liel}`} readOnly />
                  <button
                    onClick={() => setVote("liel", true)}
                    disabled={disabled}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471796/uploads/2023/903543651.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={() => setVote("snir", false)}>-</button>
                  <input type="" placeholder={`${votee.snir}`} readOnly />
                  <button
                    onClick={() => setVote("snir", true)}
                    disabled={disabled}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685478146/uploads/2023/903544005.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={() => setVote("stav", false)}>-</button>
                  <input type="" placeholder={`${votee.stav}`} readOnly />
                  <button
                    onClick={() => setVote("stav", true)}
                    disabled={disabled}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="send-container">
              <button className="button-54" onClick={() => votesData()}>
                שלח/י
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(VotesPage);
