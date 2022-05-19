import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import CheckLocks from '../../components/CheckLocks';
import { Context } from '../../context';
import logo from '../../image/logo.jpg'
import { MOCKED_CONTROLLERS } from '../../mockedData';
import './Container.scss';

const Container = ({ children }) => {
  let [controllersList, setControllersList] = useState([]);
  let location = useLocation();

  let getControllers = async () => {
    let controllers = await Promise.resolve(MOCKED_CONTROLLERS);

    setControllersList(controllers)
  }

  let updateLockInContext = (index, lockNumber, data) => {
    let updatedArr = [...controllersList];

    updatedArr.reduce((acc, curr) => {
      return [...acc, ...curr.boards.splice(index, 1, {
        ...curr.boards[index],
        locks: {
          ...curr.boards[index].locks,
          [lockNumber]: {
            ...data
          },
        },
      })]
    }, [])

    console.log(updatedArr);

    setControllersList(updatedArr)

  }

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
    <Context.Provider value={{ controllersList, getControllers, updateLockInContext }}>
      <div className='container'>
        <div className='header'>
          <img className='header__logo' alt='logo' src={logo} />
          {location.pathname !== '/login' && <CheckLocks />}
        </div>
        <div>{children}</div>
      </div>
    </Context.Provider>
  );
};

export default Container;
