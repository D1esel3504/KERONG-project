import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../context';
import './Boards.scss';


const Boards = () => {
  let [boardList, setBoardList] = useState([]);
  let [boardInput, setBoardInput] = useState('');
  let { id } = useParams();
  let { controllersList } = useContext(Context);

  useEffect(() => {
    let controller = controllersList.filter(i => i.ip === id);

    let boards = controller.reduce((acc, curr) => {
      return [...acc, ...curr.boards]
    }, [])

    setBoardList(boards);
  }, []);

  let filterBoards = (numberBoard) => {
    let filtredBoard = boardList.filter(i => i.number === numberBoard);

    setBoardList(filtredBoard);
  };

  console.log(boardInput);

  return (
    <div>
      <div className="info">
        <h1>BOARDS:</h1>
        <div>
          <input onChange={(e) => setBoardInput(e.target.value)} type="text" placeholder='THE NUMBER OF BOARD' />
          <button onClick={() => filterBoards(boardInput)}>SEARCH</button>
        </div>
        <div className="boards">
          {boardList.length
            ? boardList.map(board => (
              <div>
                <span onClick={() => filterBoards(board.number)} className="choosed-board">
                  BOARD - {board.number}
                </span>
                {Object.keys(board.locks).map(lock => (
                  <div>
                    <span> NUMBER - {lock}</span>
                    <div>
                      <span>COMMENT - {board.locks[lock].comment}</span>
                      <button>EDIT COMMENT</button>
                    </div>
                    <div>
                      <span> STATUS - {board.locks[lock].state}</span>
                      <button>OPEN LOCK</button>
                    </div>
                  </div>
                )
                )}
              </div>
            ))
            : 'NO BOARDS AND LOCKS'}
        </div>
      </div>
    </div>
  );
};

export default Boards;