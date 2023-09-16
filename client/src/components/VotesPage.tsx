import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import NavVotes from "./nav-main/NavVotes";
import modalStyle from "./modal/modalStyle";
import Modal from "react-modal";
import AxiosClient from "../axios/CreateAxios";

function VotesPage() {
  const [numberOfVotes, setNumberOfVotes] = useState(10);
  const [countPlus, setCountPlus] = useState(0);

  const [Loggedin, setLoggedin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log(Loggedin);

  // const handleClick = useCallback(() => {
  //   setShowModal(!showModal);
  // }, [showModal]);

  const style: any = modalStyle;
  const [disabled, setDisabled] = useState(false);

  //   contenders
  const [voteOne, setVoteOne] = useState(0);
  const [voteTwo, setVoteTwo] = useState(0);
  const [voteThree, setVoteThree] = useState(0);
  const [voteFour, setVoteFour] = useState(0);
  const [voteFive, setVoteFive] = useState(0);

  useEffect(() => {
    if (numberOfVotes < 1) {
      //   alert(" הצבעה");
      setNumberOfVotes(0);

      setDisabled(true);
      //   setVoteOne(voteOne);
      //   setVoteTwo(voteTwo);
      //   setVoteThree(voteThree);
      //   setVoteFour(voteFour);
      //   setVoteFive(voteFive);
    } else {
      setDisabled(false);
    }
  }, [numberOfVotes]);

  //   if (Loggedin == false) {
  //     setShowModal(true);
  //   }
  // }
  // useEffect(() => {
  //   if (Loggedin === false) {
  //     alert("חייב להירשם על מנת לבחור");
  //     handleClick();
  //     return;
  //   } else {
  //     setShowModal(true);
  //     return;
  //   }
  // }, []);

  const checkIfLoggedIn = useCallback(() => {
    if (Loggedin === false) {
      alert("חייב להירשם על מנת לבחור");
      setShowModal(true);
    }
  }, [!Loggedin]);
  // const checkIfLoggedIn = () => {};

  // useEffect(() => {
  async function handleOnSubmit(event: any) {
    try {
      const formData = new FormData(event.target);
      const firstName: any = formData.get("firstname");
      const lastName: any = formData.get("lastname");
      const tel: any = formData.get("tel");
      console.log(firstName, lastName, tel);

      // if (!firstName || !lastName || !tel) {
      //   alert("אנא השלם את הפרטים");
      //   return;
      // }

      const response = await AxiosClient.post(
        "http://172.20.10.6:8080/user/singup",
        {
          firstName,
          lastName,
          tel,
        }
      );
      if (response?.status !== 200) {
        alert("req failed ");
        // alert("הזן את הפרטים מחדש");
        return;
      }
      alert("success");
      debugger;
      setLoggedin(!Loggedin);
      debugger;
      setShowModal(false);
      debugger;
    } catch (error) {
      console.log(error);
      alert("הזן את הפרטים מחחדש");
    }
  }
  // }, []);

  //   ---------1
  const handleCountPlusVoteOne = () => {
    if (voteOne <= 9) {
      setVoteOne(voteOne + 1);
      setNumberOfVotes(numberOfVotes - 1);
    } else if (voteOne > 9) {
      setVoteOne(10);

      alert("עברת את כמות ההצבעות");
    }
  };

  const handleCountMinusVoteOne = () => {
    if (voteOne < 1) {
      setVoteOne(0);
    } else if (voteOne <= 10) {
      setVoteOne(voteOne - 1);
      setNumberOfVotes(numberOfVotes + 1);
    } else if (numberOfVotes == 0) {
      setNumberOfVotes(0);
    }
  };
  //   ---------2
  const handleCountPlusVoteTwo = () => {
    if (voteTwo <= 9) {
      setVoteTwo(voteTwo + 1);
      setNumberOfVotes(numberOfVotes - 1);
    } else if (voteTwo > 9) {
      setVoteTwo(10);
      setNumberOfVotes(0);

      alert("עברת את כמות ההצבעות");
    }
  };

  const handleCountMinusVoteTwo = () => {
    if (voteTwo < 1) {
      setVoteTwo(0);
    } else if (voteTwo <= 10) {
      setVoteTwo(voteTwo - 1);
      setNumberOfVotes(numberOfVotes + 1);
    } else if (numberOfVotes == 0) {
      setNumberOfVotes(0);
    }
  };
  //   ---------3
  const handleCountPlusVoteThree = () => {
    if (voteThree <= 9) {
      setVoteThree(voteThree + 1);
      setNumberOfVotes(numberOfVotes - 1);
    } else if (voteThree > 9) {
      setVoteThree(10);
      setNumberOfVotes(0);

      alert("עברת את כמות ההצבעות");
    }
  };

  const handleCountMinusVoteThree = () => {
    if (voteThree < 1) {
      setVoteThree(0);
    } else if (voteThree <= 10) {
      setVoteThree(voteThree - 1);
      setNumberOfVotes(numberOfVotes + 1);
    } else if (numberOfVotes == 0) {
      setNumberOfVotes(0);
    }
  };
  //   ---------4
  const handleCountPlusVoteFour = () => {
    if (voteFour <= 9) {
      setVoteFour(voteFour + 1);
      setNumberOfVotes(numberOfVotes - 1);
    } else if (voteFour > 9) {
      setVoteFour(10);
      setNumberOfVotes(0);

      alert("עברת את כמות ההצבעות");
    }
  };

  const handleCountMinusVoteFour = () => {
    if (voteFour < 1) {
      setVoteFour(0);
    } else if (voteFour <= 10) {
      setVoteFour(voteFour - 1);
      setNumberOfVotes(numberOfVotes + 1);
    } else if (numberOfVotes == 0) {
      setNumberOfVotes(0);
    }
  };
  //   ---------5
  const handleCountPlusVoteFive = () => {
    if (voteFive <= 9) {
      setVoteFive(voteFive + 1);
      setNumberOfVotes(numberOfVotes - 1);
    } else if (voteFive > 9) {
      setVoteFive(10);
      setNumberOfVotes(0);

      alert("עברת את כמות ההצבעות");
    }
  };

  const handleCountMinusVoteFive = () => {
    if (voteFive < 1) {
      setVoteFive(0);
    } else if (voteFive <= 10) {
      setVoteFive(voteFive - 1);
      setNumberOfVotes(numberOfVotes + 1);
    } else if (numberOfVotes == 0) {
      setNumberOfVotes(0);
    }
  };

  return (
    <>
      {Loggedin == false ? (
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
                  <input type="" placeholder={`${voteOne}`} readOnly />
                  <button onClick={checkIfLoggedIn} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={checkIfLoggedIn}>-</button>
                  <input type="" placeholder={`${voteTwo}`} readOnly />
                  <button onClick={checkIfLoggedIn} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={checkIfLoggedIn}>-</button>
                  <input type="" placeholder={`${voteThree}`} readOnly />
                  <button onClick={checkIfLoggedIn} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={checkIfLoggedIn}>-</button>
                  <input type="" placeholder={`${voteFour}`} readOnly />
                  <button onClick={checkIfLoggedIn} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={checkIfLoggedIn}>-</button>
                  <input type="" placeholder={`${voteFive}`} readOnly />
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
          {showModal && (
            <Modal
              isOpen={showModal}
              // onRequestClose={handleClick}
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
                  size={20}
                  //  maxLength={10}
                  required
                  name="tel"
                />
                <button>הירשמ/י</button>
              </form>
            </Modal>
          )}
        </div>
      ) : (
        <div className="main-page-wraper">
          <div className="main-page-container">
            <NavVotes />
            <div className="main-content-header">
              <h2>מי יהיה המנצח של העונה?</h2>
              <h3>
                נותרו <b>{numberOfVotes}</b> הצבעות
              </h3>
              <button onClick={() => setShowModal(true)}>
                setShowModal(true);
              </button>
            </div>
            <div className="select-celebrity-options">
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={handleCountMinusVoteOne}>-</button>
                  <input type="" placeholder={`${voteOne}`} readOnly />
                  <button onClick={handleCountPlusVoteOne} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={handleCountMinusVoteTwo}>-</button>
                  <input type="" placeholder={`${voteTwo}`} readOnly />
                  <button onClick={handleCountPlusVoteTwo} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={handleCountMinusVoteThree}>-</button>
                  <input type="" placeholder={`${voteThree}`} readOnly />
                  <button
                    onClick={handleCountPlusVoteThree}
                    disabled={disabled}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={handleCountMinusVoteFour}>-</button>
                  <input type="" placeholder={`${voteFour}`} readOnly />
                  <button onClick={handleCountPlusVoteFour} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
              <div className="option">
                <img
                  src="https://media.reshet.tv/image/upload/t_main_large/v1685471253/uploads/2023/903543622.jpg"
                  alt=""
                />
                <div className="vote-container">
                  <button onClick={handleCountMinusVoteFive}>-</button>
                  <input type="" placeholder={`${voteFive}`} readOnly />
                  <button onClick={handleCountPlusVoteFive} disabled={disabled}>
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="send-container">
              <button className="button-54">שלח/י</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(VotesPage);
