import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../context';
import './Boards.scss';


const Boards = () => {
  let [boardList, setBoardList] = useState([]);
  let { id } = useParams();
  let { controllersList } = useContext(Context);

  useEffect(() => {
    let controller = controllersList.filter(i => i.ip === id);

    let boards = controller.reduce((acc, curr) => {
      return [...acc, ...curr.boards]
    }, [])

    setBoardList(boards);
    console.log(boardList);
  }, []);

  let filterBoards = (numberBoard) => {
    let filtredBoard = boardList.filter(i => i.number === numberBoard)

    setBoardList(filtredBoard)
  };

  return (
    <div>
      <div className="info">
        <h1>BOARDS:</h1>
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