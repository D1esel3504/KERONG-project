import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Controllers.scss';

const Controllers = () => {
  let [controllersList, SetControllersList] = useState([]);
  let navigate = useNavigate();
  let { id } = useParams();

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

    SetControllersList(controllers)
  }

  useEffect(() => {
    getControllers()
  }, [])

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


  console.log(controllersList);

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
