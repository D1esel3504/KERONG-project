import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Controllers.scss';
import { Context } from '../../context';
import { Button, Typography } from 'antd';


const Controllers = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let { controllersList, getControllers } = useContext(Context);

  useEffect(() => {
    getControllers();
  }, [])

  let goToBoard = (ip) => navigate(`/boards/${ip}`);

  return (
    <div>
      <div className='info'>
        <Typography.Title level={1}>CONTROLLERS:</Typography.Title>
        <div className='controllers'>
          {controllersList && controllersList.map(i => (
            <ul className='controllers__info'>
              <li>NUMBER - {i.number}</li>
              <li>IP - {i.ip}</li>
              <Button
                type="primary"
                danger
                onClick={() => goToBoard(i.ip)}
                size="large">
                GO TO THE BOARD
              </Button>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Controllers;
