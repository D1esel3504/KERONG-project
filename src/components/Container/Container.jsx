import React, { useState } from 'react'
import CheckLocks from '../../components/CheckLocks';
import { Context } from '../../context';
import logo from '../../image/logo.jpg'
import './Container.scss';

const Container = ({ children }) => {
  let [controllersList, setControllersList] = useState([]);
  const MOCKED_CONTROLLERS = [
    {
      number: 1,
      ip: '10.3.2.5',
      boards: [
        {
          number: 1,
          locks: {
            '0:00:01': {
              state: 'closed',
              comment: ''
            },
          }
        },
        {
          number: 2,
          locks: {
            '0:00:02': {
              state: 'closed',
              comment: ''
            },
          }
        },
        {
          number: 3,
          locks: {
            '0:00:03': {
              state: 'closed',
              comment: ''
            },
          }
        },
      ],
    },
    {
      number: 2,
      ip: '10.3.2.6',
      boards: [
        {
          number: 1,
          locks: {
            '0:00:12': {
              state: 'closed',
              comment: ''
            },
          }
        },
        {
          number: 2,
          locks: {
            '0:00:33': {
              state: 'closed',
              comment: ''
            },
          }
        },
        {
          number: 3,
          locks: {
            '0:00:23': {
              state: 'closed',
              comment: ''
            },
          }
        },
      ],
    },
    {
      number: 3,
      ip: '10.3.2.7',
      boards: [
        {
          number: 1,
          locks: {
            '0:00:44': {
              state: 'closed',
              comment: ''
            },
          }
        },
        {
          number: 2,
          locks: {
            '0:00:78': {
              state: 'closed',
              comment: ''
            },
          }
        },
        {
          number: 3,
          locks: {
            '0:00:99': {
              state: 'closed',
              comment: ''
            },
          }
        },
      ],
    },
  ];


  let getControllers = async () => {
    let controllers = await Promise.resolve(MOCKED_CONTROLLERS);

    setControllersList(controllers)
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
    <Context.Provider value={{controllersList, getControllers}}>
      <div className='container'>
        <div className='header'>
          <img className='header__logo' alt='logo' src={logo} />
          <CheckLocks />
        </div>
        <div>{children}</div>
      </div>
    </Context.Provider>
  );
};

export default Container;
