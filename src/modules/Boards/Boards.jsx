import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../context';
import './Boards.scss';


const Boards = () => {
  let [boards, setBoard] = useState([]);
  let { id } = useParams();
  const { controllersList } = useContext(Context)

  // let getBoardfromApi = () => fetch('https://tms-js-pro-back-end.herokuapp.com/api/meet-rooms/');

  // useEffect(() => {
  //   let getAllControllers = async () => {

  //     try {
  //       let getBoard = await getBoardfromApi();
  //       let result = await getBoard.json();

  //       setBoard(result);
  //     } catch (error) {
  //       console.error('error-' + error);
  //     }
  //   }

  //   getAllControllers();

  // }, []);

  // let filterBoards = (id) => {
  //   let oneBoard = boards.filter(i => i.id === id);

  //   setBoard(oneBoard);
  // };

  let boardsList = controllersList.map(i => i.boards)
  console.log(boardsList);

  return (
    <div>
      <div className='info'>
        <h1>BOARDS:</h1>
        <div className='boards'>
          {controllersList.length ? controllersList.map(cntrl => (
            cntrl.boards.map(board => (
            <div>
              <span className='choosed-board'>BOARD - {board.number}</span>
              {Object.keys(board.locks).map(lock => (
                <div>
                  <span> NUMBER - {cntrl.board.lock}</span>
                  <div>
                    <span>COMMENT - {board.locks[lock].comment}</span>
                    <button>EDIT COMMENT</button>
                  </div>
                  <div>
                    <span> STATUS - {board.locks[lock].state}</span>
                    <button>OPEN LOCK</button>
                  </div>
                </div>
              ))}
            </div>)
          ))) : 'NO BOARDS AND LOCKS'}
        </div>
      </div>
    </div >
  );
};

export default Boards;
