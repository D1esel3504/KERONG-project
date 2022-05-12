import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Controllers.scss';
import { Context } from '../../context';

const Controllers = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let { controllersList, getControllers } = useContext(Context)

  useEffect(() => {
    getControllers()
  }, [])

  let goToBoard = (ip) => navigate(`/boards/${ip}`);

  return (
    <div>
      <div className='info'>
        <h1>CONTROLLERS:</h1>
        <div className='controllers'>
          {controllersList && controllersList.map(i => (
            <ul className='controllers__info'>
              <li>NUMBER - {i.number}</li>
              <li>IP - {i.ip}</li>
              <button onClick={() => goToBoard(i.ip)}>GO TO THE BOARD</button>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controllers;
