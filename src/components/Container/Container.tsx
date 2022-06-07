import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckLocks from '../CheckLocks';
import { Context } from '../../context';
import logo from '../../image/logo.jpg';
import { MOCKED_CONTROLLERS } from '../../mockedData';
import './Container.scss';
import { Alert } from 'antd';
import { IController, ILockKeys } from '../../types/types';
import axios from 'axios';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  let [controllersList, setControllersList] = useState<IController[]>([]);
  let [isShowAlert, setIsShowAlert] = useState<boolean>(false);
  let location = useLocation();

  let getAllControllers = async () => {
    let controllers: any[] = await Promise.resolve(MOCKED_CONTROLLERS);

    setControllersList(controllers);
  };

  // let getAllControllers = async () => {
  //   try {
  //     await axios.get<IController[]>(
  //       `https://tms-js-pro-back-end.herokuapp.com/api/meet-room/`)
  //       .then(res => {
  //         let result = res.data;
  //         setControllersList(result);
  //       })
  //   }
  //   catch (error) {
  //     setIsShowAlert(true)
  //   }
  // }

  // useEffect(() => {
  //   getAllControllers();
  // }, []);

  let updateLockInContext = (lockNumber: string, data: ILockKeys, controllerNumber: string, boardNumber: string): void => {
    let updatedControllersList: IController[] = [...controllersList];

    updatedControllersList[Number(controllerNumber)].boards[Number(boardNumber)]
      .locks[lockNumber] = data;

    setControllersList(updatedControllersList);
  };

  return (
    <Context.Provider
      value={{ controllersList, getAllControllers, updateLockInContext }}
    >
      <div className="container">
        <div className="header">
          <img className="header__logo" alt="logo" src={logo} />
          {location.pathname !== '/login' && <CheckLocks />}
        </div>
        <div>{children}</div>
        {isShowAlert && (
          <Alert
            message="Error"
            description='Server error'
            type="error"
            showIcon
            closable
          />
        )}
      </div>
    </Context.Provider>
  );
};

export default Container;
