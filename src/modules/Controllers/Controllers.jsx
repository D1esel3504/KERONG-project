import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Controllers.scss";

const Controllers = () => {
  let [controllers, SetControllers] = useState([]);
  let navigate = useNavigate();
  let { id } = useParams();

  let getAllControllersfromApi = () =>
    fetch("https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/");

  useEffect(() => {
    let getAllControllers = async () => {
      try {
        let getControllers = await getAllControllersfromApi();
        let result = await getControllers.json();

        SetControllers(result);
      } catch (error) {
        console.error("error-" + error);
      }
    };

    getAllControllers();
  }, []);

  let goToBoard = (id) => navigate(`/boards/${id}`);

  return (
    <div>
      <div className="info">
        <h1>CONTROLLERS:</h1>
        <div className="controllers">
          {controllers &&
            controllers.map((i) => (
              <ul className="controllers__info">
                <li>NUMBER - {i.floor}</li>
                <li>IP - {i.id}</li>
                <button onClick={() => goToBoard(i.id)}>GO TO THE BOARD</button>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Controllers;
