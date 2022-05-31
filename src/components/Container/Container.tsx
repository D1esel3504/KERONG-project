import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckLocks from '../CheckLocks';
import { Context } from '../../context';
import logo from '../../image/logo.jpg';
import { MOCKED_CONTROLLERS } from '../../mockedData';
import './Container.scss';
import { IBoard, IController, ILock } from '../../types/types';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  let [controllersList, setControllersList] = useState<IController[]>([]);
  let location = useLocation();

  let getControllers = async () => {
    let controllers: any[] = await Promise.resolve(MOCKED_CONTROLLERS);

    setControllersList(controllers);
  };

  let updateLockInContext = (lockNumber: string, data: ILock, ip: string, boardNumber: number) => {
    let updatedControllersList: any[] = [...controllersList];

    let controllerIndex: number = updatedControllersList
      .findIndex((controller: IController) => controller.ip === ip);

    let boardIndex: number = updatedControllersList[controllerIndex]
      .boards.findIndex((board: IBoard) => board.number === boardNumber);

    updatedControllersList[controllerIndex].boards[boardIndex]
      .locks[lockNumber] = data;

    setControllersList(updatedControllersList);
  };

  // let getAllControllersfromApi = () => fetch('https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/');

  // useEffect(() => {
  //   let getAllControllers = async () => {

  //     try {
  //       let getControllers = await getAllControllersfromApi();
  //       let result = await getControllers.json();

  //       setControllersList(result);

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
          {location.pathname !== '/login' && <CheckLocks />}
        </div>
        <div>{children}</div>
      </div>
    </Context.Provider>
  );
};

export default Container;
