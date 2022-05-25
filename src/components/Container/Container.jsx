import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CheckLocks from "../../components/CheckLocks";
import { Context } from "../../context";
import logo from "../../image/logo.jpg";
import { MOCKED_CONTROLLERS } from "../../mockedData";
import "./Container.scss";

const Container = ({ children }) => {
  let [controllersList, setControllersList] = useState([]);
  let location = useLocation();

  let getControllers = async () => {
    let controllers = await Promise.resolve(MOCKED_CONTROLLERS);

    setControllersList(controllers);
  };

  let updateLockInContext = (lockNumber, data, ip, boardNumber) => {
    const updatedControllersList = [...controllersList];

    const cntrlIndex = updatedControllersList.findIndex(
      (cntrl) => cntrl.ip === ip
    );

    const boardIndex = updatedControllersList[cntrlIndex].boards.findIndex(
      (el) => el.number === boardNumber
    );
    updatedControllersList[cntrlIndex].boards[boardIndex].locks[lockNumber] =
      data;

    setControllersList(updatedControllersList);
  };

  // let getAllControllersfromApi = () => fetch('https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/');

  // useEffect(() => {
  //   let getAllControllers = async () => {

  //     try {
  //       let getControllers = await getAllControllersfromApi();
  //       let result = await getControllers.json();

  //       SetControllersList(result);

  //     } catch (error) {
  //       console.error('error-' + error);
  //     }
  //   }

  //   getAllControllers();

  // }, []);

  return (
    <Context.Provider
      value={{ controllersList, getControllers, updateLockInContext }}
    >
      <div className="container">
        <div className="header">
          <img className="header__logo" alt="logo" src={logo} />
          {location.pathname !== "/login" && <CheckLocks />}
        </div>
        <div>{children}</div>
      </div>
    </Context.Provider>
  );
};

export default Container;
